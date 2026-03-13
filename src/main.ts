import './style.css';

type Project = {
  name: string;
  subtitle: string;
  url: string;
  summary: string;
  tech: string[];
  icon: string;
};

type AiResponse = {
  answer?: string;
  error?: string;
};

type LocationResponse = {
  ip?: string;
  city?: string;
  region?: string;
  country?: string;
  countryCode?: string;
  timezone?: string;
  latitude?: number;
  longitude?: number;
  error?: string;
  message?: string;
};

const projects: Project[] = [
  {
    name: 'XpressCV',
    subtitle: 'AI Resume Generation Tool',
    url: 'https://xpresscv.com',
    summary:
      'Generate and tailor resumes quickly using AI-driven workflows focused on quality and speed.',
    tech: ['React', 'Node.js', 'AI/ML', 'AWS'],
    icon: '📄'
  },
  {
    name: 'OckraTech',
    subtitle: 'Financial Trading Platform',
    url: 'https://ocktratech.com',
    summary:
      'A trading platform experience centered on fast decisions, clean analytics, and reliable workflows.',
    tech: ['React', 'TypeScript', 'WebSockets', 'PostgreSQL'],
    icon: '📈'
  }
];

const aiApiUrl = import.meta.env.VITE_AI_API_URL as string | undefined;
const locationApiUrl = import.meta.env.VITE_LOCATION_API_URL as string | undefined;
const app = document.querySelector<HTMLDivElement>('#app');

if (!app) {
  throw new Error('App container not found');
}

app.innerHTML = `
  <main class="relative min-h-screen overflow-hidden bg-amber-50 text-gray-800">
    <!-- Animated background orbs -->
    <div class="pointer-events-none absolute -left-24 top-24 h-96 w-96 rounded-full bg-coral-200/30 blur-3xl animate-pulse-slow"></div>
    <div class="pointer-events-none absolute -right-16 top-6 h-80 w-80 rounded-full bg-teal-200/30 blur-3xl animate-pulse-slower"></div>
    <div class="pointer-events-none absolute bottom-24 left-1/3 h-64 w-64 rounded-full bg-amber-200/25 blur-3xl animate-pulse-slow"></div>

    <!-- Navigation Bar -->
    <nav class="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/90 border-b border-gray-200 shadow-sm">
      <div class="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
        <div class="flex items-center gap-8">
          <h1 class="text-xl font-bold text-coral-600">HVR</h1>
          <div class="hidden md:flex gap-6">
            <a href="#about" class="nav-link text-sm font-medium text-gray-700 hover:text-coral-600 transition">About</a>
            <a href="#experience" class="nav-link text-sm font-medium text-gray-700 hover:text-coral-600 transition">Experience</a>
            <a href="#projects" class="nav-link text-sm font-medium text-gray-700 hover:text-coral-600 transition">Projects</a>
            <a href="#skills" class="nav-link text-sm font-medium text-gray-700 hover:text-coral-600 transition">Skills</a>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <button id="ai-toggle-btn" class="px-4 py-2 rounded-full bg-coral-500 text-white text-sm font-semibold hover:bg-coral-600 transition shadow-md hover:shadow-lg">
            💬 AI Chat
          </button>
          <a href="mailto:ghanta.17116031@gmail.com" class="hidden md:block px-4 py-2 rounded-full bg-gray-100 border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-200 transition">
            Contact
          </a>
        </div>
      </div>
    </nav>

    <!-- AI Chat Modal -->
    <div id="ai-modal" class="fixed inset-0 z-50 hidden items-center justify-center bg-black/50 backdrop-blur-sm">
      <div class="mx-4 w-full max-w-2xl rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl">
        <div class="mb-4 flex items-center justify-between">
          <div>
            <h3 class="text-xl font-bold text-gray-900">AI Assistant</h3>
            <p class="text-sm text-gray-600">Powered by AWS Lambda + Bedrock</p>
          </div>
          <button id="ai-close-btn" class="rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div class="grid gap-4">
          <textarea id="ai-question" class="ai-input" rows="3" placeholder="Ask me about my experience with microservices, cloud architecture, or any of my projects..."></textarea>
          <div class="flex items-center gap-3">
            <button id="ask-ai-btn" class="ai-button flex-1" type="button">Ask AI Assistant</button>
          </div>
          <div id="ai-answer" class="ai-output min-h-32">AI response will appear here.</div>
          <p class="text-xs text-gray-500">💡 Set <code class="px-1.5 py-0.5 rounded bg-gray-100 text-gray-700 border border-gray-300">VITE_AI_API_URL</code> in .env to enable</p>
        </div>
      </div>
    </div>

    <!-- Greeting Bot Modal -->
    <div id="greeting-modal" class="fixed inset-0 z-50 hidden items-center justify-center bg-black/50 backdrop-blur-sm">
      <div class="mx-4 w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl">
        <div class="mb-4 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <span class="text-3xl">👋</span>
            <div>
              <h3 class="text-xl font-bold text-gray-900">Hello, Visitor!</h3>
              <p class="text-sm text-gray-600" id="greeting-location">Detecting your location...</p>
            </div>
          </div>
          <button id="greeting-close-btn" class="rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div class="space-y-4">
          <div id="greeting-message" class="text-gray-800 space-y-2">
            <p>Welcome to my portfolio! I'm <strong class="text-coral-600">Harsha Vardhan Reddy</strong>, a Senior Software Developer passionate about building scalable cloud solutions.</p>
            <p class="text-sm text-gray-700">I love experimenting with cutting-edge technologies like:</p>
            <ul class="text-sm text-gray-700 list-disc list-inside space-y-1 ml-2">
              <li>AI/ML integrations (like this chatbot!)</li>
              <li>Cloud-native architectures on AWS</li>
              <li>Real-time data processing with Kafka</li>
              <li>Modern full-stack development</li>
            </ul>
            <p class="text-sm text-gray-600 mt-3">Feel free to explore my projects, experience, and don't hesitate to reach out!</p>
          </div>
          <div class="flex gap-3">
            <button id="greeting-ai-btn" class="flex-1 px-4 py-2 rounded-full bg-coral-500 text-white text-sm font-semibold hover:bg-coral-600 transition shadow-md">
              💬 Ask AI About Me
            </button>
            <button id="greeting-explore-btn" class="flex-1 px-4 py-2 rounded-full bg-gray-100 border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-200 transition">
              🚀 Explore Portfolio
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Greeting Bot Floating Button (bottom-right corner) -->
    <button id="greeting-float-btn" class="fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full bg-coral-500 text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 flex items-center justify-center">
      <span class="text-2xl">👋</span>
    </button>

    <!-- Hero Section -->
    <header class="scroll-fade relative px-6 pt-32 pb-20 text-center md:pt-40 md:pb-24">
      <div class="mx-auto mb-6 inline-flex items-center gap-2 gradient-pill animate-bounce-subtle">
        <span class="relative flex h-2 w-2">
          <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
          <span class="relative inline-flex h-2 w-2 rounded-full bg-green-600"></span>
        </span>
        Available for opportunities
      </div>
      <h1 class="mb-6 text-coral-600 text-5xl font-extrabold tracking-tight md:text-7xl">
        Harsha Vardhan Reddy
      </h1>
      <p class="mx-auto mb-4 max-w-2xl text-xl text-gray-700 md:text-2xl">
        <span id="typed-role" class="inline-block min-w-[200px] text-left"></span><span class="animate-blink">|</span>
      </p>
      <p class="mx-auto mt-4 max-w-3xl text-base text-gray-600 md:text-lg">
        Building scalable cloud solutions with expertise in React, Node.js, AWS, and modern DevOps practices.
      </p>
      <div class="mx-auto mt-8 flex flex-wrap justify-center gap-4">
        <a href="#projects" class="px-6 py-3 rounded-full bg-coral-500 text-white font-semibold hover:shadow-lg hover:shadow-coral-500/50 transition transform hover:scale-105">
          View Projects
        </a>
        <a href="mailto:ghanta.17116031@gmail.com" class="px-6 py-3 rounded-full border border-gray-300 bg-white text-gray-700 font-semibold hover:bg-gray-50 transition transform hover:scale-105 shadow-sm">
          Get in Touch
        </a>
      </div>
      <div class="mx-auto mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-600">
        <a href="tel:940-843-1600" class="flex items-center gap-2 hover:text-coral-600 transition">
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
          </svg>
          940-843-1600
        </a>
        <a href="mailto:ghanta.17116031@gmail.com" class="flex items-center gap-2 hover:text-coral-600 transition">
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
          </svg>
          ghanta.17116031@gmail.com
        </a>
      </div>
    </header>

    <section class="mx-auto max-w-6xl space-y-16 px-6 pb-20">
      <!-- About Section -->
      <div id="about" class="scroll-animate glass-card">
        <span class="gradient-pill mb-4">About Me</span>
        <h2 class="section-title">Senior Software Developer & Cloud Solutions Architect</h2>
        <p class="section-subtitle">MS in Computer Science from UT Dallas | AWS Certified AI Practitioner</p>
        <div class="text-gray-700 space-y-4">
          <p>Hi, I'm <strong class="text-coral-600">Harsha Vardhan Reddy</strong>, a Senior Software Developer at Anthem Inc. with a passion for building scalable, high-performance systems. I specialize in full-stack development, cloud architecture, and AI-driven automation.</p>
        </div>
      </div>

      <!-- Experience Section -->
      <div id="experience" class="scroll-animate">
        <span class="gradient-pill mb-6 inline-block">Experience</span>
        <h2 class="section-title mb-8">Professional Journey</h2>
        <div class="grid gap-6">
          <div class="experience-card">
            <div class="flex items-start justify-between gap-4">
              <div class="flex-1">
                <h3 class="text-xl font-bold text-coral-600">Senior Software Developer</h3>
                <p class="text-sm text-gray-600 mt-1">Anthem Inc.</p>
              </div>
            </div>
            <p class="mt-3 text-sm text-gray-700">Leading development of enterprise healthcare solutions, focusing on scalability and performance optimization.</p>
          </div>
          <div class="experience-card">
            <div class="flex items-start justify-between gap-4">
              <div class="flex-1">
                <h3 class="text-xl font-bold text-coral-600">Software Developer</h3>
                <p class="text-sm text-gray-600 mt-1">Leidos</p>
              </div>
            </div>
            <p class="mt-3 text-sm text-gray-700">Developed secure government solutions with focus on reliability and compliance.</p>
          </div>
          <div class="experience-card">
            <div class="flex items-start justify-between gap-4">
              <div class="flex-1">
                <h3 class="text-xl font-bold text-coral-600">Full Stack Developer</h3>
                <p class="text-sm text-gray-600 mt-1">Ocktra Tech</p>
              </div>
            </div>
            <p class="mt-3 text-sm text-gray-700">Built real-time trading platform with WebSockets and high-performance data processing.</p>
          </div>
        </div>
      </div>

      <!-- Projects Section -->
      <div id="projects" class="scroll-animate">
        <span class="gradient-pill mb-6 inline-block">Featured Projects</span>
        <h2 class="section-title mb-8">What I've Built</h2>
        <div class="grid md:grid-cols-2 gap-6">
          ${projects
            .map(
              (project) => `
                <article class="scroll-scale project-card group">
                  <div class="mb-4 flex items-start justify-between">
                    <div class="flex items-center gap-3">
                      <span class="text-3xl">${project.icon}</span>
                      <div>
                        <h3 class="text-xl font-bold text-coral-600 group-hover:text-coral-700 transition">${project.name}</h3>
                        <p class="text-sm text-gray-600">${project.subtitle}</p>
                      </div>
                    </div>
                  </div>
                  <div class="mb-4 rounded-lg overflow-hidden border border-gray-200 bg-gray-50 h-64">
                    <iframe
                      src="${project.url}"
                      title="${project.name} preview"
                      class="w-full h-full"
                      sandbox="allow-scripts allow-same-origin allow-forms"
                      loading="lazy"
                    ></iframe>
                  </div>
                  <p class="mb-4 text-gray-700">${project.summary}</p>
                  <div class="mb-4 flex flex-wrap gap-2">
                    ${project.tech.map(tech => `<span class="tech-badge">${tech}</span>`).join('')}
                  </div>
                  <a class="inline-flex items-center gap-2 rounded-full border border-coral-400 bg-coral-50 px-4 py-2 text-sm font-semibold text-coral-600 transition hover:bg-coral-100 hover:shadow-md" href="${project.url}" target="_blank" rel="noopener noreferrer">
                    Visit Project
                    <svg class="h-4 w-4 group-hover:translate-x-1 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </a>
                </article>
              `
            )
            .join('')}
        </div>
      </div>

      <!-- Skills Section -->
      <div id="skills" class="scroll-animate glass-card">
        <span class="gradient-pill mb-6 inline-block">Skills</span>
        <h2 class="section-title mb-8">Technical Expertise</h2>
        <div class="grid md:grid-cols-3 gap-6">
          <div>
            <h3 class="text-lg font-semibold text-coral-600 mb-3 flex items-center gap-2">
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
              </svg>
              Frontend
            </h3>
            <div class="flex flex-wrap gap-2">
              <span class="skill-tag">React</span>
              <span class="skill-tag">TypeScript</span>
              <span class="skill-tag">Tailwind CSS</span>
              <span class="skill-tag">Next.js</span>
            </div>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-teal-600 mb-3 flex items-center gap-2">
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path>
              </svg>
              Backend
            </h3>
            <div class="flex flex-wrap gap-2">
              <span class="skill-tag">Node.js</span>
              <span class="skill-tag">Python</span>
              <span class="skill-tag">PostgreSQL</span>
              <span class="skill-tag">MongoDB</span>
            </div>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-amber-600 mb-3 flex items-center gap-2">
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path>
              </svg>
              Cloud & DevOps
            </h3>
            <div class="flex flex-wrap gap-2">
              <span class="skill-tag">AWS</span>
              <span class="skill-tag">Docker</span>
              <span class="skill-tag">Kafka</span>
              <span class="skill-tag">CI/CD</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Education -->
      <div class="scroll-animate glass-card">
        <span class="gradient-pill mb-6 inline-block">Education</span>
        <h2 class="section-title mb-6">Academic Background</h2>
        <div class="grid md:grid-cols-2 gap-6">
          <div class="rounded-xl border border-coral-200 bg-coral-50 p-6 shadow-sm">
            <h3 class="text-lg font-bold text-gray-900">MS in Computer Science</h3>
            <p class="text-gray-700 mt-1">University of Texas at Dallas</p>
            <p class="text-sm text-gray-600 mt-2">2022 - 2023</p>
          </div>
          <div class="rounded-xl border border-teal-200 bg-teal-50 p-6 shadow-sm">
            <h3 class="text-lg font-bold text-gray-900">BTech in Information Technology</h3>
            <p class="text-gray-700 mt-1">NIT Raipur, India</p>
            <p class="text-sm text-gray-600 mt-2">2016 - 2020</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="border-t border-gray-200 bg-white/80 px-6 py-8 text-center backdrop-blur-sm">
      <p class="text-sm text-gray-600">© 2026 Harsha Vardhan Reddy. Built with TypeScript & Tailwind CSS.</p>
    </footer>
  </main>
`;

// AI Modal Toggle
const aiToggleBtn = document.querySelector<HTMLButtonElement>('#ai-toggle-btn');
const aiModal = document.querySelector<HTMLDivElement>('#ai-modal');
const aiCloseBtn = document.querySelector<HTMLButtonElement>('#ai-close-btn');

const toggleAiModal = (): void => {
  if (aiModal) {
    aiModal.classList.toggle('hidden');
    aiModal.classList.toggle('flex');
  }
};

if (aiToggleBtn) {
  aiToggleBtn.addEventListener('click', toggleAiModal);
}

if (aiCloseBtn) {
  aiCloseBtn.addEventListener('click', toggleAiModal);
}

if (aiModal) {
  aiModal.addEventListener('click', (e) => {
    if (e.target === aiModal) {
      toggleAiModal();
    }
  });
}

// Typing animation for roles
const roles = ['Senior Software Developer', 'Full Stack Engineer', 'Cloud Solutions Architect', 'AWS Certified Professional'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedRole = document.querySelector<HTMLSpanElement>('#typed-role');

const typeRole = (): void => {
  if (!typedRole) return;

  const currentRole = roles[roleIndex];

  if (isDeleting) {
    typedRole.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typedRole.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === currentRole.length) {
    setTimeout(() => { isDeleting = true; }, 2000);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
  }

  const typeSpeed = isDeleting ? 50 : 100;
  setTimeout(typeRole, typeSpeed);
};

setTimeout(typeRole, 500);

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (this: HTMLAnchorElement, e: Event) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href') as string);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// AI Chat functionality
const aiQuestion = document.querySelector<HTMLTextAreaElement>('#ai-question');
const aiButton = document.querySelector<HTMLButtonElement>('#ask-ai-btn');
const aiAnswer = document.querySelector<HTMLDivElement>('#ai-answer');

const setAiAnswer = (text: string): void => {
  if (aiAnswer) {
    aiAnswer.textContent = text;
  }
};

const askAi = async (): Promise<void> => {
  if (!aiQuestion || !aiButton) {
    return;
  }

  const question = aiQuestion.value.trim();
  if (!question) {
    setAiAnswer('Please enter a question first.');
    return;
  }

  if (!aiApiUrl) {
    setAiAnswer('Backend is not configured yet. Set VITE_AI_API_URL in your .env file.');
    return;
  }

  aiButton.disabled = true;
  aiButton.textContent = 'Thinking...';
  setAiAnswer('Contacting Lambda + Bedrock...');

  try {
    const response = await fetch(aiApiUrl, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ question })
    });

    const payload = (await response.json()) as AiResponse;
    if (!response.ok) {
      throw new Error(payload.error || 'Request failed');
    }

    setAiAnswer(payload.answer || 'No answer returned.');
  } catch (error) {
    setAiAnswer(`AI request failed: ${error instanceof Error ? error.message : 'unknown error'}`);
  } finally {
    aiButton.disabled = false;
    aiButton.textContent = 'Ask AI Assistant';
  }
};

if (aiButton) {
  aiButton.addEventListener('click', () => {
    void askAi();
  });
}

// Greeting Bot functionality
const greetingModal = document.querySelector<HTMLDivElement>('#greeting-modal');
const greetingFloatBtn = document.querySelector<HTMLButtonElement>('#greeting-float-btn');
const greetingCloseBtn = document.querySelector<HTMLButtonElement>('#greeting-close-btn');
const greetingAiBtn = document.querySelector<HTMLButtonElement>('#greeting-ai-btn');
const greetingExploreBtn = document.querySelector<HTMLButtonElement>('#greeting-explore-btn');
const greetingLocationEl = document.querySelector<HTMLParagraphElement>('#greeting-location');

const closeGreetingModal = (): void => {
  if (greetingModal) {
    greetingModal.classList.add('hidden');
    greetingModal.classList.remove('flex');
  }
};

const showGreetingModal = (): void => {
  if (greetingModal) {
    greetingModal.classList.remove('hidden');
    greetingModal.classList.add('flex');
  }
};

// Fetch visitor location and update greeting
const fetchAndDisplayLocation = async (): Promise<void> => {
  if (!locationApiUrl) {
    if (greetingLocationEl) {
      greetingLocationEl.textContent = 'Welcome to my portfolio!';
    }
    return;
  }

  try {
    const response = await fetch(locationApiUrl, {
      method: 'GET',
      headers: { 'content-type': 'application/json' }
    });

    if (response.ok) {
      const data = (await response.json()) as LocationResponse;

      if (greetingLocationEl) {
        if (data.city && data.country) {
          greetingLocationEl.textContent = `Greetings from ${data.city}, ${data.country}! 🌍`;
        } else if (data.country) {
          greetingLocationEl.textContent = `Greetings from ${data.country}! 🌍`;
        } else if (data.message) {
          greetingLocationEl.textContent = data.message;
        } else {
          greetingLocationEl.textContent = 'Welcome to my portfolio!';
        }
      }
    } else {
      if (greetingLocationEl) {
        greetingLocationEl.textContent = 'Welcome to my portfolio!';
      }
    }
  } catch (error) {
    console.log('Location detection unavailable:', error);
    if (greetingLocationEl) {
      greetingLocationEl.textContent = 'Welcome to my portfolio!';
    }
  }
};

// Removed auto-show greeting - user can access via floating button

// Event listeners for greeting bot
if (greetingFloatBtn) {
  greetingFloatBtn.addEventListener('click', () => {
    void fetchAndDisplayLocation();
    showGreetingModal();
  });
}

if (greetingCloseBtn) {
  greetingCloseBtn.addEventListener('click', closeGreetingModal);
}

if (greetingAiBtn) {
  greetingAiBtn.addEventListener('click', () => {
    closeGreetingModal();
    toggleAiModal();
  });
}

if (greetingExploreBtn) {
  greetingExploreBtn.addEventListener('click', () => {
    closeGreetingModal();
    const projectsSection = document.querySelector('#projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
}

if (greetingModal) {
  greetingModal.addEventListener('click', (e) => {
    if (e.target === greetingModal) {
      closeGreetingModal();
    }
  });
}

// Intersection Observer for scroll animations
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

const animatedElements = document.querySelectorAll('.scroll-animate, .scroll-scale, .scroll-fade');
animatedElements.forEach((el) => observer.observe(el));
