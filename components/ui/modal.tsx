"use client"

import React, { useState } from "react";

type ModalProps = {
  elements: string[];
  onConfirm: (values: Record<string, string>) => void;
};

const Modal: React.FC<ModalProps> = ({ elements, onConfirm }) => {
  const [inputValues, setInputValues] = useState<Record<string, string>>({});

  const handleInputChange = (element: string, value: string) => {
    setInputValues((prev) => ({
      ...prev,
      [element]: value,
    }));
  };

  const handleConfirm = () => {
    onConfirm(inputValues);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-11/12 max-w-md p-6 space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Enter Details</h2>

        {elements.map((element) => (
          <div key={element} className="flex flex-col">
            <label className="text-gray-700 font-medium">{element}</label>
            <input
              type="text"
              value={inputValues[element] || ""}
              onChange={(e) => handleInputChange(element, e.target.value)}
              className="mt-1 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder={`Enter ${element}`}
            />
          </div>
        ))}

        <button
          onClick={handleConfirm}
          className="w-full py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors duration-300"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default Modal;
