import {Component} from 'react'
import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'
import Loader from 'react-loader-spinner'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'
import './index.css'

const teamMatchesApiUrl = 'https://apis.ccbp.in/ipl/'

class TeamMatches extends Component {
  state = {isLoading: true, teamMatchesData: {}, won: '', lost: '', draw: ''}

  componentDidMount() {
    this.getTeamMatches()
  }

  getFormattedData = data => ({
    umpires: data.umpires,
    result: data.result,
    manOfTheMatch: data.man_of_the_match,
    id: data.id,
    date: data.date,
    venue: data.venue,
    competingTeam: data.competing_team,
    competingTeamLogo: data.competing_team_logo,
    firstInnings: data.first_innings,
    secondInnings: data.second_innings,
    matchStatus: data.match_status,
  })

  getTeamMatches = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`${teamMatchesApiUrl}${id}`)
    const fetchData = await response.json()
    const formattedData = {
      teamBannerUrl: fetchData.team_banner_url,
      latestMatch: this.getFormattedData(fetchData.latest_match_details),
      recentMatches: fetchData.recent_matches.map(eachMatch =>
        this.getFormattedData(eachMatch),
      ),
    }
    console.log(formattedData)
    this.setState(
      {teamMatchesData: formattedData, isLoading: false},
      this.renderStatics,
    )
  }

  onClickBack = () => {
    const {history} = this.props
    history.replace('/')
  }

  renderStatics = () => {
    const {teamMatchesData} = this.state
    const {recentMatches} = teamMatchesData
    let won = 0
    let lost = 0
    let draw = 0

    recentMatches.forEach(match => {
      if (match.matchStatus === 'Won') {
        won += 1
      } else if (match.matchStatus === 'Lost') {
        lost += 1
      } else if (match.matchStatus === 'Draw') {
        draw += 1
      }
    })

    console.log('Won:', won, 'Lost:', lost, 'Draw:', draw)

    this.setState({won, lost, draw})
  }

  renderPieGraph = (won, lost, draw) => {
    const info = [
      {count: won, name: 'Won'},
      {count: lost, name: 'Lost'},
      {count: draw, name: 'Draw'},
    ]
    return (
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            cx="50%"
            cy="60%"
            data={info}
            startAngle={360}
            endAngle={0}
            innerRadius="30%"
            outerRadius="70%"
            dataKey="count"
          >
            <Cell name="Won" fill="green" />
            <Cell name="Lost" fill="red" />
            <Cell name="Draw" fill="blue" />
          </Pie>
          <Legend
            iconType="circle"
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
            wrapperStyle={{fontSize: 12, fontFamily: 'Roboto'}}
          />
        </PieChart>
      </ResponsiveContainer>
    )
  }

  renderRecentMatchesList = () => {
    const {teamMatchesData} = this.state
    const {recentMatches} = teamMatchesData

    return (
      <ul className="teamContainer">
        {recentMatches.map(recentMatch => (
          <MatchCard matchDetails={recentMatch} key={recentMatch.id} />
        ))}
      </ul>
    )
  }

  renderTeamMatches = () => {
    const {teamMatchesData, won, lost, draw} = this.state
    const {teamBannerUrl, latestMatch} = teamMatchesData
    console.log(won)

    return (
      <div className="groupContainer">
        <button type="button" className="backButton" onClick={this.onClickBack}>
          Back
        </button>
        <img src={teamBannerUrl} alt="team banner" className="teamImage" />
        <LatestMatch latestMatchData={latestMatch} />
        {this.renderRecentMatchesList()}
        {this.renderPieGraph(won, lost, draw)}
      </div>
    )
  }

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="Oval" color="#ffffff" height={50} width={50} />
    </div>
  )

  getRouteClassName = () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    switch (id) {
      case 'RCB':
        return 'rcb'
      case 'KKR':
        return 'kkr'
      case 'KXP':
        return 'kxp'
      case 'CSK':
        return 'csk'
      case 'RR':
        return 'rr'
      case 'MI':
        return 'mi'
      case 'SH':
        return 'srh'
      case 'DC':
        return 'dc'
      default:
        return ''
    }
  }

  render() {
    const {isLoading} = this.state
    const className = `team-matches-container ${this.getRouteClassName()}`

    return (
      <div className={className}>
        {isLoading ? this.renderLoader() : this.renderTeamMatches()}
      </div>
    )
  }
}

export default TeamMatches
