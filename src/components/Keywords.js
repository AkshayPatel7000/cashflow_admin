import { CreditCard, EyeOff, Minus, Plus, Save, Trash2 } from "lucide-react";
function Keywords({
  creditKeywords,
  debitKeywords,
  ignoreKeywords,
  newKeyword,
  setNewKeyword,
  addKeyword,
  removeKeyword,
  saveKeywords,
  loading,
}) {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Credit Keywords */}
      <div className="bg-white rounded-lg shadow p-4 sm:p-6">
        <div className="flex items-center gap-2 mb-4">
          <CreditCard className="w-5 h-5 text-green-600" />
          <h2 className="text-lg sm:text-xl font-semibold">Credit Keywords</h2>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 mb-4">
          <input
            type="text"
            value={newKeyword.credit}
            onChange={(e) =>
              setNewKeyword({ ...newKeyword, credit: e.target.value })
            }
            placeholder="Add new credit keyword"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
            onKeyPress={(e) => e.key === "Enter" && addKeyword("credit")}
          />
          <button
            onClick={() => addKeyword("credit")}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
          >
            <Plus className="w-4 h-4" />
            Add
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {creditKeywords.map((keyword, index) => (
            <span
              key={index}
              className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
            >
              {keyword}
              <button
                onClick={() => removeKeyword("credit", index)}
                className="text-green-600 hover:text-green-800"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>

        <button
          onClick={() => saveKeywords("credit", creditKeywords)}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 text-sm"
        >
          <Save className="w-4 h-4" />
          Save Credit Keywords
        </button>
      </div>

      {/* Debit Keywords */}
      <div className="bg-white rounded-lg shadow p-4 sm:p-6">
        <div className="flex items-center gap-2 mb-4">
          <Minus className="w-5 h-5 text-red-600" />
          <h2 className="text-lg sm:text-xl font-semibold">Debit Keywords</h2>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 mb-4">
          <input
            type="text"
            value={newKeyword.debit}
            onChange={(e) =>
              setNewKeyword({ ...newKeyword, debit: e.target.value })
            }
            placeholder="Add new debit keyword"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
            onKeyPress={(e) => e.key === "Enter" && addKeyword("debit")}
          />
          <button
            onClick={() => addKeyword("debit")}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"
          >
            <Plus className="w-4 h-4" />
            Add
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {debitKeywords.map((keyword, index) => (
            <span
              key={index}
              className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm"
            >
              {keyword}
              <button
                onClick={() => removeKeyword("debit", index)}
                className="text-red-600 hover:text-red-800"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>

        <button
          onClick={() => saveKeywords("debit", debitKeywords)}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 text-sm"
        >
          <Save className="w-4 h-4" />
          Save Debit Keywords
        </button>
      </div>

      {/* Ignore Keywords */}
      <div className="bg-white rounded-lg shadow p-4 sm:p-6">
        <div className="flex items-center gap-2 mb-4">
          <EyeOff className="w-5 h-5 text-gray-600" />
          <h2 className="text-lg sm:text-xl font-semibold">Ignore Keywords</h2>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 mb-4">
          <input
            type="text"
            value={newKeyword.ignore}
            onChange={(e) =>
              setNewKeyword({ ...newKeyword, ignore: e.target.value })
            }
            placeholder="Add new ignore keyword"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
            onKeyPress={(e) => e.key === "Enter" && addKeyword("ignore")}
          />
          <button
            onClick={() => addKeyword("ignore")}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 text-sm"
          >
            <Plus className="w-4 h-4" />
            Add
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {ignoreKeywords.map((keyword, index) => (
            <span
              key={index}
              className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
            >
              {keyword}
              <button
                onClick={() => removeKeyword("ignore", index)}
                className="text-gray-600 hover:text-gray-800"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>

        <button
          onClick={() => saveKeywords("ignore", ignoreKeywords)}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 text-sm"
        >
          <Save className="w-4 h-4" />
          Save Ignore Keywords
        </button>
      </div>
    </div>
  );
}

export default Keywords;
