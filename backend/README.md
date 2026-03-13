# Backend (AWS Lambda + Amazon Bedrock + API Gateway)

This folder contains a serverless backend for the portfolio with two main features:
1. **AI Assistant** - An enthusiastic chatbot embodying Harsha's passion for experimentation
2. **Location Detection** - Greets visitors based on their geographic location

**Technology Stack:**
- **AWS Lambda** - Pay-per-request compute (no idle costs)
- **API Gateway** - Professional REST API with enhanced CORS and monitoring
- **Amazon Bedrock** - Managed AI model invocation (Titan Text Lite v1)
- **IP Geolocation APIs** - Free tier location detection with fallback

## AI Assistant Personality

### 🎯 Core Design Philosophy

The AI assistant is **not just a factual Q&A bot** - it's designed to embody Harsha's personality:

- **Enthusiastic** about technology and innovation
- **Emphasizes experimentation** - diving into new tech hands-on
- **Builder mentality** - doesn't just learn, builds real solutions
- **Conversational** - engaging, not just a fact-dispenser

### Example Interactions

**❌ Traditional boring assistant:**
> "Harsha has experience with AWS Lambda, API Gateway, and Bedrock."

**✅ Our enthusiastic assistant:**
> "Harsha loves diving into AWS services hands-on! He built this very chatbot you're using as an experiment with Bedrock and Lambda. That's his approach - he doesn't just read docs, he builds real solutions to learn. From AI workflows to event-driven systems with Kafka, he's always exploring what's next!"

### Implementation Details

The system prompt (in `src/handler.mjs`) guides the AI to:
- Be genuinely excited about technology
- Connect technical work to the passion behind it
- Highlight experimental mindset and curiosity
- Show why Harsha is interesting beyond just credentials

**Model Configuration:**
- Model: Amazon Titan Text Lite v1
- Temperature: 0.3 (consistent but not robotic)
- Max Tokens: 300 (concise but complete)

## Architecture

### Why API Gateway (Not Just Lambda Function URLs)?

**This portfolio now uses API Gateway as the primary architecture** for several important reasons:

1. **Professional Production Setup**
   - Enterprise-grade features: throttling, caching, request validation
   - Better suited for production portfolios that may scale
   - Centralized management of multiple endpoints (`/ai` and `/location`)

2. **Enhanced CORS Management**
   - API Gateway handles CORS at infrastructure level
   - Automatic OPTIONS preflight responses
   - Consistent CORS across all endpoints
   - Reduces potential browser issues

3. **Better Monitoring & Security**
   - CloudWatch integration for detailed API metrics
   - Request/response logging
   - AWS WAF integration available if needed
   - Rate limiting and throttling built-in

4. **Demonstration of Skills**
   - Shows understanding of production-ready AWS architectures
   - The backend itself is an experiment demonstrating AWS expertise

**Current Architecture:**
```
Frontend (GitHub Pages - TypeScript + Vite)
    ↓ HTTPS
API Gateway REST API (/prod stage)
    ↓
    ├─ POST /ai → Lambda (handler.mjs) → Amazon Bedrock Titan
    └─ GET /location → Lambda (location-handler.mjs) → IP APIs
```

**Note:** Lambda Function URLs are still deployed for backward compatibility but marked as deprecated.

## Prerequisites

1. **AWS Account** with appropriate permissions
2. **AWS CLI** configured with credentials
3. **AWS SAM CLI** installed ([Installation Guide](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html))
4. **Node.js** 20.x or later

## Setup & Deployment

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment (Optional)

For local testing or custom deployment settings:

```bash
cp .env.example .env
# Edit .env if needed (optional for most cases)
```

### 3. Build the Application

```bash
sam build
```

This compiles and packages the Lambda function.

### 4. Deploy to AWS

For first-time deployment (guided):

```bash
sam deploy --guided
```

You'll be prompted for:
- **Stack Name**: `portfolio-ai-backend` (or your choice)
- **AWS Region**: `us-east-1` (or your preferred region)
- **Confirm changes**: `Y`
- **Allow SAM CLI IAM role creation**: `Y`
- **Disable rollback**: `N` (recommended)
- **Save arguments to configuration file**: `Y`

For subsequent deployments:

```bash
sam deploy
```

### 5. Copy the API Endpoints

After deployment, SAM will output:

```
Outputs
---------------------------------------------------------
Key                 ApiGatewayUrl
Description         API Gateway endpoint URL
Value               https://abc123xyz.execute-api.us-east-1.amazonaws.com/prod

Key                 AiEndpoint
Description         AI Assistant API endpoint
Value               https://abc123xyz.execute-api.us-east-1.amazonaws.com/prod/ai

Key                 LocationEndpoint
Description         Location Detection API endpoint
Value               https://abc123xyz.execute-api.us-east-1.amazonaws.com/prod/location
---------------------------------------------------------
```

**⚠️ IMPORTANT**: Copy the `AiEndpoint` and `LocationEndpoint` URLs for frontend configuration.

### 6. Configure Frontend

In the **repository root** (not in backend/):

```bash
cd ..
cp .env.example .env
```

Edit `.env` and set:

```bash
VITE_AI_API_URL=https://abc123xyz.execute-api.us-east-1.amazonaws.com/prod/ai
VITE_LOCATION_API_URL=https://abc123xyz.execute-api.us-east-1.amazonaws.com/prod/location
```

**Security Note**: The `.env` file is automatically excluded from git by `.gitignore`. Never commit actual API URLs or credentials.

## Environment Variables

### Runtime Variables (Lambda)

These are configured in `template.yaml` and automatically set in the Lambda environment:

- `BEDROCK_MODEL_ID` - AI model identifier (default: `amazon.titan-text-lite-v1`)
- `ALLOWED_ORIGIN` - CORS allowed origin (default: `https://harsha17116031.github.io`)
- `AWS_REGION` - Automatically set by Lambda runtime

### Deployment Variables (Optional)

These can be set in `.env` for local development:

- `AWS_PROFILE` - AWS CLI profile to use
- `AWS_REGION` - Override default region

## API Reference

### AI Assistant Endpoint

`POST https://your-api.execute-api.region.amazonaws.com/prod/ai`

### Request Format

```json
{
  "question": "Tell me more about XpressCV and OckraTech"
}
```

### Response Format

**Success (200)**:
```json
{
  "answer": "XpressCV is an AI-powered resume generation tool..."
}
```

### Location Detection Endpoint

`GET https://your-api.execute-api.region.amazonaws.com/prod/location`

### Response Format

**Success (200)**:
```json
{
  "ip": "123.45.67.89",
  "city": "San Francisco",
  "region": "California",
  "country": "United States",
  "countryCode": "US",
  "timezone": "America/Los_Angeles"
}
```

**Error (500)**:
```json
{
  "error": "Failed to detect location",
  "details": "Error details here"
}
```

## CORS Configuration

**CORS is configured at two levels for maximum reliability:**

1. **API Gateway Level** (`template.yaml` Globals)
   - Infrastructure-level CORS handling
   - Automatic OPTIONS preflight responses
   - Configured for: `https://harsha17116031.github.io`

2. **Lambda Level** (both `handler.mjs` and `location-handler.mjs`)
   - CORS headers in all responses
   - Handles edge cases and error responses
   - 24-hour preflight caching

**Headers included:**
```javascript
'access-control-allow-origin': 'https://harsha17116031.github.io'
'access-control-allow-methods': 'OPTIONS,POST' // or GET for location
'access-control-allow-headers': 'content-type,x-requested-with'
'access-control-max-age': '86400'  // 24 hours
```

For comprehensive CORS troubleshooting, see [DEPLOYMENT.md](./DEPLOYMENT.md).

## Local Testing

You can test the Lambda function locally:

```bash
sam local invoke PortfolioAiFunction --event test-event.json
```

Create `test-event.json`:

```json
{
  "body": "{\"question\":\"What projects have you built?\"}",
  "requestContext": {
    "http": {
      "method": "POST"
    }
  }
}
```

## Cost Optimization

This setup is designed for minimal cost:

1. **Lambda**: Free tier includes 1M requests/month and 400,000 GB-seconds compute
2. **Bedrock Titan Text Lite**: ~$0.0003 per 1K input tokens, ~$0.0004 per 1K output tokens
3. **API Gateway**: Free tier includes 1M requests/month, then $3.50 per million

Estimated cost for a portfolio with low traffic: **< $1/month**

For most portfolios, all services remain in free tier!

## Updating Configuration

### Change AI Model

Edit `template.yaml`:

```yaml
Environment:
  Variables:
    BEDROCK_MODEL_ID: amazon.nova-micro-v1  # or another Bedrock model
```

Then redeploy:

```bash
sam build && sam deploy
```

### Update CORS Origin

Edit `template.yaml`:

```yaml
Environment:
  Variables:
    ALLOWED_ORIGIN: https://your-custom-domain.com

Cors:
  AllowOrigins:
    - https://your-custom-domain.com
```

## Troubleshooting

### Issue: "Unable to locate credentials"

**Solution**: Configure AWS CLI credentials:
```bash
aws configure
```

### Issue: "Bedrock access denied"

**Solution**: Ensure your AWS account has Bedrock access enabled in your region. Some regions require opt-in for Bedrock.

### Issue: "CORS error in frontend"

**Solution**: Verify that `ALLOWED_ORIGIN` in `template.yaml` matches your GitHub Pages URL exactly.

## Security Best Practices

✅ **DO**:
- Keep `.env` files excluded from version control
- Use environment-specific configurations
- Monitor Lambda invocation counts and costs
- Review CloudWatch logs regularly

❌ **DON'T**:
- Commit API URLs to public repositories
- Use overly permissive CORS settings
- Expose AWS credentials in frontend code
- Share deployment artifacts

## Clean Up

To delete all AWS resources created by this stack:

```bash
sam delete
```

This will remove the Lambda functions, API Gateway, and all associated resources.

## Summary

**Key Features:**
- 🎯 AI assistant with personality that showcases experimentation passion
- 🌍 Location-aware greeting for personalized welcome
- 🏗️ API Gateway architecture for production-ready setup
- 🔒 Dual-level CORS for maximum browser compatibility
- 💰 Cost-optimized with free-tier services
- 📊 CloudWatch monitoring and logging

**Files:**
- `src/handler.mjs` - AI assistant with enthusiastic personality
- `src/location-handler.mjs` - Visitor location detection
- `template.yaml` - AWS SAM infrastructure definition
- `DEPLOYMENT.md` - Comprehensive deployment and CORS troubleshooting guide

For detailed information about:
- **Architecture decisions** - See the "Why API Gateway?" section above
- **CORS troubleshooting** - See [DEPLOYMENT.md](./DEPLOYMENT.md)
- **AI personality design** - See "AI Assistant Personality" section above
