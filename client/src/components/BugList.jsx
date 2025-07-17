import React from 'react';
import { Edit, Trash2, Calendar, User, AlertTriangle } from 'lucide-react';

const BugList = ({ bugs, onEdit, onDelete }) => {
  const getSeverityColor = (severity) => {
    const colors = {
      low: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-orange-100 text-orange-800',
      critical: 'bg-red-100 text-red-800'
    };
    return colors[severity] || 'bg-gray-100 text-gray-800';
  };

  const getStatusColor = (status) => {
    const colors = {
      open: 'bg-blue-100 text-blue-800',
      'in-progress': 'bg-purple-100 text-purple-800',
      resolved: 'bg-green-100 text-green-800',
      closed: 'bg-gray-100 text-gray-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityIcon = (priority) => {
    const iconColors = {
      low: 'text-green-500',
      medium: 'text-yellow-500',
      high: 'text-red-500'
    };
    return iconColors[priority] || 'text-gray-500';
  };

  if (bugs.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
        <AlertTriangle className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-4 text-lg font-medium text-gray-900">No bugs found</h3>
        <p className="mt-2 text-sm text-gray-500">
          No bugs match your current search and filter criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {bugs.map((bug) => (
        <div
          key={bug._id}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                  {bug.title}
                </h3>
                <AlertTriangle className={`h-4 w-4 ${getPriorityIcon(bug.priority)}`} />
              </div>
              
              <p className="text-gray-700 mb-4 line-clamp-2">
                {bug.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSeverityColor(bug.severity)}`}>
                  {bug.severity}
                </span>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(bug.status)}`}>
                  {bug.status.replace('-', ' ')}
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  {bug.priority} priority
                </span>
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>Reported by {bug.reportedBy}</span>
                </div>
                {bug.assignedTo && (
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span>Assigned to {bug.assignedTo}</span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(bug.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 ml-4">
              <button
                onClick={() => onEdit(bug)}
                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                title="Edit bug"
              >
                <Edit className="h-4 w-4" />
              </button>
              <button
                onClick={() => {
                  if (window.confirm('Are you sure you want to delete this bug?')) {
                    onDelete(bug._id);
                  }
                }}
                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                title="Delete bug"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BugList;