// Location detection handler using IP geolocation
const corsHeaders = {
  'content-type': 'application/json',
  'access-control-allow-origin': process.env.ALLOWED_ORIGIN || '*',
  'access-control-allow-methods': 'OPTIONS,GET',
  'access-control-allow-headers': 'content-type'
};

/**
 * Fetches location data from ipapi.co (free tier: 30,000 requests/month)
 * Falls back to ip-api.com if ipapi.co fails
 */
const getLocationFromIP = async (ip) => {
  try {
    // Try ipapi.co first (more reliable, JSON by default)
    const response = await fetch(`https://ipapi.co/${ip}/json/`);
    if (response.ok) {
      const data = await response.json();
      return {
        ip: data.ip,
        city: data.city,
        region: data.region,
        country: data.country_name,
        countryCode: data.country_code,
        timezone: data.timezone,
        latitude: data.latitude,
        longitude: data.longitude
      };
    }
  } catch (error) {
    console.log('ipapi.co failed, trying fallback:', error.message);
  }

  try {
    // Fallback to ip-api.com (free tier: 45 requests/minute)
    const response = await fetch(`http://ip-api.com/json/${ip}`);
    if (response.ok) {
      const data = await response.json();
      if (data.status === 'success') {
        return {
          ip: data.query,
          city: data.city,
          region: data.regionName,
          country: data.country,
          countryCode: data.countryCode,
          timezone: data.timezone,
          latitude: data.lat,
          longitude: data.lon
        };
      }
    }
  } catch (error) {
    console.log('ip-api.com failed:', error.message);
  }

  // Return minimal data if both services fail
  return {
    ip: ip,
    city: 'Unknown',
    country: 'Unknown',
    error: 'Unable to determine location'
  };
};

/**
 * Extracts IP address from Lambda event
 * Checks X-Forwarded-For header first (for API Gateway/CloudFront)
 * Falls back to sourceIp from requestContext
 */
const extractClientIP = (event) => {
  // Check X-Forwarded-For header (set by API Gateway, CloudFront, etc.)
  const forwardedFor = event.headers?.['x-forwarded-for'];
  if (forwardedFor) {
    // X-Forwarded-For can be a comma-separated list, take the first IP
    return forwardedFor.split(',')[0].trim();
  }

  // Fallback to sourceIp from request context (Lambda Function URL)
  return event.requestContext?.http?.sourceIp || '0.0.0.0';
};

export const handler = async (event) => {
  // Handle CORS preflight
  if (event.requestContext?.http?.method === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: corsHeaders
    };
  }

  try {
    const clientIP = extractClientIP(event);
    console.log('Client IP:', clientIP);

    // Don't try to geolocate local/private IPs
    if (clientIP === '0.0.0.0' || clientIP.startsWith('127.') || clientIP.startsWith('192.168.') || clientIP.startsWith('10.')) {
      return {
        statusCode: 200,
        headers: corsHeaders,
        body: JSON.stringify({
          ip: clientIP,
          city: 'Local',
          country: 'Development',
          message: 'Development/local environment detected'
        })
      };
    }

    const locationData = await getLocationFromIP(clientIP);

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify(locationData)
    };
  } catch (error) {
    console.error('Location handler error:', error);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({
        error: 'Failed to detect location',
        details: error instanceof Error ? error.message : 'unknown error'
      })
    };
  }
};
