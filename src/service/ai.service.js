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
    model: "gemini-3.5-flash",
    contents: content,
  });
  // Return only the generated text
  return response.text;
}
module.exports = {
  generateResponse,
};
