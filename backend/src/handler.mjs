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
- Name: [Your Name]
- Roles: [Your Role 1] | [Your Role 2]
- Project 1: XpressCV (AI Resume Generation Tool) - https://xpresscv.com
- Project 2: OckraTech (Financial Trading Platform) - https://ocktratech.com
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
