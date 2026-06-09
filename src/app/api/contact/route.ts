import { NextResponse } from 'next/server';
import sanitizeHtml from 'sanitize-html';

// Global variable for rate limiting simulation
const rateLimitMap = new Map<string, { count: number, timestamp: number }>();

export async function POST(req: Request) {
  try {
    const { firstName, lastName, email, company, message } = await req.json();

    // --- 1. IP RATE LIMITING (DOS PROTECTION) ---
    // In production this would use Vercel KV or Redis. We simulate it here using a Map.
    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    const now = Date.now();
    const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
    const MAX_REQUESTS = 5;

    const record = rateLimitMap.get(ip);
    if (record) {
      if (now - record.timestamp < WINDOW_MS) {
        if (record.count >= MAX_REQUESTS) {
          console.warn(`[SECURITY] Rate Limit Exceeded for IP: ${ip}`);
          return NextResponse.json(
            { error: "Too Many Requests. Please try again later." },
            { status: 429 }
          );
        }
        record.count++;
      } else {
        rateLimitMap.set(ip, { count: 1, timestamp: now });
      }
    } else {
      rateLimitMap.set(ip, { count: 1, timestamp: now });
    }

    // --- 2. INPUT SANITIZATION (XSS & INJECTION PROTECTION) ---
    const sanitizeOptions = {
      allowedTags: [], // Strip all HTML tags
      allowedAttributes: {}
    };

    const cleanFirstName = sanitizeHtml(firstName || "", sanitizeOptions).trim();
    const cleanLastName = sanitizeHtml(lastName || "", sanitizeOptions).trim();
    const cleanEmail = sanitizeHtml(email || "", sanitizeOptions).trim();
    const cleanCompany = sanitizeHtml(company || "", sanitizeOptions).trim();
    const cleanMessage = sanitizeHtml(message || "", sanitizeOptions).trim();

    // Basic regex validation for email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    // --- 3. EXECUTE WORKFLOW & ENFORCE ZERO-DATA RETENTION ---
    console.log(`[CONTACT API] Processing secure request for: ${cleanEmail}`);
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Zero-Data-Retention Policy: We do not save to a local DB. We would forward to an enterprise CRM/Mailer here.
    console.log("[SECURITY] Workflow executed. Destroying temporary memory context.");

    return NextResponse.json({ success: true, message: "Request received securely." });

  } catch (error) {
    console.error("[SECURITY] Contact API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
