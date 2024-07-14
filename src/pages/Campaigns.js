import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { htmlToText } from 'html-to-text';
import './Campaigns.css';

function Campaigns() {
  const [templates, setTemplates] = useState([]);
  const [subject, setSubject] = useState('');
  const [htmlMessage, setHtmlMessage] = useState('');
  const [textMessage, setTextMessage] = useState('');
  const [selectedTemplateId, setSelectedTemplateId] = useState(null);

  useEffect(() => {
    axios.get('/api/templates').then(response => {
      setTemplates(response.data);
    });
  }, []);

  const handleTemplateSave = async () => {
    const templateData = { subject, htmlMessage, textMessage };
    if (selectedTemplateId) {
      await axios.put(`/api/templates/${selectedTemplateId}`, templateData);
    } else {
      await axios.post('/api/templates', templateData);
    }
    const response = await axios.get('/api/templates');
    setTemplates(response.data);
    setSubject('');
    setHtmlMessage('');
    setTextMessage('');
    setSelectedTemplateId(null);
  };

  const handleEditTemplate = (templateId) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setSelectedTemplateId(template.id);
      setSubject(template.subject);
      setHtmlMessage(template.htmlMessage);
      setTextMessage(template.textMessage);
    }
  };

  const handleHtmlChange = (e) => {
    const htmlContent = e.target.value;
    setHtmlMessage(htmlContent);
    const plainText = htmlToText(htmlContent, {
      wordwrap: 130,
      selectors: [
        { selector: 'img', format: 'skip' },
        { selector: 'a', options: { ignoreHref: true } }
      ]
    });
    setTextMessage(plainText);
  };

  const handleTextChange = (e) => {
    setTextMessage(e.target.value);
  };

  return (
    <div className="campaigns">
      <h1>Email Campaigns</h1>
      <div className="campaigns-container">
        <div className="campaigns-input">
          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
        <div className="campaigns-editor">
          <div className="html-editor">
            <h2>HTML Input</h2>
            <textarea
              placeholder="HTML Message"
              value={htmlMessage}
              onChange={handleHtmlChange}
            />
          </div>
          <div className="text-editor">
            <h2>Text Input</h2>
            <textarea
              placeholder="Text Message"
              value={textMessage}
              onChange={handleTextChange}
            />
          </div>
        </div>
        <button onClick={handleTemplateSave}>
          {selectedTemplateId ? 'Update Template' : 'Save Template'}
        </button>
      </div>
      <ul>
        {templates.map(template => (
          <li key={template.id}>
            {template.subject}
            <button onClick={() => handleEditTemplate(template.id)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Campaigns;
