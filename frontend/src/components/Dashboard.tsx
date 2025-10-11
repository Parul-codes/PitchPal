import React from "react";
import {
  TrendingUp,
  Send,
  FileText,
  Clock,
  MessageSquare,
  Target,
  Loader2,
} from "lucide-react";
import { DashboardStats } from "../types";

interface ActivityItem {
  title: string;
  subtitle: string;
  color: string;
}

interface DashboardProps {
  stats: DashboardStats;
  isLoading?: boolean;
  onNavigate?: (page: string) => void; // allows navigation from Quick Actions
  recentActivity?: ActivityItem[];
}

const Dashboard: React.FC<DashboardProps> = ({
  stats,
  isLoading = false,
  onNavigate,
  recentActivity = [],
}) => {
  // Card stats for overview metrics
  const statCards = [
    {
      title: "Brands Pitched",
      value: stats?.totalBrandsPitched ?? 0,
      icon: Target,
      bgColor: "bg-blue-50",
      textColor: "text-blue-700",
    },
    {
      title: "DMs Sent",
      value: stats?.dmsSent ?? 0,
      icon: Send,
      bgColor: "bg-purple-50",
      textColor: "text-purple-700",
    },
    {
      title: "Forms Filled",
      value: stats?.formsFilled ?? 0,
      icon: FileText,
      bgColor: "bg-green-50",
      textColor: "text-green-700",
    },
    {
      title: "Follow-ups Pending",
      value: stats?.followUpsPending ?? 0,
      icon: Clock,
      bgColor: "bg-orange-50",
      textColor: "text-orange-700",
    },
    {
      title: "Responses Received",
      value: stats?.responsesReceived ?? 0,
      icon: MessageSquare,
      bgColor: "bg-teal-50",
      textColor: "text-teal-700",
    },
    {
      title: "Acceptance Rate",
      value: `${stats?.acceptanceRate ?? 0}%`,
      icon: TrendingUp,
      bgColor: "bg-pink-50",
      textColor: "text-pink-700",
    },
  ];

  // Default if user has no recorded actions
  const defaultRecent: ActivityItem[] = [
    { title: "DM sent to Glossier", subtitle: "2 hours ago", color: "blue" },
    { title: "Response from CeraVe", subtitle: "1 day ago", color: "green" },
    { title: "Form submitted to Fenty", subtitle: "3 days ago", color: "purple" },
  ];

  const activities = recentActivity.length > 0 ? recentActivity : defaultRecent;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">
          Track your UGC outreach performance and key metrics
        </p>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="flex items-center justify-center py-16 text-gray-500">
          <Loader2 className="w-6 h-6 mr-2 animate-spin" />
          Loading your dashboard...
        </div>
      ) : (
        <>
          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {statCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">
                        {card.title}
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {card.value}
                      </p>
                    </div>
                    <div
                      className={`w-12 h-12 rounded-lg ${card.bgColor} flex items-center justify-center`}
                    >
                      <Icon className={`w-6 h-6 ${card.textColor}`} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Actions + Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button
                  onClick={() => onNavigate?.("research")}
                  className="w-full text-left p-3 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600 transition-all"
                >
                  <div className="font-medium">Start New Outreach Campaign</div>
                  <div className="text-sm opacity-90">
                    Research brands and send DMs
                  </div>
                </button>

                <button
                  onClick={() => onNavigate?.("tracker")}
                  className="w-full text-left p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="font-medium text-gray-900">
                    Review Pending Follow-ups
                  </div>
                  <div className="text-sm text-gray-600">
                    Check brands that need follow-up
                  </div>
                </button>

                <button
                  onClick={() => onNavigate?.("profile")}
                  className="w-full text-left p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="font-medium text-gray-900">Update Profile</div>
                  <div className="text-sm text-gray-600">
                    Keep your creator info current
                  </div>
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Recent Activity
              </h3>
              {activities.length > 0 ? (
                <div className="space-y-4">
                  {activities.map((a, i) => (
                    <div
                      key={i}
                      className={`flex items-center space-x-3 p-3 rounded-lg border border-gray-100 bg-opacity-60 bg-${a.color}-50`}
                    >
                      <div className={`w-2 h-2 bg-${a.color}-500 rounded-full`}></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {a.title}
                        </p>
                        <p className="text-xs text-gray-600">{a.subtitle}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 text-center py-6">
                  No recent activity yet.
                </p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
