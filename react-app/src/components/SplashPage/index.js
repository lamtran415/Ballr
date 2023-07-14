import { useCallback, useEffect, useState } from "react";
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
const backgroundArr = Object.values(images).map((image) => `url(${image.default})`);
console.log(backgroundArr)
{backgroundArr.map((background, index) => (
    console.log(index)

    ))}

const SplashPage = () => {
    const history = useHistory();

    return (
        <div className="whole-splash-page-container">
            <div className="image-slides-container">
                {backgroundArr.map((background, index) => (
                <div
                    key={`image-slide${index}`}
                    className="image-slide"
                    id={`image-slide${backgroundArr.length - index}`}
                    style={{ backgroundImage: background }}
                />
                ))}
            </div>
            <div className="center-page-info">
                <div className="inspiration-header">Find your inspiration.</div>
                <div className="ballr-community">Join the Ballr community, home to tens of billions of photos and 2 million groups</div>
                <button className="start-free-button" onClick={() => history.push('/signup')}>Start for free</button>
            </div>
        </div>
    )
}

export default SplashPage
