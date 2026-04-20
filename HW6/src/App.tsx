import React, { useState } from 'react';

import img1 from './images/1.png';
import img2 from './images/2.png';
import img3 from './images/3.png';
import img4 from './images/4.png';

const images: string[] = [img1, img2, img3, img4];

function App() {
  const [idx, setIdx] = useState(0);
  const [width, setWidth] = useState(400);

  const prevImage = () => {
    setIdx(idx === 0 ? images.length - 1 : idx - 1);
  };

  const nextImage = () => {
    setIdx(idx === images.length - 1 ? 0 : idx + 1);
  };

  return (
    <div className="container">
      <div className="gallery">
        <button onClick={prevImage} className="nav-btn">
          {'←'}
        </button>
        
        <div className="image-box">
          <div className="image-caption">Картинка №{idx + 1}</div>
          <img 
            src={images[idx]} 
            alt="gallery" 
            style={{ width: `${width}px` }} 
          />
        </div>

        <button onClick={nextImage} className="nav-btn">
          {'→'}
        </button>
      </div>

      <div className="controls">
        <p>Ширина: {width}px</p>
        <input 
          type="range" 
          min="100" 
          max="800" 
          step="1" 
          value={width} 
          onChange={(e) => setWidth(Number(e.target.value))} 
        />
      </div>
    </div>
  );
};

export default App;
