import React, { useState, useEffect } from "react";

function TextToSpeechRecorder() {
  let beginNumber = 0;
  const [jsonData, setJsonData] = useState(null);
  const [Timeline, setTimeline] = useState([]);
  const [INDEX, setINDEX] = useState(0);
  const [error, setError] = useState(null);

  // ================== HOTKEY LISTENER ==================
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "F8") {
        setTimeout(() => {
          if (!jsonData) return alert("Upload file trước đã!");
          try {
            handleTextToSpeech(0, jsonData.slice(beginNumber));
          } catch (err) {
            alert("Lỗi dữ liệu đầu vào.");
            console.log(err);
          }
        }, 3000);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [jsonData]);

  // ================== TTS ==================
  const handleTextToSpeech = (n, jsonDataFN) => {
    setINDEX(n);
    const utterance = new SpeechSynthesisUtterance(jsonDataFN[n].text);
    utterance.rate = jsonDataFN[n].rate || 1;
    const voices = window.speechSynthesis.getVoices();
    utterance.voice = voices[jsonDataFN[n].lang] || null;
    const objTimeline = { id: jsonDataFN[n].audioCode, begin: "", end: "" };
    utterance.onstart = () => {
      objTimeline.begin = Date.now();
    };
    utterance.onend = () => {
      objTimeline.end = Date.now();
      setTimeline((D) => [...D, objTimeline]);
      setTimeout(() => {
        if (n + 1 < jsonDataFN.length) {
          handleTextToSpeech(n + 1, jsonDataFN);
        }
      }, 2000);
    };
    utterance.onerror = () => {
      setError("Error in speech synthesis");
    };
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeech = () => {
    window.speechSynthesis.cancel();
  };

  // ================== FILE UPLOAD ==================
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const fileContent = e.target.result;
      if (file.name.endsWith(".json")) {
        try {
          const parsedData = JSON.parse(fileContent);
          setJsonData(Array.isArray(parsedData) ? parsedData : [parsedData]);
          setError(null);
        } catch {
          setError("Invalid JSON file.");
          setJsonData(null);
        }
      } else if (file.name.endsWith(".txt")) {
        try {
          const parsed = JSON.parse(fileContent);
          setJsonData(Array.isArray(parsed) ? parsed : [parsed]);
          setError(null);
        } catch {
          setJsonData([
            {
              text: fileContent,
              rate: 1,
              lang: 0,
              audioCode: "txt_" + Date.now(),
            },
          ]);
          setError(null);
        }
      } else {
        setError("Unsupported file type. Please upload .txt or .json.");
      }
    };
    reader.onerror = () => {
      setError("Failed to read file.");
      setJsonData(null);
    };
    reader.readAsText(file);
  };

  // ================== UI ==================
  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>Text → Speech</h1>
      File JSON / TXT
      <input type="file" accept=".txt,.json" onChange={handleFileUpload} />
      <br />
      <button
        onClick={() => {
          if (!jsonData) return alert("Upload file trước đã!");
          try {
            handleTextToSpeech(0, jsonData.slice(beginNumber));
          } catch (err) {
            alert("Lỗi dữ liệu đầu vào.");
            console.log(err);
          }
        }}
      >
        Chạy Text to Speech
      </button>
      <button onClick={stopSpeech}>Dừng đọc</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        {jsonData
          ? Timeline.length + beginNumber + "/" + jsonData.length
          : "Chưa có dữ liệu"}
      </div>
      <div style={{ maxHeight: "300px", overflow: "hidden" }}>
        {JSON.stringify(Timeline)}
      </div>
      <div style={{ maxHeight: "300px", overflow: "auto" }}>
        {jsonData && (
          <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
            {JSON.stringify(jsonData, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
}

export default TextToSpeechRecorder;
