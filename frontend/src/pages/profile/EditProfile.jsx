import { useState } from "react";
import { uploadResume } from "../../api/uploadApi";

export default function EditProfile() {
  const [resumeFile, setResumeFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [resumeUrl, setResumeUrl] = useState("");

  const handleResumeChange = (e) => {
    setResumeFile(e.target.files[0]);
  };

  const handleResumeUpload = async () => {
    if (!resumeFile) {
      alert("Please select a resume file");
      return;
    }
    setUploading(true);
    try {
      const res = await uploadResume(resumeFile);
      const data = res.data;
      setResumeUrl(data.filePath);
      alert("Resume uploaded successfully!");
      // optionally call /users/profile PUT to save resume URL
    } catch (err) {
      console.error(err);
      alert("Failed to upload resume.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-24">
      <h1 className="text-3xl font-bold mb-6">Edit Profile</h1>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">
          Upload Resume (PDF/DOC)
        </label>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleResumeChange}
          className="block w-full text-sm text-slate-500"
        />
        <button
          onClick={handleResumeUpload}
          disabled={uploading}
          className="mt-3 bg-indigo-600 text-white px-6 py-2 rounded-full text-sm"
        >
          {uploading ? "Uploading..." : "Upload Resume"}
        </button>

        {resumeUrl && (
          <p className="mt-2 text-sm text-emerald-600">Uploaded: {resumeUrl}</p>
        )}
      </div>
    </div>
  );
}
