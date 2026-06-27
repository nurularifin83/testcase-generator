import { useState } from "react";

function App() {
  const [userStory, setUserStory] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [moduleName, setModuleName] = useState("");
  const [userRoles, setUserRoles] = useState("");
  const [testingType, setTestingType] = useState("Functional");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-900 text-white px-6 py-4 flex items-center gap-3">
        <div className="bg-red-500 rounded-lg w-9 h-9 flex items-center justify-center text-lg">
          🧪
        </div>
        <div>
          <h1 className="font-bold text-lg">TestCase AI Generator</h1>
          <p className="text-xs opacity-70">AI-Powered Test Case Generator</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-6">
            Generate Test Cases
          </h2>

          {/* Module Name */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-500 mb-1">
              MODULE NAME (optional)
            </label>
            <input
              type="text"
              value={moduleName}
              onChange={(e) => setModuleName(e.target.value)}
              placeholder="e.g. Login, Create Product, Approval Flow"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-900"
            />
          </div>

          {/* User Story */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-500 mb-1">
              USER STORY / FEATURE DESCRIPTION
              <span className="text-red-500 ml-1">*</span>
            </label>
            <textarea
              value={userStory}
              onChange={(e) => setUserStory(e.target.value)}
              placeholder={`Example:\nFeature: Login Page\n\nUser can login with email and password.\nIf wrong credentials, show error message.\nIf success, redirect to dashboard.`}
              rows={6}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-900 resize-y"
            />
          </div>

          {/* Mockup Upload */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-500 mb-1">
              UPLOAD MOCKUP / SCREENSHOT
              <span className="text-red-500 ml-1">*</span>
            </label>
            <div
              onClick={() => document.getElementById("fileInput")?.click()}
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-900 transition-colors"
            >
              {image ? (
                <div>
                  <p className="text-green-600 font-semibold text-sm">
                    ✅ {image.name}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">Click to change</p>
                </div>
              ) : (
                <div>
                  <p className="text-3xl mb-2">🖼️</p>
                  <p className="text-sm font-semibold text-gray-400">
                    Click to upload mockup
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    PNG, JPG supported
                  </p>
                </div>
              )}
            </div>
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
            />
          </div>

          {/* User Roles */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-500 mb-1">
              USER ROLES (optional)
            </label>
            <input
              type="text"
              value={userRoles}
              onChange={(e) => setUserRoles(e.target.value)}
              placeholder="e.g. Admin, User, Guest"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-900"
            />
          </div>

          {/* Testing Type */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-500 mb-2">
              TESTING TYPE (optional)
            </label>
            <div className="flex gap-3">
              {["Functional", "API", "Security", "Performance"].map((type) => (
                <button
                  key={type}
                  onClick={() => setTestingType(type)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-colors ${
                    testingType === type
                      ? "bg-blue-900 text-white border-blue-900"
                      : "bg-white text-gray-500 border-gray-300 hover:border-blue-900"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Validation Note */}
          <p className="text-xs text-gray-400 mb-4">
            <span className="text-red-500">*</span> At least one of User Story
            or Mockup is required
          </p>

          {/* Generate Button */}
          <button className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-lg text-sm transition-colors">
            ✨ Generate Test Cases
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
