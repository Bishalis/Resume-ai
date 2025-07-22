import { useState, useRef } from "react";

export default function ResumeUpload({ onUpload }: { onUpload: (text: string) => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploaded = e.target.files?.[0];
    if (!uploaded) return;

    // Validate file type
    if (uploaded.type !== "application/pdf") {
      setError("Please upload a PDF file");
      return;
    }

    // Validate file size (5MB limit)
    if (uploaded.size > 5 * 1024 * 1024) {
      setError("File size must be less than 5MB");
      return;
    }

    setError(null);
    setFile(uploaded);
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", uploaded);

      const res = await fetch("/api/parse-pdf", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to parse PDF");
      }

      const data = await res.json();
      onUpload(data.text);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full max-w-md space-y-4 m-10 ">
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        accept=".pdf"
        onChange={handleFileChange}
        className="hidden"
      />
      
      {/* Custom styled upload area */}
      <div
        onClick={triggerFileSelect}
        className={`
          p-6 border-2 border-dashed rounded-lg cursor-pointer transition-all
          flex flex-col items-center justify-center space-y-3
          ${
            error
              ? "border-red-500 bg-red-50"
              : file
              ? "border-green-500 bg-green-50"
              : "border-gray-300 hover:border-blue-500 hover:bg-blue-50"
          }
          ${isLoading ? "opacity-70 cursor-not-allowed" : ""}
        `}
      >
        {isLoading ? (
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500" />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-10 w-10 ${
              error ? "text-red-500" : file ? "text-green-500" : "text-blue-500"
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
            />
          </svg>
        )}

        <p className="text-center">
          {isLoading ? (
            <span className="text-gray-600">Processing PDF...</span>
          ) : error ? (
            <span className="text-red-600">{error}</span>
          ) : file ? (
            <span className="text-green-700 font-medium">{file.name}</span>
          ) : (
            <span className="text-gray-700">
              <span className="font-medium text-blue-600">Click to upload</span> or drag and drop
            </span>
          )}
        </p>

        <p className="text-sm text-gray-500">
          {!isLoading && !error && (file ? "Click to change file" : "PDF only (max 5MB)")}
        </p>
      </div>

      {/* Status indicators */}
      {file && !isLoading && !error && (
        <div className="flex items-center justify-center space-x-2 text-green-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <span>Ready for analysis</span>
        </div>
      )}
    </div>
  );
}