import './index.css'

const MatchCard = props => {
  const {matchDetails} = props
  const {competingTeamLogo, competingTeam, matchStatus, result} = matchDetails
  const isWon = matchStatus === 'Lost' ? 'changeColor' : ''

  const getMatchStatusClassName = status =>
    status === 'Won' ? 'match-won' : 'match-lost'
  const matchStatusClassName = `match-status ${getMatchStatusClassName(
    matchStatus,
  )}`

  return (
    <li className="match-item">
      <img
        src={competingTeamLogo}
        className="competing-Team-logo"
        alt={`competing team ${competingTeam}`}
      />
      <p>{competingTeam}</p>
      <p>{result}</p>
      <p className={(matchStatusClassName, isWon)}>{matchStatus}</p>
    </li>
  )
}

export default MatchCard
