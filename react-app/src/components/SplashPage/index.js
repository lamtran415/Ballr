import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom"
import './SplashPage.css'

function importAll(context) {
    let images = {};
    context.keys().forEach((item, index) => {
      images[item.replace('./', '')] = context(item);
    });
    return images;
}

const images = importAll(require.context('./SplashPhotos', false, /\.(png|jpe?g|svg)$/));

const SplashPage = () => {
    const history = useHistory();
    const [backgroundImage, setBackgroundImage] = useState(0);

    const backgroundArr = Object.values(images).map((image) => `url(${image.default})`);

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
        <div className="whole-splash-page-container" style={{"backgroundImage": backgroundArr[backgroundImage]}}>
            <div className="center-page-info">
                <div className="inspiration-header">Find your inspiration.</div>
                <div className="ballr-community">Join the Ballr community, home to tens of billions of photos and 2 million groups</div>
                <button className="start-free-button" onClick={() => history.push('/signup')}>Start for free</button>
            </div>
        </div>
    )
}

export default SplashPage
