# Portfolio Website - TypeScript + Tailwind + AWS

A modern, performant portfolio website with an AI-powered assistant backend.

## 🏗️ Architecture

```
┌─────────────────────────────────────┐
│  Frontend (Vite + TypeScript)      │
│  - Tailwind CSS                     │
│  - Smooth scroll animations         │
│  - GitHub Pages deployment          │
└────────────┬────────────────────────┘
             │ HTTPS POST
             ↓
┌─────────────────────────────────────┐
│  Backend (AWS Lambda + Bedrock)    │
│  - Serverless, pay-per-use          │
│  - AI-powered Q&A assistant         │
│  - CORS-protected endpoint          │
└─────────────────────────────────────┘
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** 20.x or later
- **npm** or **yarn**
- **AWS Account** (only for backend deployment)
- **AWS SAM CLI** (only for backend deployment)

### Frontend Setup

1. **Clone the repository**

```bash
git clone https://github.com/harsha17116031/harshaghanta.github.io.git
cd harshaghanta.github.io
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables**

```bash
cp .env.example .env
```

Edit `.env` and add your backend URL (or leave empty for local development without AI features):

```bash
VITE_AI_API_URL=https://your-lambda-url.lambda-url.us-east-1.on.aws/
```

4. **Run development server**

```bash
npm run dev
```

Visit `http://localhost:5173` to see your portfolio.

5. **Build for production**

```bash
npm run build
```

The production-ready files will be in the `dist/` directory.

### Backend Setup (Optional)

The AI assistant feature requires a backend deployment. See [backend/README.md](./backend/README.md) for detailed instructions.

Quick backend deployment:

```bash
cd backend
npm install
sam build
sam deploy --guided
```

After deployment, copy the `PortfolioAiUrl` output and set it in your frontend `.env` file.

## 📁 Project Structure

```
.
├── src/                    # Frontend source code
│   ├── main.ts            # Application entry point
│   └── style.css          # Tailwind components & animations
├── backend/               # Backend Lambda function
│   ├── src/
│   │   └── handler.mjs    # Lambda handler
│   ├── template.yaml      # AWS SAM template
│   ├── .env.example       # Backend env template
│   └── README.md          # Backend documentation
├── dist/                  # Build output (gitignored)
├── .env                   # Environment variables (gitignored)
├── .env.example           # Environment template
├── vite.config.ts         # Vite configuration
├── tailwind.config.js     # Tailwind configuration
└── package.json           # Frontend dependencies
```

## 🔒 Environment Variable Management

### Security Principles

1. **Frontend variables** are prefixed with `VITE_` and exposed at build time
2. **Backend variables** are configured in AWS Lambda (never in frontend)
3. **`.env` files** are gitignored and never committed
4. **`.env.example` files** show required variables without sensitive values

### Frontend Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_AI_API_URL` | Lambda Function URL | `https://abc123.lambda-url.us-east-1.on.aws/` |

**Important**: Only `VITE_*` prefixed variables are accessible in the browser. Other variables remain server-side only.

### Backend Variables

Configured in `backend/template.yaml`:

| Variable | Description | Default |
|----------|-------------|---------|
| `BEDROCK_MODEL_ID` | AI model to use | `amazon.titan-text-lite-v1` |
| `ALLOWED_ORIGIN` | CORS origin | `https://harsha17116031.github.io` |

## 🎨 Features

### Frontend
- ✅ Modern TypeScript + Vite setup
- ✅ Tailwind CSS for styling
- ✅ Apple-style scroll animations
- ✅ Responsive design
- ✅ Glass-morphism UI components
- ✅ Project showcase with live iframes
- ✅ Environment variable validation

### Backend
- ✅ AWS Lambda serverless function
- ✅ Amazon Bedrock AI integration
- ✅ CORS protection
- ✅ Cost-optimized (< $1/month for low traffic)
- ✅ Infrastructure as Code (SAM)

## 🚢 Deployment

### Deploy Frontend to GitHub Pages

1. **Update homepage in `package.json`**

```json
{
  "homepage": "https://yourusername.github.io/your-repo-name/"
}
```

2. **Deploy**

```bash
npm run deploy
```

This builds and pushes to the `gh-pages` branch.

3. **Enable GitHub Pages**

Go to Repository Settings → Pages → Source: `gh-pages` branch

### Deploy Backend to AWS

See [backend/README.md](./backend/README.md) for complete instructions.

## 🔧 Development

### Run Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Type Check

```bash
npx tsc --noEmit
```

## 🌍 Environment-Specific Builds

### Development
```bash
npm run dev
# Uses .env with mode=development
```

### Production
```bash
npm run build
# Uses .env with mode=production
```

## 🛠️ Technology Stack

### Frontend
- **Vite** - Fast build tool and dev server
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **PostCSS** - CSS transformation tool

### Backend
- **AWS Lambda** - Serverless compute
- **Amazon Bedrock** - Managed AI service
- **AWS SAM** - Infrastructure as Code
- **Node.js 20** - JavaScript runtime

## 📊 Cost Analysis

### Frontend
- **GitHub Pages**: Free for public repositories

### Backend (estimated for low traffic)
- **Lambda**: Free tier (1M requests/month) - $0
- **Bedrock**: ~$0.50/month (light usage)
- **Data Transfer**: Negligible

**Total estimated cost**: < $1/month

## 🔐 Security Best Practices

### ✅ DO
- Keep `.env` files out of version control
- Use `VITE_` prefix only for non-sensitive config
- Configure CORS properly in backend
- Review CloudWatch logs regularly
- Use specific CORS origins (not wildcards)

### ❌ DON'T
- Commit API keys or secrets
- Expose AWS credentials in frontend
- Use permissive CORS in production
- Store sensitive data in environment variables exposed to client

## 🐛 Troubleshooting

### Frontend Build Issues

**Error**: `Module not found`
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Error**: Environment variable not accessible
- Ensure variable is prefixed with `VITE_`
- Restart dev server after changing `.env`

### Backend Issues

**Error**: `Unable to locate credentials`
```bash
aws configure
# Enter your AWS credentials
```

**Error**: CORS error in browser
- Check `ALLOWED_ORIGIN` in `backend/template.yaml`
- Ensure it matches your frontend URL exactly

## 📚 Additional Documentation

- [Backend Documentation](./backend/README.md) - Detailed backend setup and API reference
- [Vite Documentation](https://vitejs.dev/) - Build tool documentation
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework documentation
- [AWS SAM](https://docs.aws.amazon.com/serverless-application-model/) - Serverless deployment

## 📝 License

MIT License - feel free to use this template for your own portfolio!

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📧 Contact

For questions or issues, please open an issue on GitHub.

---

Built with ❤️ using TypeScript, Tailwind CSS, and AWS

## Architecture Decisions

### Backend: Lambda Function URL vs API Gateway

This project deliberately uses **Lambda Function URL** instead of API Gateway because:

- ✅ **Free** - Zero cost vs $3.50 per million requests
- ✅ **Faster** - Direct invocation without API Gateway overhead (~20-30ms faster)
- ✅ **Simpler** - Less infrastructure to manage and monitor
- ✅ **Sufficient** - Built-in CORS, HTTPS, and logging meet all portfolio needs

For a detailed analysis and comparison, see [API Gateway Recommendation](./docs/API_GATEWAY_RECOMMENDATION.md).

**Bottom line:** Lambda Function URL is the right choice for portfolios and low-to-moderate traffic applications. API Gateway is only beneficial at high scale (100K+ requests/month) or when you need advanced features like API keys, custom domains, or response caching.
