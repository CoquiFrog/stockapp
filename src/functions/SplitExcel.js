import * as XLSX from "xlsx";
import Splitter from '../functions/Splitter';
import IterationToColumnConverter from '../functions/IterationToColumnConverter';
import ExcelExportHelperSplitter from "../components/ExcelExportHelperSplitter";
import LetterToNumberConverter from "../functions/LetterToNumberConverter";
import IterationToColumnConverterHighLow from "./IterationToColumnConverterHighLow";

export const SplitExcel = (data, chunkAmount, filename, highAndLow) => {
    console.log('excel data has arrived: ', data);
    let howManyColumns
    const addToSheet = (smallChunkArray, counter) => {
        let columnString = IterationToColumnConverter(counter);
        let printStartPoint = columnString + 1;
        howManyColumns = LetterToNumberConverter(columnString);
        console.log('column string: ', columnString);
        XLSX.utils.sheet_add_json(workSheet, smallChunkArray, { origin: printStartPoint });
    }
    const addToSheetHighLow = (smallChunkArray, counter) => {
        let columnString = IterationToColumnConverterHighLow(counter);
        let printStartPoint = columnString + 1;
        howManyColumns = LetterToNumberConverter(columnString);
        XLSX.utils.sheet_add_json(workSheet, smallChunkArray, { origin: printStartPoint });
    }
    
    // Primes worksheet with small dummy data that will be overwritten
    const workSheet=XLSX.utils.json_to_sheet([{"Date":"2022-12-30","Price":129.93}]);
    const workBook=XLSX.utils.book_new()
    if (highAndLow === true) {
        console.log('TRUE')
        Splitter(data, chunkAmount, addToSheetHighLow);
    } else {
        console.log('FALSE');
        Splitter(data, chunkAmount, addToSheet);
    }
    XLSX.utils.book_append_sheet(workBook,workSheet,"testSheet1");
    // Gives extra breathing room for looping;
    howManyColumns = howManyColumns + 5;
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