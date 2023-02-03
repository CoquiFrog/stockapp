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
        32: function () {
            column = "CS";
        },
        33: function () {
            column = "CV";
        },
        34: function () {
            column = "CY";
        },
        35: function () {
            column = "DB";
        },
        36: function () {
            column = "DE";
        },
        37: function () {
            column = "DH";
        },
        38: function () {
            column = "DK";
        },
        39: function () {
            column = "DN";
        },
        40: function () {
            column = "DQ";
        },
        41: function () {
            column = "DT";
        },
        42: function () {
            column = "DW";
        },
        43: function () {
            column = "DZ";
        },
        44: function () {
            column = "EC";
        },
        45: function () {
            column = "EF";
        },
        46: function () {
            column = "EI";
        },
        47: function () {
            column = "EL";
        },
        48: function () {
            column = "EO";
        },
        49: function () {
            column = "ER";
        },
        50: function () {
            column = "EU";
        },
        51: function () {
            column = "EX";
        },
        52: function () {
            column = "FA";
        },
        53: function () {
            column = "FD";
        },
        54: function () {
            column = "FG";
        },
        55: function () {
            column = "FJ";
        },
        56: function () {
            column = "FM";
        },
        57: function () {
            column = "FP";
        },
        58: function () {
            column = "FS";
        },
        59: function () {
            column = "FV";
        },
        60: function () {
            column = "FY";
        },
        61: function () {
            column = "GB";
        },
        62: function () {
            column = "GE";
        },
        63: function () {
            column = "GH";
        },
        64: function () {
            column = "GK";
        },
        65: function () {
            column = "GN";
        },
        66: function () {
            column = "GQ";
        },
        67: function () {
            column = "GT";
        },
        68: function () {
            column = "GW";
        },
        69: function () {
            column = "GZ";
        },
        70: function () {
            column = "HC";
        },
        71: function () {
            column = "HF";
        },
        72: function () {
            column = "HI";
        },
        73: function () {
            column = "HL";
        },
        74: function () {
            column = "HO";
        },
        75: function () {
            column = "HR";
        },
        76: function () {
            column = "HU";
        },
        77: function () {
            column = "HX";
        },
        78: function () {
            column = "IA";
        },
        79: function () {
            column = "ID";
        },
        80: function () {
            column = "IG";
        },
        81: function () {
            column = "IJ";
        },
        82: function () {
            column = "IM";
        },
        83: function () {
            column = "IP";
        },
        84: function () {
            column = "IS";
        },
        85: function () {
            column = "IV";
        },
        86: function () {
            column = "IY";
        },
        87: function () {
            column = "JB";
        },
        88: function () {
            column = "JE";
        },
        89: function () {
            column = "JH";
        },
        90: function () {
            column = "JK";
        },
        91: function () {
            column = "JN";
        },
        92: function () {
            column = "JQ";
        },
        93: function () {
            column = "JT";
        },
        94: function () {
            column = "JZ";
        },
        95: function () {
            column = "KC";
        },
        96: function () {
            column = "KF";
        },
        97: function () {
            column = "KI";
        },
        98: function () {
            column = "KL";
        },
        99: function () {
            column = "KO";
        },
        100: function () {
            column = "KR";
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