var BarCodes = {
  "ReportVersion": "2021.3.4.0",
  "ReportGuid": "d094058745064bfe842a79a3ab1c6ba5",
  "ReportName": "Report",
  "ReportAlias": "BarCodes",
  "ReportAuthor": "Stimulsoft",
  "ReportDescription": "This sample demonstrates how to create a report with Barсodes.",
  "ReportCreated": "/Date(1085813940000+0400)/",
  "ReportChanged": "/Date(1552892993000+0300)/",
  "EngineVersion": "EngineV2",
  "CalculationMode": "Interpretation",
  "ReportUnit": "HundredthsOfInch",
  "PreviewSettings": 260042239,
  "Script": "using System;\r\nusing System.Drawing;\r\nusing System.Windows.Forms;\r\nusing System.Data;\r\nusing Stimulsoft.Report;\r\nusing Stimulsoft.Report.Components;\r\nusing Stimulsoft.Base.Drawing;\r\n\r\nnamespace StiReports\r\n{\r\n    \r\n    public class Report : Stimulsoft.Report.StiReport\r\n    {\r\n            \r\n        public Report()\r\n        {\r\n            this.InitializeComponent();\r\n        }\r\n        \r\n        #region StiReport Designer generated code - do not modify\r\n\t\t#endregion StiReport Designer generated code - do not modify\r\n\t}\r\n}",
  "Styles": {
    "0": {
      "Ident": "StiStyle",
      "Name": "Header2",
      "HorAlignment": "Center",
      "VertAlignment": "Center",
      "Font": "Segoe UI;21.75;Bold;",
      "Border": "Bottom;158,158,158;;;;;;solid:Black",
      "Brush": "solid:",
      "TextBrush": "solid:158,158,158",
      "NegativeTextBrush": "solid:Red"
    },
    "1": {
      "Ident": "StiStyle",
      "Name": "Header3",
      "HorAlignment": "Center",
      "VertAlignment": "Center",
      "Font": "Segoe UI;12;Bold;",
      "Border": "Left, Right;White;;;;;;solid:Black",
      "Brush": "solid:77,182,172",
      "TextBrush": "solid:255,255,255",
      "NegativeTextBrush": "solid:Red",
      "AllowUseBorderFormatting": false
    },
    "2": {
      "Ident": "StiStyle",
      "Name": "Header4",
      "Font": "Segoe UI;12;;",
      "Border": ";;;;;;;solid:Black",
      "Brush": "solid:",
      "TextBrush": "solid:Black",
      "NegativeTextBrush": "solid:Red"
    },
    "3": {
      "Ident": "StiStyle",
      "Name": "Data1",
      "VertAlignment": "Center",
      "Font": "Segoe UI;9.75;;",
      "Border": ";182,182,182;;;;;;solid:Black",
      "Brush": "solid:",
      "TextBrush": "solid:74,74,74",
      "NegativeTextBrush": "solid:Red"
    },
    "4": {
      "Ident": "StiStyle",
      "Name": "Data2",
      "Font": "Segoe UI;9.75;;",
      "Border": ";255,255,255;;;;;;solid:Black",
      "Brush": "solid:224,242,241",
      "TextBrush": "solid:74,74,74",
      "NegativeTextBrush": "solid:Red"
    },
    "5": {
      "Ident": "StiStyle",
      "Name": "Footer2",
      "HorAlignment": "Right",
      "VertAlignment": "Center",
      "Font": "Segoe UI;9.75;;",
      "Border": ";58,78,94;;;;;;solid:Black",
      "Brush": "solid:",
      "TextBrush": "solid:158,158,158",
      "NegativeTextBrush": "solid:Red",
      "AllowUseBorderSides": false
    }
  },
  "ReferencedAssemblies": {
    "0": "System.Dll",
    "1": "System.Drawing.Dll",
    "2": "System.Windows.Forms.Dll",
    "3": "System.Data.Dll",
    "4": "System.Xml.Dll",
    "5": "Stimulsoft.Base.Dll",
    "6": "Stimulsoft.Controls.Dll",
    "7": "Stimulsoft.Report.Dll"
  },
  "Pages": {
    "0": {
      "Ident": "StiPage",
      "Name": "Page1",
      "Guid": "8764d9723d5c4e8a9a396f493b4fa40b",
      "Interaction": {
        "Ident": "StiInteraction"
      },
      "Border": ";;2;;;;;solid:Black",
      "Brush": "solid:",
      "Components": {
        "0": {
          "Ident": "StiReportTitleBand",
          "Name": "ReportTitleBand2",
          "Guid": "34839448fd6242af8ad23f8514aed14e",
          "ClientRectangle": "0,20,749,80",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Border": ";;;;;;;solid:Black",
          "Brush": "solid:",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Text24",
              "Guid": "87f467faa05c4e6488c7d802dbd6f39f",
              "ClientRectangle": "570,0,179,40",
              "ComponentStyle": "Header2",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Stimulsoft"
              },
              "HorAlignment": "Right",
              "VertAlignment": "Center",
              "Font": "Segoe UI;21.75;Bold;",
              "Border": "Bottom;158,158,158;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:158,158,158",
              "Type": "Expression"
            },
            "1": {
              "Ident": "StiText",
              "Name": "Text25",
              "Guid": "d9874c36a6354a53bda30eb2c4d1f3a1",
              "ClientRectangle": "0,0,570,40",
              "ComponentStyle": "Header2",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Barсodes"
              },
              "VertAlignment": "Center",
              "Font": "Segoe UI;21.75;Bold;",
              "Border": "Bottom;158,158,158;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:158,158,158",
              "Type": "Expression"
            },
            "2": {
              "Ident": "StiText",
              "Name": "Text95",
              "Guid": "8cd0a4fab927479eb202f77fd5c5ea00",
              "CanGrow": true,
              "ClientRectangle": "0,40,570,20",
              "ComponentStyle": "Footer2",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "{ReportDescription}"
              },
              "Font": "Segoe UI;9.75;;",
              "Border": ";58,78,94;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:158,158,158",
              "TextOptions": {
                "WordWrap": true
              },
              "Type": "Expression"
            },
            "3": {
              "Ident": "StiText",
              "Name": "Text96",
              "Guid": "b9813368ad1e42d386d9c6236ea74552",
              "CanGrow": true,
              "ClientRectangle": "570,40,179,20",
              "ComponentStyle": "Footer2",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Date: {Today.ToString(\"Y\")}"
              },
              "HorAlignment": "Right",
              "Font": "Segoe UI;9.75;;",
              "Border": ";58,78,94;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:158,158,158",
              "TextOptions": {
                "WordWrap": true
              },
              "Type": "Expression"
            }
          }
        },
        "1": {
          "Ident": "StiPageHeaderBand",
          "Name": "PageHeaderBand1",
          "ClientRectangle": "0,140,749,40",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Border": ";;;;;;;solid:Black",
          "Brush": "solid:",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Text46",
              "Guid": "e4f5664f55354a8da88d4d3083ba58ae",
              "ClientRectangle": "0,0,160,40",
              "ComponentStyle": "Header3",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Symbology"
              },
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "Font": "Segoe UI;12;Bold;",
              "Border": "Left, Right;White;;;;;;solid:Black",
              "Brush": "solid:77,182,172",
              "TextBrush": "solid:255,255,255",
              "Type": "Expression"
            },
            "1": {
              "Ident": "StiText",
              "Name": "Text47",
              "Guid": "9641c5f9d9ce42029fbb54f0673e9828",
              "ClientRectangle": "160,0,240,40",
              "ComponentStyle": "Header3",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Example"
              },
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "Font": "Segoe UI;12;Bold;",
              "Border": "Left, Right;White;;;;;;solid:Black",
              "Brush": "solid:77,182,172",
              "TextBrush": "solid:255,255,255",
              "Type": "Expression"
            },
            "2": {
              "Ident": "StiText",
              "Name": "Text48",
              "Guid": "4226776896ca4742af2c4e08614e2083",
              "ClientRectangle": "390,0,359,40",
              "ComponentStyle": "Header3",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Description"
              },
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "Font": "Segoe UI;12;Bold;",
              "Border": "Left, Right;White;;;;;;solid:Black",
              "Brush": "solid:77,182,172",
              "TextBrush": "solid:255,255,255",
              "Type": "Expression"
            }
          }
        },
        "2": {
          "Ident": "StiDataBand",
          "Name": "DataBand1",
          "ClientRectangle": "0,220,749,130",
          "ComponentStyle": "Data2",
          "Interaction": {
            "Ident": "StiBandInteraction"
          },
          "Border": ";255,255,255;;;;;;solid:Black",
          "Brush": "solid:224,242,241",
          "Components": {
            "0": {
              "Ident": "StiBarCode",
              "Name": "BarCode6",
              "Guid": "bc4b62b60fd94d2f82b49dca3a5b6254",
              "GrowToHeight": true,
              "ClientRectangle": "160,0,240,130",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Border": ";193,152,89;;;;;;solid:Black",
              "BackColor": "Transparent",
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "BarCodeType": {
                "Ident": "StiCode39BarCodeType"
              },
              "Code": {
                "Value": "ABC123"
              }
            },
            "1": {
              "Ident": "StiText",
              "Name": "Text9",
              "Guid": "f1df50c103ed499a8a817c5cec3438fa",
              "CanGrow": true,
              "GrowToHeight": true,
              "ClientRectangle": "0,0,160,130",
              "ComponentStyle": "Header4",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Code 39"
              },
              "VertAlignment": "Center",
              "Font": "Segoe UI;12;;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:Black",
              "Margins": {
                "Left": 3.0,
                "Right": 0.0,
                "Top": 0.0,
                "Bottom": 0.0
              }
            },
            "2": {
              "Ident": "StiText",
              "Name": "Text45",
              "CanGrow": true,
              "GrowToHeight": true,
              "ClientRectangle": "390,0,359,130",
              "ComponentStyle": "Data1",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Code 39 is a variable length symbology that can encode 44 characters. Code 39 is the most popular symbology in the non-retail world and is used extensively in manufacturing, military, and medicine applications. Each Code 39 bar code has a start/stop character represented by an asterisk (*).The bar-code code does not contain the check character but can be added programmatically. Each character starts with a 'dark bar' that consists of 5 dark and 4 blank bars. The ratio between narrow and wide bars may range from 2.2:1 to 3:1. The Code 39 barcode has low data density. It requires more free space than Code 128, but the Code 39 barcode can be identified by any barcode scanner.\r\n"
              },
              "HorAlignment": "Width",
              "Font": "Segoe UI;9.75;;",
              "Border": ";182,182,182;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:74,74,74",
              "TextOptions": {
                "WordWrap": true
              },
              "TextQuality": "Wysiwyg",
              "Margins": {
                "Left": 2.0,
                "Right": 2.0,
                "Top": 2.0,
                "Bottom": 2.0
              },
              "Type": "Expression"
            }
          },
          "CountData": 1
        },
        "3": {
          "Ident": "StiDataBand",
          "Name": "DataBand2",
          "Guid": "93d783f9448f48c38d7252becb993b0a",
          "ClientRectangle": "0,390,749,100",
          "Interaction": {
            "Ident": "StiBandInteraction"
          },
          "Border": ";255,255,255;;;;;;solid:Black",
          "Brush": "solid:",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Text49",
              "Guid": "f68b33392e8b46df870e43a282c3ac39",
              "CanGrow": true,
              "GrowToHeight": true,
              "ClientRectangle": "0,0,160,100",
              "ComponentStyle": "Header4",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Code 39 Extended"
              },
              "VertAlignment": "Center",
              "Font": "Segoe UI;12;;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:Black",
              "Margins": {
                "Left": 3.0,
                "Right": 0.0,
                "Top": 0.0,
                "Bottom": 0.0
              },
              "Type": "Expression"
            },
            "1": {
              "Ident": "StiText",
              "Name": "Text50",
              "Guid": "37a6066df6174b04a285d19a4c338d21",
              "CanGrow": true,
              "GrowToHeight": true,
              "ClientRectangle": "390,0,359,100",
              "ComponentStyle": "Data1",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Code 39 extended is the version of the Code 39 bar-code which also supports the ASCII set of characters. The 0-9, A-Z, \".\" and \"-\" characters are encoded the same as of the Code 39 bar-code. "
              },
              "HorAlignment": "Width",
              "Font": "Segoe UI;9.75;;",
              "Border": ";182,182,182;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:74,74,74",
              "TextOptions": {
                "WordWrap": true
              },
              "TextQuality": "Wysiwyg",
              "Margins": {
                "Left": 2.0,
                "Right": 2.0,
                "Top": 2.0,
                "Bottom": 2.0
              },
              "Type": "Expression"
            },
            "2": {
              "Ident": "StiBarCode",
              "Name": "BarCode44",
              "Guid": "45b3c03e14594bf9812d1fd0a76c265d",
              "GrowToHeight": true,
              "ClientRectangle": "160,0,230,100",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Border": ";;;;;;;solid:Black",
              "BackColor": "Transparent",
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "BarCodeType": {
                "Ident": "StiCode39ExtBarCodeType"
              },
              "Code": {
                "Value": "Abc123"
              }
            }
          },
          "CountData": 1
        },
        "4": {
          "Ident": "StiDataBand",
          "Name": "DataBand3",
          "Guid": "5d1e47b8e250498ba09aebdcc1792276",
          "ClientRectangle": "0,530,749,130",
          "ComponentStyle": "Data2",
          "Interaction": {
            "Ident": "StiBandInteraction"
          },
          "Border": ";255,255,255;;;;;;solid:Black",
          "Brush": "solid:224,242,241",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Text51",
              "Guid": "a5bd5688647243629518657d029d6984",
              "CanGrow": true,
              "GrowToHeight": true,
              "ClientRectangle": "0,0,160,130",
              "ComponentStyle": "Header4",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Code 93"
              },
              "VertAlignment": "Center",
              "Font": "Segoe UI;12;;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:Black",
              "Margins": {
                "Left": 3.0,
                "Right": 0.0,
                "Top": 0.0,
                "Bottom": 0.0
              },
              "Type": "Expression"
            },
            "1": {
              "Ident": "StiText",
              "Name": "Text52",
              "Guid": "4c5c487ef4134a88b9ec203c2b15668d",
              "CanGrow": true,
              "GrowToHeight": true,
              "ClientRectangle": "390,0,359,130",
              "ComponentStyle": "Data1",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "The Code 93 is a variable length symbology that can encode the complete 128 ASCII character set. This barcode was developed as an enhanced version of the Code 39 barcode. It has a higher density than either the Code 39 or the Code 128 bar-code. The Code 93 barcode may encode Latin letters (from A to Z), digits (from 0 to 9) and a group of special characters. The barcode always contains two check characters. Each characters consist of nine modules which are joined in 3 groups. Each group has one black bar and one white bar."
              },
              "HorAlignment": "Width",
              "Font": "Segoe UI;9.75;;",
              "Border": ";182,182,182;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:74,74,74",
              "TextOptions": {
                "WordWrap": true
              },
              "TextQuality": "Wysiwyg",
              "Margins": {
                "Left": 2.0,
                "Right": 2.0,
                "Top": 2.0,
                "Bottom": 2.0
              },
              "Type": "Expression"
            },
            "2": {
              "Ident": "StiBarCode",
              "Name": "BarCode14",
              "Guid": "cc377af3cc2043debf108abec942fa3a",
              "GrowToHeight": true,
              "ClientRectangle": "160,0,230,130",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Border": ";;;;;;;solid:Black",
              "BackColor": "Transparent",
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "BarCodeType": {
                "Ident": "StiCode93BarCodeType"
              },
              "Code": {
                "Value": "ABC123"
              }
            }
          },
          "CountData": 1
        },
        "5": {
          "Ident": "StiDataBand",
          "Name": "DataBand4",
          "Guid": "6d40bdc4c5244b48b3657bfae8913433",
          "ClientRectangle": "0,700,749,100",
          "Interaction": {
            "Ident": "StiBandInteraction"
          },
          "Border": ";255,255,255;;;;;;solid:Black",
          "Brush": "solid:",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Text17",
              "Guid": "b1f006ed9c7d46ce96a9038988f86f55",
              "CanGrow": true,
              "GrowToHeight": true,
              "ClientRectangle": "0,0,160,100",
              "ComponentStyle": "Header4",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Code 93 Extended"
              },
              "VertAlignment": "Center",
              "Font": "Segoe UI;12;;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:Black",
              "Margins": {
                "Left": 3.0,
                "Right": 0.0,
                "Top": 0.0,
                "Bottom": 0.0
              },
              "Type": "Expression"
            },
            "1": {
              "Ident": "StiText",
              "Name": "Text53",
              "Guid": "167202641c29484383185dda4aab76ce",
              "CanGrow": true,
              "GrowToHeight": true,
              "ClientRectangle": "390,0,359,100",
              "ComponentStyle": "Data1",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Code 93 extended is a version of the Code 93 barcode that supports a set of ASCII characters. All additional symbols are encoded as a sequence of two Code 93 characters. The first character is always one of four special characters. Therefore, scanners can always identify the different versions of the bar-code."
              },
              "HorAlignment": "Width",
              "Font": "Segoe UI;9.75;;",
              "Border": ";182,182,182;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:74,74,74",
              "TextOptions": {
                "WordWrap": true
              },
              "TextQuality": "Wysiwyg",
              "Margins": {
                "Left": 2.0,
                "Right": 2.0,
                "Top": 2.0,
                "Bottom": 2.0
              },
              "Type": "Expression"
            },
            "2": {
              "Ident": "StiBarCode",
              "Name": "BarCode45",
              "Guid": "be1224b9023c482192c0b4f2e59a9205",
              "GrowToHeight": true,
              "ClientRectangle": "160,0,230,100",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Border": ";;;;;;;solid:Black",
              "BackColor": "Transparent",
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "BarCodeType": {
                "Ident": "StiCode93ExtBarCodeType"
              },
              "Code": {
                "Value": "Abc123"
              }
            }
          },
          "CountData": 1
        },
        "6": {
          "Ident": "StiDataBand",
          "Name": "DataBand9",
          "Guid": "1cffc206ccbd4ad6bc2c091bc464e97e",
          "ClientRectangle": "0,840,749,110",
          "ComponentStyle": "Data2",
          "Interaction": {
            "Ident": "StiBandInteraction"
          },
          "Border": ";255,255,255;;;;;;solid:Black",
          "Brush": "solid:224,242,241",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Text11",
              "Guid": "236d91f38bac427f840cfc2375c6b3e9",
              "CanGrow": true,
              "GrowToHeight": true,
              "ClientRectangle": "0,0,160,110",
              "ComponentStyle": "Header4",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "UPC-Sup2"
              },
              "VertAlignment": "Center",
              "Font": "Segoe UI;12;;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:Black",
              "Margins": {
                "Left": 3.0,
                "Right": 0.0,
                "Top": 0.0,
                "Bottom": 0.0
              },
              "Type": "Expression"
            },
            "1": {
              "Ident": "StiText",
              "Name": "Text12",
              "Guid": "68f859e1d0b44ed182aa6c2991f03fb6",
              "CanGrow": true,
              "ClientRectangle": "390,0,359,110",
              "ComponentStyle": "Data1",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Add-on Symbols (barcodes) can be used in some applications together with the EAN-13, UPC-A, and UPC-E bar-codes. Add-on Symbols may contain 2 or 5 additional digits and are usually placed to the right of the barcode."
              },
              "HorAlignment": "Width",
              "Font": "Segoe UI;9.75;;",
              "Border": ";182,182,182;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:74,74,74",
              "TextOptions": {
                "WordWrap": true
              },
              "TextQuality": "Wysiwyg",
              "Margins": {
                "Left": 2.0,
                "Right": 2.0,
                "Top": 2.0,
                "Bottom": 2.0
              },
              "Type": "Expression"
            },
            "2": {
              "Ident": "StiBarCode",
              "Name": "BarCode8",
              "Guid": "935eb7b0f7d7456d8e5c79a0c3501e13",
              "GrowToHeight": true,
              "ClientRectangle": "160,0,230,110",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Border": ";;;;;;;solid:Black",
              "BackColor": "Transparent",
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "BarCodeType": {
                "Ident": "StiUpcSup2BarCodeType",
                "ShowQuietZoneIndicator": false
              },
              "Code": {
                "Value": "02"
              }
            }
          },
          "CountData": 1
        },
        "7": {
          "Ident": "StiDataBand",
          "Name": "DataBand10",
          "Guid": "e60c79d9ff13483b9eeb3bd154c16ed6",
          "ClientRectangle": "0,990,749,120",
          "ComponentStyle": "Data1",
          "Interaction": {
            "Ident": "StiBandInteraction"
          },
          "Border": ";182,182,182;;;;;;solid:Black",
          "Brush": "solid:",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Text58",
              "Guid": "c052ca64c88f414bade17052cb3c5e1b",
              "CanGrow": true,
              "GrowToHeight": true,
              "ClientRectangle": "0,0,160,120",
              "ComponentStyle": "Header4",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "UPC-Sup5"
              },
              "VertAlignment": "Center",
              "Font": "Segoe UI;12;;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:Black",
              "Margins": {
                "Left": 3.0,
                "Right": 0.0,
                "Top": 0.0,
                "Bottom": 0.0
              },
              "Type": "Expression"
            },
            "1": {
              "Ident": "StiText",
              "Name": "Text59",
              "Guid": "46e27a27dfec455bbb302c3e838b9181",
              "CanGrow": true,
              "ClientRectangle": "390,0,359,120",
              "ComponentStyle": "Data1",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Add-on Symbols (barcodes) can be used in some applications together with the EAN-13, UPC-A, and UPC-E bar-codes. Add-on Symbols may contain 2 or 5 additional digits and are usually placed to the right of the barcode."
              },
              "HorAlignment": "Width",
              "Font": "Segoe UI;9.75;;",
              "Border": ";182,182,182;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:74,74,74",
              "TextOptions": {
                "WordWrap": true
              },
              "TextQuality": "Wysiwyg",
              "Margins": {
                "Left": 2.0,
                "Right": 2.0,
                "Top": 2.0,
                "Bottom": 2.0
              },
              "Type": "Expression"
            },
            "2": {
              "Ident": "StiBarCode",
              "Name": "BarCode9",
              "Guid": "db195fe2196d4297aeb577ea7bcb0826",
              "GrowToHeight": true,
              "ClientRectangle": "160,0,230,120",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Border": ";;;;;;;solid:Black",
              "BackColor": "Transparent",
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "BarCodeType": {
                "Ident": "StiUpcSup5BarCodeType",
                "ShowQuietZoneIndicator": false
              },
              "Code": {
                "Value": "00321"
              }
            }
          },
          "CountData": 1
        }
      },
      "PaperSize": "A4",
      "TitleBeforeHeader": true,
      "Watermark": {
        "TextBrush": "solid:50,0,0,0"
      }
    },
    "1": {
      "Ident": "StiPage",
      "Name": "Page2",
      "Guid": "4d3371d91f814f02a331c99b54ecf20a",
      "Interaction": {
        "Ident": "StiInteraction"
      },
      "Border": ";;2;;;;;solid:Black",
      "Brush": "solid:",
      "Components": {
        "0": {
          "Ident": "StiPageHeaderBand",
          "Name": "PageHeaderBand2",
          "Guid": "c9c9a16de9164754a40121db7fcdd22f",
          "ClientRectangle": "0,20,749,40",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Border": ";;;;;;;solid:Black",
          "Brush": "solid:",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Text77",
              "Guid": "ce348690aa1c435f809a7d031f654b8a",
              "ClientRectangle": "0,0,160,40",
              "ComponentStyle": "Header3",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Symbology"
              },
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "Font": "Segoe UI;12;Bold;",
              "Border": "Left, Right;White;;;;;;solid:Black",
              "Brush": "solid:77,182,172",
              "TextBrush": "solid:255,255,255",
              "Type": "Expression"
            },
            "1": {
              "Ident": "StiText",
              "Name": "Text78",
              "Guid": "f1e3ea1f99584ec18281e6382bb5f268",
              "ClientRectangle": "160,0,240,40",
              "ComponentStyle": "Header3",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Example"
              },
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "Font": "Segoe UI;12;Bold;",
              "Border": "Left, Right;White;;;;;;solid:Black",
              "Brush": "solid:77,182,172",
              "TextBrush": "solid:255,255,255",
              "Type": "Expression"
            },
            "2": {
              "Ident": "StiText",
              "Name": "Text79",
              "Guid": "febb421d6b9f45bfa4e9a71e9a79053a",
              "ClientRectangle": "390,0,359,40",
              "ComponentStyle": "Header3",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Description"
              },
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "Font": "Segoe UI;12;Bold;",
              "Border": "Left, Right;White;;;;;;solid:Black",
              "Brush": "solid:77,182,172",
              "TextBrush": "solid:255,255,255",
              "Type": "Expression"
            }
          }
        },
        "1": {
          "Ident": "StiDataBand",
          "Name": "DataBand5",
          "Guid": "4253746f63354780a70c6b38a2163c61",
          "ClientRectangle": "0,100,749,310",
          "ComponentStyle": "Data2",
          "Interaction": {
            "Ident": "StiBandInteraction"
          },
          "Border": ";255,255,255;;;;;;solid:Black",
          "Brush": "solid:224,242,241",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Text54",
              "Guid": "1fbea62956a44f048c9eed8393d1ef5d",
              "CanGrow": true,
              "ClientRectangle": "0,0,160,100",
              "ComponentStyle": "Header4",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "EAN-8"
              },
              "VertAlignment": "Center",
              "Font": "Segoe UI;12;;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:Black",
              "Margins": {
                "Left": 3.0,
                "Right": 0.0,
                "Top": 0.0,
                "Bottom": 0.0
              },
              "Type": "Expression"
            },
            "1": {
              "Ident": "StiText",
              "Name": "Text55",
              "Guid": "97f210ebeb8c432f9ac2ffe415a0ccef",
              "CanGrow": true,
              "GrowToHeight": true,
              "ClientRectangle": "390,0,359,310",
              "ComponentStyle": "Data1",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "The EAN-8 bar-code was developed for use on small packages. It is used instead of the EAN-13 bar-code where an EAN-13 barcode would be too large, for example on packets of gum. The structure of the EAN-8 bar-code is in the same as the structure of the EAN-13 bar-code. The check digit is calculated automatically irrespective of input data. This bar-code does not contain the code of the producer and has only 4 digits. As a result there can only be 10000 specimen products per  organization, so the EAN-8 bar-code is provided only to those organizations which really need it."
              },
              "HorAlignment": "Width",
              "Font": "Segoe UI;9.75;;",
              "Border": ";182,182,182;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:74,74,74",
              "TextOptions": {
                "WordWrap": true
              },
              "TextQuality": "Wysiwyg",
              "Margins": {
                "Left": 2.0,
                "Right": 2.0,
                "Top": 2.0,
                "Bottom": 2.0
              },
              "Type": "Expression"
            },
            "2": {
              "Ident": "StiBarCode",
              "Name": "BarCode20",
              "Guid": "5547daed85024d67ada2ef17dc0e6172",
              "ClientRectangle": "160,0,230,100",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Border": ";;;;;;;solid:Black",
              "BackColor": "Transparent",
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "BarCodeType": {
                "Ident": "StiEAN8BarCodeType"
              },
              "Code": {
                "Value": "12345678"
              }
            },
            "3": {
              "Ident": "StiBarCode",
              "Name": "BarCode46",
              "Guid": "8a7f7caf126c4d62ac655fa4f388cff8",
              "ClientRectangle": "160,100,230,100",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Border": ";;;;;;;solid:Black",
              "BackColor": "Transparent",
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "BarCodeType": {
                "Ident": "StiEAN8BarCodeType",
                "SupplementType": "TwoDigit",
                "SupplementCode": "12"
              },
              "Code": {
                "Value": "4523456789012"
              }
            },
            "4": {
              "Ident": "StiBarCode",
              "Name": "BarCode47",
              "Guid": "7e99162526324265b4e322c31f8d0ddf",
              "ClientRectangle": "160,200,230,100",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Border": ";;;;;;;solid:Black",
              "BackColor": "Transparent",
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "BarCodeType": {
                "Ident": "StiEAN8BarCodeType",
                "SupplementType": "TwoDigit",
                "SupplementCode": "12"
              },
              "Code": {
                "Value": "4523456789012"
              }
            },
            "5": {
              "Ident": "StiText",
              "Name": "Text60",
              "Guid": "03c61f7fc5134532a7e5fbd3ffc8cb7a",
              "CanGrow": true,
              "ClientRectangle": "0,100,160,100",
              "ComponentStyle": "Header4",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "EAN-8 + Sup2"
              },
              "VertAlignment": "Center",
              "Font": "Segoe UI;12;;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:Black",
              "Margins": {
                "Left": 3.0,
                "Right": 0.0,
                "Top": 0.0,
                "Bottom": 0.0
              },
              "Type": "Expression"
            },
            "6": {
              "Ident": "StiText",
              "Name": "Text61",
              "Guid": "92a9f27353c54b2b915fffe6f11223c2",
              "CanGrow": true,
              "ClientRectangle": "0,200,160,100",
              "ComponentStyle": "Header4",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "EAN-8 + Sup5"
              },
              "VertAlignment": "Center",
              "Font": "Segoe UI;12;;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:Black",
              "Margins": {
                "Left": 3.0,
                "Right": 0.0,
                "Top": 0.0,
                "Bottom": 0.0
              },
              "Type": "Expression"
            }
          },
          "CountData": 1
        },
        "2": {
          "Ident": "StiDataBand",
          "Name": "DataBand6",
          "Guid": "2bccc6a71b7d4b28872709885f751e06",
          "ClientRectangle": "0,450,749,350",
          "ComponentStyle": "Data1",
          "Interaction": {
            "Ident": "StiBandInteraction"
          },
          "Border": ";182,182,182;;;;;;solid:Black",
          "Brush": "solid:",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Text21",
              "Guid": "a900fe349f0345b6bcbf68ace0b46abe",
              "CanGrow": true,
              "ClientRectangle": "0,0,160,120",
              "ComponentStyle": "Header4",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "EAN-13"
              },
              "VertAlignment": "Center",
              "Font": "Segoe UI;12;;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:Black",
              "Margins": {
                "Left": 3.0,
                "Right": 0.0,
                "Top": 0.0,
                "Bottom": 0.0
              },
              "Type": "Expression"
            },
            "1": {
              "Ident": "StiText",
              "Name": "Text22",
              "Guid": "032bd8257ccb415bb66ed85a491c53a3",
              "CanGrow": true,
              "GrowToHeight": true,
              "ClientRectangle": "390,0,359,350",
              "ComponentStyle": "Data1",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "The EAN-13 barcode was created based on the UPC-A barcode as an extension of the EAN.UCC system used outside the USA. EAN-13 is the European version of UPC-A. The structure of EAN-13 barcode is the same as UPC-A. Each bar-code character consist of 2 bars and 2 spaces, which may have a width from 1 to 4 modules. The first digit is always placed outside the symbol, additionally the right quiet zone indicator (>) is used to indicate the Quiet Zones that are necessary for barcode scanners to work properly."
              },
              "HorAlignment": "Width",
              "Font": "Segoe UI;9.75;;",
              "Border": ";182,182,182;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:74,74,74",
              "TextOptions": {
                "WordWrap": true
              },
              "TextQuality": "Wysiwyg",
              "Margins": {
                "Left": 2.0,
                "Right": 2.0,
                "Top": 2.0,
                "Bottom": 2.0
              },
              "Type": "Expression"
            },
            "2": {
              "Ident": "StiBarCode",
              "Name": "BarCode21",
              "Guid": "e0f52faeb61446f189940403d1d5c814",
              "ClientRectangle": "160,0,230,120",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Border": ";;;;;;;solid:Black",
              "BackColor": "Transparent",
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "BarCodeType": {
                "Ident": "StiEAN13BarCodeType"
              },
              "Code": {
                "Value": "0123456789012"
              }
            },
            "3": {
              "Ident": "StiBarCode",
              "Name": "BarCode48",
              "Guid": "02155bc4c50d46768125e04c267acc8b",
              "ClientRectangle": "160,120,230,120",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Border": ";;;;;;;solid:Black",
              "BackColor": "Transparent",
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "BarCodeType": {
                "Ident": "StiUpcABarCodeType",
                "SupplementType": "TwoDigit",
                "SupplementCode": "12",
                "ShowQuietZoneIndicator": false
              },
              "Code": {
                "Value": "4523456789012"
              }
            },
            "4": {
              "Ident": "StiBarCode",
              "Name": "BarCode49",
              "Guid": "c978102d0594490a897d21600f9b1b98",
              "ClientRectangle": "160,240,230,110",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Border": ";;;;;;;solid:Black",
              "BackColor": "Transparent",
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "BarCodeType": {
                "Ident": "StiEAN13BarCodeType",
                "SupplementType": "FiveDigit",
                "SupplementCode": "12345"
              },
              "Code": {
                "Value": "4523456789012"
              }
            },
            "5": {
              "Ident": "StiText",
              "Name": "Text62",
              "Guid": "e8448461ffc84f729111d4237a7556c0",
              "CanGrow": true,
              "ClientRectangle": "0,120,160,120",
              "ComponentStyle": "Header4",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "EAN-13 + Sup2"
              },
              "VertAlignment": "Center",
              "Font": "Segoe UI;12;;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:Black",
              "Margins": {
                "Left": 3.0,
                "Right": 0.0,
                "Top": 0.0,
                "Bottom": 0.0
              },
              "Type": "Expression"
            },
            "6": {
              "Ident": "StiText",
              "Name": "Text63",
              "Guid": "fa8629563d9f484caaefc694770d0bc3",
              "CanGrow": true,
              "ClientRectangle": "0,240,160,110",
              "ComponentStyle": "Header4",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "EAN-13 + Sup5"
              },
              "VertAlignment": "Center",
              "Font": "Segoe UI;12;;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:Black",
              "Margins": {
                "Left": 3.0,
                "Right": 0.0,
                "Top": 0.0,
                "Bottom": 0.0
              },
              "Type": "Expression"
            }
          },
          "CountData": 1
        },
        "3": {
          "Ident": "StiDataBand",
          "Name": "DataBand12",
          "Guid": "7db522d23c8b43668bcdf8c759493fef",
          "ClientRectangle": "0,840,749,100",
          "ComponentStyle": "Data2",
          "Interaction": {
            "Ident": "StiBandInteraction"
          },
          "Border": ";255,255,255;;;;;;solid:Black",
          "Brush": "solid:224,242,241",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Text10",
              "Guid": "c08c51f796ac4ef895776ffac9a64975",
              "CanGrow": true,
              "GrowToHeight": true,
              "ClientRectangle": "0,0,160,100",
              "ComponentStyle": "Header4",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "JAN-8"
              },
              "VertAlignment": "Center",
              "Font": "Segoe UI;12;;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:Black",
              "Margins": {
                "Left": 3.0,
                "Right": 0.0,
                "Top": 0.0,
                "Bottom": 0.0
              },
              "Type": "Expression"
            },
            "1": {
              "Ident": "StiText",
              "Name": "Text41",
              "Guid": "3eaa446dd3b34135b1a2441ac5dfdc4c",
              "CanGrow": true,
              "GrowToHeight": true,
              "ClientRectangle": "390,0,359,100",
              "ComponentStyle": "Data1",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "A JAN-8 barcode is another name for an EAN-8 barcode dedicated for use only in Japan. The first two digits of the barcode should be 45 or 49 to indicate Japan. Note the 'human readable' digits at the foot which can be used by operators if the label becomes damaged or will not scan for some reason - \"49123456\" is a number encoded in the barcode.\r\n\r\n"
              },
              "HorAlignment": "Width",
              "Font": "Segoe UI;9.75;;",
              "Border": ";182,182,182;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:74,74,74",
              "TextOptions": {
                "WordWrap": true
              },
              "TextQuality": "Wysiwyg",
              "Margins": {
                "Left": 2.0,
                "Right": 2.0,
                "Top": 2.0,
                "Bottom": 2.0
              },
              "Type": "Expression"
            },
            "2": {
              "Ident": "StiBarCode",
              "Name": "BarCode7",
              "Guid": "6245e551c5124832b7664b053f19f041",
              "GrowToHeight": true,
              "ClientRectangle": "160,0,230,100",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Border": ";;;;;;;solid:Black",
              "BackColor": "Transparent",
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "BarCodeType": {
                "Ident": "StiJan8BarCodeType"
              },
              "Code": {
                "Value": "4523456789012"
              }
            }
          },
          "EvenStyle": "Data2",
          "CountData": 1
        },
        "4": {
          "Ident": "StiDataBand",
          "Name": "DataBand13",
          "Guid": "046e34997e4a4f02973684cb123dcbcb",
          "ClientRectangle": "0,980,749,130",
          "ComponentStyle": "Data1",
          "Interaction": {
            "Ident": "StiBandInteraction"
          },
          "Border": ";182,182,182;;;;;;solid:Black",
          "Brush": "solid:",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Text30",
              "Guid": "7121b6bd9788441a8fc97202519ce82d",
              "CanGrow": true,
              "GrowToHeight": true,
              "ClientRectangle": "0,0,160,130",
              "ComponentStyle": "Header4",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "JAN-13"
              },
              "VertAlignment": "Center",
              "Font": "Segoe UI;12;;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:Black",
              "Margins": {
                "Left": 3.0,
                "Right": 0.0,
                "Top": 0.0,
                "Bottom": 0.0
              },
              "Type": "Expression"
            },
            "1": {
              "Ident": "StiText",
              "Name": "Text42",
              "Guid": "c726da08d8ab45149c89f7c2129ed46d",
              "CanGrow": true,
              "GrowToHeight": true,
              "ClientRectangle": "390,0,359,130",
              "ComponentStyle": "Data1",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "A JAN-13 barcode is another name for an EAN-13 barcode dedicated for use only in Japan. The first two digits should be 45 or 49 which indicate Japan. Note the 'human readable' digits at the foot which can be used by operators if the label becomes damaged or will not scan for some reason - \"4901234567894\" is the number encoded in the barcode.\r\n\r\n"
              },
              "HorAlignment": "Width",
              "Font": "Segoe UI;9.75;;",
              "Border": ";182,182,182;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:74,74,74",
              "TextOptions": {
                "WordWrap": true
              },
              "TextQuality": "Wysiwyg",
              "Margins": {
                "Left": 2.0,
                "Right": 2.0,
                "Top": 2.0,
                "Bottom": 2.0
              },
              "Type": "Expression"
            },
            "2": {
              "Ident": "StiBarCode",
              "Name": "BarCode11",
              "Guid": "52be6237ddd64cc686749b7397cc3e2f",
              "ClientRectangle": "160,0,230,130",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Border": ";;;;;;;solid:Black",
              "BackColor": "Transparent",
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "BarCodeType": {
                "Ident": "StiJan13BarCodeType"
              },
              "Code": {
                "Value": "4523456789012"
              }
            }
          },
          "CountData": 1
        }
      },
      "PrintOnPreviousPage": true,
      "PaperSize": "A4",
      "Watermark": {
        "TextBrush": "solid:50,0,0,0"
      }
    },
    "2": {
      "Ident": "StiPage",
      "Name": "Page3",
      "Guid": "3543ac03d5b34b1eb8ff0a585c6dfc02",
      "Interaction": {
        "Ident": "StiInteraction"
      },
      "Border": ";;2;;;;;solid:Black",
      "Brush": "solid:",
      "Components": {
        "0": {
          "Ident": "StiPageHeaderBand",
          "Name": "PageHeaderBand3",
          "Guid": "80178ec92dcb45578820672ed1cbc2ae",
          "ClientRectangle": "0,20,749,40",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Border": ";;;;;;;solid:Black",
          "Brush": "solid:",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Text80",
              "Guid": "243f09e9b489479cb1e07fd171e28f51",
              "ClientRectangle": "0,0,160,40",
              "ComponentStyle": "Header3",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Symbology"
              },
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "Font": "Segoe UI;12;Bold;",
              "Border": "Left, Right;White;;;;;;solid:Black",
              "Brush": "solid:77,182,172",
              "TextBrush": "solid:255,255,255",
              "Type": "Expression"
            },
            "1": {
              "Ident": "StiText",
              "Name": "Text81",
              "Guid": "7e86664d28b34909ad55912a992dec66",
              "ClientRectangle": "160,0,240,40",
              "ComponentStyle": "Header3",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Example"
              },
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "Font": "Segoe UI;12;Bold;",
              "Border": "Left, Right;White;;;;;;solid:Black",
              "Brush": "solid:77,182,172",
              "TextBrush": "solid:255,255,255",
              "Type": "Expression"
            },
            "2": {
              "Ident": "StiText",
              "Name": "Text82",
              "Guid": "62e678191b994069a50b4c0617f6530f",
              "ClientRectangle": "390,0,359,40",
              "ComponentStyle": "Header3",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Description"
              },
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "Font": "Segoe UI;12;Bold;",
              "Border": "Left, Right;White;;;;;;solid:Black",
              "Brush": "solid:77,182,172",
              "TextBrush": "solid:255,255,255",
              "Type": "Expression"
            }
          }
        },
        "1": {
          "Ident": "StiDataBand",
          "Name": "DataBand7",
          "Guid": "e6f079d2f1604692be52b58db7ffabf9",
          "ClientRectangle": "0,100,749,380",
          "ComponentStyle": "Data2",
          "Interaction": {
            "Ident": "StiBandInteraction"
          },
          "Border": ";255,255,255;;;;;;solid:Black",
          "Brush": "solid:224,242,241",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Text1",
              "Guid": "c8f8f383733d4cd39f6d2b1fab82877e",
              "CanGrow": true,
              "ClientRectangle": "0,0,160,130",
              "ComponentStyle": "Header4",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "UPC-A"
              },
              "VertAlignment": "Center",
              "Font": "Segoe UI;12;;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:Black",
              "Margins": {
                "Left": 3.0,
                "Right": 0.0,
                "Top": 0.0,
                "Bottom": 0.0
              },
              "Type": "Expression"
            },
            "1": {
              "Ident": "StiText",
              "Name": "Text2",
              "Guid": "d46eebe468d745d5a3f9e3ada5f7375a",
              "CanGrow": true,
              "ClientRectangle": "390,0,359,380",
              "ComponentStyle": "Data1",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "UPC-A was the first barcode, created by Uniform Code Council, Inc. in 1973. The UPC-A barcode is an unbroken code with a fixed length and high density. It is used for tracking trade items in stores, and otherwise marking goods. UPC-A barcodes consist of 11 data digits and one check digit. The first digit is a number system digit that normally represents the type of product being identified. The following 5 digits are a manufacturers code and the next 5 digits are used to identify a specific product. The barcode does not contain any information about characteristics of a product, but only a unique number relating to an entry in the International data base where all information about the particular product is stored.\r\n"
              },
              "HorAlignment": "Width",
              "Font": "Segoe UI;9.75;;",
              "Border": ";182,182,182;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:74,74,74",
              "TextOptions": {
                "WordWrap": true
              },
              "TextQuality": "Wysiwyg",
              "Margins": {
                "Left": 2.0,
                "Right": 2.0,
                "Top": 2.0,
                "Bottom": 2.0
              },
              "Type": "Expression"
            },
            "2": {
              "Ident": "StiBarCode",
              "Name": "BarCode1",
              "Guid": "7e4f0b68abfc436b880d228f75a69c4b",
              "ClientRectangle": "160,0,230,130",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Border": ";;;;;;;solid:Black",
              "BackColor": "Transparent",
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "BarCodeType": {
                "Ident": "StiUpcABarCodeType",
                "ShowQuietZoneIndicator": false
              },
              "Code": {
                "Value": "1234567890123"
              }
            },
            "3": {
              "Ident": "StiBarCode",
              "Name": "BarCode41",
              "Guid": "4dd0c3afcadd4ae5a7be59246035ce9c",
              "ClientRectangle": "160,130,230,120",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Border": ";;;;;;;solid:Black",
              "BackColor": "Transparent",
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "BarCodeType": {
                "Ident": "StiUpcABarCodeType",
                "SupplementType": "TwoDigit",
                "SupplementCode": "12",
                "ShowQuietZoneIndicator": false
              },
              "Code": {
                "Value": "4523456789012"
              }
            },
            "4": {
              "Ident": "StiBarCode",
              "Name": "BarCode42",
              "Guid": "9e4f36c0a71b43c8b1883464810ad435",
              "ClientRectangle": "160,250,230,130",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Border": ";;;;;;;solid:Black",
              "BackColor": "Transparent",
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "BarCodeType": {
                "Ident": "StiUpcABarCodeType",
                "SupplementType": "FiveDigit",
                "SupplementCode": "12345",
                "ShowQuietZoneIndicator": false
              },
              "Code": {
                "Value": "4523456789012"
              }
            },
            "5": {
              "Ident": "StiText",
              "Name": "Text13",
              "Guid": "5df92aee14224ba88af7530f20c47567",
              "CanGrow": true,
              "ClientRectangle": "0,130,160,120",
              "ComponentStyle": "Header4",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "UPC-A + Sup2"
              },
              "VertAlignment": "Center",
              "Font": "Segoe UI;12;;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:Black",
              "Margins": {
                "Left": 3.0,
                "Right": 0.0,
                "Top": 0.0,
                "Bottom": 0.0
              },
              "Type": "Expression"
            },
            "6": {
              "Ident": "StiText",
              "Name": "Text14",
              "Guid": "8ff97fdcd8f045b68814bd96a4855d47",
              "CanGrow": true,
              "ClientRectangle": "0,250,160,130",
              "ComponentStyle": "Header4",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "UPC-A + Sup5"
              },
              "VertAlignment": "Center",
              "Font": "Segoe UI;12;;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:Black",
              "Margins": {
                "Left": 3.0,
                "Right": 0.0,
                "Top": 0.0,
                "Bottom": 0.0
              },
              "Type": "Expression"
            }
          },
          "EvenStyle": "Data2",
          "CountData": 1
        },
        "2": {
          "Ident": "StiDataBand",
          "Name": "DataBand8",
          "Guid": "056acacbb0124387b2034a336f3b51d3",
          "ClientRectangle": "0,520,749,120",
          "ComponentStyle": "Data1",
          "Interaction": {
            "Ident": "StiBandInteraction"
          },
          "Border": ";182,182,182;;;;;;solid:Black",
          "Brush": "solid:",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Text56",
              "Guid": "2aa77f9ebcf246e4b582adab14e60ae0",
              "CanGrow": true,
              "GrowToHeight": true,
              "ClientRectangle": "0,0,160,120",
              "ComponentStyle": "Header4",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "UPC-E"
              },
              "VertAlignment": "Center",
              "Font": "Segoe UI;12;;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:Black",
              "Margins": {
                "Left": 3.0,
                "Right": 0.0,
                "Top": 0.0,
                "Bottom": 0.0
              },
              "Type": "Expression"
            },
            "1": {
              "Ident": "StiText",
              "Name": "Text57",
              "Guid": "bbbc0817a2664555b65ff820e8b8ea6f",
              "CanGrow": true,
              "ClientRectangle": "390,0,359,120",
              "ComponentStyle": "Data1",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "A UPC-E is a smaller seven digit UPC symbology for number system 0. For UPC-E barcodes, normally 6 digits are specified and the barcode calculates the seventh check digit. Before the Middle guard bars, a binary 1 is indicated by a bar, while a 0 is indicated by a space. After the Middle guard bars, however, the patterns are optically inverted. In other words, a 1 is now indicated by a space, and a 0 is now indicated by a bar. It has the same basic structure as the UPC-A barcode. Note the 'human readable' digits at the foot which can be used by operators if the label becomes damaged or will not scan for some reason - \"1234567\" is the number encoded in the barcode."
              },
              "HorAlignment": "Width",
              "Font": "Segoe UI;9.75;;",
              "Border": ";182,182,182;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:74,74,74",
              "TextOptions": {
                "WordWrap": true
              },
              "TextQuality": "Wysiwyg",
              "Margins": {
                "Left": 2.0,
                "Right": 2.0,
                "Top": 2.0,
                "Bottom": 2.0
              },
              "Type": "Expression"
            },
            "2": {
              "Ident": "StiBarCode",
              "Name": "BarCode2",
              "Guid": "31de892b0a6a45d5987aa53d82dd0c5d",
              "GrowToHeight": true,
              "ClientRectangle": "160,0,230,120",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Border": ";;;;;;;solid:Black",
              "BackColor": "Transparent",
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "BarCodeType": {
                "Ident": "StiUpcEBarCodeType",
                "ShowQuietZoneIndicator": false
              },
              "Code": {
                "Value": "01234567"
              }
            }
          },
          "EvenStyle": "Data2",
          "CountData": 1
        },
        "3": {
          "Ident": "StiDataBand",
          "Name": "DataBand14",
          "Guid": "aa528be8d9c64d1b921b574f808e4f34",
          "ClientRectangle": "0,680,749,280",
          "ComponentStyle": "Data2",
          "Interaction": {
            "Ident": "StiBandInteraction"
          },
          "Border": ";255,255,255;;;;;;solid:Black",
          "Brush": "solid:224,242,241",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Text32",
              "Guid": "d5f6b48397214c279c717ab11bed7dcb",
              "CanGrow": true,
              "ClientRectangle": "0,0,160,90",
              "ComponentStyle": "Header4",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Code 128a"
              },
              "VertAlignment": "Center",
              "Font": "Segoe UI;12;;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:Black",
              "Margins": {
                "Left": 3.0,
                "Right": 0.0,
                "Top": 0.0,
                "Bottom": 0.0
              },
              "Type": "Expression"
            },
            "1": {
              "Ident": "StiText",
              "Name": "Text43",
              "Guid": "9a5f4d3722844836a6e486e8e94d2db1",
              "CanGrow": true,
              "ClientRectangle": "390,0,359,280",
              "ComponentStyle": "Data1",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "The Code128 barcode was developed in 1981. It is a variable length, high density, alphanumeric symbology. It allows the output of 128 characters of ASCII and is effective for digits. There are actually three subcodes, which can be mixed within a single barcode: Code128a, Code128b, Code128c. The barcode consist of three bars and three spaces. Bars and spaces have module construction and their width consist of one or four modules. The width of an element consist of eleven modules. The \"Stop\" sign consist of 13 modules and has four bars and three spaces. The check sum is calculated automatically."
              },
              "HorAlignment": "Width",
              "Font": "Segoe UI;9.75;;",
              "Border": ";182,182,182;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:74,74,74",
              "TextOptions": {
                "WordWrap": true
              },
              "TextQuality": "Wysiwyg",
              "Margins": {
                "Left": 2.0,
                "Right": 2.0,
                "Top": 2.0,
                "Bottom": 2.0
              },
              "Type": "Expression"
            },
            "2": {
              "Ident": "StiText",
              "Name": "Text64",
              "Guid": "ba2666724b04441994d16d75d1d4863b",
              "CanGrow": true,
              "ClientRectangle": "0,90,160,100",
              "ComponentStyle": "Header4",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Code 128b"
              },
              "VertAlignment": "Center",
              "Font": "Segoe UI;12;;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:Black",
              "Margins": {
                "Left": 3.0,
                "Right": 0.0,
                "Top": 0.0,
                "Bottom": 0.0
              },
              "Type": "Expression"
            },
            "3": {
              "Ident": "StiText",
              "Name": "Text65",
              "Guid": "a0d27d6c755b42e4a465a00970989a56",
              "CanGrow": true,
              "ClientRectangle": "0,190,160,90",
              "ComponentStyle": "Header4",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Code 128c"
              },
              "VertAlignment": "Center",
              "Font": "Segoe UI;12;;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:Black",
              "Margins": {
                "Left": 3.0,
                "Right": 0.0,
                "Top": 0.0,
                "Bottom": 0.0
              },
              "Type": "Expression"
            },
            "4": {
              "Ident": "StiBarCode",
              "Name": "BarCode29",
              "Guid": "7eebc0dec0234151a956426b49b5a62a",
              "ClientRectangle": "160,0,230,90",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Border": ";;;;;;;solid:Black",
              "BackColor": "Transparent",
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "BarCodeType": {
                "Ident": "StiCode128aBarCodeType"
              },
              "Code": {
                "Value": "ABC123"
              }
            },
            "5": {
              "Ident": "StiBarCode",
              "Name": "BarCode31",
              "Guid": "66f6262dcb694a36a4861a2d58bd5995",
              "ClientRectangle": "160,90,230,100",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Border": ";;;;;;;solid:Black",
              "BackColor": "Transparent",
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "BarCodeType": {
                "Ident": "StiCode128bBarCodeType"
              },
              "Code": {
                "Value": "ABCabc123"
              }
            },
            "6": {
              "Ident": "StiBarCode",
              "Name": "BarCode38",
              "Guid": "cb9af0e6715a410ea8db64fc69a3493a",
              "ClientRectangle": "160,190,230,90",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Border": ";;;;;;;solid:Black",
              "BackColor": "Transparent",
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "BarCodeType": {
                "Ident": "StiCode128cBarCodeType"
              },
              "Code": {
                "Value": "0123456789012345"
              }
            }
          },
          "EvenStyle": "Data2",
          "CountData": 1
        }
      },
      "PrintOnPreviousPage": true,
      "PaperSize": "A4",
      "Watermark": {
        "TextBrush": "solid:50,0,0,0"
      }
    },
    "3": {
      "Ident": "StiPage",
      "Name": "Page4",
      "Guid": "72e4353ebf454f70b5e98d54ba075891",
      "Interaction": {
        "Ident": "StiInteraction"
      },
      "Border": ";;2;;;;;solid:Black",
      "Brush": "solid:",
      "Components": {
        "0": {
          "Ident": "StiPageHeaderBand",
          "Name": "PageHeaderBand4",
          "Guid": "ae724dbebc244ff2bc4919770e63af1c",
          "ClientRectangle": "0,20,749,40",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Border": ";;;;;;;solid:Black",
          "Brush": "solid:",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Text83",
              "Guid": "c6de4550896c44f88ab91db65eca3af5",
              "ClientRectangle": "0,0,160,40",
              "ComponentStyle": "Header3",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Symbology"
              },
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "Font": "Segoe UI;12;Bold;",
              "Border": "Left, Right;White;;;;;;solid:Black",
              "Brush": "solid:77,182,172",
              "TextBrush": "solid:255,255,255",
              "Type": "Expression"
            },
            "1": {
              "Ident": "StiText",
              "Name": "Text84",
              "Guid": "a6b2863efecc42238b1bb51f12846e17",
              "ClientRectangle": "160,0,240,40",
              "ComponentStyle": "Header3",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Example"
              },
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "Font": "Segoe UI;12;Bold;",
              "Border": "Left, Right;White;;;;;;solid:Black",
              "Brush": "solid:77,182,172",
              "TextBrush": "solid:255,255,255",
              "Type": "Expression"
            },
            "2": {
              "Ident": "StiText",
              "Name": "Text85",
              "Guid": "23c59246b0644bdeb8d47bb1d0fb5fae",
              "ClientRectangle": "390,0,359,40",
              "ComponentStyle": "Header3",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Description"
              },
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "Font": "Segoe UI;12;Bold;",
              "Border": "Left, Right;White;;;;;;solid:Black",
              "Brush": "solid:77,182,172",
              "TextBrush": "solid:255,255,255",
              "Type": "Expression"
            }
          }
        },
        "1": {
          "Ident": "StiDataBand",
          "Name": "DataBand15",
          "Guid": "a6e70b2328454843a6d84d27d0805689",
          "ClientRectangle": "0,100,749,280",
          "ComponentStyle": "Data2",
          "Interaction": {
            "Ident": "StiBandInteraction"
          },
          "Border": ";255,255,255;;;;;;solid:Black",
          "Brush": "solid:224,242,241",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Text3",
              "Guid": "8a81b285eb0049c4abef7c68aa8e41b4",
              "CanGrow": true,
              "ClientRectangle": "0,0,160,90",
              "ComponentStyle": "Header4",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "EAN-128a"
              },
              "VertAlignment": "Center",
              "Font": "Segoe UI;12;;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:Black",
              "Margins": {
                "Left": 3.0,
                "Right": 0.0,
                "Top": 0.0,
                "Bottom": 0.0
              },
              "Type": "Expression"
            },
            "1": {
              "Ident": "StiText",
              "Name": "Text4",
              "Guid": "dc2c63d39edd44a2a6526c7875e8bb3f",
              "CanGrow": true,
              "ClientRectangle": "390,0,359,280",
              "ComponentStyle": "Data1",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "The EAN-128 bar-code is a subset of the Code128 barcode which uses a variable length, high density, alphanumeric symbology. It allows the output of 128 characters of ASCII and is effective for digits. There are actually three subcodes, which can be mixed within a single barcode: EAN-128a, EAN-128b, EAN-128c. The structure of the EAN-128 bar-code is the same as for the Code128 bar-code. Elements of the bar-code consist of three bars and three spaces. Bars and spaces have module construction and their width consists of either one or four modules. The width of an element consists of eleven modules. To difference between the EAN-128 bar-code and the Code128 bar-code is that the FNC1 is placed after the start character. This character is reserved for the EAN.UCC system."
              },
              "HorAlignment": "Width",
              "Font": "Segoe UI;9.75;;",
              "Border": ";182,182,182;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:74,74,74",
              "TextOptions": {
                "WordWrap": true
              },
              "TextQuality": "Wysiwyg",
              "Margins": {
                "Left": 2.0,
                "Right": 2.0,
                "Top": 2.0,
                "Bottom": 2.0
              },
              "Type": "Expression"
            },
            "2": {
              "Ident": "StiText",
              "Name": "Text8",
              "Guid": "dfcda7dff8d64891aa9d76aceeb1ecec",
              "CanGrow": true,
              "ClientRectangle": "0,90,160,100",
              "ComponentStyle": "Header4",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "EAN-128b"
              },
              "VertAlignment": "Center",
              "Font": "Segoe UI;12;;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:Black",
              "Margins": {
                "Left": 3.0,
                "Right": 0.0,
                "Top": 0.0,
                "Bottom": 0.0
              },
              "Type": "Expression"
            },
            "3": {
              "Ident": "StiText",
              "Name": "Text66",
              "Guid": "64bed1aecc3d41b48a103c19bf4d2367",
              "CanGrow": true,
              "ClientRectangle": "0,190,160,90",
              "ComponentStyle": "Header4",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "EAN-128c"
              },
              "VertAlignment": "Center",
              "Font": "Segoe UI;12;;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:Black",
              "Margins": {
                "Left": 3.0,
                "Right": 0.0,
                "Top": 0.0,
                "Bottom": 0.0
              },
              "Type": "Expression"
            },
            "4": {
              "Ident": "StiBarCode",
              "Name": "BarCode3",
              "Guid": "5ab8017aae684f1c9019ff74a3329bf4",
              "ClientRectangle": "160,0,230,90",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Border": ";;;;;;;solid:Black",
              "BackColor": "Transparent",
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "BarCodeType": {
                "Ident": "StiEAN128aBarCodeType"
              },
              "Code": {
                "Value": "ABC123"
              }
            },
            "5": {
              "Ident": "StiBarCode",
              "Name": "BarCode4",
              "Guid": "b664bf2096734f1f9bf618dfebaa01d9",
              "ClientRectangle": "160,90,230,100",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Border": ";;;;;;;solid:Black",
              "BackColor": "Transparent",
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "BarCodeType": {
                "Ident": "StiEAN128bBarCodeType"
              },
              "Code": {
                "Value": "ABCabc123"
              }
            },
            "6": {
              "Ident": "StiBarCode",
              "Name": "BarCode5",
              "Guid": "dd0bb8211c1f4c40914c02aed2045e7c",
              "ClientRectangle": "160,190,230,90",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Border": ";;;;;;;solid:Black",
              "BackColor": "Transparent",
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "BarCodeType": {
                "Ident": "StiEAN128cBarCodeType"
              },
              "Code": {
                "Value": "0123456789012345"
              }
            }
          },
          "EvenStyle": "Data2",
          "CountData": 1
        },
        "2": {
          "Ident": "StiDataBand",
          "Name": "DataBand33",
          "Guid": "5f0eb9e0b87a44b89029450c3172059b",
          "ClientRectangle": "0,420,749,120",
          "ComponentStyle": "Data1",
          "Interaction": {
            "Ident": "StiBandInteraction"
          },
          "Border": ";182,182,182;;;;;;solid:Black",
          "Brush": "solid:",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Text101",
              "Guid": "58b377ca5b9e4e54835574d8d31ab804",
              "CanGrow": true,
              "GrowToHeight": true,
              "ClientRectangle": "0,0,160,120",
              "ComponentStyle": "Header4",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "GS1-128"
              },
              "VertAlignment": "Center",
              "Font": "Segoe UI;12;;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:Black",
              "Margins": {
                "Left": 3.0,
                "Right": 0.0,
                "Top": 0.0,
                "Bottom": 0.0
              },
              "Type": "Expression"
            },
            "1": {
              "Ident": "StiText",
              "Name": "Text102",
              "Guid": "79c4d1f8ac2b4c4e9edf0450df1a3b56",
              "CanGrow": true,
              "GrowToHeight": true,
              "ClientRectangle": "390,0,359,120",
              "ComponentStyle": "Data1",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "GS1-128 was developed to provide a global standard for exchanging data between different companies. GS1-128 not only encodes the data, but provides a method of defining the meaning of the data by defining a list of “Application Identifiers” (best before dates, batch numbers, quantities, weights and many other attributes needed by the user).\r\nGS1-128 is a derivative language of the Code 128 symbology, utilizing a control character (FNC1) and application identifiers."
              },
              "HorAlignment": "Width",
              "Font": "Segoe UI;9.75;;",
              "Border": ";182,182,182;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:74,74,74",
              "TextOptions": {
                "WordWrap": true
              },
              "TextQuality": "Wysiwyg",
              "Margins": {
                "Left": 2.0,
                "Right": 2.0,
                "Top": 2.0,
                "Bottom": 2.0
              },
              "Type": "Expression"
            },
            "2": {
              "Ident": "StiBarCode",
              "Name": "BarCode24",
              "Guid": "dc271418895c4d42b71002acbb3b4871",
              "GrowToHeight": true,
              "ClientRectangle": "160,0,230,120",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Border": ";;;;;;;solid:Black",
              "BackColor": "Transparent",
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "BarCodeType": {
                "Ident": "StiGS1_128BarCodeType"
              },
              "Code": {
                "Value": "(21)012345(3103)000123"
              }
            }
          },
          "EvenStyle": "Data2",
          "CountData": 1
        },
        "3": {
          "Ident": "StiDataBand",
          "Name": "DataBand18",
          "Guid": "9cb3bccec3ff410d8332e4319be90984",
          "ClientRectangle": "0,580,749,130",
          "ComponentStyle": "Data2",
          "Interaction": {
            "Ident": "StiBandInteraction"
          },
          "Border": ";255,255,255;;;;;;solid:Black",
          "Brush": "solid:224,242,241",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Text35",
              "Guid": "63658c6c5c83453ba23d54e6880325a5",
              "CanGrow": true,
              "GrowToHeight": true,
              "ClientRectangle": "0,0,160,130",
              "ComponentStyle": "Header4",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "ISBN-10"
              },
              "VertAlignment": "Center",
              "Font": "Segoe UI;12;;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:Black",
              "Margins": {
                "Left": 3.0,
                "Right": 0.0,
                "Top": 0.0,
                "Bottom": 0.0
              },
              "Type": "Expression"
            },
            "1": {
              "Ident": "StiText",
              "Name": "Text36",
              "Guid": "b075b67e894b418f9e546f2e693ed1f8",
              "CanGrow": true,
              "GrowToHeight": true,
              "ClientRectangle": "390,0,359,130",
              "ComponentStyle": "Data1",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "ISBN is the abbreviation of International Standard Book Number - a unique, numeric commercial book identifier. Based upon the 9-digit Standard Book Numbering (SBN) code introduced in 1966,  10-digit ISBN format was developed in 1970 and became the international standard. Note the 'human readable' digits at the foot which can be used by operators if the label becomes damaged or will not scan for some reason - \"80-902734-1-6\" is the number encoded in the barcode.\r\n\r\n"
              },
              "HorAlignment": "Width",
              "Font": "Segoe UI;9.75;;",
              "Border": ";182,182,182;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:74,74,74",
              "TextOptions": {
                "WordWrap": true
              },
              "TextQuality": "Wysiwyg",
              "Margins": {
                "Left": 2.0,
                "Right": 2.0,
                "Top": 2.0,
                "Bottom": 2.0
              },
              "Type": "Expression"
            },
            "2": {
              "Ident": "StiBarCode",
              "Name": "BarCode17",
              "Guid": "5126f78fa9e44a52a8e9bf1fc2b71883",
              "GrowToHeight": true,
              "ClientRectangle": "160,0,230,130",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Border": ";;;;;;;solid:Black",
              "BackColor": "Transparent",
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "BarCodeType": {
                "Ident": "StiIsbn10BarCodeType"
              },
              "Code": {
                "Value": "0-7356-2153-5"
              }
            }
          },
          "CountData": 1
        },
        "4": {
          "Ident": "StiDataBand",
          "Name": "DataBand19",
          "Guid": "6f7b50e038d84ca1b01857933f1a52c4",
          "ClientRectangle": "0,750,749,130",
          "ComponentStyle": "Data1",
          "Interaction": {
            "Ident": "StiBandInteraction"
          },
          "Border": ";182,182,182;;;;;;solid:Black",
          "Brush": "solid:",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Text68",
              "Guid": "d95cd35090b14da6999281fd6711cb86",
              "CanGrow": true,
              "GrowToHeight": true,
              "ClientRectangle": "0,0,160,130",
              "ComponentStyle": "Header4",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "ISBN-13"
              },
              "VertAlignment": "Center",
              "Font": "Segoe UI;12;;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:Black",
              "Margins": {
                "Left": 3.0,
                "Right": 0.0,
                "Top": 0.0,
                "Bottom": 0.0
              },
              "Type": "Expression"
            },
            "1": {
              "Ident": "StiText",
              "Name": "Text69",
              "Guid": "a321dcc0515b44c8adeaa438c48b0525",
              "CanGrow": true,
              "GrowToHeight": true,
              "ClientRectangle": "390,0,359,130",
              "ComponentStyle": "Data1",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "ISBN is the abbreviation of International Standard Book Number - a unique, numeric commercial book identifier.  The ISBN-13 specification was Issued from January 2007, and describes how the 13-digit ISBN check digit is calculated. Note the 'human readable' digits at the foot which can be used by operators if the label becomes damaged or will not scan for some reason - \"978-0-306-40615-7\" is a number encoded in the barcode.\r\n\r\n"
              },
              "HorAlignment": "Width",
              "Font": "Segoe UI;9.75;;",
              "Border": ";182,182,182;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:74,74,74",
              "TextOptions": {
                "WordWrap": true
              },
              "TextQuality": "Wysiwyg",
              "Margins": {
                "Left": 2.0,
                "Right": 2.0,
                "Top": 2.0,
                "Bottom": 2.0
              },
              "Type": "Expression"
            },
            "2": {
              "Ident": "StiBarCode",
              "Name": "BarCode34",
              "Guid": "0cead220ceeb4c2997493c4f3e271f54",
              "GrowToHeight": true,
              "ClientRectangle": "160,0,230,130",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Border": ";;;;;;;solid:Black",
              "BackColor": "Transparent",
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "BarCodeType": {
                "Ident": "StiIsbn13BarCodeType"
              },
              "Code": {
                "Value": "978-0-7356-2153-4"
              }
            }
          },
          "CountData": 1
        },
        "5": {
          "Ident": "StiDataBand",
          "Name": "DataBand11",
          "Guid": "d4bc985faeb24e52b6cac8bc87e81a99",
          "ClientRectangle": "0,920,749,120",
          "ComponentStyle": "Data2",
          "Interaction": {
            "Ident": "StiBandInteraction"
          },
          "Border": ";255,255,255;;;;;;solid:Black",
          "Brush": "solid:224,242,241",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Text39",
              "Guid": "4a12847c7dfc454dbb94eec32af7f59e",
              "CanGrow": true,
              "GrowToHeight": true,
              "ClientRectangle": "0,0,160,120",
              "ComponentStyle": "Header4",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Codabar"
              },
              "VertAlignment": "Center",
              "Font": "Segoe UI;12;;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:Black",
              "Margins": {
                "Left": 3.0,
                "Right": 0.0,
                "Top": 0.0,
                "Bottom": 0.0
              },
              "Type": "Expression"
            },
            "1": {
              "Ident": "StiText",
              "Name": "Text40",
              "Guid": "7d6bdbba2cda4e4284b821739e7bfb5d",
              "CanGrow": true,
              "ClientRectangle": "390,0,359,120",
              "ComponentStyle": "Data1",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "The Codabar is a linear barcode symbology developed in 1972. It can be called as NW-7, USD-4, Code 2 of 7 (2 values of a bar length, 7 elements). It is frequently used in medicine (for example, blood bank forms). Two bars and three spaces are used for encoding. The bar-code has four different sets of start/stop characters: A, B, C, D. These characters are used only as start/stop characters and should not be appeared in the bar-code."
              },
              "HorAlignment": "Width",
              "Font": "Segoe UI;9.75;;",
              "Border": ";182,182,182;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:74,74,74",
              "TextOptions": {
                "WordWrap": true
              },
              "TextQuality": "Wysiwyg",
              "Margins": {
                "Left": 2.0,
                "Right": 2.0,
                "Top": 2.0,
                "Bottom": 2.0
              },
              "Type": "Expression"
            },
            "2": {
              "Ident": "StiBarCode",
              "Name": "BarCode10",
              "Guid": "ad21e03e59b24735a5e137d5836e7cc6",
              "ClientRectangle": "160,0,230,120",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Border": ";;;;;;;solid:Black",
              "BackColor": "Transparent",
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "BarCodeType": {
                "Ident": "StiCodabarBarCodeType"
              },
              "Code": {
                "Value": "A12345678B"
              }
            }
          },
          "CountData": 1
        },
        "6": {
          "Ident": "StiDataBand",
          "Name": "DataBand16",
          "Guid": "9238125f22c14ed0b86e5f44aa56bc36",
          "ClientRectangle": "0,1080,749,100",
          "ComponentStyle": "Data1",
          "Interaction": {
            "Ident": "StiBandInteraction"
          },
          "Border": ";182,182,182;;;;;;solid:Black",
          "Brush": "solid:",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Text18",
              "Guid": "ec1e46f4a7d74034804dd13cd404142b",
              "CanGrow": true,
              "GrowToHeight": true,
              "ClientRectangle": "0,0,160,100",
              "ComponentStyle": "Header4",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Code 11"
              },
              "VertAlignment": "Center",
              "Font": "Segoe UI;12;;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:Black",
              "Margins": {
                "Left": 3.0,
                "Right": 0.0,
                "Top": 0.0,
                "Bottom": 0.0
              },
              "Type": "Expression"
            },
            "1": {
              "Ident": "StiText",
              "Name": "Text19",
              "Guid": "6aa7b8d5c72e4cdbb303b3cec8c2eb53",
              "CanGrow": true,
              "GrowToHeight": true,
              "ClientRectangle": "390,0,359,100",
              "ComponentStyle": "Data1",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "The Code 11 bar-code weas developed by Intermec in 1977. It is used in telecommunications. This barcode has high density and can encode any length string consisting of the digits 0-9 and the dash character. The Code 11 uses one or two check digits and two check symbols. Usually, if the length of the string is less than 10 symbols then only one check symbol is used. If the the length of the string is 10 symbols and more then 2 check symbols are used. The value of the check symbol is calculated by the modulo-10 algorithm."
              },
              "HorAlignment": "Width",
              "Font": "Segoe UI;9.75;;",
              "Border": ";182,182,182;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:74,74,74",
              "TextOptions": {
                "WordWrap": true
              },
              "TextQuality": "Wysiwyg",
              "Margins": {
                "Left": 2.0,
                "Right": 2.0,
                "Top": 2.0,
                "Bottom": 2.0
              },
              "Type": "Expression"
            },
            "2": {
              "Ident": "StiBarCode",
              "Name": "BarCode15",
              "Guid": "ba27c091963044e29a22fa9a28a5b924",
              "GrowToHeight": true,
              "ClientRectangle": "160,0,230,90",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Border": ";;;;;;;solid:Black",
              "BackColor": "Transparent",
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "BarCodeType": {
                "Ident": "StiCode11BarCodeType",
                "Module": 13.0
              },
              "Code": {
                "Value": "A12345678B"
              }
            }
          },
          "CountData": 1
        },
        "7": {
          "Ident": "StiDataBand",
          "Name": "DataBand17",
          "Guid": "603943bb317e43bca41d4a271db0b3d8",
          "ClientRectangle": "0,1220,749,90",
          "ComponentStyle": "Data2",
          "Interaction": {
            "Ident": "StiBandInteraction"
          },
          "Border": ";255,255,255;;;;;;solid:Black",
          "Brush": "solid:224,242,241",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Text20",
              "Guid": "965cc19fe91441aa9696b15889f92a53",
              "CanGrow": true,
              "GrowToHeight": true,
              "ClientRectangle": "0,0,160,90",
              "ComponentStyle": "Header4",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Pharmacode"
              },
              "VertAlignment": "Center",
              "Font": "Segoe UI;12;;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:Black",
              "Margins": {
                "Left": 3.0,
                "Right": 0.0,
                "Top": 0.0,
                "Bottom": 0.0
              },
              "Type": "Expression"
            },
            "1": {
              "Ident": "StiText",
              "Name": "Text67",
              "Guid": "7e04e173295e4500916a8bf46c0d97af",
              "CanGrow": true,
              "GrowToHeight": true,
              "ClientRectangle": "390,0,359,90",
              "ComponentStyle": "Data1",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "A Pharmacode barcode is used in the pharmaceutical industry as a packing control system. The Pharmacode barcode is placed on the package. A Pharmacode barcode can represent only a single integer from 3 to 131070. All digits in the specified range make correct barcodes, but some of these barcodes can be unreadable because all barcodes are identical."
              },
              "HorAlignment": "Width",
              "Font": "Segoe UI;9.75;;",
              "Border": ";182,182,182;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:74,74,74",
              "TextOptions": {
                "WordWrap": true
              },
              "TextQuality": "Wysiwyg",
              "Margins": {
                "Left": 2.0,
                "Right": 2.0,
                "Top": 2.0,
                "Bottom": 2.0
              },
              "Type": "Expression"
            },
            "2": {
              "Ident": "StiBarCode",
              "Name": "BarCode16",
              "Guid": "bf2b06367dbb489ab8f5d636424eb954",
              "GrowToHeight": true,
              "ClientRectangle": "160,0,230,90",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Border": ";;;;;;;solid:Black",
              "BackColor": "Transparent",
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "BarCodeType": {
                "Ident": "StiPharmacodeBarCodeType"
              },
              "Code": {
                "Value": "1256"
              }
            }
          },
          "CountData": 1
        }
      },
      "PrintOnPreviousPage": true,
      "PaperSize": "A4",
      "Watermark": {
        "TextBrush": "solid:50,0,0,0"
      }
    },
    "4": {
      "Ident": "StiPage",
      "Name": "Page5",
      "Guid": "16e115c651824fea94f8048a817ce120",
      "Interaction": {
        "Ident": "StiInteraction"
      },
      "Border": ";;2;;;;;solid:Black",
      "Brush": "solid:",
      "Components": {
        "0": {
          "Ident": "StiPageHeaderBand",
          "Name": "PageHeaderBand5",
          "Guid": "215256195c674eb38e3c1de31d368e7b",
          "ClientRectangle": "0,20,749,40",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Border": ";;;;;;;solid:Black",
          "Brush": "solid:",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Text86",
              "Guid": "660321c5d79148cdadfb40aea698db00",
              "ClientRectangle": "0,0,160,40",
              "ComponentStyle": "Header3",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Symbology"
              },
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "Font": "Segoe UI;12;Bold;",
              "Border": "Left, Right;White;;;;;;solid:Black",
              "Brush": "solid:77,182,172",
              "TextBrush": "solid:255,255,255",
              "Type": "Expression"
            },
            "1": {
              "Ident": "StiText",
              "Name": "Text87",
              "Guid": "78b1574963794112a4096a7cdb17f8c7",
              "ClientRectangle": "160,0,240,40",
              "ComponentStyle": "Header3",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Example"
              },
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "Font": "Segoe UI;12;Bold;",
              "Border": "Left, Right;White;;;;;;solid:Black",
              "Brush": "solid:77,182,172",
              "TextBrush": "solid:255,255,255",
              "Type": "Expression"
            },
            "2": {
              "Ident": "StiText",
              "Name": "Text88",
              "Guid": "4257f3feda25431e92e0cd52e05cacc1",
              "ClientRectangle": "390,0,359,40",
              "ComponentStyle": "Header3",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Description"
              },
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "Font": "Segoe UI;12;Bold;",
              "Border": "Left, Right;White;;;;;;solid:Black",
              "Brush": "solid:77,182,172",
              "TextBrush": "solid:255,255,255",
              "Type": "Expression"
            }
          }
        },
        "1": {
          "Ident": "StiDataBand",
          "Name": "DataBand20",
          "Guid": "ae785877419d419fb709527694faff29",
          "ClientRectangle": "0,100,749,120",
          "ComponentStyle": "Data2",
          "Interaction": {
            "Ident": "StiBandInteraction"
          },
          "Border": ";255,255,255;;;;;;solid:Black",
          "Brush": "solid:224,242,241",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Text37",
              "Guid": "7ef0e0b18ca048379dac503fb0b7875e",
              "CanGrow": true,
              "GrowToHeight": true,
              "ClientRectangle": "0,0,160,120",
              "ComponentStyle": "Header4",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Plessey"
              },
              "VertAlignment": "Center",
              "Font": "Segoe UI;12;;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:Black",
              "Margins": {
                "Left": 3.0,
                "Right": 0.0,
                "Top": 0.0,
                "Bottom": 0.0
              },
              "Type": "Expression"
            },
            "1": {
              "Ident": "StiText",
              "Name": "Text38",
              "Guid": "19e0c058dc714ce9939f0b14db612bff",
              "CanGrow": true,
              "GrowToHeight": true,
              "ClientRectangle": "390,0,359,120",
              "ComponentStyle": "Data1",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "A Plessey barcode was created by Plessey company in England on March 1971. The Plessey barcode is widely used in libraries, supermarkets, and production environments. A variant of the barcode known as Anker Code and appropriate scanners were provided by the ADS company. Encoding technology of the Plessey barcode was used by MSE Data Corporation. This company used it to create an MSI barcode that sometimes is called 'modified Plessey'. This bar-code is now obsolete and new scanners cannot read it."
              },
              "HorAlignment": "Width",
              "Font": "Segoe UI;9.75;;",
              "Border": ";182,182,182;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:74,74,74",
              "TextOptions": {
                "WordWrap": true
              },
              "TextQuality": "Wysiwyg",
              "Margins": {
                "Left": 2.0,
                "Right": 2.0,
                "Top": 2.0,
                "Bottom": 2.0
              },
              "Type": "Expression"
            },
            "2": {
              "Ident": "StiBarCode",
              "Name": "BarCode35",
              "Guid": "2759717accb34597b65f9fe8fa287d95",
              "ClientRectangle": "160,0,230,120",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Border": ";;;;;;;solid:Black",
              "BackColor": "Transparent",
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "BarCodeType": {
                "Ident": "StiPlesseyBarCodeType"
              },
              "Code": {
                "Value": "1234567"
              }
            }
          },
          "EvenStyle": "Data2",
          "CountData": 1
        },
        "2": {
          "Ident": "StiDataBand",
          "Name": "DataBand22",
          "Guid": "89719e9da6e344e09ef56569cea95b88",
          "ClientRectangle": "0,260,749,90",
          "ComponentStyle": "Data1",
          "Interaction": {
            "Ident": "StiBandInteraction"
          },
          "Border": ";182,182,182;;;;;;solid:Black",
          "Brush": "solid:",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Text7",
              "Guid": "758dbd235a3d446a93026c429107ffe2",
              "CanGrow": true,
              "GrowToHeight": true,
              "ClientRectangle": "0,0,160,90",
              "ComponentStyle": "Header4",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "2 of 5 Standard"
              },
              "VertAlignment": "Center",
              "Font": "Segoe UI;12;;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:Black",
              "Margins": {
                "Left": 3.0,
                "Right": 0.0,
                "Top": 0.0,
                "Bottom": 0.0
              },
              "Type": "Expression"
            },
            "1": {
              "Ident": "StiText",
              "Name": "Text71",
              "Guid": "0a8b2ab206ba4af99f80de575a855351",
              "CanGrow": true,
              "GrowToHeight": true,
              "ClientRectangle": "390,0,359,90",
              "ComponentStyle": "Data1",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "The 2of5 bar-code was developed 40 years ago. This is a low density variable length numeric. This barcode is used in manufacture and is known as Code 25, Code 25 Standard or Code 25 Industrial. It is very seldom used these days.\r\n"
              },
              "HorAlignment": "Width",
              "Font": "Segoe UI;9.75;;",
              "Border": ";182,182,182;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:74,74,74",
              "TextOptions": {
                "WordWrap": true
              },
              "TextQuality": "Wysiwyg",
              "Margins": {
                "Left": 2.0,
                "Right": 2.0,
                "Top": 2.0,
                "Bottom": 2.0
              },
              "Type": "Expression"
            },
            "2": {
              "Ident": "StiBarCode",
              "Name": "BarCode19",
              "Guid": "03d393b1ac1c4540902b9e02f17561d4",
              "GrowToHeight": true,
              "ClientRectangle": "160,0,230,90",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Border": ";;;;;;;solid:Black",
              "BackColor": "Transparent",
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "BarCodeType": {
                "Ident": "StiStandard2of5BarCodeType"
              },
              "Code": {
                "Value": "12345678"
              }
            }
          },
          "CountData": 1
        },
        "3": {
          "Ident": "StiDataBand",
          "Name": "DataBand23",
          "Guid": "dd197f53f8b045a2be488a9d824bb36d",
          "ClientRectangle": "0,390,749,90",
          "ComponentStyle": "Data2",
          "Interaction": {
            "Ident": "StiBandInteraction"
          },
          "Border": ";255,255,255;;;;;;solid:Black",
          "Brush": "solid:224,242,241",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Text5",
              "Guid": "7943804531f140c9bf889f6c7cecf781",
              "CanGrow": true,
              "GrowToHeight": true,
              "ClientRectangle": "0,0,160,90",
              "ComponentStyle": "Header4",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "2 of 5 Interleaved"
              },
              "VertAlignment": "Center",
              "Font": "Segoe UI;12;;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:Black",
              "Margins": {
                "Left": 3.0,
                "Right": 0.0,
                "Top": 0.0,
                "Bottom": 0.0
              },
              "Type": "Expression"
            },
            "1": {
              "Ident": "StiText",
              "Name": "Text72",
              "Guid": "5944b538ab3b4de29300ab07b29f4286",
              "CanGrow": true,
              "GrowToHeight": true,
              "ClientRectangle": "390,0,359,90",
              "ComponentStyle": "Data1",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "The 2of5 Interleaved barcode is a high density variable length numeric only symbology that encodes digit pairs in an interleaved manner. This bar-code is developed of the Code 25 Standard. It is usually used in the industrial."
              },
              "HorAlignment": "Width",
              "Font": "Segoe UI;9.75;;",
              "Border": ";182,182,182;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:74,74,74",
              "TextOptions": {
                "WordWrap": true
              },
              "TextQuality": "Wysiwyg",
              "Margins": {
                "Left": 2.0,
                "Right": 2.0,
                "Top": 2.0,
                "Bottom": 2.0
              },
              "Type": "Expression"
            },
            "2": {
              "Ident": "StiBarCode",
              "Name": "BarCode36",
              "Guid": "a93c3e0470a04488a571924a5f4b5891",
              "ClientRectangle": "160,0,230,90",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Border": ";;;;;;;solid:Black",
              "BackColor": "Transparent",
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "BarCodeType": {
                "Ident": "StiInterleaved2of5BarCodeType"
              },
              "Code": {
                "Value": "12345678"
              }
            }
          },
          "CountData": 1
        },
        "4": {
          "Ident": "StiDataBand",
          "Name": "DataBand24",
          "Guid": "841f2de519d74cd2b1df5f207a728b8d",
          "ClientRectangle": "0,520,749,90",
          "ComponentStyle": "Data1",
          "Interaction": {
            "Ident": "StiBandInteraction"
          },
          "Border": ";182,182,182;;;;;;solid:Black",
          "Brush": "solid:",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Text15",
              "Guid": "f4c758e9496942c8a12f6a6e7ff4385c",
              "CanGrow": true,
              "GrowToHeight": true,
              "ClientRectangle": "0,0,160,90",
              "ComponentStyle": "Header4",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Postnet"
              },
              "VertAlignment": "Center",
              "Font": "Segoe UI;12;;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:Black",
              "Margins": {
                "Left": 3.0,
                "Right": 0.0,
                "Top": 0.0,
                "Bottom": 0.0
              },
              "Type": "Expression"
            },
            "1": {
              "Ident": "StiText",
              "Name": "Text16",
              "Guid": "2b559654f04f444caea0922dd79f06aa",
              "CanGrow": true,
              "GrowToHeight": true,
              "ClientRectangle": "390,0,359,90",
              "ComponentStyle": "Data1",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "The POSTNET (POSTal Numeric Encoding Technique) bar-code was developed by the United States Postal Service for encoding ZIP-codes and correct sorting using BCSs. It can encode ZIP, ZIP+4, and ZIP+4+2 postal codes.\r\nThe Postnet bar-code can encode 0-9 digits. The bar-code consist of short and long bars. Each symbol of data is encoded using five bars. This bar-code contains only one check symbol, that is calculated by the modulo-10 algorithm."
              },
              "HorAlignment": "Width",
              "Font": "Segoe UI;9.75;;",
              "Border": ";182,182,182;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:74,74,74",
              "TextOptions": {
                "WordWrap": true
              },
              "TextQuality": "Wysiwyg",
              "Margins": {
                "Left": 2.0,
                "Right": 2.0,
                "Top": 2.0,
                "Bottom": 2.0
              },
              "Type": "Expression"
            },
            "2": {
              "Ident": "StiBarCode",
              "Name": "BarCode12",
              "Guid": "8a98359428d7448e8f017158be20d98d",
              "GrowToHeight": true,
              "ClientRectangle": "160,0,230,90",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Border": ";;;;;;;solid:Black",
              "BackColor": "Transparent",
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "BarCodeType": {
                "Ident": "StiPostnetBarCodeType"
              },
              "Code": {
                "Value": "12345"
              }
            }
          },
          "EvenStyle": "Data2",
          "CountData": 1
        },
        "5": {
          "Ident": "StiDataBand",
          "Name": "DataBand25",
          "Guid": "e1af02337a9245278f0bbb90b774463c",
          "ClientRectangle": "0,650,749,90",
          "ComponentStyle": "Data2",
          "Interaction": {
            "Ident": "StiBandInteraction"
          },
          "Border": ";255,255,255;;;;;;solid:Black",
          "Brush": "solid:224,242,241",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Text73",
              "Guid": "f1d51150548e4a7e9fbbee88980bd454",
              "CanGrow": true,
              "GrowToHeight": true,
              "ClientRectangle": "0,0,160,90",
              "ComponentStyle": "Header4",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Australia Post 4 State"
              },
              "VertAlignment": "Center",
              "Font": "Segoe UI;12;;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:Black",
              "Margins": {
                "Left": 3.0,
                "Right": 0.0,
                "Top": 0.0,
                "Bottom": 0.0
              },
              "Type": "Expression"
            },
            "1": {
              "Ident": "StiText",
              "Name": "Text74",
              "Guid": "aae129812c8f417f89a25892fb8fb235",
              "CanGrow": true,
              "GrowToHeight": true,
              "ClientRectangle": "390,0,359,90",
              "ComponentStyle": "Data1",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "The Australia Post 4-Stage bar-code is used in Australia for the purposes of sorting and directing mail. The barcode consists of 4 elements (4 conditions), each has its own name, value. Each element consists of two bars and two spaces. Each barcode contains 4 check symbols, calculated by the ReedSolomon algorithm. The value of these symbols are usually printed after the text of the barcode."
              },
              "HorAlignment": "Width",
              "Font": "Segoe UI;9.75;;",
              "Border": ";182,182,182;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:74,74,74",
              "TextOptions": {
                "WordWrap": true
              },
              "TextQuality": "Wysiwyg",
              "Margins": {
                "Left": 2.0,
                "Right": 2.0,
                "Top": 2.0,
                "Bottom": 2.0
              },
              "Type": "Expression"
            },
            "2": {
              "Ident": "StiBarCode",
              "Name": "BarCode13",
              "Guid": "82d5b469bdb54e8a9cc0d61f51b08dd2",
              "GrowToHeight": true,
              "ClientRectangle": "160,0,230,90",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Border": ";;;;;;;solid:Black",
              "BackColor": "Transparent",
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "BarCodeType": {
                "Ident": "StiAustraliaPost4StateBarCodeType"
              },
              "Code": {
                "Value": "1139987520"
              }
            }
          },
          "CountData": 1
        },
        "6": {
          "Ident": "StiDataBand",
          "Name": "DataBand26",
          "Guid": "69d156a18d0d4ddba07b7aaf9c18da91",
          "ClientRectangle": "0,780,749,60",
          "ComponentStyle": "Data1",
          "Interaction": {
            "Ident": "StiBandInteraction"
          },
          "Border": ";182,182,182;;;;;;solid:Black",
          "Brush": "solid:",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Text23",
              "Guid": "095fcd018f0943f488d6d36f169bf4e4",
              "CanGrow": true,
              "GrowToHeight": true,
              "ClientRectangle": "0,0,160,60",
              "ComponentStyle": "Header4",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Royal Mail 4 State"
              },
              "VertAlignment": "Center",
              "Font": "Segoe UI;12;;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:Black",
              "Margins": {
                "Left": 3.0,
                "Right": 0.0,
                "Top": 0.0,
                "Bottom": 0.0
              },
              "Type": "Expression"
            },
            "1": {
              "Ident": "StiText",
              "Name": "Text28",
              "Guid": "325b5bbb22114694918b86103dc8164d",
              "CanGrow": true,
              "GrowToHeight": true,
              "ClientRectangle": "390,0,359,60",
              "ComponentStyle": "Data1",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "The Royal Mail 4-state Customer Code(RM4SCC) is a height-modulated barcode symbology for use in automated mail sort process."
              },
              "HorAlignment": "Width",
              "Font": "Segoe UI;9.75;;",
              "Border": ";182,182,182;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:74,74,74",
              "TextOptions": {
                "WordWrap": true
              },
              "TextQuality": "Wysiwyg",
              "Margins": {
                "Left": 2.0,
                "Right": 2.0,
                "Top": 2.0,
                "Bottom": 2.0
              },
              "Type": "Expression"
            },
            "2": {
              "Ident": "StiBarCode",
              "Name": "BarCode22",
              "Guid": "5818f9d2128f42ffae5dfaf429fbe403",
              "ClientRectangle": "160,0,230,60",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Border": ";;;;;;;solid:Black",
              "BackColor": "Transparent",
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "BarCodeType": {
                "Ident": "StiRoyalMail4StateBarCodeType"
              },
              "Code": {
                "Value": "529508A"
              }
            }
          },
          "EvenStyle": "Data2",
          "CountData": 1
        },
        "7": {
          "Ident": "StiDataBand",
          "Name": "DataBand27",
          "Guid": "7b241e36bfcf43fd96ed1a632bb50ad7",
          "ClientRectangle": "0,880,749,70",
          "ComponentStyle": "Data2",
          "Interaction": {
            "Ident": "StiBandInteraction"
          },
          "Border": ";255,255,255;;;;;;solid:Black",
          "Brush": "solid:224,242,241",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Text31",
              "Guid": "56ab1cde8fa84293bfaa11e2e2625b7c",
              "CanGrow": true,
              "GrowToHeight": true,
              "ClientRectangle": "0,0,160,70",
              "ComponentStyle": "Header4",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Royal TPG Post KIX 4-State"
              },
              "VertAlignment": "Center",
              "Font": "Segoe UI;12;;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:Black",
              "TextOptions": {
                "WordWrap": true
              },
              "Margins": {
                "Left": 3.0,
                "Right": 0.0,
                "Top": 0.0,
                "Bottom": 0.0
              },
              "Type": "Expression"
            },
            "1": {
              "Ident": "StiText",
              "Name": "Text75",
              "Guid": "0073a05b78e643d4ab7ac8f5de56ace9",
              "CanGrow": true,
              "GrowToHeight": true,
              "ClientRectangle": "390,0,359,70",
              "ComponentStyle": "Data1",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "This symbology is used by Royal Dutch TPG Post (Netherlands) for Postal code and automatic mail sorting. It provides information about the address of the receiver. This symbology encodes alpha-numeric characters (0-9, A-Z)."
              },
              "HorAlignment": "Width",
              "Font": "Segoe UI;9.75;;",
              "Border": ";182,182,182;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:74,74,74",
              "TextOptions": {
                "WordWrap": true
              },
              "TextQuality": "Wysiwyg",
              "Margins": {
                "Left": 2.0,
                "Right": 2.0,
                "Top": 2.0,
                "Bottom": 2.0
              },
              "Type": "Expression"
            },
            "2": {
              "Ident": "StiBarCode",
              "Name": "BarCode27",
              "Guid": "e4eec973a9e5418da36199b68290c943",
              "GrowToHeight": true,
              "ClientRectangle": "160,0,240,70",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Border": ";;;;;;;solid:Black",
              "BackColor": "Transparent",
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "BarCodeType": {
                "Ident": "StiDutchKIXBarCodeType"
              },
              "Code": {
                "Value": "2500GG30250"
              }
            }
          },
          "CountData": 1
        }
      },
      "PrintOnPreviousPage": true,
      "PaperSize": "A4",
      "Watermark": {
        "TextBrush": "solid:50,0,0,0"
      }
    },
    "5": {
      "Ident": "StiPage",
      "Name": "Page6",
      "Guid": "f65f9f514c204fa79ba3cfea5436fbb0",
      "Interaction": {
        "Ident": "StiInteraction"
      },
      "Border": ";;2;;;;;solid:Black",
      "Brush": "solid:",
      "Components": {
        "0": {
          "Ident": "StiPageHeaderBand",
          "Name": "PageHeaderBand6",
          "Guid": "d36661fbc8074e12a5c513047072f7b0",
          "ClientRectangle": "0,20,749,40",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Border": ";;;;;;;solid:Black",
          "Brush": "solid:",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Text97",
              "Guid": "9553cd1acd2044c194c17b81e68f802a",
              "ClientRectangle": "0,0,160,40",
              "ComponentStyle": "Header3",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Symbology"
              },
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "Font": "Segoe UI;12;Bold;",
              "Border": "Left, Right;White;;;;;;solid:Black",
              "Brush": "solid:77,182,172",
              "TextBrush": "solid:255,255,255",
              "Type": "Expression"
            },
            "1": {
              "Ident": "StiText",
              "Name": "Text98",
              "Guid": "8bec893ed7f04ae79dd6b5c4bf6afa18",
              "ClientRectangle": "160,0,240,40",
              "ComponentStyle": "Header3",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Example"
              },
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "Font": "Segoe UI;12;Bold;",
              "Border": "Left, Right;White;;;;;;solid:Black",
              "Brush": "solid:77,182,172",
              "TextBrush": "solid:255,255,255",
              "Type": "Expression"
            },
            "2": {
              "Ident": "StiText",
              "Name": "Text99",
              "Guid": "8c7fd4626d8a4a91af277ca4de85d614",
              "ClientRectangle": "390,0,359,40",
              "ComponentStyle": "Header3",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Description"
              },
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "Font": "Segoe UI;12;Bold;",
              "Border": "Left, Right;White;;;;;;solid:Black",
              "Brush": "solid:77,182,172",
              "TextBrush": "solid:255,255,255",
              "Type": "Expression"
            }
          }
        },
        "1": {
          "Ident": "StiDataBand",
          "Name": "DataBand28",
          "Guid": "acf88a5c095f4721a4a0b15ce2f36253",
          "ClientRectangle": "0,100,749,70",
          "ComponentStyle": "Data2",
          "Interaction": {
            "Ident": "StiBandInteraction"
          },
          "Border": ";255,255,255;;;;;;solid:Black",
          "Brush": "solid:224,242,241",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Text44",
              "Guid": "46ecb6d582ff4e929486d86800766221",
              "CanGrow": true,
              "GrowToHeight": true,
              "ClientRectangle": "0,0,160,70",
              "ComponentStyle": "Header4",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "ITF 14"
              },
              "VertAlignment": "Center",
              "Font": "Segoe UI;12;;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:Black",
              "Margins": {
                "Left": 3.0,
                "Right": 0.0,
                "Top": 0.0,
                "Bottom": 0.0
              },
              "Type": "Expression"
            },
            "1": {
              "Ident": "StiText",
              "Name": "Text76",
              "Guid": "4052259fb28b4e8db90e1a79558982f4",
              "CanGrow": true,
              "GrowToHeight": true,
              "ClientRectangle": "390,0,359,70",
              "ComponentStyle": "Data1",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "The ITF-14 bar-code was developed to encode a Global Trade Item Number. The ITF bar-code has the nominal size of  (152*44mm) and low requirements to the printing surface. Therefore, it can be printed not only on a label but directly onto a packing carton."
              },
              "HorAlignment": "Width",
              "Font": "Segoe UI;9.75;;",
              "Border": ";182,182,182;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:74,74,74",
              "TextOptions": {
                "WordWrap": true
              },
              "TextQuality": "Wysiwyg",
              "Margins": {
                "Left": 2.0,
                "Right": 2.0,
                "Top": 2.0,
                "Bottom": 2.0
              },
              "Type": "Expression"
            },
            "2": {
              "Ident": "StiBarCode",
              "Name": "BarCode30",
              "Guid": "ff17703a64744368a15e272e872baa5c",
              "GrowToHeight": true,
              "ClientRectangle": "160,0,230,70",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Border": ";;;;;;;solid:Black",
              "BackColor": "Transparent",
              "HorAlignment": "Center",
              "VertAlignment": "Bottom",
              "BarCodeType": {
                "Ident": "StiITF14BarCodeType",
                "Module": 12.0
              },
              "Code": {
                "Value": "15400141288763"
              }
            }
          },
          "EvenStyle": "Data2",
          "CountData": 1
        },
        "2": {
          "Ident": "StiDataBand",
          "Name": "DataBand29",
          "Guid": "0fe8dd58f6e04b16b35a97c76b7f59a6",
          "ClientRectangle": "0,210,749,310",
          "ComponentStyle": "Data1",
          "Interaction": {
            "Ident": "StiBandInteraction"
          },
          "Border": ";182,182,182;;;;;;solid:Black",
          "Brush": "solid:",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Text29",
              "Guid": "65b777f5ddbe4f588ce82d837230527f",
              "CanGrow": true,
              "ClientRectangle": "0,0,160,80",
              "ComponentStyle": "Header4",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "FIM A"
              },
              "VertAlignment": "Center",
              "Font": "Segoe UI;12;;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:Black",
              "Margins": {
                "Left": 3.0,
                "Right": 0.0,
                "Top": 0.0,
                "Bottom": 0.0
              },
              "Type": "Expression"
            },
            "1": {
              "Ident": "StiText",
              "Name": "Text89",
              "Guid": "b2ed825e58ed4b118348fc5b6b049284",
              "CanGrow": true,
              "ClientRectangle": "390,0,359,310",
              "ComponentStyle": "Data1",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Facing Identification Mark (FIM) is the type of postal bar code used in automated mail processing by the U.S. Postal Service. FIM is a set of vertical bars. FIM patterns are placed in the upper right corner along the top edge and two inches in from the right edge of letters and cards."
              },
              "HorAlignment": "Width",
              "Font": "Segoe UI;9.75;;",
              "Border": ";182,182,182;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:74,74,74",
              "TextOptions": {
                "WordWrap": true
              },
              "TextQuality": "Wysiwyg",
              "Margins": {
                "Left": 2.0,
                "Right": 2.0,
                "Top": 2.0,
                "Bottom": 2.0
              },
              "Type": "Expression"
            },
            "2": {
              "Ident": "StiText",
              "Name": "Text90",
              "Guid": "835f48a12f2e45c699b518573292dd47",
              "CanGrow": true,
              "ClientRectangle": "0,80,160,80",
              "ComponentStyle": "Header4",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "FIM B"
              },
              "VertAlignment": "Center",
              "Font": "Segoe UI;12;;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:Black",
              "Margins": {
                "Left": 3.0,
                "Right": 0.0,
                "Top": 0.0,
                "Bottom": 0.0
              },
              "Type": "Expression"
            },
            "3": {
              "Ident": "StiText",
              "Name": "Text91",
              "Guid": "c18dc15ef1524f4d86167fb0098a3598",
              "CanGrow": true,
              "ClientRectangle": "0,160,160,80",
              "ComponentStyle": "Header4",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "FIM C"
              },
              "VertAlignment": "Center",
              "Font": "Segoe UI;12;;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:Black",
              "Margins": {
                "Left": 3.0,
                "Right": 0.0,
                "Top": 0.0,
                "Bottom": 0.0
              },
              "Type": "Expression"
            },
            "4": {
              "Ident": "StiBarCode",
              "Name": "BarCode28",
              "Guid": "33cbc93185fb435fae29cc4cb8919f28",
              "ClientRectangle": "240,0,70,80",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Border": ";;;;;;;solid:Black",
              "BackColor": "Transparent",
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "BarCodeType": {
                "Ident": "StiFIMBarCodeType"
              },
              "Code": {
                "Value": "A"
              }
            },
            "5": {
              "Ident": "StiBarCode",
              "Name": "BarCode37",
              "Guid": "9917aab45260437793d2dd4f94536c35",
              "ClientRectangle": "240,80,70,80",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Border": ";;;;;;;solid:Black",
              "BackColor": "Transparent",
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "BarCodeType": {
                "Ident": "StiFIMBarCodeType"
              },
              "Code": {
                "Value": "B"
              }
            },
            "6": {
              "Ident": "StiBarCode",
              "Name": "BarCode39",
              "Guid": "5194d51f9cd14918b190ff4f0eda6c09",
              "ClientRectangle": "240,160,70,80",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Border": ";;;;;;;solid:Black",
              "BackColor": "Transparent",
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "BarCodeType": {
                "Ident": "StiFIMBarCodeType"
              },
              "Code": {
                "Value": "C"
              }
            },
            "7": {
              "Ident": "StiBarCode",
              "Name": "BarCode40",
              "Guid": "921dc2e5c3b34fd98870d46113e285de",
              "ClientRectangle": "240,240,70,70",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Border": ";;;;;;;solid:Black",
              "BackColor": "Transparent",
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "BarCodeType": {
                "Ident": "StiFIMBarCodeType"
              },
              "Code": {
                "Value": "D"
              }
            },
            "8": {
              "Ident": "StiText",
              "Name": "Text92",
              "Guid": "b2403492e0094930a4db1b381eaaf961",
              "CanGrow": true,
              "ClientRectangle": "0,240,160,70",
              "ComponentStyle": "Header4",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "FIM D"
              },
              "VertAlignment": "Center",
              "Font": "Segoe UI;12;;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:Black",
              "Margins": {
                "Left": 3.0,
                "Right": 0.0,
                "Top": 0.0,
                "Bottom": 0.0
              },
              "Type": "Expression"
            }
          },
          "EvenStyle": "Data2",
          "CountData": 1
        },
        "3": {
          "Ident": "StiDataBand",
          "Name": "DataBand30",
          "Guid": "160099c38d2b4cdcab1053180546afa7",
          "ClientRectangle": "0,560,749,90",
          "ComponentStyle": "Data2",
          "Interaction": {
            "Ident": "StiBandInteraction"
          },
          "Border": ";255,255,255;;;;;;solid:Black",
          "Brush": "solid:224,242,241",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Text26",
              "Guid": "dc63235c06bf43e4a92e9a7ca3aa6358",
              "CanGrow": true,
              "GrowToHeight": true,
              "ClientRectangle": "0,0,160,90",
              "ComponentStyle": "Header4",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "DataMatrix"
              },
              "VertAlignment": "Center",
              "Font": "Segoe UI;12;;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:Black",
              "Margins": {
                "Left": 3.0,
                "Right": 0.0,
                "Top": 0.0,
                "Bottom": 0.0
              },
              "Type": "Expression"
            },
            "1": {
              "Ident": "StiText",
              "Name": "Text27",
              "Guid": "e178c89ab6b24c9dbb876054288f09a3",
              "CanGrow": true,
              "GrowToHeight": true,
              "ClientRectangle": "390,0,359,90",
              "ComponentStyle": "Data1",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "The DataMatrix barcode was created by the CiMatrix company. Every DataMatrix is composed of two solid adjacent borders in an \"L\" shape (called the \"finder pattern\") and two other borders consisting of alternating dark and light \"cells\" or modules (called the \"timing pattern\"). Symbol sizes vary from 8×8 to 144×144. The DataMatrix is used to mark small products. Data Matrix symbols are rectangular in shape and usually square, they are made of cells: little elements that represent individual bits."
              },
              "HorAlignment": "Width",
              "Font": "Segoe UI;9.75;;",
              "Border": ";182,182,182;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:74,74,74",
              "TextOptions": {
                "WordWrap": true
              },
              "TextQuality": "Wysiwyg",
              "Margins": {
                "Left": 2.0,
                "Right": 2.0,
                "Top": 2.0,
                "Bottom": 2.0
              },
              "Type": "Expression"
            },
            "2": {
              "Ident": "StiBarCode",
              "Name": "BarCode25",
              "Guid": "1482768564d046a3930cc1413313cd29",
              "GrowToHeight": true,
              "ClientRectangle": "160,0,230,90",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Border": ";;;;;;;solid:Black",
              "BackColor": "Transparent",
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "BarCodeType": {
                "Ident": "StiDataMatrixBarCodeType"
              },
              "Code": {
                "Value": "12345678901"
              }
            }
          },
          "CountData": 1
        },
        "4": {
          "Ident": "StiDataBand",
          "Name": "DataBand31",
          "Guid": "a5dafd06c3df44668daf23cb731eb640",
          "ClientRectangle": "0,690,749,130",
          "ComponentStyle": "Data1",
          "Interaction": {
            "Ident": "StiBandInteraction"
          },
          "Border": ";182,182,182;;;;;;solid:Black",
          "Brush": "solid:",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Text33",
              "Guid": "80dfe58c145442a89868ca30d813afe3",
              "CanGrow": true,
              "GrowToHeight": true,
              "ClientRectangle": "0,0,160,130",
              "ComponentStyle": "Header4",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "PDF417"
              },
              "VertAlignment": "Center",
              "Font": "Segoe UI;12;;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:Black",
              "Margins": {
                "Left": 3.0,
                "Right": 0.0,
                "Top": 0.0,
                "Bottom": 0.0
              },
              "Type": "Expression"
            },
            "1": {
              "Ident": "StiText",
              "Name": "Text34",
              "Guid": "53933e99fd654449bd06a0697d0bc0bb",
              "CanGrow": true,
              "GrowToHeight": true,
              "ClientRectangle": "390,0,359,130",
              "ComponentStyle": "Data1",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "The PDF417 barcode was developed by Symbol Technologies in 1991. The name of the barcode consist of 2 parts. The PDF comes from Portable Data File. The 417 comes from the structure of the bar-code: each bar-code character consists of 17 modules, each of which consists of 4 bars and 1 space. PDF417 is a high density 2 dimensional bar code symbology that consists of a stacked set of smaller bar codes. Any ASCII characters can be encoded in this bar-code. The length of data depends on the encoding mode and can reach 1100 bytes, or 1800 text characters, or 2600 digits."
              },
              "HorAlignment": "Width",
              "Font": "Segoe UI;9.75;;",
              "Border": ";182,182,182;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:74,74,74",
              "TextOptions": {
                "WordWrap": true
              },
              "TextQuality": "Wysiwyg",
              "Margins": {
                "Left": 2.0,
                "Right": 2.0,
                "Top": 2.0,
                "Bottom": 2.0
              },
              "Type": "Expression"
            },
            "2": {
              "Ident": "StiBarCode",
              "Name": "BarCode26",
              "Guid": "1e0d2d7e06244e298c75dae34a31e07e",
              "GrowToHeight": true,
              "ClientRectangle": "160,0,230,130",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Border": ";;;;;;;solid:Black",
              "BackColor": "Transparent",
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "BarCodeType": {
                "Ident": "StiPdf417BarCodeType",
                "Module": 25.0,
                "DataColumns": 5,
                "DataRows": 3,
                "AspectRatio": 1.0
              },
              "Code": {
                "Value": "12345678901"
              }
            }
          },
          "CountData": 1
        },
        "5": {
          "Ident": "StiDataBand",
          "Name": "DataBand32",
          "Guid": "71a407f056424b43b41643984c184b3a",
          "ClientRectangle": "0,860,749,240",
          "ComponentStyle": "Data2",
          "Interaction": {
            "Ident": "StiBandInteraction"
          },
          "Border": ";255,255,255;;;;;;solid:Black",
          "Brush": "solid:224,242,241",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Text93",
              "Guid": "ee52280596f24865ad72edd8018cd7d0",
              "CanGrow": true,
              "GrowToHeight": true,
              "ClientRectangle": "0,0,160,240",
              "ComponentStyle": "Header4",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "QR Code"
              },
              "VertAlignment": "Center",
              "Font": "Segoe UI;12;;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:Black",
              "Margins": {
                "Left": 3.0,
                "Right": 0.0,
                "Top": 0.0,
                "Bottom": 0.0
              },
              "Type": "Expression"
            },
            "1": {
              "Ident": "StiText",
              "Name": "Text94",
              "Guid": "1c554f2e9df34d72884ef1e2cdfa4d7f",
              "CanGrow": true,
              "ClientRectangle": "390,0,359,100",
              "ComponentStyle": "Data1",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "A QR Code (QR is the abbreviation for Quick Response) is a two-dimensional code, readable by QR scanners, mobile phones with a camera, and smartphones. It was created by Toyota subsidiary Denso-Wave in 1994."
              },
              "HorAlignment": "Width",
              "VertAlignment": "Center",
              "Font": "Segoe UI;9.75;;",
              "Border": ";182,182,182;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:74,74,74",
              "TextOptions": {
                "WordWrap": true
              },
              "TextQuality": "Wysiwyg",
              "Margins": {
                "Left": 2.0,
                "Right": 2.0,
                "Top": 2.0,
                "Bottom": 2.0
              },
              "Type": "Expression"
            },
            "2": {
              "Ident": "StiBarCode",
              "Name": "BarCode32",
              "Guid": "75cf66cfaddc43ef903b89ba6fb22d54",
              "ClientRectangle": "160,0,230,100",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Border": ";;;;;;;solid:Black",
              "BackColor": "Transparent",
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "BarCodeType": {
                "Ident": "StiQRCodeBarCodeType"
              },
              "Code": {
                "Value": "12345678901"
              }
            },
            "3": {
              "Ident": "StiBarCode",
              "Name": "BarCode23",
              "Guid": "252ead97686f46608029b4e0f619da03",
              "ClientRectangle": "160,100,230,140",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Border": ";;;;;;;solid:Black",
              "BackColor": "Transparent",
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "BarCodeType": {
                "Ident": "StiQRCodeBarCodeType",
                "ErrorCorrectionLevel": "Level3",
                "ImageMultipleFactor": 0.45,
                "Image": "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"
              },
              "Code": {
                "Value": "http://www.stimulsoft.com"
              }
            },
            "4": {
              "Ident": "StiText",
              "Name": "Text100",
              "Guid": "ed58f4434a464601ad6ce6033c244965",
              "CanGrow": true,
              "GrowToHeight": true,
              "ClientRectangle": "390,100,359,140",
              "ComponentStyle": "Data1",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Due to error correction, it is possible to create artistic QR codes that still scan correctly, but contain intentional errors to make them more readable or attractive to the human eye, as well as to incorporate colors, logos, and other features into the QR code block."
              },
              "HorAlignment": "Width",
              "VertAlignment": "Center",
              "Font": "Segoe UI;9.75;;",
              "Border": ";182,182,182;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:74,74,74",
              "TextOptions": {
                "WordWrap": true
              },
              "TextQuality": "Wysiwyg",
              "Margins": {
                "Left": 2.0,
                "Right": 2.0,
                "Top": 2.0,
                "Bottom": 2.0
              },
              "Type": "Expression"
            }
          },
          "CountData": 1
        }
      },
      "PrintOnPreviousPage": true,
      "PaperSize": "A4",
      "Watermark": {
        "TextBrush": "solid:50,0,0,0"
      }
    }
  }
}