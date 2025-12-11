
export interface Project {
  project_code: string; // e.g., F-69-2-98-10-1-00-2
  project_name_th: string;
  fiscal_year: number;
  program_code: string;
  program_name_th: string;
  fund_source_code: string; // NIEMS, EMF, RSTI
  owner_org_unit: string;
  section15_main: string | null;
}

export interface Activity {
  id: number;
  date: string;
  time_range: string | null;
  summary: string;
  description: string;
  location: string | null;
  participants: string[];
  
  // List 13: Activity Types
  activity_type: string; 
  
  // List 35: Daily Ops Logs Metadata
  project_code: string | null;
  project_details?: Project; // Enriched data from Projects Master
  
  kpi_code: string | null; // e.g., KPI-18
  
  // List 6: Section 15 Master
  section15: string | null;
  
  // List 16: Locations/Regions
  region: string | null;
  
  org_unit: string | null; // e.g., Strategy Bureau
}
