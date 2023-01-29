import React, { useEffect, useState } from "react";
import "../styling/Home.css";
import ExcelInput from "./ExcelInput";
import DateConversion from '../functions/DateConversion';
import DownloadExcel from "../functions/DownloadExcel";
import SplitExcel from "../functions/SplitExcel";
import FileNameInput from "./FileNameInput";
import ChunkAmountInput from "./ChunkAmountInput";
import { saveAs } from 'file-saver';
import moment from 'moment';
import Constants from '../constants/Constants';
import * as XLSX2 from "xlsx";
import ExcelExportHelper from "./ExcelExportHelper";

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

        function datenum(v, date1904) {
            if(date1904) v+=1462;
            var epoch = Date.parse(v);
            return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
        }
        
        function s2ab(s) {
            var buf = new ArrayBuffer(s.length);
            var view = new Uint8Array(buf);
            for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
            return buf;
        }
        
        const sheet_from_array_of_arrays = (data, opts) => {
            console.log('DATA: ', data);
            var ws = {};
            var range = {s: {c:10000000, r:10000000}, e: {c:0, r:0 }};
            for(var R = 0; R != data.length; ++R) {
                // console.log('ws thing: ', ws);
                for(var C = 0; C != data[R].length; ++C) {
                    if(range.s.r > R) range.s.r = R;
                    if(range.s.c > C) range.s.c = C;
                    if(range.e.r < R) range.e.r = R;
                    if(range.e.c < C) range.e.c = C;
                    var cell = {v: data[R][C] };
                    // console.log('cell: ', cell);
                    if(cell.v == null) continue;
                    var cell_ref = XLSX.utils.encode_cell({c:C,r:R});
                    // console.log('cell_ref: ', cell_ref)
                    let dateDataTypeCheck = moment(cell.v, Constants.allPossibleFormats, true).isValid();
                    if(typeof cell.v === 'number') cell.t = 'n';
                    else if(typeof cell.v === 'boolean') cell.t = 'b';

                    else if(dateDataTypeCheck === true) cell.t = 'd';
                    else if(cell.v instanceof Date) {
                        console.log("am I ever firing?")
                        cell.t = 'n'; cell.z = XLSX.SSF._table[14];
                        cell.v = datenum(cell.v);
                    }
                    else cell.t = 's';
                    // First Column
                    if(C == 0){
                        cell.s={
                            // font:{
                            //     bold:true
                            // },
                            // fill:{
                            //     fgColor:{ rgb: "1618EC" }
                            // }
                        }
                    }
                    if(R == 0){
                        cell.s={
                            fill:{
                                fgColor:{ rgb: "FFFFAA00" }
                            }
                        }
                    }
                    if(cell.t === "d"){
                        cell.s={
                            fill:{
                                fgColor:{ rgb: "EC16CC" }
                            }
                        }
                    }
                    // console.log('ws: ', ws)

                    ws[cell_ref] = cell;
                }
            }
            if(range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
            // console.log('FINAL WS: ', ws);
            // console.log('DATA3: ', data);
            return ws;
        }

        const sheet_from_investing_com = () => {
            console.log('hihihihihi')
        }
        
        function Workbook() {
            if(!(this instanceof Workbook)) return new Workbook();
            this.SheetNames = [];
            this.Sheets = {};
        }
        
        const save = () => {
            var data = [[1,2,3,4],["Sample", "Sample", "Sample", "Sample"],["foo","bar","Hello","0.3"], ["baz", null, "qux"],["2021/11/2223343", "2021/11/23", "2021-11-24", "2021-11-25"]]
            // var data = excelData;
            // console.log('data: ', data);
            // console.log('excelData: ', excelData);
            var ws_name = "SheetJS";
            // Converts array of objects to array of arrays
            var output = excelData.map(function(obj) {
                return Object.keys(obj).sort().map(function(key) { 
                  return obj[key];
                });
              });

            var wb = new Workbook(), ws = sheet_from_array_of_arrays(output);
            wb.SheetNames.push(ws_name);
            wb.Sheets[ws_name] = ws;
            // How to add style manually
            // ws["A1"].s.fill.bgColor = {indexed: '64'};
            console.log('WB: ', wb);
            var wbout = XLSX.write(wb, {bookType:'xlsx', bookSST:true, type: 'binary'});
            // How to clip
            // navigator.clipboard.writeText(wbout);

            setSaveSpot(wbout);
            saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), "sample.xlsx")
        }

        const save2 = () => {
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
            console.log('firing, ', DATA_STUFF);
            ExcelExportHelper(DATA_STUFF);
        }

        
        const showThings = () => {
            console.log('showthings: ', );
            var output = excelData.map(function(obj) {
                return Object.keys(obj).sort().map(function(key) { 
                  return obj[key];
                });
              });
              console.log('output: ', output);
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
            <button onClick={save}>magic button</button>
            <button onClick={save2}>fire button</button>
            <button onClick={showThings}>show things</button>
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
