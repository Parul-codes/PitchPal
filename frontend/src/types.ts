export interface Brand {
  id: string;
  name: string;
  niche: string;
  website?: string;
  contactEmail?: string;
  suggestedProducts?: string[];
}

export interface OutreachRecord {
  id: string;
  _id?: string; 
  brandName: string;
  brandId?: string;
  dmSentDate: string;
  platform: 'Instagram' | 'TikTok' | 'Email' | 'Other';
  status: 'Sent' | 'Delivered' | 'Read' | 'Replied' | 'Rejected' | 'Following Up';
  followUpDate?: string;
  notes?: string;
  responseReceived?: boolean;
  responseDate?: string;
  responseDetails?: string;
}

export interface FormSubmission {
  id: string;
  brandName: string;
  formUrl: string;
  submissionDate: string;
  productInfo?: string;
  status: 'Submitted' | 'Pending Review' | 'Accepted' | 'Rejected';
}

// src/types.ts
export interface UserProfile {
  _id?: string;
  name: string;
  email: string;
  instagram: string;
  tiktok?: string;
  followers: {
    instagram: number;
    tiktok: number;
  };
  niche: string;
  location?: string;
  bio?: string;
  rates: {
    post: number;
    story: number;
    reel: number;
  };
  mediaKit?: string;
}

export interface DashboardStats {
  totalBrandsPitched: number;
  dmsSent: number;
  formsFilled: number;
  followUpsPending: number;
  responsesReceived: number;
  acceptanceRate: number;
}