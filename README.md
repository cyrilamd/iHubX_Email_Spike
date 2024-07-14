### iHubX Email Broadcasting Tool Integration Guide

This guide provides developers with the necessary steps to integrate the Mailjet-based email broadcasting tool into the main iHubX project. The tool includes functionalities such as creating and saving templates, sending campaigns, scheduling emails, segmenting user emails, and setting auto-replies.

#### Project Structure

```
iHubX-Email-Broadcasting-Tool/
├── backend/
│   ├── server.js
│   └── ... (other backend files)
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Campaigns.js
│   │   │   ├── Segmentation.js
│   │   │   ├── ScheduleSend.js
│   │   │   ├── AutoReplies.js
│   │   │   └── ...
│   │   ├── App.js
│   │   ├── index.js
│   │   └── ... (other frontend files)
│   └── ...
└── README.md
```

### Step-by-Step Implementation

#### 1. Clone the Repository

First, clone the repository to your local machine.

```bash
git clone <repository-url>
cd iHubX-Email-Broadcasting-Tool
```

#### 2. Backend Setup

Navigate to the `backend` directory and install dependencies.

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory and add your Mailjet credentials.

```
MAILJET_API_KEY=your-mailjet-api-key
MAILJET_SECRET_KEY=your-mailjet-secret-key
```

#### 3. Backend Code

The backend is implemented using Express.js. Below is a simplified version of the backend code from `server.js`.

```javascript
const express = require('express');
const bodyParser = require('body-parser');
const cron = require('node-cron');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

const MAILJET_API_KEY = process.env.MAILJET_API_KEY;
const MAILJET_SECRET_KEY = process.env.MAILJET_SECRET_KEY;
const MAILJET_BASE_URL = 'https://api.mailjet.com/v3.1';

const axiosInstance = axios.create({
  baseURL: MAILJET_BASE_URL,
  auth: {
    username: MAILJET_API_KEY,
    password: MAILJET_SECRET_KEY
  },
  headers: {
    'Content-Type': 'application/json'
  }
});

let templates = [];
let segments = [];
let autoReplies = [];

// Endpoint implementations (templates, segments, campaigns, scheduling, auto-replies)

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

#### 4. Frontend Setup

Navigate to the `client` directory and install dependencies.

```bash
cd ../client
npm install
```

#### 5. Frontend Code

The frontend is implemented using React. Below are the key components.

**Campaigns.js**
```javascript
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { htmlToText } from 'html-to-text';

function Campaigns() {
  // State and effect hooks
  // Handler functions
  // JSX for rendering
}

export default Campaigns;
```

**Segmentation.js**
```javascript
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Segmentation() {
  // State and effect hooks
  // Handler functions
  // JSX for rendering
}

export default Segmentation;
```

**ScheduleSend.js**
```javascript
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ScheduleSend() {
  // State and effect hooks
  // Handler functions
  // JSX for rendering
}

export default ScheduleSend;
```

**AutoReplies.js**
```javascript
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AutoReplies() {
  // State and effect hooks
  // Handler functions
  // JSX for rendering
}

export default AutoReplies;
```

#### 6. Running the Application

1. **Start the Backend Server**

   ```bash
   cd backend
   node server.js
   ```

2. **Start the Frontend Development Server**

   ```bash
   cd ../client
   npm start
   ```

### Integration Guide for Developers

To integrate this email broadcasting tool into the main iHubX project, follow these steps:

1. **Clone and Set Up Repositories:**
   Ensure both the main iHubX project and the email tool are cloned and dependencies are installed.

2. **Merge Backend Code:**
   - Copy the `backend` directory from the email tool into the iHubX project's backend.
   - Update any existing configurations to include Mailjet credentials.

3. **Merge Frontend Code:**
   - Copy the `client/src/components` directory from the email tool into the iHubX project's frontend.
   - Integrate the new components (`Campaigns`, `Segmentation`, `ScheduleSend`, `AutoReplies`) into the iHubX project’s routing and navigation.

4. **Ensure Proper Configuration:**
   - Update `.env` files with Mailjet credentials.
   - Ensure API endpoints are correctly routed and handled in both backend and frontend.

5. **Test the Integration:**
   - Test all functionalities: creating templates, sending campaigns, scheduling emails, managing segments, and auto-replies.
   - Debug any issues that arise during testing.

### Conclusion

This guide provides a step-by-step approach to integrating the Mailjet-based email broadcasting tool into the iHubX project. By following these instructions, developers can ensure a seamless integration and leverage the full capabilities of the email tool. If further customization is needed, developers should refer to the official Mailjet and Nodemailer documentation.
