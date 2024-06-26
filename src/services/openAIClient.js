const axios = require("axios");

class OpenAIClient {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.messages = [
            {
                role: "system",
                content: `
        You are a helpful assistant. When the user mentions today's weight in the latest message, respond with a JSON object containing the function name "create_weight", the weight value provided by the user, and your response. The JSON object should be in the format:
        {
          "function_name": "create_weight",
          "value": "{weight}",
          "response": "{your_response}"
        }
        Ensure the value field contains only numbers.  For other weight-related contexts, respond in a regular conversational manner.
      `,
            },
        ];
    }

    async sendMessage(messages) {
        this.messages = [...this.messages, ...messages]; // messages 배열을 병합

        console.log("this.messages", this.messages);

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
            return chatResponse;
        } catch (error) {
            console.error("OpenAI API call failed:", error.response ? error.response.data : error.message);
            throw new Error(`Failed to load response from OpenAI: ${error.message}`);
        }
    }
}

module.exports = OpenAIClient;
