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

  constructor(props) {
    super(props);
    this.state = {
      currentRoom: '',
      currentRoomKey: '',
    };
  }

  activeRoom (e, room) {
    if (e.target.innerText === room.name){
      this.setState ({ currentRoom: room.name})
      this.setState ({ currentRoomKey: room.key})
    }
  }

  render() {
    return (
      <div className="App">
        <h1>Bloc Chat</h1>
        <RoomList
          firebase={firebase}
          activeRoom={ (e, room) => this.activeRoom(e, room)}
          currentRoom={this.state.currentRoom}
        />
        <MessageList
          firebase={firebase}
          activeRoom={ (e, room) => this.activeRoom(e, room)}
          currentRoom={this.state.currentRoom}
          currentRoomKey={this.state.currentRoomKey}
        />
      </div>
    );
  }
}

export default App;
