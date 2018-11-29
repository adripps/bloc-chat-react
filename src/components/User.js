import React, { Component } from 'react';
import * as firebase from 'firebase';


class User extends Component {

  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged( user => {
      if (user == null) {
        user = this.props.user
        this.props.setUser(user)
      }
      console.log(user)
      this.props.setUser(user)
    });
  }

  signIn () {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup( provider );
  }

  signOut () {
    this.props.firebase.auth().signOut();
    this.props.setUser({ displayName: 'Guest' })
  }


  render() {

    return (
      <div>
        <div>{this.props.user.displayName}</div>
        <button id= "signIn" onClick={ () => this.signIn() }>Sign-In</button>
        <button id= "signOut" onClick={ () => this.signOut() }>Sign-Out</button>
      </div>
    )
  }
}

export default User;
