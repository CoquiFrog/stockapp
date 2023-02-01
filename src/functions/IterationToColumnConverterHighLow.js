// This iterates with enough room for date, price, high and low columns

export const IterationToColumnConverterHighLow = (i) => {
    // console.log(i);
    function grabColumnFromList(i) {

    
    var column;
    var columnList = {
        1: function () {
            column = "A";
        },
        2: function () {
            column = "F";
        },
        3: function () {
            column = "K";
        },
        4: function () {
            column = "P";
        },
        5: function () {
            column = "U";
        },
        6: function () {
            column = "Z";
        },
        7: function () {
            column = "AE";
        },
        8: function () {
            column = "AJ";
        },
        9: function () {
            column = "AO";
        },
        10: function () {
            column = "AT";
        },
        11: function () {
            column = "AY";
        },
        12: function () {
            column = "BD";
        },
        13: function () {
            column = "BI";
        },
        14: function () {
            column = "BN";
        },
        15: function () {
            column = "BS";
        },
        16: function () {
            column = "BX";
        },
        17: function () {
            column = "CC";
        },
        18: function () {
            column = "CH";
        },
        19: function () {
            column = "CM";
        },
        20: function () {
            column = "CR";
        },
        21: function () {
            column = "CW";
        },
        22: function () {
            column = "DB";
        },
        23: function () {
            column = "DG";
        },
        24: function () {
            column = "DL";
        },
        25: function () {
            column = "DQ";
        },
        26: function () {
            column = "DV";
        },
        27: function () {
            column = "EA";
        },
        28: function () {
            column = "EF";
        },
        29: function () {
            column = "EK";
        },
        30: function () {
            column = "EP";
        },
        31: function () {
            column = "EU";
        },
        32: function () {
            column = "EZ";
        },
        33: function () {
            column = "FE";
        },
        34: function () {
            column = "FJ";
        },
        35: function () {
            column = "FO";
        },
        36: function () {
            column = "FT";
        },
        37: function () {
            column = "FY";
        },
        38: function () {
            column = "GD";
        },
        39: function () {
            column = "GI";
        },
        40: function () {
            column = "GN";
        },
        41: function () {
            column = "GS";
        },
        42: function () {
            column = "GX";
        },
        43: function () {
            column = "HC";
        },
        44: function () {
            column = "HH";
        },
        45: function () {
            column = "HM";
        },
        46: function () {
            column = "HR";
        },
        47: function () {
            column = "HW";
        },
        48: function () {
            column = "IB";
        },
        49: function () {
            column = "IG";
        },
        50: function () {
            column = "IL";
        },
        51: function () {
            column = "IQ";
        },
        52: function () {
            column = "IV";
        },
        53: function () {
            column = "JA";
        },
        54: function () {
            column = "JF";
        },
        55: function () {
            column = "JK";
        },
        56: function () {
            column = "JP";
        },
        57: function () {
            column = "JU";
        },
        58: function () {
            column = "JZ";
        },
        59: function () {
            column = "KE";
        },
        60: function () {
            column = "KJ";
        },
        61: function () {
            column = "KO";
        },
        62: function () {
            column = "KT";
        },
        63: function () {
            column = "KY";
        },
        64: function () {
            column = "LD";
        },
        65: function () {
            column = "LI";
        },
        66: function () {
            column = "LN";
        },
        67: function () {
            column = "LS";
        },
        68: function () {
            column = "LX";
        },
        69: function () {
            column = "MC";
        },
        70: function () {
            column = "MH";
        },
        71: function () {
            column = "MM";
        },
        72: function () {
            column = "MR";
        },
        73: function () {
            column = "MW";
        },
        74: function () {
            column = "NB";
        },
        75: function () {
            column = "NG";
        },
        76: function () {
            column = "NL";
        },
        77: function () {
            column = "NQ";
        },
        78: function () {
            column = "NV";
        },
        79: function () {
            column = "OA";
        },
        80: function () {
            column = "OF";
        },
        81: function () {
            column = "OK";
        },
        82: function () {
            column = "OP";
        },
        83: function () {
            column = "OU";
        },
        84: function () {
            column = "OZ";
        },
        85: function () {
            column = "PE";
        },
        86: function () {
            column = "PJ";
        },
        87: function () {
            column = "PO";
        },
        88: function () {
            column = "PT";
        },
        89: function () {
            column = "PY";
        },
        90: function () {
            column = "QD";
        },
        91: function () {
            column = "QI";
        },
        92: function () {
            column = "QN";
        },
        93: function () {
            column = "QS";
        },
        94: function () {
            column = "QX";
        },
        95: function () {
            column = "RC";
        },
        96: function () {
            column = "RH";
        },
        97: function () {
            column = "RM";
        },
        98: function () {
            column = "RR";
        },
        99: function () {
            column = "RW";
        },
        100: function () {
            column = "SB";
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

export default IterationToColumnConverterHighLow;


// split order -> D, G, J, M, P, S, V, Y, AB, AE, AH, AK, AN, AQ, AT, AW