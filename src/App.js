import React from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import ImageLink from './components/ImageLink/ImageLink';
import Rank from './components/Rank/Rank';
import Clarifai from 'clarifai';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Particles from 'react-particles-js'

import './App.css';
const app = new Clarifai.App({
  apiKey: '214a7a615d2c477182db914d4c27cfb5'
});

const particlesOptions = {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
  
}
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
    9. register for clariface and on success response call the calculateFaceLocation function
    10. the result form the facelocation and passed to the drawFaceBox for drawing box
  
  }*/

  constructor() {
    super();
    this.state = {
      input: 'https://cdn.vox-cdn.com/thumbor/CMJs1AJyAmf27RUd2UI5WBSZpy4=/0x0:3049x2048/920x613/filters:focal(1333x1562:1819x2048):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/63058104/fake_ai_faces.0.png',
      imageUrl: '',
      box: [],
      Route: 'SignIn',
      isSignedIn: false

    }
  }
  calculateFaceLocation = (data) => {
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);

    //with for each function
    // const box = [];
    // data.outputs[0].data.regions.forEach(element => {
    //   const clarifaiFace = element.region_info.bounding_box

    //   box.push({
    //     "topRow": clarifaiFace.top_row * height,
    //     "leftCol": clarifaiFace.left_col * width,
    //     "bottomRow": height - (clarifaiFace.bottom_row * height),
    //     "rightCol": width - (clarifaiFace.right_col * width)
    //   })

    // });
    // return box;

    //with map function
    const box = data.outputs[0].data.regions.map((item) => {
      const clarifaiFace = item.region_info.bounding_box
      return {
        "topRow": clarifaiFace.top_row * height,
        "leftCol": clarifaiFace.left_col * width,
        "bottomRow": height - (clarifaiFace.bottom_row * height),
        "rightCol": width - (clarifaiFace.right_col * width)
      }
    });
    return box;

  }

  drawFaceBox = (box) => {
    this.setState({ box: box });
  }
  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onDetectSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then((response) => {
        return this.drawFaceBox(this.calculateFaceLocation(response));
      })
      .catch((err) => {
        console.log("some error on predicting:" + err);
      })
  }

  onRouteChange = (route) => {
    route === "Home" ? this.setState({ isSignedIn: true }) : this.setState({ isSignedIn: false })
    this.setState({ Route: route });
  }
  render() {
    console.log(this.state);
    return (
      <div>
        <Particles className='particles' params={particlesOptions}/>

        <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn} ></Navigation>
        {

          this.state.Route === "SignIn"
            ? <SignIn onRouteChange={this.onRouteChange}></SignIn>
            : (
              this.state.Route === "Register"
                ? <Register onRouteChange={this.onRouteChange}></Register>
                : <div>
                  <Logo></Logo>
                  <Rank></Rank>
                  <ImageLink onInputChange={this.onInputChange} onDetectSubmit={this.onDetectSubmit}></ImageLink>
                  <FaceRecognition imageUrl={this.state.imageUrl} box={this.state.box}></FaceRecognition>
                </div>
            )
        }
        
      </div>
    );
  }
}

export default App;
