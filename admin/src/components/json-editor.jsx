import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";

export default function JsonEditor({ initialValue, onSave }) {
  const [value, setValue] = useState("");
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    if (initialValue) {
      try {
        // Eğer initialValue bir string değilse JSON.stringify ile stringe çevirelim
        const jsonString = typeof initialValue === "string" 
          ? initialValue 
          : JSON.stringify(initialValue, null, 2);
        setValue(jsonString);
      } catch (error) {
        console.error("JSON parse error:", error);
        setValue("");
        setIsValid(false);
      }
    }
  }, [initialValue]);

  const handleEditorChange = (value) => {
    setValue(value);
    try {
      JSON.parse(value);
      setIsValid(true);
    } catch (error) {
      setIsValid(false);
    }
  };

  const handleSave = () => {
    if (isValid) {
      try {
        const parsedJson = JSON.parse(value);
        onSave(parsedJson);
      } catch (error) {
        console.error("JSON parse error on save:", error);
      }
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow border rounded-md overflow-hidden">
        <Editor
          height="70vh"
          defaultLanguage="json"
          value={value}
          onChange={handleEditorChange}
          options={{
            minimap: { enabled: false },
            formatOnPaste: true,
            formatOnType: true,
            automaticLayout: true,
          }}
          theme="vs-dark"
        />
      </div>
      <div className="mt-4 flex justify-between items-center">
        <div>
          {!isValid && (
            <p className="text-red-500">Geçersiz JSON formatı</p>
          )}
        </div>
        <button
          onClick={handleSave}
          disabled={!isValid}
          className={`px-4 py-2 rounded-md ${isValid ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
        >
          Kaydet
        </button>
      </div>
    </div>
  );
}