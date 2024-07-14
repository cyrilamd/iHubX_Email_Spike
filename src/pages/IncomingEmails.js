import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './IncomingEmails.css';

function IncomingEmails() {
  const [incomingEmail, setIncomingEmail] = useState('');
  const [autoReplies, setAutoReplies] = useState([]);
  const [reply, setReply] = useState('');

  useEffect(() => {
    // Fetch auto-replies from the backend
    axios.get('/api/auto-replies')
      .then(response => {
        setAutoReplies(response.data);
      })
      .catch(error => {
        console.error('Error fetching auto-replies:', error);
      });
  }, []);

  const handleIncomingEmailChange = (e) => {
    setIncomingEmail(e.target.value);
  };

  const checkAutoReplies = () => {
    const foundReply = autoReplies.find(ar => incomingEmail.toLowerCase().includes(ar.trigger.toLowerCase()));
    if (foundReply) {
      setReply(foundReply.response);
    } else {
      setReply('No auto-reply found for this message.');
    }
  };

  return (
    <div className="incoming-emails">
      <h2>Test Auto Replies</h2>
      <input
        type="text"
        placeholder="Incoming Email Subject"
        value={incomingEmail}
        onChange={handleIncomingEmailChange}
      />
      <button onClick={checkAutoReplies}>Check Auto Replies</button>
      <p>Reply: {reply}</p>
    </div>
  );
}

export default IncomingEmails;
