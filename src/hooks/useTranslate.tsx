import { useEffect, useState } from "react";
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_API_KEY as string, // Ensure the API key is a string
  dangerouslyAllowBrowser: true,
});

interface UseTranslateProps {
  sourceText: string; // The text to be translated
  selectedLanguage: string; // The target language for translation
}

const useTranslate = ({
  sourceText,
  selectedLanguage,
}: UseTranslateProps): string => {
  const [targetText, setTargetText] = useState<string>(""); // State for the translated text

  useEffect(() => {
    const handleTranslate = async (text: string): Promise<void> => {
      try {
        const response = await openai.chat.completions.create({
          model: "gpt-4",
          messages: [
            {
              role: "user",
              content: `You will be provided with a sentence. This sentence: 
              ${text}. Your tasks are to:
              - Detect what language the sentence is in
              - Translate the sentence into ${selectedLanguage}
              Do not return anything other than the translated sentence.`,
            },
          ],
        });

        const data = response.choices[0]?.message?.content;
        setTargetText(data ?? "Translation unavailable.");
      } catch (error) {
        console.error("Error translating text:", error);
        setTargetText("An error occurred while translating. Please try again.");
      }
    };

    if (sourceText.trim()) {
      const timeoutId = setTimeout(() => {
        handleTranslate(sourceText);
      }, 200); // Adjust the delay as needed

      return () => clearTimeout(timeoutId);
    }
  }, [sourceText, selectedLanguage]);

  return targetText;
};

export default useTranslate;
