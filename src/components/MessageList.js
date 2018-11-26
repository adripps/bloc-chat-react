import React, { Component } from 'react';

class MessageList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      messages: [
        {username: "", content: "", sentAt: "", roomId: ""}
      ],
      newMessage: "",
      timeSent: ''
    };

    this.messagesRef = this.props.firebase.database().ref('messages');

    this.filterMessages = this.filterMessages.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
    const messages = snapshot.val();
    messages.key = snapshot.key;
    this.setState({ messages: this.state.messages.concat( messages ) })
    });
  }

  filterMessages(e, message, index) {
    console.log(this.props.currentRoom)
    if (this.props.currentRoom) {
      console.log('test')
      this.setState ({ newMessage: message.content})
    }
  }

   handleChange(e) {
     this.setState({ newMessage: e.target.value })
   }

   handleSubmit(e) {
     e.preventDefault();
     if (!this.state.newMessage) {return}
     this.messagesRef.push({
       content: this.state.newMessage,
       roomId: this.props.currentRoomKey,
       username: 'Test User',
       sentAt: this.props.firebase.database.ServerValue.TIMESTAMP
     });
     this.setState ({ newMessage: ''})
   }

  render() {
    return (
      <div className='messages'>
        <form id='createMessage' onSubmit={ (e) => this.handleSubmit(e) }>
         <fieldset>
          <input type='text' placeholder='Enter a Message' id='createdMessage' value= {this.state.newMessage} onChange={ (e) => this.handleChange(e)}/>
          <input type='submit' value='Submit'/>
         </fieldset>
        </form>
        <ul className="messageList">
          {this.state.messages
            .filter(message => message.roomId === this.props.currentRoomKey)
            .map((message, index)=>
            <div key= {index}>
              <li className="username">{message.username}</li>
              <li className="content">{message.content}</li>
              <li className="sentAt">{message.sentAt}</li>
            </div>
           )}
       </ul>
      </div>
    );
  }
}
export default MessageList;
