import React from "react";
import { motion } from "framer-motion";

function UploadCard({ getRootProps, getInputProps, isDragActive }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div
        {...getRootProps()}
        className="bg-gray-800 border-2 border-dashed border-blue-400 rounded-lg p-8 cursor-pointer hover:border-blue-300 transition-colors"
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-4 text-center">
          <svg
            className="w-12 h-12 text-blue-400"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <p className="text-lg text-gray-300">
            {isDragActive
              ? "Drop the image here..."
              : "Drag and drop an image of a potato plant leaf to process"}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default UploadCard;
