import React from "react";
import "../styling/Home.css";

export const ChunkAmountInput = (props) => {
    return (
            <input
                type="number"
                placeholder="chunk amount"
                value={props.chunkAmount}
                onChange={(e) => props.setChunkAmountForClipping(e.target.value)}
            />
    )
}

export default ChunkAmountInput;