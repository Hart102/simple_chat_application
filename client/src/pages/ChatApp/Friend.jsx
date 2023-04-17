import { Link } from "react-router-dom"

const Friend = ({
    classname,
    userImage, name, message,
    time, numberOfMessages, onclick
}) => {
  return (
    <li className={classname} onClick={onclick} >
        <Link to="" className="nav-link text-light1 d-flex 
        justify-content-between shadow rounded px-2 friend" style={{background: '#3E404D'}}>
            <div className="d-flex flex-row">
                <div>
                    <img src={userImage} className="d-flex align-self-center me-2" width="40"/>
                    <span className="badge bg-success badge-dot"></span>
                    </div>
                    <div className="pt-1">
                    <p className="text-light mb-0">{name}</p>
                    <p className="small text-muted">{message}</p>
                </div>
            </div>
            <div className="pt-1">
                <p className="small text-muted mb-1">{time}</p>
                <span className="badge bg-danger rounded-pill float-end">{numberOfMessages}</span>
            </div>
        </Link>
    </li>
  )
}

export default Friend