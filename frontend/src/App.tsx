import { useState } from 'react';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import BrandResearch from './components/BrandResearch';
import DMGenerator from './components/DMGenerator';
import OutreachTracker from './components/OutreachTracker';
import Profile from './components/Profile';
import { useLocalStorage } from './hooks/useLocalStorage';
import { calculateDashboardStats, getFollowUpReminders } from './utils/calculations';
import { OutreachRecord, FormSubmission, UserProfile, Brand } from './types';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [outreach, setOutreach] = useLocalStorage<OutreachRecord[]>('pitchpal_outreach', []);
  const [forms, setForms] = useLocalStorage<FormSubmission[]>('pitchpal_forms', []);
  const [profile, setProfile] = useLocalStorage<UserProfile | null>('pitchpal_profile', null);

  const stats = calculateDashboardStats(outreach, forms);
  const followUpReminders = getFollowUpReminders(outreach);

  const handleAddBrand = (brand: Brand) => {
    // This could be used to pre-populate the DM generator or outreach tracker
    setCurrentPage('dm-generator');
    // You could also store the selected brand in state and pass it to the DM generator
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard stats={stats} />;
      case 'research':
        return <BrandResearch onAddBrand={handleAddBrand} />;
      case 'dm-generator':
        return <DMGenerator userProfile={profile} />;
      case 'tracker':
        return <OutreachTracker outreach={outreach} setOutreach={setOutreach} />;
      case 'profile':
        return <Profile profile={profile} setProfile={setProfile} />;
      default:
        return <Dashboard stats={stats} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage}
        followUpCount={followUpReminders.length}
      />
      <main className="max-w-7xl mx-auto">
        {renderCurrentPage()}
      </main>
    </div>
  );
}

export default App;