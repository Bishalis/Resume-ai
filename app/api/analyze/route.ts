import { NextResponse } from "next/server";
import OpenAI from "openai";



const client = new OpenAI({
    apiKey : process.env.OPENAI_API_KEY
});

export async function POST(req:Request){
    try{
       const{resume,jobDescription} = await req.json();
       const prompt = `
       Analyze the provided resume against the job description based on the following strict criteria:
       
       1.  **matchScore**: Calculate a score as a whole integer between 0 and 100. The score represents the percentage of direct alignment between the resume's experience/skills and the job description's "hard" requirements.
       2.  **missingSkills**: Identify key skills, tools, or qualifications explicitly mentioned in the job description that are NOT found in the resume.
       3.  **suggestions**: Provide at least 3 distinct and actionable suggestions for the candidate to improve their resume for this specific job. Suggestions should be concrete (e.g., "Quantify your achievement in the 'Project X' role by adding metrics like 'improved efficiency by 15%'").
       
       Respond ONLY in the following JSON format. Do not add any text before or after the JSON object.
       
       {
         "matchScore": number,
         "missingSkills": string[],
         "suggestions": string[]
       }
       
       ---
       Resume:
       ${resume}
       
       ---
       Job Description:
       ${jobDescription}
       `;

       const completion = await client.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'user', content: prompt },
        ],
      });

      console.log(completion.choices[0].message.content);
      const analysis = completion.choices[0].message.content || "";
      try {
        const parsed = JSON.parse(analysis);
        return NextResponse.json(parsed);
      } catch (err) {
        return NextResponse.json({ error: "Failed to parse analysis", raw: analysis }, { status: 500 });
      }
    } 
    catch(error){
       return NextResponse.json(
       { error : "Analysis failed"},
       {status:500}
       )
    }

}