// @ts-check
import { React, createRoot, html, Navbar, Footer } from './common.js';

// ============ Page Components ============

function Hero() {
  return html`
    <section class="bg-gradient-to-br from-indigo-500 to-purple-600 text-white py-24 px-8 text-center">
      <h1 class="text-5xl font-bold mb-4">Build Something Amazing</h1>
      <p class="text-xl opacity-90 max-w-2xl mx-auto mb-8">
        A modern platform to help you create, launch, and scale your next big idea. Simple, powerful, and designed for teams of all sizes.
      </p>
      <button class="bg-white text-violet-500 border-none py-4 px-10 text-lg font-semibold rounded-full cursor-pointer shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200">
        Get Started Free
      </button>
    </section>
  `;
}

/**
 * @param {{ icon: string, title: string, description: string }} props
 */
function FeatureCard({ icon, title, description }) {
  return html`
    <div class="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow">
      <div class="text-5xl mb-4">${icon}</div>
      <h3 class="text-xl font-semibold mb-2">${title}</h3>
      <p class="text-gray-600 text-sm">${description}</p>
    </div>
  `;
}

function Features() {
  const features = [
    {
      icon: "🚀",
      title: "Lightning Fast",
      description: "Optimized for speed and performance. Your users will love the instant load times.",
    },
    {
      icon: "🔒",
      title: "Secure by Default",
      description: "Enterprise-grade security built in from day one. Your data is always protected.",
    },
    {
      icon: "📊",
      title: "Powerful Analytics",
      description: "Gain insights with comprehensive analytics and reporting tools.",
    },
    {
      icon: "🎨",
      title: "Beautiful Design",
      description: "Modern, responsive interfaces that look great on any device.",
    },
    {
      icon: "🔌",
      title: "Easy Integrations",
      description: "Connect with your favorite tools and services in just a few clicks.",
    },
    {
      icon: "💬",
      title: "24/7 Support",
      description: "Our team is here to help you succeed, whenever you need us.",
    },
  ];

  return html`
    <section class="py-20 px-8 bg-gray-100" id="features">
      <h2 class="text-center text-3xl font-bold mb-12 text-slate-900">Why Choose Us</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        ${features.map((f) => html`<${FeatureCard} ...${f} />`)}
      </div>
    </section>
  `;
}

function CallToAction() {
  return html`
    <section class="bg-slate-900 text-white py-20 px-8 text-center">
      <h2 class="text-3xl font-bold mb-4">Ready to Get Started?</h2>
      <p class="opacity-80 mb-8">Join thousands of teams already using our platform.</p>
      <button class="bg-transparent text-white border-2 border-white py-4 px-10 text-lg font-semibold rounded-full cursor-pointer hover:bg-white hover:text-slate-900 transition-colors">
        Start Your Free Trial
      </button>
    </section>
  `;
}

function App() {
  return html`
    <div class="font-sans text-slate-900 leading-relaxed">
      <${Navbar} />
      <${Hero} />
      <${Features} />
      <${CallToAction} />
      <${Footer} />
    </div>
  `;
}

// ============ Mount ============

const rootEl = document.getElementById("root");
if (!rootEl) throw new Error("Missing #root");

createRoot(rootEl).render(html`<${App} />`);
