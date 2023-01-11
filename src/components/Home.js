import React, { useState } from "react";
import "../styling/Home.css";
import * as XLSX from "xlsx";
import ReadExcel from "../functions/ReadExcel";
import ExcelInput from "./ExcelInput";
import DateConversion from '../functions/DateConversion';
import DownloadExcel from "../functions/DownloadExcel";
import FileNameInput from "./FileNameInput";
const dummyData = [
    {
        Date: "2022-12-22",
        Price: "150.33"
    },
    {
        Date: "2022-11-22",
        Price: "140.33"
    },
    {
        Date: "2022-10-22",
        Price: "130.33"
    },
    {
        Date: "2022-9-22",
        Price: "120.33"
    },
    {
        Date: "2022-8-22",
        Price: "110.33"
    },
];

export const Home = () => {
    const [excelData, setExcelData] = useState([]);
    const [fileName, setFileName] = useState('testFile');

    const grabExcelDataAndSetToState = (val) => {
        setExcelData(val);
    }

    const setFileNameToDownload = (val) => {
        console.log('i am working: ', val);
        setFileName(val);
    }

    const fireTestButton = () => {
        console.log('excelData: ', excelData);
        DownloadExcel(dummyData, fileName)
    }

    // const fireTestButton2 = () => {
    //     console.log(fileName);
    // }


    return (
        <div>
            <ExcelInput grabExcelDataAndSetToState={grabExcelDataAndSetToState} />
            <FileNameInput setFileNameToDownload={setFileNameToDownload} />
            <button onClick={fireTestButton}>Download</button>
            {/* <button onClick={fireTestButton2}>test me2</button> */}
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
                            <th>{DateConversion(data.Date)}</th>
                            <td>{data.Price}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Home;