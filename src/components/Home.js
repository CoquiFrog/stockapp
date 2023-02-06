import React, { useState } from "react";
import "../styling/Home.css";
import ExcelInput from "./ExcelInput";
import DateConversion from '../functions/DateConversion';
import DownloadExcel from "../functions/DownloadExcel";
import SplitExcel from "../functions/SplitExcel";
import FileNameInput from "./FileNameInput";
import ChunkAmountInput from "./ChunkAmountInput";
import Constants from '../constants/Constants';

const myStyle = {
    color: '#ffffff',
    backgroundColor: '7FCDFE',
};


export const Home = () => {
    const [excelData, setExcelData] = useState(Constants.DUMMY_OBJECT_BIG);
    const [fileName, setFileName] = useState('testFile');
    const [chunkAmount, setChunkAmount] = useState(28);
    const [hideHighLowColumns, setHideHighLowColumns] = useState(false)

    const grabExcelDataAndSetToState = (val) => {
        // filter dates before setting to state
        // trim all the fat off leaving only date and price
        val.map((day) => {
            // delete day.Low;
            delete day.Open;
            // delete day.High;
            delete day["Vol."];
            delete day["Change %"];
            day.Date = DateConversion(day.Date);
        })
        setExcelData(val);

        // Clipboard command for saving JSON data
        // navigator.clipboard.writeText(JSON.stringify(val));
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
        console.log('nothing here: ');
    }

    const splitterDatePrice = () => {
        const newArrayWithoutHighLow = excelData.map((day) => {
            delete day.Low;
            delete day.High;
            return day;
        })
        SplitExcel(newArrayWithoutHighLow, parseInt(chunkAmount), fileName, false, hideHighLowColumns);
    }

    const splitterDatePriceHighLow = () => {
        SplitExcel(excelData, parseInt(chunkAmount), fileName, true, hideHighLowColumns);
    }

    const splitterHighLowNoNumbers = () => {
        const newArrayWithoutHighLowNumbers = excelData.map((day) => {
            day.High = "";
            day.Low = "";
            return day;
        })
        SplitExcel(newArrayWithoutHighLowNumbers, parseInt(chunkAmount), fileName, true, hideHighLowColumns);
    }
        
    const showThings = () => {
        console.log('showthings: ', hideHighLowColumns);
    }

    const hideHighLowOrNot = () => {
        setHideHighLowColumns(!hideHighLowColumns)
    }
    
        
        
        return (
            <div>
            <ExcelInput grabExcelDataAndSetToState={grabExcelDataAndSetToState} />
            <FileNameInput setFileNameToDownload={setFileNameToDownload} />
            <ChunkAmountInput setChunkAmountForClipping={setChunkAmountForClipping}/>
            <button onClick={hideHighLowOrNot}>Hide:{JSON.stringify(hideHighLowColumns)}</button>

            <button onClick={saveExcelFile}>Save</button>
            <button onClick={flipArray}>Flip Data</button>
            <button onClick={showCurrentData}>Show Data</button>
            <button onClick={showThings}>show things</button>
            <button onClick={splitterDatePrice}>Price Date</button>
            <button onClick={splitterDatePriceHighLow}>High Low W/ Numbers</button>
            <button onClick={splitterHighLowNoNumbers}>High Low No Numbers</button>

            <table key="tableKey" className="table container">
                <thead>
                    <tr>
                        <th scope="col">date</th>
                        <th scope="col">price</th>
                        <th scope="col">high</th>
                        <th scope="col">low</th>
                    </tr>
                </thead>
                <tbody>
                    {excelData && excelData.map((data) => 
                        <tr key={data.Date}>
                            <th>{data.Date}</th>
                            <td>{data.Price}</td>
                            <th>{data.High}</th>
                            <td>{data.Low}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Home;
