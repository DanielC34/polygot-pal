import React, { useState } from 'react';
import { IconPaperClip } from '@tabler/icons-react';

const FileUpload = ({ handleFileUpload }) => {
    <label htmlFor="file-upload" className="cursor-pointer">
        <IconPaperClip size={21} />
        <input type="text"
            id='file-upload'
            accept='image/*'
            onChange={handleFileUpload}
            className="hidden"
        />
    </label>
 }