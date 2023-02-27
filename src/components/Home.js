import React, { useState, useEffect } from "react";
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
import StockChart from "./StockChart";

export const Home = () => {
    const [amountOfFunctions, setAmountOfFunctions] = useState(9);
    const [excelData, setExcelData] = useState(); //Constants.APPLE_DUMMY_DATA_THREE_YEARS
    const [fileName, setFileName] = useState('Default_File_Name');
    const [chunkAmount, setChunkAmount] = useState(28);
    const [hideHighLowColumns, setHideHighLowColumns] = useState(false)
    const [menuNumber, setMenuNumber] = useState(8);
    const [graphFloor, setGraphFloor] = useState();
    const [graphCeiling, setGraphCeiling] = useState();
    const [showGraph, setShowGraph] = useState(false);
    const [storageBox, setStorageBox] = useState();//Constants.DUMMY_DATA_LARGE
    const [fractalData, setFractalData] = useState([]);
    const [arrayOfFractalHighs, setArrayOfFractalHighs] = useState(); //Constants.APPLE_DUMMY_DATA_FIVE_YEARS_HIGH_FRACTAL
    const [arrayOfFractalLows, setArrayOfFractalLows] = useState(); //Constants.APPLE_DUMMY_DATA_FIVE_YEARS_LOW_FRACTAL
    const [stockChartFractalHighs, setStockChartFractalHighs] = useState();
    const [stockChartFractalLows, setStockChartFractalLows] = useState();
    const [victoryScatterHigh, setVictoryScatterHigh] = useState();
    const [victoryScatterLow, setVictoryScatterLow] = useState();

    useEffect (() => {
        // console.log('Constant: ', Constants.APPLE_DUMMY_DATA_THREE_YEARS_LOW_FRACTAL)
        // const fractalHighBox = [];
        // const fractalLowBox = [];
        // const storageBox = [];
        // console.log('arrayOfFractalhighs: ', arrayOfFractalHighs)
        // Object.values(Constants.APPLE_DUMMY_DATA_THREE_YEARS).map((curr, index, stockDay) => {
        //     arrayOfFractalHighs.includes(DateConversion(stockDay[index].Date)) ? fractalHighBox.push({x: stockDay[index].Date, y: stockDay[index].Price}) : fractalHighBox.push( {x: stockDay[index].Date, y:0 })
        //     arrayOfFractalLows.includes(DateConversion(stockDay[index].Date)) ? fractalLowBox.push({x: stockDay[index].Date, y: stockDay[index].Price}) : fractalLowBox.push( {x: stockDay[index].Date, y:0 })
        //     storageBox.push({x: stockDay.Date, y: stockDay.Price})
        // })
        // // console.log('fractalHighBox: ', fractalHighBox);
        // setStockChartFractalHighs(fractalHighBox);
        // setStockChartFractalLows(fractalLowBox);
    }, [])

    const grabExcelDataAndSetToState = (val) => {
        // filter dates before setting to state
        // trim all the fat off leaving only date and price
        console.log('val: ', val);
        val.map((day) => {
            // delete day.Low;
            delete day.Open;
            // delete day.High;
            delete day["Vol."];
            delete day["Change %"];

            // Toggle this on and off depending on sheets
            // day.Date = DateConversion(day.Date);
        })

        setExcelData(val);
        // setDummyData(Constants.DUMMY_DATA_LARGE_PART1.concat(Constants.DUMMY_DATA_LARGE_PART2));
        // Clipboard command for saving JSON data
        navigator.clipboard.writeText(JSON.stringify(val));

        const arrayOfFractalHighsBox = [];
        const arrayOfFractalLowsBox = [];
        const fractalHighVictoryScatterBox = [];
        const fractalLowVictoryScatterBox = [];
        const lengthOfArray = val.length;
        val.map((day, index, arr) => {
        // Filters out first and last 2 days
            if (index > 2 && index <= (lengthOfArray - 3)) {
                let highCheck1 = arr[index].High > arr[index-2].High;
                let highCheck2 = arr[index].High > arr[index-1].High;
                let highCheck3 = arr[index].High > arr[index+1].High;
                let highCheck4 = arr[index].High > arr[index+2].High;

                let lowCheck1 = arr[index].Low < arr[index-2].Low;
                let lowCheck2 = arr[index].Low < arr[index-1].Low;
                let lowCheck3 = arr[index].Low < arr[index+1].Low;
                let lowCheck4 = arr[index].Low < arr[index+2].Low;

                // Remember this is here in case you input files with date strings instead of excel serial numbers later
                if (highCheck1 && highCheck2 && highCheck3 && highCheck4) {
                    console.log('high frac');
                    if (typeof day.Date === 'string') {
                        arrayOfFractalHighsBox.push(day.Date);
                    }
                    if (typeof day.Date === 'number') {
                        // let fractalHighDay = {x: day.Date, y: day.Price, label: "high", symbol: "circle", fill: "green"}
                        let fractalHighDay = {x: day.Date, y: day.Price, symbol: "circle", fill: "green"}
                        arrayOfFractalHighsBox.push(DateConversion(day.Date));
                        fractalHighVictoryScatterBox.push(fractalHighDay);
                        console.log('test test: ', day.Date, ' and ', day.Price);

                    }
                }
                if (lowCheck1 && lowCheck2 && lowCheck3 && lowCheck4) {
                    console.log('low frac');
                    if (typeof day.Date === 'string') {
                        arrayOfFractalLowsBox.push(day.Date);
                    }
                    if (typeof day.Date === 'number') {
                        // let fractalLowDay = {x: day.Date, y: day.Price, label: "low", symbol: "diamond", fill: "red"}
                        let fractalLowDay = {x: day.Date, y: day.Price, symbol: "diamond", fill: "red"}
                        arrayOfFractalLowsBox.push(DateConversion(day.Date));
                        fractalLowVictoryScatterBox.push(fractalLowDay);

                    }
                }
            }
            return day;
        })

        const storageBox = [];
        const fractalHighBox = [];
        const fractalLowBox = [];
        Object.values(val).map((curr, index, stockDay) => {
            arrayOfFractalHighsBox.includes(DateConversion(stockDay[index].Date)) ? fractalHighBox.push({x: stockDay[index].Date, y: stockDay[index].Price, label: "Look Mom!", symbol: "diamond"}) : fractalHighBox.push( {x: stockDay[index].Date, y:0 })
            arrayOfFractalLowsBox.includes(DateConversion(stockDay[index].Date)) ? fractalLowBox.push({x: stockDay[index].Date, y: stockDay[index].Price}) : fractalLowBox.push( {x: stockDay[index].Date, y:0 })
            storageBox.push({x: stockDay[index].Date, y: stockDay[index].Price})
        })
        // navigator.clipboard.writeText(JSON.stringify(storageBox));
        console.log('LOOK HERE: ', fractalHighVictoryScatterBox)
        setVictoryScatterHigh(fractalHighVictoryScatterBox);
        setVictoryScatterLow(fractalLowVictoryScatterBox);
        calculateGraphCeilingAndFloor(storageBox);
        setStorageBox(storageBox)
        setStockChartFractalHighs(fractalHighBox);
        setStockChartFractalLows(fractalLowBox);
    }

    const grabFractalAndSetToState = (val) => {
        const lengthOfArray = val.length;
        console.log('length of array: ', lengthOfArray);
        const arrayOfFractalHighsBox = [];
        const arrayOfFractalLowsBox = [];
        val.map((day, index, arr) => {
        // Filters out first and last 2 days
            if (index > 2 && index <= (lengthOfArray - 3)) {
                let highCheck1 = arr[index].High > arr[index-2].High;
                let highCheck2 = arr[index].High > arr[index-1].High;
                let highCheck3 = arr[index].High > arr[index+1].High;
                let highCheck4 = arr[index].High > arr[index+2].High;

                let lowCheck1 = arr[index].Low < arr[index-2].Low;
                let lowCheck2 = arr[index].Low < arr[index-1].Low;
                let lowCheck3 = arr[index].Low < arr[index+1].Low;
                let lowCheck4 = arr[index].Low < arr[index+2].Low;

                if (highCheck1 && highCheck2 && highCheck3 && highCheck4) {
                    console.log('high frac');
                    if (typeof day.Date === 'string') {
                        arrayOfFractalHighsBox.push(day.Date);
                    }
                    if (typeof day.Date === 'number') {
                        arrayOfFractalHighsBox.push(DateConversion(day.Date));
                    }
                }
                if (lowCheck1 && lowCheck2 && lowCheck3 && lowCheck4) {
                    console.log('low frac');
                    if (typeof day.Date === 'string') {
                        arrayOfFractalLowsBox.push(day.Date);
                    }
                    if (typeof day.Date === 'number') {
                        arrayOfFractalLowsBox.push(DateConversion(day.Date));
                    }
                }
            }
            return day;
        })

        // const fractalHighBox = [];
        // const fractalLowBox = [];
        // const storageBox = [];
        // Object.values(val).map((curr, index, stockDay) => {
            // arrayOfFractalHighs.includes(stockDay[index].Date) ? fractalHighBox.push({x: stockDay[index].Date, y: stockDay[index].Price}) : fractalHighBox.push( {x: stockDay[index].Date, y:0 })
            // arrayOfFractalLows.includes(stockDay[index].Date) ? fractalLowBox.push({x: stockDay[index].Date, y: stockDay[index].Price}) : fractalLowBox.push( {x: stockDay[index].Date, y:0 })
            // storageBox.push({x: stockDay.Date, y: stockDay.Price})
        // })
        // setStockChartFractalHighs(fractalHighBox);
        // setStockChartFractalLows(fractalLowBox);

        // setFractalData(val);
        navigator.clipboard.writeText(JSON.stringify(arrayOfFractalHighsBox));
        console.log("I FIRED PAUL")
        setArrayOfFractalHighs(arrayOfFractalHighsBox);
        setArrayOfFractalLows(arrayOfFractalLowsBox);


    }

    const grabTestDataAndSetToState = (val) => {
        console.log('grabTestDataAndSetToState', val);
        console.log('array full? ', )
        
        // const copiedClone = val.map(({Date, Price, High, Low}) => ({
        //     Date: DateConversion(Date), Price, High, Low}));
        
        const copiedClone = val.map(({Date, Price}) => ({
                Date, Price, High: arrayOfFractalHighs.includes(Date) ? " " : "", Low: arrayOfFractalLows.includes(Date) ? " " : ""}));
        
        // const copiedClone = val.map((day, index, arr) => {
        //     // console.log('day: ', arrayOfFractalHighs.includes(day.Date));
        //     if (arrayOfFractalHighs.includes(day.Date)) {
        //         // day.High = " High";
        //     }
        //     if (arrayOfFractalLows.includes(day.Date)) {
        //         // day.Low = " Low";
        //     }
        //     return day;
        // })

        setExcelData(copiedClone);
        SplitExcel(copiedClone, parseInt(chunkAmount), fileName, "highAndLow", false);
        // SplitExcel(excelData, parseInt(chunkAmount), fileName, "highAndLow", false);


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
        DownloadExcel(excelData, fileName, true)
    }
    
    
    // Function 2 - Date Price
    const splitterDatePrice = () => {
        const copiedClone = excelData.map(({Date, Price}) => ({
            Date: DateConversion(Date), Price}));
        SplitExcel(copiedClone, parseInt(chunkAmount), fileName, false, false);
    }

    // Function 3 - High Low
    const splitterDatePriceHighLow = () => {
        const copiedClone = excelData.map(({Date, Price, High, Low}) => ({
            Date: DateConversion(Date), Price, High: "", Low: ""}));
        
        SplitExcel(copiedClone, parseInt(chunkAmount), fileName, "highAndLow", false);
    }

    // Function 4 - High Low Numbers
    const splitterHighLowNoNumbers = () => {
        const copiedClone = excelData.map(({Date, Price, High, Low}) => ({
            Date: DateConversion(Date), Price, High, Low}));
        SplitExcel(copiedClone, parseInt(chunkAmount), fileName, "highAndLow", false);
    }

    // Function 5 - High Low Hidden
    const splitterHighLowHideColumns = () => {
        const copiedClone = excelData.map(({Date, Price}) => ({
            Date: DateConversion(Date), Price, High: "", Low: ""}));
        
        SplitExcel(copiedClone, parseInt(chunkAmount), fileName, "highAndLow", true);
    }

    // Function 6 - Flip Array
    const flipArray = () => {
        const deepCloneExcelDataForceRefresh = [...excelData];
        const flippedArray = deepCloneExcelDataForceRefresh.reverse();
        setExcelData(flippedArray);
    }

    const testFunc = () => {
        console.log('I am test func', excelData);


        // excelData.map((day, index, arr) => {
        //     console.log('day: ', arrayOfFractalHighs.includes(day));
        // })
        // SplitExcel(excelData, parseInt(chunkAmount), fileName, "highAndLow", false);
    }
    
    const downloadExcelFile = () => {
        const functionArray = [
            saveExcelFile, splitterDatePrice, splitterDatePriceHighLow, splitterHighLowNoNumbers, splitterHighLowHideColumns, flipArray, HighLowFractal, testFunc
        ]
        functionArray[menuNumber - 1]();
    }

    const HighLowFractal = () => {
        const lengthOfArray = excelData.length;
        console.log('length of array: ', lengthOfArray);
        const copiedClone = excelData.map((day, index, arr) => {
        // Filters out first and last 2 days
            if (index > 2 && index <= (lengthOfArray - 3)) {
                let highCheck1 = arr[index].High > arr[index-2].High;
                let highCheck2 = arr[index].High > arr[index-1].High;
                let highCheck3 = arr[index].High > arr[index+1].High;
                let highCheck4 = arr[index].High > arr[index+2].High;

                let lowCheck1 = arr[index].Low < arr[index-2].Low;
                let lowCheck2 = arr[index].Low < arr[index-1].Low;
                let lowCheck3 = arr[index].Low < arr[index+1].Low;
                let lowCheck4 = arr[index].Low < arr[index+2].Low;

                if (highCheck1 && highCheck2 && highCheck3 && highCheck4) {
                    console.log('HIGH FRACTAL')
                    day.High = " " + day.High;
                }
                if (lowCheck1 && lowCheck2 && lowCheck3 && lowCheck4) {
                    console.log('LOW FRACTAL');
                    day.Low = " " + day.Low
                }
                }

                return day;
            })

        
        SplitExcel(copiedClone, parseInt(chunkAmount), fileName, "highAndLow", false);

    }

    const calculateGraphCeilingAndFloor = (arr) => {
        const yArray = [];
        Object.values(arr).map((stockDay) => {
            yArray.push(stockDay.y);
        })
        const min = Math.min(...yArray)
        const max = Math.max(...yArray);
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
    const testMe = () => {
        console.log('storagebox: ', storageBox);
        console.log('exceldata2: ', excelData);

        // navigator.clipboard.writeText(JSON.stringify(stockChartFractalHighs));

    }

        return (
            <div>
                <button onClick={testMe}>testMe</button>
                {showGraph &&
                    <div>
                        <button className="button-33 margin-top-20" onClick={toggleThings}>{showGraph ? Constants.SHOW_GRAPH_LABEL : Constants.HIDE_GRAPH_LABEL}</button>
                        <div className="margin-top-30">
                            <ExcelInput buttonText={StyleConfig.EXCEL_INPUT_BUTTON_TEXT} grabExcelDataAndSetToState={grabExcelDataAndSetToState} />
                        </div>
                        <div className="margin-top-30">
                            <ExcelInput buttonText={StyleConfig.FRACTAL_INPUT_BUTTON_TEXT} grabExcelDataAndSetToState={grabFractalAndSetToState} />
                        </div>
                        <div className="margin-top-30">
                            <ExcelInput buttonText="test input" grabExcelDataAndSetToState={grabTestDataAndSetToState} />
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
                        {excelData && <table key="tableKey" className="margin-top-20 table-center ">
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
                        </table>}
                    </div>
                }
                {!showGraph &&
                <div>
                        <button className="button-33" onClick={toggleThings}>{showGraph ? Constants.SHOW_GRAPH_LABEL : Constants.HIDE_GRAPH_LABEL}</button>
                    <div className="stock-chart">
                        <StockChart victoryScatterHigh={victoryScatterHigh} victoryScatterLow={victoryScatterLow} stockChartFractalLows={stockChartFractalLows} stockChartFractalHighs={stockChartFractalHighs} storageBox={storageBox} stockChartData={excelData} graphFloor={graphFloor} graphCeiling={graphCeiling}/>
                    </div>
                </div>
                }

        </div>
    )
}

export default Home;



        // const copiedClone2 = excelData.map(({Date, Price, High, Low}) => ({
        //     Date, Price, High: "", Low: ""}));

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