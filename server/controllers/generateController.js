// const { generateText } = require("../services/openaiService");
const { generateText } = require("../services/geminiService");

const generateContent = async (req, res) => {
  const { name, phone, email, linkedIn, github, address,education, skills, projects, experience, achievement, jobRole, goals } = req.body;

  if (!name || !phone || !email || !linkedIn || !github || !address || !education || !skills || !projects || !experience || !achievement || !jobRole || !goals) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const resumePrompt = `
    Generate a professional RESUME for:
    Name: ${name}
    Email: ${email}
    LinkedIn: ${linkedIn}
    GitHUb: ${github}
    Phone: ${phone}
    Address: ${address}
    Education: ${education}
    Skills: ${skills}
    Project: ${projects}
    Experience: ${experience}
    Achievement: ${achievement}
    Job Role: ${jobRole}
    Career Goals: ${goals}
    Generate a professional, ATS-friendly, and eye-catching resume for a [Your Job Title] role.
    The resume should be concise (1 page), highlight key skills, achievements, work experience, and
    education relevant to [Industry/Job Type]. Use a clean, modern format with bullet points, action 
    verbs, and quantifiable results. Avoid generic descriptions. Optimize it for top job market standards.
    `;

    const coverLetterPrompt = `
    Write a COVER LETTER for a job application:
    Name: ${name}
    Role: ${jobRole}
    Email: ${email}
    LinkedIn: ${linkedIn}
    GitHUb: ${github}
    Education: ${education}
    Skills: ${skills}
    Experience: ${experience}
    Goals: ${goals}
    Write a concise, compelling, and job-specific cover letter for a [Job role] at [Company Name].
    The tone should be professional yet enthusiastic. It should reflect my passion for the role, key skills,
    and how my background aligns with the company's goals. Mention 1 or 2 quantifiable achievements and include a
    strong call-to-action. Limit to 3 or 4 short paragraphs.
    `;

    const resume = await generateText(resumePrompt);
    const coverLetter = await generateText(coverLetterPrompt);

    res.status(200).json({ resume, coverLetter });

  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "OpenAI API failed" });
  }
};


module.exports = { generateContent };
