import React, { Component } from 'react';

class RoomList extends Component {

  constructor(props) {
    super(props);

    this.state = {
    rooms: [],
    newRoomInput: '',
    };

    this.roomsRef = this.props.firebase.database().ref('rooms');
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
    const room = snapshot.val();
    room.key = snapshot.key;
    this.setState({ rooms: this.state.rooms.concat( room ) })
    });
  }

  handleChange(e) {
    this.setState({ newRoomInput: e.target.value })
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.newRoomInput) {return}
    this.roomsRef.push({
      name: this.state.newRoomInput
    });
    this.setState ({ newRoomInput: ''})
  }

  render() {
    return (
      <section>
        <h1>Chat Rooms</h1>
        <ul className="roomsList"> {this.state.rooms.map((room, index) =>
          <li key={index} className='rooms' onClick={ (e) => this.props.activeRoom(e, room)}> {room.name} </li>
				   )}
       </ul>
       <form id='createRoom' onSubmit={ (e) => this.handleSubmit(e) }>
        <fieldset>
          <legend>Create a new room</legend>
          <input type='text' id='createdRoom' placeholder='Enter a Room Name' value= {this.state.newRoomInput} onChange={this.handleChange}/>
          <input type='submit' value='Submit'/>
        </fieldset>
       </form>
       <h2>{this.props.currentRoom}</h2>
      </section>
    );
  }
}
export default RoomList;
