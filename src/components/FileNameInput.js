import React from "react";
import "../styling/Home.css";
// import XLSX from '../../src/xlsx.core.min.js'

export const FileNameInput = (props) => {
    return (
            <input
                type="text"
                placeholder="file name here"
                value={props.FileNameInput}
                onChange={(e) => props.setFileNameToDownload(e.target.value)}
            />
    )
}

export default FileNameInput;