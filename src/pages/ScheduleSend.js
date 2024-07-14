import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ScheduleSend.css';

function ScheduleSend() {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [segments, setSegments] = useState([]);
  const [selectedSegments, setSelectedSegments] = useState([]);
  const [subject, setSubject] = useState('');
  const [htmlMessage, setHtmlMessage] = useState('');
  const [textMessage, setTextMessage] = useState('');
  const [schedule, setSchedule] = useState('');

  useEffect(() => {
    axios.get('/api/templates').then(response => {
      setTemplates(response.data);
    });
    axios.get('/api/segments').then(response => {
      setSegments(response.data);
    });
  }, []);

  const handleTemplateSelect = (templateId) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setSelectedTemplate(template);
      setSubject(template.subject);
      setHtmlMessage(template.htmlMessage || '');
      setTextMessage(template.textMessage || '');
    }
  };

  const handleSendNow = async () => {
    const recipients = selectedSegments.flatMap(segment => segment.emails);
    const campaignData = { subject, message: htmlMessage, recipients };
    await axios.post('/api/send-campaign', campaignData);
  };

  const handleScheduleSend = async () => {
    const recipients = selectedSegments.flatMap(segment => segment.emails);
    const scheduleData = { subject, message: htmlMessage, recipients, schedule };
    await axios.post('/api/schedule-email', scheduleData);
  };

  return (
    <div className="schedule-send">
      <h1>Schedule or Send Campaign</h1>
      <div className="schedule-send-container">
        <div className="left-column">
          <div className="templates">
            <h2>Select Template</h2>
            <select onChange={(e) => handleTemplateSelect(e.target.value)}>
              <option value="">Select a template</option>
              {templates.map(template => (
                <option key={template.id} value={template.id}>
                  {template.subject}
                </option>
              ))}
            </select>
          </div>
          <div className="message-preview">
            <h2>HTML Message</h2>
            <textarea
              value={htmlMessage}
              onChange={(e) => setHtmlMessage(e.target.value)}
            />
          </div>
        </div>
        <div className="right-column">
          <div className="segments">
            <h2>Select Segments</h2>
            <select multiple onChange={(e) => setSelectedSegments([...e.target.selectedOptions].map(option => segments.find(segment => segment.id === option.value)))}>
              {segments.map(segment => (
                <option key={segment.id} value={segment.id}>
                  {segment.criteria}
                </option>
              ))}
            </select>
          </div>
          <div className="message-preview">
            <h2>Text Message</h2>
            <textarea
              value={textMessage}
              onChange={(e) => setTextMessage(e.target.value)}
            />
          </div>
          <div className="schedule">
            <h2>Schedule</h2>
            <input type="datetime-local" value={schedule} onChange={(e) => setSchedule(e.target.value)} />
          </div>
          <button onClick={handleSendNow}>Send Now</button>
          <button onClick={handleScheduleSend}>Schedule Send</button>
        </div>
      </div>
    </div>
  );
}

export default ScheduleSend;
