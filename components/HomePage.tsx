import HeroSection from "@/components/common/HeroSection";
import HeroSectionImage from "./common/HeroSectionImage";

export default function HomePage() {
  return (
    <>
      <div className="px-6 py-20 bg-gray-50 	text-gray-800 min-h-[80vh]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-20 items-center">
            {/* left Section */}
            <HeroSection
              name="firstSection"
              heading=" AI-Powered Resume Insights, Tailored for Your Dream Job "
              paragraph="Instantly analyze your resume against any job description. Discover skill gaps, get personalized suggestions, and improve your chances of getting hired — powered by GPT-3-turbo."
            />
            <HeroSectionImage imageUrl="/assets/hero.png" />
          </div>
        </div>
      </div>

      <div className="px-6 py-20 bg-gray-50 	text-gray-800 min-h-[80vh]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-20 items-center">
            {/* left Section */}

            <HeroSectionImage imageUrl="/assets/ATS.webp" />

            <HeroSection
              name="firstSection"
              heading=" Get Your Resume Past the ATS"
              paragraph="Did you know that over 95% of large companies use an Applicant Tracking System (ATS) to screen resumes? Before a human recruiter ever sees your application, it's first read and scored by this software. The ATS scans for specific keywords, job titles, and formatting, automatically rejecting any resume that doesn't meet its strict criteria. This means even the most qualified candidates can be filtered out. Our tool simulates how a leading ATS analyses your resume, giving you the power to optimize it for the job you want. We'll help you identify what's missing so you can get past the bots and into the hands of a hiring manager."
            />
          </div>
        </div>
      </div>
      <div className="px-6 py-20 bg-gray-50 	text-gray-800 min-h-[80vh]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-20 items-center">
            {/* left Section */}

            <HeroSection
              name="firstSection"
              heading="Wondering why you're not getting interviews?"
              paragraph="Your resume might not be the right match for what recruiters want. Our AI technology compares your resume to the job description, giving you a clear match rate. Follow your report's suggestions to tailor your resume and show you're the ideal candidate."
            />

            <HeroSectionImage imageUrl="/assets/job.png" />
          </div>
        </div>
      </div>
    </>
  );
}
