import './style.css';

type Project = {
  name: string;
  subtitle: string;
  url: string;
  summary: string;
};

type AiResponse = {
  answer?: string;
  error?: string;
};

const projects: Project[] = [
  {
    name: 'XpressCV',
    subtitle: 'AI Resume Generation Tool',
    url: 'https://xpresscv.com',
    summary:
      'Generate and tailor resumes quickly using AI-driven workflows focused on quality and speed.'
  },
  {
    name: 'OckraTech',
    subtitle: 'Financial Trading Platform',
    url: 'https://ocktratech.com',
    summary:
      'A trading platform experience centered on fast decisions, clean analytics, and reliable workflows.'
  }
];

const aiApiUrl = import.meta.env.VITE_AI_API_URL as string | undefined;
const app = document.querySelector<HTMLDivElement>('#app');

if (!app) {
  throw new Error('App container not found');
}

app.innerHTML = `
  <main class="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
    <div class="pointer-events-none absolute -left-24 top-24 h-96 w-96 rounded-full bg-blue-500/15 blur-3xl"></div>
    <div class="pointer-events-none absolute -right-16 top-6 h-80 w-80 rounded-full bg-purple-500/15 blur-3xl"></div>
    <div class="pointer-events-none absolute bottom-24 left-1/3 h-64 w-64 rounded-full bg-pink-500/10 blur-3xl"></div>

    <header class="scroll-fade relative px-6 py-16 text-center md:py-24">
      <div class="mx-auto mb-4 gradient-pill">Built with TypeScript + Tailwind CSS</div>
      <h1 class="mb-4 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent md:text-6xl">Harsha Vardhan Reddy</h1>
      <p class="mx-auto max-w-2xl text-lg text-slate-300 md:text-xl">Senior Software Developer | Full Stack Engineer</p>
      <p class="mx-auto mt-3 max-w-3xl text-base text-slate-300/90 md:text-lg">Building scalable cloud solutions with expertise in React, Node.js, AWS, and modern DevOps practices.</p>
      <div class="mx-auto mt-4 flex flex-wrap justify-center gap-4 text-sm text-slate-400">
        <a href="tel:940-843-1600" class="hover:text-blue-300 transition">📞 940-843-1600</a>
        <a href="mailto:ghanta.17116031@gmail.com" class="hover:text-blue-300 transition">✉️ ghanta.17116031@gmail.com</a>
        <a href="mailto:hvg220000@utdallas.edu" class="hover:text-blue-300 transition">🎓 hvg220000@utdallas.edu</a>
      </div>
    </header>

    <section class="mx-auto grid max-w-6xl gap-8 px-6 pb-14">
      <div class="scroll-animate glass-card">
        <span class="gradient-pill mb-4">About</span>
        <h2 class="section-title">Senior Software Developer & Cloud Solutions Architect</h2>
        <p class="section-subtitle">MS in Computer Science from UT Dallas | AWS Certified AI Practitioner</p>
        <div class="text-slate-100/90 space-y-4">
          <p>Hi, I'm <strong>Harsha Vardhan Reddy</strong>, a Senior Software Developer at Anthem Inc. with a passion for building scalable, high-performance systems. I specialize in full-stack development, cloud architecture, and AI-driven automation.</p>

          <div class="grid md:grid-cols-2 gap-6 mt-6">
            <div>
              <h3 class="text-lg font-semibold text-blue-200 mb-2">🎓 Education</h3>
              <ul class="text-sm space-y-2 text-slate-300">
                <li><strong>MS in Computer Science</strong><br/>University of Texas at Dallas (2022-2023)</li>
                <li><strong>BTech in Information Technology</strong><br/>NIT Raipur, India (2016-2020)</li>
              </ul>
            </div>

            <div>
              <h3 class="text-lg font-semibold text-blue-200 mb-2">💼 Experience</h3>
              <ul class="text-sm space-y-2 text-slate-300">
                <li><strong>Senior Software Developer</strong><br/>Anthem Inc. (Feb 2024 - Present)</li>
                <li><strong>Software Developer</strong><br/>Leidos (Jul 2023 - Dec 2023)</li>
                <li><strong>Full Stack Developer</strong><br/>Ocktra Tech (Jul 2020 - Jul 2022)</li>
              </ul>
            </div>
          </div>

          <div class="mt-6">
            <h3 class="text-lg font-semibold text-blue-200 mb-2">🚀 Technical Expertise</h3>
            <div class="flex flex-wrap gap-2 mt-3">
              <span class="px-3 py-1 bg-blue-500/20 border border-blue-400/30 rounded-full text-xs text-blue-200">React</span>
              <span class="px-3 py-1 bg-blue-500/20 border border-blue-400/30 rounded-full text-xs text-blue-200">Node.js</span>
              <span class="px-3 py-1 bg-blue-500/20 border border-blue-400/30 rounded-full text-xs text-blue-200">TypeScript</span>
              <span class="px-3 py-1 bg-blue-500/20 border border-blue-400/30 rounded-full text-xs text-blue-200">Python</span>
              <span class="px-3 py-1 bg-blue-500/20 border border-blue-400/30 rounded-full text-xs text-blue-200">AWS (S3, Lambda, ECS, CDK)</span>
              <span class="px-3 py-1 bg-blue-500/20 border border-blue-400/30 rounded-full text-xs text-blue-200">PostgreSQL</span>
              <span class="px-3 py-1 bg-blue-500/20 border border-blue-400/30 rounded-full text-xs text-blue-200">MongoDB</span>
              <span class="px-3 py-1 bg-blue-500/20 border border-blue-400/30 rounded-full text-xs text-blue-200">Kafka</span>
              <span class="px-3 py-1 bg-blue-500/20 border border-blue-400/30 rounded-full text-xs text-blue-200">Docker</span>
              <span class="px-3 py-1 bg-blue-500/20 border border-blue-400/30 rounded-full text-xs text-blue-200">CI/CD</span>
            </div>
          </div>
        </div>
      </div>

      <div class="scroll-animate glass-card">
        <span class="gradient-pill mb-4">Featured Projects</span>
        <h2 class="section-title">Live App Previews (iFrames)</h2>
        <p class="section-subtitle">Explore both products directly from this page.</p>
        <div class="grid gap-8">
          ${projects
            .map(
              (project) => `
                <article class="scroll-scale project-card">
                  <div class="mb-3 flex flex-wrap items-center justify-between gap-2">
                    <h3 class="text-xl font-bold text-blue-100">${project.name} — ${project.subtitle}</h3>
                    <a class="rounded-full border border-blue-400/40 px-3 py-1 text-sm font-semibold text-blue-100 transition hover:border-blue-300 hover:bg-blue-500/30" href="${project.url}" target="_blank" rel="noopener noreferrer">Open in new tab ↗</a>
                  </div>
                  <p class="mb-4 text-slate-300">${project.summary}</p>
                  <iframe class="project-frame" src="${project.url}" title="${project.name} preview" loading="lazy" referrerpolicy="no-referrer-when-downgrade">
                    Your browser could not load this iframe. Visit <a href="${project.url}">${project.name}</a>.
                  </iframe>
                </article>
              `
            )
            .join('')}
        </div>
      </div>

      <div class="scroll-animate glass-card">
        <span class="gradient-pill mb-4">AI Assistant (Lambda + Bedrock)</span>
        <h2 class="section-title">Ask AI for deeper project details</h2>
        <p class="section-subtitle">Cost-effective serverless design: Lambda function URL + Bedrock.</p>
        <div class="grid gap-3">
          <label for="ai-question" class="text-sm font-semibold text-blue-200">Your question</label>
          <textarea id="ai-question" class="ai-input" rows="3" placeholder="Ask me about my experience with microservices, cloud architecture, or any of my projects..."></textarea>
          <div class="flex flex-wrap items-center gap-3">
            <button id="ask-ai-btn" class="ai-button" type="button">Ask AI Assistant</button>
            <span id="ai-hint" class="text-xs text-slate-400">Set <code>VITE_AI_API_URL</code> to connect your deployed Lambda endpoint.</span>
          </div>
          <pre id="ai-answer" class="ai-output">AI response will appear here.</pre>
        </div>
      </div>
    </section>
  </main>
`;

const aiQuestion = document.querySelector<HTMLTextAreaElement>('#ai-question');
const aiButton = document.querySelector<HTMLButtonElement>('#ask-ai-btn');
const aiAnswer = document.querySelector<HTMLPreElement>('#ai-answer');

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
      // Optional: Unobserve after animation triggers (for performance)
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all elements with scroll animation classes
const animatedElements = document.querySelectorAll('.scroll-animate, .scroll-scale, .scroll-fade');
animatedElements.forEach((el) => observer.observe(el));
