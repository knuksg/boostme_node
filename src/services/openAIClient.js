const OpenAI = require("openai");

class OpenAIAssistantClient {
    constructor(apiKey) {
        this.openai = new OpenAI({ apiKey });
        this.assistantId = null;
        this.threadId = null;
    }

    setAssistantId(assistantId) {
        this.assistantId = assistantId;
    }

    setThreadId(threadId) {
        this.threadId = threadId;
    }

    getAssistantId() {
        return this.assistantId;
    }

    getThreadId() {
        return this.threadId;
    }

    async createNewThread() {
        const thread = await this.openai.beta.threads.create();
        this.threadId = thread.id;
    }

    async createOrGetAssistant() {
        if (!this.assistantId) {
            const assistant = await this.openai.beta.assistants.create({
                name: "Weight Tracker",
                instructions: `
                    You are a helpful assistant for tracking weight. When the user mentions today's weight,
                    respond with a JSON object containing the function name "create_weight", the weight value
                    provided by the user, and your response. The JSON object should be in the format:
                    {
                        "function_name": "create_weight",
                        "value": "{weight}",
                        "response": "{your_response}"
                    }
                    Ensure the value field contains only numbers. For other weight-related contexts,
                    respond in a regular conversational manner.
                `,
                model: "gpt-4-turbo-preview",
            });
            this.assistantId = assistant.id;
        }
        return this.assistantId;
    }

    async sendMessage(message) {
        if (!this.assistantId) {
            await this.createOrGetAssistant();
        }

        if (!this.threadId) {
            await this.createNewThread();
        }

        // 메시지 추가
        await this.openai.beta.threads.messages.create(this.threadId, {
            role: "user",
            content: message,
        });

        // Run 생성 및 완료 대기
        const run = await this.openai.beta.threads.runs.create(this.threadId, {
            assistant_id: this.assistantId,
        });

        let runStatus;
        do {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            runStatus = await this.openai.beta.threads.runs.retrieve(this.threadId, run.id);
        } while (runStatus.status !== "completed");

        // 응답 메시지 검색
        const messages = await this.openai.beta.threads.messages.list(this.threadId);
        const assistantMessage = messages.data.find((msg) => msg.role === "assistant");

        if (assistantMessage) {
            return assistantMessage.content[0].text.value;
        } else {
            throw new Error("No response from assistant.");
        }
    }
}

module.exports = OpenAIAssistantClient;
