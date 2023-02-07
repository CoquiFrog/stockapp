import React, { useState } from "react";
import "../styling/Home.css";
import ExcelInput from "./ExcelInput";
import DateConversion from '../functions/DateConversion';
import DownloadExcel from "../functions/DownloadExcel";
import SplitExcel from "../functions/SplitExcel";
import FileNameInput from "./FileNameInput";
import ChunkAmountInput from "./ChunkAmountInput";
import Constants from '../constants/Constants';
import StyleConfig from '../constants/StyleConfig';

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
                <div className="margin-top-30">
                    <ExcelInput grabExcelDataAndSetToState={grabExcelDataAndSetToState} />
                </div>
                <div className="margin-top-10">
                    <FileNameInput setFileNameToDownload={setFileNameToDownload}/>
                </div>
                <div className="margin-top-20">
                    <ChunkAmountInput setChunkAmountForClipping={setChunkAmountForClipping}/>
                </div>
                {/* <div className="margin-top-20">
                    <button onClick={hideHighLowOrNot}>Hide:{JSON.stringify(hideHighLowColumns)}</button>
                </div>
                <div className="margin-top-20">
                    <button onClick={saveExcelFile}>Save</button>
                </div> */}
                {/* <div className="margin-top-20">
                    <button onClick={flipArray}>Flip Data</button>
                </div> */}
                {/* <div className="margin-top-20">
                    <button onClick={showCurrentData}>Show Data</button>
                </div> */}
                {/* <div className="margin-top-20">
                    <button onClick={showThings}>show things</button>

                </div>
                <div className="margin-top-20">
                    <button onClick={splitterDatePrice}>Price Date</button>

                </div>
                <div className="margin-top-20">
                    <button onClick={splitterDatePriceHighLow}>High Low W/ Numbers</button>

                </div> */}
                {/* <div className="margin-top-30">
                    <button onClick={splitterHighLowNoNumbers} className="button-33">High Low No Numbers</button>
                </div> */}
                <div className="margin-top-20">
                    <button className="button-33" onClick={saveExcelFile}>{StyleConfig.DOWNLOAD_BUTTON_TEXT}</button>
                    {/* <button onClick={saveExcelFile}>{StyleConfig.DOWNLOAD_BUTTON_TEXT}</button> */}

                </div>


            <table key="tableKey" className="margin-top-20 table-center ">
                <thead>
                    <tr>
                        <th className="column-padding" scope="col">date</th>
                        <th className="column-padding" scope="col">price</th>
                        <th className="column-padding" scope="col">high</th>
                        <th className="column-padding" scope="col">low</th>
                    </tr>
                </thead>
                <tbody>
                    {excelData && excelData.map((data) => 
                        <tr key={data.Date}>
                            <th className="column-padding">{data.Date}</th>
                            <td className="column-padding">{data.Price}</td>
                            <th className="column-padding">{data.High}</th>
                            <td className="column-padding">{data.Low}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Home;
