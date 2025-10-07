import { NextResponse } from "next/server";
import OpenAI from "openai";



const client = new OpenAI({
    apiKey : process.env.OPENAI_API_KEY
});

export async function POST(req:Request){
    try{
       const{resume,jobDescription} = await req.json();
       const prompt = `
       You are a professional resume evaluator. Analyze the resume strictly against the job description using the criteria below. Do NOT make assumptions beyond what's explicitly stated.
       
       Return your answer as a **valid JSON** object in this exact format:
       
       {
         "matchScore": number, 
         "missingSkills": string[],
         "suggestions": string[]
       }
       
       CRITERIA:
       
       1. **matchScore** (0–100): Percentage alignment between resume and job description based on hard requirements (skills, tools, qualifications).
       2. **missingSkills**: List ONLY those hard skills or tools in the job description that are completely missing from the resume.
       3. **suggestions**: At least 3 concrete, resume-specific improvements (e.g., “Quantify results from Project X with specific metrics”).
       
       ---
       Resume:
       """
       ${resume}
       """
       
       ---
       Job Description:
       """
       ${jobDescription}
       """
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