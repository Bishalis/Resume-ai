export default function HeroSection() {
  return (
    <div className="px-6 py-20 bg-gray-50 	text-gray-800 min-h-[80vh]">
    <div className="text-4xl font-extrabold text-blue-700">CWD</div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-20 items-center">
      {/* Left Section */}
      <div>
        <h1 className="font-extrabold  leading-snug text-4xl text-blue-700">
        AI-Powered Resume Insights, Tailored for Your Dream Job  </h1>

        <p className="my-8 text-lg leading-relaxed text-gray-600 mt-4">
        Instantly analyze your resume against any job description. Discover skill gaps, get personalized suggestions, and improve your chances of getting hired — powered by GPT-4.       
         </p>

        <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg">
          Get Started
        </button>
      </div>

      {/* Right Section */}
      <div className="flex justify-center items-center">
        <img
          src="assets/heroImg.png"
          alt="Hero"
          className="rounded-md w-full max-w-md md:max-w-full h-auto shadow-lg"
        />
      </div>
    </div>
  </div>
  );
}