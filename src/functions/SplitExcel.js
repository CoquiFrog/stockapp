import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import Splitter from '../functions/Splitter';
import IterationToColumnConverter from '../functions/IterationToColumnConverter';
import ExcelExportHelperSplitter from "../components/ExcelExportHelperSplitter";
import LetterToNumberConverter from "../functions/LetterToNumberConverter";
import IterationToColumnConverterHighLow from "./IterationToColumnConverterHighLow";



export const SplitExcel = (data, chunkAmount, filename, highAndLow) => {
    console.log('excel data has arrived: ', data);
    let testNum;
    let testString;
    let howManyColumns
    const addToSheet = (smallChunkArray, counter) => {
        let columnString = IterationToColumnConverter(counter) + 1;
        testNum = counter;
        testString = IterationToColumnConverter(counter);
        XLSX.utils.sheet_add_json(workSheet, smallChunkArray, { origin: columnString });
    }
    const addToSheetHighLow = (smallChunkArray, counter) => {
        let columnString = IterationToColumnConverter(counter) + 1;
        testNum = counter;
        testString = IterationToColumnConverterHighLow(counter);
        console.log('teststring: ', testString);
        XLSX.utils.sheet_add_json(workSheet, smallChunkArray, { origin: columnString });
    }
    
    // Primes worksheet with small dummy data that will be overwritten
    const workSheet=XLSX.utils.json_to_sheet([{"Date":"2022-12-30","Price":129.93}]);
    // let TEST_ME = LetterToNumberConverter(howManyColumns);
    // console.log('DURRRR: ', howManyColumns)
    // console.log("test Num? ", testNum);
    // console.log('Test String: ', testString);
    // The +2 is just because the letter we get is second to last, so we move it past the final column.
    const workBook=XLSX.utils.book_new()
    console.log("why? ", highAndLow);
    if (highAndLow === true) {
        console.log('TRUE')
        Splitter(data, chunkAmount, addToSheetHighLow);
        XLSX.utils.book_append_sheet(workBook,workSheet,"testSheet1");
        howManyColumns = LetterToNumberConverter(testString) + 5;
    } else {
        console.log('FALSE');
        Splitter(data, chunkAmount, addToSheet);
        XLSX.utils.book_append_sheet(workBook,workSheet,"testSheet1");
        howManyColumns = LetterToNumberConverter(testString) + 2;
    }
    ExcelExportHelperSplitter(workBook, howManyColumns, (chunkAmount + 1));

    // Previous Method of Downloading
    // XLSX.utils.book_append_sheet(workBook,workSheet,"testSheet2");
    // let buffer=XLSX.write(workBook, {bookType:"xlsx", type: "binary"})
    // XLSX.write(workBook, {bookType:"xlsx", type:"binary"})
    // XLSX.writeFile(workBook, (filename + '.xlsx'))
}

export default SplitExcel;

// const newData=data.map(row=>{
//     delete row.tableData
//     return row;
// })