import React from "react";
import * as XLSX from "xlsx";
import * as XlsxPopulate from "xlsx-populate/browser/xlsx-populate";
import NumberToLetterConverter from "../functions/NumberToLetterConverter";

const ExcelExportHelperSplitter = (data, howManyColumns, howManyRows) => {
  console.log('HOW MANY ROWS? ', howManyRows)
  
  // console.log('hiyohi: ', data);
  const createDownLoadData = () => {
    handleExport().then((url) => {
      // console.log(url);d
      const downloadAnchorNode = document.createElement("a");
      downloadAnchorNode.setAttribute("href", url);
      downloadAnchorNode.setAttribute("download", "student_report.xlsx");
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
    });
  };

  const workbook2blob = (workbook) => {
    const wopts = {
      bookType: "xlsx",
      bookSST: false,
      type: "binary",
    };

    const wbout = XLSX.write(workbook, wopts);

    // The application/octet-stream MIME type is used for unknown binary files.
    // It preserves the file contents, but requires the receiver to determine file type,
    // for example, from the filename extension.
    const blob = new Blob([s2ab(wbout)], {
      type: "application/octet-stream",
    });

    return blob;
  };

  const s2ab = (s) => {
    // The ArrayBuffer() constructor is used to create ArrayBuffer objects.
    // create an ArrayBuffer with a size in bytes
    const buf = new ArrayBuffer(s.length);

    // console.log(buf);

    //create a 8 bit integer array
    const view = new Uint8Array(buf);

    // console.log(view);
    //charCodeAt The charCodeAt() method returns an integer between 0 and 65535 representing the UTF-16 code
    for (let i = 0; i !== s.length; ++i) {
      // console.log(s.charCodeAt(i));
      view[i] = s.charCodeAt(i);
    }

    return buf;
  };

  const handleExport = () => {
    //   console.log('data in : ', data);
    //create a new workbook

    // binary large object
    // Since blobs can store binary data, they can be used to store images or other multimedia files.

    // console.log('wb: ', wb);
    const workbookBlob = workbook2blob(data);
    // console.log('workbookBlob: ', workbookBlob);

    return addStyle(workbookBlob);
  };

  const addStyle = (workbookBlob) => {
    return XlsxPopulate.fromDataAsync(workbookBlob).then((workbook) => {

    // WRITE A LOOP THAT USES THE LENGTH TO KNOW HOW MANY COLUMNS TO CHECK
    // ITERATE OVER EACH COLUMN, AND CHECK THE TITLE NAME
    // IF TITLE IS DATE, COLOR YELLOW
    // IF TITLE IS PRICE, COLOR LIGHTBLUE
    // Make top title cell light green, and all actual dates yellow, prices light blue


    
    
    
    
    
    // console.log('ARRAY IS THIS LONG: ', howManyColumns);
    // console.log('sheet: ', workbook.sheets());
    workbook.sheets().forEach((sheet) => {
      // console.log('sheet: ', sheet);
      // console.log('used range: ', sheet.usedRange());
      sheet.usedRange().style({
        fontFamily: "Arial",
        horizontalAlignment: "center",
        // fill: "FFFD04",
      });
      // Make Top Row Green
      // sheet.row(1).style("fill", "FFD04")
      // Make First Column Pink
      // sheet.column("A").style({fill: "FFD04", bold: true})
      
      // var date = moment('2016-10-29', 'DD-MM-YYYY', true);
      
      
      for (let i=0, counter=0; i < howManyColumns; i++) {
        // console.log('i: ', i);
        // console.log('converted: ', NumberToLetterConverter(i))
        let columnAddress =  NumberToLetterConverter(i);
        let columnAndRowAddress = columnAddress + 1;
        // console.log('columnAndRowAddress: ', columnAndRowAddress);
        let cellValue = sheet.cell(columnAndRowAddress).value();
        // console.log('cellValue: ', cellValue);
        if (cellValue === "Date") {
          console.log('I found a Date!', columnAddress);
          let dateRange = (columnAddress + 2) + ':' + (columnAddress + howManyRows)
          sheet.range(dateRange).style("fill", "D9FE7F");
          // set Date column width
           sheet.column(columnAddress).width(15);
          // Fill column light blue
          // sheet.column(columnAddress).style("fill", "D9FE7F")
          // Fill Title Cell Orange
          sheet.cell(columnAndRowAddress).style("fill", "FDD44F")
        }
        if (cellValue === "Price") {
          let priceRange = (columnAddress + 2) + ':' + (columnAddress + howManyRows)
          console.log('I FIRED: ', priceRange)
          // sheet.range(priceRange).style("fill", "7FCDFE");
                    sheet.range(priceRange).style("fill", "7FCDFE");


          // Set Price Column Width
          sheet.column(columnAddress).width(11);

          // Fill column light blue
          // sheet.column(columnAddress).style("fill", "98F6EF")
          // Fill Title Cell Violet
          sheet.cell(columnAndRowAddress).style("fill", "F14FFD")
          // console.log('I found a Price');
        }
        if (!cellValue){
          // console.log('I found nothing!')
          sheet.column(columnAddress).width(3);
        }
      }
        // sheet.column("A").hidden(true);
        // sheet.column("B").hidden(true);
        // sheet.column("C").hidden(true);

        // sheet.column("A").width(35);
      });

      return workbook
        .outputAsync()
        .then((workbookBlob) => URL.createObjectURL(workbookBlob));
    });
  };

  return createDownLoadData();
};

export default ExcelExportHelperSplitter;
