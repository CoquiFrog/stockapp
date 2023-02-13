import * as XLSX from "xlsx";
import Splitter from '../functions/Splitter';
import IterationToColumnConverter from '../functions/IterationToColumnConverter';
import IterationToColumnConverterHighLow from "./IterationToColumnConverterHighLow";
import Workbook2blob from "./Workbook2blob";
import S2ab from "./S2ab";
import AddStyle from '../functions/AddStyle';

export const SplitExcel = (data, chunkAmount, filename, highAndLow, hideHighLowNumbers) => {
    const createDownLoadData = (howManyRows) => {
        handleExport(howManyRows).then((url) => {
          const downloadAnchorNode = document.createElement("a");
          downloadAnchorNode.setAttribute("href", url);
          downloadAnchorNode.setAttribute("download", (filename + ".xlsx"));
          downloadAnchorNode.click();
          downloadAnchorNode.remove();
        });
    };
      const handleExport = (howManyRows) => {
        const workbookBlob = Workbook2blob(data);
    
        return AddStyle(workbookBlob, howManyColumns, howManyRows, hideHighLowNumbers);
      };
    let howManyColumns;
    const addToSheet = (smallChunkArray, counter) => {
        let columnString = IterationToColumnConverter(counter);
        // console.log('addToSheet columnString: ', columnString);
        let printStartPoint = columnString + 1;
        howManyColumns = counter * 4;
        XLSX.utils.sheet_add_json(workSheet, smallChunkArray, { origin: printStartPoint });
    }
    const addToSheetHighLow = (smallChunkArray, counter) => {
        let columnString = IterationToColumnConverterHighLow(counter);
        // console.log('addToSheetHighLow columnString: ', columnString);
        let printStartPoint = columnString + 1;
        howManyColumns = counter * 8;
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

    return createDownLoadData(chunkAmount);
}

export default SplitExcel;
