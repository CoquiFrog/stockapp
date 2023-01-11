import * as XLSX from "xlsx";

export const DownloadExcel = (data, filename) => {
    const newData=data.map(row=>{
        delete row.tableData
        return row;
    })
    const workSheet=XLSX.utils.json_to_sheet(newData);
    const workBook=XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workBook,workSheet,"testSheet")
    let buffer=XLSX.write(workBook, {bookType:"xlsx", type: "binary"})
    XLSX.write(workBook, {bookType:"xlsx", type:"binary"})
    XLSX.writeFile(workBook, (filename + '.xlsx'))
}

export default DownloadExcel;