import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Calendar, Filter, Eye, Edit2, Trash2, CheckCircle, Clock, MessageSquare, AlertTriangle } from 'lucide-react';
import { OutreachRecord } from '../types';
import { useAuth } from '../context/AuthContext';
import { API_URL } from '../api/base';

interface OutreachTrackerProps {
  outreach: OutreachRecord[];
  setOutreach: (outreach: OutreachRecord[]) => void;
}

const OutreachTracker: React.FC<OutreachTrackerProps> = ({ outreach, setOutreach }) => {
  const { token } = useAuth();

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

  const [deleteConfirm, setDeleteConfirm] = useState<{ open: boolean; id: string | null; brandName?: string }>({
    open: false,
    id: null
  });

  const API_url = `${API_URL}/api/outreach`;

  // Fetch records
  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const res = await axios.get<OutreachRecord[]>(API_url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOutreach(res.data);
      } catch (err) {
        console.error('Error fetching outreach records:', err);
      }
    };
    fetchRecords();
  }, []);

  // Add new record
  const addRecord = async () => {
    if (!newRecord.brandName) return;
    try {
      const res = await axios.post<OutreachRecord>(API_url, newRecord, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOutreach([...outreach, res.data]);
      setNewRecord({
        brandName: '',
        platform: 'Instagram',
        status: 'Sent',
        dmSentDate: new Date().toISOString().split('T')[0],
        notes: ''
      });
      setShowAddForm(false);
    } catch (err) {
      console.error('Error adding record:', err);
    }
  };

  // Update record
  const updateRecord = async (id: string, updates: Partial<OutreachRecord>) => {
    try {
      const res = await axios.put<OutreachRecord>(`${API_url}/${id}`, updates, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOutreach(outreach.map(r => r.id === id ? res.data : r));
      setEditingRecord(null);
      setShowAddForm(false);
    } catch (err) {
      console.error('Error updating record:', err);
    }
  };

  // Delete record
  const deleteRecord = async () => {
    if (!deleteConfirm.id) return;
    try {
      await axios.delete(`${API_url}/${deleteConfirm.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOutreach(outreach.filter(r => r.id !== deleteConfirm.id));
      setDeleteConfirm({ open: false, id: null });
    } catch (err) {
      console.error('Error deleting record:', err);
    }
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
      {/* Header */}
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

      {/* Filter */}
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
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm.open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-sm text-center">
            <AlertTriangle className="text-red-500 mx-auto mb-3" size={36} />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Outreach?</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete <span className="font-medium">{deleteConfirm.brandName}</span>? This action cannot be undone.
            </p>
            <div className="flex justify-center space-x-3">
              <button
                onClick={deleteRecord}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
              <button
                onClick={() => setDeleteConfirm({ open: false, id: null })}
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

                {/* Action Buttons */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => { setEditingRecord(record); setShowAddForm(true); }}
                    className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => setDeleteConfirm({ open: true, id: record.id, brandName: record.brandName })}
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
