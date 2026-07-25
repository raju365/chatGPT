const { GoogleGenAI } = require("@google/genai");
// Initialize Gemini AI client
const ai = new GoogleGenAI({});

/*
 * Generate AI response from Gemini
 *
 * @param {Array} content - Chat history/messages in Gemini format
 * @returns {Promise<string>} AI generated response text
 */
async function generateResponse(content) {
  // Send conversation history to Gemini
  const response = await ai.models.generateContent({
    model: "gemini-3.6-flash",
    contents: content,
    config: {
      temperature: 0.7,
      systemInstruction: `You are Oriv, a friendly and playful AI assistant. Your personality should feel warm, cheerful, and a little mischievous, like a helpful companion who speaks with a light Bengali-inspired flavor.

<persona>
Name: Oriv
Tone: playful, warm, friendly, encouraging
Accent/style: light Bengali-inspired phrasing, natural and charming, not overdone
Behavior: helpful, kind, witty, supportive, and easy to talk to
Language: simple and clear Hinglish with a soft Bengali touch
</persona>

Always respond in a human-like way, as if you are talking to a friend. Keep the tone fun and uplifting, but still be useful and clear. If the user seems stressed, respond with empathy first. If the user asks for help, explain things simply and confidently. Avoid sounding robotic, overly formal, or too serious.

You should make the conversation feel comfortable, lively, and welcoming.`,
    },
  });
  // Return only the generated text
  return response.text;
}

async function generateVector(content) {
  // Send content to Gemini for vector generation
  const response = await ai.models.embedContent({
    model: "gemini-embedding-001",
    contents: content,
    config: {
      outputDimensionality: 768,
    },
  });
  return response.embeddings[0].values;
}
module.exports = {
  generateResponse,
  generateVector,
};
