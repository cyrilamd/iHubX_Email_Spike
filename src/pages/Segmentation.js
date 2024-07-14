import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Segmentation.css';

function Segmentation() {
  const [segments, setSegments] = useState([]);
  const [criteria, setCriteria] = useState('');
  const [emails, setEmails] = useState('');
  const [selectedSegmentId, setSelectedSegmentId] = useState(null);

  useEffect(() => {
    axios.get('/api/segments').then(response => {
      setSegments(response.data);
    });
  }, []);

  const handleSegmentSave = async () => {
    const segmentData = { criteria, emails: emails.split(',').map(email => email.trim()) };
    if (selectedSegmentId) {
      await axios.put(`/api/segments/${selectedSegmentId}`, segmentData);
    } else {
      await axios.post('/api/segments', segmentData);
    }
    const response = await axios.get('/api/segments');
    setSegments(response.data);
    setCriteria('');
    setEmails('');
    setSelectedSegmentId(null);
  };

  const handleEditSegment = (segmentId) => {
    const segment = segments.find(s => s.id === segmentId);
    if (segment) {
      setSelectedSegmentId(segment.id);
      setCriteria(segment.criteria);
      setEmails(segment.emails.join(', '));
    }
  };

  return (
    <div className="segmentation">
      <h1>Segmentation</h1>
      <div className="segmentation-container">
        <div className="segmentation-input">
          <input
            type="text"
            placeholder="Criteria"
            value={criteria}
            onChange={(e) => setCriteria(e.target.value)}
          />
          <textarea
            placeholder="Emails (comma separated)"
            value={emails}
            onChange={(e) => setEmails(e.target.value)}
          />
        </div>
        <button onClick={handleSegmentSave}>
          {selectedSegmentId ? 'Update Segment' : 'Save Segment'}
        </button>
      </div>
      <ul>
        {segments.map(segment => (
          <li key={segment.id}>
            {segment.criteria}
            <button onClick={() => handleEditSegment(segment.id)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Segmentation;
