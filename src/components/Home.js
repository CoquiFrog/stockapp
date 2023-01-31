import React, { useEffect, useState } from "react";
import "../styling/Home.css";
import ExcelInput from "./ExcelInput";
import DateConversion from '../functions/DateConversion';
import DownloadExcel from "../functions/DownloadExcel";
import SplitExcel from "../functions/SplitExcel";
import FileNameInput from "./FileNameInput";
import ChunkAmountInput from "./ChunkAmountInput";
import moment from 'moment';
import Constants from '../constants/Constants';
import * as XLSX from "xlsx";
import ExcelExportHelper from "./ExcelExportHelper";

export const Home = () => {
    const [excelData, setExcelData] = useState([{"Date":"2022-12-30","Price":129.93},{"Date":"2022-12-29","Price":129.61},{"Date":"2022-12-28","Price":126.04},{"Date":"2022-12-27","Price":130.03},{"Date":"2022-12-23","Price":131.86},{"Date":"2022-12-22","Price":132.23},{"Date":"2022-12-21","Price":135.45},{"Date":"2022-12-20","Price":132.3},{"Date":"2022-12-19","Price":132.37},{"Date":"2022-12-16","Price":134.51},{"Date":"2022-12-15","Price":136.5},{"Date":"2022-12-14","Price":143.21},{"Date":"2022-12-13","Price":145.47},{"Date":"2022-12-12","Price":144.49},{"Date":"2022-12-9","Price":142.16},{"Date":"2022-12-8","Price":142.65},{"Date":"2022-12-7","Price":140.94},{"Date":"2022-12-6","Price":142.91},{"Date":"2022-12-5","Price":146.63},{"Date":"2022-12-2","Price":147.81},{"Date":"2022-12-1","Price":148.31},{"Date":"2022-11-30","Price":148.03},{"Date":"2022-11-29","Price":141.17},{"Date":"2022-11-28","Price":144.22},{"Date":"2022-11-25","Price":148.11},{"Date":"2022-11-23","Price":151.07},{"Date":"2022-11-22","Price":150.18},{"Date":"2022-11-21","Price":148.01},{"Date":"2022-11-18","Price":151.29},{"Date":"2022-11-17","Price":150.72},{"Date":"2022-11-16","Price":148.79},{"Date":"2022-11-15","Price":150.04},{"Date":"2022-11-14","Price":148.28},{"Date":"2022-11-11","Price":149.7},{"Date":"2022-11-10","Price":146.87},{"Date":"2022-11-9","Price":134.87},{"Date":"2022-11-8","Price":139.5},{"Date":"2022-11-7","Price":138.92},{"Date":"2022-11-4","Price":138.38},{"Date":"2022-11-3","Price":138.88},{"Date":"2022-11-2","Price":145.03},{"Date":"2022-11-1","Price":150.65},{"Date":"2022-10-31","Price":153.34},{"Date":"2022-10-28","Price":155.74},{"Date":"2022-10-27","Price":144.8},{"Date":"2022-10-26","Price":149.35},{"Date":"2022-10-25","Price":152.34},{"Date":"2022-10-24","Price":149.45},{"Date":"2022-10-21","Price":147.27},{"Date":"2022-10-20","Price":143.39},{"Date":"2022-10-19","Price":143.86},{"Date":"2022-10-18","Price":143.75},{"Date":"2022-10-17","Price":142.41},{"Date":"2022-10-14","Price":138.38},{"Date":"2022-10-13","Price":142.99},{"Date":"2022-10-12","Price":138.34},{"Date":"2022-10-11","Price":138.98},{"Date":"2022-10-10","Price":140.42},{"Date":"2022-10-7","Price":140.09},{"Date":"2022-10-6","Price":145.43},{"Date":"2022-10-5","Price":146.4},{"Date":"2022-10-4","Price":146.1},{"Date":"2022-10-3","Price":142.45},{"Date":"2022-9-30","Price":138.2},{"Date":"2022-9-29","Price":142.48},{"Date":"2022-9-28","Price":149.84},{"Date":"2022-9-27","Price":151.76},{"Date":"2022-9-26","Price":150.77},{"Date":"2022-9-23","Price":150.43},{"Date":"2022-9-22","Price":152.74},{"Date":"2022-9-21","Price":153.72},{"Date":"2022-9-20","Price":156.9},{"Date":"2022-9-19","Price":154.48},{"Date":"2022-9-16","Price":150.7},{"Date":"2022-9-15","Price":152.37},{"Date":"2022-9-14","Price":155.31},{"Date":"2022-9-13","Price":153.84},{"Date":"2022-9-12","Price":163.43},{"Date":"2022-9-9","Price":157.37},{"Date":"2022-9-8","Price":154.46},{"Date":"2022-9-7","Price":155.96},{"Date":"2022-9-6","Price":154.53},{"Date":"2022-9-2","Price":155.81},{"Date":"2022-9-1","Price":157.96},{"Date":"2022-8-31","Price":157.22},{"Date":"2022-8-30","Price":158.91},{"Date":"2022-8-29","Price":161.38},{"Date":"2022-8-26","Price":163.62},{"Date":"2022-8-25","Price":170.03},{"Date":"2022-8-24","Price":167.53},{"Date":"2022-8-23","Price":167.23},{"Date":"2022-8-22","Price":167.57},{"Date":"2022-8-19","Price":171.52},{"Date":"2022-8-18","Price":174.15},{"Date":"2022-8-17","Price":174.55},{"Date":"2022-8-16","Price":173.03},{"Date":"2022-8-15","Price":173.19},{"Date":"2022-8-12","Price":172.1},{"Date":"2022-8-11","Price":168.49},{"Date":"2022-8-10","Price":169.24},{"Date":"2022-8-9","Price":164.92},{"Date":"2022-8-8","Price":164.87},{"Date":"2022-8-5","Price":165.35},{"Date":"2022-8-4","Price":165.81},{"Date":"2022-8-3","Price":166.13},{"Date":"2022-8-2","Price":160.01},{"Date":"2022-8-1","Price":161.51},{"Date":"2022-7-29","Price":162.51},{"Date":"2022-7-28","Price":157.35},{"Date":"2022-7-27","Price":156.79},{"Date":"2022-7-26","Price":151.6},{"Date":"2022-7-25","Price":152.95},{"Date":"2022-7-22","Price":154.09},{"Date":"2022-7-21","Price":155.35},{"Date":"2022-7-20","Price":153.04},{"Date":"2022-7-19","Price":151},{"Date":"2022-7-18","Price":147.07},{"Date":"2022-7-15","Price":150.17},{"Date":"2022-7-14","Price":148.47},{"Date":"2022-7-13","Price":145.49},{"Date":"2022-7-12","Price":145.86},{"Date":"2022-7-11","Price":144.87},{"Date":"2022-7-8","Price":147.04},{"Date":"2022-7-7","Price":146.35},{"Date":"2022-7-6","Price":142.92},{"Date":"2022-7-5","Price":141.56},{"Date":"2022-7-1","Price":138.93},{"Date":"2022-6-30","Price":136.72},{"Date":"2022-6-29","Price":139.23},{"Date":"2022-6-28","Price":137.44},{"Date":"2022-6-27","Price":141.66},{"Date":"2022-6-24","Price":141.66},{"Date":"2022-6-23","Price":138.27},{"Date":"2022-6-22","Price":135.35},{"Date":"2022-6-21","Price":135.87},{"Date":"2022-6-17","Price":131.56},{"Date":"2022-6-16","Price":130.06},{"Date":"2022-6-15","Price":135.43},{"Date":"2022-6-14","Price":132.76},{"Date":"2022-6-13","Price":131.88},{"Date":"2022-6-10","Price":137.13},{"Date":"2022-6-9","Price":142.64},{"Date":"2022-6-8","Price":147.96},{"Date":"2022-6-7","Price":148.71},{"Date":"2022-6-6","Price":146.14},{"Date":"2022-6-3","Price":145.38},{"Date":"2022-6-2","Price":151.21},{"Date":"2022-6-1","Price":148.71},{"Date":"2022-5-31","Price":148.84},{"Date":"2022-5-27","Price":149.64},{"Date":"2022-5-26","Price":143.78},{"Date":"2022-5-25","Price":140.52},{"Date":"2022-5-24","Price":140.36},{"Date":"2022-5-23","Price":143.11},{"Date":"2022-5-20","Price":137.59},{"Date":"2022-5-19","Price":137.35},{"Date":"2022-5-18","Price":140.82},{"Date":"2022-5-17","Price":149.24},{"Date":"2022-5-16","Price":145.54},{"Date":"2022-5-13","Price":147.11},{"Date":"2022-5-12","Price":142.56},{"Date":"2022-5-11","Price":146.5},{"Date":"2022-5-10","Price":154.51},{"Date":"2022-5-9","Price":152.06},{"Date":"2022-5-6","Price":157.28},{"Date":"2022-5-5","Price":156.77},{"Date":"2022-5-4","Price":166.02},{"Date":"2022-5-3","Price":159.48},{"Date":"2022-5-2","Price":157.96},{"Date":"2022-4-29","Price":157.65},{"Date":"2022-4-28","Price":163.64},{"Date":"2022-4-27","Price":156.57},{"Date":"2022-4-26","Price":156.8},{"Date":"2022-4-25","Price":162.88},{"Date":"2022-4-22","Price":161.79},{"Date":"2022-4-21","Price":166.42},{"Date":"2022-4-20","Price":167.23},{"Date":"2022-4-19","Price":167.4},{"Date":"2022-4-18","Price":165.07},{"Date":"2022-4-14","Price":165.29},{"Date":"2022-4-13","Price":170.4},{"Date":"2022-4-12","Price":167.66},{"Date":"2022-4-11","Price":165.75},{"Date":"2022-4-8","Price":170.09},{"Date":"2022-4-7","Price":172.14},{"Date":"2022-4-6","Price":171.83},{"Date":"2022-4-5","Price":175.06},{"Date":"2022-4-4","Price":178.44},{"Date":"2022-4-1","Price":174.31},{"Date":"2022-3-31","Price":174.61},{"Date":"2022-3-30","Price":177.77},{"Date":"2022-3-29","Price":178.96},{"Date":"2022-3-28","Price":175.6},{"Date":"2022-3-25","Price":174.72},{"Date":"2022-3-24","Price":174.07},{"Date":"2022-3-23","Price":170.21},{"Date":"2022-3-22","Price":168.82},{"Date":"2022-3-21","Price":165.38},{"Date":"2022-3-18","Price":163.98},{"Date":"2022-3-17","Price":160.62},{"Date":"2022-3-16","Price":159.59},{"Date":"2022-3-15","Price":155.09},{"Date":"2022-3-14","Price":150.62},{"Date":"2022-3-11","Price":154.73},{"Date":"2022-3-10","Price":158.52},{"Date":"2022-3-9","Price":162.95},{"Date":"2022-3-8","Price":157.44},{"Date":"2022-3-7","Price":159.3},{"Date":"2022-3-4","Price":163.17},{"Date":"2022-3-3","Price":166.23},{"Date":"2022-3-2","Price":166.56},{"Date":"2022-3-1","Price":163.2},{"Date":"2022-2-28","Price":165.12},{"Date":"2022-2-25","Price":164.85},{"Date":"2022-2-24","Price":162.74},{"Date":"2022-2-23","Price":160.07},{"Date":"2022-2-22","Price":164.32},{"Date":"2022-2-18","Price":167.3},{"Date":"2022-2-17","Price":168.88},{"Date":"2022-2-16","Price":172.55},{"Date":"2022-2-15","Price":172.79},{"Date":"2022-2-14","Price":168.88},{"Date":"2022-2-11","Price":168.64},{"Date":"2022-2-10","Price":172.12},{"Date":"2022-2-9","Price":176.28},{"Date":"2022-2-8","Price":174.83},{"Date":"2022-2-7","Price":171.66},{"Date":"2022-2-4","Price":172.39},{"Date":"2022-2-3","Price":172.9},{"Date":"2022-2-2","Price":175.84},{"Date":"2022-2-1","Price":174.61},{"Date":"2022-1-31","Price":174.78},{"Date":"2022-1-28","Price":170.33},{"Date":"2022-1-27","Price":159.22},{"Date":"2022-1-26","Price":159.69},{"Date":"2022-1-25","Price":159.78},{"Date":"2022-1-24","Price":161.62},{"Date":"2022-1-21","Price":162.41},{"Date":"2022-1-20","Price":164.51},{"Date":"2022-1-19","Price":166.23},{"Date":"2022-1-18","Price":169.8},{"Date":"2022-1-14","Price":173.07},{"Date":"2022-1-13","Price":172.19},{"Date":"2022-1-12","Price":175.53},{"Date":"2022-1-11","Price":175.08},{"Date":"2022-1-10","Price":172.19},{"Date":"2022-1-7","Price":172.17},{"Date":"2022-1-6","Price":172},{"Date":"2022-1-5","Price":174.92},{"Date":"2022-1-4","Price":179.7},{"Date":"2022-1-3","Price":182.01}]);
    const [fileName, setFileName] = useState('testFile');
    const [chunkAmount, setChunkAmount] = useState(10);
    const [sheetNames, setSheetNames] = useState([]);
    const [sheets, setSheets] = useState([]);
    const [saveSpot, setSaveSpot] = useState([]);

    const grabExcelDataAndSetToState = (val) => {
        console.log('VAL: ', val)
        // filter dates before setting to state
        // trim all the fat off leaving only date and price
        val.map((day) => {
            delete day.Low;
            delete day.Open;
            delete day.High;
            delete day["Vol."];
            delete day["Change %"];
            day.Date = DateConversion(day.Date);
        })
        navigator.clipboard.writeText(JSON.stringify(val));
        setExcelData(val);
    }

    const setFileNameToDownload = (val) => {
        setFileName(val);
    }

    const setChunkAmountForClipping = (val) => {
        setChunkAmount(val);
    }
    
    const saveExcelFile = () => {
        DownloadExcel(excelData, fileName, true)
    }
    
    const flipArray = () => {
        const deepCloneExcelDataForceRefresh = [...excelData];
        const flippedArray = deepCloneExcelDataForceRefresh.reverse();
        setExcelData(flippedArray);
    }
    
    const showCurrentData = () => {
        console.log(chunkAmount);
    }

    const splitterFunctionFire = () => {
        SplitExcel(excelData, parseInt(chunkAmount), fileName);
    }

    const splitterWithStyles = () => {
        SplitExcel(excelData, parseInt(chunkAmount), fileName);
    }


        const save2 = () => {
            console.log('MY DATA: ', excelData);
            const DATA_STUFF = [
                {
                  STUDENT_DETAILS: {
                    id: 101,
                    name: "Suman Kumar",
                    parentName: "Suresh Kumar",
                    classroom: "12th",
                    subject: "Non Medical",
                    division: "1st",
                    status: "Pass",
                  },
                  MARKS: {
                    maths: 75,
                    physics: 65,
                    chemistry: 72,
                    english: 62,
                    computerScience: 80,
                  },
                },
                {
                  STUDENT_DETAILS: {
                    id: 102,
                    name: "Rahul Kumar",
                    parentName: "Aatma Ram",
                    classroom: "12th",
                    subject: "Non Medical",
                    division: "1st",
                    status: "Pass",
                  },
                  MARKS: {
                    maths: 70,
                    physics: 75,
                    chemistry: 82,
                    english: 72,
                    computerScience: 60,
                  },
                },
                {
                  STUDENT_DETAILS: {
                    id: 103,
                    name: "Anuj Kumar",
                    parentName: "Ashok Kumar",
                    classroom: "12th",
                    subject: "Non Medical",
                    division: "1st",
                    status: "Pass",
                  },
                  MARKS: {
                    maths: 60,
                    physics: 65,
                    chemistry: 92,
                    english: 77,
                    computerScience: 80,
                  },
                },
              ];

            console.log('HIS DATA: ', DATA_STUFF);
            ExcelExportHelper(DATA_STUFF);
        }

        
        const showThings = () => {
            console.log('showthings: ', );
        }
        
        
        
        return (
            <div>
            <ExcelInput grabExcelDataAndSetToState={grabExcelDataAndSetToState} />
            <FileNameInput setFileNameToDownload={setFileNameToDownload} />
            <ChunkAmountInput setChunkAmountForClipping={setChunkAmountForClipping}/>
            <button onClick={saveExcelFile}>Save</button>
            <button onClick={flipArray}>Flip Data</button>
            <button onClick={showCurrentData}>Show Data</button>
            <button onClick={splitterFunctionFire}>splitter</button>
            <button onClick={save2}>WORKING EXAMPLE</button>
            <button onClick={showThings}>show things</button>
            <button onClick={splitterWithStyles}>Splitter With Styles</button>
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

// This is how to stack one column on top of another
// const stackedOneTopTheOther = [...newData, ...newData];

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

// Converts array of objects to array of arrays
// var output = excelData.map(function(obj) {
//     return Object.keys(obj).sort().map(function(key) { 
//       return obj[key];
//     });
//   });