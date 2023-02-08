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
        if (menuNumber <= amountOfFunctions) {
            setMenuNumber(menuNumber + 1);
        }
    }
    const subtractMenuNumber = () => {
        if (menuNumber >= 2) {
            setMenuNumber(menuNumber - 1);
        }
    }

    // To be passed through child component so child can set parent state
    const setFileNameToDownload = (val) => {
        setFileName(val);
    }

    // To be passed through child component so child can set parent state
    const setChunkAmountForClipping = (val) => {
        setChunkAmount(val);
    }

    // Function 1 - Save
    const saveExcelFile = () => {
        console.log('function 1');
        DownloadExcel(excelData, fileName, true)
    }
    
    
    // Function 2 - Date Price
    const splitterDatePrice = () => {
        console.log('function 2');
        // Bobby Cooper Elite Code
        const copiedClone = excelData.map(({Date, Price})=> ({Date, Price}));
        SplitExcel(copiedClone, parseInt(chunkAmount), fileName, false, hideHighLowColumns);
    }
    // Function 3 - High Low
    const splitterDatePriceHighLow = () => {
        console.log('function 3', excelData);
        const copiedClone = excelData.map(({Date, Price, High, Low}) => ({
            Date, Price, High, Low}));
        const newArrayWithNoHighAndLow = copiedClone.map((day) => {
            day.Low = "";
            day.High = "";
            return day;
        })
        console.log('copied clone: ', newArrayWithNoHighAndLow);
        
        SplitExcel(newArrayWithNoHighAndLow, parseInt(chunkAmount), fileName, true, hideHighLowColumns);
    }
    // Function 4 - High Low Numbers
    const splitterHighLowNoNumbers = () => {

        
        console.log('function 4')
        // Bobby Cooper Elite Code
        // const copiedClone = excelData.map(({Date, Price})=> ({Date, Price}));
        
        SplitExcel(excelData, parseInt(chunkAmount), fileName, true, hideHighLowColumns);
    }
    
    

    // Function 5 - High Low Hidden
    const splitterHighLowHideColumns = () => {
        SplitExcel(excelData, parseInt(chunkAmount), fileName, true, true);
    }

    // Function 6 - Flip Array
    const flipArray = () => {
        console.log('function 5');
        const deepCloneExcelDataForceRefresh = [...excelData];
        const flippedArray = deepCloneExcelDataForceRefresh.reverse();
        setExcelData(flippedArray);
    }
    
    const downloadExcelFile = () => {
        const functionArray = [
            saveExcelFile, splitterDatePrice, splitterDatePriceHighLow, splitterHighLowNoNumbers, splitterHighLowHideColumns, flipArray
        ]
        functionArray[menuNumber - 1]();
    }

    const showThings = () => {
        console.log(excelData[0])
    }
        
        
        return (
            <div>
                {/* <button onClick={showThings}>test</button> */}
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

    // Function 2
    // const splitterDatePrice = () => {
    //     console.log('function 2');
    //     const copiedClone = [...excelData];
        
    //     const newArrayWithoutHighLow = copiedClone.map((day) => {
    //         delete day.Low;
    //         delete day.High;
    //         return day;
    //     })
    //     SplitExcel(newArrayWithoutHighLow, parseInt(chunkAmount), fileName, false, hideHighLowColumns);
    // }