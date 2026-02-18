export interface AnalysisResult {
  healthScore: number;
  condition: 'Healthy' | 'Warning' | 'Critical';
  issues: string[];
  recommendations: string[];
  summary: string;
}

export interface DroneImage {
  id: string;
  url: string; // Base64 or Object URL
  name: string;
  uploadDate: string;
  status: 'pending' | 'analyzing' | 'completed' | 'error';
  analysis: AnalysisResult | null;
}

export interface AppContextType {
  dataset: DroneImage[];
  addImages: (files: File[]) => Promise<void>;
  analyzeImage: (id: string) => Promise<void>;
  deleteImage: (id: string) => void;
}
