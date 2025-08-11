import { OutreachRecord, FormSubmission, DashboardStats } from '../types';

export function calculateDashboardStats(
  outreach: OutreachRecord[],
  forms: FormSubmission[]
): DashboardStats {
  const totalBrandsPitched = new Set([
    ...outreach.map(o => o.brandName),
    ...forms.map(f => f.brandName)
  ]).size;

  const dmsSent = outreach.length;
  const formsFilled = forms.length;
  const followUpsPending = outreach.filter(o => 
    o.status === 'Sent' && 
    !o.responseReceived &&
    new Date(o.dmSentDate) < new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) // 3+ days old
  ).length;

  const responsesReceived = outreach.filter(o => o.status === 'Replied').length;
  const acceptanceRate = dmsSent > 0 ? Math.round((responsesReceived / dmsSent) * 100) : 0;

  return {
    totalBrandsPitched,
    dmsSent,
    formsFilled,
    followUpsPending,
    responsesReceived,
    acceptanceRate
  };
}

export function getFollowUpReminders(outreach: OutreachRecord[]): OutreachRecord[] {
  const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);
  
  return outreach.filter(record => 
    record.status === 'Sent' &&
    !record.responseReceived &&
    new Date(record.dmSentDate) < threeDaysAgo
  );
}