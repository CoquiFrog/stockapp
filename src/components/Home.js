import React, { useState, useEffect } from "react";
import "../styling/Home.css";
import ExcelInput from "./ExcelInput";
import DateConversion from '../functions/DateConversion';
import DownloadExcel from "../functions/DownloadExcel";
import SplitExcel from "../functions/SplitExcel";
import FileNameInput from "./FileNameInput";
import ChunkAmountInput from "./ChunkAmountInput";
import AverageNumberInput1 from "./AverageNumberInput1";
import AverageNumberInput2 from "./AverageNumberInput2";
import AverageNumberInput3 from "./AverageNumberInput3";
import AverageNumberInput4 from "./AverageNumberInput4";
import StartDateInput from "./StartDateInput";
import EndDateInput from "./EndDateInput";
import TickerSymbolInput from "./TickerSymbolInput";
import Constants from '../constants/Constants';
import StyleConfig from '../constants/StyleConfig';
import NameDial from '../functions/NameDial';
import StockChart from "./StockChart";
import * as XLSX from "xlsx";
import axios from 'axios';
import DateOverlayInput from './DateOverlayInput';
import GrabFractalByDateInput from "./GrabFractalByDateInput";

export const Home = () => {
    const [amountOfFunctions, setAmountOfFunctions] = useState(9);
    const [excelData, setExcelData] = useState(); //Constants.APPLE_THREE_YEARS_2020_2023
    const [fileName, setFileName] = useState('Default_File_Name');
    const [chunkAmount, setChunkAmount] = useState(820);
    const [hideHighLowColumns, setHideHighLowColumns] = useState(false)
    const [menuNumber, setMenuNumber] = useState(8);
    const [graphFloor, setGraphFloor] = useState();
    const [graphCeiling, setGraphCeiling] = useState();
    const [showGraph, setShowGraph] = useState(true);
    const [storageBox, setStorageBox] = useState();//Constants.DUMMY_DATA_LARGE
    const [arrayOfFractalHighs, setArrayOfFractalHighs] = useState(); //Constants.APPLE_DUMMY_DATA_FIVE_YEARS_HIGH_FRACTAL
    const [arrayOfFractalLows, setArrayOfFractalLows] = useState(); //Constants.APPLE_DUMMY_DATA_FIVE_YEARS_LOW_FRACTAL
    const [stockChartFractalHighs, setStockChartFractalHighs] = useState();
    const [stockChartFractalLows, setStockChartFractalLows] = useState();
    const [victoryScatterHigh, setVictoryScatterHigh] = useState();
    const [victoryScatterLow, setVictoryScatterLow] = useState();
    const [showFractalHigh, setShowFractalHigh] = useState(false);
    const [showFractalLow, setShowFractalLow] = useState(false);
    const [showDateOverlay, setShowDateOverlay] = useState(true);
    const [victoryDateOverlay, setVictoryDateOverlay] = useState([]);
    const [fileList, setFileList] = useState({});
    const [currentFileNumber, setCurrentFileNumber] = useState(1);
    const [currentLoadedDateOverlay, setCurrentLoadedDateOverlay] = useState("");
    const [zoomOrTooltip, setZoomOrTooltip] = useState(true);
    const [coinData, setCoinData] = useState();
    const [stockApiData, setStockApiData] = useState({});
    const [startDate, setStartDate] = useState('2020-10-01');
    const [endDate, setEndDate] = useState('2023-01-07');
    const [tickerSymbol, setTickerSymbol] = useState('AAPL');
    const [averageAmount1, setAverageAmount1] = useState(10);
    const [averageAmount2, setAverageAmount2] = useState(10);
    const [averageAmount3, setAverageAmount3] = useState(10);
    const [averageAmount4, setAverageAmount4] = useState(10);
    const [finalAverage, setFinalAverage] = useState(averageAmount1 + averageAmount2 + averageAmount3 + averageAmount4);

    useEffect(() => {
        axios.get('https://api.coingecko.com/api/v3/coins/bitcoin')
        .then(res => {
            setCoinData(res.data);
            console.log(res.data);
        })
        .catch(error => console.log(error));
    }, []);


    const grabExcelDataAndSetToState = (val) => {
        val.map((day) => {
            day.Date = Math.round(day.Date);
            delete day.Open;
            delete day["Vol."];
            delete day["Change %"];
        })

        setExcelData(val);

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
                    if (typeof day.Date === 'string') {
                        arrayOfFractalHighsBox.push(day.Date);
                    }
                    if (typeof day.Date === 'number') {
                        let fractalHighDay = {x: day.Date, y: day.Price, symbol: "circle", fill: "green"}
                        arrayOfFractalHighsBox.push(DateConversion(day.Date));
                        fractalHighVictoryScatterBox.push(fractalHighDay);
                    }
                }
                if (lowCheck1 && lowCheck2 && lowCheck3 && lowCheck4) {
                    if (typeof day.Date === 'string') {
                        arrayOfFractalLowsBox.push(day.Date);
                    }
                    if (typeof day.Date === 'number') {
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
        setVictoryScatterHigh(fractalHighVictoryScatterBox);
        setVictoryScatterLow(fractalLowVictoryScatterBox);
        calculateGraphCeilingAndFloor(storageBox);
        setStorageBox(storageBox)
        setStockChartFractalHighs(fractalHighBox);
        setStockChartFractalLows(fractalLowBox);
    }

    const grabExcelDataAndSetToStateForLocationData = (val) => {
        console.log('val: ', val);
        // val.map((day) => {
        //     day.Date = Math.round(day.Date);
        //     delete day.Open;
        //     delete day["Vol."];
        //     delete day["Change %"];
        // })

        setExcelData(val);
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

    // Function 1 - Save
    const saveExcelFile = () => {
        const copiedClone = excelData.map(({Date, Price, High, Low}) => ({
            Date: DateConversion(Date), Price, High, Low}));
        DownloadExcel(copiedClone, fileName, true)
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

    // Function 7 - Fractals
    const HighLowFractal = () => {
        const lengthOfArray = excelData.length;
        const copiedClone = structuredClone(excelData);
        copiedClone.map((day, index, arr) => {
        // Filters out first and last 2 days
            day.Date = DateConversion(day.Date);
            if (index > 2 && index <= (lengthOfArray - 3)) {
                let highCheck1 = arr[index].High > arr[index-2].High;
                let highCheck2 = arr[index].High > arr[index-1].High;
                let highCheck3 = arr[index].High > arr[index+1].High;
                let highCheck4 = arr[index].High > arr[index+2].High;
                let lowCheck1 = arr[index].Low < arr[index-2].Low;
                let lowCheck2 = arr[index].Low < arr[index-1].Low;
                let lowCheck3 = arr[index].Low < arr[index+1].Low;
                let lowCheck4 = arr[index].Low < arr[index+2].Low;

                if (highCheck1 && highCheck2 && highCheck3 && highCheck4) {day.High = " " + day.High;}
                if (lowCheck1 && lowCheck2 && lowCheck3 && lowCheck4) {day.Low = " " + day.Low;}
            }
            return day;
        })
        SplitExcel(copiedClone, parseInt(chunkAmount), fileName, "highAndLow", false);
    }

    const printData = () => {
        console.log('highs: ', arrayOfFractalHighs);
        console.log('lows: ', arrayOfFractalLows);
    }

    const testFunc = async () => {
        console.log('excelData: ', excelData);
        console.log('fractal highs: ', arrayOfFractalHighs);
        console.log('fractal lows: ', arrayOfFractalLows);
        const lengthOfArray = excelData.length;
        const copiedClone = structuredClone(excelData);

        copiedClone.map(({Date, Price, High, Low}) => ({
            Date, Price, High, Low}));


        copiedClone.map((day, index, arr) => {
        // Filters out first and last 2 days
            day.Date = DateConversion(day.Date);
            if (index > 2 && index <= (lengthOfArray - 3)) {
                day.High = "";
                day.Low = "";
                console.log('index: ', index);
                if (arrayOfFractalHighs.includes(day.Date)) {day.High = " ";}
                if (arrayOfFractalLows.includes(day.Date)) {day.Low = " ";}
            }
            return day;
        })
        SplitExcel(copiedClone, parseInt(chunkAmount), fileName, "highAndLow", false);
    }
    
    const downloadExcelFile = () => {
        const functionArray = [
            saveExcelFile, splitterDatePrice, splitterDatePriceHighLow, splitterHighLowNoNumbers, splitterHighLowHideColumns, flipArray, HighLowFractal, testFunc
        ]
        functionArray[menuNumber - 1]();
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

    const inputOnChange = (e) => {
        const file = e.target.files;
        setFileList(file);
    }

    const loadDateOverlay = () => {
        const useThisFile = fileList[currentFileNumber];
        const promise = new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsArrayBuffer(useThisFile);
            fileReader.onload = (e) => {
                const bufferArray = e.target.result;
                const wb = XLSX.read(bufferArray, { type: "buffer" });
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                const data = XLSX.utils.sheet_to_json(ws);
                resolve(data);
            }
            fileReader.oneerror = (error) => {
                reject(error);
            };
        });
        promise.then((data) => {
            const storedDatesArray = [];
            const victoryDateOverlayBox = [];
            data.map((element, index, array) => {
                storedDatesArray.push(Object.values(array[index])[0]);
            })
            if (excelData) {
                excelData.map((element, index, array) => {
                    let currentDay = element.Date;
                    if (storedDatesArray.includes(currentDay)) {
                        let dataOverlayDay = {x: element.Date, y: element.Price, symbol: "circle", fill: "green"}
                        victoryDateOverlayBox.push(dataOverlayDay);
                    }
                })
            }
            setCurrentLoadedDateOverlay(fileList[currentFileNumber].name);
            setVictoryDateOverlay(victoryDateOverlayBox);
        });
    }

    const addNumber = () => {
        if (currentFileNumber > (fileList.length - 2)){
            return;
        } else {
            setCurrentFileNumber(currentFileNumber + 1)
        }
    }

    const subtractNumber = () => {
        if (currentFileNumber < 2) {
            return;
        } else {
            setCurrentFileNumber(currentFileNumber - 1);
        }
    }

    const addDay = (arr) => {
        const arrayOfDates = [];
        const newOverlayArrayPlusOneDay = [];
        arr.map((day) => {
            arrayOfDates.push(day.x);
        })
        excelData.map((element,index, array) => {
            if (arrayOfDates.includes(array[index].Date)) {
                if (array[index-1]) {
                    let pushThis = {x: array[index-1].Date, y: array[index-1].Price, symbol: 'circle', fill: 'green'};
                    newOverlayArrayPlusOneDay.push(pushThis);
                }
            }
        })
        setVictoryDateOverlay(newOverlayArrayPlusOneDay);
    }

    const subtractDay = (arr) => {
        const newArray = [];
        const newOverlayArrayMinusOneDay = [];
        arr.map((day) => {
            newArray.push(day.x);
        })
        excelData.map((element,index, array) => {
            if (newArray.includes(array[index].Date)) {
                if (array[index+1]) {
                    let pushThis = {x: array[index+1].Date, y: array[index+1].Price, symbol: 'circle', fill: 'green'};
                    newOverlayArrayMinusOneDay.push(pushThis);
                }
            }
        })
        setVictoryDateOverlay(newOverlayArrayMinusOneDay);
    }

    const toggleStockChart = () => {
        setShowGraph(!showGraph);
    }
    const toggleFractalHighs = () => {
        setShowFractalHigh(!showFractalHigh);
    }
    const toggleFractalLows = () => {
        setShowFractalLow(!showFractalLow);
    }
    const toggleDisplayOverlay = () => {
        setShowDateOverlay(!showDateOverlay);
    }
    const toggleThing = () => {
        setZoomOrTooltip(!zoomOrTooltip);
    }

     // To be passed through child component so child can set parent state
    const setFileNameToDownload = (val) => {
        setFileName(val);
    }

    // To be passed through child component so child can set parent state
    const setChunkAmountForClipping = (val) => {
        setChunkAmount(val);
    }

    const setAverageAmountForNum1 = (val) => {
        setAverageAmount1(val);
    }

    const setAverageAmountForNum2 = (val) => {
        setAverageAmount2(val);
    }

    const setAverageAmountForNum3 = (val) => {
        setAverageAmount3(val);
    }

    const setAverageAmountForNum4 = (val) => {
        setAverageAmount4(val);
    }


    const setStartDateToState = (val) => {
        setStartDate(val);
    }

    const setEndDateToState = (val) => {
        setEndDate(val);
    }

    const setTickerySymbolToState = (val) => {
        setTickerSymbol(val);
    }

    const testingThings = () => {
        const token = "f697c3c71ee64f0387a55fe2a8c838bf"
        console.log('hihihihi');
        console.log('start: ', startDate);
        console.log('end: ', endDate);
        console.log('ticker: ', tickerSymbol);
        const url6 = "https://api.twelvedata.com/time_series?&start_date=2010-05-06&end_date=2023-02-15&outputsize=4999&symbol=aapl&interval=1day&apikey=f697c3c71ee64f0387a55fe2a8c838bf";
        const url = `https://api.twelvedata.com/time_series?&start_date=${startDate}&end_date=${endDate}&outputsize=4999&symbol=${tickerSymbol}&interval=1day&apikey=${token}`
        console.log('url: ', url);
        console.log('url: ', url6);

        
        axios.get(url)
        .then(res => {
            console.log(res.data.values);
            const copiedClone = res.data.values.map(({datetime, high, low, close}) => ({
                Date: datetime, Price: close, High: high, Low: low}));
                
                setStockApiData(res.data.values);
                setExcelData(copiedClone);
            })
            .catch(error => console.log(error));
        }
        // Date: DateConversion(Date), Price, High, Low}));

    const positiveOrNegative = (val) => {
        if (Math.sign(val) === 1) {
            console.log('I am true');
            return true;
        } else {
            console.log('i am false');
            return false;
        }
    }



    const grabFractalAndSetToStateByDateFiles = (val) => {
        const lengthOfArray = val.length;
        const arrayOfFractalHighsBox = [];
        const arrayOfFractalLowsBox = [];
        console.log('check paul val: ', val);
        console.log('length here: ', lengthOfArray);
        val.map((day, index, arr) => {
                // console.log('day: ', day);
                if (day.High === 'H'){
                    // push this day.Date to fractal high box
                    // console.log('hit high: ', day.Date);
                    arrayOfFractalHighsBox.push(DateConversion(day.Date));
                }
                if (day.Low === 'L'){
                    // push this day.Date to fractal low box
                    // console.log('hit low: ', day.Date)
                    arrayOfFractalLowsBox.push(DateConversion(day.Date));
                }
                // return day;
        })
        console.log('test 1: ', arrayOfFractalHighsBox);
        console.log('test 2: ', arrayOfFractalLowsBox);
        setArrayOfFractalHighs(arrayOfFractalHighsBox);
        setArrayOfFractalLows(arrayOfFractalLowsBox);
    }

    const grabFractalAndSetToState = (val) => {
        const lengthOfArray = val.length;
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
                    if (typeof day.Date === 'string') {
                        arrayOfFractalHighsBox.push(day.Date);
                    }
                    if (typeof day.Date === 'number') {
                        arrayOfFractalHighsBox.push(DateConversion(day.Date));
                    }
                }
                if (lowCheck1 && lowCheck2 && lowCheck3 && lowCheck4) {
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
        // navigator.clipboard.writeText(JSON.stringify(arrayOfFractalHighsBox));
        setArrayOfFractalHighs(arrayOfFractalHighsBox);
        setArrayOfFractalLows(arrayOfFractalLowsBox);
    }

    const calculateAverage = () => {
        return ((parseInt(averageAmount1) + parseInt(averageAmount2) + parseInt(averageAmount3) + parseInt(averageAmount4))/4);
    }

        return (
            <div>
                <div className="averageContainer">
                    <AverageNumberInput1 setAverageAmountForNum1={setAverageAmountForNum1} />
                    <AverageNumberInput2 setAverageAmountForNum2={setAverageAmountForNum2} />
                    <AverageNumberInput3 setAverageAmountForNum3={setAverageAmountForNum3} />
                    <AverageNumberInput4 setAverageAmountForNum4={setAverageAmountForNum4} />

                </div>
                <div>
                {calculateAverage()}
                </div>


                <button onClick={testFunc}>testFunc</button>
                <button onClick={printData}>print data</button>

                <div className="bitcoin-container">
                    {coinData && coinData.image && <img className="margin-top-3 margin-left-5" src={coinData.image.thumb}/>}
                    {coinData && coinData.market_data && coinData.market_data.current_price && <div className="margin-left-5 margin-top-5">${JSON.stringify(coinData.market_data.current_price.usd)}</div>}
                    {coinData && positiveOrNegative(Math.sign(coinData.market_data.price_change_24h_in_currency.usd)) ?
                       <div className="font-color-green margin-left-5 margin-top-5">{coinData && coinData.market_data && Math.round(coinData.market_data.price_change_24h_in_currency.usd)}</div> :
                     <div className="font-color-red margin-left-5 margin-top-5">{coinData && coinData.market_data && Math.round(coinData.market_data.price_change_24h_in_currency.usd)}</div>}
                </div>
                {showGraph &&
                    <div>
                        <div>
                            <div className="margin-top-10">
                                <TickerSymbolInput setTickerySymbolToState={setTickerySymbolToState}/>
                            </div>
                            <div className="margin-top-10">
                                <StartDateInput setStartDateToState={setStartDateToState}/>
                            </div>
                            <div className="margin-top-10">
                                <EndDateInput setEndDateToState={setEndDateToState}/>
                            </div>
                            <button disabled={!startDate || !endDate || !tickerSymbol} className="margin-top-20" onClick={testingThings}>{StyleConfig.LABEL_API_BUTTON}</button>
                        </div>
                        <button className="button-33 margin-top-20" onClick={toggleStockChart}>{showGraph ? Constants.SHOW_GRAPH_LABEL : Constants.HIDE_GRAPH_LABEL}</button>
                        <div className="margin-top-30">
                            <ExcelInput buttonText={StyleConfig.EXCEL_INPUT_BUTTON_TEXT} grabExcelDataAndSetToState={grabExcelDataAndSetToState} />
                        </div>
                        <div className="margin-top-30">
                            <ExcelInput buttonText="For Location" grabExcelDataAndSetToStateForLocationData={grabExcelDataAndSetToStateForLocationData} />
                        </div>
                        <div className="margin-top-30">
                            <ExcelInput buttonText={StyleConfig.FRACTAL_INPUT_BUTTON_TEXT} grabExcelDataAndSetToState={grabFractalAndSetToState} />
                        </div>
                        {/* <div className="margin-top-30">
                            <ExcelInput buttonText="test input" grabExcelDataAndSetToState={grabTestDataAndSetToState} />
                        </div> */}
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
                    <div className="margin-top-10">
                        <button className="button-33" onClick={toggleStockChart}>{showGraph ? StyleConfig.SHOW_GRAPH_LABEL : StyleConfig.HIDE_GRAPH_LABEL}</button>
                        <label className="button-33">{StyleConfig.LABEL_FOLDER_INPUT}
                            <input 
                                className="hideWhileScreenReaderAccessible"
                                onChange={inputOnChange}
                                type="file"
                                id="filepicker"
                                name="fileList"
                                webkitdirectory="true"
                                multiple
                            />
                        </label>
                    </div>
                    <div className="margin-top-10">
                        {fileList && fileList[currentFileNumber] && <div className="font-size-24">{StyleConfig.LABEL_SELECT_ME}: {fileList[currentFileNumber].name}</div>}
                        <button className="button-33 margin-top-10" onClick={addNumber}>{StyleConfig.LABEL_ADD_BUTTON}</button>
                        <button className="button-33" onClick={subtractNumber}>{StyleConfig.LABEL_SUBTRACT_BUTTON}</button>
                        <div className="margin-top-10 font-size-24"> {currentFileNumber} </div>
                        <button className="button-33 margin-top-10" onClick={loadDateOverlay}>{StyleConfig.LABEL_LOAD_OVERLAY}</button>
                        <div className="margin-top-10 font-size-24"> {StyleConfig.LABEL_SELECTED_DATE_OVERLAY}: {currentLoadedDateOverlay} </div>
                        <div className="margin-top-30">
                            <GrabFractalByDateInput buttonText="grab fractals by date input excel file" grabFractalAndSetToStateByDateFiles={grabFractalAndSetToStateByDateFiles} />
                            {/* <div>hihihihihihihihihihihi</div>
                            <div>hihihihihihihihihihihi</div>
                            <div>hihihihihihihihihihihi</div>
                            <DateOverlayInput buttonText="grab fractals by stock graph" grabFractalAndSetToState={grabFractalAndSetToState} />
                            <div>hihihihihihihihihihihi</div>
                            <div>hihihihihihihihihihihi</div>
                            <div>hihihihihihihihihihihi</div> */}
                            
                        </div>
                        <button className="button-33 margin-top-10" onClick={toggleDisplayOverlay}>{StyleConfig.DISPLAY_OVERLAY_LABEL}</button>
                        <button className="button-33" onClick={toggleFractalHighs}>{StyleConfig.TOGGLE_FRACTAL_HIGH_LABEL}</button>
                        <button className="button-33" onClick={toggleFractalLows}>{StyleConfig.TOGGLE_FRACTAL_LOW_LABEL}</button>
                        <button className="button-33" onClick={toggleThing}>{zoomOrTooltip ? StyleConfig.LABEL_TOOLTIP_BUTTON: StyleConfig.LABEL_ZOOM_BUTTON}</button>
                        <div>{JSON.stringify(zoomOrTooltip)}</div>

                    </div>
                    <div className="margin-top-10">
                        <button className="button-33" onClick={()=>addDay(victoryDateOverlay)}>+</button>
                        <button className="button-33" onClick={()=>subtractDay(victoryDateOverlay)}>-</button>
                        
                    </div>
                    <div className="stock-chart margin-top-10">
                        <StockChart zoomOrTooltip={zoomOrTooltip} victoryDateOverlay={victoryDateOverlay} showDateOverlay={showDateOverlay} showFractalHigh={showFractalHigh} showFractalLow={showFractalLow} victoryScatterHigh={victoryScatterHigh} victoryScatterLow={victoryScatterLow} stockChartFractalLows={stockChartFractalLows} stockChartFractalHighs={stockChartFractalHighs} storageBox={storageBox} stockChartData={excelData} graphFloor={graphFloor} graphCeiling={graphCeiling}/>
                    </div>
                </div>
                }

        </div>
    )
}

export default Home;



    // Clipboard command for saving JSON data
    // navigator.clipboard.writeText(JSON.stringify(val));

    // Code for printing fractals Later

    // const grabFractalAndSetToState = (val) => {
    //     const lengthOfArray = val.length;
    //     const arrayOfFractalHighsBox = [];
    //     const arrayOfFractalLowsBox = [];
    //     val.map((day, index, arr) => {
    //     // Filters out first and last 2 days
    //         if (index > 2 && index <= (lengthOfArray - 3)) {
    //             let highCheck1 = arr[index].High > arr[index-2].High;
    //             let highCheck2 = arr[index].High > arr[index-1].High;
    //             let highCheck3 = arr[index].High > arr[index+1].High;
    //             let highCheck4 = arr[index].High > arr[index+2].High;

    //             let lowCheck1 = arr[index].Low < arr[index-2].Low;
    //             let lowCheck2 = arr[index].Low < arr[index-1].Low;
    //             let lowCheck3 = arr[index].Low < arr[index+1].Low;
    //             let lowCheck4 = arr[index].Low < arr[index+2].Low;

    //             if (highCheck1 && highCheck2 && highCheck3 && highCheck4) {
    //                 if (typeof day.Date === 'string') {
    //                     arrayOfFractalHighsBox.push(day.Date);
    //                 }
    //                 if (typeof day.Date === 'number') {
    //                     arrayOfFractalHighsBox.push(DateConversion(day.Date));
    //                 }
    //             }
    //             if (lowCheck1 && lowCheck2 && lowCheck3 && lowCheck4) {
    //                 if (typeof day.Date === 'string') {
    //                     arrayOfFractalLowsBox.push(day.Date);
    //                 }
    //                 if (typeof day.Date === 'number') {
    //                     arrayOfFractalLowsBox.push(DateConversion(day.Date));
    //                 }
    //             }
    //         }
    //         return day;
    //     })
    //     // navigator.clipboard.writeText(JSON.stringify(arrayOfFractalHighsBox));
    //     setArrayOfFractalHighs(arrayOfFractalHighsBox);
    //     setArrayOfFractalLows(arrayOfFractalLowsBox);
    // }

    // const grabOverlayDataAndSetToState = (val) => {
    //     const storedDatesArray = [];
    //     const victoryDateOverlayBox = [];
    //     val.map((element, index, array) => {
    //         console.log('test: ', Object.values(array[index])[0])
    //         storedDatesArray.push(Object.values(array[index])[0]);
    //     })
    //     console.log('yoyoyo: ', storedDatesArray);
    //     if (excelData) {
    //         excelData.map((element, index, array) => {
    //             let currentDay = element.Date;
    //             if (storedDatesArray.includes(currentDay)) {
    //                 let dataOverlayDay = {x: element.Date, y: element.Price, symbol: "circle", fill: "green"}
    //                 victoryDateOverlayBox.push(dataOverlayDay);
    //             }
    //         })
    //     }
    //     if (fileList && fileList[currentFileNumber] && fileList[currentFileNumber].name){
    //         setCurrentLoadedDateOverlay(fileList[currentFileNumber].name);
    //     }
    //     setVictoryDateOverlay(victoryDateOverlayBox);
    // }

        // const grabTestDataAndSetToState = (val) => {
    //     const copiedClone = val.map(({Date, Price}) => ({
    //             Date, Price, High: arrayOfFractalHighs.includes(Date) ? " " : "", Low: arrayOfFractalLows.includes(Date) ? " " : ""}));
    //     setExcelData(copiedClone);
    //     SplitExcel(copiedClone, parseInt(chunkAmount), fileName, "highAndLow", false);
    // }



//     access-control-allow-headers: Origin, X-Requested-With, Content-Type, Accept, Authorization
// access-control-allow-methods: POST, PUT, DELETE, GET, OPTIONS
// access-control-allow-origin: *
// access-control-expose-headers: link, per-page, total
// access-control-max-age: 7200
// access-control-request-method: *