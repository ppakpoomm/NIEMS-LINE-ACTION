
import type { Project } from "../types";

// Mock Data representing "Projects Master 2569" (List 11)
// In a real app, this would be loaded from data/projects_master_2569.csv
const MOCK_PROJECTS: Project[] = [
  {
    project_code: "F-69-2-98-10-1-00-2",
    project_name_th: "จัดซื้อครุภัณฑ์คอมพิวเตอร์ (พัฒนาระบบข้อมูลการแพทย์ฉุกเฉิน)",
    fiscal_year: 2569,
    program_code: "2",
    program_name_th: "แผนงานยุทธศาสตร์เสริมสร้างให้คนมีสุขภาวะที่ดี",
    fund_source_code: "NIEMS",
    owner_org_unit: "สำนักดิจิทัลการแพทย์ฉุกเฉิน",
    section15_main: "15(4) Research & Development"
  },
  {
    project_code: "EC-69-3-02-05-1-00-1",
    project_name_th: "โครงการพัฒนาระบบการแพทย์ฉุกเฉินเพื่อการท่องเที่ยวในพื้นที่เมืองรอง",
    fiscal_year: 2569,
    program_code: "3",
    program_name_th: "แผนงานบูรณาการสร้างรายได้จากการท่องเที่ยว",
    fund_source_code: "EMF",
    owner_org_unit: "สำนักบริหารจัดการระบบการแพทย์ฉุกเฉินพื้นที่ 1",
    section15_main: "15(5) Coordination"
  },
  {
    project_code: "I-69-1-01-01-0-00-1",
    project_name_th: "โครงการพัฒนาศักยภาพบุคลากรเครือข่าย EMS",
    fiscal_year: 2569,
    program_code: "1",
    program_name_th: "แผนงานบุคลากรภาครัฐ",
    fund_source_code: "NIEMS",
    owner_org_unit: "สถาบันการแพทย์ฉุกเฉินแห่งชาติ",
    section15_main: "15(3) Accreditation"
  },
  {
    project_code: "R-69-4-01-01-0-00-1",
    project_name_th: "โครงการวิจัยและนวัตกรรมระบบการแพทย์ฉุกเฉินอัจฉริยะ",
    fiscal_year: 2569,
    program_code: "4",
    program_name_th: "แผนงานบูรณาการรัฐบาลดิจิทัล",
    fund_source_code: "RSTI",
    owner_org_unit: "สำนักวิชาการและมาตรฐาน",
    section15_main: "15(4) Research & Development"
  }
];

export const getProjectByCode = (code: string | null): Project | undefined => {
  if (!code) return undefined;
  // Normalize code (trim, uppercase)
  const normalizedCode = code.trim().toUpperCase();
  return MOCK_PROJECTS.find(p => p.project_code === normalizedCode);
};

export const getAllProjects = (): Project[] => {
  return MOCK_PROJECTS;
};
