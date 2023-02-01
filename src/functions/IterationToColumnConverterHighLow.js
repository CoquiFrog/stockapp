// This iterates with enough room for date, price, high and low columns

export const IterationToColumnConverterHighLow = (i) => {
    // console.log(i);
    function grabColumnFromList(i) {

    
    var column;
    var columnList = {
        0: function () {
            column = "A";
        },
        1: function () {
            column = "F";
        },
        2: function () {
            column = "K";
        },
        3: function () {
            column = "P";
        },
        4: function () {
            column = "U";
        },
        5: function () {
            column = "Z";
        },
        6: function () {
            column = "AE";
        },
        7: function () {
            column = "AJ";
        },
        8: function () {
            column = "AO";
        },
        9: function () {
            column = "AT";
        },
        10: function () {
            column = "AY";
        },
        11: function () {
            column = "BD";
        },
        12: function () {
            column = "BI";
        },
        13: function () {
            column = "BN";
        },
        14: function () {
            column = "BS";
        },
        15: function () {
            column = "BX";
        },
        16: function () {
            column = "CC";
        },
        17: function () {
            column = "CH";
        },
        18: function () {
            column = "CM";
        },
        19: function () {
            column = "CR";
        },
        20: function () {
            column = "CW";
        },
        21: function () {
            column = "DB";
        },
        22: function () {
            column = "DG";
        },
        23: function () {
            column = "DL";
        },
        24: function () {
            column = "DQ";
        },
        25: function () {
            column = "DV";
        },
        26: function () {
            column = "EA";
        },
        27: function () {
            column = "EF";
        },
        28: function () {
            column = "EK";
        },
        29: function () {
            column = "EP";
        },
        30: function () {
            column = "EU";
        },
        31: function () {
            column = "EZ";
        },
        32: function () {
            column = "FE";
        },
        33: function () {
            column = "FJ";
        },
        34: function () {
            column = "FO";
        },
        35: function () {
            column = "FT";
        },
        36: function () {
            column = "FY";
        },
        37: function () {
            column = "GD";
        },
        38: function () {
            column = "GI";
        },
        39: function () {
            column = "GN";
        },
        40: function () {
            column = "GS";
        },
        41: function () {
            column = "GX";
        },
        42: function () {
            column = "HC";
        },
        43: function () {
            column = "HH";
        },
        44: function () {
            column = "HM";
        },
        45: function () {
            column = "HR";
        },
        46: function () {
            column = "HW";
        },
        47: function () {
            column = "IB";
        },
        48: function () {
            column = "IG";
        },
        49: function () {
            column = "IL";
        },
        50: function () {
            column = "IQ";
        },
        51: function () {
            column = "IV";
        },
        52: function () {
            column = "JA";
        },
        53: function () {
            column = "JF";
        },
        54: function () {
            column = "JK";
        },
        55: function () {
            column = "JP";
        },
        56: function () {
            column = "JU";
        },
        57: function () {
            column = "JZ";
        },
        58: function () {
            column = "KE";
        },
        59: function () {
            column = "KJ";
        },
        60: function () {
            column = "KO";
        },
        61: function () {
            column = "KT";
        },
        62: function () {
            column = "KY";
        },
        63: function () {
            column = "LD";
        },
        64: function () {
            column = "LI";
        },
        65: function () {
            column = "LN";
        },
        66: function () {
            column = "LS";
        },
        67: function () {
            column = "LX";
        },
        68: function () {
            column = "MC";
        },
        69: function () {
            column = "MH";
        },
        70: function () {
            column = "MM";
        },
        71: function () {
            column = "MR";
        },
        72: function () {
            column = "MW";
        },
        73: function () {
            column = "NB";
        },
        74: function () {
            column = "NG";
        },
        75: function () {
            column = "NL";
        },
        76: function () {
            column = "NQ";
        },
        77: function () {
            column = "NV";
        },
        78: function () {
            column = "OA";
        },
        79: function () {
            column = "OF";
        },
        80: function () {
            column = "OK";
        },
        81: function () {
            column = "OP";
        },
        82: function () {
            column = "OU";
        },
        83: function () {
            column = "OZ";
        },
        84: function () {
            column = "PE";
        },
        85: function () {
            column = "PJ";
        },
        86: function () {
            column = "PO";
        },
        87: function () {
            column = "PT";
        },
        88: function () {
            column = "PY";
        },
        89: function () {
            column = "QD";
        },
        90: function () {
            column = "QI";
        },
        91: function () {
            column = "QN";
        },
        92: function () {
            column = "QS";
        },
        93: function () {
            column = "QX";
        },
        94: function () {
            column = "RC";
        },
        95: function () {
            column = "RH";
        },
        96: function () {
            column = "RM";
        },
        97: function () {
            column = "RR";
        },
        98: function () {
            column = "RW";
        },
        99: function () {
            column = "SB";
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