type Props = {
    matchScore: number;
    missingSkills: string[];
    suggestions: string[];
  };
  
  export default function AnalysisResult({ matchScore, missingSkills, suggestions }: Props) {
    return (
      <div className="mt-10 bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-blue-700">Analysis Result</h2>
        <p className="mt-4 text-lg">Match Score: <span className="font-bold">{matchScore}%</span></p>
  
        <div className="mt-4">
          <h3 className="font-semibold">Missing Skills:</h3>
          <ul className="list-disc list-inside">
            {missingSkills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </div>
  
        <div className="mt-4">
          <h3 className="font-semibold">Suggestions:</h3>
          <ul className="list-disc list-inside">
            {suggestions.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
  