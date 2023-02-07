import * as XLSX from "xlsx";
import Splitter from '../functions/Splitter';
import IterationToColumnConverter from '../functions/IterationToColumnConverter';
import ExcelExportHelperSplitter from "../components/ExcelExportHelperSplitter";
import IterationToColumnConverterHighLow from "./IterationToColumnConverterHighLow";

export const SplitExcel = (data, chunkAmount, filename, highAndLow, hideHighLowNumbers) => {
    let howManyColumns;
    const addToSheet = (smallChunkArray, counter) => {
        let columnString = IterationToColumnConverter(counter);
        console.log('addToSheet columnString: ', columnString);
        let printStartPoint = columnString + 1;
        howManyColumns = counter * 3;
        XLSX.utils.sheet_add_json(workSheet, smallChunkArray, { origin: printStartPoint });
    }
    const addToSheetHighLow = (smallChunkArray, counter) => {
        let columnString = IterationToColumnConverterHighLow(counter);
        console.log('addToSheetHighLow columnString: ', columnString);
        let printStartPoint = columnString + 1;
        howManyColumns = counter * 7;
        XLSX.utils.sheet_add_json(workSheet, smallChunkArray, { origin: printStartPoint });
    }
    
    // Primes worksheet with small dummy data that will be overwritten
    const workSheet=XLSX.utils.json_to_sheet([{"Date":"2022-12-30","Price":129.93}]);
    const workBook=XLSX.utils.book_new()
    if (highAndLow === true) {
        Splitter(data, chunkAmount, addToSheetHighLow);
    } else {
        Splitter(data, chunkAmount, addToSheet);
    }
    XLSX.utils.book_append_sheet(workBook,workSheet,"testSheet1");
    ExcelExportHelperSplitter(workBook, filename, howManyColumns, (chunkAmount + 1), hideHighLowNumbers);
}

export default SplitExcel;
