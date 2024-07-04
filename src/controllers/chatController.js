const OpenAIAssistantClient = require("../services/openAIClient");
const db = require("../models/db");

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

        if (typeof response === "object") {
            // If parsedResponse is an object, return specific fields
            res.json({
                response: response.response,
                function_name: response.function_name,
                value: response.value,
                assistantId: openAIClient.getAssistantId(),
                threadId: openAIClient.getThreadId(),
            });
        } else {
            // If parsedResponse is a string, return it as the response
            res.json({
                response: response,
                assistantId: openAIClient.getAssistantId(),
                threadId: openAIClient.getThreadId(),
            });
        }
    } catch (error) {
        console.error("Error in sendMessage:", error);
        res.status(500).json({ error: error.message });
    }
};

const saveConversation = async (req, res) => {
    const uid = req.uid; // 인증 미들웨어에서 설정된 uid 사용
    const { assistantId, threadId } = req.body;

    if (!uid || !assistantId || !threadId) {
        return res.status(400).json({ error: "uid, assistantId, and threadId are required" });
    }

    try {
        await db.query(
            `INSERT INTO user_conversations (uid, assistant_id, thread_id)
             VALUES (?, ?, ?)
             ON DUPLICATE KEY UPDATE
             assistant_id = VALUES(assistant_id),
             thread_id = VALUES(thread_id)`,
            [uid, assistantId, threadId]
        );
        res.status(200).send({ message: "Conversation saved successfully" });
    } catch (error) {
        console.error("Error in saveConversation:", error);
        res.status(500).json({ error: "Failed to save conversation" });
    }
};

const getConversation = async (req, res) => {
    const uid = req.uid; // 인증 미들웨어에서 설정된 uid 사용

    try {
        const [results] = await db.query(`SELECT assistant_id, thread_id FROM user_conversations WHERE uid = ?`, [uid]);
        console;
        if (results.length > 0) {
            res.status(200).send(results[0]);
        } else {
            res.status(200).send({ assistant_id: null, thread_id: null });
        }
    } catch (error) {
        console.error("Error in getConversation:", error);
        res.status(500).json({ error: "Failed to load conversation" });
    }
};

module.exports = { sendMessage, saveConversation, getConversation };
