
import React, { useState } from 'react';
import { ActivityInput } from './components/ActivityInput';
import { ActivityTimeline } from './components/ActivityTimeline';
import { DashboardStats } from './components/DashboardStats';
import { Header } from './components/Header';
import { parseActivityLog } from './services/geminiService';
import { getProjectByCode } from './services/projectService';
import type { Activity } from './types';

const App: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleParseLog = async (log: string) => {
    setIsLoading(true);
    setError(null);
    setActivities([]);
    try {
      const parsedActivities = await parseActivityLog(log);
      
      // Enrich with Projects Master data (Step 3: Linking Phase)
      const activitiesWithMeta = parsedActivities.map((activity, index) => {
        const projectDetails = getProjectByCode(activity.project_code);
        return {
          ...activity,
          id: Date.now() + index,
          project_details: projectDetails,
          // If Section 15 was not inferred by AI but exists in Project Master, use Master
          section15: activity.section15 || projectDetails?.section15_main || null
        };
      });

      setActivities(activitiesWithMeta);
    } catch (err) {
      console.error(err);
      setError('Failed to parse logs. Ensure API Key is set and text contains valid EMS activities.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateActivity = (updatedActivity: Activity) => {
    setActivities(prevActivities =>
      prevActivities.map(activity =>
        activity.id === updatedActivity.id ? updatedActivity : activity
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-5">
            <ActivityInput onParse={handleParseLog} isLoading={isLoading} />
          </div>
          
          {/* Output Section */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
             {activities.length > 0 && !isLoading && (
                <DashboardStats activities={activities} />
             )}
             <ActivityTimeline 
                activities={activities} 
                isLoading={isLoading} 
                error={error} 
                onUpdateActivity={handleUpdateActivity} 
             />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
