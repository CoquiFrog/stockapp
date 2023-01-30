import * as XLSX from "xlsx";
// import XLSX from '../../src/xlsx.core.min.js'

// import React, {useEffect} from 'react';


export const DownloadExcel = (data, filename) => {
    
    // useEffect(() => {
    //     const script = document.createElement('script');
    
    //     script.src = "./src/xlsx.core.min.js";
    //     script.async = true;
    
    //     document.body.appendChild(script);
    
    //     return () => {
    //         document.body.removeChild(script);
    //     }
    // }, []);
    // data.cellFormat({fontWeight: "bold", textAlign: "center", fontSize:"40pt", backgroundColor:"#1E88E5"});
    
    // const thingy = XLSX.utils.book_new();
    // let row2 = [
    //     { v: "Courier: 24", t: "s", s: { font: { name: "Courier", sz: 24 } } },
    //     { v: "bold & color", t: "s", s: { font: { bold: true, color: { rgb: "FF0000" } } } },
    //     { v: "fill: color", t: "s", s: { fill: { fgColor: { rgb: "E9E9E9" } } } },
    //     { v: "line\nbreak", t: "s", s: { alignment: { wrapText: true } } },
    // ];
    // const thingy2 = XLSX.utils.aoa_to_sheet([row2]);
    // XLSX.utils.book_append_sheet(thingy, thingy2, "pleasework");
    // XLSX.writeFile(thingy, "whatever2.xlsx")
    // const styledWorkSheet=workSheet.map(row=>{
    //     row.s = { font: { bold: true, color: { rgb: "FF0000" } } }
    // })
    // row.s = {fill: {fgColor: {rgb: "FFFFAA00" }}}

    // let range = workSheet.getRange("B2:E2");
    // range.format.fill.color = "#4472C4";
    // range.format.font.color = "orange";
    // console.log('type: ', typeof workSheet);
    // console.log('worksheetttssss: ', workSheet);
    // workSheet.A2.s = { font: { bold: true, color: { rgb: "FF0000" } } };
    // workSheet.A3.s = { fill: { fgColor: { rgb: "E9E9E9" } } };
    // workSheet.A4.s = { font: { name: "Courier", sz: 24 } };
    // workSheet["A1"].s = {									// set the style for target cell
    //     font: {
    //       name: '宋体',
    //       sz: 24,
    //       bold: true,
    //       color: { rgb: "FFFFAA00" }
    //     },
    //   };
    //   workSheet["A2"].s = {									// set the style for target cell
    //     font: {
    //       name: '宋体',
    //       sz: 24,
    //       bold: true,
    //       color: { rgb: "FFFFAA00" }
    //     },
    //   };
    //   workSheet["A3"].s = {									// set the style for target cell
    //     font: {
    //       name: '宋体',
    //       sz: 24,
    //       bold: true,
    //       color: { rgb: "FFFFAA00" }
    //     },
    //   };

    // workSheet["A1"].s = {									// set the style for target cell
    //     s: { // style
    //         fill: {
    //             fgColor: { rgb: "FF6666" } // red
    //         }
    //         }
    //   };
    //   workSheet["A2"].s = {	
    //         fill: {
    //             fgColor: { rgb: "FF6666",  patternType: "solid"},
    //             bgColor: { rgb: "FF6666",  patternType: "solid"},
    //             patternType: "solid"
    //         },
    //         font: {name: "Bradley Hand", sz: "50pt", color: "red"}
    //   };
    //   workSheet["A3"].s = {									// set the style for target cell
    //     font: {
    //       name: '宋体',
    //       sz: 24,
    //       bold: true,
    //       color: { rgb: "FFFFAA00" }
    //     },
    //   };
    // workSheet["A1"].s = {									// set the style for target cell
    //     font: {
    //       name: '宋体',
    //       sz: 24,
    //       bold: true,
    //       color: { rgb: "FFFFAA00" }
    //     },
    //   };
    //   workSheet["A2"].s = {									// set the style for target cell
    //     font: {
    //       name: '宋体',
    //       sz: 24,
    //       bold: true,
    //       color: { rgb: "FFFFAA00" }
    //     },
    //   };
    //   workSheet["A3"].s = {									// set the style for target cell
    //     font: {
    //       name: '宋体',
    //       sz: 24,
    //       bold: true,
    //       color: { rgb: "FFFFAA00" }
    //     },
    //   };


      
    // const newData2=workSheet.map(row2 => {
    //     console.log('row2: ', row2)
    //     return row2;
    // })



//     var ws_data = {}
// var range = { s: { c: 0, r: 0 }, e: { c: 10, r: 10 } }; // worksheet cell range 
// ws_data['!ref'] = XLSX.utils.encode_range(range); // set cell the range

// var cell = { // create cell
//     v: 'testasdf', // value
//     s: { // style
//         fill: {
//             fgColor: { rgb: "FF6666" } // red
//         },
//         font: {
//             name: '宋体',
//             sz: 24,
//             bold: true,
//             color: { rgb: "FFFFAA00" }
//         },
//     }
// }
// ws_data[XLSX.utils.encode_cell({ c: 1, r: 1 })] = cell; // add the cell to the sheet data


    
    const newData=data.map(row=>{
        delete row.tableData

        return row;
    })



    console.log('data: ', data);
    const workSheet=XLSX.utils.json_to_sheet(newData);
    const workBook=XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workBook,workSheet,"testSheet1");
    XLSX.utils.book_append_sheet(workBook,workSheet,"testSheet2");
    let buffer=XLSX.write(workBook, {bookType:"xlsx", type: "binary"})
    XLSX.write(workBook, {bookType:"xlsx", type:"binary"})
    XLSX.writeFile(workBook, (filename + '.xlsx'))
}

export default DownloadExcel;
