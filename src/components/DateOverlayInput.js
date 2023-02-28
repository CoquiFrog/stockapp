import React from "react";
import "../styling/Home.css";
import ReadDates from "../functions/ReadDates";
import StyleConfig from "../constants/StyleConfig";

export const DateOverlayInput = (props) => {
    return (
        <div>
            <label className="button-33">{props.buttonText}
            <input
                type="file"
                className="hideWhileScreenReaderAccessible"
                onChange={(e) => {
                    const file = e.target.files[0];
                    ReadDates(file, props);
                }}
            />
            </label>
        </div>
    )
}

export default DateOverlayInput;


