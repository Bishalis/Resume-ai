'use client';

import { useState } from 'react';
import TextAreaForm from '@/components/TextAreaForm';
import AnalysisResult from '@/components/AnalysisResult';
// import MockResult from '@/components/common/mockResult';

export default function AnalyzePage() {
  const [resume, setResume] = useState('');
  const [jobDesc, setJobDesc] = useState('');
  const [result, setResult] = useState<null | {
    matchScore: number;
    missingSkills: string[];
    suggestions: string[];
  }>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
      try {
        const response = await fetch('/api/analyze',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
              },
              body : JSON.stringify({resume, jobDescription:jobDesc})
        })
        const data = await response.json();
        setResult(data)
      } finally{
         setLoading(false);
      }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left side - Input forms */}
          <div className="w-full lg:w-1/2 bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center ">AI Resume Analysis</h1>
            
            <div className="space-y-6">
              <TextAreaForm
                placeholder="Paste your resume here..."
                onSubmit={(text) => setResume(text)}
                buttonText="Next: Add Job Description"
              />

              {resume && (
                <TextAreaForm
                  placeholder="Paste the job description here..."
                  onSubmit={(text) => {
                    setJobDesc(text);
                    handleAnalyze();
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
                <AnalysisResult {...result} />
              </div>
            )}
            
            {/* Empty state */}
            {!result && (
              <div className="bg-white p-6 rounded-lg shadow-md h-full flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <p className="text-lg">Your analysis results will appear here</p>
                  <p className="text-sm mt-2">Paste both your resume and job description to begin</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}