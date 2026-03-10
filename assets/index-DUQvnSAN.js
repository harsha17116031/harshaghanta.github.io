(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))m(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&m(r)}).observe(document,{childList:!0,subtree:!0});function n(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerPolicy&&(a.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?a.credentials="include":t.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function m(t){if(t.ep)return;t.ep=!0;const a=n(t);fetch(t.href,a)}})();const S=[{name:"XpressCV",subtitle:"AI Resume Generation Tool",url:"https://xpresscv.com",summary:"Generate and tailor resumes quickly using AI-driven workflows focused on quality and speed.",tech:["React","Node.js","AI/ML","AWS"],icon:"📄"},{name:"OckraTech",subtitle:"Financial Trading Platform",url:"https://ocktratech.com",summary:"A trading platform experience centered on fast decisions, clean analytics, and reliable workflows.",tech:["React","TypeScript","WebSockets","PostgreSQL"],icon:"📈"}],w=document.querySelector("#app");if(!w)throw new Error("App container not found");w.innerHTML=`
  <main class="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
    <!-- Animated background orbs -->
    <div class="pointer-events-none absolute -left-24 top-24 h-96 w-96 rounded-full bg-blue-500/15 blur-3xl animate-pulse-slow"></div>
    <div class="pointer-events-none absolute -right-16 top-6 h-80 w-80 rounded-full bg-purple-500/15 blur-3xl animate-pulse-slower"></div>
    <div class="pointer-events-none absolute bottom-24 left-1/3 h-64 w-64 rounded-full bg-pink-500/10 blur-3xl animate-pulse-slow"></div>

    <!-- Navigation Bar -->
    <nav class="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-white/5">
      <div class="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
        <div class="flex items-center gap-8">
          <h1 class="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">HVR</h1>
          <div class="hidden md:flex gap-6">
            <a href="#about" class="nav-link text-sm font-medium text-slate-300 hover:text-blue-400 transition">About</a>
            <a href="#experience" class="nav-link text-sm font-medium text-slate-300 hover:text-blue-400 transition">Experience</a>
            <a href="#projects" class="nav-link text-sm font-medium text-slate-300 hover:text-blue-400 transition">Projects</a>
            <a href="#skills" class="nav-link text-sm font-medium text-slate-300 hover:text-blue-400 transition">Skills</a>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <button id="ai-toggle-btn" class="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/30 to-purple-500/30 border border-blue-400/40 text-sm font-semibold text-blue-100 hover:from-blue-500/50 hover:to-purple-500/50 transition">
            💬 AI Chat
          </button>
          <a href="mailto:ghanta.17116031@gmail.com" class="hidden md:block px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-semibold text-slate-200 hover:bg-white/10 transition">
            Contact
          </a>
        </div>
      </div>
    </nav>

    <!-- AI Chat Modal -->
    <div id="ai-modal" class="fixed inset-0 z-50 hidden items-center justify-center bg-black/70 backdrop-blur-sm">
      <div class="mx-4 w-full max-w-2xl rounded-2xl border border-white/10 bg-gradient-to-br from-slate-800/95 via-slate-900/95 to-slate-950/95 p-6 shadow-2xl backdrop-blur-xl">
        <div class="mb-4 flex items-center justify-between">
          <div>
            <h3 class="text-xl font-bold text-white">AI Assistant</h3>
            <p class="text-sm text-slate-400">Powered by AWS Lambda + Bedrock</p>
          </div>
          <button id="ai-close-btn" class="rounded-full p-2 text-slate-400 hover:bg-white/5 hover:text-white transition">
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
          <p class="text-xs text-slate-500">💡 Set <code class="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">VITE_AI_API_URL</code> in .env to enable</p>
        </div>
      </div>
    </div>

    <!-- Hero Section -->
    <header class="scroll-fade relative px-6 pt-32 pb-20 text-center md:pt-40 md:pb-24">
      <div class="mx-auto mb-6 inline-flex items-center gap-2 gradient-pill animate-bounce-subtle">
        <span class="relative flex h-2 w-2">
          <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
          <span class="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
        </span>
        Available for opportunities
      </div>
      <h1 class="mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-5xl font-extrabold tracking-tight text-transparent md:text-7xl">
        Harsha Vardhan Reddy
      </h1>
      <p class="mx-auto mb-4 max-w-2xl text-xl text-slate-300 md:text-2xl">
        <span id="typed-role" class="inline-block min-w-[200px] text-left"></span><span class="animate-blink">|</span>
      </p>
      <p class="mx-auto mt-4 max-w-3xl text-base text-slate-400 md:text-lg">
        Building scalable cloud solutions with expertise in React, Node.js, AWS, and modern DevOps practices.
      </p>
      <div class="mx-auto mt-8 flex flex-wrap justify-center gap-4">
        <a href="#projects" class="px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition transform hover:scale-105">
          View Projects
        </a>
        <a href="mailto:ghanta.17116031@gmail.com" class="px-6 py-3 rounded-full border border-white/20 bg-white/5 text-white font-semibold hover:bg-white/10 transition transform hover:scale-105">
          Get in Touch
        </a>
      </div>
      <div class="mx-auto mt-8 flex flex-wrap justify-center gap-6 text-sm text-slate-400">
        <a href="tel:940-843-1600" class="flex items-center gap-2 hover:text-blue-300 transition">
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
          </svg>
          940-843-1600
        </a>
        <a href="mailto:ghanta.17116031@gmail.com" class="flex items-center gap-2 hover:text-blue-300 transition">
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
        <div class="text-slate-100/90 space-y-4">
          <p>Hi, I'm <strong>Harsha Vardhan Reddy</strong>, a Senior Software Developer at Anthem Inc. with a passion for building scalable, high-performance systems. I specialize in full-stack development, cloud architecture, and AI-driven automation.</p>
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
                <h3 class="text-xl font-bold text-blue-100">Senior Software Developer</h3>
                <p class="text-sm text-slate-400 mt-1">Anthem Inc.</p>
              </div>
              <span class="rounded-full bg-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-200">Feb 2024 - Present</span>
            </div>
            <p class="mt-3 text-sm text-slate-300">Leading development of enterprise healthcare solutions, focusing on scalability and performance optimization.</p>
          </div>
          <div class="experience-card">
            <div class="flex items-start justify-between gap-4">
              <div class="flex-1">
                <h3 class="text-xl font-bold text-blue-100">Software Developer</h3>
                <p class="text-sm text-slate-400 mt-1">Leidos</p>
              </div>
              <span class="rounded-full bg-purple-500/20 px-3 py-1 text-xs font-semibold text-purple-200">Jul 2023 - Dec 2023</span>
            </div>
            <p class="mt-3 text-sm text-slate-300">Developed secure government solutions with focus on reliability and compliance.</p>
          </div>
          <div class="experience-card">
            <div class="flex items-start justify-between gap-4">
              <div class="flex-1">
                <h3 class="text-xl font-bold text-blue-100">Full Stack Developer</h3>
                <p class="text-sm text-slate-400 mt-1">Ocktra Tech</p>
              </div>
              <span class="rounded-full bg-pink-500/20 px-3 py-1 text-xs font-semibold text-pink-200">Jul 2020 - Jul 2022</span>
            </div>
            <p class="mt-3 text-sm text-slate-300">Built real-time trading platform with WebSockets and high-performance data processing.</p>
          </div>
        </div>
      </div>

      <!-- Projects Section -->
      <div id="projects" class="scroll-animate">
        <span class="gradient-pill mb-6 inline-block">Featured Projects</span>
        <h2 class="section-title mb-8">What I've Built</h2>
        <div class="grid md:grid-cols-2 gap-6">
          ${S.map(e=>`
                <article class="scroll-scale project-card group">
                  <div class="mb-4 flex items-start justify-between">
                    <div class="flex items-center gap-3">
                      <span class="text-3xl">${e.icon}</span>
                      <div>
                        <h3 class="text-xl font-bold text-blue-100 group-hover:text-blue-300 transition">${e.name}</h3>
                        <p class="text-sm text-slate-400">${e.subtitle}</p>
                      </div>
                    </div>
                  </div>
                  <p class="mb-4 text-slate-300">${e.summary}</p>
                  <div class="mb-4 flex flex-wrap gap-2">
                    ${e.tech.map(s=>`<span class="tech-badge">${s}</span>`).join("")}
                  </div>
                  <a class="inline-flex items-center gap-2 rounded-full border border-blue-400/40 px-4 py-2 text-sm font-semibold text-blue-100 transition hover:border-blue-300 hover:bg-blue-500/30 hover:shadow-lg hover:shadow-blue-500/20" href="${e.url}" target="_blank" rel="noopener noreferrer">
                    Visit Project
                    <svg class="h-4 w-4 group-hover:translate-x-1 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </a>
                </article>
              `).join("")}
        </div>
      </div>

      <!-- Skills Section -->
      <div id="skills" class="scroll-animate glass-card">
        <span class="gradient-pill mb-6 inline-block">Skills</span>
        <h2 class="section-title mb-8">Technical Expertise</h2>
        <div class="grid md:grid-cols-3 gap-6">
          <div>
            <h3 class="text-lg font-semibold text-blue-200 mb-3 flex items-center gap-2">
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
            <h3 class="text-lg font-semibold text-purple-200 mb-3 flex items-center gap-2">
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
            <h3 class="text-lg font-semibold text-pink-200 mb-3 flex items-center gap-2">
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
          <div class="rounded-xl border border-white/10 bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-6">
            <h3 class="text-lg font-bold text-white">MS in Computer Science</h3>
            <p class="text-slate-300 mt-1">University of Texas at Dallas</p>
            <p class="text-sm text-slate-400 mt-2">2022 - 2023</p>
          </div>
          <div class="rounded-xl border border-white/10 bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-6">
            <h3 class="text-lg font-bold text-white">BTech in Information Technology</h3>
            <p class="text-slate-300 mt-1">NIT Raipur, India</p>
            <p class="text-sm text-slate-400 mt-2">2016 - 2020</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="border-t border-white/5 bg-slate-950/50 px-6 py-8 text-center">
      <p class="text-sm text-slate-400">© 2026 Harsha Vardhan Reddy. Built with TypeScript & Tailwind CSS.</p>
    </footer>
  </main>
`;const x=document.querySelector("#ai-toggle-btn"),o=document.querySelector("#ai-modal"),h=document.querySelector("#ai-close-btn"),u=()=>{o&&(o.classList.toggle("hidden"),o.classList.toggle("flex"))};x&&x.addEventListener("click",u);h&&h.addEventListener("click",u);o&&o.addEventListener("click",e=>{e.target===o&&u()});const f=["Senior Software Developer","Full Stack Engineer","Cloud Solutions Architect","AWS Certified Professional"];let c=0,l=0,i=!1;const d=document.querySelector("#typed-role"),k=()=>{if(!d)return;const e=f[c];i?(d.textContent=e.substring(0,l-1),l--):(d.textContent=e.substring(0,l+1),l++),!i&&l===e.length?setTimeout(()=>{i=!0},2e3):i&&l===0&&(i=!1,c=(c+1)%f.length),setTimeout(k,i?50:100)};setTimeout(k,500);document.querySelectorAll('a[href^="#"]').forEach(e=>{e.addEventListener("click",function(s){s.preventDefault();const n=document.querySelector(this.getAttribute("href"));n&&n.scrollIntoView({behavior:"smooth",block:"start"})})});const b=document.querySelector("#ai-question"),p=document.querySelector("#ask-ai-btn"),v=document.querySelector("#ai-answer"),g=e=>{v&&(v.textContent=e)},A=async()=>{if(!b||!p)return;if(!b.value.trim()){g("Please enter a question first.");return}{g("Backend is not configured yet. Set VITE_AI_API_URL in your .env file.");return}};p&&p.addEventListener("click",()=>{A()});const I={root:null,rootMargin:"0px",threshold:.1},y=new IntersectionObserver(e=>{e.forEach(s=>{s.isIntersecting&&(s.target.classList.add("animate-in"),y.unobserve(s.target))})},I),j=document.querySelectorAll(".scroll-animate, .scroll-scale, .scroll-fade");j.forEach(e=>y.observe(e));
