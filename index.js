'use strict';

const express = require('express');
const async = require('async');
const cron = require('node-cron');
const request = require('request');
const cors = require('cors');
const axios = require('axios');
const fs = require('fs');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const getIP = require('ipware')().get_ip;
const path = require('path');

// Import server module
const server = require('./server.js');

const app = express();

// Rate limiter configuration
const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 99999999999, // Allow an extremely high number of requests
    message: { error: "Too many requests, please try again later." }
});

// Middleware setup
app.use(limiter);
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(cors());

// Logging IP addresses
app.use((req, res, next) => {
    const ipInfo = getIP(req);
    const colors = ["\x1b[33m", "\x1b[34m", "\x1b[35m", '\x1b[36m', '\x1b[32m'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    console.log(color + '[ IP ] -> ' + ipInfo.clientIp);
    next();
});

// Uptime monitoring function
async function uptime() {
    const srcPath = path.join(__dirname, 'public', 'corn', 'cronjob', 'index.json');
    if (!fs.existsSync(srcPath)) return;

    const dataJson = JSON.parse(fs.readFileSync(srcPath, 'utf-8'));
    if (!dataJson.length) return;

    cron.schedule('*/10 * * * * *', () => {
        async.mapLimit(dataJson, dataJson.length, (url, callback) => {
            request(url, (error, response, body) => {
                if (error) {
                    return callback(error);
                }
                callback(null, body);
            });
        }, (error, results) => {
            if (error) {
                console.error('Error fetching URLs:', error);
            }
            // Uncomment below to see results
            // console.log(results);
        });
    });
}

// Use server module for handling routes
app.use('/', server);

// Error handling middleware
app.use((error, req, res, next) => {
    res.status(error.status || 500).json({ message: error.message || 'Internal Server Error' });
});

// Route for home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'home.html'));
});

// POST route example
app.post('/', (req, res) => {
    res.json({ data: "hi" });
});

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, (err) => {
    if (err) {
        console.error('Error starting the server:', err);
        process.exit(1);
    }
    console.log('\x1b[36m[ START ] -> Server listening on port\x1b[37m', PORT, '\n');
});


// Initialize uptime monitoring
uptime();
