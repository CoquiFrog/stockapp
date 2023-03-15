import React from "react";
import "../styling/Home.css";
import StyleConfig from "../constants/StyleConfig";


export const EndDateInput = (props) => {
    return (
        <div>
        <label className="custom-field one">
        <input
            type="string"
            value={props.endDate}
            placeholder=" "
            onChange={(e) => props.setEndDateToState(e.target.value)}
        />
            <span className="placeholder">{StyleConfig.PLACEHOLDER_END_DATE}</span>
        </label>
    </div>
    )
}

export default EndDateInput;
