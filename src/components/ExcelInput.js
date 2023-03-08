import React from "react";
import "../styling/Home.css";
import ReadExcel from "../functions/ReadExcel";
export const ExcelInput = (props) => {
    return (
        <div>
            <label className="button-33">{props.buttonText}

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


