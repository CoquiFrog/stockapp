import React, { useState } from "react";
import "../styling/Home.css";
import * as XLSX from "xlsx";
import ReadExcel from "../functions/ReadExcel";
import ExcelInput from "./ExcelInput";
import DateConversion from '../functions/DateConversion';
import DownloadExcel from "../functions/DownloadExcel";
import FileNameInput from "./FileNameInput";
import Splitter from "../functions/Splitter";

export const Home = () => {
    const [excelData, setExcelData] = useState([]);
    const [fileName, setFileName] = useState('testFile');

    const grabExcelDataAndSetToState = (val) => {
        console.log('Here you are: ', val);
        // filter dates before setting to state
        val.map((day) => {
            // console.log('day: ', day);
            delete day.Low;
            delete day.Open;
            delete day.High;
            delete day["Vol."];
            delete day["Change %"];
            day.Date = DateConversion(day.Date);
        })
        // trim all the fat off leaving only date and price
        // then set to state
        setExcelData(val);
    }

    const setFileNameToDownload = (val) => {
        console.log('i am working: ', val);
        setFileName(val);
    }
    
    const saveExcelFile = () => {
        console.log('excelData: ', excelData);
        DownloadExcel(excelData, fileName)
    }
    
    const flipArray = () => {
        const deepCloneExcelDataForceRefresh = [...excelData];
        const flippedArray = deepCloneExcelDataForceRefresh.reverse();
        setExcelData(flippedArray);
    }
    
    const showCurrentData = () => {
        console.log(excelData)
    }

    const splitterFunctionFire = () => {
        Splitter(excelData, 23);
    }


    
    return (
        <div>
            <ExcelInput grabExcelDataAndSetToState={grabExcelDataAndSetToState} />
            <FileNameInput setFileNameToDownload={setFileNameToDownload} />
            <button onClick={saveExcelFile}>Save</button>
            <button onClick={flipArray}>Flip Data</button>
            <button onClick={showCurrentData}>Show Data</button>
            <button onClick={splitterFunctionFire}>splitter</button>
            <table key="tableKey" className="table container">
                <thead>
                    <tr>
                        <th scope="col">date</th>
                        <th scope="col">price</th>
                    </tr>
                </thead>
                <tbody>
                    {excelData && excelData.map((data) => 
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

// const dummyData = [
//     {
//         Date: "2022-12-22",
//         Price: "150.33"
//     },
//     {
//         Date: "2022-11-22",
//         Price: "140.33"
//     },
//     {
//         Date: "2022-10-22",
//         Price: "130.33"
//     },
//     {
//         Date: "2022-9-22",
//         Price: "120.33"
//     },
//     {
//         Date: "2022-8-22",
//         Price: "110.33"
//     },
// ];