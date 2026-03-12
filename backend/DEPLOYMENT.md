# Backend Deployment Guide

## Overview

This backend provides two main services:
1. **AI Assistant** - AWS Lambda with Amazon Bedrock for intelligent Q&A about the portfolio
2. **Location Detection** - Detects visitor's location using IP geolocation

## Architecture

- **API Gateway**: Single REST API with two endpoints (`/ai` and `/location`)
- **Lambda Functions**: Two Node.js 20.x functions
- **AI Service**: Amazon Bedrock (Titan Text Lite v1)
- **Location Service**: Free IP geolocation APIs (ipapi.co and ip-api.com)
- **CORS**: Configured for https://harsha17116031.github.io

## Prerequisites

1. AWS Account with appropriate permissions
2. AWS CLI configured with credentials
3. SAM CLI installed (`brew install aws-sam-cli` or equivalent)
4. Node.js 20.x or higher

## Deployment Steps

### 1. Configure Environment

Create a `.env` file in the `backend/` directory:

```bash
AWS_PROFILE=your-aws-profile
AWS_REGION=us-east-1  # or your preferred region
STACK_NAME=portfolio-backend
S3_BUCKET=your-deployment-bucket-name
```

### 2. Build the Lambda Functions

```bash
cd backend
sam build
```

This will:
- Package the Lambda functions
- Install Node.js dependencies
- Prepare for deployment

### 3. Deploy to AWS

First deployment (creates the stack):

```bash
sam deploy --guided
```

Follow the prompts:
- Stack Name: `portfolio-backend`
- AWS Region: `us-east-1` (or your choice)
- Confirm changes: Y
- Allow SAM CLI IAM role creation: Y
- Disable rollback: N (optional)
- Save arguments to samconfig.toml: Y

Subsequent deployments:

```bash
sam deploy
```

### 4. Get the API Endpoints

After deployment, SAM will output:

```
Outputs:
  ApiGatewayUrl: https://abc123xyz.execute-api.us-east-1.amazonaws.com/prod
  AiEndpoint: https://abc123xyz.execute-api.us-east-1.amazonaws.com/prod/ai
  LocationEndpoint: https://abc123xyz.execute-api.us-east-1.amazonaws.com/prod/location
```

### 5. Update Frontend Environment Variables

In the root directory, update your `.env` file:

```bash
VITE_AI_API_URL=https://abc123xyz.execute-api.us-east-1.amazonaws.com/prod/ai
VITE_LOCATION_API_URL=https://abc123xyz.execute-api.us-east-1.amazonaws.com/prod/location
```

### 6. Test the Endpoints

Test AI endpoint:

```bash
curl -X POST https://abc123xyz.execute-api.us-east-1.amazonaws.com/prod/ai \
  -H "Content-Type: application/json" \
  -H "Origin: https://harsha17116031.github.io" \
  -d '{"question": "What is your experience with AWS?"}'
```

Test Location endpoint:

```bash
curl -X GET https://abc123xyz.execute-api.us-east-1.amazonaws.com/prod/location \
  -H "Origin: https://harsha17116031.github.io"
```

## API Documentation

### POST /ai

AI-powered Q&A about the portfolio.

**Request:**
```json
{
  "question": "What are your skills with React?"
}
```

**Response:**
```json
{
  "answer": "I have extensive experience with React, building..."
}
```

### GET /location

Detects visitor's location from IP address.

**Response:**
```json
{
  "ip": "123.45.67.89",
  "city": "San Francisco",
  "region": "California",
  "country": "United States",
  "countryCode": "US",
  "timezone": "America/Los_Angeles",
  "latitude": 37.7749,
  "longitude": -122.4194
}
```

## Cost Estimates

### API Gateway
- $3.50 per million requests
- $0.09 per GB data transfer

### Lambda
- AI Function: 256MB, ~2-3s execution = ~$0.000005 per request
- Location Function: 128MB, ~1s execution = ~$0.000002 per request
- First 1 million requests/month are FREE

### Amazon Bedrock
- Titan Text Lite: $0.00015 per 1K input tokens, $0.0002 per 1K output tokens
- Typical request: ~$0.0001

### IP Geolocation (Free Tiers)
- ipapi.co: 30,000 requests/month free
- ip-api.com: 45 requests/minute free

**Estimated total for 1,000 visitors/month**: < $5/month

## Monitoring

View Lambda logs:

```bash
sam logs -n PortfolioAiFunction --tail
sam logs -n LocationDetectionFunction --tail
```

View CloudWatch metrics in AWS Console:
- Lambda > Functions > [Function Name] > Monitoring

## Troubleshooting

### CORS Errors

Ensure your frontend origin matches the `ALLOWED_ORIGIN` in template.yaml:
```yaml
ALLOWED_ORIGIN: https://harsha17116031.github.io
```

### Bedrock Access Denied

Ensure your AWS account has Bedrock access:
1. Go to AWS Console > Bedrock
2. Enable model access
3. Request access to "Titan Text Lite v1"

### Location Detection Not Working

The location service uses free public APIs. If both fail:
1. Check CloudWatch Logs for errors
2. Verify network connectivity from Lambda
3. Consider implementing API keys for higher rate limits

## Cleanup

To delete all resources:

```bash
sam delete
```

This will remove:
- API Gateway
- Lambda functions
- IAM roles
- CloudWatch log groups

## Legacy Lambda Function URL

For backward compatibility, the AI function still has a Lambda Function URL enabled. You can migrate fully to API Gateway by:

1. Update frontend to use API Gateway URLs
2. Remove the Lambda Function URL resources from template.yaml
3. Redeploy

## Support

For issues or questions, check:
- AWS SAM Documentation: https://docs.aws.amazon.com/serverless-application-model/
- AWS Lambda: https://docs.aws.amazon.com/lambda/
- Amazon Bedrock: https://docs.aws.amazon.com/bedrock/
