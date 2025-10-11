import { useEffect, useState } from "react";
import axios from "axios";
import Navigation from "./components/Navigation";
import Dashboard from "./components/Dashboard";
import BrandResearch from "./components/BrandResearch";
import DMGenerator from "./components/DMGenerator";
import OutreachTracker from "./components/OutreachTracker";
import Profile from "./components/Profile";
import { useLocalStorage } from "./hooks/useLocalStorage";
import {
  calculateDashboardStats,
  getFollowUpReminders,
} from "./utils/calculations";
import {
  OutreachRecord,
  FormSubmission,
  UserProfile,
  Brand,
  DashboardStats,
} from "./types";
import { useAuth } from "./context/AuthContext";
import Auth from "./components/Auth";



function App() {
  const { user } = useAuth();

  const [currentPage, setCurrentPage] = useState("dashboard");
  const [outreach, setOutreach] = useLocalStorage<OutreachRecord[]>(
    "pitchpal_outreach",
    []
  );
  const [forms, setForms] = useLocalStorage<FormSubmission[]>(
    "pitchpal_forms",
    []
  );
  const [profile, setProfile] = useLocalStorage<UserProfile | null>(
    "pitchpal_profile",
    null
  );

  const [stats, setStats] = useState<DashboardStats>({
    totalBrandsPitched: 0,
    dmsSent: 0,
    formsFilled: 0,
    followUpsPending: 0,
    responsesReceived: 0,
    acceptanceRate: 0,
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [recentActivity, setRecentActivity] = useState<
    { title: string; subtitle: string; color: string }[]
  >([]);

  const followUpReminders = getFollowUpReminders(outreach);

  //Fetch dashboard stats (from backend or fallback)
  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const res = await axios.get<DashboardStats>(
          "http://localhost:5000/api/dashboard"
        );

        if (res.data) {
          setStats(res.data);
        } else {
          setStats(calculateDashboardStats(outreach, forms));
        }
      } catch (err) {
        console.error("Error fetching dashboard stats:", err);
        setError("Could not load dashboard stats. Using local data instead.");
        setStats(calculateDashboardStats(outreach, forms));
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, [outreach, forms]);

  // ✅ Update recent activity when outreach or forms change
  useEffect(() => {
    const activities: { title: string; subtitle: string; color: string }[] = [];

    outreach
      .slice(-3)
      .reverse()
      .forEach((o) => {
        activities.push({
          title: `DM sent to ${o.brandName}`,
          subtitle: new Date(o.dmSentDate).toLocaleDateString(),
          color: "blue",
        });
      });

    forms
      .slice(-3)
      .reverse()
      .forEach((f) => {
        activities.push({
          title: `Form submitted to ${f.brandName}`,
          subtitle: new Date(f.submissionDate).toLocaleDateString(),
          color: "purple",
        });
      });

    setRecentActivity(activities.slice(0, 5)); // only latest 5
  }, [outreach, forms]);

  // 👉 Function to handle new brand addition
  const handleAddBrand = (brand: Brand) => {
    setCurrentPage("dm-generator");
    setRecentActivity((prev) => [
      { title: `Research started for ${brand.name}`, subtitle: "Just now", color: "orange" },
      ...prev,
    ]);
  };

  // 👉 Handle Navigation (Dashboard buttons)
  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  // 🧩 Page rendering logic
  const renderCurrentPage = () => {
    switch (currentPage) {
      case "dashboard":
        return (
          <Dashboard
            stats={stats}
            isLoading={isLoading}
            onNavigate={handleNavigate}
            recentActivity={recentActivity}
          />
        );

      case "research":
        return <BrandResearch onAddBrand={handleAddBrand} />;

      case "dm-generator":
        return (
          <DMGenerator
            userProfile={profile}
            onDMGenerated={(brandName) => {
              setRecentActivity((prev) => [
                { title: `DM sent to ${brandName}`, subtitle: "Just now", color: "blue" },
                ...prev,
              ]);
            }}
          />
        );

      case "tracker":
        return (
          <OutreachTracker outreach={outreach} setOutreach={setOutreach} />
        );

      case "profile":
        return user ? (
          <Profile profile={profile} setProfile={setProfile} />
        ) : (
          <Auth />
        );

      default:
        return (
          <Dashboard
            stats={stats}
            isLoading={isLoading}
            onNavigate={handleNavigate}
            recentActivity={recentActivity}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        followUpCount={followUpReminders.length}
      />

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-center py-2 text-sm">
          {error}
        </div>
      )}

      <main className="max-w-7xl mx-auto">{renderCurrentPage()}</main>
    </div>
  );
}

export default App;
