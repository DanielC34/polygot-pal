import React, { useEffect } from 'react'
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { IconMicrophone } from "@tabler/icons-react";

const SpeechRecognitionComponent = ({ setSourceText }) => {
  
  const { transcript, listening } = useSpeechRecognition();

  useEffect(() => {
    setSourceText(transcript)
  }, [transcript, setSourceText]);

  const handleVoiceRecording = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      SpeechRecognition.startListening();
    }
   }

  return (
    <div>
      <IconMicrophone
        size={22}
        onClick={handleVoiceRecording}
        className={`cursor-pointer ${
          listening ? "text-[#fb5607]" : "text-gray-400"
        }` }
      />
    </div>
  );
}

export default SpeechRecognitionComponent;