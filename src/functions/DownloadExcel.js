import * as XLSX from "xlsx";

export const DownloadExcel = (data, filename) => {
    const newData=data.map(row=>{
        delete row.tableData
        return row;
    })
    // This is how to stack one column on top of another
    // const stackedOneTopTheOther = [...newData, ...newData];
    // attempt different methods of combining two objects onto a sheet export

    const workSheet=XLSX.utils.json_to_sheet(newData);
    const workSheet2 = XLSX.utils.sheet_add_json(workSheet, [
        {
            Date: "2022-12-22",
            Price: "150.33"
        },
        {
            Date: "2022-11-22",
            Price: "140.33"
        },
        {
            Date: "2022-10-22",
            Price: "130.33"
        },
        {
            Date: "2022-9-22",
            Price: "120.33"
        },
        {
            Date: "2022-8-22",
            Price: "110.33"
        },
    ], { origin: "D1" });




    // const workSheet=XLSX.utils.json_to_sheet(newData);

    // XLSX.utils.sheet_add_json(newData);
    const workBook=XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workBook,workSheet,"testSheet1");
    XLSX.utils.book_append_sheet(workBook,workSheet,"testSheet2");
    let buffer=XLSX.write(workBook, {bookType:"xlsx", type: "binary"})
    XLSX.write(workBook, {bookType:"xlsx", type:"binary"})
    XLSX.writeFile(workBook, (filename + '.xlsx'))
}

export default DownloadExcel;

// split order -> D, G, J, M, P, S, V, Y, AB, AE, AH, AK, AN, AQ, AT, AW


// const dummyData = [
//     {
//         Date: "2022-12-22",
//         Price: "150.33"
//     },
//     {
//         Date: "2022-11-22",
//         Price: "140.33"
//     },
//     {
//         Date: "2022-10-22",
//         Price: "130.33"
//     },
//     {
//         Date: "2022-9-22",
//         Price: "120.33"
//     },
//     {
//         Date: "2022-8-22",
//         Price: "110.33"
//     },
// ];