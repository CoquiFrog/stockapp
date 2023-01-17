import * as XLSX from "xlsx";
import Splitter from '../functions/Splitter';
import IterationToColumnConverter from '../functions/IterationToColumnConverter';

export const SplitExcel = (data, chunkAmount, filename) => {

    const addToSheet = (smallChunkArray, counter) => {
        let columnString = IterationToColumnConverter(counter) + 1;
        XLSX.utils.sheet_add_json(workSheet, smallChunkArray, { origin: columnString });
    }

    const newData=data.map(row=>{
        delete row.tableData
        return row;
    })

    const workSheet=XLSX.utils.json_to_sheet(newData);
    Splitter(data, chunkAmount, addToSheet);
    const workBook=XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workBook,workSheet,"testSheet1");
    XLSX.utils.book_append_sheet(workBook,workSheet,"testSheet2");
    let buffer=XLSX.write(workBook, {bookType:"xlsx", type: "binary"})
    XLSX.write(workBook, {bookType:"xlsx", type:"binary"})
    XLSX.writeFile(workBook, (filename + '.xlsx'))
}

export default SplitExcel;
