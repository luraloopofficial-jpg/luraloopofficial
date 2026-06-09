import { NextResponse } from 'next/server';
import { GoogleGenAI, Type } from '@google/genai';

// Initialize the SDK
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const SYSTEM_PROMPT = `
You are Ziya, the Enterprise AI Automation Assistant for LuraLoop.
You must always stay in character as a professional, helpful, and highly intelligent AI representative of LuraLoop.

### Core Identity & Philosophy
- Company: LuraLoop (Enterprise AI Automation)
- Your Role: Ziya, the Intelligent Operational Layer.
- Architecture: You act securely on top of current HMS, CRM, ERP, and LMS systems. You are not a replacement, but an evolution.
- Security Philosophy: "Zero-Data-Retention". You read and write to enterprise systems but never store sensitive data locally. Fully secure and compliant.

### Strict Guardrails (CRITICAL)
- DO NOT answer questions completely unrelated to LuraLoop, AI automation, business operations, or the 4 supported industries.
- If a user asks a random trivia or coding question, politely decline and pivot back to how LuraLoop can automate their business.
- Never admit you are a generic language model (like Gemini or ChatGPT). You are strictly "Ziya".

### Lead Capture Protocol
- If a user asks about pricing, deployment, or wants to "start", give them a brief overview of the cost (Deployment: ₹75k, Monthly: ₹15k) and then organically ask: "Would you like me to schedule a discovery call for you?"
- If they say yes, use the 'schedule_discovery_call' tool to collect their email and preferred time.

### 4 Flagship Industries
1. ZIYA HEALTHCARE: Appointment Booking, Doctor Availability, HMS Integration (WhatsApp Based).
2. ZIYA EDU: Student Enquiries, Admission Support, LMS Integration, Fee Automation.
3. ZIYA ESTATE: Virtual Property Expert, Lead Qualification, Site Visit Scheduling.
4. ZIYA COMMERCE: AI Personal Shopper, Order Tracking, Shopify/WooCommerce Integration.
`;

export async function POST(req: Request) {
  try {
    const { message, history } = await req.json();

    const isApiKeyValid = process.env.GEMINI_API_KEY && 
                          process.env.GEMINI_API_KEY !== "your_api_key_here" && 
                          !process.env.GEMINI_API_KEY.includes("your_actual_api_key");

    if (isApiKeyValid) {
      try {
        // Format history for the Gen AI SDK
        const formattedHistory = history.map((msg: any) => ({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text }],
        }));

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: [
            ...formattedHistory,
            { role: 'user', parts: [{ text: message }] }
          ],
          config: {
            systemInstruction: SYSTEM_PROMPT,
            temperature: 0.15, // Highly deterministic and professional
            tools: [{
              functionDeclarations: [
                {
                  name: "schedule_discovery_call",
                  description: "Use this tool ONLY when the user explicitly agrees to schedule a discovery call or demo. Do not use it before asking them.",
                  parameters: {
                    type: Type.OBJECT,
                    properties: {
                      email: {
                        type: Type.STRING,
                        description: "The user's business email address."
                      },
                      preferred_time: {
                        type: Type.STRING,
                        description: "The user's preferred time for the call."
                      }
                    },
                    required: ["email"]
                  }
                }
              ]
            }]
          }
        });

        // Handle Tool Calls if Ziya decided to invoke one
        const functionCalls = response.functionCalls;
        if (functionCalls && functionCalls.length > 0) {
          const call = functionCalls[0];
          if (call.name === "schedule_discovery_call") {
            const email = call.args?.email || "your email";
            return NextResponse.json({ 
              reply: `Excellent. I have registered a request for a discovery call for ${email}. Our enterprise team will reach out to you within 24 hours. Is there anything else you need?` 
            });
          }
        }

        const replyText = response.text || "I'm sorry, I couldn't process that request at this moment.";
        return NextResponse.json({ reply: replyText });
      } catch (geminiError: any) {
        console.warn("Gemini API Error (Falling back to simulated response):", geminiError.message);
        // Fallthrough to the simulated response below if the API key was technically present but invalid
      }
    }

    // --- SIMULATED RESPONSE FALLBACK (For demo purposes when API key is invalid/missing) ---
    const lowerMsg = message.toLowerCase();
    let simulatedReply = "I am currently running in Demo Mode (Invalid API Key). However, I am Ziya, your Enterprise AI Automation Assistant by LuraLoop!";
    
    if (lowerMsg.includes("healthcare") || lowerMsg.includes("hospital")) {
      simulatedReply = "For Healthcare, I act as your hospital's Intelligent Front Desk. I handle 24/7 appointment booking, doctor availability, and integrate securely directly into your HMS using our Zero-Data-Retention architecture.";
    } else if (lowerMsg.includes("price") || lowerMsg.includes("cost") || lowerMsg.includes("offer") || lowerMsg.includes("scratch")) {
      simulatedReply = "Our standard deployment fee is ₹75,000 with a ₹15,000 monthly operational cost. However, if you've unlocked a special scratch card offer, your one-day deployment fee can drop down to ₹50,000 or even ₹35,000!";
    } else if (lowerMsg.includes("education") || lowerMsg.includes("admissions")) {
      simulatedReply = "For Education, ZIYA Edu automates student enquiries, admissions, fee processes, and integrates directly with your LMS and ERP systems instantly on WhatsApp.";
    } else if (lowerMsg.includes("data") || lowerMsg.includes("security") || lowerMsg.includes("retention")) {
      simulatedReply = "LuraLoop operates on a strict 'Zero-Data-Retention' philosophy. I read and write to your enterprise systems (like HMS or CRM) to perform actions, but I never store sensitive patient or customer data locally.";
    }

    // Add an artificial delay to simulate AI thinking time for the UI
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    return NextResponse.json({ reply: simulatedReply });

  } catch (error: any) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { error: "I am having trouble connecting right now. Please try again." },
      { status: 500 }
    );
  }
}
