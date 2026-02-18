import React, { createContext, useState, useCallback, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Methodology from './pages/Methodology';
import Upload from './pages/Upload';
import Dashboard from './pages/Dashboard';
import Results from './pages/Results';
import { AppContextType, DroneImage } from './types';
import { analyzeCropImageWithGemini } from './services/gemini';

// Create Context
export const AppContext = createContext<AppContextType | null>(null);

// ScrollToTop Component
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  const [dataset, setDataset] = useState<DroneImage[]>([]);

  const addImages = useCallback(async (files: File[]) => {
    const newImages: DroneImage[] = await Promise.all(
      files.map(async (file) => {
        return new Promise<DroneImage>((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            resolve({
              id: Math.random().toString(36).substr(2, 9),
              url: e.target?.result as string,
              name: file.name,
              uploadDate: new Date().toISOString(),
              status: 'pending',
              analysis: null,
            });
          };
          reader.readAsDataURL(file);
        });
      })
    );
    setDataset((prev) => [...prev, ...newImages]);
  }, []);

  const updateImageStatus = (id: string, status: DroneImage['status'], analysis?: any) => {
    setDataset((prev) =>
      prev.map((img) =>
        img.id === id ? { ...img, status, analysis: analysis || img.analysis } : img
      )
    );
  };

  const analyzeImage = useCallback(async (id: string) => {
    const imageToAnalyze = dataset.find((img) => img.id === id);
    if (!imageToAnalyze) return;

    updateImageStatus(id, 'analyzing');

    try {
      const result = await analyzeCropImageWithGemini(imageToAnalyze.url);
      updateImageStatus(id, 'completed', result);
    } catch (error) {
      console.error("Analysis failed", error);
      updateImageStatus(id, 'error');
    }
  }, [dataset]);

  const deleteImage = useCallback((id: string) => {
    setDataset((prev) => prev.filter(img => img.id !== id));
  }, []);

  return (
    <AppContext.Provider value={{ dataset, addImages, analyzeImage, deleteImage }}>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen bg-slate-50">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/methodology" element={<Methodology />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/results" element={<Results />} />
            </Routes>
          </main>
          <footer className="bg-emerald-900 text-emerald-200 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm">
              <p>&copy; {new Date().getFullYear()} AgroScan AI. All rights reserved.</p>
              <p className="mt-2">Empowering Agriculture with Artificial Intelligence.</p>
            </div>
          </footer>
        </div>
      </Router>
    </AppContext.Provider>
  );
};

export default App;
