import React, { useState } from "react";
import "../styling/Home.css";
// import * as XLSX from "xlsx";
import ReadExcel from "../functions/ReadExcel";
import StyleConfig from "../constants/StyleConfig";

export const ExcelInput = (props) => {
    return (
        <div>
            <label className="button-33 height-32">{StyleConfig.EXCEL_INPUT_BUTTON_TEXT}
            <input
                type="file"
                className="hideWhileScreenReaderAccessible"
                onChange={(e) => {
                    const file = e.target.files[0];
                    ReadExcel(file, props);
                }}
            />
            </label>
        </div>
    )
}

export default ExcelInput;


