import {Component} from 'react'
import Loader from 'react-loader-spinner'
import TeamCard from '../TeamCard'
import './index.css'

class Home extends Component {
  state = {iplTeamList: [], isLoading: true}

  componentDidMount() {
    this.getIplMatchData()
  }

  getIplMatchData = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const data = await response.json()
    const updatedIplData = data.teams.map(eachCard => ({
      id: eachCard.id,
      name: eachCard.name,
      teamImageUrl: eachCard.team_image_url,
    }))
    this.setState({iplTeamList: updatedIplData, isLoading: false})
  }

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="Oval" color="#ffffff" height={50} width={50} />
    </div>
  )

  render() {
    const {isLoading, iplTeamList} = this.state
    return (
      <div className="home-container">
        <div className="logo-heading">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
            alt="ipl logo"
            className="ipl-logo"
          />
          <h1 className="ipl-heading">IPL Dashboard</h1>
        </div>
        {isLoading ? (
          this.renderLoader()
        ) : (
          <ul className="cards-container">
            {iplTeamList.map(eachIteam => (
              <TeamCard iplDetails={eachIteam} key={eachIteam.id} />
            ))}
          </ul>
        )}
      </div>
    )
  }
}

export default Home
