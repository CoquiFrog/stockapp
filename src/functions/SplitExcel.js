import * as XLSX from "xlsx";
import Splitter from '../functions/Splitter';
import IterationToColumnConverter from '../functions/IterationToColumnConverter';
// import XLSX from '../../src/xlsx.core.min.js'
import ExcelExportHelperSplitter from "../components/ExcelExportHelperSplitter";

export const SplitExcel = (data, chunkAmount, filename) => {

    const addToSheet = (smallChunkArray, counter) => {
        let columnString = IterationToColumnConverter(counter) + 1;
        console.log('COUNTER: ', columnString)
        XLSX.utils.sheet_add_json(workSheet, smallChunkArray, { origin: columnString });
    }
    const workSheet=XLSX.utils.json_to_sheet(data);
    // console.log('WORKSHEET YO!: ', workSheet);
    Splitter(data, chunkAmount, addToSheet);
    
    // console.log('check length: ', data);
    const workBook=XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workBook,workSheet,"testSheet1");
    // console.log('WORKBOOK: ', workBook);
    ExcelExportHelperSplitter(workBook);
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