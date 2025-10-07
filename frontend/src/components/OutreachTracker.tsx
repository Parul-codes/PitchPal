import React, { useState } from 'react';
import { Plus, Calendar, Filter, Eye, Edit2, Trash2, CheckCircle, Clock, MessageSquare } from 'lucide-react';
import { OutreachRecord } from '../types';

interface OutreachTrackerProps {
  outreach: OutreachRecord[];
  setOutreach: (outreach: OutreachRecord[]) => void;
}

const OutreachTracker: React.FC<OutreachTrackerProps> = ({ outreach, setOutreach }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingRecord, setEditingRecord] = useState<OutreachRecord | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('');
  const [newRecord, setNewRecord] = useState<Partial<OutreachRecord>>({
    brandName: '',
    platform: 'Instagram',
    status: 'Sent',
    dmSentDate: new Date().toISOString().split('T')[0],
    notes: ''
  });

  const addRecord = () => {
    if (!newRecord.brandName) return;

    const record: OutreachRecord = {
      id: Date.now().toString(),
      brandName: newRecord.brandName!,
      platform: newRecord.platform as any || 'Instagram',
      status: newRecord.status as any || 'Sent',
      dmSentDate: newRecord.dmSentDate!,
      notes: newRecord.notes,
      responseReceived: false
    };

    setOutreach([...outreach, record]);
    setNewRecord({
      brandName: '',
      platform: 'Instagram',
      status: 'Sent',
      dmSentDate: new Date().toISOString().split('T')[0],
      notes: ''
    });
    setShowAddForm(false);
  };

  const updateRecord = (id: string, updates: Partial<OutreachRecord>) => {
    setOutreach(outreach.map(record => 
      record.id === id ? { ...record, ...updates } : record
    ));
  };

  const deleteRecord = (id: string) => {
    setOutreach(outreach.filter(record => record.id !== id));
  };

  const filteredOutreach = filterStatus 
    ? outreach.filter(record => record.status === filterStatus)
    : outreach;

  const getStatusColor = (status: string) => {
    const colors = {
      'Sent': 'bg-blue-100 text-blue-800',
      'Delivered': 'bg-purple-100 text-purple-800',
      'Read': 'bg-yellow-100 text-yellow-800',
      'Replied': 'bg-green-100 text-green-800',
      'Rejected': 'bg-red-100 text-red-800',
      'Following Up': 'bg-orange-100 text-orange-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status: string) => {
    const icons = {
      'Sent': Clock,
      'Delivered': CheckCircle,
      'Read': Eye,
      'Replied': MessageSquare,
      'Rejected': Trash2,
      'Following Up': Calendar
    };
    const Icon = icons[status as keyof typeof icons] || Clock;
    return <Icon size={16} />;
  };

  return (
    <div className="p-6">
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Outreach Tracker</h1>
          <p className="text-gray-600">Monitor your brand outreach progress and responses</p>
        </div>
        
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all"
        >
          <Plus size={20} />
          <span>Add Outreach</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex items-center space-x-4">
          <Filter size={20} className="text-gray-500" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">All Status</option>
            <option value="Sent">Sent</option>
            <option value="Delivered">Delivered</option>
            <option value="Read">Read</option>
            <option value="Replied">Replied</option>
            <option value="Rejected">Rejected</option>
            <option value="Following Up">Following Up</option>
          </select>
          
          {filterStatus && (
            <span className="text-sm text-gray-600">
              Showing {filteredOutreach.length} of {outreach.length} records
            </span>
          )}
        </div>
      </div>

      {/* Add/Edit Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Outreach</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Brand Name *</label>
                <input
                  type="text"
                  value={newRecord.brandName || ''}
                  onChange={(e) => setNewRecord({...newRecord, brandName: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Platform</label>
                  <select
                    value={newRecord.platform || 'Instagram'}
                    onChange={(e) => setNewRecord({...newRecord, platform: e.target.value as any})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="Instagram">Instagram</option>
                    <option value="TikTok">TikTok</option>
                    <option value="Email">Email</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={newRecord.status || 'Sent'}
                    onChange={(e) => setNewRecord({...newRecord, status: e.target.value as any})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="Sent">Sent</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Read">Read</option>
                    <option value="Replied">Replied</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Following Up">Following Up</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">DM Sent Date</label>
                <input
                  type="date"
                  value={newRecord.dmSentDate || ''}
                  onChange={(e) => setNewRecord({...newRecord, dmSentDate: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                <textarea
                  value={newRecord.notes || ''}
                  onChange={(e) => setNewRecord({...newRecord, notes: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={addRecord}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all"
              >
                Add Outreach
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Outreach List */}
      <div className="space-y-4">
        {filteredOutreach.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <MessageSquare size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No outreach records yet</h3>
            <p className="text-gray-600 mb-4">Start tracking your brand outreach to monitor your progress.</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all"
            >
              Add Your First Outreach
            </button>
          </div>
        ) : (
          filteredOutreach.map((record) => (
            <div key={record.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{record.brandName}</h3>
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                        {getStatusIcon(record.status)}
                        <span>{record.status}</span>
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-2">
                    <span>📱 {record.platform}</span>
                    <span>📅 Sent: {new Date(record.dmSentDate).toLocaleDateString()}</span>
                    {record.responseDate && (
                      <span>💬 Replied: {new Date(record.responseDate).toLocaleDateString()}</span>
                    )}
                  </div>
                  
                  {record.notes && (
                    <p className="text-sm text-gray-600 mt-2">{record.notes}</p>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setEditingRecord(record)}
                    className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => deleteRecord(record.id)}
                    className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OutreachTracker;