# Portfolio Website - TypeScript + Tailwind + AWS

A modern, performant portfolio website with AI-powered assistant and location-aware greeting bot.

## 🏗️ Architecture

```
┌─────────────────────────────────────┐
│  Frontend (Vite + TypeScript)      │
│  - Tailwind CSS                     │
│  - Smooth scroll animations         │
│  - Greeting bot with location       │
│  - AI chat assistant                │
│  - GitHub Pages deployment          │
└────────────┬────────────────────────┘
             │ HTTPS (GET/POST)
             ↓
┌─────────────────────────────────────┐
│  API Gateway (REST API)            │
│  - /ai endpoint (POST)              │
│  - /location endpoint (GET)         │
│  - CORS-protected                   │
└────────────┬────────────────────────┘
             │
    ┌────────┴────────┐
    ↓                 ↓
┌─────────────┐  ┌──────────────────┐
│  Lambda:    │  │  Lambda:         │
│  AI Chat    │  │  Location        │
│  (Bedrock)  │  │  (IP Geo API)    │
└─────────────┘  └──────────────────┘
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

Edit `.env` and add your backend URLs (or leave empty for local development without AI features):

```bash
VITE_AI_API_URL=https://abc123xyz.execute-api.us-east-1.amazonaws.com/prod/ai
VITE_LOCATION_API_URL=https://abc123xyz.execute-api.us-east-1.amazonaws.com/prod/location
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

The AI assistant and greeting bot features require a backend deployment. See [backend/DEPLOYMENT.md](./backend/DEPLOYMENT.md) for detailed instructions.

Quick backend deployment:

```bash
cd backend
sam build
sam deploy --guided
```

After deployment, copy the API endpoints from the outputs and set them in your frontend `.env` file.

## 📁 Project Structure

```
.
├── src/                    # Frontend source code
│   ├── main.ts            # Application entry point
│   └── style.css          # Tailwind components & animations
├── backend/               # Backend Lambda functions
│   ├── src/
│   │   ├── handler.mjs           # AI chat Lambda handler
│   │   └── location-handler.mjs  # Location detection handler
│   ├── template.yaml      # AWS SAM template (API Gateway)
│   ├── DEPLOYMENT.md      # Deployment guide
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
| `VITE_AI_API_URL` | AI Assistant API endpoint | `https://abc123.execute-api.us-east-1.amazonaws.com/prod/ai` |
| `VITE_LOCATION_API_URL` | Location Detection API endpoint | `https://abc123.execute-api.us-east-1.amazonaws.com/prod/location` |

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
- ✅ **Location-aware greeting bot** (auto-shows on first visit)
- ✅ **Floating greeting button** (bottom-right corner)
- ✅ AI-powered chat assistant
- ✅ Project showcase
- ✅ Environment variable validation

### Backend
- ✅ **API Gateway** with REST API
- ✅ **Two Lambda functions:**
  - AI Chat (Amazon Bedrock integration)
  - Location Detection (IP geolocation)
- ✅ CORS protection
- ✅ Cost-optimized (< $5/month for low traffic)
- ✅ Infrastructure as Code (SAM)
- ✅ Backward compatible (Legacy Lambda Function URL)

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

See [backend/DEPLOYMENT.md](./backend/DEPLOYMENT.md) for complete instructions.

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
- **API Gateway**: $3.50 per million requests (first 1M requests free for 12 months)
- **Lambda (AI)**: ~$0.005 per 1K requests
- **Lambda (Location)**: ~$0.002 per 1K requests
- **Bedrock**: ~$0.0001 per request
- **IP Geolocation**: Free (30K requests/month)

**Total estimated cost**: < $5/month for 1,000 visitors/month

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

- [Backend Deployment Guide](./backend/DEPLOYMENT.md) - Step-by-step backend setup
- [Backend README](./backend/README.md) - API reference and architecture
- [Vite Documentation](https://vitejs.dev/) - Build tool documentation
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework documentation
- [AWS SAM](https://docs.aws.amazon.com/serverless-application-model/) - Serverless deployment

## 🎯 New Features

### 🤖 Greeting Bot
- **Auto-shows on first visit** (uses sessionStorage to track)
- **Detects visitor location** using IP geolocation
- **Personalized greeting** with city and country
- **Floating button** in bottom-right corner for easy access
- **Quick actions**: Open AI chat or explore portfolio
- **Fully responsive** design matching portfolio aesthetic

### 🌍 Location Detection
- Uses free IP geolocation services (ipapi.co & ip-api.com)
- Fallback support if primary service fails
- Privacy-friendly (no tracking, only display)
- Works in development and production
- Handles local/private IPs gracefully

### 💬 AI Chat Enhancement
- Now integrated with API Gateway
- Maintains backward compatibility with Lambda Function URL
- Enhanced error handling
- Better CORS configuration

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

## 🏗️ Architecture Decisions

### API Gateway Integration

This project now uses **API Gateway** with multiple Lambda functions:

**Benefits:**
- ✅ **Single API** for multiple endpoints (/ai, /location)
- ✅ **Better organization** - separate concerns into different Lambda functions
- ✅ **Enhanced features** - built-in request/response transformation
- ✅ **Production-ready** - better monitoring and logging
- ✅ **Backward compatible** - Legacy Lambda Function URL still works

**Endpoints:**
- `POST /ai` - AI-powered Q&A about the portfolio
- `GET /location` - IP-based location detection

For a detailed analysis, see [backend/DEPLOYMENT.md](./backend/DEPLOYMENT.md).

### Greeting Bot Design

The greeting bot follows these principles:
- **Non-intrusive**: Shows once per session, can be easily dismissed
- **Informative**: Tells visitors about your passion for experimentation
- **Interactive**: Quick actions to AI chat or portfolio exploration
- **Accessible**: Always available via floating button
- **Performant**: Lazy-loaded, doesn't block page rendering
