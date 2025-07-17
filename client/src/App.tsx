import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import BugList from './components/BugList';
import BugForm from './components/BugForm';
import BugStats from './components/BugStats';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';
import { bugService } from './services/bugService';

function App() {
  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingBug, setEditingBug] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: '',
    severity: '',
    priority: ''
  });

  // Fetch bugs on component mount
  useEffect(() => {
    loadBugs();
  }, [filters]);

  const loadBugs = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('🔍 Loading bugs with filters:', filters);
      
      const response = await bugService.getBugs(filters);
      setBugs(response.data);
      console.log('✅ Bugs loaded successfully:', response.data.length);
    } catch (err) {
      console.error('❌ Failed to load bugs:', err);
      setError('Failed to load bugs. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBug = async (bugData) => {
    try {
      console.log('📝 Creating bug:', bugData);
      const response = await bugService.createBug(bugData);
      setBugs(prev => [response.data, ...prev]);
      setShowForm(false);
      console.log('✅ Bug created successfully');
    } catch (err) {
      console.error('❌ Failed to create bug:', err);
      throw err;
    }
  };

  const handleUpdateBug = async (id, bugData) => {
    try {
      console.log('📝 Updating bug:', id, bugData);
      const response = await bugService.updateBug(id, bugData);
      setBugs(prev => prev.map(bug => 
        bug._id === id ? response.data : bug
      ));
      setEditingBug(null);
      console.log('✅ Bug updated successfully');
    } catch (err) {
      console.error('❌ Failed to update bug:', err);
      throw err;
    }
  };

  const handleDeleteBug = async (id) => {
    try {
      console.log('🗑️ Deleting bug:', id);
      await bugService.deleteBug(id);
      setBugs(prev => prev.filter(bug => bug._id !== id));
      console.log('✅ Bug deleted successfully');
    } catch (err) {
      console.error('❌ Failed to delete bug:', err);
      setError('Failed to delete bug. Please try again.');
    }
  };

  const filteredBugs = bugs.filter(bug =>
    bug.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bug.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Bug Tracker</h1>
                <p className="mt-1 text-sm text-gray-600">
                  Track and manage software issues efficiently
                </p>
              </div>
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm"
              >
                <Plus className="w-4 h-4 mr-2" />
                Report Bug
              </button>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Section */}
          <BugStats bugs={bugs} />

          {/* Search and Filters */}
          <div className="mb-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search bugs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>

              {/* Filters */}
              <div className="flex gap-2">
                <select
                  value={filters.status}
                  onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-sm"
                >
                  <option value="">All Status</option>
                  <option value="open">Open</option>
                  <option value="in-progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                  <option value="closed">Closed</option>
                </select>

                <select
                  value={filters.severity}
                  onChange={(e) => setFilters(prev => ({ ...prev, severity: e.target.value }))}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-sm"
                >
                  <option value="">All Severity</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>

                <select
                  value={filters.priority}
                  onChange={(e) => setFilters(prev => ({ ...prev, priority: e.target.value }))}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-sm"
                >
                  <option value="">All Priority</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Loading State */}
          {loading ? (
            <LoadingSpinner />
          ) : (
            <BugList
              bugs={filteredBugs}
              onEdit={setEditingBug}
              onDelete={handleDeleteBug}
            />
          )}

          {/* Bug Form Modal */}
          {(showForm || editingBug) && (
            <BugForm
              bug={editingBug}
              onSubmit={editingBug ? 
                (data) => handleUpdateBug(editingBug._id, data) : 
                handleCreateBug
              }
              onCancel={() => {
                setShowForm(false);
                setEditingBug(null);
              }}
            />
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;