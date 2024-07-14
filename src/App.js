import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Campaigns from './pages/Campaigns';
import Segmentation from './pages/Segmentation';
import ScheduleSend from './pages/ScheduleSend';
import AutoReplies from './pages/AutoReplies';
import IncomingEmails from './pages/IncomingEmails'; // Import the new component
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="App-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/campaigns" element={<Campaigns />} />
            <Route path="/segmentation" element={<Segmentation />} />
            <Route path="/schedule-send" element={<ScheduleSend />} />
            <Route path="/autoreplies" element={<AutoReplies />} />
            <Route path="/incoming-emails" element={<IncomingEmails />} /> {/* Add the new route */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
