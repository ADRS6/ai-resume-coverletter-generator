import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    linkedIn: "",
    github: "",
    address: "",
    education: "",
    skills: "",
    projects: "",
    experience: "",
    achievement: "",
    jobRole: "",
    goals: "",
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("resumeData", JSON.stringify(formData));
    navigate("/result");
  };

  return (
    <div className="max-w-2xl mx-auto p-5 ">
      <h1 className="text-3xl font-bold mb-4 text-center text-blue-700">AI Resume & Cover Letter Generator</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 shadow rounded-xl">
        {["name","phone", "email","linkedIn","github", "address", "education", "skills","projects", "experience","achievement", "jobRole", "goals"].map((field) => (
          <div key={field}>
            <label className="block mb-1 capitalize">{field.replace(/([A-Z])/g, ' $1')}:</label>
            <input
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
        ))}
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition">
          Generate Resume & Cover Letter
        </button>
      </form>
    </div>
  );
};

export default Home;
