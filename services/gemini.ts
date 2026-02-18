import { GoogleGenAI, Type, Schema } from "@google/genai";
import { AnalysisResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const analysisSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    healthScore: {
      type: Type.INTEGER,
      description: "A score from 0 to 100 representing overall crop health. 100 is perfect.",
    },
    condition: {
      type: Type.STRING,
      enum: ["Healthy", "Warning", "Critical"],
      description: "The general condition category of the crop.",
    },
    issues: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "List of identified issues (e.g., 'Nitrogen deficiency', 'Pest infestation', 'Water stress').",
    },
    recommendations: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: " actionable recommendations for the farmer.",
    },
    summary: {
      type: Type.STRING,
      description: "A brief 2-sentence summary of the analysis.",
    },
  },
  required: ["healthScore", "condition", "issues", "recommendations", "summary"],
};

export const analyzeCropImageWithGemini = async (base64Image: string): Promise<AnalysisResult> => {
  try {
    // Remove data:image/xxx;base64, prefix if present
    const cleanBase64 = base64Image.split(',')[1] || base64Image;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: "image/jpeg", // Assuming JPEG for simplicity, can be dynamic
              data: cleanBase64,
            },
          },
          {
            text: "Analyze this drone image of agricultural crops. Identify crop health, signs of disease, pests, nutrient deficiencies, or irrigation problems. Act as an expert agronomist.",
          },
        ],
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
        temperature: 0.4, // Lower temperature for more consistent/factual analysis
      },
    });

    if (response.text) {
      return JSON.parse(response.text) as AnalysisResult;
    } else {
        throw new Error("No response text from Gemini");
    }

  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    // Return a fallback error result so the UI doesn't crash
    return {
      healthScore: 0,
      condition: 'Critical',
      issues: ['Analysis Failed', 'AI Service Error'],
      recommendations: ['Check internet connection', 'Try re-uploading the image'],
      summary: 'Failed to analyze image due to an error.',
    };
  }
};
