import { BedrockRuntimeClient, InvokeModelCommand } from '@aws-sdk/client-bedrock-runtime';

const client = new BedrockRuntimeClient({ region: process.env.AWS_REGION || 'us-east-1' });

const corsHeaders = {
  'content-type': 'application/json',
  'access-control-allow-origin': process.env.ALLOWED_ORIGIN || '*',
  'access-control-allow-methods': 'OPTIONS,POST',
  'access-control-allow-headers': 'content-type'
};

const portfolioContext = `
Portfolio context:
- Name: Harsha Vardhan Reddy
- Current Role: Senior Software Developer at Anthem Inc. (Feb 2024 - Present)
- Previous Roles: Software Developer at Leidos (Jul 2023 - Dec 2023), Full Stack Developer at Ocktra Tech (Jul 2020 - Jul 2022)
- Education: MS in Computer Science from UT Dallas (2022-2023), BTech in Information Technology from NIT Raipur, India (2016-2020)
- Contact: 940-843-1600, ghanta.17116031@gmail.com, hvg220000@utdallas.edu
- Certifications: AWS Certified AI Practitioner
- Key Skills: React, Node.js, TypeScript, Python, AWS (S3, Lambda, ECS, CDK), PostgreSQL, MongoDB, Kafka, Docker, CI/CD
- Current Work at Anthem:
  * Provider Portal: Led development of modular React/Node.js platform for case management
  * Claims Workflow: Decomposed legacy systems into domain-driven microservices with OAuth2
  * Event Streaming: Designed Kafka-based event-driven architecture replacing Redis Pub/Sub
  * AI Workflow Automation: Built human-in-the-loop document processing workflows
  * High Performance APIs: Optimized RESTful APIs with PostgreSQL and MongoDB
  * Infrastructure: Managed AWS infrastructure using CDK (TypeScript)
- Previous Experience at Leidos:
  * Built modular Node.js services with layered patterns
  * Implemented Kafka-driven async processing
  * Created Redis-based distributed locking for concurrency
  * Established versioned REST APIs with RBAC
  * Optimized React dashboards with lazy loading and memoization
- Previous Experience at Ocktra Tech:
  * Built low-latency market data services
  * Developed secure order processing APIs
  * Implemented event-driven alerting framework
  * Designed portfolio analytics backend
  * Optimized React trading dashboards
- Project 1: XpressCV (AI Resume Generation Tool) - https://xpresscv.com - AI-driven resume generation
- Project 2: OckraTech (Financial Trading Platform) - https://ocktratech.com - Real-time trading platform
- Academic Projects:
  * Predictive Modeling for Emerging Trends: NLP framework with transformer models (LSTM, BERTopic)
  * Fake News Prediction: ML model with SVM, Naive Bayes, Logistic Regression (92% accuracy)
`;

const bedrockModelId = process.env.BEDROCK_MODEL_ID || 'amazon.titan-text-lite-v1';

const buildPrompt = (question) => `You are a concise portfolio assistant. Keep answers practical and short (max 8 bullet points).
${portfolioContext}
User question: ${question}
`;

const parseBedrockBody = (rawBody) => {
  try {
    return JSON.parse(new TextDecoder().decode(rawBody));
  } catch {
    throw new Error('Unable to parse Bedrock response body');
  }
};

const extractAnswer = (decoded) => {
  // Titan text models return { results: [{ outputText: string }] }.
  const titanAnswer = decoded?.results?.[0]?.outputText;
  if (typeof titanAnswer === 'string' && titanAnswer.trim()) {
    return titanAnswer.trim();
  }

  // Future fallback for models that use { outputText: string }.
  if (typeof decoded?.outputText === 'string' && decoded.outputText.trim()) {
    return decoded.outputText.trim();
  }

  throw new Error(`Unsupported response format for model ${bedrockModelId}`);
};

export const handler = async (event) => {
  if (event.requestContext?.http?.method === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: corsHeaders
    };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const question = String(body.question || '').trim();

    if (!question) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'question is required' })
      };
    }

    const command = new InvokeModelCommand({
      modelId: bedrockModelId,
      contentType: 'application/json',
      accept: 'application/json',
      body: JSON.stringify({
        inputText: buildPrompt(question),
        textGenerationConfig: {
          maxTokenCount: 300,
          temperature: 0.3,
          topP: 0.9
        }
      })
    });

    const result = await client.send(command);
    const decoded = parseBedrockBody(result.body);
    const answer = extractAnswer(decoded);

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ answer })
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({
        error: 'Failed to process AI request',
        details: error instanceof Error ? error.message : 'unknown error'
      })
    };
  }
};
