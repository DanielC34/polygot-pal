import { useEffect, useState } from "react";
import { OpenAI } from "openai";
import debounce from "lodash.debounce";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_API_KEY as string,
  dangerouslyAllowBrowser: true,
  baseURL: "https://models.inference.ai.azure.com",
});

interface UseTranslateReturn {
  translation: string;
  loading: boolean;
}

const useTranslate = (
  sourceText: string,
  selectedLanguage: string
): UseTranslateReturn => {
  const [targetText, setTargetText] = useState<string>(""); // State for the translated text
  const [loading, setLoading] = useState<boolean>(false); // State for loading status

  useEffect(() => {
    if (!sourceText.trim() || !selectedLanguage.trim()) {
      setTargetText("");
      return;
    }

    const translate = async (text: string): Promise<void> => {
      setLoading(true);
      try {
        const promptMessage = `You will be provided with a sentence. This sentence:
${text}
Your tasks are to:
- Detect the language of the sentence.
- Translate the sentence into ${selectedLanguage}.
Do not return anything other than the translated sentence.`;

        const response = await openai.chat.completions.create({
          model: "gpt-4o",
          max_tokens: 4096,
          top_p: 1,
          messages: [
            {
              role: "user",
              content: promptMessage,
            },
          ],
        });

        console.log("OpenAI response:", response); // Debugging log

        // Extract the translated text from the response
        const data = response.choices?.[0]?.message?.content;

        if (typeof data === "string") {
          setTargetText(data); // Set the translated text
        } else {
          console.error("Unexpected response format:", response);
          setTargetText("Translation unavailable.");
        }
      } catch (error) {
        console.error("Error translating text:", error);
        setTargetText("An error occurred while translating. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    const debouncedTranslate = debounce(translate, 300);
    debouncedTranslate(sourceText);

    return () => {
      debouncedTranslate.cancel();
    };
  }, [sourceText, selectedLanguage]);

  return { translation: targetText, loading };
};

export default useTranslate;
