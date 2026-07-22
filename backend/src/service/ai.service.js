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
  });
  // Return only the generated text
  return response.text;
}

async function generateVector(content){
  // Send content to Gemini for vector generation
  const response = await ai.models.embedContent({
    model: "gemini-embedding-001",
    contents: content,
    config:{
      outputDimensionality:768
    }
  })
  return response.embeddings[0].values
}
module.exports = {
  generateResponse,
  generateVector
};
