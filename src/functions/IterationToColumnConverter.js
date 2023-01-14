export const IterationToColumnConverter = (i) => {
    console.log(i);
    function grabColumnFromList(i) {

    
    var column;
    var columnList = {
        1: function () {
            column = "A";
        },
        2: function () {
            column = "D";
        },
        3: function () {
            column = "G";
        },
        4: function () {
            column = "J";
        },
        5: function () {
            column = "M";
        },
        6: function () {
            column = "P";
        },
        7: function () {
            column = "S";
        },
        8: function () {
            column = "V";
        },
        9: function () {
            column = "Y";
        },
        10: function () {
            column = "AB";
        },
        11: function () {
            column = "AE";
        },
        12: function () {
            column = "AH";
        },
        13: function () {
            column = "AK";
        },
        14: function () {
            column = "AN";
        },
        15: function () {
            column = "AQ";
        },
        16: function () {
            column = "AT";
        },
        17: function () {
            column = "AW";
        },
        'default': function () {
            column = "A"
        }
    };

        (columnList[i] || columnList['default'])();
        return column;
    }
    var column = grabColumnFromList(i);
    return column;
}

export default IterationToColumnConverter;


// split order -> D, G, J, M, P, S, V, Y, AB, AE, AH, AK, AN, AQ, AT, AW