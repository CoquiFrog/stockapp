import * as XLSX from "xlsx";

export const ReadDates = (file, props) => {
    const promise = new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(file);

        fileReader.onload = (e) => {
            const bufferArray = e.target.result;
            const wb = XLSX.read(bufferArray, { type: "buffer" });
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            const data = XLSX.utils.sheet_to_json(ws);
            resolve(data);
        }

        fileReader.oneerror = (error) => {
            reject(error);
        };
    });

    promise.then((data) => {
        console.log('data: ', data);
        // props.grabOverlayDataAndSetToState(data);

        props.grabFractalAndSetToState(data);
    });
}

export default ReadDates;