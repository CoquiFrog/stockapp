export const LetterToNumberConverter = (i) => {
    // console.log(i);
    function grabColumnFromList(i) {

    
    var column;
    var columnList = {
        "A": function () {
            column = 1;
        },
        "B": function () {
            column = 2;
        },
        "C": function () {
            column = 3;
        },
        "D": function () {
            column = 4;
        },
        "E": function () {
            column = 5;
        },
        "F": function () {
            column = 6;
        },
        "G": function () {
            column = 7;
        },
        "H": function () {
            column = 8;
        },
        "I": function () {
            column = 9;
        },
        "J": function () {
            column = 10;
        },
        "K": function () {
            column = 11;
        },
        "L": function () {
            column = 12;
        },
        "M": function () {
            column = 13;
        },
        "N": function () {
            column = 14;
        },
        "O": function () {
            column = 15;
        },
        "P": function () {
            column = 16;
        },
        "Q": function () {
            column = 17;
        },
        "R": function () {
            column = 18;
        },
        "S": function () {
            column = 19;
        },
        "T": function () {
            column = 20;
        },
        "U": function () {
            column = 21;
        },
        "V": function () {
            column = 22;
        },
        "W": function () {
            column = 23;
        },
        "X": function () {
            column = 24;
        },
        "Y": function () {
            column = 25;
        },
        "Z": function () {
            column = 26;
        },
        "AA": function () {
            column = 27;
        },
        "AB": function () {
            column = 28;
        },
        "AC": function () {
            column = 29;
        },
        "AD": function () {
            column = 30;
        },
        "AE": function () {
            column = 31;
        },
        "AF": function () {
            column = 32;
        },
        "AG": function () {
            column = 33;
        },
        "AH": function () {
            column = 34;
        },
        "AI": function () {
            column = 35;
        },
        "AJ": function () {
            column = 36;
        },
        "AK": function () {
            column = 37;
        },
        "AL": function () {
            column = 38;
        },
        "AM": function () {
            column = 39;
        },
        "AN": function () {
            column = 40;
        },
        "AO": function () {
            column = 41;
        },
        "AP": function () {
            column = 42;
        },
        "AQ": function () {
            column = 43;
        },
        "AR": function () {
            column = 44;
        },
        "AS": function () {
            column = 45;
        },
        "AT": function () {
            column = 46;
        },
        "AU": function () {
            column = 47;
        },
        "AV": function () {
            column = 48;
        },
        "AW": function () {
            column = 49;
        },
        "AX": function () {
            column = 50;
        },
        "AY": function () {
            column = 51;
        },
        "AZ": function () {
            column = 52;
        },
        "BA": function () {
            column = 53;
        },
        "BB": function () {
            column = 54;
        },
        "BC": function () {
            column = 55;
        },
        "BD": function () {
            column = 56;
        },
        "BE": function () {
            column = 57;
        },
        "BF": function () {
            column = 58;
        },
        "BG": function () {
            column = 59;
        },
        "BH": function () {
            column = 60;
        },
        "BI": function () {
            column = 61;
        },
        "BJ": function () {
            column = 62;
        },
        "BK": function () {
            column = 63;
        },
        "BL": function () {
            column = 64;
        },
        "BM": function () {
            column = 65;
        },
        "BN": function () {
            column = 66;
        },
        "BO": function () {
            column = 67;
        },
        "BP": function () {
            column = 68;
        },
        "BQ": function () {
            column = 69;
        },
        "BR": function () {
            column = 70;
        },
        "BS": function () {
            column = 71;
        },
        "BT": function () {
            column = 72;
        },
        "BU": function () {
            column = 73;
        },
        "BV": function () {
            column = 74;
        },
        "BW": function () {
            column = 75;
        },
        "BX": function () {
            column = 76;
        },
        "BY": function () {
            column = 77;
        },
        "BZ": function () {
            column = 78;
        },
        "CA": function () {
            column = 79;
        },
        "CB": function () {
            column = 80;
        },
        "CC": function () {
            column = 81;
        },
        "CD": function () {
            column = 82;
        },
        "CE": function () {
            column = 83;
        },
        "CF": function () {
            column = 84;
        },
        "CG": function () {
            column = 85;
        },
        "CH": function () {
            column = 86;
        },
        "CI": function () {
            column = 87;
        },
        "CJ": function () {
            column = 88;
        },
        "CK": function () {
            column = 89;
        },
        "CL": function () {
            column = 90;
        },
        "CM": function () {
            column = 91;
        },
        "CN": function () {
            column = 92;
        },
        "CO": function () {
            column = 93;
        },
        "CP": function () {
            column = 94;
        },
        "CQ": function () {
            column = 95;
        },
        "CR": function () {
            column = 96;
        },
        "CS": function () {
            column = 97;
        },
        "CT": function () {
            column = 98;
        },
        "CU": function () {
            column = 99;
        },
        "CV": function () {
            column = 100;
        },
        "CW": function () {
            column = 101;
        },
        "CX": function () {
            column = 102;
        },
        "CY": function () {
            column = 103;
        },
        "CZ": function () {
            column = 104;
        },
        "DA": function () {
            column = 105;
        },
        "DB": function () {
            column = 106;
        },
        "DC": function () {
            column = 107;
        },
        "DD": function () {
            column = 108;
        },
        "DE": function () {
            column = 109;
        },
        "DF": function () {
            column = 110;
        },
        "DG": function () {
            column = 111;
        },
        "DH": function () {
            column = 112;
        },
        "DI": function () {
            column = 113;
        },
        "DJ": function () {
            column = 114;
        },
        "DK": function () {
            column = 115;
        },
        "DL": function () {
            column = 116;
        },
        "DM": function () {
            column = 117;
        },
        "DN": function () {
            column = 118;
        },
        "DO": function () {
            column = 119;
        },
        "DP": function () {
            column = 120;
        },
        "DQ": function () {
            column = 121;
        },
        "DR": function () {
            column = 122;
        },
        "DS": function () {
            column = 123;
        },
        "DT": function () {
            column = 124;
        },
        "DU": function () {
            column = 125;
        },
        "DV": function () {
            column = 126;
        },
        "DW": function () {
            column = 127;
        },
        "DX": function () {
            column = 128;
        },
        "DY": function () {
            column = 129;
        },
        "DZ": function () {
            column = 130;
        },
        "EA": function () {
            column = 131;
        },
        "EB": function () {
            column = 132;
        },
        "EC": function () {
            column = 133;
        },
        "ED": function () {
            column = 134;
        },
        "EE": function () {
            column = 135;
        },
        "EF": function () {
            column = 136;
        },
        "EG": function () {
            column = 137;
        },
        "EH": function () {
            column = 138;
        },
        "EI": function () {
            column = 139;
        },
        "EJ": function () {
            column = 140;
        },
        "EK": function () {
            column = 141;
        },
        "EL": function () {
            column = 142;
        },
        "EM": function () {
            column = 143;
        },
        "EN": function () {
            column = 144;
        },
        "EO": function () {
            column = 145;
        },
        "EP": function () {
            column = 146;
        },
        "EQ": function () {
            column = 147;
        },
        "ER": function () {
            column = 148;
        },
        "ES": function () {
            column = 149;
        },
        "ET": function () {
            column = 150;
        },
        "EU": function () {
            column = 151;
        },
        "EV": function () {
            column = 152;
        },
        "EW": function () {
            column = 153;
        },
        "EX": function () {
            column = 154;
        },
        "EY": function () {
            column = 155;
        },
        "EZ": function () {
            column = 156;
        },
        "FA": function () {
            column = 157;
        },
        "FB": function () {
            column = 158;
        },
        "FC": function () {
            column = 159;
        },
        "FD": function () {
            column = 160;
        },
        "FE": function () {
            column = 161;
        },
        "FF": function () {
            column = 162;
        },
        "FG": function () {
            column = 163;
        },
        "FH": function () {
            column = 164;
        },
        "FI": function () {
            column = 165;
        },
        "FJ": function () {
            column = 166;
        },
        "FK": function () {
            column = 167;
        },
        "FL": function () {
            column = 168;
        },
        "FM": function () {
            column = 169;
        },
        "FN": function () {
            column = 170;
        },
        "FO": function () {
            column = 171;
        },
        "FP": function () {
            column = 172;
        },
        "FQ": function () {
            column = 173;
        },
        "FR": function () {
            column = 174;
        },
        "FS": function () {
            column = 175;
        },
        "FT": function () {
            column = 176;
        },
        "FU": function () {
            column = 177;
        },
        "FV": function () {
            column = 178;
        },
        "FW": function () {
            column = 179;
        },
        "FX": function () {
            column = 180;
        },
        "FY": function () {
            column = 181;
        },
        "FZ": function () {
            column = 182;
        },
        "GA": function () {
            column = 183;
        },
        "GB": function () {
            column = 184;
        },
        "GC": function () {
            column = 185;
        },
        "GD": function () {
            column = 186;
        },
        "GE": function () {
            column = 187;
        },
        "GF": function () {
            column = 188;
        },
        "GG": function () {
            column = 189;
        },
        "GH": function () {
            column = 190;
        },
        "GI": function () {
            column = 191;
        },
        "GJ": function () {
            column = 192;
        },
        "GK": function () {
            column = 193;
        },
        "GL": function () {
            column = 194;
        },
        "GM": function () {
            column = 195;
        },
        "GN": function () {
            column = 196;
        },
        "GO": function () {
            column = 197;
        },
        "GP": function () {
            column = 198;
        },
        "GQ": function () {
            column = 199;
        },
        "GR": function () {
            column = 200;
        },
        "GS": function () {
            column = 201;
        },
        "GT": function () {
            column = 202;
        },
        "GU": function () {
            column = 203;
        },
        "GV": function () {
            column = 204;
        },
        "GW": function () {
            column = 205;
        },
        "GX": function () {
            column = 206;
        },
        "GY": function () {
            column = 207;
        },
        "GZ": function () {
            column = 208;
        },
        "HA": function () {
            column = 209;
        },
        "HB": function () {
            column = 210;
        },
        "HC": function () {
            column = 211;
        },
        "HD": function () {
            column = 212;
        },
        "HE": function () {
            column = 213;
        },
        "HF": function () {
            column = 214;
        },
        "HG": function () {
            column = 215;
        },
        "HH": function () {
            column = 216;
        },
        "HI": function () {
            column = 217;
        },
        "HJ": function () {
            column = 218;
        },
        "HK": function () {
            column = 219;
        },
        "HL": function () {
            column = 220;
        },
        "HM": function () {
            column = 221;
        },
        "HN": function () {
            column = 222;
        },
        "HO": function () {
            column = 223;
        },
        "HP": function () {
            column = 224;
        },
        "HQ": function () {
            column = 225;
        },
        "HR": function () {
            column = 226;
        },
        "HS": function () {
            column = 227;
        },
        "HT": function () {
            column = 228;
        },
        "HU": function () {
            column = 229;
        },
        "HV": function () {
            column = 230;
        },
        "HW": function () {
            column = 231;
        },
        "HX": function () {
            column = 232;
        },
        "HY": function () {
            column = 233;
        },
        "HZ": function () {
            column = 234;
        },
        "IA": function () {
            column = 235;
        },
        "IB": function () {
            column = 236;
        },
        "IC": function () {
            column = 237;
        },
        "ID": function () {
            column = 238;
        },
        "IE": function () {
            column = 239;
        },
        "IF": function () {
            column = 240;
        },
        "IG": function () {
            column = 241;
        },
        "IH": function () {
            column = 242;
        },
        "II": function () {
            column = 243;
        },
        "IJ": function () {
            column = 244;
        },
        "IK": function () {
            column = 245;
        },
        "IL": function () {
            column = 246;
        },
        "IM": function () {
            column = 247;
        },
        "IN": function () {
            column = 248;
        },
        "IO": function () {
            column = 249;
        },
        "IP": function () {
            column = 250;
        },
        "IQ": function () {
            column = 251;
        },
        "IR": function () {
            column = 252;
        },
        "IS": function () {
            column = 253;
        },
        "IT": function () {
            column = 254;
        },
        "IU": function () {
            column = 255;
        },
        "IV": function () {
            column = 256;
        },
        "IW": function () {
            column = 257;
        },
        "IX": function () {
            column = 258;
        },
        "IY": function () {
            column = 259;
        },
        "IZ": function () {
            column = 260;
        },
        "JA": function () {
            column = 261;
        },
        "JB": function () {
            column = 262;
        },
        "JC": function () {
            column = 263;
        },
        "JD": function () {
            column = 264;
        },
        "JE": function () {
            column = 265;
        },
        "JF": function () {
            column = 266;
        },
        "JG": function () {
            column = 267;
        },
        "JH": function () {
            column = 268;
        },
        "JI": function () {
            column = 269;
        },
        "JJ": function () {
            column = 270;
        },
        "JK": function () {
            column = 271;
        },
        "JL": function () {
            column = 272;
        },
        "JM": function () {
            column = 273;
        },
        "JN": function () {
            column = 274;
        },
        "JO": function () {
            column = 275;
        },
        "JP": function () {
            column = 276;
        },
        "JQ": function () {
            column = 277;
        },
        "JR": function () {
            column = 278;
        },
        "JS": function () {
            column = 279;
        },
        "JT": function () {
            column = 280;
        },
        "JU": function () {
            column = 281;
        },
        "JV": function () {
            column = 282;
        },
        "JW": function () {
            column = 283;
        },
        "JW": function () {
            column = 284;
        },
        "JY": function () {
            column = 285;
        },
        "JZ": function () {
            column = 286;
        },
        "KA": function () {
            column = 287;
        },
        "KB": function () {
            column = 288;
        },
        "KC": function () {
            column = 289;
        },
        "KD": function () {
            column = 290;
        },
        "KE": function () {
            column = 291;
        },
        "KF": function () {
            column = 292;
        },
        "KG": function () {
            column = 293;
        },
        "KH": function () {
            column = 294;
        },
        "KI": function () {
            column = 295;
        },
        "KJ": function () {
            column = 296;
        },
        "KK": function () {
            column = 297;
        },
        "KL": function () {
            column = 298;
        },
        "KM": function () {
            column = 299;
        },
        "KN": function () {
            column = 300;
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

export default LetterToNumberConverter;

