import './Footer.css'
import GitHubLogo from "./FooterLogo/github-logo.png"
import LinkedInLogo from "./FooterLogo/linkedin-logo.png"

const Footer = () => {
    return (
        <footer className="whole-footer-container">
            <div className='my-name-footer'>
                Austin Lam-Tran
            </div>
            <a href='https://github.com/lamtran415' target='_blank'>
                <img
                    className='github-logo'
                    src={GitHubLogo}
                    alt=""
                />
            </a>
            <a href='https://www.linkedin.com/in/austin-lam-tran-93881a155/' target='_blank'>
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
