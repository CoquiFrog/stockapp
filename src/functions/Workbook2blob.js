import S2ab from '../functions/S2ab';
import * as XLSX from "xlsx";

export const Workbook2blob = (workbook) => {
    const wopts = {
      bookType: "xlsx",
      bookSST: false,
      type: "binary",
    };

    const wbout = XLSX.write(workbook, wopts);

    // The application/octet-stream MIME type is used for unknown binary files.
    // It preserves the file contents, but requires the receiver to determine file type,
    // for example, from the filename extension.
    const blob = new Blob([S2ab(wbout)], {
      type: "application/octet-stream",
    });

    return blob;
  };

export default Workbook2blob;