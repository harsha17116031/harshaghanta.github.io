import './style.css';

type Project = {
  name: string;
  subtitle: string;
  url: string;
  summary: string;
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

const app = document.querySelector<HTMLDivElement>('#app');

if (!app) {
  throw new Error('App container not found');
}

app.innerHTML = `
  <main class="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-slate-100">
    <header class="relative overflow-hidden px-6 py-16 text-center md:py-24">
      <div class="absolute -right-10 -top-20 h-64 w-64 rounded-full bg-indigo-300/20 blur-2xl animate-float"></div>
      <p class="mx-auto mb-3 inline-flex items-center rounded-full border border-indigo-200/50 bg-indigo-500/20 px-4 py-1 text-sm font-semibold text-indigo-100">
        Built with TypeScript + Tailwind CSS
      </p>
      <h1 class="mb-4 text-4xl font-extrabold tracking-tight md:text-6xl">[Your Name]</h1>
      <p class="mx-auto max-w-2xl text-lg text-indigo-100/90 md:text-xl">[Your Role 1] | [Your Role 2]</p>
      <p class="mx-auto mt-3 max-w-3xl text-base text-slate-200 md:text-lg">Enthusiastic, energetic, and experimenting with AI workflows.</p>
    </header>

    <section class="mx-auto max-w-6xl px-6 pb-14">
      <div class="glass-card mb-8">
        <h2 class="section-title">About</h2>
        <p class="text-slate-700">Hi, I'm <strong>[Your Name]</strong> — [write a short intro about yourself here]. This portfolio is powered by TypeScript logic and Tailwind utility styling so visitors can clearly see the tech stack behind the experience.</p>
      </div>

      <div class="glass-card">
        <h2 class="section-title">Featured Live App Previews (iFrames)</h2>
        <p class="mb-6 text-slate-700">Below are live previews of the two side projects you mentioned.</p>
        <div class="grid gap-8">
          ${projects
            .map(
              (project) => `
                <article class="rounded-xl border border-slate-200 bg-white p-4 shadow-md">
                  <div class="mb-3 flex flex-wrap items-center justify-between gap-2">
                    <h3 class="text-xl font-bold text-indigo-700">${project.name} — ${project.subtitle}</h3>
                    <a class="text-sm font-semibold text-indigo-600 hover:text-indigo-800" href="${project.url}" target="_blank" rel="noopener noreferrer">Open in new tab ↗</a>
                  </div>
                  <p class="mb-4 text-slate-600">${project.summary}</p>
                  <iframe class="project-frame" src="${project.url}" title="${project.name} preview" loading="lazy" referrerpolicy="no-referrer-when-downgrade">
                    Your browser could not load this iframe. Visit <a href="${project.url}">${project.name}</a>.
                  </iframe>
                </article>
              `
            )
            .join('')}
        </div>
      </div>
    </section>
  </main>
`;
