import React from "react";
import "../styling/Home.css";

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
            <span className="placeholder">Chunk Amount</span>
        </label>
    </div>
    )
}

export default ChunkAmountInput;
