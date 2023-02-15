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
// import FractalGraph from './components/FractalGraph';
// import FractalGraph from "./FractalGraph";
import StockGraph from "./StockGraph";

export const Home = () => {
    const [amountOfFunctions, setAmountOfFunctions] = useState(9);
    const [excelData, setExcelData] = useState(Constants.DUMMY_OBJECT_BIG);
    const [fileName, setFileName] = useState('Default_File_Name');
    const [chunkAmount, setChunkAmount] = useState(28);
    const [hideHighLowColumns, setHideHighLowColumns] = useState(false)
    const [menuNumber, setMenuNumber] = useState(4);
    const [graphFloor, setGraphFloor] = useState();
    const [graphCeiling, setGraphCeiling] = useState();
    const [showGraph, setShowGraph] = useState(true);

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
        calculateGraphCeilingAndFloor(val);
        setFileName(val);
    }

    // To be passed through child component so child can set parent state
    const setChunkAmountForClipping = (val) => {
        setChunkAmount(val);
    }

    // Function 1 - Save
    const saveExcelFile = () => {
        DownloadExcel(excelData, fileName, true)
    }
    
    
    // Function 2 - Date Price
    const splitterDatePrice = () => {
        const copiedClone = excelData.map(({Date, Price})=> ({Date, Price}));
        SplitExcel(copiedClone, parseInt(chunkAmount), fileName, false, hideHighLowColumns);
    }

    // Function 3 - High Low
    const splitterDatePriceHighLow = () => {
        const copiedClone = excelData.map(({Date, Price, High, Low}) => ({
            Date, Price, High: "", Low: ""}));
        
        SplitExcel(copiedClone, parseInt(chunkAmount), fileName, true, hideHighLowColumns);
    }

    // Function 4 - High Low Numbers
    const splitterHighLowNoNumbers = () => {
        SplitExcel(excelData, parseInt(chunkAmount), fileName, true, hideHighLowColumns);
    }

    // Function 5 - High Low Hidden
    const splitterHighLowHideColumns = () => {
        const copiedClone = excelData.map(({Date, Price}) => ({
            Date, Price, High: "", Low: ""}));
        
        SplitExcel(copiedClone, parseInt(chunkAmount), fileName, true, true);
    }

    // Function 6 - Flip Array
    const flipArray = () => {
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

    const testMe = () => {
        const lengthOfArray = excelData.length;
        console.log('length of array: ', lengthOfArray);
        const copiedClone = excelData.map((day, index, arr) => {
        // Filters out first and last 2 days
            if (index > 2 && index <= (lengthOfArray - 3)) {
            
                let processValue_minus_2 = arr[index-2].High/arr[index-2].Low;
                let processValue_minus_1 = arr[index-1].High/arr[index-1].Low;
                let processValue = arr[index].High/arr[index].Low;
                let processValue_plus_1 = arr[index+1].High/arr[index+1].Low;
                let processValue_plus_2 = arr[index+2].High/arr[index+2].Low;
                if (processValue > processValue_minus_2 && processValue > processValue_minus_1 && processValue > processValue_plus_1 && processValue > processValue_plus_2) {
                    console.log('HIGH FRACTAL')
                    day.High = " " + day.High;
                }
                if (processValue < processValue_minus_2 && processValue < processValue_minus_1 && processValue < processValue_plus_1 && processValue < processValue_plus_2) {
                    console.log('LOW FRACTAL');
                    day.Low = " " + day.Low;
                }
                }

                return day;
        })


        // const copiedClone2 = excelData.map(({Date, Price, High, Low}) => ({
        //     Date, Price, High: "", Low: ""}));
        
        SplitExcel(copiedClone, parseInt(chunkAmount), fileName, true, false);

    }

    const calculateGraphCeilingAndFloor = (arr) => {
        const min = Math.min(...arr)
        const max = Math.max(...arr);
        const difference = max - min;
        const gap = difference * .1;
        const floor = min - gap;
        const ceiling = max + gap;
        setGraphFloor(floor);
        setGraphCeiling(ceiling);
    }

    const toggleThings = () => {
        setShowGraph(!showGraph);
    }

        return (
            <div>
                <button onClick={testMe}>Test</button>
                {showGraph &&
                    <div>
                        <button className="button-33" onClick={toggleThings}>{showGraph ? Constants.SHOW_GRAPH_LABEL : Constants.HIDE_GRAPH_LABEL}</button>
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
                    </div>
                }
                {!showGraph &&
                    <div>
                        <button className="button-33" onClick={toggleThings}>{showGraph ? Constants.SHOW_GRAPH_LABEL : Constants.HIDE_GRAPH_LABEL}</button>
                        <StockGraph excelData={excelData} graphFloor={graphFloor} graphCeiling={graphCeiling}/>
                    </div>
                }

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