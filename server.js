// server.js
const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3001;
const staticDir = path.join(__dirname, 'src');

// MIME types for common file extensions
const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf',
    '.txt': 'text/plain',
};

const server = http.createServer((req, res) => {
    // Default to index.html for root path
    let urlPath = req.url === '/' ? '/index.html' : req.url;
    
    // Remove query strings
    urlPath = urlPath.split('?')[0];
    
    // Resolve the file path within the src directory
    const filePath = path.join(staticDir, urlPath);
    
    // Security: prevent directory traversal
    if (!filePath.startsWith(staticDir)) {
        res.writeHead(403, { 'Content-Type': 'text/plain' });
        res.end('403 Forbidden');
        return;
    }

    fs.readFile(filePath, (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('404 Not Found');
            } else {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('500 Internal Server Error');
            }
        } else {
            const ext = path.extname(filePath).toLowerCase();
            const contentType = mimeTypes[ext] || 'application/octet-stream';
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        }
    });
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
    console.log(`Serving files from: ${staticDir}`);
});