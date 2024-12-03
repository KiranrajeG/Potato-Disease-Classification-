import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import Header from "./components/Header";
import UploadCard from "./components/UploadCard";
import webBg from "./assets/web_bg.jpg";

function App() {
  const [image, setImage] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    setImage(URL.createObjectURL(file));
    setIsLoading(true);

    // Simulate API call to FastAPI backend
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("http://localhost:8000/predict", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setPrediction({
        Class: data.class, // Change from 'label' to 'class'
        confidence: data.confidence,
      });
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
    },
    multiple: false,
  });

  const handleClear = () => {
    setImage(null);
    setPrediction(null);
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      <div
        className="fixed inset-0 bg-cover bg-center blur-sm"
        style={{
          backgroundImage: `url(${webBg})`,
          zIndex: -1,
        }}
      />

      <Header />

      <main className="flex-1 flex items-center justify-center container mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          <div className="w-full max-w-md">
            {!image ? (
              <UploadCard
                getRootProps={getRootProps}
                getInputProps={getInputProps}
                isDragActive={isDragActive}
              />
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white rounded-lg overflow-hidden shadow-xl"
              >
                <div className="aspect-square relative">
                  <img
                    src={image}
                    alt="Uploaded potato leaf"
                    className="object-cover w-full h-full"
                  />
                </div>

                {isLoading ? (
                  <div className="p-6 flex flex-col items-center gap-4">
                    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    <p className="text-lg font-medium">Predicting...</p>
                  </div>
                ) : (
                  prediction && (
                    <div className="p-6 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">
                            Detected Disease:
                          </p>
                          <p className="text-lg font-semibold">
                            {prediction.Class}
                          </p>
                        </div>
                        {/* <div>
                          <p className="text-sm text-gray-500">Confidence:</p>
                          <p className="text-lg font-semibold">
                            {(prediction.confidence * 100).toFixed(2)}%
                          </p>
                        </div> */}
                      </div>
                      <button
                        onClick={handleClear}
                        className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                      >
                        Clear
                      </button>
                    </div>
                  )
                )}
              </motion.div>
            )}
          </div>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
