import React, { useState } from "react";
import { Save } from "lucide-react";
function AppConfig({
  loading,
  showMessage,
  db,
  setLoading,
  appConfig,
  setAppConfig,
}) {
  // App Config State

  // Save App Config
  const saveAppConfig = async () => {
    if (!db) {
      showMessage("error", "Firebase not initialized");
      return;
    }

    setLoading(true);
    try {
      await db.collection("app_config").doc("version_control").set(appConfig);
      showMessage("success", "App configuration saved successfully!");
    } catch (error) {
      showMessage(
        "error",
        "Failed to save app configuration: " + error.message
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-white rounded-lg shadow p-4 sm:p-6">
      <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">
        App Configuration
      </h2>
      <div className="space-y-4 sm:space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Closed Testing Link
          </label>
          <input
            type="url"
            value={appConfig.closedTestingLink}
            onChange={(e) =>
              setAppConfig({
                ...appConfig,
                closedTestingLink: e.target.value,
              })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
            placeholder="https://play.google.com/store/apps/details?id=..."
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            checked={appConfig.isForceUpdate}
            onChange={(e) =>
              setAppConfig({
                ...appConfig,
                isForceUpdate: e.target.checked,
              })
            }
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm text-gray-900">
            Force Update Required
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Latest Version
            </label>
            <input
              type="text"
              value={appConfig.latestVersion}
              onChange={(e) =>
                setAppConfig({
                  ...appConfig,
                  latestVersion: e.target.value,
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
              placeholder="1.4.0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Minimum Version
            </label>
            <input
              type="text"
              value={appConfig.minVersion}
              onChange={(e) =>
                setAppConfig({ ...appConfig, minVersion: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
              placeholder="0.9.0"
            />
          </div>
        </div>

        <button
          onClick={saveAppConfig}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 text-sm"
        >
          <Save className="w-4 h-4" />
          Save Configuration
        </button>
      </div>
    </div>
  );
}

export default AppConfig;
