import React from "react";
import "../styling/Home.css";
import ReadDatesByExcelDateSheets from "../functions/ReadDatesByExcelDateSheets";

export const GrabFractalByDateInput = (props) => {
    return (
        <div>
            <label className="button-33">{props.buttonText}
            <input
                type="file"
                className="hideWhileScreenReaderAccessible"
                onChange={(e) => {
                    const file = e.target.files[0];
                    ReadDatesByExcelDateSheets(file, props);
                }}
            />
            </label>
        </div>
    )
}

export default GrabFractalByDateInput;