const axios = require("axios");

class OpenAIClient {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.messages = [
            {
                role: "system",
                content:
                    'You are a helpful assistant. When the user says "오늘 체중 {weight}키로 기록해줘", respond with {"function_name": "create_weight", "value": "{weight}"}.',
            },
        ];
    }

    async sendMessage(message) {
        this.messages.push({ role: "user", content: message });

        try {
            const response = await axios.post(
                "https://api.openai.com/v1/chat/completions",
                {
                    model: "gpt-3.5-turbo",
                    messages: this.messages,
                    max_tokens: 150,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${this.apiKey}`,
                    },
                }
            );

            const chatResponse = response.data.choices[0].message.content.trim();
            this.messages.push({ role: "assistant", content: chatResponse });
            return chatResponse;
        } catch (error) {
            throw new Error(`Failed to load response from OpenAI: ${error.message}`);
        }
    }
}

module.exports = OpenAIClient;
