
import React from 'react';
import type { Activity } from '../types';

interface DashboardStatsProps {
  activities: Activity[];
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({ activities }) => {
  if (!activities || activities.length === 0) return null;

  // Group by Section 15
  const sectionCounts = activities.reduce((acc, curr) => {
    // Extract short name "15(X)"
    const rawSection = curr.section15 || 'Unmapped';
    const key = rawSection.split(' ')[0]; 
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Group by Program (from Project Details)
  const programCounts = activities.reduce((acc, curr) => {
    const program = curr.project_details?.program_name_th || 'Non-Project / General';
    acc[program] = (acc[program] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
        <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        Portfolio Dashboard (FY2569)
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Program Distribution */}
        <div>
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">By Program (แผนงาน)</h3>
          <div className="space-y-3">
            {Object.entries(programCounts).map(([name, count]) => (
              <div key={name} className="relative">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-700 font-medium truncate w-3/4">{name}</span>
                  <span className="text-gray-900 font-bold">{count}</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full w-full">
                  <div 
                    className="h-full bg-indigo-500 rounded-full" 
                    style={{ width: `${(count / activities.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 15 Distribution */}
        <div>
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">By Section 15 (มาตรา 15)</h3>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(sectionCounts).map(([key, count]) => (
              <div key={key} className="flex items-center justify-between p-2 bg-gray-50 rounded border border-gray-100">
                <span className="text-xs text-gray-600 font-medium">{key}</span>
                <span className="text-sm font-bold text-blue-600">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
