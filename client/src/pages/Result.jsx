import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

const Result = () => {
  const [data, setData] = useState({});
  const [resume, setResume] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userInput = JSON.parse(localStorage.getItem("resumeData"));
    setData(userInput);
    generateOutput(userInput);
  }, []);

  const generateOutput = async (userInput) => {
    try {
      const response = await fetch("http://localhost:5000/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userInput),
      });
      const result = await response.json();
      setResume(result.resume);
      setCoverLetter(result.coverLetter);
    } catch (error) {
      console.error("Error fetching result:", error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-50 py-10 px-4">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight mb-2">Your AI-Powered Career Documents</h1>
          <p className="text-gray-500 text-lg">Professionally tailored Resume and Cover Letter — just for you.</p>
        </div>

        {/* Resume Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 transition hover:shadow-xl border-t-4 border-green-600">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-green-700">Generated Resume</h2>
            {resume && (
              <button
                onClick={() => copyToClipboard(resume)}
                className="bg-green-600 text-white px-4 py-1.5 rounded-lg hover:bg-green-700 transition shadow-sm"
              >
                Copy
              </button>
            )}
          </div>

          <div className="prose prose-lg max-w-none prose-green text-gray-900 bg-gray-50 p-6 rounded-md border border-gray-200 shadow-inner">
            {loading ? "Generating your resume..." : <ReactMarkdown>{resume}</ReactMarkdown>}
          </div>
        </div>

        {/* Cover Letter Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 transition hover:shadow-xl border-t-4 border-blue-600">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-blue-700">Generated Cover Letter</h2>
            {coverLetter && (
              <button
                onClick={() => copyToClipboard(coverLetter)}
                className="bg-blue-600 text-white px-4 py-1.5 rounded-lg hover:bg-blue-700 transition shadow-sm"
              >
                Copy
              </button>
            )}
          </div>

          <div className="prose prose-lg max-w-none prose-blue text-gray-900 bg-gray-50 p-6 rounded-md border border-gray-200 shadow-inner">
            {loading ? "Generating your cover letter..." : <ReactMarkdown>{coverLetter}</ReactMarkdown>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
