export const SplitterFunction = (excelData, chunk, callback) => {
    for (let i=0; i < excelData.length; i+= chunk) {
        let tempArray;
        tempArray = excelData.slice(i, i + chunk);
        console.log(tempArray);
        callback(tempArray);
    }
    console.log('filter fired');
}

export default SplitterFunction;