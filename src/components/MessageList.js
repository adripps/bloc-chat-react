import React, { Component } from 'react';

class MessageList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: "",
      content: [],
      sentAt: "",
      roomId: "",
      inputValue: "",
    };

    this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
    const room = snapshot.val();
    room.key = snapshot.key;
    console.log(this.props.currentRoom)
    this.setState({ content: this.state.content.concat (room.messages.message) })
    });
  }

  getRoomId() {
    this.setState ({ roomId: 'test'})
  }

  render() {
    return (
      <div>
        <h1></h1>
        <h2>{this.state.username}</h2>
        <ul className="messagesList"> {this.state.content.map(() =>
          <li className='messages'> {this.state.content} </li>
          )}
        </ul>
        <div className="timeStamp">{this.state.sentAt}</div>
      </div>
    );
  }
}
export default MessageList;
