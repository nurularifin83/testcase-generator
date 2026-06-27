import { useState } from "react";
import type { AISettings } from "../../types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (settings: AISettings) => void;
  currentSettings: AISettings;
}

function SettingsModal({ isOpen, onClose, onSave, currentSettings }: Props) {
  const [provider, setProvider] = useState(currentSettings.provider);
  const [apiKey, setApiKey] = useState(currentSettings.apiKey);
  const [showKey, setShowKey] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    if (!apiKey) {
      alert("Please enter your API key");
      return;
    }
    onSave({ provider, apiKey });
    onClose();
  };

  const providerInfo = {
    claude: {
      name: "Claude (Anthropic)",
      url: "https://console.anthropic.com",
      free: false,
      placeholder: "sk-ant-xxxxxxxxxx",
    },
    groq: {
      name: "Groq (Free)",
      url: "https://console.groq.com",
      free: true,
      placeholder: "gsk_xxxxxxxxxx",
    },
    openai: {
      name: "OpenAI",
      url: "https://platform.openai.com",
      free: false,
      placeholder: "sk-xxxxxxxxxx",
    },
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b">
          <h2 className="text-lg font-bold text-gray-800">⚙️ AI Settings</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl font-bold"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-5">
          {/* Provider Selection */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-500 mb-3">
              SELECT AI PROVIDER
            </label>
            <div className="flex flex-col gap-2">
              {(
                Object.keys(providerInfo) as Array<keyof typeof providerInfo>
              ).map((key) => (
                <button
                  key={key}
                  onClick={() => setProvider(key)}
                  className={`flex items-center justify-between p-3 rounded-lg border-2 transition-colors ${
                    provider === key
                      ? "border-blue-900 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        provider === key ? "border-blue-900" : "border-gray-300"
                      }`}
                    >
                      {provider === key && (
                        <div className="w-2 h-2 rounded-full bg-blue-900" />
                      )}
                    </div>
                    <span className="text-sm font-semibold text-gray-700">
                      {providerInfo[key].name}
                    </span>
                  </div>
                  {providerInfo[key].free && (
                    <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                      FREE
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* API Key Input */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-1">
              <label className="text-sm font-semibold text-gray-500">
                API KEY
              </label>

              <a
                href={providerInfo[provider].url}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-blue-600 hover:underline"
              >
                Get API key
              </a>
            </div>
            <div className="relative">
              <input
                type={showKey ? "text" : "password"}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder={providerInfo[provider].placeholder}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-900 pr-16"
              />
              <button
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3 top-2 text-xs text-gray-400 hover:text-gray-600"
              >
                {showKey ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Privacy Note */}
          <div className="bg-gray-50 rounded-lg p-3 mb-5">
            <p className="text-xs text-gray-500">
              🔒 Your API key is stored locally in your browser only. We never
              send your key to our servers.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-2 border border-gray-300 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex-1 py-2 bg-blue-900 text-white rounded-lg text-sm font-semibold hover:bg-blue-800"
            >
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsModal;
