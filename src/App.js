import React from 'react'
import { ChatManager, TokenProvider } from '@pusher/chatkit-client'
import MessageList from './components/MessageList'
import SendMessageForm from './components/SendMessageForm'
import RoomList from './components/RoomList'
import NewRoomForm from './components/NewRoomForm'

import {tokenUrl, instanceLocator} from "./config";


class App extends React.Component {
    constructor() {
      super();
      this.state = {
        messages: []
      };
      this.sendMessage = this.sendMessage.bind(this)
    }

    componentDidMount() {
      const chatManager = new ChatManager({
        instanceLocator: instanceLocator,
        userId: 'biscuit',
        tokenProvider: new TokenProvider({ url: tokenUrl })
      });
      chatManager.connect()
        .then(currentUser => {
          this.currentUser = currentUser;
          this.currentUser.subscribeToRoomMultipart({
            roomId: 'beee5b8f-eb95-46a2-8b26-d3d78d577132',
            hooks: {
              onMessage: message => {
                this.setState({
                  messages: [...this.state.messages, message]
                })
              }
            }
          })
        })
        .catch(err => {
          console.log('Error on connection', err)
        })
    }

    sendMessage(text) {
      this.currentUser.sendMessage({
        text,
        roomId: 'beee5b8f-eb95-46a2-8b26-d3d78d577132'
      })
    }

    render() {
      console.log('here are the messages', this.state.messages);
      return (
        <div className="app">
          <RoomList/>
          <MessageList messages={this.state.messages}/>
          <SendMessageForm sendMessage={this.sendMessage}/>
          <NewRoomForm/>
        </div>
      );
    }

}

export default App