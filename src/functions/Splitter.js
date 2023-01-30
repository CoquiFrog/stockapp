export const SplitterFunction = (excelData, chunk, callback) => {
    for (let i=0, counter=0; i < excelData.length; i+= chunk, counter=counter+1) {
        let tempArray;
        tempArray = excelData.slice(i, i + chunk);
        callback(tempArray, counter);
    }
}

export default SplitterFunction;