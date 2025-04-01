import React from "react";
import { IconLanguage } from "@tabler/icons-react";

const LanguageSelector = ({
  selectedLanguage,
  setSelectedLanguage,
  languages,
}) => {
  return (
    <span className="cursor-pointer rounded-full space-x-1 pl-2 bg-black flex flex-row items-center">
      <IconLanguage size={20} />
      <select
        value={selectedLanguage}
        onChange={(e) => setSelectedLanguage(e.target.value)}
        className="bg-black flex flex-row py-1 rounded-full text-white cursor-pointer"
      >
        {languages.map((language) => (
          <option
            key={language.code}
            value={language.code}
            className="bg-black text-white"
          >
            {language.name}
          </option>
        ))}
      </select>
    </span>
  );
};

export default LanguageSelector;
