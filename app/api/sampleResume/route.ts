import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
    apiKey : process.env.OPENAI_API_KEY
});
export async function POST(req:Request){
    try{
        const {resume,jobDescription} = await req.json();
        const resumeTemplatePrompt = `
        You are a professional resume writer. Rewrite the resume to better match the job description. Your output must be styled HTML using <h2>, <ul>, <li>, <p>, and <strong> tags — clean and minimal, suitable for PDF export.
        
        Use this structure:
        
        <h2>Summary</h2>
        <p>...</p>
        
        <h2>Key Skills</h2>
        <ul>
          <li>Skill 1</li>
          <li>Skill 2</li>
        </ul>
        
        <h2>Experience</h2>
        <p><strong>Job Title</strong> – Company Name (YYYY–YYYY)</p>
        <ul>
          <li>Achievement 1</li>
          <li>Achievement 2</li>
        </ul>
        
        <h2>Education</h2>
        <p><strong>Degree</strong> – Institution (YYYY)</p>
        
        Avoid generic fluff. Use details from the original resume, but tailor to match the job description.
        
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
              { role: 'user', content: resumeTemplatePrompt },
            ],
          });
    
          console.log(completion.choices[0].message.content);
          const sampleResume = completion.choices[0].message.content || "";
          return NextResponse.json({htmlContent: sampleResume});
        } 
        catch(error){
           return NextResponse.json(
           { error : "Analysis failed"},
           {status:500}
           )
        }
}