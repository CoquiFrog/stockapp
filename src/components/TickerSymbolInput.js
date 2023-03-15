import React from "react";
import "../styling/Home.css";
import StyleConfig from "../constants/StyleConfig";

export const TickerSymbolInput = (props) => {
    return (
        <div>
        <label className="custom-field one">
        <input
            type="string"
            value={props.tickerSymbol}
            placeholder=" "
            onChange={(e) => props.setTickerSymbol(e.target.value)}
        />
            <span className="placeholder">{StyleConfig.PLACEHOLDER_TICKER_SYMBOL}</span>
        </label>
    </div>
    )
}

export default TickerSymbolInput;
