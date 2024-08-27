import {NextResponse} from 'next/server'
import { HfInference } from '@huggingface/inference'

const systemPrompt = `You are an AI designed to generate concise weekly progress summaries for software development projects based on provided inputs. Your task is to create a daily logbook entry for a specified number of weeks, as well as a title and a weekly summary that reflects the overall progress.

Inputs:

    1. Title: A brief title that encapsulates the main focus or theme of the specified week.
    2. Number of Weeks: The number of weeks for which the logbook entries should be generated.
    3. Tech Stack: The technologies and tools used in the project (e.g., Django, React, Node.js).
    4. Text Length: The desired length of the text for each entry (e.g., concise, detailed).
    5. Description: A detailed description of the work done during the specified week, including any goals, milestones, or significant achievements.

**Important:** Do not assume or infer any details beyond what is provided in the description. Your output should strictly adhere to the provided inputs without introducing any additional information.

Output: A weekly progress chart for the specified number of weeks, including the following for each week:
    - Title: A brief title summarizing the week's main focus.
    - Weekly Summary: A concise overview of the work done and the progress made during the week, based on the provided description.
    - Daily Logbook Entries: A summary of the work done each day, taking into account the tech stack, goals, and milestones provided in the description.

Example Format:

Week 1:
- Weekly Summary: [Overview of Progress Made]
- Monday: [Brief Summary of Work Done]
- Tuesday: [Brief Summary of Work Done]
...
- Friday: [Brief Summary of Work Done]

Week 2:
- Weekly Summary: [Overview of Progress Made]
- Monday: [Brief Summary of Work Done]
- Tuesday: [Brief Summary of Work Done]
...
- Friday: [Brief Summary of Work Done]

Make sure to include the most relevant and significant progress each day, focusing on what was added, improved, or fixed. If the input specifies a concise summary, keep each entry to one or two sentences.
`
const hf = new HfInference(process.env.HF_TOKEN)

const POST = async(req) =>{
    const data = await req.json()

    const stream = new ReadableStream({
        async start(controller) {
            const encoder = new TextEncoder();
            try {
                for await (const chunk of hf.chatCompletionStream({
                    model: "mistralai/Mistral-7B-Instruct-v0.2",
                    messages: [
                        {role: 'system', content: systemPrompt},
                        {role: 'user', content: `
        Generate a weekly progress chart for my project based on the following details:

        1. **Title:** ${data.title}
        2. **Description:** ${data.description}
        3. **Number of Weeks:** ${data.weeks}
        4. **Tech Stack:** ${data.tech}
        5. **Text Length:** ${data.textLength}

        Please summarize the work done each day, focusing on significant progress like features added, bugs fixed, and enhancements made. Format the output according to the provided date format, and ensure each entry is brief and to the point.`},
                    ],
                    max_tokens: 600,
                    temperature: 0.4,
                })) {
                    if (chunk.choices && chunk.choices.length > 0) {
                        const content = chunk.choices[0].delta.content;
                        if(content){
                            const text = encoder.encode(content);
                            controller.enqueue(text);
                        }
                        
                    }
                }
            } catch (err) {
                controller.error(err);
            } finally {
                controller.close();
            }
        },
    });

    return new NextResponse(stream);

}

export {POST}