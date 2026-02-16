// @ts-check
import React from 'react';
import { createRoot } from 'react-dom/client';
import htm from 'htm';

const html = htm.bind(React.createElement);

// ============ Common Components ============

function Navbar() {
  return html`
    <nav class="flex justify-between items-center px-8 py-4 bg-white shadow">
      <div class="text-2xl font-bold text-violet-500">Acme</div>
      <ul class="flex gap-8 list-none">
        <li><a class="no-underline text-gray-700 font-medium hover:text-violet-500 transition-colors" href="#features">Features</a></li>
        <li><a class="no-underline text-gray-700 font-medium hover:text-violet-500 transition-colors" href="#pricing">Pricing</a></li>
        <li><a class="no-underline text-gray-700 font-medium hover:text-violet-500 transition-colors" href="#about">About</a></li>
        <li><a class="no-underline text-gray-700 font-medium hover:text-violet-500 transition-colors" href="#contact">Contact</a></li>
      </ul>
    </nav>
  `;
}

function Footer() {
  return html`
    <footer class="bg-slate-950 text-gray-400 p-8 text-center text-sm">
      <p>© ${new Date().getFullYear()} Acme Inc. All rights reserved.</p>
    </footer>
  `;
}

export { React, createRoot, html, Navbar, Footer };
