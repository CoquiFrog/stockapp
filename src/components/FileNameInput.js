import React from "react";
import "../styling/Home.css";

export const FileNameInput = (props) => {
    return (
        <div>
            <label className="custom-field one">
                <input
                    type="text"
                    value={props.FileNameInput}
                    placeholder=" "
                    onChange={(e) => props.setFileNameToDownload(e.target.value)}
                />
                <span className="placeholder">File Name</span>
            </label>
        </div>
    )
}

export default FileNameInput;