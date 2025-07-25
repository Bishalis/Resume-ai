"use client";

import { useState } from "react";
import TextAreaForm from "@/components/TextAreaForm";
import AnalysisResult from "@/components/AnalysisResult";
import ResumeUpload from "@/components/ResumeUpload";
import ExportPDF from "@/components/ExportPDF";
import PrimaryButton from "@/components/common/PrimaryButton";

export default function AnalyzePage() {
  const [resume, setResume] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [isFile, setIsFile] = useState(true);
  const [result, setResult] = useState<null | {
    matchScore: number;
    missingSkills: string[];
    suggestions: string[];
  }>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async (resumeText: string, jobDescText: string) => {
    if (!resumeText || !jobDescText) {
      alert("Please provide both resume and job description");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resume: resumeText,
          jobDescription: jobDescText,
        }),
      });
      const data = await response.json();
      setResult(data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left side - Input forms */}
          <div className="w-full lg:w-1/2 bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
              AI Resume Analysis
            </h1>
    
            <div className="space-y-4 ">
              {isFile ? (
                <div className="space-y-3">
                  <ResumeUpload onUpload={setResume} />
                </div>
              ) : (
                <TextAreaForm
                  placeholder="Paste your resume text here..."
                  onSubmit={(text) => setResume(text)}
                  buttonText="Next: Add Job Description"
                />
              )}

              <div className="relative flex items-center py-2 ">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="flex-shrink mx-4 text-gray-500 text-sm">
                  or
                </span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>
              <div className="w-full flex justify-center">
                <button
                  className="bg-white text-blue-600 cursor-pointer text-center items-center hover:"
                  onClick={() => setIsFile(!isFile)}
                >
                  {isFile ? "Paste your text resume" : "Upload a file resume"}
                </button>
              </div>

              {resume && (
                <TextAreaForm
                  placeholder="Paste the job description here..."
                  onSubmit={(text) => {
                    setJobDesc(text);
                    handleAnalyze(resume, text);
                  }}
                  buttonText={loading ? "Analyzing..." : "Analyze"}
                  loading={loading}
                />
              )}
            </div>

          </div>

          {/* Right side - Results */}
          <div className="w-full lg:w-1/2">
            {!loading && result && (
              <div className="bg-white p-6 rounded-lg shadow-md h-full">
                <AnalysisResult
                  matchScore={result.matchScore}
                  missingSkills={result.missingSkills || []}
                  suggestions={result.suggestions || []}
                />
                <div className="text-center pt-2.5">
                  <ExportPDF />
                  <p className="text-sm mt-2 text-center text-gray-500">
                    Note that this is an AI Generated resume, remember to modify
                    it.
                  </p>
                </div>
              </div>
            )}

            {/* Empty state */}
            {!result && (
              <>
                <div className="bg-white p-6 rounded-lg shadow-md h-full flex items-center justify-center flex-col">
                  <div className="text-center text-gray-500">
                    <p className="text-lg">
                      Your analysis results will appear here
                    </p>
                    <p className="text-sm mt-2">
                      Paste both your resume and job description to begin
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
