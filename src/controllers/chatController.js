const OpenAIAssistantClient = require("../services/OpenAIAssistantClient");

const sendMessage = async (req, res) => {
    const { message, assistantId, threadId } = req.body;

    if (!message) {
        return res.status(400).json({ error: "Message is required" });
    }

    const openAIClient = new OpenAIAssistantClient(process.env.OPENAI_API_KEY);

    try {
        // assistantId가 제공되면 설정, 아니면 기본값 사용
        if (assistantId) {
            openAIClient.setAssistantId(assistantId);
        }

        // threadId가 제공되면 설정, 아니면 새로 생성
        if (threadId) {
            openAIClient.setThreadId(threadId);
        } else {
            await openAIClient.createNewThread();
        }

        const response = await openAIClient.sendMessage(message);

        res.json({
            response,
            assistantId: openAIClient.getAssistantId(),
            threadId: openAIClient.getThreadId(),
        });
    } catch (error) {
        console.error("Error in sendMessage:", error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = { sendMessage };
