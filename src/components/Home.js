import React, { useState } from "react";
import "../styling/Home.css";
import ExcelInput from "./ExcelInput";
import DateConversion from '../functions/DateConversion';
import DownloadExcel from "../functions/DownloadExcel";
import SplitExcel from "../functions/SplitExcel";
import FileNameInput from "./FileNameInput";
import ChunkAmountInput from "./ChunkAmountInput";
import * as XLSX from "xlsx";
import {saveAs } from 'file-saver';

export const Home = () => {
    const [excelData, setExcelData] = useState([]);
    const [fileName, setFileName] = useState('testFile');
    const [chunkAmount, setChunkAmount] = useState(10);
    const [sheetNames, setSheetNames] = useState([]);
    const [sheets, setSheets] = useState([]);

    const grabExcelDataAndSetToState = (val) => {
        // filter dates before setting to state
        // trim all the fat off leaving only date and price
        val.map((day) => {
            delete day.Low;
            delete day.Open;
            delete day.High;
            delete day["Vol."];
            delete day["Change %"];
            day.Date = DateConversion(day.Date);
        })

        setExcelData(val);
    }

    const setFileNameToDownload = (val) => {
        setFileName(val);
    }

    const setChunkAmountForClipping = (val) => {
        setChunkAmount(val);
    }
    
    const saveExcelFile = () => {
        DownloadExcel(excelData, fileName, true)
    }
    
    const flipArray = () => {
        const deepCloneExcelDataForceRefresh = [...excelData];
        const flippedArray = deepCloneExcelDataForceRefresh.reverse();
        setExcelData(flippedArray);
    }
    
    const showCurrentData = () => {
        console.log(chunkAmount);
    }

    const splitterFunctionFire = () => {
        SplitExcel(excelData, parseInt(chunkAmount), fileName);
    }

        function datenum(v, date1904) {
            if(date1904) v+=1462;
            var epoch = Date.parse(v);
            return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
        }
        
        function s2ab(s) {
            var buf = new ArrayBuffer(s.length);
            var view = new Uint8Array(buf);
            for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
            return buf;
        }
        
        const sheet_from_array_of_arrays = (data, opts) => {
            var ws = {};
            var range = {s: {c:10000000, r:10000000}, e: {c:0, r:0 }};
            for(var R = 0; R != data.length; ++R) {
                for(var C = 0; C != data[R].length; ++C) {
                    if(range.s.r > R) range.s.r = R;
                    if(range.s.c > C) range.s.c = C;
                    if(range.e.r < R) range.e.r = R;
                    if(range.e.c < C) range.e.c = C;
                    var cell = {v: data[R][C] };
                    if(cell.v == null) continue;
                    var cell_ref = XLSX.utils.encode_cell({c:C,r:R});
                    
                    if(typeof cell.v === 'number') cell.t = 'n';
                    else if(typeof cell.v === 'boolean') cell.t = 'b';
                    else if(cell.v instanceof Date) {
                        cell.t = 'n'; cell.z = XLSX.SSF._table[14];
                        cell.v = datenum(cell.v);
                    }
                    else cell.t = 's';
                    
                    if(C == 0){
                        cell.s={
                            font:{
                                bold:true
                            }
                        }
                    }
                    if(R == 0){
                        cell.s={
                            fill:{
                                fgColor:{ rgb: "FFFFAA00" }
                            }
                        }
                    }
                    
                    ws[cell_ref] = cell;
                }
            }
            if(range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
            return ws;
        }
        
        function Workbook() {
            console.log('who am I? ', this instanceof Workbook)
            if(!(this instanceof Workbook)) return new Workbook();
            console.log('resetting')
            this.SheetNames = [];
            this.Sheets = {};
        }
        
        const save = () => {
            /* original data */
            var data = [[1,2,3,4],["Sample", "Sample", "Sample", "Sample"],["foo","bar","Hello","0.3"], ["baz", null, "qux"]]
            var ws_name = "SheetJS";
            var wb = new Workbook(), ws = sheet_from_array_of_arrays(data);
            wb.SheetNames.push(ws_name);
            wb.Sheets[ws_name] = ws;
            console.log('WB PAUL ', JSON.stringify(wb))
            console.log('WS PAUL: ', ws);
            ws["A1"].s.fill.bgColor = {indexed: '64'};
            var wbout = XLSX.write(wb, {bookType:'xlsx', bookSST:true, type: 'binary'});
            console.log('WBOUT PAUL: ', wbout);
            navigator.clipboard.writeText(wbout);

    

            saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), "sample.xlsx")
        }

        
        const showThings = () => {
            var whatAmI = new Workbook();
            console.log('What Am I? ', whatAmI);
            
            const testHis = '{"SheetNames":["SheetJS"],"Sheets":{"SheetJS":{"A1":{"v":1,"t":"n","s":{"fill":{"fgColor":{"rgb":"FFFFAA00"}}}},"B1":{"v":2,"t":"n","s":{"fill":{"fgColor":{"rgb":"FFFFAA00"}}}},"C1":{"v":3,"t":"n","s":{"fill":{"fgColor":{"rgb":"FFFFAA00"}}}},"D1":{"v":4,"t":"n","s":{"fill":{"fgColor":{"rgb":"FFFFAA00"}}}},"A2":{"v":"Sample","t":"s","s":{"font":{"bold":true}}},"B2":{"v":"Sample","t":"s"},"C2":{"v":"Sample","t":"s"},"D2":{"v":"Sample","t":"s"},"A3":{"v":"foo","t":"s","s":{"font":{"bold":true}}},"B3":{"v":"bar","t":"s"},"C3":{"v":"Hello","t":"s"},"D3":{"v":"0.3","t":"s"},"A4":{"v":"baz","t":"s","s":{"font":{"bold":true}}},"C4":{"v":"qux","t":"s"},"!ref":"A1:D4"}}}';
            const testPaul = '{"SheetNames":["SheetJS"],"Sheets":{"SheetJS":{"A1":{"v":1,"t":"n","s":{"fill":{"fgColor":{"rgb":"FFFFAA00"}}}},"B1":{"v":2,"t":"n","s":{"fill":{"fgColor":{"rgb":"FFFFAA00"}}}},"C1":{"v":3,"t":"n","s":{"fill":{"fgColor":{"rgb":"FFFFAA00"}}}},"D1":{"v":4,"t":"n","s":{"fill":{"fgColor":{"rgb":"FFFFAA00"}}}},"A2":{"v":"Sample","t":"s","s":{"font":{"bold":true}}},"B2":{"v":"Sample","t":"s"},"C2":{"v":"Sample","t":"s"},"D2":{"v":"Sample","t":"s"},"A3":{"v":"foo","t":"s","s":{"font":{"bold":true}}},"B3":{"v":"bar","t":"s"},"C3":{"v":"Hello","t":"s"},"D3":{"v":"0.3","t":"s"},"A4":{"v":"baz","t":"s","s":{"font":{"bold":true}}},"C4":{"v":"qux","t":"s"},"!ref":"A1:D4"}}}';
            console.log('Henry Smart: ', testHis === testPaul);
        }
        
        
        
        return (
            <div>
            <ExcelInput grabExcelDataAndSetToState={grabExcelDataAndSetToState} />
            <FileNameInput setFileNameToDownload={setFileNameToDownload} />
            <ChunkAmountInput setChunkAmountForClipping={setChunkAmountForClipping}/>
            <button onClick={saveExcelFile}>Save</button>
            <button onClick={flipArray}>Flip Data</button>
            <button onClick={showCurrentData}>Show Data</button>
            <button onClick={splitterFunctionFire}>splitter</button>
            <button onClick={save}>magic button</button>
            <button onClick={showThings}>show things</button>
            <table key="tableKey" className="table container">
                <thead>
                    <tr>
                        <th scope="col">date</th>
                        <th scope="col">price</th>
                    </tr>
                </thead>
                <tbody>
                    {excelData && excelData.map((data) => 
                        <tr key={data.Date}>
                            <th>{data.Date}</th>
                            <td>{data.Price}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Home;

// This is how to stack one column on top of another
// const stackedOneTopTheOther = [...newData, ...newData];

// const dummyData = [
//     {
//         Date: "2022-12-22",
//         Price: "150.33"
//     },
//     {
//         Date: "2022-11-22",
//         Price: "140.33"
//     },
//     {
//         Date: "2022-10-22",
//         Price: "130.33"
//     },
//     {
//         Date: "2022-9-22",
//         Price: "120.33"
//     },
//     {
//         Date: "2022-8-22",
//         Price: "110.33"
//     },
// ];


// HIS APP

// PK
//      MQ4VÖ|Z  Z     docProps/core.xml<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
// <cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:dcmitype="http://purl.org/dc/dcmitype/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"/>PK
//      MQ4Væüe3  3     docProps/app.xml<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
// <Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes"><Application>SheetJS</Application><HeadingPairs><vt:vector size="2" baseType="variant"><vt:variant><vt:lpstr>Worksheets</vt:lpstr></vt:variant><vt:variant><vt:i4>1</vt:i4></vt:variant></vt:vector></HeadingPairs><TitlesOfParts><vt:vector size="1" baseType="lpstr"><vt:lpstr>SheetJS</vt:lpstr></vt:vector></TitlesOfParts></Properties>PK
//      MQ4VÉ1 ç<  <     xl/workbook.xml<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
// <workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><workbookPr date1904="false"/><sheets><sheet name="SheetJS" sheetId="1" r:id="rId1"/></sheets></workbook>PK
//      MQ4V_0>q  q     xl/worksheets/sheet1.xml<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
// <worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><dimension ref="A1:D4"/><sheetViews><sheetView showGridLines="1" tabSelected="0" workbookViewId="0"/></sheetViews><sheetData><row r="1"><c r="A1" s="3"><v>1</v></c><c r="B1" s="3"><v>2</v></c><c r="C1" s="3"><v>3</v></c><c r="D1" s="3"><v>4</v></c></row><row r="2"><c r="A2" s="4" t="s"><v>0</v></c><c r="B2" s="2" t="s"><v>0</v></c><c r="C2" s="2" t="s"><v>0</v></c><c r="D2" s="2" t="s"><v>0</v></c></row><row r="3"><c r="A3" s="4" t="s"><v>1</v></c><c r="B3" s="2" t="s"><v>2</v></c><c r="C3" s="2" t="s"><v>3</v></c><c r="D3" s="2" t="s"><v>4</v></c></row><row r="4"><c r="A4" s="4" t="s"><v>5</v></c><c r="C4" s="2" t="s"><v>6</v></c></row></sheetData></worksheet>PK
//      MQ4V¡eÏ+  +     xl/sharedStrings.xml<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
// <sst xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" count="10" uniqueCount="7"><si><t>Sample</t></si><si><t>foo</t></si><si><t>bar</t></si><si><t>Hello</t></si><si><t>0.3</t></si><si><t>baz</t></si><si><t>qux</t></si></sst>PK
//      MQ4VÕ
// þ½Y  Y     xl/theme/theme1.xml<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
// <a:theme xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" name="Office Theme"><a:themeElements><a:clrScheme name="Office"><a:dk1><a:sysClr val="windowText" lastClr="000000"/></a:dk1><a:lt1><a:sysClr val="window" lastClr="FFFFFF"/></a:lt1><a:dk2><a:srgbClr val="1F497D"/></a:dk2><a:lt2><a:srgbClr val="EEECE1"/></a:lt2><a:accent1><a:srgbClr val="4F81BD"/></a:accent1><a:accent2><a:srgbClr val="C0504D"/></a:accent2><a:accent3><a:srgbClr val="9BBB59"/></a:accent3><a:accent4><a:srgbClr val="8064A2"/></a:accent4><a:accent5><a:srgbClr val="4BACC6"/></a:accent5><a:accent6><a:srgbClr val="F79646"/></a:accent6><a:hlink><a:srgbClr val="0000FF"/></a:hlink><a:folHlink><a:srgbClr val="800080"/></a:folHlink></a:clrScheme><a:fontScheme name="Office"><a:majorFont><a:latin typeface="Cambria"/><a:ea typeface=""/><a:cs typeface=""/><a:font script="Jpan" typeface="Ã¯Â¼Â­Ã¯Â¼Â³ Ã¯Â¼Â°Ã£âÂ´Ã£âÂ·Ã£ÆÆÃ£âÂ¯"/><a:font script="Hang" typeface="Ã«Â§âÃ¬Ââ¬ ÃªÂ³Â Ã«ââ¢"/><a:font script="Hans" typeface="Ã¥Â®â¹Ã¤Â½â"/><a:font script="Hant" typeface="Ã¦âÂ°Ã§Â´Â°Ã¦ËÅ½Ã©Â«â"/><a:font script="Arab" typeface="Times New Roman"/><a:font script="Hebr" typeface="Times New Roman"/><a:font script="Thai" typeface="Tahoma"/><a:font script="Ethi" typeface="Nyala"/><a:font script="Beng" typeface="Vrinda"/><a:font script="Gujr" typeface="Shruti"/><a:font script="Khmr" typeface="MoolBoran"/><a:font script="Knda" typeface="Tunga"/><a:font script="Guru" typeface="Raavi"/><a:font script="Cans" typeface="Euphemia"/><a:font script="Cher" typeface="Plantagenet Cherokee"/><a:font script="Yiii" typeface="Microsoft Yi Baiti"/><a:font script="Tibt" typeface="Microsoft Himalaya"/><a:font script="Thaa" typeface="MV Boli"/><a:font script="Deva" typeface="Mangal"/><a:font script="Telu" typeface="Gautami"/><a:font script="Taml" typeface="Latha"/><a:font script="Syrc" typeface="Estrangelo Edessa"/><a:font script="Orya" typeface="Kalinga"/><a:font script="Mlym" typeface="Kartika"/><a:font script="Laoo" typeface="DokChampa"/><a:font script="Sinh" typeface="Iskoola Pota"/><a:font script="Mong" typeface="Mongolian Baiti"/><a:font script="Viet" typeface="Times New Roman"/><a:font script="Uigh" typeface="Microsoft Uighur"/><a:font script="Geor" typeface="Sylfaen"/></a:majorFont><a:minorFont><a:latin typeface="Calibri"/><a:ea typeface=""/><a:cs typeface=""/><a:font script="Jpan" typeface="Ã¯Â¼Â­Ã¯Â¼Â³ Ã¯Â¼Â°Ã£âÂ´Ã£âÂ·Ã£ÆÆÃ£âÂ¯"/><a:font script="Hang" typeface="Ã«Â§âÃ¬Ââ¬ ÃªÂ³Â Ã«ââ¢"/><a:font script="Hans" typeface="Ã¥Â®â¹Ã¤Â½â"/><a:font script="Hant" typeface="Ã¦âÂ°Ã§Â´Â°Ã¦ËÅ½Ã©Â«â"/><a:font script="Arab" typeface="Arial"/><a:font script="Hebr" typeface="Arial"/><a:font script="Thai" typeface="Tahoma"/><a:font script="Ethi" typeface="Nyala"/><a:font script="Beng" typeface="Vrinda"/><a:font script="Gujr" typeface="Shruti"/><a:font script="Khmr" typeface="DaunPenh"/><a:font script="Knda" typeface="Tunga"/><a:font script="Guru" typeface="Raavi"/><a:font script="Cans" typeface="Euphemia"/><a:font script="Cher" typeface="Plantagenet Cherokee"/><a:font script="Yiii" typeface="Microsoft Yi Baiti"/><a:font script="Tibt" typeface="Microsoft Himalaya"/><a:font script="Thaa" typeface="MV Boli"/><a:font script="Deva" typeface="Mangal"/><a:font script="Telu" typeface="Gautami"/><a:font script="Taml" typeface="Latha"/><a:font script="Syrc" typeface="Estrangelo Edessa"/><a:font script="Orya" typeface="Kalinga"/><a:font script="Mlym" typeface="Kartika"/><a:font script="Laoo" typeface="DokChampa"/><a:font script="Sinh" typeface="Iskoola Pota"/><a:font script="Mong" typeface="Mongolian Baiti"/><a:font script="Viet" typeface="Arial"/><a:font script="Uigh" typeface="Microsoft Uighur"/><a:font script="Geor" typeface="Sylfaen"/></a:minorFont></a:fontScheme><a:fmtScheme name="Office"><a:fillStyleLst><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:gradFill rotWithShape="1"><a:gsLst><a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="50000"/><a:satMod val="300000"/></a:schemeClr></a:gs><a:gs pos="35000"><a:schemeClr val="phClr"><a:tint val="37000"/><a:satMod val="300000"/></a:schemeClr></a:gs><a:gs pos="100000"><a:schemeClr val="phClr"><a:tint val="15000"/><a:satMod val="350000"/></a:schemeClr></a:gs></a:gsLst><a:lin ang="16200000" scaled="1"/></a:gradFill><a:gradFill rotWithShape="1"><a:gsLst><a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="100000"/><a:shade val="100000"/><a:satMod val="130000"/></a:schemeClr></a:gs><a:gs pos="100000"><a:schemeClr val="phClr"><a:tint val="50000"/><a:shade val="100000"/><a:satMod val="350000"/></a:schemeClr></a:gs></a:gsLst><a:lin ang="16200000" scaled="0"/></a:gradFill></a:fillStyleLst><a:lnStyleLst><a:ln w="9525" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"><a:shade val="95000"/><a:satMod val="105000"/></a:schemeClr></a:solidFill><a:prstDash val="solid"/></a:ln><a:ln w="25400" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln><a:ln w="38100" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln></a:lnStyleLst><a:effectStyleLst><a:effectStyle><a:effectLst><a:outerShdw blurRad="40000" dist="20000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="38000"/></a:srgbClr></a:outerShdw></a:effectLst></a:effectStyle><a:effectStyle><a:effectLst><a:outerShdw blurRad="40000" dist="23000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="35000"/></a:srgbClr></a:outerShdw></a:effectLst></a:effectStyle><a:effectStyle><a:effectLst><a:outerShdw blurRad="40000" dist="23000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="35000"/></a:srgbClr></a:outerShdw></a:effectLst><a:scene3d><a:camera prst="orthographicFront"><a:rot lat="0" lon="0" rev="0"/></a:camera><a:lightRig rig="threePt" dir="t"><a:rot lat="0" lon="0" rev="1200000"/></a:lightRig></a:scene3d><a:sp3d><a:bevelT w="63500" h="25400"/></a:sp3d></a:effectStyle></a:effectStyleLst><a:bgFillStyleLst><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:gradFill rotWithShape="1"><a:gsLst><a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="40000"/><a:satMod val="350000"/></a:schemeClr></a:gs><a:gs pos="40000"><a:schemeClr val="phClr"><a:tint val="45000"/><a:shade val="99000"/><a:satMod val="350000"/></a:schemeClr></a:gs><a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="20000"/><a:satMod val="255000"/></a:schemeClr></a:gs></a:gsLst><a:path path="circle"><a:fillToRect l="50000" t="-80000" r="50000" b="180000"/></a:path></a:gradFill><a:gradFill rotWithShape="1"><a:gsLst><a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="80000"/><a:satMod val="300000"/></a:schemeClr></a:gs><a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="30000"/><a:satMod val="200000"/></a:schemeClr></a:gs></a:gsLst><a:path path="circle"><a:fillToRect l="50000" t="50000" r="50000" b="50000"/></a:path></a:gradFill></a:bgFillStyleLst></a:fmtScheme></a:themeElements><a:objectDefaults><a:spDef><a:spPr/><a:bodyPr/><a:lstStyle/><a:style><a:lnRef idx="1"><a:schemeClr val="accent1"/></a:lnRef><a:fillRef idx="3"><a:schemeClr val="accent1"/></a:fillRef><a:effectRef idx="2"><a:schemeClr val="accent1"/></a:effectRef><a:fontRef idx="minor"><a:schemeClr val="lt1"/></a:fontRef></a:style></a:spDef><a:lnDef><a:spPr/><a:bodyPr/><a:lstStyle/><a:style><a:lnRef idx="2"><a:schemeClr val="accent1"/></a:lnRef><a:fillRef idx="0"><a:schemeClr val="accent1"/></a:fillRef><a:effectRef idx="1"><a:schemeClr val="accent1"/></a:effectRef><a:fontRef idx="minor"><a:schemeClr val="tx1"/></a:fontRef></a:style></a:lnDef></a:objectDefaults><a:extraClrSchemeLst/></a:theme>PK
//      MQ4V?õP  P  
//    xl/styles.xml<?xml version="1.0" encoding="UTF-8" standalone="yes"?><styleSheet xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" xmlns:x14ac="http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac" xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" mc:Ignorable="x14ac"><numFmts count="0"/><fonts count="3" x14ac:knownFonts="1"><font><sz val="12"/><name val="Calibri"/></font><font><sz val="12"/><name val="Calibri"/></font><font><sz val="12"/><name val="Calibri"/><b/></font></fonts><fills count="3"><fill><patternFill patternType="none"><bgColor/></patternFill></fill><fill><patternFill patternType="gray125"><bgColor/></patternFill></fill><fill><patternFill patternType="solid"><fgColor rgb="FFFFAA00"/><bgColor/></patternFill></fill></fills><borders count="2"><border><left/><right/><top/><bottom/><diagonal/></border><border><left/><right/><top/><bottom/><diagonal/></border></borders><cellStyleXfs><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs><cellXfs count="5"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/><xf numFmtId="0" fontId="1" fillId="1" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/><xf numFmtId="0" fontId="0" fillId="2" borderId="0" xfId="0" applyFill="1"/><xf numFmtId="0" fontId="2" fillId="0" borderId="0" xfId="0" applyFont="1"/></cellXfs><cellStyles><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles><dxfs count="0"/><tableStyles count="0" defaultTableStyle="TableStyleMedium9" defaultPivotStyle="PivotStyleMedium4"/></styleSheet>PK
//      MQ4Vø?S  S     [Content_Types].xml<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
// <Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><Default Extension="xml" ContentType="application/xml"/><Default Extension="bin" ContentType="application/vnd.ms-excel.sheet.binary.macroEnabled.main"/><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/><Override PartName="/xl/theme/theme1.xml" ContentType="application/vnd.openxmlformats-officedocument.theme+xml"/><Override PartName="/xl/sharedStrings.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/><Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/><Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/></Types>PK
//      MQ4VJjùL  L     _rels/.rels<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
// <Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/><Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>PK
//      MQ4V©Iº  º     xl/_rels/workbook.xml.rels<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
// <Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/><Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/sharedStrings" Target="sharedStrings.xml"/><Relationship Id="rId4" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme" Target="theme/theme1.xml"/><Relationship Id="rId5" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>PK 
//      MQ4VÖ|Z  Z                   docProps/core.xmlPK 
//      MQ4Væüe3  3                 docProps/app.xmlPK 
//      MQ4VÉ1 ç<  <               ê  xl/workbook.xmlPK 
//      MQ4V_0>q  q               S  xl/worksheets/sheet1.xmlPK 
//      MQ4V¡eÏ+  +               ú  xl/sharedStrings.xmlPK 
//      MQ4VÕ
// þ½Y  Y               W
//   xl/theme/theme1.xmlPK 
//      MQ4V?õP  P  
//              á(  xl/styles.xmlPK 
//      MQ4Vø?S  S               \/  [Content_Types].xmlPK 
//      MQ4VJjùL  L               à4  _rels/.relsPK 
//      MQ4V©Iº  º               U7  xl/_rels/workbook.xml.relsPK    
//  
//    G:    

// MY APP

// PK         Bo÷B  B     xl/_rels/workbook.xml.rels<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
// <Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/sharedStrings" Target="sharedStrings.xml"/><Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme" Target="theme/theme1.xml"/><Relationship Id="rId4" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/><Relationship Id="rId5" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/sheetMetadata" Target="metadata.xml"/></Relationships>PK         0kÞ  Þ     xl/theme/theme1.xml<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
// <a:theme xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" name="Office Theme"><a:themeElements><a:clrScheme name="Office"><a:dk1><a:sysClr val="windowText" lastClr="000000"/></a:dk1><a:lt1><a:sysClr val="window" lastClr="FFFFFF"/></a:lt1><a:dk2><a:srgbClr val="1F497D"/></a:dk2><a:lt2><a:srgbClr val="EEECE1"/></a:lt2><a:accent1><a:srgbClr val="4F81BD"/></a:accent1><a:accent2><a:srgbClr val="C0504D"/></a:accent2><a:accent3><a:srgbClr val="9BBB59"/></a:accent3><a:accent4><a:srgbClr val="8064A2"/></a:accent4><a:accent5><a:srgbClr val="4BACC6"/></a:accent5><a:accent6><a:srgbClr val="F79646"/></a:accent6><a:hlink><a:srgbClr val="0000FF"/></a:hlink><a:folHlink><a:srgbClr val="800080"/></a:folHlink></a:clrScheme><a:fontScheme name="Office"><a:majorFont><a:latin typeface="Cambria"/><a:ea typeface=""/><a:cs typeface=""/><a:font script="Jpan" typeface="ï¼­ï¼³ ï¼°ã´ã·ãã¯"/><a:font script="Hang" typeface="ë§ì ê³ ë"/><a:font script="Hans" typeface="å®ä½"/><a:font script="Hant" typeface="æ°ç´°æé«"/><a:font script="Arab" typeface="Times New Roman"/><a:font script="Hebr" typeface="Times New Roman"/><a:font script="Thai" typeface="Tahoma"/><a:font script="Ethi" typeface="Nyala"/><a:font script="Beng" typeface="Vrinda"/><a:font script="Gujr" typeface="Shruti"/><a:font script="Khmr" typeface="MoolBoran"/><a:font script="Knda" typeface="Tunga"/><a:font script="Guru" typeface="Raavi"/><a:font script="Cans" typeface="Euphemia"/><a:font script="Cher" typeface="Plantagenet Cherokee"/><a:font script="Yiii" typeface="Microsoft Yi Baiti"/><a:font script="Tibt" typeface="Microsoft Himalaya"/><a:font script="Thaa" typeface="MV Boli"/><a:font script="Deva" typeface="Mangal"/><a:font script="Telu" typeface="Gautami"/><a:font script="Taml" typeface="Latha"/><a:font script="Syrc" typeface="Estrangelo Edessa"/><a:font script="Orya" typeface="Kalinga"/><a:font script="Mlym" typeface="Kartika"/><a:font script="Laoo" typeface="DokChampa"/><a:font script="Sinh" typeface="Iskoola Pota"/><a:font script="Mong" typeface="Mongolian Baiti"/><a:font script="Viet" typeface="Times New Roman"/><a:font script="Uigh" typeface="Microsoft Uighur"/><a:font script="Geor" typeface="Sylfaen"/></a:majorFont><a:minorFont><a:latin typeface="Calibri"/><a:ea typeface=""/><a:cs typeface=""/><a:font script="Jpan" typeface="ï¼­ï¼³ ï¼°ã´ã·ãã¯"/><a:font script="Hang" typeface="ë§ì ê³ ë"/><a:font script="Hans" typeface="å®ä½"/><a:font script="Hant" typeface="æ°ç´°æé«"/><a:font script="Arab" typeface="Arial"/><a:font script="Hebr" typeface="Arial"/><a:font script="Thai" typeface="Tahoma"/><a:font script="Ethi" typeface="Nyala"/><a:font script="Beng" typeface="Vrinda"/><a:font script="Gujr" typeface="Shruti"/><a:font script="Khmr" typeface="DaunPenh"/><a:font script="Knda" typeface="Tunga"/><a:font script="Guru" typeface="Raavi"/><a:font script="Cans" typeface="Euphemia"/><a:font script="Cher" typeface="Plantagenet Cherokee"/><a:font script="Yiii" typeface="Microsoft Yi Baiti"/><a:font script="Tibt" typeface="Microsoft Himalaya"/><a:font script="Thaa" typeface="MV Boli"/><a:font script="Deva" typeface="Mangal"/><a:font script="Telu" typeface="Gautami"/><a:font script="Taml" typeface="Latha"/><a:font script="Syrc" typeface="Estrangelo Edessa"/><a:font script="Orya" typeface="Kalinga"/><a:font script="Mlym" typeface="Kartika"/><a:font script="Laoo" typeface="DokChampa"/><a:font script="Sinh" typeface="Iskoola Pota"/><a:font script="Mong" typeface="Mongolian Baiti"/><a:font script="Viet" typeface="Arial"/><a:font script="Uigh" typeface="Microsoft Uighur"/><a:font script="Geor" typeface="Sylfaen"/></a:minorFont></a:fontScheme><a:fmtScheme name="Office"><a:fillStyleLst><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:gradFill rotWithShape="1"><a:gsLst><a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="50000"/><a:satMod val="300000"/></a:schemeClr></a:gs><a:gs pos="35000"><a:schemeClr val="phClr"><a:tint val="37000"/><a:satMod val="300000"/></a:schemeClr></a:gs><a:gs pos="100000"><a:schemeClr val="phClr"><a:tint val="15000"/><a:satMod val="350000"/></a:schemeClr></a:gs></a:gsLst><a:lin ang="16200000" scaled="1"/></a:gradFill><a:gradFill rotWithShape="1"><a:gsLst><a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="100000"/><a:shade val="100000"/><a:satMod val="130000"/></a:schemeClr></a:gs><a:gs pos="100000"><a:schemeClr val="phClr"><a:tint val="50000"/><a:shade val="100000"/><a:satMod val="350000"/></a:schemeClr></a:gs></a:gsLst><a:lin ang="16200000" scaled="0"/></a:gradFill></a:fillStyleLst><a:lnStyleLst><a:ln w="9525" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"><a:shade val="95000"/><a:satMod val="105000"/></a:schemeClr></a:solidFill><a:prstDash val="solid"/></a:ln><a:ln w="25400" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln><a:ln w="38100" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln></a:lnStyleLst><a:effectStyleLst><a:effectStyle><a:effectLst><a:outerShdw blurRad="40000" dist="20000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="38000"/></a:srgbClr></a:outerShdw></a:effectLst></a:effectStyle><a:effectStyle><a:effectLst><a:outerShdw blurRad="40000" dist="23000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="35000"/></a:srgbClr></a:outerShdw></a:effectLst></a:effectStyle><a:effectStyle><a:effectLst><a:outerShdw blurRad="40000" dist="23000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="35000"/></a:srgbClr></a:outerShdw></a:effectLst><a:scene3d><a:camera prst="orthographicFront"><a:rot lat="0" lon="0" rev="0"/></a:camera><a:lightRig rig="threePt" dir="t"><a:rot lat="0" lon="0" rev="1200000"/></a:lightRig></a:scene3d><a:sp3d><a:bevelT w="63500" h="25400"/></a:sp3d></a:effectStyle></a:effectStyleLst><a:bgFillStyleLst><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:gradFill rotWithShape="1"><a:gsLst><a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="40000"/><a:satMod val="350000"/></a:schemeClr></a:gs><a:gs pos="40000"><a:schemeClr val="phClr"><a:tint val="45000"/><a:shade val="99000"/><a:satMod val="350000"/></a:schemeClr></a:gs><a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="20000"/><a:satMod val="255000"/></a:schemeClr></a:gs></a:gsLst><a:path path="circle"><a:fillToRect l="50000" t="-80000" r="50000" b="180000"/></a:path></a:gradFill><a:gradFill rotWithShape="1"><a:gsLst><a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="80000"/><a:satMod val="300000"/></a:schemeClr></a:gs><a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="30000"/><a:satMod val="200000"/></a:schemeClr></a:gs></a:gsLst><a:path path="circle"><a:fillToRect l="50000" t="50000" r="50000" b="50000"/></a:path></a:gradFill></a:bgFillStyleLst></a:fmtScheme></a:themeElements><a:objectDefaults><a:spDef><a:spPr/><a:bodyPr/><a:lstStyle/><a:style><a:lnRef idx="1"><a:schemeClr val="accent1"/></a:lnRef><a:fillRef idx="3"><a:schemeClr val="accent1"/></a:fillRef><a:effectRef idx="2"><a:schemeClr val="accent1"/></a:effectRef><a:fontRef idx="minor"><a:schemeClr val="lt1"/></a:fontRef></a:style></a:spDef><a:lnDef><a:spPr/><a:bodyPr/><a:lstStyle/><a:style><a:lnRef idx="2"><a:schemeClr val="accent1"/></a:lnRef><a:fillRef idx="0"><a:schemeClr val="accent1"/></a:fillRef><a:effectRef idx="1"><a:schemeClr val="accent1"/></a:effectRef><a:fontRef idx="minor"><a:schemeClr val="tx1"/></a:fontRef></a:style></a:lnDef></a:objectDefaults><a:extraClrSchemeLst/></a:theme>PK         UôZ  Z  
//    xl/styles.xml<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
// <styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes"><numFmts count="1"><numFmt numFmtId="56" formatCode="&quot;ä¸å/ä¸å &quot;hh&quot;æ&quot;mm&quot;å&quot;ss&quot;ç§ &quot;"/></numFmts><fonts count="1"><font><sz val="12"/><color theme="1"/><name val="Calibri"/><family val="2"/><scheme val="minor"/></font></fonts><fills count="2"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill></fills><borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders><cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs><cellXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0" applyNumberFormat="1"/></cellXfs><cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles><dxfs count="0"/><tableStyles count="0" defaultTableStyle="TableStyleMedium9" defaultPivotStyle="PivotStyleMedium4"/></styleSheet>PK         <6N  N     xl/worksheets/sheet1.xml<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
// <worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><dimension ref="A1:D4"/><sheetViews><sheetView workbookViewId="0"/></sheetViews><sheetData><row r="1"><c r="A1"><v>1</v></c><c r="B1"><v>2</v></c><c r="C1"><v>3</v></c><c r="D1"><v>4</v></c></row><row r="2"><c r="A2" t="s"><v>0</v></c><c r="B2" t="s"><v>0</v></c><c r="C2" t="s"><v>0</v></c><c r="D2" t="s"><v>0</v></c></row><row r="3"><c r="A3" t="s"><v>1</v></c><c r="B3" t="s"><v>2</v></c><c r="C3" t="s"><v>3</v></c><c r="D3" t="s"><v>4</v></c></row><row r="4"><c r="A4" t="s"><v>5</v></c><c r="C4" t="s"><v>6</v></c></row></sheetData><ignoredErrors><ignoredError numberStoredAsText="1" sqref="A1:D4"/></ignoredErrors></worksheet>PK         `        xl/metadata.xml<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
// <metadata xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:xlrd="http://schemas.microsoft.com/office/spreadsheetml/2017/richdata" xmlns:xda="http://schemas.microsoft.com/office/spreadsheetml/2017/dynamicarray">
//   <metadataTypes count="1">
//     <metadataType name="XLDAPR" minSupportedVersion="120000" copy="1" pasteAll="1" pasteValues="1" merge="1" splitFirst="1" rowColShift="1" clearFormats="1" clearComments="1" assign="1" coerce="1" cellMeta="1"/>
//   </metadataTypes>
//   <futureMetadata name="XLDAPR" count="1">
//     <bk>
//       <extLst>
//         <ext uri="{bdbb8cdc-fa1e-496e-a857-3c3f30c029c3}">
//           <xda:dynamicArrayProperties fDynamic="1" fCollapsed="0"/>
//         </ext>
//       </extLst>
//     </bk>
//   </futureMetadata>
//   <cellMetadata count="1">
//     <bk>
//       <rc t="1" v="0"/>
//     </bk>
//   </cellMetadata>
// </metadata>PK         ¼X3C  C     xl/workbook.xml<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
// <workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><workbookPr codeName="ThisWorkbook"/><sheets><sheet name="SheetJS" sheetId="1" r:id="rId1"/></sheets></workbook>PK         ¡eÏ+  +     xl/sharedStrings.xml<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
// <sst xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" count="10" uniqueCount="7"><si><t>Sample</t></si><si><t>foo</t></si><si><t>bar</t></si><si><t>Hello</t></si><si><t>0.3</t></si><si><t>baz</t></si><si><t>qux</t></si></sst>PK         JjùL  L     _rels/.rels<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
// <Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/><Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>PK         æüe3  3     docProps/app.xml<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
// <Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes"><Application>SheetJS</Application><HeadingPairs><vt:vector size="2" baseType="variant"><vt:variant><vt:lpstr>Worksheets</vt:lpstr></vt:variant><vt:variant><vt:i4>1</vt:i4></vt:variant></vt:vector></HeadingPairs><TitlesOfParts><vt:vector size="1" baseType="lpstr"><vt:lpstr>SheetJS</vt:lpstr></vt:vector></TitlesOfParts></Properties>PK         Ö|Z  Z     docProps/core.xml<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
// <cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:dcmitype="http://purl.org/dc/dcmitype/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"/>PK         vyê       [Content_Types].xml<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
// <Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><Default Extension="xml" ContentType="application/xml"/><Default Extension="bin" ContentType="application/vnd.ms-excel.sheet.binary.macroEnabled.main"/><Default Extension="vml" ContentType="application/vnd.openxmlformats-officedocument.vmlDrawing"/><Default Extension="data" ContentType="application/vnd.openxmlformats-officedocument.model+data"/><Default Extension="bmp" ContentType="image/bmp"/><Default Extension="png" ContentType="image/png"/><Default Extension="gif" ContentType="image/gif"/><Default Extension="emf" ContentType="image/x-emf"/><Default Extension="wmf" ContentType="image/x-wmf"/><Default Extension="jpg" ContentType="image/jpeg"/><Default Extension="jpeg" ContentType="image/jpeg"/><Default Extension="tif" ContentType="image/tiff"/><Default Extension="tiff" ContentType="image/tiff"/><Default Extension="pdf" ContentType="application/pdf"/><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/><Override PartName="/xl/theme/theme1.xml" ContentType="application/vnd.openxmlformats-officedocument.theme+xml"/><Override PartName="/xl/sharedStrings.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/><Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/><Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/><Override PartName="/xl/metadata.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheetMetadata+xml"/></Types>PK           Bo÷B  B                   xl/_rels/workbook.xml.relsPK           0kÞ  Þ               z  xl/theme/theme1.xmlPK           UôZ  Z  
//              !  xl/styles.xmlPK           <6N  N               &  xl/worksheets/sheet1.xmlPK           `                  )  xl/metadata.xmlPK           ¼X3C  C               G-  xl/workbook.xmlPK           ¡eÏ+  +               ·.  xl/sharedStrings.xmlPK           JjùL  L               0  _rels/.relsPK           æüe3  3               2  docProps/app.xmlPK           Ö|Z  Z               ê4  docProps/core.xmlPK           vyê                 s6  [Content_Types].xmlPK      ½  A?    