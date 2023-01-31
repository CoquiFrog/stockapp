import React from "react";
import * as XLSX from "xlsx";
import * as XlsxPopulate from "xlsx-populate/browser/xlsx-populate";

const ExcelExportHelperSplitter = (data, howManyColumns) => {
  console.log('hiyohi: ', data);
  const createDownLoadData = () => {
    handleExport().then((url) => {
      // console.log(url);
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
      console.log('ARRAY IS THIS LONG: ', howManyColumns);
        // console.log('sheet: ', workbook.sheets());
      workbook.sheets().forEach((sheet) => {
          // console.log('sheet: ', sheet);

          // console.log('COLUMNS LENGTH: ', sheet._columns)
          // console.log('used range: ', sheet.usedRange());
        sheet.usedRange().style({
          fontFamily: "Arial",
          horizontalAlignment: "center",
          // fill: "FFFD04",
        });
        // Make Top Row Green
        sheet.row(1).style("fill", "FFD04")
        // Make First Column Pink
        // sheet.column("A").style({fill: "FFD04", bold: true})

        // var date = moment('2016-10-29', 'DD-MM-YYYY', true);

        // console.log('test sheet: ', sheet.usedRange())
        // console.log('cell: ', sheet.cell("A1"));

        sheet.column("A").hidden(true);
        sheet.column("B").hidden(true);
        sheet.column("C").hidden(true);

        sheet.column("A").width(35);
        sheet.column("B").width(35);
        sheet.column("D").width(35);
        sheet.column("E").width(35);
        sheet.column("G").width(35);
      });

      return workbook
        .outputAsync()
        .then((workbookBlob) => URL.createObjectURL(workbookBlob));
    });
  };

  return createDownLoadData();
};

export default ExcelExportHelperSplitter;
