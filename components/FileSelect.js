import React, { useState } from 'react';

import {useSelector, useDispatch} from 'react-redux'
import {SET_DOC} from '../services/reducers/docSlice'

function FileUploader() {
    const [selectedSvg, setSelectedSvg] = useState(null);
    const dispatch = useDispatch();
  
    // Handle file input change
    const handleFileChange = (event) => {
      const file = event.target.files[0];
  
      if (file) {
        // Read the contents of the file as a data URL
        const reader = new FileReader();
        reader.onload = (e) => {
         e.target.result
          dispatch(SET_DOC({
            name: file.name,
            content: e.target.result,
            owner: ''
          }));
          
          
        };
        reader.readAsText(file);
      
      }
    };
  
    return (
      <div>
        {/* File input for selecting an SVG file */}
        <input type="file" accept=".dot" onChange={handleFileChange} />
      </div>
    );
  }
  
  export default FileUploader;