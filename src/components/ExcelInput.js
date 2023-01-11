import React, { useState } from "react";
import "../styling/Home.css";
import * as XLSX from "xlsx";
import ReadExcel from "../functions/ReadExcel";

export const ExcelInput = (props) => {
    return (
            <input
                type="file"
                onChange={(e) => {
                    const file = e.target.files[0];
                    ReadExcel(file, props);
                }}
            
            />
    )
}

export default ExcelInput;