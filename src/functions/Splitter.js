export const SplitterFunction = (excelData, chunk) => {
    for (let i=0; i < excelData.length; i+= chunk) {
        let tempArray;
        tempArray = excelData.slice(i, i + chunk);
        console.log(tempArray);
    }
    console.log('filter fired');
}

export default SplitterFunction;