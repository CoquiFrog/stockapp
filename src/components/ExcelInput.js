import React, { useState } from "react";
import "../styling/Home.css";
// import * as XLSX from "xlsx";
import ReadExcel from "../functions/ReadExcel";

// const myStyle = {
//     display: 'flex',
//     justifyContent: 'flex-start',
//     alignItems: 'center',
//     flexDirection: 'row',
//     width: '20vw',
//     padding: 5,
//     borderStyle: 'solid',
//     borderWidth: 1,
//     borderColor: 'green',
//     borderRadius: 5,
//     color: 'green',
// };

const testStuff = {
    display: 'block',
  position: 'relative',
  width: '200px',
  height: '50px',
  borderRadius: '25px',
  background: 'linear-gradient(40deg, #ff6ec4, #7873f5)',
  boxShadow: '0 4px 7px rgba(0, 0, 0, 0.4)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#fff',
  fontWeight: 'bold',
  cursor: 'pointer',
  transition: 'transform .2s ease-out',


  
  }

  const hideWhileScreenReaderAccessible = {
      opacity: 0,
    width: '0.1px',
    height: '0.1px',
    position: 'absolute',
  }

export const ExcelInput = (props) => {
    return (
        <div>
            <label htmlFor={'excel-button'} className="button-19">
            <input
                id="excel-button"
                type="file"
                style={hideWhileScreenReaderAccessible}
                onChange={(e) => {
                    const file = e.target.files[0];
                    ReadExcel(file, props);
                }}
            />
            </label>
        </div>
    )
}

export default ExcelInput;


