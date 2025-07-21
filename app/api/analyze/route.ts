import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";


const openAI = new OpenAI({
    apiKey : process.env.open_ai_url
});

export async function POST(req:NextRequest){
    const body = req.json();
    console.log(body + "body received");
    try{
       const{resume,jobDescription} = await req.json();
       const completion = await openAI.chat.completions.create({
        model: "gpt-4",
        messages: [{
          role: "system",
          content: "Analyze this resume against the job description. Provide match score (0-100), missing skills, and improvement suggestions."
        }, {
          role: "user",
          content: `Resume: ${resume}\n\nJob Description: ${jobDescription}`
        }],
        temperature: 0.7,
      });

      const analysis = completion.choices[0].message.content || {};
       return NextResponse.json(analysis);
    } 
    catch(error){
       return NextResponse.json(
       { error : "Analysis failed"},
       {status:300}
       )
    }

}