import React from "react";
import "../styling/Home.css";
import StyleConfig from "../constants/StyleConfig";

export const StartDateInput = (props) => {
    return (
        <div>
        <label className="custom-field one">
        <input
            type="string"
            value={props.startDate}
            placeholder=" "
            onChange={(e) => props.setStartDateToState(e.target.value)}
        />
            <span className="placeholder">{StyleConfig.PLACEHOLDER_START_DATE}</span>
        </label>
    </div>
    )
}

export default StartDateInput;
