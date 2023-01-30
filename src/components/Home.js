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
import ExcelExportHelperModified from './ExcelExportHelperModified'

export const Home = () => {
    const [excelData, setExcelData] = useState([]);
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

    const downloadWithStyle = () => {
        // DownloadExcel(excelData, fileName, true)
        const dummyData = [
    {
        Date: "2022-12-22",
        Price: "150.33",
        Test: "yoyoyoyoyoyo",
        Test2: "gogogogogogogo",
        Test3: "whereAmI"
    },
    {
        Date: "2022-11-22",
        Price: "140.33",
        Test: "yoyoyoyoyoyo",
        Test2: "gogogogogogogo",
        Test3: "43"
    },
    {
        Date: "2022-10-22",
        Price: "130.33",
        Test: "yoyoyoyoyoyo",
        Test2: "gogogogogogogo",
        Test3: "43"
    },
    {
        Date: "2022-9-22",
        Price: "120.33",
        Test: "yoyoyoyoyoyo",
        Test2: "gogogogogogogo",
        Test3: "43"
    },
    {
        Date: "2022-8-22",
        Price: "110.33",
        Test: "yoyoyoyoyoyo",
        Test2: "gogogogogogogo",
        Test3: "44.44"
    },
];
        ExcelExportHelperModified(dummyData);
    }

    const splitterWithStyles = () => {
        const dummyData = [
    {
        Date: "2022-12-22",
        Price: "150.33",
    },
    {
        Date: "2022-11-22",
        Price: "140.33",
    },
    {
        Date: "2022-10-22",
        Price: "130.33",
    },
    {
        Date: "2022-9-22",
        Price: "120.33",
    },
    {
        Date: "2022-8-22",
        Price: "110.33",
    },
    {
        Date: "2022-12-22",
        Price: "150.33",
    },
    {
        Date: "2022-11-22",
        Price: "140.33",
    },
    {
        Date: "2022-10-22",
        Price: "130.33",
    },
    {
        Date: "2022-9-22",
        Price: "120.33",
    },
    {
        Date: "2022-8-22",
        Price: "110.33",
    },
    {
        Date: "2022-12-22",
        Price: "150.33",
    },
    {
        Date: "2022-11-22",
        Price: "140.33",
    },
    {
        Date: "2022-10-22",
        Price: "130.33",
    },
    {
        Date: "2022-9-22",
        Price: "120.33",
    },
    {
        Date: "2022-8-22",
        Price: "110.33",
    },
    {
        Date: "2022-12-22",
        Price: "150.33",
    },
    {
        Date: "2022-11-22",
        Price: "140.33",
    },
    {
        Date: "2022-10-22",
        Price: "130.33",
    },
    {
        Date: "2022-9-22",
        Price: "120.33",
    },
    {
        Date: "2022-8-22",
        Price: "110.33",
    },
    {
        Date: "2022-12-22",
        Price: "150.33",
    },
    {
        Date: "2022-11-22",
        Price: "140.33",
    },
    {
        Date: "2022-10-22",
        Price: "130.33",
    },
    {
        Date: "2022-9-22",
        Price: "120.33",
    },
    {
        Date: "2022-8-22",
        Price: "110.33",
    },
    {
        Date: "2022-12-22",
        Price: "150.33",
    },
    {
        Date: "2022-11-22",
        Price: "140.33",
    },
    {
        Date: "2022-10-22",
        Price: "130.33",
    },
    {
        Date: "2022-9-22",
        Price: "120.33",
    },
    {
        Date: "2022-8-22",
        Price: "110.33",
    },
];
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
            <button onClick={downloadWithStyle}>MAKE THIS WORK</button>
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