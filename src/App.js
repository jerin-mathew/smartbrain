import React from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import ImageLink from './components/ImageLink/ImageLink';
import Rank from './components/Rank/Rank';

import './App.css';

function App() {
  return (
    <div>
<Navigation></Navigation>
<Logo></Logo>
<Rank></Rank>
<ImageLink></ImageLink>
<FaceRecognition></FaceRecognition>

    </div>
  );
}

export default App;
