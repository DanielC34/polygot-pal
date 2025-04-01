import React, { useState, useEffect } from "react";
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

interface UseTranslateProps {
  sourceText: string; // The text to be translated
  selectedLanguage: string; // The target language for translation
}

const useTranslate = ({ sourceText, selectedLanguage }: UseTranslateProps) => {
  const [targetText, setTargetText] = useState<string>(""); // State for the translated text

  useEffect(() => {
    const handleTranslate = async (sourceText: string) => {
      try {
        const response = await openai.chat.completions.create({
          model: "gpt-4o",
          messages: [
            {
              role: "user",
              content: `You will be provided with a sentence. This sentence: 
              ${sourceText}. Your tasks are to:
              - Detect what language the sentence is in
              - Translate the sentence into ${selectedLanguage}
              Do not return anything other than the translated sentence.`,
            },
          ],
        });

          // Assuming the response contains the translated text
          const data = response.choices[0].message.content;
        setTargetText(data);
      } catch (error) {
        console.error("Translation error:", error);
      }
    };

    if (sourceText) {
      handleTranslate(sourceText);
    }
  }, [sourceText, selectedLanguage]);

  return targetText; // Return the translated text
};

export default useTranslate;
