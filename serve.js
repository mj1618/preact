// @ts-check
import { createServer } from 'http';
import { readFile } from 'fs/promises';
import { extname, join } from 'path';
import { fileURLToPath } from 'url';
import ts from 'typescript';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const SRC_DIR = join(__dirname, 'src');
const PORT = process.env.PORT || 3000;

/** @type {Record<string, string>} */
const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.ts': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

/** @type {ts.CompilerOptions} */
const TS_COMPILER_OPTIONS = {
  module: ts.ModuleKind.ESNext,
  target: ts.ScriptTarget.ESNext,
  moduleResolution: ts.ModuleResolutionKind.Bundler,
  esModuleInterop: true,
  strict: true,
  skipLibCheck: true,
  jsx: ts.JsxEmit.React,
};

/**
 * Transpile TypeScript to JavaScript
 * @param {string} code - TypeScript source code
 * @param {string} filename - Source filename for error messages
 * @returns {string} JavaScript code
 */
function transpileTypeScript(code, filename) {
  const result = ts.transpileModule(code, {
    compilerOptions: TS_COMPILER_OPTIONS,
    fileName: filename,
  });
  return result.outputText;
}

const server = createServer(async (req, res) => {
  try {
    let pathname = req.url || '/';
    
    // Remove query string
    pathname = pathname.split('?')[0];
    
    // Default to index.html
    if (pathname === '/') {
      pathname = '/index.html';
    }

    const filePath = join(SRC_DIR, pathname);
    
    // Security: ensure we're not serving files outside src/
    if (!filePath.startsWith(SRC_DIR)) {
      res.writeHead(403);
      res.end('Forbidden');
      return;
    }

    const ext = extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    let content = await readFile(filePath, ext === '.ts' ? 'utf-8' : undefined);
    
    // Transpile TypeScript files on-the-fly
    if (ext === '.ts') {
      content = transpileTypeScript(/** @type {string} */ (content), filePath);
    }

    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);
  } catch (err) {
    if (err instanceof Error && /** @type {NodeJS.ErrnoException} */ (err).code === 'ENOENT') {
      res.writeHead(404);
      res.end('Not Found');
    } else {
      console.error(err);
      res.writeHead(500);
      res.end('Internal Server Error');
    }
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
