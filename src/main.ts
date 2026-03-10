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
  <main class="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-slate-100">
    <div class="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl"></div>
    <div class="pointer-events-none absolute -right-16 top-6 h-64 w-64 rounded-full bg-cyan-400/20 blur-3xl"></div>

    <header class="relative px-6 py-16 text-center md:py-24">
      <div class="mx-auto mb-4 gradient-pill">Built with TypeScript + Tailwind CSS</div>
      <h1 class="mb-4 bg-gradient-to-r from-white via-indigo-100 to-fuchsia-100 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent md:text-6xl">[Your Name]</h1>
      <p class="mx-auto max-w-2xl text-lg text-indigo-100/90 md:text-xl">[Your Role 1] | [Your Role 2]</p>
      <p class="mx-auto mt-3 max-w-3xl text-base text-slate-200 md:text-lg">Enthusiastic, energetic, and experimenting with AI workflows.</p>
    </header>

    <section class="mx-auto grid max-w-6xl gap-8 px-6 pb-14">
      <div class="glass-card">
        <span class="gradient-pill mb-4">About</span>
        <h2 class="section-title">Crafting products that are fast, useful, and beautiful</h2>
        <p class="section-subtitle">A quick introduction and technology snapshot</p>
        <p class="text-slate-100/90">Hi, I'm <strong>[Your Name]</strong> — [write a short intro about yourself here]. This portfolio is powered by TypeScript logic and Tailwind utility styling so visitors can clearly see the tech stack behind the experience.</p>
      </div>

      <div class="glass-card">
        <span class="gradient-pill mb-4">Featured Projects</span>
        <h2 class="section-title">Live App Previews (iFrames)</h2>
        <p class="section-subtitle">Explore both products directly from this page.</p>
        <div class="grid gap-8">
          ${projects
            .map(
              (project) => `
                <article class="project-card">
                  <div class="mb-3 flex flex-wrap items-center justify-between gap-2">
                    <h3 class="text-xl font-bold text-indigo-100">${project.name} — ${project.subtitle}</h3>
                    <a class="rounded-full border border-indigo-200/40 px-3 py-1 text-sm font-semibold text-indigo-100 transition hover:border-indigo-100 hover:bg-indigo-500/20" href="${project.url}" target="_blank" rel="noopener noreferrer">Open in new tab ↗</a>
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

      <div class="glass-card">
        <span class="gradient-pill mb-4">AI Assistant (Lambda + Bedrock)</span>
        <h2 class="section-title">Ask AI for deeper project details</h2>
        <p class="section-subtitle">Cost-effective serverless design: Lambda function URL + Bedrock.</p>
        <div class="grid gap-3">
          <label for="ai-question" class="text-sm font-semibold text-indigo-100">Your question</label>
          <textarea id="ai-question" class="ai-input" rows="3" placeholder="Tell me more about how your projects use AI and trading workflows."></textarea>
          <div class="flex flex-wrap items-center gap-3">
            <button id="ask-ai-btn" class="ai-button" type="button">Ask AI Assistant</button>
            <span id="ai-hint" class="text-xs text-indigo-100/70">Set <code>VITE_AI_API_URL</code> to connect your deployed Lambda endpoint.</span>
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
