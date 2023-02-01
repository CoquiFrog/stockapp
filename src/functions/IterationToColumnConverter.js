// This iterates with enough room for date and price columns

export const IterationToColumnConverter = (i) => {
    // console.log(i);
    function grabColumnFromList(i) {

    
    var column;
    var columnList = {
        0: function () {
            column = "A";
        },
        1: function () {
            column = "D";
        },
        2: function () {
            column = "G";
        },
        3: function () {
            column = "J";
        },
        4: function () {
            column = "M";
        },
        5: function () {
            column = "P";
        },
        6: function () {
            column = "S";
        },
        7: function () {
            column = "V";
        },
        8: function () {
            column = "Y";
        },
        9: function () {
            column = "AB";
        },
        10: function () {
            column = "AE";
        },
        11: function () {
            column = "AH";
        },
        12: function () {
            column = "AK";
        },
        13: function () {
            column = "AN";
        },
        14: function () {
            column = "AQ";
        },
        15: function () {
            column = "AT";
        },
        16: function () {
            column = "AW";
        },
        17: function () {
            column = "AZ";
        },
        18: function () {
            column = "BC";
        },
        19: function () {
            column = "BF";
        },
        20: function () {
            column = "BI";
        },
        21: function () {
            column = "BL";
        },
        22: function () {
            column = "BO";
        },
        23: function () {
            column = "BR";
        },
        24: function () {
            column = "BU";
        },
        25: function () {
            column = "BX";
        },
        26: function () {
            column = "CA";
        },
        27: function () {
            column = "CD";
        },
        28: function () {
            column = "CG";
        },
        29: function () {
            column = "CJ";
        },
        30: function () {
            column = "CM";
        },
        31: function () {
            column = "CP";
        },
        33: function () {
            column = "CS";
        },
        34: function () {
            column = "CV";
        },
        35: function () {
            column = "CY";
        },
        36: function () {
            column = "DB";
        },
        37: function () {
            column = "DE";
        },
        38: function () {
            column = "DH";
        },
        39: function () {
            column = "DK";
        },
        40: function () {
            column = "DN";
        },
        41: function () {
            column = "DQ";
        },
        42: function () {
            column = "DT";
        },
        43: function () {
            column = "DW";
        },
        44: function () {
            column = "DZ";
        },
        45: function () {
            column = "EC";
        },
        46: function () {
            column = "EF";
        },
        47: function () {
            column = "EI";
        },
        48: function () {
            column = "EL";
        },
        49: function () {
            column = "EO";
        },
        50: function () {
            column = "ER";
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