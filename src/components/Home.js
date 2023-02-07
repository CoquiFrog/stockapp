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
import NameDial from '../functions/NameDial';

export const Home = () => {
    const [amountOfFunctions, setAmountOfFunctions] = useState(9);
    const [excelData, setExcelData] = useState(Constants.DUMMY_OBJECT_BIG);
    const [fileName, setFileName] = useState('testFile');
    const [chunkAmount, setChunkAmount] = useState(28);
    const [hideHighLowColumns, setHideHighLowColumns] = useState(false)
    const [menuNumber, setMenuNumber] = useState(1);

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

    const addMenuNumber = () => {
        console.log('menuNumber: ', menuNumber);
        if (menuNumber <= amountOfFunctions) {
            setMenuNumber(menuNumber + 1);
        }
    }
    const subtractMenuNumber = () => {
        console.log('menuNumber: ', menuNumber);
        if (menuNumber >= 2) {
            setMenuNumber(menuNumber - 1);
        }
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
        console.log('showthings: ');
    }

    const hideHighLowOrNot = () => {
        setHideHighLowColumns(!hideHighLowColumns)
    }
    
    const downloadExcelFile = () => {
        const functionArray = [
            showThings, saveExcelFile, splitterDatePrice, splitterDatePriceHighLow, splitterHighLowNoNumbers
        ]
        // console.log('check: ', functionArray[menuNumber - 1])
        functionArray[menuNumber - 1]();
        // functionArray[menuNumber]();

    }
        
        
        return (
            <div>
                <div className="margin-top-30">
                    <ExcelInput grabExcelDataAndSetToState={grabExcelDataAndSetToState} />
                </div>
                <div className="margin-top-10">
                    <FileNameInput setFileNameToDownload={setFileNameToDownload}/>
                </div>
                <div className="margin-top-10">
                    <ChunkAmountInput setChunkAmountForClipping={setChunkAmountForClipping}/>
                </div>
                <div className="display-flex flex-direction-row justify-content-center margin-top-10">
                    <button className="button-33 margin-right-25 height-40" onClick={subtractMenuNumber}>-</button>
                    <div className="width-140"><p className="position-relative position-within-div">{NameDial(menuNumber)}</p></div>
                    <button className="button-33 margin-left-25 height-40" onClick={addMenuNumber}>+</button>
                </div>
                <div className="margin-top-10 ">
                    <button className="button-33" onClick={downloadExcelFile}>{StyleConfig.DOWNLOAD_BUTTON_TEXT}</button>
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
