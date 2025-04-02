"use client"
import "regenerator-runtime/runtime";
import TextArea from "@/components/InputArea/TextArea";
import SpeechRecognitionComponent from "@/components/SpeechRecognition/SpeechRecognition";
import { cn } from "@/lib/utils";
import React, { useState, ChangeEvent } from "react";
import useTranslate from "@/hooks/useTranslate";
import { rtfToText } from "@/utils/rtfToText"; 
import { IconCopy, IconVolume, IconThumbUp, IconThumbDown, IconStar } from "@tabler/icons-react";
import FileUpload from "@/components/InputArea/FileUpload";
import LinkPaste from "@/components/InputArea/LinkPaste";
import LanguageSelector from "@/components/InputArea/LanguageSelector";

export default function Home() {
  //Define the state for sourceText
  const [sourceText, setSourceText] = useState<string>("");
  //Define the state for copied
  const [copied, setCopied] = useState<boolean>(false);

  //Define the state for favorite
  const [favorite, setFavorite] = useState<boolean>(false);

  const [languages] = useState<string[]>([
    "English",
    "Spanish",
    "French",
    "German",
    "Chinese",
    "Finnish",
    "Japanese",
    "Russian",
    "Italian",
    "Korean",
    "Portuguese",
    "Dutch",
    "Swedish",
    "Norwegian",
    "Danish",
    "Polish",
    "Czech",
    "Hungarian",
    "Turkish",
    "Arabic",
  ]);

  const [selectedLanguage, setSelectedLanguage] = useState<string>("French");

  //Define the state for targetText
  const targetText = useTranslate(sourceText, selectedLanguage);

  const handleAudioPlayback = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

   const handleLinkPaste = async (e: ChangeEvent<HTMLInputElement>) => {
     const link = e.target.value;
     try {
       const response = await fetch(link);
       const data = await response.text();
       setSourceText(data);
     } catch (error) {
       console.error("Error fetching link content:", error);
     } 
   };
  
    const handleCopyToClipboard = () => {
      navigator.clipboard.writeText(targetText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };

    const handleLike = () => {
      // Implement like logic
    };

    const handleDislike = () => {
      // Implement dislike logic
    };

    const handleFavorite = () => {
      setFavorite(!favorite);
      if (!favorite) {
        localStorage.setItem("favoriteTranslation", targetText);
      } else {
        localStorage.removeItem("favoriteTranslation");
      }
    };

    // const handleAudioPlayback = (text: string) => {
    //   const utterance = new SpeechSynthesisUtterance(text);
    //   window.speechSynthesis.speak(utterance);
    // };
  
  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const rtfContent = reader.result as string;
        const text = rtfToText(rtfContent);
        setSourceText(text);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="relative flex h-[50rem] w-full items-center justify-center bg-white dark:bg-black">
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:20px_20px]",
          "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
          "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]"
        )}
      />
      {/* Radial gradient for the container to give a faded look */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
      <div className="relative overflow-hidden h-scree">
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 py-10 sm:py-24">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold text-neutral-200">
              Polygot<span className="text-[#fb5607]">Pal</span>
            </h1>
            <p className="mt-3 text-neutral-400">
              Voices United, Cultures connected!
            </p>

            <div className="mt-7 sm:mt12 mx-auto max-w-3xl relative">
              <div className="grid gap-4 md:grid-cols-2 grid-cols-1 ">
                <div className="relative z-10 flex flex-col space-x-3 border rounded-lg shadow-lg bg-neutral-900 shadow-gray-900/20 border-neutral-700">
                  <TextArea
                    id="source-language"
                    value={sourceText}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                      setSourceText(e.target.value);
                    }}
                    placeholder="Type your message here..."
                  />

                  <div className="flex flex-row justify-between w-full">
                    <span className="space-x-2 flex-row flex items-center cursor-pointer ">
                      <SpeechRecognitionComponent
                        setSourceText={setSourceText}
                      />
                      <IconVolume
                        size={22}
                        onClick={() => handleAudioPlayback(sourceText)}
                      />
                      {/*File upload component comes here */}
                      <FileUpload handleFileUpload={handleFileUpload} />
                      <LinkPaste handleLinkPaste={handleLinkPaste} />
                    </span>

                    <span className="text-sm pr-4">
                      {sourceText.length} / 2000
                    </span>
                  </div>
                </div>

                <div className="relative z-10 flex flex-col space-x-3 border rounded-lg shadow-lg bg-neutral-900 shadow-gray-900/20 border-neutral-700">
                  <TextArea
                    id="target-language"
                    value={targetText}
                    onChange={() => {}}
                    placeholder="Target Language"
                  />
                  <div className="flex flex-row justify-between w-full">
                    <span className="cursor-pointer flex space-x-2 flex-row items-center">
                      <LanguageSelector
                        selectedLanguage={selectedLanguage}
                        setSelectedLanguage={setSelectedLanguage}
                        languages={languages}
                      />
                      <IconVolume
                        size={22}
                        onClick={() => handleAudioPlayback(targetText)}
                      />
                    </span>
                    <div className="flex flex-row items-center space-x-2 pr-4 cursor-pointer">
                      <IconCopy size={22} onClick={handleCopyToClipboard} />
                      {copied && (
                        <span className="text-xs text-green-500">Copied!</span>
                      )}
                      <IconThumbUp size={22} onClick={handleLike} />
                      <IconThumbDown size={22} onClick={handleDislike} />
                      <IconStar
                        size={22}
                        onClick={handleFavorite}
                        className={favorite ? "text-yellow-500" : ""}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

