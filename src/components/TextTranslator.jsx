import React, { useState, useEffect } from "react";
import axios from "axios";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import mic from "../assets/images/mic.svg";
import stop from "../assets/images/stop.svg";
import volume from "../assets/images/volume.svg";
import copyIcon from "../assets/images/copy.svg";
import "../styles/TextTranslator.css";

const TextTranslator = () => {
  const [from, setFrom] = useState("en"); // Source language
  const [to, setTo] = useState("hi"); // Target language
  const [inputText, setInputText] = useState(""); // Input text
  const [outputText, setOutputText] = useState(""); // Translated text
  const [languages, setLanguages] = useState([]); // Available languages
  const [outputTextCopied, setOutputTextCopied] = useState(false); // Output text copy status
  const [inputTextCopied, setInputTextCopied] = useState(false); // Input text copy status
  const [isListening, setIsListening] = useState(false); // Listening status

  // Speech recognition hooks
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  // Effect hook to update input text with transcript
  useEffect(() => {
    if (transcript) {
      setInputText(transcript);
    }
  }, [transcript]);

  // Effect hook to fetch available languages on component mount
  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await axios.get("https://libretranslate.com/languages", { headers: { accept: "application/json" } });
        setLanguages(response.data);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchLanguages();
  }, []);

  // Translate input text
  const handleTranslate = async () => {
    try {
      const response = await axios.post(
        "https://text-translator-be.onrender.com/translator/translate-input-text",
        {
          inputText: inputText,
          fromLang: from,
          toLang: to,
        }
      );
      setOutputText(response.data.translatedText);
    } catch (error) {
      console.error("Translation error:", error);
    }
  };

  // Speak input text
  const handleSourceSpeech = () => {
    let utterance = new SpeechSynthesisUtterance(inputText);
    speechSynthesis.speak(utterance);
  };

  // Speak translated text
  const handleTargetSpeech = () => {
    console.log("Output Text:", outputText);
    console.log("Target Language:", to);

    if (outputText && to) {
      let utterance = new SpeechSynthesisUtterance(outputText);
      utterance.lang = to;
      speechSynthesis.speak(utterance);
    } else {
      console.error("No output text or target language is not set.");
    }
  };

  // Copy output text to clipboard
  const handleCopyoutputText = () => {
    navigator.clipboard.writeText(outputText).then(() => {
      setOutputTextCopied(true); // Change copy status to true
      setTimeout(() => {
        setOutputTextCopied(false); // Reset copy status after 1 second
      }, 1000);
    });
  };

  // Copy input text to clipboard
  const handleCopyinputText = () => {
    navigator.clipboard.writeText(inputText).then(() => {
      setInputTextCopied(true); // Change copy status to true
      setTimeout(() => {
        setInputTextCopied(false); // Reset copy status after 1 second
      }, 1000);
    });
  };

  // Reset input text and transcript
  const handleReset = () => {
    resetTranscript();
    setInputText("");
  };

  // Clear translated text
  const handleClearText = () => {
    setOutputText("");
  };

  // Start listening
  const handleStartListening = () => {
    SpeechRecognition.startListening({ continuous: true });
    setIsListening(true);
  };

  // Stop listening
  const handleStopListening = () => {
    SpeechRecognition.stopListening();
    setIsListening(false);
  };
  //error handling as asked in the description
  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div className="translator-container">
      <div className="translator-main">
        <div className="translator-column">
          <div className="translator-controls">
            <img onClick={handleStartListening} width={"20px"} src={mic} alt="Mic" />
            <img className={isListening ? "translator-listening" : ""} onClick={handleStopListening} src={stop} width={"25px"} alt="Stop" />
            <button onClick={handleReset}>Reset</button>
            <select onChange={(e) => setFrom(e.target.value)} value={from} style={{ color: "#04b0ad" }}>
              <option value="en">English</option>
              {languages.map((item, i) => (
                <option key={i} value={item.code}>
                  {item.name}
                </option>
              ))}
            </select>
            <img onClick={handleSourceSpeech} width={"25px"} src={volume} alt="Volume" />
            {inputText && !inputTextCopied && ( // Show copy icon only when there's text and it hasn't been copied
              <img onClick={handleCopyinputText} src={copyIcon} width={"25px"} alt="Copy" />
            )}
            {inputTextCopied && ( // Show a message or change icon color when text is copied
              <span style={{ color: "orange", marginTop: "20px" }}>Copied!</span>
            )}
          </div>
          <textarea onChange={(e) => setInputText(e.target.value)} value={inputText} placeholder="Source text goes here.." rows={15} cols={50} style={{ fontSize: "16px" }}></textarea>
        </div>

        <div className="translator-column">
          <div className="translator-controls">
            <button onClick={handleClearText}>Clear</button>
            <select onChange={(e) => setTo(e.target.value)} value={to} style={{ color: "#04b0ad" }}>
              <option value="hi">Hindi</option>
              {languages.map((item, i) => (
                <option key={i} value={item.code}>
                  {item.name}
                </option>
              ))}
            </select>
            <img onClick={handleTargetSpeech} width={"25px"} src={volume} alt="Volume" />
            {outputText && !outputTextCopied && ( // Show copy icon only when there's text and it hasn't been copied
              <img onClick={handleCopyoutputText} src={copyIcon} width={"25px"} alt="Copy" />
            )}
            {outputTextCopied && ( // Show a message or change icon color when text is copied
              <span style={{ color: "orange", marginTop: "20px" }}>Copied..!</span>
            )}
          </div>
          <textarea readOnly value={outputText} placeholder="Translated Language.." rows={15} cols={50} style={{ backgroundColor: "#f7fafa", fontSize: "16px", color: "#484bf7" }}></textarea>
        </div>
      </div>
      <button onClick={handleTranslate} style={{ width: "150px", height: "40px", fontSize: "20px" }}>
        Translate
      </button>
    </div>
  );
};

export default TextTranslator;