// LoadingPage.js
import React from 'react';
import { HashLoader } from 'react-spinners';
import './LoadingPage.css'

const LoadingPage = () => (
  <div className='loading'>
    <div className='loading-content'>
        <HashLoader
          color="#128FDC"
          size={100}
          speedMultiplier={1}
        />
      <div className='loading-text'>
        Fetching...
      </div>
    </div>
  </div>
);

export default LoadingPage;
