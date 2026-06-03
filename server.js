import http from 'http';
import fs from 'fs';
import path from 'path';

const PORT = 3000;

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ico': 'image/x-icon',
  '.webmanifest': 'application/manifest+json'
};

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);
  
  // Parse URL to get file path
  let safeUrl = req.url.split('?')[0];
  if (safeUrl === '/') {
    safeUrl = '/index.html';
  }
  
  const filePath = path.join(process.cwd(), safeUrl);
  
  // Check if file exists
  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain');
      res.end('404 Not Found');
      return;
    }
    
    // Get file extension and mime type
    const ext = path.extname(filePath).toLowerCase();
    const mimeType = MIME_TYPES[ext] || 'application/octet-stream';
    
    // Set headers
    res.statusCode = 200;
    res.setHeader('Content-Type', mimeType);
    
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    // Stream file
    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`\n==================================================`);
  console.log(`  Pure Static Server is running at:`);
  console.log(`  http://localhost:${PORT}/`);
  console.log(`==================================================\n`);
});
