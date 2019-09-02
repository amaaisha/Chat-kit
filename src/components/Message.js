import React from 'react'

const Message =({ message: { senderId, parts } }) => {

    return (
      <div className="message">
          <div className="message-username">{senderId}</div>
          <div className="message-text">{parts[0].payload.content}</div>
      </div>
    )
  }

export default Message