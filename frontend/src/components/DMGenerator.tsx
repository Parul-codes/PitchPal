import React, { useState } from "react";
import { Copy, Wand2, RefreshCw, Check } from "lucide-react";
import axios from "axios";
import { UserProfile } from "../types";

interface DMGeneratorProps {
  userProfile: UserProfile | null;
  onDMGenerated?: (brandName: string) => void; // ✅ make sure this prop exists
}

const DMGenerator: React.FC<DMGeneratorProps> = ({ userProfile, onDMGenerated }) => {
  const [brandName, setBrandName] = useState("");
  const [productType, setProductType] = useState("");
  const [tone, setTone] = useState("professional");
  const [generatedDM, setGeneratedDM] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  // Call backend AI endpoint
  const generateDM = async () => {
    if (!brandName) return alert("Please enter a brand name");

    try {
      setLoading(true);
      const res = await axios.post<{ dm: string }>("http://localhost:5000/api/dm/generate", {
        brandName,
        productType,
        tone,
      });

      const dmText = res.data.dm || "No DM generated. Try again!";
      setGeneratedDM(dmText);

      // ✅ Trigger callback to update recent activity
      if (onDMGenerated) {
        onDMGenerated(brandName);
      }
    } catch (err) {
      console.error(err);
      alert("Error generating DM");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    if (generatedDM) {
      await navigator.clipboard.writeText(generatedDM);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const tones = [
    { value: "professional", label: "Professional", description: "Formal and business-like" },
    { value: "friendly", label: "Friendly", description: "Warm and approachable" },
    { value: "casual", label: "Casual", description: "Relaxed and conversational" },
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Cold DM Generator</h1>
        <p className="text-gray-600">Generate personalized cold DMs for brand outreach</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* DM Config Panel */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">DM Configuration</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Brand Name *</label>
              <input
                type="text"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                placeholder="e.g., Glossier, CeraVe, Dot & Key"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Product Type</label>
              <input
                type="text"
                value={productType}
                onChange={(e) => setProductType(e.target.value)}
                placeholder="e.g., skincare products, makeup, supplements"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Tone & Style</label>
              <div className="space-y-3">
                {tones.map((toneOption) => (
                  <label key={toneOption.value} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      value={toneOption.value}
                      checked={tone === toneOption.value}
                      onChange={(e) => setTone(e.target.value)}
                      className="w-4 h-4 text-purple-600 focus:ring-purple-500 border-gray-300"
                    />
                    <div>
                      <div className="font-medium text-gray-900">{toneOption.label}</div>
                      <div className="text-sm text-gray-600">{toneOption.description}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <button
              onClick={generateDM}
              disabled={!brandName || loading}
              className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Wand2 size={20} />
              <span>{loading ? "Generating..." : "Generate DM"}</span>
            </button>
          </div>
        </div>

        {/* Generated DM Panel */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Generated DM</h3>
            <div className="flex space-x-2">
              {generatedDM && (
                <>
                  <button
                    onClick={generateDM}
                    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Regenerate"
                  >
                    <RefreshCw size={20} />
                  </button>
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center space-x-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                  >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                    <span className="text-sm">{copied ? "Copied!" : "Copy"}</span>
                  </button>
                </>
              )}
            </div>
          </div>

          {generatedDM ? (
            <div className="bg-gray-50 rounded-lg p-4 min-h-80">
              <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono leading-relaxed">
                {generatedDM}
              </pre>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-8 min-h-80 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <Wand2 size={48} className="mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium mb-2">Ready to generate your DM!</p>
                <p className="text-sm">
                  Fill in the brand details and click generate to create a personalized cold DM.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {!userProfile?.name && (
        <div className="mt-6 bg-orange-50 border border-orange-200 rounded-xl p-4">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <p className="text-orange-800 text-sm">
              <strong>Tip:</strong> Complete your profile to generate more personalized DMs with your
              details automatically included.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DMGenerator;
