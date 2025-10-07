import React, { useState } from 'react';
import { Copy, Wand2, RefreshCw, Check } from 'lucide-react';

interface DMGeneratorProps {
  userProfile: any;
}

const DMGenerator: React.FC<DMGeneratorProps> = ({ userProfile }) => {
  const [brandName, setBrandName] = useState('');
  const [productType, setProductType] = useState('');
  const [tone, setTone] = useState('professional');
  const [generatedDM, setGeneratedDM] = useState('');
  const [copied, setCopied] = useState(false);

  const generateDM = () => {
    const templates = {
      professional: [
        `Hi ${brandName} team! 👋

I'm ${userProfile?.name || '[Your Name]'}, a ${userProfile?.niche || 'lifestyle'} content creator with ${userProfile?.followers?.instagram || '10k'}+ engaged followers on Instagram.

I absolutely love your ${productType || 'products'} and think they'd be perfect for my audience who are always looking for quality ${userProfile?.niche || 'lifestyle'} recommendations.

I'd love to collaborate and create authentic content showcasing your ${productType || 'products'}. I can provide:
• High-quality photos/videos
• Detailed product reviews
• Stories & posts with genuine feedback

My media kit is available here: ${userProfile?.mediaKit || '[Media Kit Link]'}

Looking forward to potentially working together!

Best,
${userProfile?.name || '[Your Name]'}
${userProfile?.instagram ? `@${userProfile.instagram}` : '@yourusername'}`,

        `Hello ${brandName}! ✨

I'm ${userProfile?.name || '[Your Name]'}, a ${userProfile?.niche || 'lifestyle'} content creator from ${userProfile?.location || '[Location]'} with a highly engaged community of ${userProfile?.followers?.instagram || '10k'}+ followers.

Your ${productType || 'products'} align perfectly with my content and my audience's interests. I'd love to create authentic, engaging content featuring your brand.

What I can offer:
📸 Professional product photography
📱 Instagram posts, stories & reels
💬 Genuine reviews and recommendations
📊 Detailed analytics and insights

I'm particularly interested in your ${productType || 'products'} as they fit perfectly with my recent content themes.

Would you be open to discussing a collaboration?

${userProfile?.name || '[Your Name]'}
${userProfile?.instagram ? `@${userProfile.instagram}` : '@yourusername'}`
      ],
      friendly: [
        `Hey ${brandName}! 💕

I'm ${userProfile?.name || '[Your Name]'} and I'm obsessed with your ${productType || 'products'}! I've been following your brand for a while and just love everything you create.

I'm a ${userProfile?.niche || 'lifestyle'} content creator with ${userProfile?.followers?.instagram || '10k'}+ followers who are always asking me for product recommendations. I think they would absolutely love your ${productType || 'products'}!

I'd love to partner with you to create some fun, authentic content. I'm all about genuine reviews and creating content that actually helps people discover amazing products.

Let me know if you'd be interested in collaborating! I'd be happy to send over my media kit and some examples of my work.

Can't wait to hear from you! ✨

${userProfile?.name || '[Your Name]'}
${userProfile?.instagram ? `@${userProfile.instagram}` : '@yourusername'}`,

        `Hi there ${brandName} team! 🌟

I'm ${userProfile?.name || '[Your Name]'}, a passionate ${userProfile?.niche || 'lifestyle'} creator with an amazing community of ${userProfile?.followers?.instagram || '10k'}+ engaged followers.

I've been using and loving your ${productType || 'products'} for a while now, and my followers are constantly asking about them! I think a collaboration would be perfect.

Here's what I can bring to the table:
✨ Authentic product reviews
📷 Beautiful, on-brand photography  
🎥 Engaging video content
💪 A genuinely interested audience

I'd love to chat about how we can work together to create content that showcases your amazing ${productType || 'products'}.

Hope to hear from you soon!

${userProfile?.name || '[Your Name]'}
${userProfile?.instagram ? `@${userProfile.instagram}` : '@yourusername'}`
      ],
      casual: [
        `Hey ${brandName}! 👋

${userProfile?.name || '[Your Name]'} here! I'm a ${userProfile?.niche || 'lifestyle'} creator with ${userProfile?.followers?.instagram || '10k'}+ followers and I'm absolutely loving your ${productType || 'products'}.

My audience is always asking for authentic product recommendations, and I think your ${productType || 'products'} would be perfect for them. 

Would you be up for a collaboration? I create genuine, engaging content that converts - no boring sponsored posts here! 😄

Let me know if you're interested and I can send over some examples of my work.

${userProfile?.name || '[Your Name]'}
${userProfile?.instagram ? `@${userProfile.instagram}` : '@yourusername'}`,

        `What's up ${brandName}! 🔥

I'm ${userProfile?.name || '[Your Name]'}, ${userProfile?.niche || 'lifestyle'} creator with ${userProfile?.followers?.instagram || '10k'}+ engaged followers who trust my recommendations.

Your ${productType || 'products'} are exactly what my audience has been asking for! I'd love to create some killer content for you.

Quick stats:
• ${userProfile?.followers?.instagram || '10k'}+ Instagram followers
• High engagement rates
• Authentic content style
• Based in ${userProfile?.location || '[Location]'}

Interested in working together? Hit me back and let's make some magic happen! ✨

${userProfile?.name || '[Your Name]'}
${userProfile?.instagram ? `@${userProfile.instagram}` : '@yourusername'}`
      ]
    };

    const selectedTone = tone as keyof typeof templates;
    const templateOptions = templates[selectedTone] || templates.professional;
    const randomTemplate = templateOptions[Math.floor(Math.random() * templateOptions.length)];
    
    setGeneratedDM(randomTemplate);
  };

  const copyToClipboard = async () => {
    if (generatedDM) {
      await navigator.clipboard.writeText(generatedDM);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const tones = [
    { value: 'professional', label: 'Professional', description: 'Formal and business-like' },
    { value: 'friendly', label: 'Friendly', description: 'Warm and approachable' },
    { value: 'casual', label: 'Casual', description: 'Relaxed and conversational' }
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Cold DM Generator</h1>
        <p className="text-gray-600">Generate personalized cold DMs for brand outreach</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
              disabled={!brandName}
              className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Wand2 size={20} />
              <span>Generate DM</span>
            </button>
          </div>
        </div>

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
                    <span className="text-sm">{copied ? 'Copied!' : 'Copy'}</span>
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
                <p className="text-sm">Fill in the brand details and click generate to create a personalized cold DM.</p>
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
              <strong>Tip:</strong> Complete your profile to generate more personalized DMs with your details automatically included.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DMGenerator;