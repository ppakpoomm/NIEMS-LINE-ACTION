import { GoogleGenAI, Type } from "@google/genai";
import type { Activity } from "../types";
import { ACTIVITY_TYPES, REGIONS, SECTION15_MASTER } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      date: { 
        type: Type.STRING, 
        description: "The date in YYYY-MM-DD format (convert Thai BE to AD)." 
      },
      time_range: { type: Type.STRING },
      summary: { type: Type.STRING },
      description: { type: Type.STRING },
      location: { type: Type.STRING },
      participants: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
      },
      activity_type: {
        type: Type.STRING,
        description: `Must be one of: '${ACTIVITY_TYPES.join("', '")}'.`
      },
      project_code: {
        type: Type.STRING,
        description: "Exact Project Code (e.g., F-69-..., I-69-..., EC-69-..., R-69-...). Extract from 'project:' key or body text."
      },
      kpi_code: {
        type: Type.STRING,
        description: "KPI Code (e.g., KPI-18). Extract from 'kpi:' key."
      },
      section15: {
        type: Type.STRING,
        description: `One of 9 mandates: '${SECTION15_MASTER.join("', '")}'. Infer from content if not explicit.`
      },
      region: {
        type: Type.STRING,
        description: `One of: '${REGIONS.join("', '")}'.`
      },
      org_unit: {
        type: Type.STRING,
        description: "The bureau/unit owner (e.g., 'Strategy Bureau')."
      }
    },
    required: ["date", "summary", "description", "activity_type", "section15"]
  }
};

export const parseActivityLog = async (logText: string): Promise<Omit<Activity, 'id'>[]> => {
  const prompt = `
    Role: AI Parser for NIEMS EMS Portfolio System (Schema 40).
    Task: Convert unstructured Thai activity logs into structured 'Daily Ops Logs' (List 35).

    Input Patterns:
    1. Structured: '#EMSLOG' header with keys 'project:', 'kpi:', 'type:', 'section15:'.
    2. Unstructured: Natural language (e.g., "#วันที่ 1 ตุลาคม 2567...").

    Key Extraction Rules:
    - **Project Code**: Look for patterns starting with F-69, I-69, EC-69, R-69.
    - **Section 15**: Map activities to the 9 mandates (e.g., 'Training' -> 15(3) or 15(5)).
    - **Dates**: Convert Thai years (2567 -> 2024, 2568 -> 2025, 2569 -> 2026).
    
    Log Content:
    ---
    ${logText}
    ---
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    const parsedData = JSON.parse(response.text);
    // Validate and sanitize data
    return (Array.isArray(parsedData) ? parsedData : []).map((item: any) => ({
      ...item,
      // Ensure participants is always an array
      participants: (item.participants && Array.isArray(item.participants)) ? item.participants : [],
      // Ensure other fields match expected types if necessary
      project_code: item.project_code || null,
      kpi_code: item.kpi_code || null,
      section15: item.section15 || null,
      region: item.region || null,
      org_unit: item.org_unit || null,
      location: item.location || null,
      time_range: item.time_range || null
    }));
  } catch (error) {
    console.error("Gemini Error:", error);
    throw new Error("Failed to parse log.");
  }
};