//import the pinecone library
const { Pinecone } = require("@pinecone-database/pinecone");

//initialize the pinecone client with your API key
const pc = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});

// create a dense index with integrated embedding

const cohortChatGptIndex = pc.Index("cohort-chatgpt");

async function createMemory({ vectors, metadata, messageId }) {

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
    includeMetadata: true,
    filter: metadata,
  });
  return data.matches;
}

module.exports = {
  createMemory,
  queryMemory,
};
