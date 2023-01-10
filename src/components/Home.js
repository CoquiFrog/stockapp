import React, { useState } from "react";
import "../styling/Home.css";
import * as XLSX from "xlsx";
import ReadExcel from "../functions/ReadExcel";
import ExcelInput from "./ExcelInput";

export const Home = () => {
    const [excelData, setExcelData] = useState([]);

    const grabExcelDataAndSetToState = (val) => {
        setExcelData(val);
    }

    const fireTestButton = () => {
        console.log('excelData: ', excelData);
    }


    return (
        <div>
            <ExcelInput grabExcelDataAndSetToState={grabExcelDataAndSetToState} />
            <button onClick={fireTestButton}>test me</button>
            <table className="table container">
                <thead>
                    <tr>
                        <th scope="col">date</th>
                        <th scope="col">price</th>
                    </tr>
                </thead>
                <tbody>
                    {excelData.map((data) => 
                        <tr key={data.Date}>
                            <th>{data.Date}</th>
                            <td>{data.Price}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Home;