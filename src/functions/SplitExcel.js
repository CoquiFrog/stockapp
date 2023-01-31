import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import Splitter from '../functions/Splitter';
import IterationToColumnConverter from '../functions/IterationToColumnConverter';
import ExcelExportHelperSplitter from "../components/ExcelExportHelperSplitter";
import LetterToNumberConverter from "../functions/LetterToNumberConverter";



export const SplitExcel = (data, chunkAmount, filename) => {
    let testNum;
    let testString;
    const addToSheet = (smallChunkArray, counter) => {
        let columnString = IterationToColumnConverter(counter) + 1;
        testNum = counter;
        testString = IterationToColumnConverter(counter);
        XLSX.utils.sheet_add_json(workSheet, smallChunkArray, { origin: columnString });
    }
    
    // Primes worksheet with small dummy data that will be overwritten
    const workSheet=XLSX.utils.json_to_sheet([{"Date":"2022-12-30","Price":129.93}]);
    Splitter(data, chunkAmount, addToSheet);
    const workBook=XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workBook,workSheet,"testSheet1");
    // let TEST_ME = LetterToNumberConverter(howManyColumns);
    // console.log('DURRRR: ', howManyColumns)
    // console.log("test Num? ", testNum);
    // console.log('Test String: ', testString);
    // The +2 is just because the letter we get is second to last, so we move it past the final column.
    let howManyColumns = LetterToNumberConverter(testString) + 2;
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