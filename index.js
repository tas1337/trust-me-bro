#!/usr/bin/env node

const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const PORT = 3000;
const HTML_FILE = path.join(__dirname, 'page.html');

// Create a simple HTTP server
const server = http.createServer((req, res) => {
  fs.readFile(HTML_FILE, (err, data) => {
    if (err) {
      res.writeHead(500);
      res.end('Error loading page');
      return;
    }
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(data);
  });
});

server.listen(PORT, () => {
  const url = `http://localhost:${PORT}`;
  console.log(`Opening ${url}...`);
  
  // Open browser (works on Windows, Mac, Linux)
  const command = process.platform === 'win32' 
    ? `start ${url}`
    : process.platform === 'darwin'
    ? `open ${url}`
    : `xdg-open ${url}`;
  
  exec(command);
  
  console.log('Server running. Press Ctrl+C to stop.');
});
