import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom"
import './SplashPage.css'

const SplashPage = () => {
    const history = useHistory();
    const [backgroundImage, setBackgroundImage] = useState(0);

    const backgroundArr = [
        "url(https://www.hdwallpapers.in/download/baseball_stadium_under_black_clouds_white_sky_hd_baseball-HD.jpg)",
        "url(https://wallpaper.dog/large/10960158.jpg)",
        "url(https://s1.1zoom.me/b5366/772/Men_Black_background_Barbell_Beard_516649_1920x1080.jpg)",
        "url(https://pbs.twimg.com/ext_tw_video_thumb/1591158939047149568/pu/img/o8jhqN7ZBVBZ-ttq.jpg:large)",
        "url(https://images4.alphacoders.com/284/thumb-1920-284804.jpg)",
        "url(https://cdn.wallpapersafari.com/12/42/LCsOv1.jpg)",
        "url(https://wallpaperaccess.com/full/1150721.jpg)",
        "url(https://wallpaperset.com/w/full/8/1/8/119912.jpg)",
        "url(https://images5.alphacoders.com/436/436417.jpg)",
        "url(https://www.zastavki.com/pictures/originals/2018_American_football_player_with_ball_on_black_background_130685_.jpg)",

    ]

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
        <div className="whole-splash-page-container" style={{"backgroundImage": backgroundArr[backgroundImage], transition: "background-image 4s ease-in-out"}}>
            <div className="center-page-info">
                <div className="inspiration-header">Find your inspiration.</div>
                <div className="ballr-community">Join the Ballr community, home to tens of billions of photos and 2 million groups</div>
                <button className="start-free-button" onClick={() => history.push('/signup')}>Start for free</button>
            </div>
        </div>
    )
}

export default SplashPage
