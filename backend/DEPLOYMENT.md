# Backend Deployment Guide

## Overview

This backend provides two main services:
1. **AI Assistant** - AWS Lambda with Amazon Bedrock for intelligent Q&A about the portfolio
2. **Location Detection** - Detects visitor's location using IP geolocation

## Architecture

### Why API Gateway (Not Just Lambda Function URLs)?

**The portfolio uses API Gateway as the primary architecture for several important reasons:**

1. **Professional Production Setup**
   - API Gateway provides enterprise-grade features: throttling, caching, request validation
   - Better suited for production portfolios that may scale
   - Provides centralized management of multiple endpoints (`/ai` and `/location`)

2. **Enhanced CORS Management**
   - API Gateway handles CORS at the infrastructure level (template.yaml Globals)
   - Automatic OPTIONS preflight responses
   - Consistent CORS across all endpoints
   - Reduces potential CORS issues in browsers

3. **Better Monitoring & Security**
   - CloudWatch integration for detailed API metrics
   - Request/response logging
   - AWS WAF integration available if needed
   - Rate limiting and throttling built-in

4. **Future Extensibility**
   - Easy to add new endpoints without changing architecture
   - Can add API keys, custom domains, or usage plans later
   - Supports request/response transformation

5. **Cost Consideration**
   - API Gateway costs ~$3.50 per million requests (free tier: 1M requests/month)
   - Lambda Function URLs are completely free but lack features above
   - For a portfolio with low traffic, both are essentially free
   - **Note:** The template maintains Lambda Function URLs for backward compatibility

**Current Architecture:**
```
Frontend (GitHub Pages)
    ↓ HTTPS
API Gateway REST API (/prod stage)
    ↓
    ├─ POST /ai → PortfolioAiFunction → Amazon Bedrock (Titan)
    └─ GET /location → LocationDetectionFunction → IP Geolocation APIs
```

**Legacy Support:**
- Lambda Function URLs are still deployed but marked as deprecated
- This maintains backward compatibility if anyone bookmarked the old URL
- New deployments should use API Gateway endpoints

- **API Gateway**: Single REST API with two endpoints (`/ai` and `/location`)
- **Lambda Functions**: Two Node.js 20.x functions
- **AI Service**: Amazon Bedrock (Titan Text Lite v1)
- **Location Service**: Free IP geolocation APIs (ipapi.co and ip-api.com)
- **CORS**: Properly configured at both API Gateway and Lambda levels

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

## CORS Configuration & Troubleshooting

### Understanding CORS in This Setup

**CORS (Cross-Origin Resource Sharing)** is configured at two levels for maximum reliability:

1. **API Gateway Level** (template.yaml Globals section)
   - Handles CORS at infrastructure level
   - Automatically responds to OPTIONS preflight requests
   - Configured for: `https://harsha17116031.github.io`
   - Methods: GET, POST, OPTIONS
   - Headers: `content-type`, `x-requested-with`

2. **Lambda Function Level** (handler.mjs and location-handler.mjs)
   - Adds CORS headers to all responses
   - Handles edge cases where API Gateway CORS isn't sufficient
   - Includes `access-control-max-age` for browser caching (24 hours)

### CORS Headers Explained

```javascript
const corsHeaders = {
  'access-control-allow-origin': 'https://harsha17116031.github.io',  // Only your domain
  'access-control-allow-methods': 'OPTIONS,POST',  // Allowed HTTP methods
  'access-control-allow-headers': 'content-type,x-requested-with',  // Allowed request headers
  'access-control-max-age': '86400'  // Cache preflight for 24 hours
};
```

### Common CORS Issues & Solutions

#### Issue 1: "No 'Access-Control-Allow-Origin' header is present"

**Cause:** The API is not returning CORS headers.

**Solutions:**
1. Verify `ALLOWED_ORIGIN` environment variable in template.yaml matches your domain exactly
2. Check that both Lambda functions include CORS headers in ALL responses
3. Ensure API Gateway CORS is configured in Globals section
4. Redeploy with `sam build && sam deploy`

**Test:**
```bash
curl -v -X OPTIONS https://your-api.execute-api.us-east-1.amazonaws.com/prod/ai \
  -H "Origin: https://harsha17116031.github.io" \
  -H "Access-Control-Request-Method: POST"
```

Should return:
```
< access-control-allow-origin: https://harsha17116031.github.io
< access-control-allow-methods: OPTIONS,POST
< HTTP/1.1 204 No Content
```

#### Issue 2: "CORS policy: The value of 'Access-Control-Allow-Origin' must not be wildcard '*'"

**Cause:** Using wildcard (`*`) with credentials or in strict browsers.

**Solution:** Already fixed! We use the specific origin:
```yaml
Environment:
  Variables:
    ALLOWED_ORIGIN: https://harsha17116031.github.io
```

#### Issue 3: Preflight (OPTIONS) requests failing

**Cause:** API Gateway or Lambda not handling OPTIONS correctly.

**Verification:**
- Both handler.mjs and location-handler.mjs check for OPTIONS method
- Return 204 with CORS headers and empty body
- API Gateway Globals configuration handles this automatically

**Current Implementation:**
```javascript
const method = event.requestContext?.http?.method || event.httpMethod;
if (method === 'OPTIONS') {
  return {
    statusCode: 204,
    headers: corsHeaders,
    body: ''
  };
}
```

#### Issue 4: Works locally but not in production

**Causes & Solutions:**

1. **Environment Variables:**
   - Verify `.env` has correct VITE_AI_API_URL and VITE_LOCATION_API_URL
   - Rebuild frontend: `npm run build`
   - Ensure GitHub Pages is serving latest build

2. **Domain Mismatch:**
   - Production uses `https://harsha17116031.github.io`
   - Local uses `http://localhost:5173`
   - For local testing, temporarily change ALLOWED_ORIGIN to `*` in template.yaml
   - **Remember to change back before production deploy!**

3. **Mixed Content:**
   - Ensure all URLs use HTTPS (not HTTP)
   - API Gateway URLs are always HTTPS

#### Issue 5: CORS works in browser but not in testing tools

**Explanation:** This is normal! CORS is a browser security feature.
- Tools like Postman, curl, or Insomnia bypass CORS
- If they work but browser doesn't, it's definitely a CORS configuration issue
- Use browser DevTools Network tab to see actual CORS headers

### Testing CORS Properly

**1. Browser DevTools (Best Method):**
```javascript
// Open browser console on https://harsha17116031.github.io
fetch('https://your-api.execute-api.us-east-1.amazonaws.com/prod/ai', {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify({ question: 'test' })
})
.then(r => r.json())
.then(console.log)
.catch(console.error);
```

**2. Check Network Tab:**
- Look for OPTIONS request (preflight)
- Verify response headers include `access-control-allow-origin`
- Check status code is 204 for OPTIONS, 200 for POST/GET

**3. Command Line (Simulating Browser):**
```bash
# Test preflight
curl -v -X OPTIONS https://your-api/prod/ai \
  -H "Origin: https://harsha17116031.github.io" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: content-type"

# Test actual request
curl -v -X POST https://your-api/prod/ai \
  -H "Origin: https://harsha17116031.github.io" \
  -H "Content-Type: application/json" \
  -d '{"question":"test"}'
```

### CORS Best Practices Implemented

✅ **Specific Origin:** Using exact domain instead of wildcard
✅ **Preflight Caching:** 24-hour cache to reduce OPTIONS requests
✅ **Dual-Level CORS:** Both API Gateway and Lambda handle CORS
✅ **Backward Compatibility:** Both Lambda URL and API Gateway work
✅ **Error Responses:** CORS headers included even in error responses (500, 400)
✅ **Multiple Methods:** Handles both legacy (`httpMethod`) and modern (`requestContext.http.method`) event formats

### When to Use Lambda Function URL vs API Gateway

**Use Lambda Function URL (Legacy) When:**
- You need absolute minimum cost (100% free)
- Simple single-function APIs
- No need for advanced features
- **Current status:** Deprecated but maintained for backward compatibility

**Use API Gateway (Recommended) When:**
- Production portfolios (like this one)
- Need better CORS management
- Want monitoring and logging
- May add more endpoints later
- Need rate limiting or caching
- **Current status:** Primary architecture for this portfolio

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
