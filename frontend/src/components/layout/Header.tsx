import type { AISettings } from "../../types";

interface Props {
  aiSettings: AISettings;
  onSettingsClick: () => void;
}

const providerLabel = {
  claude: "🤖 Claude",
  groq: "⚡ Groq",
  openai: "🟢 OpenAI",
};

function Header({ aiSettings, onSettingsClick }: Props) {
  return (
    <div className="bg-blue-900 text-white px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="bg-red-500 rounded-lg w-9 h-9 flex items-center justify-center text-lg">
          🧪
        </div>
        <div>
          <h1 className="font-bold text-lg">TestCase AI Generator</h1>
          <p className="text-xs opacity-70">AI-Powered Test Case Generator</p>
        </div>
      </div>
      <button
        onClick={onSettingsClick}
        className="flex items-center gap-2 bg-white bg-opacity-10 hover:bg-opacity-20 px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
      >
        <span>⚙️</span>
        <span className="text-gray-800">
          {providerLabel[aiSettings.provider]}
        </span>
      </button>
    </div>
  );
}

export default Header;
