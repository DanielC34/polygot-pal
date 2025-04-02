import React, { ChangeEvent } from "react";
import { IconLanguage } from "@tabler/icons-react";

interface LanguageSelectorProps {
  selectedLanguage: string; // The currently selected language
  setSelectedLanguage: (language: string) => void; // Function to update the selected language
  languages: string[]; // Array of available languages
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  selectedLanguage,
  setSelectedLanguage,
  languages,
}) => {
  return (
    <span className="cursor-pointer rounded-full space-x-1 pl-2 bg-black flex flex-row items-center">
      <IconLanguage size={20} />
      <select
        value={selectedLanguage}
        onChange={(e: ChangeEvent<HTMLSelectElement>) =>
          setSelectedLanguage(e.target.value)
        }
        className="bg-black flex flex-row py-1 rounded-full text-white cursor-pointer"
      >
        {languages.map((language) => (
          <option
            key={language} // Use the language string as the key
            value={language} // Use the language string as the value
            className="bg-black text-white"
          >
            {language} {/* Display the language name */}
          </option>
        ))}
      </select>
    </span>
  );
};

export default LanguageSelector;
