import React from 'react';
import { Bug, AlertCircle, CheckCircle, Clock } from 'lucide-react';

const BugStats = ({ bugs }) => {
  const stats = {
    total: bugs.length,
    open: bugs.filter(bug => bug.status === 'open').length,
    inProgress: bugs.filter(bug => bug.status === 'in-progress').length,
    resolved: bugs.filter(bug => bug.status === 'resolved').length,
    critical: bugs.filter(bug => bug.severity === 'critical').length
  };

  const StatCard = ({ title, value, icon: Icon, color, bgColor }) => (
    <div className={`${bgColor} rounded-xl p-6 border border-gray-200`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
      <StatCard
        title="Total Bugs"
        value={stats.total}
        icon={Bug}
        color="bg-blue-500"
        bgColor="bg-white"
      />
      <StatCard
        title="Open"
        value={stats.open}
        icon={AlertCircle}
        color="bg-red-500"
        bgColor="bg-white"
      />
      <StatCard
        title="In Progress"
        value={stats.inProgress}
        icon={Clock}
        color="bg-yellow-500"
        bgColor="bg-white"
      />
      <StatCard
        title="Resolved"
        value={stats.resolved}
        icon={CheckCircle}
        color="bg-green-500"
        bgColor="bg-white"
      />
      <StatCard
        title="Critical"
        value={stats.critical}
        icon={AlertCircle}
        color="bg-purple-500"
        bgColor="bg-white"
      />
    </div>
  );
};

export default BugStats;