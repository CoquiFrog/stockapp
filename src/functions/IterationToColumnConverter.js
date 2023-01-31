export const IterationToColumnConverter = (i) => {
    // console.log(i);
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
        // jo
        18: function () {
            column = "AZ";
        },
        19: function () {
            column = "BC";
        },
        20: function () {
            column = "BF";
        },
        21: function () {
            column = "BI";
        },
        22: function () {
            column = "BL";
        },
        23: function () {
            column = "BO";
        },
        24: function () {
            column = "BR";
        },
        25: function () {
            column = "BU";
        },
        26: function () {
            column = "BX";
        },
        27: function () {
            column = "CA";
        },
        28: function () {
            column = "CD";
        },
        29: function () {
            column = "CG";
        },
        30: function () {
            column = "CJ";
        },
        31: function () {
            column = "CM";
        },
        33: function () {
            column = "CP";
        },
        34: function () {
            column = "CS";
        },
        35: function () {
            column = "CV";
        },
        36: function () {
            column = "CY";
        },
        37: function () {
            column = "DB";
        },
        38: function () {
            column = "DE";
        },
        39: function () {
            column = "DH";
        },
        40: function () {
            column = "DK";
        },
        41: function () {
            column = "DN";
        },
        42: function () {
            column = "DQ";
        },
        43: function () {
            column = "DT";
        },
        44: function () {
            column = "DW";
        },
        45: function () {
            column = "DZ";
        },
        46: function () {
            column = "EC";
        },
        47: function () {
            column = "EF";
        },
        48: function () {
            column = "EI";
        },
        49: function () {
            column = "EL";
        },
        50: function () {
            column = "EO";
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