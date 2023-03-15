import React from "react";
import "../styling/Home.css";
import StyleConfig from "../constants/StyleConfig";

export const ChunkAmountInput = (props) => {
    return (
        <div>
        <label className="custom-field one">
        <input
            type="number"
            value={props.chunkAmount}
            placeholder=" "
            onChange={(e) => props.setChunkAmountForClipping(e.target.value)}
        />
            <span className="placeholder">{StyleConfig.PLACEHOLDER_CHUNK_AMOUNT_INPUT}</span>
        </label>
    </div>
    )
}

export default ChunkAmountInput;
