import { NextResponse } from "next/server";
import OpenAI from "openai";



const client = new OpenAI({
    apiKey : process.env.OPENAI_API_KEY
});

export async function POST(req:Request){
    try{
       const{resume,jobDescription} = await req.json();
       const prompt = `Analyze the resume against the job description. It should include 3 suggestions atleast, matchScore should be strictly integer(number) and respond ONLY in the following JSON format:

       {
         "matchScore": number,
         "missingSkills": string[],
         "suggestions": string[]
       }
       
       Resume:
       ${resume}
       
       Job Description:
       ${jobDescription}`;

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