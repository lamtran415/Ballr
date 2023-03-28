import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import "./ErrorPage.css"

const ErrorPage = () => {
    const sessionUser = useSelector((state) => state.session.user)
    return (
        <div className="whole-error-page-container">
            {sessionUser ? <Link className="error-home-link" to='/photos'>Go Home</Link> : <Link className="error-home-link" to="/">Go Home</Link>}
            
        </div>
    )
}

export default ErrorPage
