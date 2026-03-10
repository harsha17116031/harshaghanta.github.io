# Backend (AWS Lambda + Amazon Bedrock)

This folder contains a cost-effective, serverless AI backend for the portfolio using:
- **AWS Lambda** - Pay-per-request compute (no idle costs)
- **Lambda Function URL** - Direct HTTPS endpoint (no API Gateway required)
- **Amazon Bedrock** - Managed AI model invocation (Titan Text Lite for cost efficiency)

## Architecture

```
Frontend (Vite + TypeScript)
    ↓ HTTPS POST
Lambda Function URL
    ↓
AWS Lambda Handler
    ↓
Amazon Bedrock (Titan Text Lite)
```

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

### 5. Copy the Function URL

After deployment, SAM will output:

```
Outputs
---------------------------------------------------------
Key                 PortfolioAiUrl
Description         Public Lambda Function URL
Value               https://abcd1234efgh.lambda-url.us-east-1.on.aws/
---------------------------------------------------------
```

**⚠️ IMPORTANT**: Copy this URL - you'll need it for the frontend configuration.

### 6. Configure Frontend

In the **repository root** (not in backend/):

```bash
cd ..
cp .env.example .env
```

Edit `.env` and set:

```bash
VITE_AI_API_URL=https://your-actual-lambda-url.lambda-url.us-east-1.on.aws/
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

### Endpoint

`POST https://your-function-url.lambda-url.region.on.aws/`

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

**Error (400/500)**:
```json
{
  "error": "Failed to process AI request",
  "details": "Error details here"
}
```

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
3. **No API Gateway**: Lambda Function URL is free

Estimated cost for a portfolio with low traffic: **< $1/month**

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

This will remove the Lambda function, Function URL, and all associated resources.

## Architecture Decisions

### Why Lambda Function URL Instead of API Gateway?

This project uses **Lambda Function URL** instead of API Gateway for several important reasons:

1. **Cost Optimization** - Lambda Function URL is completely free, while API Gateway costs $3.50 per million requests
2. **Simplicity** - Direct Lambda invocation with less infrastructure to manage
3. **Performance** - Lower latency (~20-30ms faster) without API Gateway hop
4. **Sufficient Features** - Built-in CORS, HTTPS, and logging meet all requirements

For a detailed comparison and analysis, see [API Gateway Recommendation](../docs/API_GATEWAY_RECOMMENDATION.md).

**When might you need API Gateway?**
- Traffic exceeds 100K requests/month and you need caching
- Need custom domain (e.g., `api.yoursite.com`)
- Require API keys and usage plans for monetization
- Need advanced rate limiting and request validation

For this portfolio use case, Lambda Function URL is the optimal choice, providing the same functionality at zero cost with better performance.
