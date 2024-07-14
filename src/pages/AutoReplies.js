import React, { useState } from 'react';
import './AutoReplies.css';

function AutoReplies() {
  const [trigger, setTrigger] = useState('');
  const [response, setResponse] = useState('');
  const [autoReplies, setAutoReplies] = useState([]);
  const [customTriggers, setCustomTriggers] = useState([]);
  const [newTrigger, setNewTrigger] = useState('');

  const suggestedTriggers = ["help", "support", "question", "issue", "contact"];

  const handleAutoReplySave = () => {
    const newAutoReply = { id: Date.now(), trigger, response };
    setAutoReplies([...autoReplies, newAutoReply]);
    setTrigger('');
    setResponse('');
  };

  const handleAddTrigger = () => {
    if (newTrigger && !customTriggers.includes(newTrigger)) {
      setCustomTriggers([...customTriggers, newTrigger]);
      setNewTrigger('');
    }
  };

  return (
    <div className="auto-replies">
      <h1>Auto Replies</h1>
      <div className="auto-replies-input">
        <select
          value={trigger}
          onChange={(e) => setTrigger(e.target.value)}
          className="trigger-dropdown"
        >
          <option value="">Select Trigger</option>
          {suggestedTriggers.concat(customTriggers).map((triggerOption, index) => (
            <option key={index} value={triggerOption}>
              {triggerOption}
            </option>
          ))}
        </select>
        <textarea
          placeholder="Response"
          value={response}
          onChange={(e) => setResponse(e.target.value)}
          className="response-textarea"
        />
        <button onClick={handleAutoReplySave} className="save-button">Save Auto Reply</button>
      </div>
      <div className="add-trigger">
        <input
          type="text"
          placeholder="New Trigger"
          value={newTrigger}
          onChange={(e) => setNewTrigger(e.target.value)}
          className="new-trigger-input"
        />
        <button onClick={handleAddTrigger} className="add-trigger-button">Add Trigger</button>
      </div>
      <ul className="auto-replies-list">
        {autoReplies.map(autoReply => (
          <li key={autoReply.id} className="auto-reply-item">
            {autoReply.trigger} - {autoReply.response}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AutoReplies;
