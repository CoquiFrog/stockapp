export const DateConversion = (serial) => {
    var utc_days  = Math.floor(serial - 25568);
    var utc_value = utc_days * 86400;                                        
    var date_info = new Date(utc_value * 1000);
    var year = date_info.getFullYear();
    var month = date_info.getMonth() + 1;
    var day = date_info.getUTCDate();
    var filteredDate = year + '-' + month + '-' + day;
    return filteredDate;
 
}

export default DateConversion;