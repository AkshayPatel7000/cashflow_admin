import { MessageCircle, Save } from "lucide-react";
function AiPrompt({ aiPrompt, setAiPrompt, saveAIPrompt, loading }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 sm:p-6">
      <div className="flex items-center gap-2 mb-4 sm:mb-6">
        <MessageCircle className="w-5 h-5 text-purple-600" />
        <h2 className="text-lg sm:text-xl font-semibold">
          AI Chat Prompt Configuration
        </h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            AI System Prompt
          </label>
          <textarea
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
            rows={8}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
            placeholder="Enter the system prompt for AI chat functionality..."
          />
        </div>

        <button
          onClick={saveAIPrompt}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 text-sm"
        >
          <Save className="w-4 h-4" />
          Save AI Prompt
        </button>
      </div>
    </div>
  );
}

export default AiPrompt;
