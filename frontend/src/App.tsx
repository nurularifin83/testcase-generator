import { useState } from "react";
import type { AISettings } from "./types";
import Header from "./components/layout/Header";
import InputForm from "./components/form/InputForm";
import TestCaseTable from "./components/results/TestCaseTable";
import SettingsModal from "./components/modal/SettingsModal";
import { useGenerateTestCases } from "./hooks/useGenerateTestCases";

function App() {
  const [userStory, setUserStory] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [moduleName, setModuleName] = useState("");
  const [userRoles, setUserRoles] = useState("");
  const [testingType, setTestingType] = useState("Functional");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [aiSettings, setAiSettings] = useState<AISettings>({
    provider: "groq",
    apiKey: localStorage.getItem("apiKey") || "",
  });

  const { generate, loading, error, testCases } = useGenerateTestCases();

  const handleSaveSettings = (settings: AISettings) => {
    setAiSettings(settings);
    localStorage.setItem("provider", settings.provider);
    localStorage.setItem("apiKey", settings.apiKey);
  };

  const handleGenerate = () => {
    generate(aiSettings, userStory, moduleName, userRoles, testingType, image);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        aiSettings={aiSettings}
        onSettingsClick={() => setIsSettingsOpen(true)}
      />
      <div className="max-w-3xl mx-auto p-6">
        <InputForm
          userStory={userStory}
          setUserStory={setUserStory}
          image={image}
          setImage={setImage}
          moduleName={moduleName}
          setModuleName={setModuleName}
          userRoles={userRoles}
          setUserRoles={setUserRoles}
          testingType={testingType}
          setTestingType={setTestingType}
          loading={loading}
          error={error}
          aiSettings={aiSettings}
          onSettingsClick={() => setIsSettingsOpen(true)}
          onGenerate={handleGenerate}
        />
        <TestCaseTable testCases={testCases} />
      </div>
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onSave={handleSaveSettings}
        currentSettings={aiSettings}
      />
    </div>
  );
}

export default App;
