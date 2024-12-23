import {Link} from 'react-router-dom'
import './index.css'

const TeamCard = props => {
  const {iplDetails} = props
  const {id, name, teamImageUrl} = iplDetails

  return (
    <li className="ipl-list-container">
      <Link to={`/team-matches/${id}`} className="link">
        <img src={teamImageUrl} alt={name} className="ipl-image" />
        <p className="ipl-card-heading">{name}</p>
      </Link>
    </li>
  )
}

export default TeamCard
