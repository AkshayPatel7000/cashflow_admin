import {
  Building2,
  Database,
  MessageCircle,
  MessageSquare,
  RefreshCw,
  Settings,
} from "lucide-react";
import { useEffect, useState } from "react";
import firebaseConfig from "../config";
import Header from "../components/Header";
import MessageText from "../components/MessageText";
import Tabs from "../components/Tabs";
import AppConfig from "../components/AppConfig";
import Keywords from "../components/Keywords";
import Bank from "../components/Bank";
import AiPrompt from "../components/AiPrompt";
import ChatUI from "../components/ChatUI";

const Home = () => {
  const [activeTab, setActiveTab] = useState("app-config");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [firebaseInitialized, setFirebaseInitialized] = useState(false);
  const [db, setDb] = useState(null);

  // Keywords State
  const [creditKeywords, setCreditKeywords] = useState([]);
  const [debitKeywords, setDebitKeywords] = useState([]);
  const [ignoreKeywords, setIgnoreKeywords] = useState([]);
  const [newKeyword, setNewKeyword] = useState({
    credit: "",
    debit: "",
    ignore: "",
  });
  const [appConfig, setAppConfig] = useState({
    closedTestingLink: "",
    isForceUpdate: false,
    latestVersion: "",
    minVersion: "",
  });
  // Banks State
  const [banks, setBanks] = useState([]);
  const [newBank, setNewBank] = useState({ code: "", icon: "", name: "" });

  // AI Prompt State
  const [aiPrompt, setAiPrompt] = useState("");

  // Chats State
  const [chats, setChats] = useState([]);

  // Initialize Firebase
  useEffect(() => {
    const initializeFirebase = async () => {
      try {
        // Load Firebase SDK
        const script1 = document.createElement("script");
        script1.src =
          "https://cdnjs.cloudflare.com/ajax/libs/firebase/9.22.0/firebase-app-compat.min.js";
        script1.onload = () => {
          const script2 = document.createElement("script");
          script2.src =
            "https://cdnjs.cloudflare.com/ajax/libs/firebase/9.22.0/firebase-firestore-compat.min.js";
          script2.onload = () => {
            // Initialize Firebase
            if (window.firebase && !window.firebase.apps.length) {
              window.firebase.initializeApp(firebaseConfig);
              const firestore = window.firebase.firestore();
              setDb(firestore);
              setFirebaseInitialized(true);
              showMessage("success", "Firebase initialized successfully!");
            }
          };
          document.head.appendChild(script2);
        };
        document.head.appendChild(script1);
      } catch (error) {
        showMessage("error", "Failed to initialize Firebase: " + error.message);
      }
    };

    initializeFirebase();
  }, []);

  // Load all data when Firebase is ready
  useEffect(() => {
    if (firebaseInitialized && db) {
      loadAllData();
    }
  }, [firebaseInitialized, db]);

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 3000);
  };

  const loadAllData = async () => {
    setLoading(true);
    try {
      await Promise.all([
        loadChats(),
        loadAppConfig(),
        loadKeywords(),
        loadBanks(),
        loadAIPrompt(),
      ]);
    } catch (error) {
      showMessage("error", "Failed to load data: " + error.message);
    } finally {
      setLoading(false);
    }
  };
  // Load App Config
  const loadAppConfig = async () => {
    try {
      if (!db) return;
      const doc = await db
        .collection("app_config")
        .doc("version_control")
        .get();
      if (doc.exists) {
        setAppConfig(doc.data());
      }
    } catch (error) {
      console.error("Error loading app config:", error);
    }
  };

  // Load Keywords
  const loadKeywords = async () => {
    try {
      if (!db) return;

      const [creditDoc, debitDoc, ignoreDoc] = await Promise.all([
        db.collection("cashFlow").doc("4Xdpp2K3A2tL9g0m6qpK").get(),
        db.collection("cashFlow").doc("mYbSv1MNspKFkRXEf8N8").get(),
        db.collection("cashFlow").doc("ignore").get(),
      ]);

      if (creditDoc.exists) setCreditKeywords(creditDoc.data().credits || []);
      if (debitDoc.exists) setDebitKeywords(debitDoc.data().debits || []);
      if (ignoreDoc.exists) setIgnoreKeywords(ignoreDoc.data().ignore || []);
    } catch (error) {
      console.error("Error loading keywords:", error);
    }
  };

  // Save Keywords
  const saveKeywords = async (type, keywords) => {
    if (!db) {
      showMessage("error", "Firebase not initialized");
      return;
    }

    setLoading(true);
    try {
      let docRef, field;
      if (type === "credit") {
        docRef = db.collection("cashFlow").doc("4Xdpp2K3A2tL9g0m6qpK");
        field = "credits";
      } else if (type === "debit") {
        docRef = db.collection("cashFlow").doc("mYbSv1MNspKFkRXEf8N8");
        field = "debits";
      } else {
        docRef = db.collection("cashFlow").doc("ignore");
        field = "ignore";
      }

      await docRef.set({ [field]: keywords });
      showMessage("success", `${type} keywords saved successfully!`);
    } catch (error) {
      showMessage("error", `Failed to save ${type} keywords: ` + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Load Banks
  const loadBanks = async () => {
    try {
      if (!db) return;
      const doc = await db.collection("cashFlow").doc("BANKS").get();
      if (doc.exists) {
        setBanks(doc.data().BANKS || []);
      }
    } catch (error) {
      console.error("Error loading banks:", error);
    }
  };

  // Save Banks
  const saveBanks = async () => {
    if (!db) {
      showMessage("error", "Firebase not initialized");
      return;
    }

    setLoading(true);
    try {
      await db.collection("cashFlow").doc("BANKS").set({ BANKS: banks });
      showMessage("success", "Banks saved successfully!");
    } catch (error) {
      showMessage("error", "Failed to save banks: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Load AI Prompt
  const loadAIPrompt = async () => {
    try {
      if (!db) return;
      const doc = await db.collection("cashFlow").doc("prompts").get();
      if (doc.exists) {
        setAiPrompt(doc.data().prompt || "");
      }
    } catch (error) {
      console.error("Error loading AI prompt:", error);
    }
  };

  // Save AI Prompt
  const saveAIPrompt = async () => {
    if (!db) {
      showMessage("error", "Firebase not initialized");
      return;
    }

    setLoading(true);
    try {
      await db.collection("cashFlow").doc("prompts").set({ prompt: aiPrompt });
      showMessage("success", "AI prompt saved successfully!");
    } catch (error) {
      showMessage("error", "Failed to save AI prompt: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Load Chats
  const loadChats = async () => {
    try {
      if (!db) return;

      const snapshot = await db.collection("chats").get();

      const chatsData = [];
      snapshot.forEach((doc) => {
        chatsData.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setChats(chatsData);
    } catch (error) {
      console.error("Error loading chats:", error);
    }
  };

  // Updated Keyword management functions
  const addKeyword = (type) => {
    if (!newKeyword[type].trim()) return;

    if (type === "credit") {
      setCreditKeywords([...creditKeywords, newKeyword[type].trim()]);
    } else if (type === "debit") {
      setDebitKeywords([...debitKeywords, newKeyword[type].trim()]);
    } else {
      setIgnoreKeywords([...ignoreKeywords, newKeyword[type].trim()]);
    }

    // Clear the specific input field
    setNewKeyword({ ...newKeyword, [type]: "" });
  };

  const removeKeyword = (type, index) => {
    if (type === "credit") {
      setCreditKeywords(creditKeywords.filter((_, i) => i !== index));
    } else if (type === "debit") {
      setDebitKeywords(debitKeywords.filter((_, i) => i !== index));
    } else {
      setIgnoreKeywords(ignoreKeywords.filter((_, i) => i !== index));
    }
  };

  // Bank management functions
  const addBank = () => {
    if (!newBank.code || !newBank.name) return;
    setBanks([...banks, { ...newBank }]);
    setNewBank({ code: "", icon: "", name: "" });
  };

  const removeBank = (index) => {
    setBanks(banks.filter((_, i) => i !== index));
  };

  const tabs = [
    {
      id: "app-config",
      label: "Config",
      icon: Settings,
      fullLabel: "App Config",
    },
    {
      id: "keywords",
      label: "Keywords",
      icon: Database,
      fullLabel: "Keywords",
    },
    { id: "banks", label: "Banks", icon: Building2, fullLabel: "Banks" },
    {
      id: "ai-prompt",
      label: "AI",
      icon: MessageCircle,
      fullLabel: "AI Prompt",
    },
    { id: "chats", label: "Chats View", icon: MessageSquare },
  ];

  if (!firebaseInitialized) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <h2 className="text-xl font-semibold mb-2">
            Initializing Firebase...
          </h2>
          <p className="text-gray-600">
            Please wait while we set up the connection to your database.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <Header loadAllData={loadAllData} loading={loading} />

      {/* Message Alert */}
      {message.text && <MessageText message={message} />}

      {/* Navigation Tabs - Mobile Responsive */}
      <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* App Config Tab */}
        {activeTab === "app-config" && (
          <AppConfig
            message={message}
            db={db}
            loading={loading}
            appConfig={appConfig}
            setAppConfig={setAppConfig}
            showMessage={showMessage}
            setLoading={setLoading}
          />
        )}

        {/* Keywords Tab */}
        {activeTab === "keywords" && (
          <Keywords
            creditKeywords={creditKeywords}
            debitKeywords={debitKeywords}
            ignoreKeywords={ignoreKeywords}
            newKeyword={newKeyword}
            setNewKeyword={setNewKeyword}
            addKeyword={addKeyword}
            removeKeyword={removeKeyword}
            saveKeywords={saveKeywords}
            loading={loading}
          />
        )}

        {/* Banks Tab */}
        {activeTab === "banks" && (
          <Bank
            banks={banks}
            newBank={newBank}
            setNewBank={setNewBank}
            addBank={addBank}
            removeBank={removeBank}
            saveBanks={saveBanks}
            loading={loading}
          />
        )}

        {/* AI Prompt Tab */}
        {activeTab === "ai-prompt" && (
          <AiPrompt
            aiPrompt={aiPrompt}
            setAiPrompt={setAiPrompt}
            saveAIPrompt={saveAIPrompt}
            loading={loading}
          />
        )}
        {activeTab === "chats" && (
          <ChatUI db={db} chats={chats} onLoadChats={loadChats} />
        )}
      </div>
    </div>
  );
};

export default Home;
