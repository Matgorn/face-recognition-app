import './App.css';
import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Particles from 'react-particles-js';
import Rank from './components/Rank/Rank';
import Clarifai from 'clarifai';



const app = new Clarifai.App({
  apiKey: '34652f335b704a98bdd2858c1ff03348'
});

//https://images.pexels.com/photos/4755265/pexels-photo-4755265.jpeg
app.models.predict(Clarifai.FACE_DETECT_MODEL, 'https://images.pexels.com/photos/4755265/pexels-photo-4755265.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260')
.then(
  function(response) {
    console.log(response);
  },
  function(err) {
    console.log(err);
  }
)

const particleOptions = {
  particles: {
    number: {
      value: 50,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: ''
    }
  }

  onButtonSubmit = () => {
    this.setState({
      imageUrl: this.state.input
    });
    console.log('click');
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.imageUrl
    )
    .then(
      function(response) {
        console.log(response);
      },
      function(err) {
        console.log(err);
      }
    )
  }

  onInputChange = (event) => {
    this.setState({
      input: event.target.value
    });
  }

  render() {
    return (
      <div className="App">
        <Particles className='particles'
          params={particleOptions}
        />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm 
          onButtonSubmit={this.onButtonSubmit}
          onInputChange={this.onInputChange} />
        <FaceRecognition imageUrl={this.state.imageUrl} />
      </div>
    );
  }
}

export default App;
