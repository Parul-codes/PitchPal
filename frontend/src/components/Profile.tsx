import { User, Instagram, Camera, DollarSign, Save } from 'lucide-react';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Followers {
  instagram: number;
  tiktok: number;
}

export interface UserProfile {
  _id?: string;
  name: string;
  email: string;
  instagram: string;
  tiktok: string;
  followers: Followers;
  niche: string;
  location: string;
  bio: string;
  rates: { post: number; story: number; reel: number };
  mediaKit: string;
}

const Profile: React.FC = () => {
  const [formData, setFormData] = useState<UserProfile>({
    name: '',
    email: '',
    instagram: '',
    tiktok: '',
    followers: { instagram: 0, tiktok: 0 },
    niche: '',
    location: '',
    bio: '',
    rates: { post: 0, story: 0, reel: 0 },
    mediaKit: '',
  });

  const [saved, setSaved] = useState(false);

  // Fetch profile from backend on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get<UserProfile[]>('http://localhost:5000/api/profiles/');
        if (res.data.length > 0) {
          setFormData(res.data[0]); // Load first profile for now
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
      }
    };
    fetchProfile();
  }, []);

  const handleSave = async () => {
    try {
      if (formData._id) {
        // If profile already exists, update it
        const res = await axios.put<UserProfile>(`http://localhost:5000/api/profiles/${formData._id}`, formData);
        setFormData(res.data);
      } else {
        // If profile is new, create it
        const res = await axios.post<UserProfile>('http://localhost:5000/api/profiles/', formData);
        setFormData(res.data); // this includes the _id from DB
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      console.error('Error saving profile:', err);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNestedChange = (parent: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [parent]: { ...(prev as any)[parent], [field]: value },
    }));
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile Settings</h1>
        <p className="text-gray-600">Manage your creator profile and rates for brand collaborations</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Basic Info */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <User size={20} />
              <span>Basic Information</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Niche *</label>
                <select
                  value={formData.niche}
                  onChange={(e) => handleInputChange('niche', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Select your niche</option>
                  <option value="beauty">Beauty & Skincare</option>
                  <option value="fashion">Fashion & Style</option>
                  <option value="fitness">Fitness & Health</option>
                  <option value="lifestyle">Lifestyle</option>
                  <option value="tech">Tech & Gaming</option>
                  <option value="food">Food & Cooking</option>
                  <option value="travel">Travel</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="City, Country"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
              <textarea
                value={formData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                rows={4}
                placeholder="Brief description of your content and audience..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Social Media */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <Instagram size={20} />
              <span>Social Media</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Instagram Username</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">@</span>
                  <input
                    type="text"
                    value={formData.instagram}
                    onChange={(e) => handleInputChange('instagram', e.target.value)}
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Instagram Followers</label>
                <input
                  type="number"
                  value={formData.followers.instagram}
                  onChange={(e) => handleNestedChange('followers', 'instagram', parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">TikTok Username</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">@</span>
                  <input
                    type="text"
                    value={formData.tiktok || ''}
                    onChange={(e) => handleInputChange('tiktok', e.target.value)}
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">TikTok Followers</label>
                <input
                  type="number"
                  value={formData.followers.tiktok || 0}
                  onChange={(e) => handleNestedChange('followers', 'tiktok', parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Rates */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <DollarSign size={20} />
              <span>Content Rates (USD)</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Instagram Post</label>
                <input
                  type="number"
                  value={formData.rates.post}
                  onChange={(e) => handleNestedChange('rates', 'post', parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Instagram Story</label>
                <input
                  type="number"
                  value={formData.rates.story}
                  onChange={(e) => handleNestedChange('rates', 'story', parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Instagram Reel</label>
                <input
                  type="number"
                  value={formData.rates.reel}
                  onChange={(e) => handleNestedChange('rates', 'reel', parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Media Kit & Actions */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <Camera size={20} />
              <span>Media Kit</span>
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Media Kit URL</label>
              <input
                type="url"
                value={formData.mediaKit || ''}
                onChange={(e) => handleInputChange('mediaKit', e.target.value)}
                placeholder="https://your-mediakit-link.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">Link to your online media kit or portfolio</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Preview</h3>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Name:</span>
                <span className="font-medium">{formData.name || 'Not set'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Niche:</span>
                <span className="font-medium capitalize">{formData.niche || 'Not set'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Instagram:</span>
                <span className="font-medium">@{formData.instagram || 'username'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Followers:</span>
                <span className="font-medium">{formData.followers.instagram?.toLocaleString() || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Post Rate:</span>
                <span className="font-medium">${formData.rates.post || 0}</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleSave}
            className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all"
          >
            <Save size={20} />
            <span>{saved ? 'Saved!' : 'Save Profile'}</span>
          </button>

          {!formData.name && (
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
              <p className="text-orange-800 text-sm">
                <strong>Complete your profile</strong> to generate personalized DMs and improve your brand outreach success rate.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;