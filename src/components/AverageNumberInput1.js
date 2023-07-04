import React from "react";
import "../styling/Home.css";
import StyleConfig from "../constants/StyleConfig";

export const AverageNumberInput1 = (props) => {
    return (
        <div>
        <label className="custom-field one">
        <input
            className="averageBoxWidth"
            type="number"
            value={props.averageAmount1}
            placeholder=" "
            onChange={(e) => props.setAverageAmountForNum1(e.target.value)}
        />
            <span className="placeholder">{StyleConfig.PLACEHOLDER_CHUNK_AMOUNT_INPUT}</span>
        </label>
    </div>
    )
}

export default AverageNumberInput1;
