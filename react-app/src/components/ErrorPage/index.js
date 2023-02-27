import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import "./ErrorPage.css"

const ErrorPage = () => {
    const sessionUser = useSelector((state) => state.session.user)
    return (
        <div className="whole-error-page-container">
            {/* <img
                className="error-img-tag"
                src="https://inzonedesign.b-cdn.net/wp-content/uploads/2021/02/24-cleverly-funny-crerative-404-error-pages-tinsanity.jpg"
                alt=""
            /> */}
            {sessionUser ? <Link className="error-home-link" to='/photos'>Go Home</Link> : <Link className="error-home-link" to="/">Go Home</Link>}
        </div>
    )
}

export default ErrorPage
