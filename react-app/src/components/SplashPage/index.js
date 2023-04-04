import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom"
import './SplashPage.css'
import image1 from './SplashPhotos/baseball_stadium.jpg';
import image2 from './SplashPhotos/jump_girl.jpg';
import image3 from './SplashPhotos/barbell.jpg';
import image4 from './SplashPhotos/football.jpg';
import image5 from './SplashPhotos/kobe_dunk.jpg';
import image6 from './SplashPhotos/lebron.jpg';
import image7 from './SplashPhotos/maye_football.jpg';
import image8 from './SplashPhotos/nike_logo.jpg';
import image9 from './SplashPhotos/soccer.jpg';
import image10 from './SplashPhotos/tennis.jpg';


const SplashPage = () => {
    const history = useHistory();
    const [backgroundImage, setBackgroundImage] = useState(0);

    const backgroundArr = [
        `url(${image1})`,
        `url(${image2})`,
        `url(${image3})`,
        `url(${image4})`,
        `url(${image5})`,
        `url(${image6})`,
        `url(${image7})`,
        `url(${image8})`,
        `url(${image9})`,
        `url(${image10})`
    ];

    // eslint-disable-next-line
    useEffect(() => {
        const backgroundInterval = setInterval(() => {
            setBackgroundImage((prevNum) => ++prevNum % backgroundArr.length);
        }, 5000)

        return () => {
            clearInterval(backgroundInterval)
        }
    },[])

    return (
        <div className="whole-splash-page-container" style={{"backgroundImage": backgroundArr[backgroundImage], transition: "background-image 1s ease-out"}}>
            <div className="center-page-info">
                <div className="inspiration-header">Find your inspiration.</div>
                <div className="ballr-community">Join the Ballr community, home to tens of billions of photos and 2 million groups</div>
                <button className="start-free-button" onClick={() => history.push('/signup')}>Start for free</button>
            </div>
        </div>
    )
}

export default SplashPage
