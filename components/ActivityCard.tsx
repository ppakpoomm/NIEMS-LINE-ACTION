import React, { useState } from 'react';
import type { Activity } from '../types';
import { ClockIcon } from './icons/ClockIcon';
import { LocationIcon } from './icons/LocationIcon';
import { TagIcon } from './icons/TagIcon';
import { UsersIcon } from './icons/UsersIcon';
import { EditIcon } from './icons/EditIcon';
import { SaveIcon } from './icons/SaveIcon';
import { XCircleIcon } from './icons/XCircleIcon';
import { ACTIVITY_TYPES, REGIONS, SECTION15_MASTER } from '../constants';

interface ActivityCardProps {
  activity: Activity;
  onSave: (activity: Activity) => void;
}

const CategoryBadge: React.FC<{ category: string }> = ({ category }) => {
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
      <TagIcon className="w-3 h-3 mr-1.5" />
      {category}
    </span>
  );
};

const Section15Badge: React.FC<{ section: string | null }> = ({ section }) => {
  if (!section) return null;
  const shortCode = section.split(' ')[0]; // "15(1)"
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
      {shortCode}
    </span>
  );
};

export const ActivityCard: React.FC<ActivityCardProps> = ({ activity, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  
  // Safe initialization of form state with participants flattened to a string
  const [formState, setFormState] = useState(() => {
    const participants = Array.isArray(activity?.participants) ? activity.participants : [];
    return {
      ...activity,
      participantsStr: participants.join(', '),
    };
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const participantsList = (formState.participantsStr || '')
      .split(',')
      .map(p => p.trim())
      .filter(p => p.length > 0);

    const updatedActivity: Activity = {
      ...formState,
      participants: participantsList,
    };
    
    // Remove the temporary string field from the object
    delete (updatedActivity as any).participantsStr;
    
    onSave(updatedActivity);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="bg-white p-5 rounded-xl shadow-lg border border-blue-300">
        <div className="flex justify-between items-center mb-4">
             <h4 className="text-sm font-bold text-gray-500 uppercase">Edit Log</h4>
             <button onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-gray-600">
                 <XCircleIcon className="w-5 h-5" />
             </button>
        </div>
        
        <div className="space-y-4">
            <div>
                <label className="block text-xs font-bold text-gray-500 uppercase">Summary</label>
                <input 
                    name="summary" 
                    value={formState.summary} 
                    onChange={handleInputChange} 
                    className="w-full mt-1 border-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-blue-500 focus:border-blue-500" 
                />
            </div>

            <div>
                <label className="block text-xs font-bold text-gray-500 uppercase">Description</label>
                <textarea 
                    name="description" 
                    rows={3}
                    value={formState.description} 
                    onChange={handleInputChange} 
                    className="w-full mt-1 border-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-blue-500 focus:border-blue-500" 
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase">Type</label>
                    <select 
                        name="activity_type" 
                        value={formState.activity_type} 
                        onChange={handleInputChange} 
                        className="w-full mt-1 border-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                    >
                        {ACTIVITY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase">Section 15</label>
                    <select 
                        name="section15" 
                        value={formState.section15 || ''} 
                        onChange={handleInputChange} 
                        className="w-full mt-1 border-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="">Select...</option>
                        {SECTION15_MASTER.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                </div>
            </div>
             <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase">Project Code</label>
                    <input 
                        name="project_code" 
                        value={formState.project_code || ''} 
                        onChange={handleInputChange} 
                        className="w-full mt-1 border-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-blue-500 focus:border-blue-500" 
                    />
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase">KPI</label>
                    <input 
                        name="kpi_code" 
                        value={formState.kpi_code || ''} 
                        onChange={handleInputChange} 
                        className="w-full mt-1 border-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-blue-500 focus:border-blue-500" 
                    />
                </div>
             </div>
             
             <div>
                <label className="block text-xs font-bold text-gray-500 uppercase">Participants (comma separated)</label>
                <input 
                    name="participantsStr" 
                    value={formState.participantsStr} 
                    onChange={handleInputChange} 
                    placeholder="e.g. John Doe, Jane Smith, IT Team"
                    className="w-full mt-1 border-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-blue-500 focus:border-blue-500" 
                />
            </div>
            
            <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-100">
                <button 
                    onClick={() => setIsEditing(false)} 
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Cancel
                </button>
                <button 
                    onClick={handleSave} 
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-sm"
                >
                    <SaveIcon className="w-4 h-4 mr-2" />
                    Save Changes
                </button>
            </div>
        </div>
      </div>
    );
  }

  const { project_details } = activity;
  // Ensure safe access to participants for display
  const displayParticipants = Array.isArray(activity.participants) ? activity.participants : [];

  return (
    <div className="relative bg-white p-5 rounded-xl shadow-lg border border-gray-200 group hover:border-blue-300 transition-colors">
      <div className="absolute top-6 -left-[41px] w-4 h-4 bg-white rounded-full border-2 border-gray-300"></div>
      
      <button 
        onClick={() => setIsEditing(true)} 
        className="absolute top-3 right-3 p-1.5 text-gray-400 hover:text-blue-600 rounded-full hover:bg-blue-50 opacity-0 group-hover:opacity-100 transition-all"
        title="Edit Activity"
      >
          <EditIcon className="w-4 h-4" />
      </button>

      {/* Header Badges */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
         <CategoryBadge category={activity.activity_type} />
         <Section15Badge section={activity.section15} />
         {activity.region && (
             <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded border border-gray-200">
                {activity.region}
             </span>
         )}
      </div>

      <h4 className="text-base font-bold text-gray-900 leading-tight pr-8 mb-2">
        {activity.summary}
      </h4>

      {/* Project Card Integration (If matched) */}
      {project_details ? (
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 mb-3 text-sm">
              <div className="flex items-start">
                  <div className="flex-shrink-0 pt-0.5">
                      <svg className="h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                  </div>
                  <div className="ml-2">
                      <p className="font-semibold text-slate-700">{project_details.project_code}</p>
                      <p className="text-slate-600 mt-0.5">{project_details.project_name_th}</p>
                      <div className="mt-1.5 flex flex-wrap gap-2 text-xs text-slate-500">
                          <span className="bg-white px-1.5 py-0.5 rounded border border-slate-200">{project_details.program_name_th}</span>
                          <span className="bg-white px-1.5 py-0.5 rounded border border-slate-200">{project_details.owner_org_unit}</span>
                      </div>
                  </div>
              </div>
          </div>
      ) : activity.project_code && (
           <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2 mb-3 text-sm flex items-center text-yellow-800">
               <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
               </svg>
               Project Code "{activity.project_code}" not found in Master.
           </div>
      )}

      <p className="text-sm text-gray-600 mb-4 whitespace-pre-wrap">
        {activity.description}
      </p>

      {/* Metadata Footer */}
      <div className="flex flex-col sm:flex-row sm:items-center text-xs text-gray-500 gap-3 border-t border-gray-100 pt-3">
        {activity.time_range && (
          <div className="flex items-center bg-gray-50 px-2 py-1 rounded">
            <ClockIcon className="w-3.5 h-3.5 mr-1 text-gray-400" />
            {activity.time_range}
          </div>
        )}
        
        {activity.location && (
          <div className="flex items-center bg-gray-50 px-2 py-1 rounded">
             <LocationIcon className="w-3.5 h-3.5 mr-1 text-gray-400" />
             {activity.location}
          </div>
        )}

        {displayParticipants.length > 0 && (
          <div className="flex items-center bg-gray-50 px-2 py-1 rounded">
            <UsersIcon className="w-3.5 h-3.5 mr-1 text-gray-400" />
            <span className="truncate max-w-[200px]" title={displayParticipants.join(', ')}>
              {displayParticipants.length} participants
            </span>
          </div>
        )}
        
        {activity.kpi_code && (
            <div className="flex items-center ml-auto bg-green-50 text-green-700 px-2 py-1 rounded border border-green-100 shadow-sm">
                <span className="font-bold mr-1">KPI:</span> {activity.kpi_code}
            </div>
        )}
      </div>
    </div>
  );
};
