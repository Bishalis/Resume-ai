import { NextResponse } from "next/server";
import OpenAI from "openai";



const client = new OpenAI({
    apiKey : process.env.OPENAI_API_KEY
});

export async function POST(req:Request){
    try{
       const{resume,jobDescription} = await req.json();
       const prompt = `
       You are an expert ATS resume evaluator and technical recruiter.
       
       Your task is to evaluate the candidate's resume ONLY against the provided job description using strict evidence-based analysis.
       
       CRITICAL RULES:
       - Do NOT assume the candidate knows a skill unless it is explicitly mentioned in the resume.
       - Do NOT give credit for implied experience.
       - Do NOT hallucinate missing or existing skills.
       - Be highly accurate and conservative in scoring.
       - Prioritize hard requirements over soft skills.
       - Compare technologies, frameworks, tools, certifications, years of experience, education, and domain requirements carefully.
       - Ignore formatting quality unless it affects ATS readability.
       - Ignore spelling/grammar unless severe.
       - Do NOT inflate scores.
       - If important required technologies are missing, reduce the score significantly.
       - If the resume matches only partially, reflect that honestly.
       
       SCORING METHODOLOGY:
       
       Calculate the score based on:
       1. Required technical skills match
       2. Required tools/frameworks match
       3. Relevant work experience
       4. Relevant projects
       5. Education/certifications
       6. Industry/domain relevance
       7. Seniority/years of experience alignment
       
       SCORING GUIDE:
       - 90–100 = Excellent match with nearly all required qualifications
       - 75–89 = Strong match with minor gaps
       - 60–74 = Moderate match with noticeable missing requirements
       - 40–59 = Weak match with major gaps
       - 0–39 = Poor match with very limited alignment
       
       MISSING SKILLS RULES:
       - Include ONLY explicitly required hard skills/tools/technologies from the job description.
       - Do NOT include soft skills.
       - Do NOT include vague terms like "communication" or "teamwork".
       - Do NOT include skills that are partially present under different names unless clearly equivalent.
       - Avoid duplicates.
       - Keep skill names concise.
       
       SUGGESTIONS RULES:
       - Suggestions must be specific and actionable.
       - Tailor suggestions to the actual resume content.
       - Focus on improving ATS performance and recruiter impact.
       - Suggest adding measurable achievements, relevant keywords, missing projects, certifications, technologies, or stronger bullet points.
       - Do NOT suggest fake experience.
       - Minimum 3 suggestions.
       
       IMPORTANT:
       - Return ONLY valid JSON.
       - No markdown.
       - No explanations outside JSON.
       - No trailing commas.
       - Ensure the JSON can be parsed directly.
       
       REQUIRED OUTPUT FORMAT:
       
       {
         "matchScore": number,
         "missingSkills": [
           "Skill 1",
           "Skill 2"
         ],
         "suggestions": [
           "Specific improvement suggestion",
           "Specific improvement suggestion",
           "Specific improvement suggestion"
         ]
       }
       
       RESUME:
       """
       ${resume}
       """
       
       JOB DESCRIPTION:
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
      } catch {
        return NextResponse.json({ error: "Failed to parse analysis", raw: analysis }, { status: 500 });
      }
    } 
    catch {
       return NextResponse.json(
       { error : "Analysis failed"},
       {status:500}
       )
    }

}