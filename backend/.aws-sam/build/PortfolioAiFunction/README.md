# Backend (AWS Lambda + Amazon Bedrock)

This folder contains a cost-effective AI backend for the portfolio using:
- AWS Lambda (pay-per-request)
- Lambda Function URL (no API Gateway required)
- Amazon Bedrock model invocation

## Deploy (AWS SAM)

1. Install backend dependency:
   ```bash
   cd backend
   npm install
   ```
2. Build & deploy:
   ```bash
   sam build
   sam deploy --guided
   ```
3. Copy the output `PortfolioAiUrl` and set it in frontend env:
   ```bash
   # in repository root
   cp .env.example .env
   # then set VITE_AI_API_URL to your deployed function URL
   ```

## Environment variables

- `BEDROCK_MODEL_ID` (default `amazon.titan-text-lite-v1` for lower cost)
- `ALLOWED_ORIGIN` (set to your GitHub Pages domain)

## Request format

`POST` JSON body:
```json
{ "question": "Tell me more about XpressCV and OckraTech" }
```

Response:
```json
{ "answer": "..." }
```
