import React from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import ImageLink from './components/ImageLink/ImageLink';
import Rank from './components/Rank/Rank';
import Clarifai from 'clarifai';

import './App.css';

const app = new Clarifai.App({
  apiKey: '214a7a615d2c477182db914d4c27cfb5'
});

class App extends React.Component {

  /*{
  https://images.unsplash.com/photo-1542080681-b52d382432af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80
  https://cdn.vox-cdn.com/thumbor/CMJs1AJyAmf27RUd2UI5WBSZpy4=/0x0:3049x2048/920x613/filters:focal(1333x1562:1819x2048):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/63058104/fake_ai_faces.0.png
  https://samples.clarifai.com/metro-north.jpg
    steps
  
    1. create constructor
    2. create a function to fetch the input from the text box
    3. pass this onInputChange to the ImageLink
    4. on image link, attach to the onchange function
    5. set state to the input onInputChange
    6. create submit function similar and pass
    7. set state to image url
    8. pass this state to the url on
  
  }*/

  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},

    }
  }
  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      topRow: clarifaiFace.top_row * height,
      leftCol: clarifaiFace.left_col * width,
      bottomRow: height - (clarifaiFace.bottom_row * height),
      rightCol: width - (clarifaiFace.right_col * width)
    }


  }

  drawFaceBox = (box) => {
    this.setState({ box: box });
  }
  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onDetectSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    console.log(this.state);
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then((response)=>{
        return this.drawFaceBox(this.calculateFaceLocation(response));
      })
    .catch((err)=>{
      console.log("some error"+err);
    })



  }
  render() {

    return (
      <div>
        <Navigation></Navigation>
        <Logo></Logo>
        <Rank></Rank>
        <ImageLink onInputChange={this.onInputChange} onDetectSubmit={this.onDetectSubmit}></ImageLink>
        <FaceRecognition imageUrl={this.state.imageUrl} box={this.state.box}></FaceRecognition>

      </div>
    );
  }
}

export default App;
