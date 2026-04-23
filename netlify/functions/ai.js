const https = require("https");

exports.handler = async function(event, context) {

    const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTIONS"
    };

    if (event.httpMethod === "OPTIONS") {
        return { statusCode: 204, headers, body: "" };
    }

    if (event.httpMethod !== "POST") {
        return { statusCode: 405, headers, body: "Method not allowed" };
    }

    try {
        const { prompt } = JSON.parse(event.body);
        if (!prompt) {
            return { statusCode: 400, headers, body: JSON.stringify({ error: "No prompt provided" }) };
        }

        // Google Gemini API Key — stored safely in Netlify environment variables
        const GEMINI_KEY = process.env.GEMINI_KEY;
        if (!GEMINI_KEY) {
            return { statusCode: 500, headers, body: JSON.stringify({ error: "API key not set" }) };
        }

        const result = await callGemini(GEMINI_KEY, prompt);
        return { statusCode: 200, headers, body: JSON.stringify({ result }) };

    } catch (err) {
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: err.message })
        };
    }
};

function callGemini(apiKey, prompt) {
    return new Promise((resolve, reject) => {

        const requestBody = JSON.stringify({
            contents: [
                {
                    parts: [
                        { text: prompt }
                    ]
                }
            ],
            generationConfig: {
                maxOutputTokens: 400,
                temperature: 0.7
            }
        });

        // Gemini 2.0 Flash — completely free, no card needed
        const path = "/v1beta/models/gemini-2.0-flash:generateContent?key=" + apiKey;

        const options = {
            hostname: "generativelanguage.googleapis.com",
            path: path,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Content-Length": Buffer.byteLength(requestBody)
            }
        };

        const req = https.request(options, (res) => {
            let data = "";
            res.on("data", chunk => data += chunk);
            res.on("end", () => {
                try {
                    const parsed = JSON.parse(data);

                    // Extract text from Gemini response
                    const text = parsed.candidates &&
                                 parsed.candidates[0] &&
                                 parsed.candidates[0].content &&
                                 parsed.candidates[0].content.parts &&
                                 parsed.candidates[0].content.parts[0] &&
                                 parsed.candidates[0].content.parts[0].text
                        ? parsed.candidates[0].content.parts[0].text
                        : "Based on your preferences, here are the best PGs for you!";

                    resolve(text);
                } catch(e) {
                    reject(new Error("Failed to parse Gemini response"));
                }
            });
        });

        req.on("error", reject);
        req.write(requestBody);
        req.end();
    });
}