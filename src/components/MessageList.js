import React, { Component } from 'react';

class MessageList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      messages: [
        {username: "", content: "", sentAt: "", roomId: ""}
      ],
      newMessage: "",
    };

    this.messagesRef = this.props.firebase.database().ref('messages');

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

  handleChange(e) {
     this.setState({ newMessage: e.target.value })
  }

  handleSubmit(e) {
     e.preventDefault();
     if (!this.state.newMessage) {return}
     if (this.props.currentRoom !== '') {
       this.messagesRef.push({
         content: this.state.newMessage,
         roomId: this.props.currentRoomKey,
         username: this.props.user.displayName,
         sentAt: this.props.firebase.database.ServerValue.TIMESTAMP
       });
       this.setState ({ newMessage: ''})
    }
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
