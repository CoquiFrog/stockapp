import * as XLSX from "xlsx";
import * as XlsxPopulate from "xlsx-populate/browser/xlsx-populate";
import NumberToLetterConverter from "../functions/NumberToLetterConverter";
import StyleConfig from '../constants/StyleConfig'

export const AddStyle = (workbookBlob, howManyColumns, howManyRows, hideHighLowNumbers) => {
  // Add one row for title
  howManyRows = howManyRows + 1;
  
  return XlsxPopulate.fromDataAsync(workbookBlob).then((workbook) => {

    workbook.sheets().forEach((sheet) => {
      // Style Whole Page Here
      sheet.usedRange().style({
        fontFamily: StyleConfig.MAIN_FONT,
        horizontalAlignment: StyleConfig.MAIN_TEXT_HORIZONTAL_ALIGNMENT,
      });

      for (let i=0; i < (howManyColumns + 1); i++) {
        let columnAddress =  NumberToLetterConverter(i);
        let columnAndRowAddress = columnAddress + 1;
        let cellValue = sheet.cell(columnAndRowAddress).value();

        // Set date range for one chunked array
        let chunkedRange =  (columnAddress + 2) + ':' + (columnAddress + howManyRows);

        if (cellValue === "Date") {
          // Apply background color to column range
          sheet.range(chunkedRange).style("fill", StyleConfig.DATE_COLUMN_BACKGROUND_COLOR);

          // Column Width
          sheet.column(columnAddress).width(StyleConfig.DATE_COLUMN_WIDTH);

          // Title Cell Background Color
          sheet.cell(columnAndRowAddress).style("fill", StyleConfig.DATE_TITLE_BACKGROUND_COLOR)
        }
        if (cellValue === "Price") {
          // Apply background color to column range
          sheet.range(chunkedRange).style("fill", StyleConfig.PRICE_COLUMN_BACKGROUND_COLOR);

          // Column Width
          sheet.column(columnAddress).width(StyleConfig.PRICE_COLUMN_WIDTH);

          // Title Cell Background Color
          sheet.cell(columnAndRowAddress).style("fill", StyleConfig.PRICE_TITLE_BACKGROUND_COLOR)
        }
        if (cellValue === "High") {
          // Apply background color to column range
          sheet.range(chunkedRange).style("fill", StyleConfig.HIGH_COLUMN_BACKGROUND_COLOR);
          
          // Column Width
          sheet.column(columnAddress).width(StyleConfig.HIGH_COLUMN_WIDTH);
          
          // Title Cell Background Color
          sheet.cell(columnAndRowAddress).style("fill", StyleConfig.HIGH_TITLE_BACKGROUND_COLOR)

          // Loop through entire column and check each value
          for (let j=2; j < howManyRows; j++) {
            let currentCell = columnAddress + j;
            let cellValue = sheet.cell(currentCell).value();
            // check for exclamation
            if (cellValue && cellValue[0] === " ") {
              //  console.log('I am fractal high', cellValue)
              sheet.cell(currentCell).style("fill", StyleConfig.GREEN_GREEN);
            }
          }
        }
        if (cellValue === "Low") {
          // Apply background color to column range
          sheet.range(chunkedRange).style("fill", StyleConfig.LOW_COLUMN_BACKGROUND_COLOR);
          
          // Column Width
          sheet.column(columnAddress).width(StyleConfig.LOW_COLUMN_WIDTH);
          
          // Title Cell Background Color
          sheet.cell(columnAndRowAddress).style("fill", StyleConfig.LOW_TITLE_BACKGROUND_COLOR)

          // Loop through entire column and check each value
          for (let j=2; j < howManyRows; j++) {
            let currentCell = columnAddress + j;
            let cellValue = sheet.cell(currentCell).value();
            if (cellValue && cellValue[0] === " ") {
              sheet.cell(currentCell).style("fill", StyleConfig.RED_RED);
            }
          }
        }
        if (!cellValue){
          // Column Width
          sheet.column(columnAddress).width(StyleConfig.EMPTY_COLUMN_WIDTH);
        }
        if (hideHighLowNumbers) {
          if (cellValue === "High") {
            sheet.column(columnAddress).hidden(true);
          }
          if (cellValue === "Low") {
            sheet.column(columnAddress).hidden(true);
          }
        }
      }
      });

      return workbook
        .outputAsync()
        .then((workbookBlob) => URL.createObjectURL(workbookBlob));
    });
  };

export default AddStyle;
