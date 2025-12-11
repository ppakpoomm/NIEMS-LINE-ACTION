
import React, { useState } from 'react';
import { SparklesIcon } from './icons/SparklesIcon';

const initialLog = `#EMSLOG
project: F-69-2-98-10-1-00-2
kpi: KPI-18
type: Meeting
region: North
place: เชียงใหม่
note: ประชุมหารือแนวทางพัฒนาระบบ EMS รองรับนักท่องเที่ยวต่างชาติ
- ประเด็นหลัก: ทดลองระบบแจ้งเตือนเคสฉุกเฉินผ่านแอป
- ผู้เข้าร่วม: สสจ., รพศ., ตำรวจท่องเที่ยว

#วันที่ 1 ตุลาคม 2567 เวลา 08.30 น. – 09.20 น.
ศูนย์นเรนทร ประชุมรับส่งเวรประจำวัน รายงานปัญหา UCEP และหารือแนวทางแก้ไข 
ณ ห้อง D1669 ชั้น 2 อาคารสถาบันการแพทย์ฉุกเฉินแห่งชาติ

#EMSLOG
type: IT Support
note: กลุ่มดิจิทัลการแพทย์ฉุกเฉินให้บริการสนับสนุนผู้ใช้งาน
1. ตอบปัญหาการใช้งาน โปรแกรม ITEMS 4.0
2. แจ้งติดตั้งโปรแกรมพื้นฐานเครื่องโน๊ตบุ๊กให้พนักงานใหม่
`;

interface ActivityInputProps {
  onParse: (log: string) => void;
  isLoading: boolean;
}

export const ActivityInput: React.FC<ActivityInputProps> = ({ onParse, isLoading }) => {
  const [log, setLog] = useState(initialLog);

  const handleParseClick = () => {
    onParse(log);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 flex flex-col h-[75vh]">
      <label htmlFor="activity-log" className="block text-lg font-semibold text-gray-800 mb-2">
        Paste Activity Log
      </label>
      <p className="text-sm text-gray-500 mb-4">
        Supports structured <code>#EMSLOG</code> format or unstructured text.
      </p>
      <textarea
        id="activity-log"
        className="w-full flex-grow p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out text-sm leading-6 resize-none font-mono"
        value={log}
        onChange={(e) => setLog(e.target.value)}
        placeholder="Paste your logs here..."
      />
      <div className="mt-6">
        <button
          onClick={handleParseClick}
          disabled={isLoading}
          className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Parsing...
            </>
          ) : (
            <>
              <SparklesIcon className="w-5 h-5 mr-2" />
              Parse with AI
            </>
          )}
        </button>
      </div>
    </div>
  );
};
