import React, { useState } from "react";
import "../styling/Home.css";
import * as XLSX from "xlsx";
import ReadExcel from "../functions/ReadExcel";

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