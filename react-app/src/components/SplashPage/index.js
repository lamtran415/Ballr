import { useHistory } from "react-router-dom"
import { login } from "../../store/session";
import './SplashPage.css'
import { useDispatch } from "react-redux";

function importAll(context) {
    let images = {};
    context.keys().forEach((item, index) => {
      images[item.replace('./', '')] = context(item);
    });
    return images;
}

const images = importAll(require.context('./SplashPhotos', false, /\.(png|jpe?g|svg)$/));
const backgroundArr = Object.values(images).map((image) => `url(${image.default})`);

const SplashPage = () => {
    const dispatch = useDispatch()
    const history = useHistory();

    const demoLogin = async (e) => {
        e.preventDefault();
        await dispatch(login("demo@aa.io", "password"));
        history.push("/photos")
      };

    return (
        <div className="whole-splash-page-container">
            <div className="image-slides-container">
                {backgroundArr.map((background, index) => (
                <div
                    key={`image-slide${index}`}
                    className="image-slide"
                    id={`image-slide${backgroundArr.length - index}`}
                    style={{
                        backgroundImage: background
                    }}
                />
                ))}
            </div>
            <div className="center-page-info">
                <div className="inspiration-header">Find your inspiration.</div>
                <div className="ballr-community">Join the Ballr community, home to tens of billions of photos and 2 million groups</div>
                <button className="start-free-button" onClick={() => history.push('/signup')}>Start for free</button>
                <button className="demo-user-button" onClick={demoLogin}>Explore</button>
            </div>
        </div>
    )
}

export default SplashPage
