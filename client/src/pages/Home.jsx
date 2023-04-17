import { Link } from 'react-router-dom'
import Logo from '../asserts/logo.webp'
const Home = () => {
  return (
    <section className="d-flex align-items-center justify-content-center" style={{width: '100%', height: '100vh'}}>
        <div className="col-md-3">
            <img src={Logo} className='img-fluid' />
            <div className='d-flex justify-content-center'>
                <Link to='/chat/signup' className='nav-link text-light rounded-pill ms-1 px-4' style={{background: '#42B1E0'}}>Sign up</Link>
                <Link to='/chat/authenticate' className='nav-link text-light rounded-pill ms-1 px-4' style={{background: '#014791'}}>Log in</Link>
            </div>
        </div>
    </section>
  )
}

export default Home