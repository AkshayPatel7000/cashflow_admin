import { Building2, Plus, Save, Trash2 } from "lucide-react";
function Bank({
  banks,
  newBank,
  setNewBank,
  addBank,
  removeBank,
  saveBanks,
  loading,
}) {
  return (
    <div className="bg-white rounded-lg shadow p-4 sm:p-6">
      <div className="flex items-center gap-2 mb-4 sm:mb-6">
        <Building2 className="w-5 h-5 text-blue-600" />
        <h2 className="text-lg sm:text-xl font-semibold">Bank Management</h2>
      </div>

      {/* Add New Bank */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <input
          type="text"
          placeholder="Bank Code (e.g., AU)"
          value={newBank.code}
          onChange={(e) => setNewBank({ ...newBank, code: e.target.value })}
          className="px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
        />
        <input
          type="text"
          placeholder="Icon Code"
          value={newBank.icon}
          onChange={(e) => setNewBank({ ...newBank, icon: e.target.value })}
          className="px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
        />
        <input
          type="text"
          placeholder="Bank Name"
          value={newBank.name}
          onChange={(e) => setNewBank({ ...newBank, name: e.target.value })}
          className="px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <button
          onClick={addBank}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
        >
          <Plus className="w-4 h-4" />
          Add Bank
        </button>
        <button
          onClick={saveBanks}
          disabled={loading}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 text-sm"
        >
          <Save className="w-4 h-4" />
          Save All Banks
        </button>
      </div>

      {/* Banks List - Mobile Responsive Table */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-2 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Code
              </th>
              <th className="px-2 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Icon
              </th>
              <th className="px-2 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Name
              </th>
              <th className="px-2 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {banks.map((bank, index) => (
              <tr key={index}>
                <td className="px-2 sm:px-4 py-4 text-xs sm:text-sm font-medium text-gray-900">
                  {bank.code}
                </td>
                <td className="px-2 sm:px-4 py-4 text-xs sm:text-sm text-gray-500">
                  {bank.icon}
                </td>
                <td className="px-2 sm:px-4 py-4 text-xs sm:text-sm text-gray-500">
                  {bank.name}
                </td>
                <td className="px-2 sm:px-4 py-4">
                  <button
                    onClick={() => removeBank(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Bank;
