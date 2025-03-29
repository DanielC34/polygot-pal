"use client"
import "regenerator-runtime/runtime";
import TextArea from "@/components/InputArea/TextArea";
import SpeechRecognitionComponent from "@/components/SpeechRecognition/SpeechRecognition";
import { cn } from "@/lib/utils";
import React, { useState, ChangeEvent } from "react";
import { IconVolume } from "@tabler/icons-react";

export default function Home() {
  //Define the state for sourceText
  const [sourceText, setSourceText] = useState<string>("");

  const handleAudioPlayback = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
   }

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
                      <IconVolume size={22}
                        onClick={() => handleAudioPlayback(sourceText)}
                      />
                      {/*File upload component comes here */}
                    </span>
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
