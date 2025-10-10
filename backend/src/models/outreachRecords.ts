import { Schema, model, Document } from 'mongoose';

export interface IOutreachRecord extends Document {
  brandName: string;
  platform: 'Instagram' | 'TikTok' | 'Email' | 'Other';
  status: 'Sent' | 'Delivered' | 'Read' | 'Replied' | 'Rejected' | 'Following Up';
  dmSentDate: Date;
  responseDate?: Date;
  notes?: string;
  responseReceived: boolean;
}

const OutreachRecordSchema = new Schema<IOutreachRecord>({
  brandName: { type: String, required: true },
  platform: { type: String, default: 'Instagram' },
  status: { type: String, default: 'Sent' },
  dmSentDate: { type: Date, default: Date.now },
  responseDate: { type: Date },
  notes: { type: String },
  responseReceived: { type: Boolean, default: false },
});

export default model<IOutreachRecord>('OutreachRecord', OutreachRecordSchema);
