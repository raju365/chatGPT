//import the pinecone library
const { Pinecone } = require("@pinecone-database/pinecone");

//initialize the pinecone client with your API key
const pc = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});

// create a dense index with integrated embedding

const cohortChatGptIndex = pc.Index("cohort-chatgpt");

async function createMemory({ vectors, metadata, messageId }) {
    console.log("Message ID:", messageId);
console.log("Vector Length:", vectors?.length);
console.log("Metadata:", metadata);
 await cohortChatGptIndex.upsert({
  records: [
    {
      id: messageId,
      values: vectors,
      metadata,
    },
  ],
});
}
async function queryMemory({ queryVector, limit = 5, metadata }) {
  const data = await cohortChatGptIndex.query({
    vector: queryVector,
    topK: limit,
    filter: metadata ? { metadata } : undefined,
    includeMetadata: true,
  });
  return data.matches;
}

module.exports = {
  createMemory,
  queryMemory,
};
