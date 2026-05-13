import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
    apiKey : process.env.OPENAI_API_KEY
});
export async function POST(req:Request){
    try{
        const {resume,jobDescription} = await req.json();
        const resumeTemplatePrompt = `
        You are an elite ATS-optimized resume writer and recruiter with deep knowledge of modern hiring systems.
        
        Your task is to rewrite and enhance the candidate's resume to strongly align with the provided job description while remaining truthful to the candidate’s real experience and qualifications.
        
        IMPORTANT RULES:
        - Keep ALL existing candidate information unless clearly irrelevant.
        - Include full contact information if available:
          - Full Name
          - Phone Number
          - Email
          - LinkedIn
          - Portfolio/GitHub
          - Location
        - Maximize ATS compatibility.
        - Naturally integrate keywords and technologies from the job description.
        - Use strong action verbs and measurable achievements.
        - Avoid fake experience, fake metrics, or unrealistic claims.
        - Avoid generic fluff and buzzwords.
        - Keep formatting clean, modern, and professional.
        - Output ONLY valid HTML.
        - Do NOT include markdown fences like \`\`\`.
        - Use semantic HTML with proper spacing.
        - Make the resume visually polished but minimal enough for PDF export.
        
        STYLE REQUIREMENTS:
        - Use only these HTML tags:
          <div>, <h1>, <h2>, <p>, <ul>, <li>, <strong>, <span>, <hr>
        - Keep sections clearly separated.
        - Use concise bullet points.
        - Prioritize readability and ATS parsing.
        - Ensure important keywords appear naturally throughout the resume.
        
        RESUME STRUCTURE:
        
        <div>
          <h1>Full Name</h1>
        
          <p>
            <strong>Email:</strong> email@example.com |
            <strong>Phone:</strong> +61 XXX XXX XXX |
            <strong>Location:</strong> City, Country |
            <strong>LinkedIn:</strong> linkedin.com/in/... |
            <strong>Portfolio:</strong> portfolio.com
          </p>
        
          <hr />
        
          <h2>Professional Summary</h2>
          <p>
            3–5 lines tailored specifically to the target role.
            Mention years of experience, strongest technologies,
            industry expertise, and key achievements.
          </p>
        
          <h2>Core Skills</h2>
          <ul>
            <li>Technical Skill</li>
            <li>Framework</li>
            <li>Soft Skill</li>
            <li>Industry Skill</li>
          </ul>
        
          <h2>Professional Experience</h2>
        
          <p>
            <strong>Job Title</strong> — Company Name | YYYY – YYYY
          </p>
        
          <ul>
            <li>Achievement with measurable impact</li>
            <li>Relevant responsibility tailored to job description</li>
            <li>Include tools, frameworks, and technologies</li>
          </ul>
        
          <p>
            <strong>Job Title</strong> — Company Name | YYYY – YYYY
          </p>
        
          <ul>
            <li>Achievement</li>
            <li>Achievement</li>
          </ul>
        
          <h2>Projects</h2>
        
          <p>
            <strong>Project Name</strong>
          </p>
        
          <ul>
            <li>What the project does</li>
            <li>Technologies used</li>
            <li>Business or technical impact</li>
          </ul>
        
          <h2>Education</h2>
        
          <p>
            <strong>Degree / Qualification</strong> — Institution Name | YYYY
          </p>
        
          <h2>Certifications</h2>
        
          <ul>
            <li>Certification Name</li>
          </ul>
        </div>
        
        ATS OPTIMIZATION INSTRUCTIONS:
        - Extract and incorporate important keywords from the job description.
        - Include relevant technical skills, methodologies, tools, and frameworks.
        - Ensure skills match industry-standard terminology.
        - Use reverse chronological order.
        - Keep bullet points achievement-focused.
        - Avoid tables, columns, icons, emojis, images, progress bars, or complex layouts because ATS systems may fail to parse them.
        - Ensure all dates, titles, and headings are standardized.
        - Use clean professional wording suitable for both ATS parsing and recruiter readability.
        
        Rewrite and optimize the resume below.
        
        ---
        ORIGINAL RESUME:
        """
        ${resume}
        """
        
        ---
        TARGET JOB DESCRIPTION:
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
    
          
          const sampleResume = completion.choices[0].message.content || "";
          return NextResponse.json({htmlContent: sampleResume});
        } 
        catch {
           return NextResponse.json(
           { error : "Analysis failed"},
           {status:500}
           )
        }
}