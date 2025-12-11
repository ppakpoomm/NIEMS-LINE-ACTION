import React from 'react';
import type { Activity } from '../types';
import { ActivityCard } from './ActivityCard';

interface ActivityTimelineProps {
  activities: Activity[];
  isLoading: boolean;
  error: string | null;
  onUpdateActivity: (activity: Activity) => void;
}

const groupActivitiesByDate = (activities: Activity[]): Record<string, Activity[]> => {
  return activities.reduce((acc, activity) => {
    const date = activity.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(activity);
    return acc;
  }, {} as Record<string, Activity[]>);
};

const formatDate = (dateString: string) => {
    try {
        const date = new Date(dateString);
        const gregorianYear = date.getFullYear();
        const buddhistYear = gregorianYear + 543;
        
        const datePart = new Intl.DateTimeFormat('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
        }).format(date);

        return `${datePart}, ${buddhistYear} (${gregorianYear})`;
    } catch(e) {
        return dateString;
    }
};

const SkeletonCard: React.FC = () => (
  <div className="animate-pulse bg-white p-4 rounded-lg shadow border border-gray-200">
    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
    <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
    <div className="space-y-2">
      <div className="h-3 bg-gray-200 rounded w-full"></div>
      <div className="h-3 bg-gray-200 rounded w-5/6"></div>
    </div>
  </div>
);

export const ActivityTimeline: React.FC<ActivityTimelineProps> = ({ activities, isLoading, error, onUpdateActivity }) => {
  const groupedActivities = groupActivitiesByDate(activities);
  const sortedDates = Object.keys(groupedActivities).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Structured Timeline</h2>
      
      {isLoading && (
        <div className="space-y-6">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      )}

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md" role="alert">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      )}

      {!isLoading && !error && activities.length === 0 && (
         <div className="flex flex-col items-center justify-center h-96 bg-white rounded-xl shadow-md border border-gray-200 text-center p-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">No Activities to Display</h3>
            <p className="mt-1 text-sm text-gray-500">Paste your log and click "Parse with AI" to see the results here.</p>
        </div>
      )}

      {!isLoading && !error && sortedDates.length > 0 && (
        <div className="space-y-8">
          {sortedDates.map(date => (
            <div key={date}>
              <h3 className="text-lg font-semibold text-blue-700 bg-blue-50 px-3 py-1.5 rounded-full inline-block mb-4">
                {formatDate(date)}
              </h3>
              <div className="relative pl-8 border-l-2 border-gray-300">
                <div className="absolute top-1 -left-[9px] w-4 h-4 bg-blue-600 rounded-full border-4 border-white"></div>
                <div className="space-y-6">
                  {groupedActivities[date].map((activity) => (
                    <ActivityCard key={activity.id} activity={activity} onSave={onUpdateActivity} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};