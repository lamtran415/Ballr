import './Footer.css'
import GitHubLogo from "./FooterLogo/github-logo.png"
import LinkedInLogo from "./FooterLogo/linkedin-logo.png"

const Footer = () => {
    return (
        <footer className="whole-footer-container">
            <div className="language-framework">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt=""/>
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt=""/>
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt=""/>
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" alt=""/>
                <i className="devicon-flask-original flask-icon"></i>
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" alt=""/>
                <i className="devicon-sqlalchemy-plain sql-icon"></i>
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" alt=""/>
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" alt="" />
            </div>
            <a className='my-name-footer' href='https://lamtran415.github.io'>
                Austin Lam-Tran
            </a>
            <a href='https://github.com/lamtran415' target='_blank' rel="noreferrer">
                <img
                    className='github-logo'
                    src={GitHubLogo}
                    alt=""
                />
            </a>
            <a href='https://www.linkedin.com/in/austin-lam-tran-93881a155/' target='_blank' rel="noreferrer">
                <img
                    className='linkedin-logo'
                    src={LinkedInLogo}
                    alt=""
                />
            </a>
        </footer>
    )
}

export default Footer;
