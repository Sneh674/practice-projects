import {Link} from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <Link to="/login">Login</Link>
      <br />
      <Link to="/register">Register</Link>
    </div>
  )
}

export default Home
