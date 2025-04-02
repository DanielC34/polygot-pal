import React, { ChangeEvent } from "react";
import { IconPaperclip } from "@tabler/icons-react";

interface FileUploadProps {
  handleFileUpload: (e: ChangeEvent<HTMLInputElement>) => void; // Type for the file upload handler
}

const FileUpload: React.FC<FileUploadProps> = ({ handleFileUpload }) => {
  return (
    <label
      htmlFor="file-upload"
      className="cursor-pointer flex items-center space-x-2"
    >
      <IconPaperclip size={21} />
      <input
        type="file"
        id="file-upload"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />
    </label>
  );
};

export default FileUpload;
