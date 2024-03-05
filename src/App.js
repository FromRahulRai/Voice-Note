import React, { useState } from 'react';
import './App.css';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import useClipboard from "react-use-clipboard";

function App() {

  const [speechCopy, setSpeechCopy] = useState();

  const [isCopied, setCopied] = useClipboard(speechCopy);

  const startListening = () => SpeechRecognition.startListening({ continuous: true, language: 'en-IN' })

  const { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition()

  if (!browserSupportsSpeechRecognition) {
    return null
  }

  const handleRefreshClick = () => {
    resetTranscript(); // Reset the transcript to an empty string
    setSpeechCopy(""); // Clear the copied speech text
  };


  return (
    <div className="App">
      <div className="container">
        <h2>Voice To Text </h2>
        <br />
        <p>This application will help you to convert your speech to text by using this you can create notes and do any other tasks.</p>

        <div className="main-content" onClick={() => setSpeechCopy(transcript)}>
          {transcript}
        </div>

        <div className="btn-style">
          <button onClick={setCopied}>
            {isCopied ? "Speech Copied!" : "Copy Speech"}
          </button>
          <button onClick={startListening}>Start Speech</button>
          <button onClick={SpeechRecognition.stopListening}>Stop Speech</button>
          <button onClick={handleRefreshClick}>Reset Speech</button>
        </div>
      </div>
    </div>
  );
}

export default App;