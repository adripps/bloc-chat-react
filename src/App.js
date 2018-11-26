import React, { Component } from 'react';
import './App.css';
import RoomList from './components/RoomList.js';
import MessageList from './components/MessageList.js';
import * as firebase from 'firebase';

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyA7wH0RzXTH3gnd-VuHwXpBY6S69xN5A4g",
    authDomain: "bloc-chat-react-3d837.firebaseapp.com",
    databaseURL: "https://bloc-chat-react-3d837.firebaseio.com",
    projectId: "bloc-chat-react-3d837",
    storageBucket: "bloc-chat-react-3d837.appspot.com",
    messagingSenderId: "89279596206"
  };
  firebase.initializeApp(config);

class App extends Component {

  render() {
    return (
      <div className="App">
        <RoomList firebase={firebase}/>
      </div>
    );
  }
}

export default App;
