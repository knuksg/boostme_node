const OpenAIClient = require("../services/openAIClient");

const sendMessage = async (req, res) => {
    const { messages } = req.body;
    console.log("messages", messages);
    const openAIClient = new OpenAIClient(process.env.OPENAI_API_KEY);

    try {
        const response = await openAIClient.sendMessage(messages);
        res.json({ response });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { sendMessage };
