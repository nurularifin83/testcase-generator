import type { AISettings } from "../../types";

interface Props {
  userStory: string;
  setUserStory: (v: string) => void;
  image: File | null;
  setImage: (v: File | null) => void;
  moduleName: string;
  setModuleName: (v: string) => void;
  userRoles: string;
  setUserRoles: (v: string) => void;
  testingType: string;
  setTestingType: (v: string) => void;
  loading: boolean;
  error: string;
  aiSettings: AISettings;
  onSettingsClick: () => void;
  onGenerate: () => void;
}

function InputForm({
  userStory,
  setUserStory,
  image,
  setImage,
  moduleName,
  setModuleName,
  userRoles,
  setUserRoles,
  testingType,
  setTestingType,
  loading,
  error,
  aiSettings,
  onSettingsClick,
  onGenerate,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-bold text-gray-800 mb-6">
        Generate Test Cases
      </h2>

      {/* API Key Warning */}
      {!aiSettings.apiKey && (
        <div
          onClick={onSettingsClick}
          className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4 cursor-pointer hover:bg-yellow-100"
        >
          <p className="text-sm text-yellow-700 font-semibold">
            ⚠️ No API key set. Click here to configure your AI settings.
          </p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
          <p className="text-sm text-red-700 font-semibold">⚠️ {error}</p>
        </div>
      )}

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
              <p className="text-xs text-gray-400 mt-1">PNG, JPG supported</p>
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
        <span className="text-red-500">*</span> At least one of User Story or
        Mockup is required
      </p>

      {/* Generate Button */}
      <button
        onClick={onGenerate}
        disabled={loading}
        className={`w-full font-bold py-3 rounded-lg text-sm transition-colors text-white ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-red-500 hover:bg-red-600"
        }`}
      >
        {loading ? "⏳ Generating..." : "✨ Generate Test Cases"}
      </button>
    </div>
  );
}

export default InputForm;
