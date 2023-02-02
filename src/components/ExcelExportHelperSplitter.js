import React from "react";
import * as XLSX from "xlsx";
import * as XlsxPopulate from "xlsx-populate/browser/xlsx-populate";
import NumberToLetterConverter from "../functions/NumberToLetterConverter";
import StyleConfig from '../constants/StyleConfig'

const ExcelExportHelperSplitter = (data, howManyColumns, howManyRows) => {
  console.log('data Check ', data)
  
  const createDownLoadData = () => {
    handleExport().then((url) => {
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

    //create a 8 bit integer array
    const view = new Uint8Array(buf);

    //charCodeAt The charCodeAt() method returns an integer between 0 and 65535 representing the UTF-16 code
    for (let i = 0; i !== s.length; ++i) {
      view[i] = s.charCodeAt(i);
    }

    return buf;
  };

  const handleExport = () => {
    const workbookBlob = workbook2blob(data);

    return addStyle(workbookBlob);
  };

  const addStyle = (workbookBlob) => {
    return XlsxPopulate.fromDataAsync(workbookBlob).then((workbook) => {

    workbook.sheets().forEach((sheet) => {
      // Style Whole Page Here
      sheet.usedRange().style({
        fontFamily: StyleConfig.MAIN_FONT,
        horizontalAlignment: StyleConfig.MAIN_TEXT_HORIZONTAL_ALIGNMENT,
      });

      for (let i=0, counter=0; i < howManyColumns; i++) {
        let columnAddress =  NumberToLetterConverter(i);
        let columnAndRowAddress = columnAddress + 1;
        let cellValue = sheet.cell(columnAndRowAddress).value();

        // Set date range for one chunked array
        let chunkedRange =  (columnAddress + 2) + ':' + (columnAddress + howManyRows);

        if (cellValue === "Date") {
          // Apply background color to column range
          sheet.range(chunkedRange).style("fill", StyleConfig.DATE_TITLE_BACKGROUND_COLOR);

          // Set Date column width
          sheet.column(columnAddress).width(StyleConfig.DATE_COLUMN_WIDTH);

          // Fill Title Cell Orange
          sheet.cell(columnAndRowAddress).style("fill", StyleConfig.DATE_COLUMN_BACKGROUND_COLOR)
        }
        if (cellValue === "Price") {
          // Apply background color to column range
          sheet.range(chunkedRange).style("fill", StyleConfig.PRICE_COLUMN_BACKGROUND_COLOR);

          // Set Price Column Width
          sheet.column(columnAddress).width(StyleConfig.PRICE_COLUMN_WIDTH);

          // Fill Title Cell Violet
          sheet.cell(columnAndRowAddress).style("fill", StyleConfig.PRICE_TITLE_BACKGROUND_COLOR)
        }
        if (cellValue === "High") {
          // Apply background color to column range
          sheet.range(chunkedRange).style("fill", StyleConfig.HIGH_COLUMN_BACKGROUND_COLOR);

          // Set Price Column Width
          sheet.column(columnAddress).width(StyleConfig.HIGH_COLUMN_WIDTH);

          // Fill Title Cell Violet
          sheet.cell(columnAndRowAddress).style("fill", StyleConfig.HIGH_TITLE_BACKGROUND_COLOR)
        }
        if (cellValue === "Low") {
          // Apply background color to column range
          sheet.range(chunkedRange).style("fill", StyleConfig.LOW_COLUMN_BACKGROUND_COLOR);

          // Set Price Column Width
          sheet.column(columnAddress).width(StyleConfig.LOW_COLUMN_WIDTH);

          // Fill Title Cell Violet
          sheet.cell(columnAndRowAddress).style("fill", StyleConfig.LOW_TITLE_BACKGROUND_COLOR)
        }
        if (!cellValue){
          // Set Empty Column Width
          sheet.column(columnAddress).width(StyleConfig.EMPTY_COLUMN_WIDTH);
        }
      }
        // sheet.column("A").hidden(true);
      });

      return workbook
        .outputAsync()
        .then((workbookBlob) => URL.createObjectURL(workbookBlob));
    });
  };

  return createDownLoadData();
};

export default ExcelExportHelperSplitter;
