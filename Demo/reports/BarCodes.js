var BarCodes = {
  "ReportVersion": "2019.1.1.0",
  "ReportGuid": "478ec70738224fffa8dd4ca83e381822",
  "ReportName": "Report",
  "ReportAlias": "BarCodes",
  "ReportAuthor": "Stimulsoft",
  "ReportDescription": "This sample demonstrates how to create a report with Barcodes.",
  "ReportCreated": "/Date(1085828340000+0000)/",
  "ReportChanged": "/Date(1522751294000+0000)/",
  "EngineVersion": "EngineV2",
  "CalculationMode": "Interpretation",
  "Script": "using System;\r\nusing System.Drawing;\r\nusing System.Windows.Forms;\r\nusing System.Data;\r\nusing Stimulsoft.Report;\r\nusing Stimulsoft.Report.Components;\r\nusing Stimulsoft.Base.Drawing;\r\n\r\nnamespace StiReports\r\n{\r\n    \r\n    public class Report : Stimulsoft.Report.StiReport\r\n    {\r\n            \r\n        public Report()\r\n        {\r\n            this.InitializeComponent();\r\n        }\r\n        \r\n        #region StiReport Designer generated code - do not modify\r\n\t\t#endregion StiReport Designer generated code - do not modify\r\n\t}\r\n}",
  "Styles": {
    "0": {
      "Ident": "StiStyle",
      "CollectionName": "Style",
      "Name": "Title1",
      "HorAlignment": "Right",
      "VertAlignment": "Center",
      "Font": ";19;;",
      "Border": ";0,0,0,0;;;;;;solid:Black",
      "Brush": "solid:96,125,139",
      "TextBrush": "solid:255,255,255",
      "NegativeTextBrush": "solid:Red",
      "AllowUseBorderFormatting": false,
      "AllowUseBorderSides": false
    },
    "1": {
      "Ident": "StiStyle",
      "CollectionName": "Style",
      "Name": "Title2",
      "VertAlignment": "Center",
      "Font": ";9;;",
      "Border": ";0,0,0;;;;;;solid:Black",
      "Brush": "solid:0,0,0,0",
      "TextBrush": "solid:69,90,100",
      "NegativeTextBrush": "solid:Red",
      "AllowUseBorderFormatting": false,
      "AllowUseBorderSides": false
    },
    "2": {
      "Ident": "StiStyle",
      "CollectionName": "Style",
      "Name": "Header1",
      "VertAlignment": "Center",
      "Font": ";19;;",
      "Border": ";0,0,0;;;;;;solid:Black",
      "Brush": "solid:",
      "TextBrush": "solid:0,0,0",
      "NegativeTextBrush": "solid:Red",
      "AllowUseBorderSides": false
    },
    "3": {
      "Ident": "StiStyle",
      "CollectionName": "Style",
      "Name": "Header2",
      "HorAlignment": "Center",
      "VertAlignment": "Center",
      "Font": ";14.25;Bold;",
      "Border": ";0,0,0;;;;;;solid:Black",
      "Brush": "solid:",
      "TextBrush": "solid:158,158,158",
      "NegativeTextBrush": "solid:Red",
      "AllowUseBorderSides": false
    },
    "4": {
      "Ident": "StiStyle",
      "CollectionName": "Style",
      "Name": "Header3",
      "HorAlignment": "Center",
      "VertAlignment": "Center",
      "Font": ";16;;",
      "Border": "All;182,182,182;;;;;;solid:Black",
      "Brush": "solid:77,182,172",
      "TextBrush": "solid:255,255,255",
      "NegativeTextBrush": "solid:Red",
      "AllowUseBorderSides": false
    },
    "5": {
      "Ident": "StiStyle",
      "Name": "Header4",
      "Font": ";12;;",
      "Border": ";;;;;;;solid:Black",
      "Brush": "solid:",
      "TextBrush": "solid:Black",
      "NegativeTextBrush": "solid:Red"
    },
    "6": {
      "Ident": "StiStyle",
      "CollectionName": "Style",
      "Name": "Data1",
      "VertAlignment": "Center",
      "Font": ";10;;",
      "Border": ";182,182,182;;;;;;solid:Black",
      "Brush": "solid:0,0,0,0",
      "TextBrush": "solid:74,74,74",
      "NegativeTextBrush": "solid:Red",
      "AllowUseBorderSides": false
    },
    "7": {
      "Ident": "StiStyle",
      "CollectionName": "Style",
      "Name": "Data2",
      "Font": ";9;;",
      "Border": ";255,255,255;;;;;;solid:Black",
      "Brush": "solid:224,242,241",
      "TextBrush": "solid:0,0,0",
      "NegativeTextBrush": "solid:Red",
      "AllowUseFont": false,
      "AllowUseBorderFormatting": false,
      "AllowUseBorderSides": false,
      "AllowUseTextBrush": false
    },
    "8": {
      "Ident": "StiStyle",
      "CollectionName": "Style",
      "Name": "Data3",
      "VertAlignment": "Center",
      "Font": ";9;;",
      "Border": ";255,255,255;;;;;;solid:Black",
      "Brush": "solid:224,242,241",
      "TextBrush": "solid:0,0,0",
      "NegativeTextBrush": "solid:Red",
      "AllowUseBorderSides": false
    },
    "9": {
      "Ident": "StiStyle",
      "CollectionName": "Style",
      "Name": "Footer1",
      "VertAlignment": "Center",
      "Font": ";9;;",
      "Border": "Top;0,0,0,0;;;;;;solid:Black",
      "Brush": "solid:255,224,178",
      "TextBrush": "solid:0,0,0",
      "NegativeTextBrush": "solid:Red",
      "AllowUseBorderSides": false
    },
    "10": {
      "Ident": "StiStyle",
      "CollectionName": "Style",
      "Name": "Footer2",
      "HorAlignment": "Right",
      "VertAlignment": "Center",
      "Font": ";10;Bold;",
      "Border": ";158,158,158;;;;;;solid:Black",
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
          "ClientRectangle": "0,0.4,19,2.6",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Border": ";;;;;;;solid:Black",
          "Brush": "solid:",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Text24",
              "Guid": "072efe39c33c489cbdff2778c66cf3a5",
              "CanGrow": true,
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "0,1.6,14.8,0.8",
              "ComponentStyle": "Title2",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "{ReportDescription}"
              },
              "VertAlignment": "Center",
              "Font": ";9;;",
              "Border": ";0,0,0;;;;;;solid:Black",
              "Brush": "solid:0,0,0,0",
              "TextBrush": "solid:69,90,100",
              "Type": "Expression"
            },
            "1": {
              "Ident": "StiText",
              "Name": "Text25",
              "Guid": "3d67ae00b78a4d1696a332a18fded809",
              "CanGrow": true,
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "14.4,1.6,4.6,0.8",
              "ComponentStyle": "Title2",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Date: {Today.ToString(\"Y\")}"
              },
              "HorAlignment": "Right",
              "VertAlignment": "Center",
              "Font": ";9;;",
              "Border": ";0,0,0;;;;;;solid:Black",
              "Brush": "solid:0,0,0,0",
              "TextBrush": "solid:69,90,100",
              "Type": "Expression"
            },
            "2": {
              "Ident": "StiText",
              "Name": "Text95",
              "Guid": "1ef0fc63c08d4050abd9a564688ef968",
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "0,0,19,1.6",
              "ComponentStyle": "Title1",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Stimulsoft"
              },
              "HorAlignment": "Right",
              "VertAlignment": "Center",
              "Font": ";19;;",
              "Border": ";Red;;;;;;solid:Black",
              "Brush": "solid:96,125,139",
              "TextBrush": "solid:255,255,255",
              "Margins": {
                "Left": 0.0,
                "Right": 10.0,
                "Top": 0.0,
                "Bottom": 0.0
              },
              "Type": "Expression"
            },
            "3": {
              "Ident": "StiText",
              "Name": "Text96",
              "Guid": "b805e7fee92e4698877f768b35644c16",
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "0.6,0.2,9.4,1",
              "ComponentStyle": "Title1",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "BarCodes"
              },
              "VertAlignment": "Center",
              "Font": ";19;;",
              "Border": "Left;178,223,219;5;;;;;solid:0,0,0",
              "Brush": "solid:96,125,139",
              "TextBrush": "solid:255,255,255",
              "Margins": {
                "Left": 10.0,
                "Right": 0.0,
                "Top": 0.0,
                "Bottom": 0.0
              },
              "Type": "Expression"
            }
          }
        },
        "1": {
          "Ident": "StiPageFooterBand",
          "Name": "PageFooterBand1",
          "ClientRectangle": "0,37.98,19,0.8",
          "ComponentStyle": "Footer2",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Border": "Top;158,158,158;;;;;;solid:Black",
          "Brush": "solid:"
        },
        "2": {
          "Ident": "StiPageHeaderBand",
          "Name": "PageHeaderBand1",
          "ClientRectangle": "0,3.8,19,1",
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
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "0,0,4,1",
              "ComponentStyle": "Header3",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Symbology"
              },
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "Font": ";16;;",
              "Border": ";182,182,182;;;;;;solid:Black",
              "Brush": "solid:77,182,172",
              "TextBrush": "solid:255,255,255",
              "Type": "Expression"
            },
            "1": {
              "Ident": "StiText",
              "Name": "Text47",
              "Guid": "9641c5f9d9ce42029fbb54f0673e9828",
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "4,0,6,1",
              "ComponentStyle": "Header3",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Example"
              },
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "Font": ";16;;",
              "Border": ";182,182,182;;;;;;solid:Black",
              "Brush": "solid:77,182,172",
              "TextBrush": "solid:255,255,255",
              "Type": "Expression"
            },
            "2": {
              "Ident": "StiText",
              "Name": "Text48",
              "Guid": "4226776896ca4742af2c4e08614e2083",
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "10,0,9,1",
              "ComponentStyle": "Header3",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Description"
              },
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "Font": ";16;;",
              "Border": ";182,182,182;;;;;;solid:Black",
              "Brush": "solid:77,182,172",
              "TextBrush": "solid:255,255,255",
              "Type": "Expression"
            }
          }
        },
        "3": {
          "Ident": "StiDataBand",
          "Name": "DataBand1",
          "ClientRectangle": "0,5.6,19,3.4",
          "ComponentStyle": "Data1",
          "Interaction": {
            "Ident": "StiBandInteraction"
          },
          "Border": ";182,182,182;;;;;;solid:Black",
          "Brush": "solid:0,0,0,0",
          "Components": {
            "0": {
              "Ident": "StiBarCode",
              "Name": "BarCode6",
              "Guid": "bc4b62b60fd94d2f82b49dca3a5b6254",
              "GrowToHeight": true,
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "4,0,6,3.4",
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
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "0,0,4,3.4",
              "ComponentStyle": "Header4",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Code 39"
              },
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "Font": ";12;;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:Black"
            },
            "2": {
              "Ident": "StiText",
              "Name": "Text45",
              "Guid": "52654d6220524cada1733f77eea274f8",
              "CanGrow": true,
              "GrowToHeight": true,
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "10,0,9,3.4",
              "ComponentStyle": "Data1",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Code 39 is a variable length symbology that can encode 44 characters. Code 39 is the most popular symbology in the non-retail world and is used extensively in manufacturing, military, and medicine applications. Each Code 39 bar code has a start/stop character represented by an asterisk (*).The bar-code code does not contain the check character but can be added programmatically. Each character starts with a 'dark bar' that consists of 5 dark and 4 blank bars. The ratio between narrow and wide bars may range from 2.2:1 to 3:1. The Code 39 barcode has low data density. It requires more free space than Code 128, but the Code 39 barcode can be identified by any barcode scanner.\r\n"
              },
              "HorAlignment": "Width",
              "Font": ";10;;",
              "Border": ";182,182,182;;;;;;solid:Black",
              "Brush": "solid:0,0,0,0",
              "TextBrush": "solid:74,74,74",
              "TextOptions": {
                "WordWrap": true
              },
              "TextQuality": "Wysiwyg",
              "Type": "Expression"
            }
          },
          "EvenStyle": "Data2",
          "CountData": 1
        },
        "4": {
          "Ident": "StiDataBand",
          "Name": "DataBand2",
          "Guid": "93d783f9448f48c38d7252becb993b0a",
          "ClientRectangle": "0,9.8,19,2.6",
          "ComponentStyle": "Data2",
          "Interaction": {
            "Ident": "StiBandInteraction"
          },
          "Border": ";193,152,89;;;;;;solid:Black",
          "Brush": "solid:224,242,241",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Text49",
              "Guid": "f68b33392e8b46df870e43a282c3ac39",
              "CanGrow": true,
              "GrowToHeight": true,
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "0,0,4,2.6",
              "ComponentStyle": "Header4",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Code 39 Extended"
              },
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "Font": ";12;;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:Black",
              "Type": "Expression"
            },
            "1": {
              "Ident": "StiText",
              "Name": "Text50",
              "Guid": "37a6066df6174b04a285d19a4c338d21",
              "CanGrow": true,
              "GrowToHeight": true,
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "10,0,9,2.6",
              "ComponentStyle": "Data1",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Code 39 extended is the version of the Code 39 bar-code which also supports the ASCII set of characters. The 0-9, A-Z, \".\" and \"-\" characters are encoded the same as of the Code 39 bar-code. "
              },
              "HorAlignment": "Width",
              "Font": ";10;;",
              "Border": ";182,182,182;;;;;;solid:Black",
              "Brush": "solid:0,0,0,0",
              "TextBrush": "solid:74,74,74",
              "TextOptions": {
                "WordWrap": true
              },
              "TextQuality": "Wysiwyg",
              "Type": "Expression"
            },
            "2": {
              "Ident": "StiBarCode",
              "Name": "BarCode44",
              "Guid": "45b3c03e14594bf9812d1fd0a76c265d",
              "GrowToHeight": true,
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "4,0,6,2.6",
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
          "EvenStyle": "Data2",
          "CountData": 1
        },
        "5": {
          "Ident": "StiDataBand",
          "Name": "DataBand3",
          "Guid": "5d1e47b8e250498ba09aebdcc1792276",
          "ClientRectangle": "0,13.2,19,3.4",
          "ComponentStyle": "Data1",
          "Interaction": {
            "Ident": "StiBandInteraction"
          },
          "Border": ";182,182,182;;;;;;solid:Black",
          "Brush": "solid:0,0,0,0",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Text51",
              "Guid": "a5bd5688647243629518657d029d6984",
              "CanGrow": true,
              "GrowToHeight": true,
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "0,0,4,3.4",
              "ComponentStyle": "Header4",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Code 93"
              },
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "Font": ";12;;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:Black",
              "Type": "Expression"
            },
            "1": {
              "Ident": "StiText",
              "Name": "Text52",
              "Guid": "4c5c487ef4134a88b9ec203c2b15668d",
              "CanGrow": true,
              "GrowToHeight": true,
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "10,0,9,3.4",
              "ComponentStyle": "Data1",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "The Code 93 is a variable length symbology that can encode the complete 128 ASCII character set. This barcode was developed as an enhanced version of the Code 39 barcode. It has a higher density than either the Code 39 or the Code 128 bar-code. The Code 93 barcode may encode Latin letters (from A to Z), digits (from 0 to 9) and a group of special characters. The barcode always contains two check characters. Each characters consist of nine modules which are joined in 3 groups. Each group has one black bar and one white bar."
              },
              "HorAlignment": "Width",
              "Font": ";10;;",
              "Border": ";182,182,182;;;;;;solid:Black",
              "Brush": "solid:0,0,0,0",
              "TextBrush": "solid:74,74,74",
              "TextOptions": {
                "WordWrap": true
              },
              "TextQuality": "Wysiwyg",
              "Type": "Expression"
            },
            "2": {
              "Ident": "StiBarCode",
              "Name": "BarCode14",
              "Guid": "cc377af3cc2043debf108abec942fa3a",
              "GrowToHeight": true,
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "4,0,6,3.4",
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
          "EvenStyle": "Data2",
          "CountData": 1
        },
        "6": {
          "Ident": "StiDataBand",
          "Name": "DataBand4",
          "Guid": "6d40bdc4c5244b48b3657bfae8913433",
          "ClientRectangle": "0,17.4,19,2.6",
          "ComponentStyle": "Data2",
          "Interaction": {
            "Ident": "StiBandInteraction"
          },
          "Border": ";193,152,89;;;;;;solid:Black",
          "Brush": "solid:224,242,241",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Text17",
              "Guid": "b1f006ed9c7d46ce96a9038988f86f55",
              "CanGrow": true,
              "GrowToHeight": true,
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "0,0,4,2.6",
              "ComponentStyle": "Header4",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Code 93 Extended"
              },
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "Font": ";12;;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:Black",
              "Type": "Expression"
            },
            "1": {
              "Ident": "StiText",
              "Name": "Text53",
              "Guid": "167202641c29484383185dda4aab76ce",
              "CanGrow": true,
              "GrowToHeight": true,
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "10,0,9,2.6",
              "ComponentStyle": "Data1",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Code 93 extended is a version of the Code 93 barcode that supports a set of ASCII characters. All additional symbols are encoded as a sequence of two Code 93 characters. The first character is always one of four special characters. Therefore, scanners can always identify the different versions of the bar-code."
              },
              "HorAlignment": "Width",
              "Font": ";10;;",
              "Border": ";182,182,182;;;;;;solid:Black",
              "Brush": "solid:0,0,0,0",
              "TextBrush": "solid:74,74,74",
              "TextOptions": {
                "WordWrap": true
              },
              "TextQuality": "Wysiwyg",
              "Type": "Expression"
            },
            "2": {
              "Ident": "StiBarCode",
              "Name": "BarCode45",
              "Guid": "be1224b9023c482192c0b4f2e59a9205",
              "GrowToHeight": true,
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "4,0,6,2.6",
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
          "EvenStyle": "Data2",
          "CountData": 1
        },
        "7": {
          "Ident": "StiDataBand",
          "Name": "DataBand9",
          "Guid": "1cffc206ccbd4ad6bc2c091bc464e97e",
          "ClientRectangle": "0,20.8,19,2.8",
          "ComponentStyle": "Data1",
          "Interaction": {
            "Ident": "StiBandInteraction"
          },
          "Border": ";182,182,182;;;;;;solid:Black",
          "Brush": "solid:0,0,0,0",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Text11",
              "Guid": "236d91f38bac427f840cfc2375c6b3e9",
              "CanGrow": true,
              "GrowToHeight": true,
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "0,0,4,2.8",
              "ComponentStyle": "Header4",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "UPC-Sup2"
              },
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "Font": ";12;;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:Black",
              "Type": "Expression"
            },
            "1": {
              "Ident": "StiText",
              "Name": "Text12",
              "Guid": "68f859e1d0b44ed182aa6c2991f03fb6",
              "CanGrow": true,
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "10,0,9,2.8",
              "ComponentStyle": "Data1",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Add-on Symbols (barcodes) can be used in some applications together with the EAN-13, UPC-A, and UPC-E bar-codes. Add-on Symbols may contain 2 or 5 additional digits and are usually placed to the right of the barcode."
              },
              "HorAlignment": "Width",
              "Font": ";10;;",
              "Border": ";182,182,182;;;;;;solid:Black",
              "Brush": "solid:0,0,0,0",
              "TextBrush": "solid:74,74,74",
              "TextOptions": {
                "WordWrap": true
              },
              "TextQuality": "Wysiwyg",
              "Type": "Expression"
            },
            "2": {
              "Ident": "StiBarCode",
              "Name": "BarCode8",
              "Guid": "935eb7b0f7d7456d8e5c79a0c3501e13",
              "GrowToHeight": true,
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "4,0,6,2.8",
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
          "EvenStyle": "Data2",
          "CountData": 1
        },
        "8": {
          "Ident": "StiDataBand",
          "Name": "DataBand10",
          "Guid": "e60c79d9ff13483b9eeb3bd154c16ed6",
          "ClientRectangle": "0,24.4,19,3",
          "ComponentStyle": "Data2",
          "Interaction": {
            "Ident": "StiBandInteraction"
          },
          "Border": ";193,152,89;;;;;;solid:Black",
          "Brush": "solid:224,242,241",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Text58",
              "Guid": "c052ca64c88f414bade17052cb3c5e1b",
              "CanGrow": true,
              "GrowToHeight": true,
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "0,0,4,3",
              "ComponentStyle": "Header4",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "UPC-Sup5"
              },
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "Font": ";12;;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:Black",
              "Type": "Expression"
            },
            "1": {
              "Ident": "StiText",
              "Name": "Text59",
              "Guid": "46e27a27dfec455bbb302c3e838b9181",
              "CanGrow": true,
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "10,0,9,3",
              "ComponentStyle": "Data1",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Add-on Symbols (barcodes) can be used in some applications together with the EAN-13, UPC-A, and UPC-E bar-codes. Add-on Symbols may contain 2 or 5 additional digits and are usually placed to the right of the barcode."
              },
              "HorAlignment": "Width",
              "Font": ";10;;",
              "Border": ";182,182,182;;;;;;solid:Black",
              "Brush": "solid:0,0,0,0",
              "TextBrush": "solid:74,74,74",
              "TextOptions": {
                "WordWrap": true
              },
              "TextQuality": "Wysiwyg",
              "Type": "Expression"
            },
            "2": {
              "Ident": "StiBarCode",
              "Name": "BarCode9",
              "Guid": "db195fe2196d4297aeb577ea7bcb0826",
              "GrowToHeight": true,
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "4,0,6,3",
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
            },
            "3": {
              "Ident": "StiText",
              "Name": "Text100",
              "Guid": "794f59c6913b49489183e6e24ac97017",
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "0,2.5,19,0.8",
              "ComponentStyle": "Footer2",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "{PageNofM}"
              },
              "HorAlignment": "Right",
              "VertAlignment": "Center",
              "Font": ";10;Bold;",
              "Border": ";158,158,158;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:158,158,158",
              "Type": "Expression"
            }
          },
          "CountData": 1
        }
      },
      "TitleBeforeHeader": true,
      "PageWidth": 21.0,
      "PageHeight": 29.7,
      "Watermark": {
        "TextBrush": "solid:50,0,0,0"
      },
      "Margins": {
        "Left": 1.0,
        "Right": 1.0,
        "Top": 1.0,
        "Bottom": 1.0
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
          "ClientRectangle": "0,0.4,19,1",
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
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "0,0,4,1",
              "ComponentStyle": "Header3",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Symbology"
              },
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "Font": ";16;;",
              "Border": ";182,182,182;;;;;;solid:Black",
              "Brush": "solid:77,182,172",
              "TextBrush": "solid:255,255,255",
              "Type": "Expression"
            },
            "1": {
              "Ident": "StiText",
              "Name": "Text78",
              "Guid": "f1e3ea1f99584ec18281e6382bb5f268",
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "4,0,6,1",
              "ComponentStyle": "Header3",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Example"
              },
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "Font": ";16;;",
              "Border": ";182,182,182;;;;;;solid:Black",
              "Brush": "solid:77,182,172",
              "TextBrush": "solid:255,255,255",
              "Type": "Expression"
            },
            "2": {
              "Ident": "StiText",
              "Name": "Text79",
              "Guid": "febb421d6b9f45bfa4e9a71e9a79053a",
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "10,0,9,1",
              "ComponentStyle": "Header3",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Description"
              },
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "Font": ";16;;",
              "Border": ";182,182,182;;;;;;solid:Black",
              "Brush": "solid:77,182,172",
              "TextBrush": "solid:255,255,255",
              "Type": "Expression"
            }
          }
        },
        "1": {
          "Ident": "StiPageFooterBand",
          "Name": "PageFooterBand2",
          "Guid": "35a2c00686c84a2a83ee69bedb629ebc",
          "ClientRectangle": "0,37.98,19,0.8",
          "ComponentStyle": "Footer2",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Border": "Top;158,158,158;;;;;;solid:Black",
          "Brush": "solid:",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Text101",
              "Guid": "e69d99668bff48f693fb0f3fb24b4f51",
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "0,0,19,0.8",
              "ComponentStyle": "Footer2",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "{PageNofM}"
              },
              "HorAlignment": "Right",
              "VertAlignment": "Center",
              "Font": ";10;Bold;",
              "Border": ";158,158,158;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:158,158,158",
              "Type": "Expression"
            }
          }
        },
        "2": {
          "Ident": "StiDataBand",
          "Name": "DataBand5",
          "Guid": "4253746f63354780a70c6b38a2163c61",
          "ClientRectangle": "0,2.2,19,8.4",
          "ComponentStyle": "Data1",
          "Interaction": {
            "Ident": "StiBandInteraction"
          },
          "Border": ";182,182,182;;;;;;solid:Black",
          "Brush": "solid:0,0,0,0",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Text54",
              "Guid": "1fbea62956a44f048c9eed8393d1ef5d",
              "CanGrow": true,
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "0,0,4,2.6",
              "ComponentStyle": "Header4",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "EAN-8"
              },
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "Font": ";12;;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:Black",
              "Type": "Expression"
            },
            "1": {
              "Ident": "StiText",
              "Name": "Text55",
              "Guid": "97f210ebeb8c432f9ac2ffe415a0ccef",
              "CanGrow": true,
              "GrowToHeight": true,
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "10,0,9,8.4",
              "ComponentStyle": "Data1",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "The EAN-8 bar-code was developed for use on small packages. It is used instead of the EAN-13 bar-code where an EAN-13 barcode would be too large, for example on packets of gum. The structure of the EAN-8 bar-code is in the same as the structure of the EAN-13 bar-code. The check digit is calculated automatically irrespective of input data. This bar-code does not contain the code of the producer and has only 4 digits. As a result there can only be 10000 specimen products per  organization, so the EAN-8 bar-code is provided only to those organizations which really need it."
              },
              "HorAlignment": "Width",
              "Font": ";10;;",
              "Border": ";182,182,182;;;;;;solid:Black",
              "Brush": "solid:0,0,0,0",
              "TextBrush": "solid:74,74,74",
              "TextOptions": {
                "WordWrap": true
              },
              "TextQuality": "Wysiwyg",
              "Type": "Expression"
            },
            "2": {
              "Ident": "StiBarCode",
              "Name": "BarCode20",
              "Guid": "5547daed85024d67ada2ef17dc0e6172",
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "4,0,6,2.6",
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
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "4,2.6,6,3",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Border": ";;;;;;;solid:Black",
              "BackColor": "Transparent",
              "HorAlignment": "Center",
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
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "4,5.6,6,2.8",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Border": ";;;;;;;solid:Black",
              "BackColor": "Transparent",
              "HorAlignment": "Center",
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
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "0,2.6,4,3",
              "ComponentStyle": "Header4",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "EAN-8 + Sup2"
              },
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "Font": ";12;;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:Black",
              "Type": "Expression"
            },
            "6": {
              "Ident": "StiText",
              "Name": "Text61",
              "Guid": "92a9f27353c54b2b915fffe6f11223c2",
              "CanGrow": true,
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "0,5.6,4,2.8",
              "ComponentStyle": "Header4",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "EAN-8 + Sup5"
              },
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "Font": ";12;;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:Black",
              "Type": "Expression"
            }
          },
          "CountData": 1
        },
        "3": {
          "Ident": "StiDataBand",
          "Name": "DataBand6",
          "Guid": "2bccc6a71b7d4b28872709885f751e06",
          "ClientRectangle": "0,11.4,19,9",
          "ComponentStyle": "Data2",
          "Interaction": {
            "Ident": "StiBandInteraction"
          },
          "Border": ";193,152,89;;;;;;solid:Black",
          "Brush": "solid:224,242,241",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Text21",
              "Guid": "a900fe349f0345b6bcbf68ace0b46abe",
              "CanGrow": true,
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "0,0,4,3",
              "ComponentStyle": "Header4",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "EAN-13"
              },
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "Font": ";12;;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:Black",
              "Type": "Expression"
            },
            "1": {
              "Ident": "StiText",
              "Name": "Text22",
              "Guid": "032bd8257ccb415bb66ed85a491c53a3",
              "CanGrow": true,
              "GrowToHeight": true,
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "10,0,9,9",
              "ComponentStyle": "Data1",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "The EAN-13 barcode was created based on the UPC-A barcode as an extension of the EAN.UCC system used outside the USA. EAN-13 is the European version of UPC-A. The structure of EAN-13 barcode is the same as UPC-A. Each bar-code character consist of 2 bars and 2 spaces, which may have a width from 1 to 4 modules. The first digit is always placed outside the symbol, additionally the right quiet zone indicator (>) is used to indicate the Quiet Zones that are necessary for barcode scanners to work properly."
              },
              "HorAlignment": "Width",
              "Font": ";10;;",
              "Border": ";182,182,182;;;;;;solid:Black",
              "Brush": "solid:0,0,0,0",
              "TextBrush": "solid:74,74,74",
              "TextOptions": {
                "WordWrap": true
              },
              "TextQuality": "Wysiwyg",
              "Type": "Expression"
            },
            "2": {
              "Ident": "StiBarCode",
              "Name": "BarCode21",
              "Guid": "e0f52faeb61446f189940403d1d5c814",
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "4,0,6,3",
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
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "4,3,6,3",
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
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "4,6,6,3",
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
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "0,3,4,3",
              "ComponentStyle": "Header4",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "EAN-13 + Sup2"
              },
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "Font": ";12;;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:Black",
              "Type": "Expression"
            },
            "6": {
              "Ident": "StiText",
              "Name": "Text63",
              "Guid": "fa8629563d9f484caaefc694770d0bc3",
              "CanGrow": true,
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "0,6,4,3",
              "ComponentStyle": "Header4",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "EAN-13 + Sup5"
              },
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "Font": ";12;;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:Black",
              "Type": "Expression"
            }
          },
          "CountData": 1
        },
        "4": {
          "Ident": "StiDataBand",
          "Name": "DataBand12",
          "Guid": "7db522d23c8b43668bcdf8c759493fef",
          "ClientRectangle": "0,21.2,19,2.6",
          "ComponentStyle": "Data1",
          "Interaction": {
            "Ident": "StiBandInteraction"
          },
          "Border": ";182,182,182;;;;;;solid:Black",
          "Brush": "solid:0,0,0,0",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Text10",
              "Guid": "c08c51f796ac4ef895776ffac9a64975",
              "CanGrow": true,
              "GrowToHeight": true,
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "0,0,4,2.6",
              "ComponentStyle": "Header4",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "JAN-8"
              },
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "Font": ";12;;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:Black",
              "Type": "Expression"
            },
            "1": {
              "Ident": "StiText",
              "Name": "Text41",
              "Guid": "3eaa446dd3b34135b1a2441ac5dfdc4c",
              "CanGrow": true,
              "GrowToHeight": true,
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "10,0,9,2.6",
              "ComponentStyle": "Data1",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "A JAN-8 barcode is another name for an EAN-8 barcode dedicated for use only in Japan. The first two digits of the barcode should be 45 or 49 to indicate Japan. Note the 'human readable' digits at the foot which can be used by operators if the label becomes damaged or will not scan for some reason - \"49123456\" is a number encoded in the barcode.\r\n\r\n"
              },
              "HorAlignment": "Width",
              "Font": ";10;;",
              "Border": ";182,182,182;;;;;;solid:Black",
              "Brush": "solid:0,0,0,0",
              "TextBrush": "solid:74,74,74",
              "TextOptions": {
                "WordWrap": true
              },
              "TextQuality": "Wysiwyg",
              "Type": "Expression"
            },
            "2": {
              "Ident": "StiBarCode",
              "Name": "BarCode7",
              "Guid": "6245e551c5124832b7664b053f19f041",
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "4,0,6,2.6",
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
        "5": {
          "Ident": "StiDataBand",
          "Name": "DataBand13",
          "Guid": "046e34997e4a4f02973684cb123dcbcb",
          "ClientRectangle": "0,24.6,19,3.2",
          "ComponentStyle": "Data2",
          "Interaction": {
            "Ident": "StiBandInteraction"
          },
          "Border": ";193,152,89;;;;;;solid:Black",
          "Brush": "solid:224,242,241",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Text30",
              "Guid": "7121b6bd9788441a8fc97202519ce82d",
              "CanGrow": true,
              "GrowToHeight": true,
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "0,0,4,3.2",
              "ComponentStyle": "Header4",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "JAN-13"
              },
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "Font": ";12;;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:Black",
              "Type": "Expression"
            },
            "1": {
              "Ident": "StiText",
              "Name": "Text42",
              "Guid": "c726da08d8ab45149c89f7c2129ed46d",
              "CanGrow": true,
              "GrowToHeight": true,
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "10,0,9,3.2",
              "ComponentStyle": "Data1",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "A JAN-13 barcode is another name for an EAN-13 barcode dedicated for use only in Japan. The first two digits should be 45 or 49 which indicate Japan. Note the 'human readable' digits at the foot which can be used by operators if the label becomes damaged or will not scan for some reason - \"4901234567894\" is the number encoded in the barcode.\r\n\r\n"
              },
              "HorAlignment": "Width",
              "Font": ";10;;",
              "Border": ";182,182,182;;;;;;solid:Black",
              "Brush": "solid:0,0,0,0",
              "TextBrush": "solid:74,74,74",
              "TextOptions": {
                "WordWrap": true
              },
              "TextQuality": "Wysiwyg",
              "Type": "Expression"
            },
            "2": {
              "Ident": "StiBarCode",
              "Name": "BarCode11",
              "Guid": "52be6237ddd64cc686749b7397cc3e2f",
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "4,0,6,3.2",
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
      "PageWidth": 21.0,
      "PageHeight": 29.7,
      "Watermark": {
        "TextBrush": "solid:50,0,0,0"
      },
      "Margins": {
        "Left": 1.0,
        "Right": 1.0,
        "Top": 1.0,
        "Bottom": 1.0
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
          "ClientRectangle": "0,0.4,19,1",
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
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "0,0,4,1",
              "ComponentStyle": "Header3",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Symbology"
              },
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "Font": ";16;;",
              "Border": ";182,182,182;;;;;;solid:Black",
              "Brush": "solid:77,182,172",
              "TextBrush": "solid:255,255,255",
              "Type": "Expression"
            },
            "1": {
              "Ident": "StiText",
              "Name": "Text81",
              "Guid": "7e86664d28b34909ad55912a992dec66",
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "4,0,6,1",
              "ComponentStyle": "Header3",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Example"
              },
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "Font": ";16;;",
              "Border": ";182,182,182;;;;;;solid:Black",
              "Brush": "solid:77,182,172",
              "TextBrush": "solid:255,255,255",
              "Type": "Expression"
            },
            "2": {
              "Ident": "StiText",
              "Name": "Text82",
              "Guid": "62e678191b994069a50b4c0617f6530f",
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "10,0,9,1",
              "ComponentStyle": "Header3",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Description"
              },
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "Font": ";16;;",
              "Border": ";182,182,182;;;;;;solid:Black",
              "Brush": "solid:77,182,172",
              "TextBrush": "solid:255,255,255",
              "Type": "Expression"
            }
          }
        },
        "1": {
          "Ident": "StiPageFooterBand",
          "Name": "PageFooterBand3",
          "ClientRectangle": "0,37.98,19,0.8",
          "ComponentStyle": "Footer2",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Border": "Top;158,158,158;;;;;;solid:Black",
          "Brush": "solid:",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Text102",
              "Guid": "7260ecd35409476f89896fc140e3a78d",
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "0.03,0,18.97,0.8",
              "ComponentStyle": "Footer2",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "{PageNofM}"
              },
              "HorAlignment": "Right",
              "VertAlignment": "Center",
              "Font": ";10;Bold;",
              "Border": ";158,158,158;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:158,158,158",
              "Type": "Expression"
            }
          }
        },
        "2": {
          "Ident": "StiDataBand",
          "Name": "DataBand7",
          "Guid": "e6f079d2f1604692be52b58db7ffabf9",
          "ClientRectangle": "0,2.2,19,10.2",
          "ComponentStyle": "Data1",
          "Interaction": {
            "Ident": "StiBandInteraction"
          },
          "Border": ";182,182,182;;;;;;solid:Black",
          "Brush": "solid:0,0,0,0",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Text1",
              "Guid": "c8f8f383733d4cd39f6d2b1fab82877e",
              "CanGrow": true,
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "0,0,4,3.4",
              "ComponentStyle": "Header4",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "UPC-A"
              },
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "Font": ";12;;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:Black",
              "Type": "Expression"
            },
            "1": {
              "Ident": "StiText",
              "Name": "Text2",
              "Guid": "d46eebe468d745d5a3f9e3ada5f7375a",
              "CanGrow": true,
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "10,0,9,10.2",
              "ComponentStyle": "Data1",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "UPC-A was the first barcode, created by Uniform Code Council, Inc. in 1973. The UPC-A barcode is an unbroken code with a fixed length and high density. It is used for tracking trade items in stores, and otherwise marking goods. UPC-A barcodes consist of 11 data digits and one check digit. The first digit is a number system digit that normally represents the type of product being identified. The following 5 digits are a manufacturers code and the next 5 digits are used to identify a specific product. The barcode does not contain any information about characteristics of a product, but only a unique number relating to an entry in the International data base where all information about the particular product is stored.\r\n"
              },
              "HorAlignment": "Width",
              "Font": ";10;;",
              "Border": ";182,182,182;;;;;;solid:Black",
              "Brush": "solid:0,0,0,0",
              "TextBrush": "solid:74,74,74",
              "TextOptions": {
                "WordWrap": true
              },
              "TextQuality": "Wysiwyg",
              "Type": "Expression"
            },
            "2": {
              "Ident": "StiBarCode",
              "Name": "BarCode1",
              "Guid": "7e4f0b68abfc436b880d228f75a69c4b",
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "4,0,6,3.4",
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
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "4,3.4,6,3.4",
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
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "4,6.8,6,3.4",
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
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "0,3.4,4,3.4",
              "ComponentStyle": "Header4",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "UPC-A + Sup2"
              },
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "Font": ";12;;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:Black",
              "Type": "Expression"
            },
            "6": {
              "Ident": "StiText",
              "Name": "Text14",
              "Guid": "8ff97fdcd8f045b68814bd96a4855d47",
              "CanGrow": true,
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "0,6.8,4,3.4",
              "ComponentStyle": "Header4",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "UPC-A + Sup5"
              },
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "Font": ";12;;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:Black",
              "Type": "Expression"
            }
          },
          "EvenStyle": "Data2",
          "CountData": 1
        },
        "3": {
          "Ident": "StiDataBand",
          "Name": "DataBand8",
          "Guid": "056acacbb0124387b2034a336f3b51d3",
          "ClientRectangle": "0,13.2,19,5.4",
          "ComponentStyle": "Data2",
          "Interaction": {
            "Ident": "StiBandInteraction"
          },
          "Border": ";193,152,89;;;;;;solid:Black",
          "Brush": "solid:224,242,241",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Text56",
              "Guid": "2aa77f9ebcf246e4b582adab14e60ae0",
              "CanGrow": true,
              "GrowToHeight": true,
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "0,0,4,5.4",
              "ComponentStyle": "Header4",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "UPC-E"
              },
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "Font": ";12;;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:Black",
              "Type": "Expression"
            },
            "1": {
              "Ident": "StiText",
              "Name": "Text57",
              "Guid": "bbbc0817a2664555b65ff820e8b8ea6f",
              "CanGrow": true,
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "10,0,9,5.4",
              "ComponentStyle": "Data1",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "A UPC-E is a smaller seven digit UPC symbology for number system 0. For UPC-E barcodes, normally 6 digits are specified and the barcode calculates the seventh check digit. Before the Middle guard bars, a binary 1 is indicated by a bar, while a 0 is indicated by a space. After the Middle guard bars, however, the patterns are optically inverted. In other words, a 1 is now indicated by a space, and a 0 is now indicated by a bar. It has the same basic structure as the UPC-A barcode. Note the 'human readable' digits at the foot which can be used by operators if the label becomes damaged or will not scan for some reason - \"1234567\" is the number encoded in the barcode."
              },
              "HorAlignment": "Width",
              "Font": ";10;;",
              "Border": ";182,182,182;;;;;;solid:Black",
              "Brush": "solid:0,0,0,0",
              "TextBrush": "solid:74,74,74",
              "TextOptions": {
                "WordWrap": true
              },
              "TextQuality": "Wysiwyg",
              "Type": "Expression"
            },
            "2": {
              "Ident": "StiBarCode",
              "Name": "BarCode2",
              "Guid": "31de892b0a6a45d5987aa53d82dd0c5d",
              "GrowToHeight": true,
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "4,0,6,5.4",
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
        "4": {
          "Ident": "StiDataBand",
          "Name": "DataBand14",
          "Guid": "aa528be8d9c64d1b921b574f808e4f34",
          "ClientRectangle": "0,19.4,19,7.2",
          "ComponentStyle": "Data1",
          "Interaction": {
            "Ident": "StiBandInteraction"
          },
          "Border": ";182,182,182;;;;;;solid:Black",
          "Brush": "solid:0,0,0,0",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Text32",
              "Guid": "d5f6b48397214c279c717ab11bed7dcb",
              "CanGrow": true,
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "0,0,4,2.4",
              "ComponentStyle": "Header4",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Code 128a"
              },
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "Font": ";12;;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:Black",
              "Type": "Expression"
            },
            "1": {
              "Ident": "StiText",
              "Name": "Text43",
              "Guid": "9a5f4d3722844836a6e486e8e94d2db1",
              "CanGrow": true,
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "10,0,9,7.2",
              "ComponentStyle": "Data1",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "The Code128 barcode was developed in 1981. It is a variable length, high density, alphanumeric symbology. It allows the output of 128 characters of ASCII and is effective for digits. There are actually three subcodes, which can be mixed within a single barcode: Code128a, Code128b, Code128c. The barcode consist of three bars and three spaces. Bars and spaces have module construction and their width consist of one or four modules. The width of an element consist of eleven modules. The \"Stop\" sign consist of 13 modules and has four bars and three spaces. The check sum is calculated automatically."
              },
              "HorAlignment": "Width",
              "Font": ";10;;",
              "Border": ";182,182,182;;;;;;solid:Black",
              "Brush": "solid:0,0,0,0",
              "TextBrush": "solid:74,74,74",
              "TextOptions": {
                "WordWrap": true
              },
              "TextQuality": "Wysiwyg",
              "Type": "Expression"
            },
            "2": {
              "Ident": "StiText",
              "Name": "Text64",
              "Guid": "ba2666724b04441994d16d75d1d4863b",
              "CanGrow": true,
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "0,2.4,4,2.4",
              "ComponentStyle": "Header4",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Code 128b"
              },
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "Font": ";12;;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:Black",
              "Type": "Expression"
            },
            "3": {
              "Ident": "StiText",
              "Name": "Text65",
              "Guid": "a0d27d6c755b42e4a465a00970989a56",
              "CanGrow": true,
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "0,4.8,4,2.4",
              "ComponentStyle": "Header4",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Code 128c"
              },
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "Font": ";12;;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:Black",
              "Type": "Expression"
            },
            "4": {
              "Ident": "StiBarCode",
              "Name": "BarCode29",
              "Guid": "7eebc0dec0234151a956426b49b5a62a",
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "4,0,6,2.4",
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
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "4,2.4,6,2.4",
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
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "4,4.8,6,2.4",
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
      "PageWidth": 21.0,
      "PageHeight": 29.7,
      "Watermark": {
        "TextBrush": "solid:50,0,0,0"
      },
      "Margins": {
        "Left": 1.0,
        "Right": 1.0,
        "Top": 1.0,
        "Bottom": 1.0
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
          "ClientRectangle": "0,0.4,19,1",
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
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "0,0,4,1",
              "ComponentStyle": "Header3",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Symbology"
              },
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "Font": ";16;;",
              "Border": ";182,182,182;;;;;;solid:Black",
              "Brush": "solid:77,182,172",
              "TextBrush": "solid:255,255,255",
              "Type": "Expression"
            },
            "1": {
              "Ident": "StiText",
              "Name": "Text84",
              "Guid": "a6b2863efecc42238b1bb51f12846e17",
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "4,0,6,1",
              "ComponentStyle": "Header3",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Example"
              },
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "Font": ";16;;",
              "Border": ";182,182,182;;;;;;solid:Black",
              "Brush": "solid:77,182,172",
              "TextBrush": "solid:255,255,255",
              "Type": "Expression"
            },
            "2": {
              "Ident": "StiText",
              "Name": "Text85",
              "Guid": "23c59246b0644bdeb8d47bb1d0fb5fae",
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "10,0,9,1",
              "ComponentStyle": "Header3",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Description"
              },
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "Font": ";16;;",
              "Border": ";182,182,182;;;;;;solid:Black",
              "Brush": "solid:77,182,172",
              "TextBrush": "solid:255,255,255",
              "Type": "Expression"
            }
          }
        },
        "1": {
          "Ident": "StiPageFooterBand",
          "Name": "PageFooterBand4",
          "ClientRectangle": "0,43.52,19,0.8",
          "ComponentStyle": "Footer2",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Border": "Top;158,158,158;;;;;;solid:Black",
          "Brush": "solid:",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Text103",
              "Guid": "4ec897f7c5d240d69d8324bed596754e",
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "0,0.08,19,0.67",
              "ComponentStyle": "Footer2",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "{PageNofM}"
              },
              "HorAlignment": "Right",
              "VertAlignment": "Center",
              "Font": ";10;Bold;",
              "Border": ";158,158,158;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:158,158,158",
              "Type": "Expression"
            }
          }
        },
        "2": {
          "Ident": "StiDataBand",
          "Name": "DataBand15",
          "Guid": "a6e70b2328454843a6d84d27d0805689",
          "ClientRectangle": "0,2.2,19,7.2",
          "ComponentStyle": "Data2",
          "Interaction": {
            "Ident": "StiBandInteraction"
          },
          "Border": ";193,152,89;;;;;;solid:Black",
          "Brush": "solid:224,242,241",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Text3",
              "Guid": "8a81b285eb0049c4abef7c68aa8e41b4",
              "CanGrow": true,
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "0,0,4,2.4",
              "ComponentStyle": "Header4",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "EAN-128a"
              },
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "Font": ";12;;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:Black",
              "Type": "Expression"
            },
            "1": {
              "Ident": "StiText",
              "Name": "Text4",
              "Guid": "dc2c63d39edd44a2a6526c7875e8bb3f",
              "CanGrow": true,
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "10,0,9,7.2",
              "ComponentStyle": "Data1",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "The EAN-128 bar-code is a subset of the Code128 barcode which uses a variable length, high density, alphanumeric symbology. It allows the output of 128 characters of ASCII and is effective for digits. There are actually three subcodes, which can be mixed within a single barcode: EAN-128a, EAN-128b, EAN-128c. The structure of the EAN-128 bar-code is the same as for the Code128 bar-code. Elements of the bar-code consist of three bars and three spaces. Bars and spaces have module construction and their width consists of either one or four modules. The width of an element consists of eleven modules. To difference between the EAN-128 bar-code and the Code128 bar-code is that the FNC1 is placed after the start character. This character is reserved for the EAN.UCC system."
              },
              "HorAlignment": "Width",
              "Font": ";10;;",
              "Border": ";182,182,182;;;;;;solid:Black",
              "Brush": "solid:0,0,0,0",
              "TextBrush": "solid:74,74,74",
              "TextOptions": {
                "WordWrap": true
              },
              "TextQuality": "Wysiwyg",
              "Type": "Expression"
            },
            "2": {
              "Ident": "StiText",
              "Name": "Text8",
              "Guid": "dfcda7dff8d64891aa9d76aceeb1ecec",
              "CanGrow": true,
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "0,2.4,4,2.4",
              "ComponentStyle": "Header4",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "EAN-128b"
              },
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "Font": ";12;;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:Black",
              "Type": "Expression"
            },
            "3": {
              "Ident": "StiText",
              "Name": "Text66",
              "Guid": "64bed1aecc3d41b48a103c19bf4d2367",
              "CanGrow": true,
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "0,4.8,4,2.4",
              "ComponentStyle": "Header4",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "EAN-128c"
              },
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "Font": ";12;;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:Black",
              "Type": "Expression"
            },
            "4": {
              "Ident": "StiBarCode",
              "Name": "BarCode3",
              "Guid": "5ab8017aae684f1c9019ff74a3329bf4",
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "4,0,6,2.4",
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
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "4,2.4,6,2.4",
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
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "4,4.8,6.2,2.4",
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
        "3": {
          "Ident": "StiDataBand",
          "Name": "DataBand16",
          "Guid": "9238125f22c14ed0b86e5f44aa56bc36",
          "ClientRectangle": "0,10.2,19,4.2",
          "ComponentStyle": "Data1",
          "Interaction": {
            "Ident": "StiBandInteraction"
          },
          "Border": ";182,182,182;;;;;;solid:Black",
          "Brush": "solid:0,0,0,0",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Text18",
              "Guid": "ec1e46f4a7d74034804dd13cd404142b",
              "CanGrow": true,
              "GrowToHeight": true,
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "0,0,4,4.2",
              "ComponentStyle": "Header4",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Code 11"
              },
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "Font": ";12;;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:Black",
              "Type": "Expression"
            },
            "1": {
              "Ident": "StiText",
              "Name": "Text19",
              "Guid": "6aa7b8d5c72e4cdbb303b3cec8c2eb53",
              "CanGrow": true,
              "GrowToHeight": true,
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "10,0,9,4.2",
              "ComponentStyle": "Data1",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "The Code 11 bar-code weas developed by Intermec in 1977. It is used in telecommunications. This barcode has high density and can encode any length string consisting of the digits 0-9 and the dash character. The Code 11 uses one or two check digits and two check symbols. Usually, if the length of the string is less than 10 symbols then only one check symbol is used. If the the length of the string is 10 symbols and more then 2 check symbols are used. The value of the check symbol is calculated by the modulo-10 algorithm."
              },
              "HorAlignment": "Width",
              "Font": ";10;;",
              "Border": ";182,182,182;;;;;;solid:Black",
              "Brush": "solid:0,0,0,0",
              "TextBrush": "solid:74,74,74",
              "TextOptions": {
                "WordWrap": true
              },
              "TextQuality": "Wysiwyg",
              "Type": "Expression"
            },
            "2": {
              "Ident": "StiBarCode",
              "Name": "BarCode15",
              "Guid": "ba27c091963044e29a22fa9a28a5b924",
              "GrowToHeight": true,
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "4,0,6,4.2",
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
          "EvenStyle": "Data2",
          "CountData": 1
        },
        "4": {
          "Ident": "StiDataBand",
          "Name": "DataBand17",
          "Guid": "603943bb317e43bca41d4a271db0b3d8",
          "ClientRectangle": "0,15.2,19,3.2",
          "ComponentStyle": "Data2",
          "Interaction": {
            "Ident": "StiBandInteraction"
          },
          "Border": ";193,152,89;;;;;;solid:Black",
          "Brush": "solid:224,242,241",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Text20",
              "Guid": "965cc19fe91441aa9696b15889f92a53",
              "CanGrow": true,
              "GrowToHeight": true,
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "0,0,4,3.2",
              "ComponentStyle": "Header4",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Pharmacode"
              },
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "Font": ";12;;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:Black",
              "Type": "Expression"
            },
            "1": {
              "Ident": "StiText",
              "Name": "Text67",
              "Guid": "7e04e173295e4500916a8bf46c0d97af",
              "CanGrow": true,
              "GrowToHeight": true,
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "10,0,9,3.2",
              "ComponentStyle": "Data1",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "A Pharmacode barcode is used in the pharmaceutical industry as a packing control system. The Pharmacode barcode is placed on the package. A Pharmacode barcode can represent only a single integer from 3 to 131070. All digits in the specified range make correct barcodes, but some of these barcodes can be unreadable because all barcodes are identical."
              },
              "HorAlignment": "Width",
              "Font": ";10;;",
              "Border": ";182,182,182;;;;;;solid:Black",
              "Brush": "solid:0,0,0,0",
              "TextBrush": "solid:74,74,74",
              "TextOptions": {
                "WordWrap": true
              },
              "TextQuality": "Wysiwyg",
              "Type": "Expression"
            },
            "2": {
              "Ident": "StiBarCode",
              "Name": "BarCode16",
              "Guid": "bf2b06367dbb489ab8f5d636424eb954",
              "GrowToHeight": true,
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "4,0,6,3.2",
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
        },
        "5": {
          "Ident": "StiDataBand",
          "Name": "DataBand18",
          "Guid": "9cb3bccec3ff410d8332e4319be90984",
          "ClientRectangle": "0,19.2,19,3.8",
          "ComponentStyle": "Data1",
          "Interaction": {
            "Ident": "StiBandInteraction"
          },
          "Border": ";182,182,182;;;;;;solid:Black",
          "Brush": "solid:0,0,0,0",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Text35",
              "Guid": "63658c6c5c83453ba23d54e6880325a5",
              "CanGrow": true,
              "GrowToHeight": true,
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "0,0,4,3.8",
              "ComponentStyle": "Header4",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "ISBN-10"
              },
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "Font": ";12;;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:Black",
              "Type": "Expression"
            },
            "1": {
              "Ident": "StiText",
              "Name": "Text36",
              "Guid": "b075b67e894b418f9e546f2e693ed1f8",
              "CanGrow": true,
              "GrowToHeight": true,
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "10,0,9,3.8",
              "ComponentStyle": "Data1",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "ISBN is the abbreviation of International Standard Book Number - a unique, numeric commercial book identifier. Based upon the 9-digit Standard Book Numbering (SBN) code introduced in 1966,  10-digit ISBN format was developed in 1970 and became the international standard. Note the 'human readable' digits at the foot which can be used by operators if the label becomes damaged or will not scan for some reason - \"80-902734-1-6\" is the number encoded in the barcode.\r\n\r\n"
              },
              "HorAlignment": "Width",
              "Font": ";10;;",
              "Border": ";182,182,182;;;;;;solid:Black",
              "Brush": "solid:0,0,0,0",
              "TextBrush": "solid:74,74,74",
              "TextOptions": {
                "WordWrap": true
              },
              "TextQuality": "Wysiwyg",
              "Type": "Expression"
            },
            "2": {
              "Ident": "StiBarCode",
              "Name": "BarCode17",
              "Guid": "5126f78fa9e44a52a8e9bf1fc2b71883",
              "GrowToHeight": true,
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "4,0,6,3.8",
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
          "EvenStyle": "Data2",
          "CountData": 1
        },
        "6": {
          "Ident": "StiDataBand",
          "Name": "DataBand19",
          "Guid": "6f7b50e038d84ca1b01857933f1a52c4",
          "ClientRectangle": "0,23.8,19,4",
          "ComponentStyle": "Data2",
          "Interaction": {
            "Ident": "StiBandInteraction"
          },
          "Border": ";193,152,89;;;;;;solid:Black",
          "Brush": "solid:224,242,241",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Text68",
              "Guid": "d95cd35090b14da6999281fd6711cb86",
              "CanGrow": true,
              "GrowToHeight": true,
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "0,0,4,3.8",
              "ComponentStyle": "Header4",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "ISBN-13"
              },
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "Font": ";12;;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:Black",
              "Type": "Expression"
            },
            "1": {
              "Ident": "StiText",
              "Name": "Text69",
              "Guid": "a321dcc0515b44c8adeaa438c48b0525",
              "CanGrow": true,
              "GrowToHeight": true,
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "10,0,9,3.8",
              "ComponentStyle": "Data1",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "ISBN is the abbreviation of International Standard Book Number - a unique, numeric commercial book identifier.  The ISBN-13 specification was Issued from January 2007, and describes how the 13-digit ISBN check digit is calculated. Note the 'human readable' digits at the foot which can be used by operators if the label becomes damaged or will not scan for some reason - \"978-0-306-40615-7\" is a number encoded in the barcode.\r\n\r\n"
              },
              "HorAlignment": "Width",
              "Font": ";10;;",
              "Border": ";182,182,182;;;;;;solid:Black",
              "Brush": "solid:0,0,0,0",
              "TextBrush": "solid:74,74,74",
              "TextOptions": {
                "WordWrap": true
              },
              "TextQuality": "Wysiwyg",
              "Type": "Expression"
            },
            "2": {
              "Ident": "StiBarCode",
              "Name": "BarCode34",
              "Guid": "0cead220ceeb4c2997493c4f3e271f54",
              "GrowToHeight": true,
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "4,0,6,3.8",
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
        "7": {
          "Ident": "StiDataBand",
          "Name": "DataBand11",
          "Guid": "d4bc985faeb24e52b6cac8bc87e81a99",
          "ClientRectangle": "0,28.6,19,4",
          "ComponentStyle": "Data1",
          "Interaction": {
            "Ident": "StiBandInteraction"
          },
          "Border": ";182,182,182;;;;;;solid:Black",
          "Brush": "solid:0,0,0,0",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Text39",
              "Guid": "4a12847c7dfc454dbb94eec32af7f59e",
              "CanGrow": true,
              "GrowToHeight": true,
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "0,0,4,3.8",
              "ComponentStyle": "Header4",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Codabar"
              },
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "Font": ";12;;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:Black",
              "Type": "Expression"
            },
            "1": {
              "Ident": "StiText",
              "Name": "Text40",
              "Guid": "7d6bdbba2cda4e4284b821739e7bfb5d",
              "CanGrow": true,
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "10,0,9,3.8",
              "ComponentStyle": "Data1",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "The Codabar is a linear barcode symbology developed in 1972. It can be called as NW-7, USD-4, Code 2 of 7 (2 values of a bar length, 7 elements). It is frequently used in medicine (for example, blood bank forms). Two bars and three spaces are used for encoding. The bar-code has four different sets of start/stop characters: A, B, C, D. These characters are used only as start/stop characters and should not be appeared in the bar-code."
              },
              "HorAlignment": "Width",
              "Font": ";10;;",
              "Border": ";182,182,182;;;;;;solid:Black",
              "Brush": "solid:0,0,0,0",
              "TextBrush": "solid:74,74,74",
              "TextOptions": {
                "WordWrap": true
              },
              "TextQuality": "Wysiwyg",
              "Type": "Expression"
            },
            "2": {
              "Ident": "StiBarCode",
              "Name": "BarCode10",
              "Guid": "ad21e03e59b24735a5e137d5836e7cc6",
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "4,0,6,3.8",
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
        }
      },
      "PrintOnPreviousPage": true,
      "PageWidth": 21.0,
      "PageHeight": 29.7,
      "Watermark": {
        "TextBrush": "solid:50,0,0,0"
      },
      "Margins": {
        "Left": 1.0,
        "Right": 1.0,
        "Top": 1.0,
        "Bottom": 1.0
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
          "ClientRectangle": "0,0.4,19,1",
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
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "0,0,4,1",
              "ComponentStyle": "Header3",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Symbology"
              },
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "Font": ";16;;",
              "Border": ";182,182,182;;;;;;solid:Black",
              "Brush": "solid:77,182,172",
              "TextBrush": "solid:255,255,255",
              "Type": "Expression"
            },
            "1": {
              "Ident": "StiText",
              "Name": "Text87",
              "Guid": "78b1574963794112a4096a7cdb17f8c7",
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "4,0,6,1",
              "ComponentStyle": "Header3",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Example"
              },
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "Font": ";16;;",
              "Border": ";182,182,182;;;;;;solid:Black",
              "Brush": "solid:77,182,172",
              "TextBrush": "solid:255,255,255",
              "Type": "Expression"
            },
            "2": {
              "Ident": "StiText",
              "Name": "Text88",
              "Guid": "4257f3feda25431e92e0cd52e05cacc1",
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "10,0,9,1",
              "ComponentStyle": "Header3",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Description"
              },
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "Font": ";16;;",
              "Border": ";182,182,182;;;;;;solid:Black",
              "Brush": "solid:77,182,172",
              "TextBrush": "solid:255,255,255",
              "Type": "Expression"
            }
          }
        },
        "1": {
          "Ident": "StiPageFooterBand",
          "Name": "PageFooterBand5",
          "ClientRectangle": "0,37.98,19,0.8",
          "ComponentStyle": "Footer2",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Border": "Top;158,158,158;;;;;;solid:Black",
          "Brush": "solid:",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Text104",
              "Guid": "a9ec789317254d3fa78d672a13ccae78",
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "0,0,19,0.8",
              "ComponentStyle": "Footer2",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "{PageNofM}"
              },
              "HorAlignment": "Right",
              "VertAlignment": "Center",
              "Font": ";10;Bold;",
              "Border": ";158,158,158;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:158,158,158",
              "Type": "Expression"
            }
          }
        },
        "2": {
          "Ident": "StiDataBand",
          "Name": "DataBand21",
          "Guid": "c3bb664e7b37468ebd4ce27608a00440",
          "ClientRectangle": "0,2.2,19,3.6",
          "ComponentStyle": "Data2",
          "Interaction": {
            "Ident": "StiBandInteraction"
          },
          "Border": ";193,152,89;;;;;;solid:Black",
          "Brush": "solid:224,242,241",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Text6",
              "Guid": "3d5a14953cc94b4cb35640b5de36e6c2",
              "CanGrow": true,
              "GrowToHeight": true,
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "0,0,4,3.6",
              "ComponentStyle": "Header4",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Msi"
              },
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "Font": ";12;;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:Black",
              "Type": "Expression"
            },
            "1": {
              "Ident": "StiText",
              "Name": "Text70",
              "Guid": "8d33c320a3954232868c1fbe9e64e64d",
              "CanGrow": true,
              "GrowToHeight": true,
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "10,0,9,3.6",
              "ComponentStyle": "Data1",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "The Msi bar-code developed by the MSI Data Corporation. It is based on the original Plessey symbology. Sometimes the Msi bar-code is called the Modified Plessey. The basic implementation of the Msi bar-code is used for warehouse shelves and inventory. Msi is a variable length, numeric-only symbology and allows to output digits 0..9. One or two check digits calculated by modulo-10 or modulo-11 can be used. Each character of the bar-code consist of 4 elements. If the element is the binary 0 then the bar-code has the 1 module width and a space has 2 modules. If the element is the binary 1 the the bar the 2 module width and a space has  1 modules. So, each character has 12 modules length. Therefore, this bar-code has very low data density."
              },
              "HorAlignment": "Width",
              "Font": ";10;;",
              "Border": ";182,182,182;;;;;;solid:Black",
              "Brush": "solid:0,0,0,0",
              "TextBrush": "solid:74,74,74",
              "TextOptions": {
                "WordWrap": true
              },
              "TextQuality": "Wysiwyg",
              "Type": "Expression"
            },
            "2": {
              "Ident": "StiBarCode",
              "Name": "BarCode18",
              "Guid": "81e76a58284f4f16be1246488c60ced9",
              "GrowToHeight": true,
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "4,0,6,3.6",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Border": ";;;;;;;solid:Black",
              "BackColor": "Transparent",
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "BarCodeType": {
                "Ident": "StiMsiBarCodeType",
                "CheckSum1": "Modulo10"
              },
              "Code": {
                "Value": "1234567"
              }
            }
          },
          "CountData": 1
        },
        "3": {
          "Ident": "StiDataBand",
          "Name": "DataBand22",
          "Guid": "89719e9da6e344e09ef56569cea95b88",
          "ClientRectangle": "0,6.6,19,2.2",
          "ComponentStyle": "Data1",
          "Interaction": {
            "Ident": "StiBandInteraction"
          },
          "Border": ";182,182,182;;;;;;solid:Black",
          "Brush": "solid:0,0,0,0",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Text7",
              "Guid": "758dbd235a3d446a93026c429107ffe2",
              "CanGrow": true,
              "GrowToHeight": true,
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "0,0,4,2.2",
              "ComponentStyle": "Header4",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "2 of 5 Standard"
              },
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "Font": ";12;;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:Black",
              "Type": "Expression"
            },
            "1": {
              "Ident": "StiText",
              "Name": "Text71",
              "Guid": "0a8b2ab206ba4af99f80de575a855351",
              "CanGrow": true,
              "GrowToHeight": true,
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "10,0,9,2.2",
              "ComponentStyle": "Data1",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "The 2of5 bar-code was developed 40 years ago. This is a low density variable length numeric. This barcode is used in manufacture and is known as Code 25, Code 25 Standard or Code 25 Industrial. It is very seldom used these days.\r\n"
              },
              "HorAlignment": "Width",
              "Font": ";10;;",
              "Border": ";182,182,182;;;;;;solid:Black",
              "Brush": "solid:0,0,0,0",
              "TextBrush": "solid:74,74,74",
              "TextOptions": {
                "WordWrap": true
              },
              "TextQuality": "Wysiwyg",
              "Type": "Expression"
            },
            "2": {
              "Ident": "StiBarCode",
              "Name": "BarCode19",
              "Guid": "03d393b1ac1c4540902b9e02f17561d4",
              "GrowToHeight": true,
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "4,0,6,2.2",
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
          "EvenStyle": "Data2",
          "CountData": 1
        },
        "4": {
          "Ident": "StiDataBand",
          "Name": "DataBand23",
          "Guid": "dd197f53f8b045a2be488a9d824bb36d",
          "ClientRectangle": "0,9.6,19,2.2",
          "ComponentStyle": "Data2",
          "Interaction": {
            "Ident": "StiBandInteraction"
          },
          "Border": ";193,152,89;;;;;;solid:Black",
          "Brush": "solid:224,242,241",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Text5",
              "Guid": "7943804531f140c9bf889f6c7cecf781",
              "CanGrow": true,
              "GrowToHeight": true,
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "0,0,4,2.2",
              "ComponentStyle": "Header4",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "2 of 5 Interleaved"
              },
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "Font": ";12;;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:Black",
              "Type": "Expression"
            },
            "1": {
              "Ident": "StiText",
              "Name": "Text72",
              "Guid": "5944b538ab3b4de29300ab07b29f4286",
              "CanGrow": true,
              "GrowToHeight": true,
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "10,0,9,2.2",
              "ComponentStyle": "Data1",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "The 2of5 Interleaved barcode is a high density variable length numeric only symbology that encodes digit pairs in an interleaved manner. This bar-code is developed of the Code 25 Standard. It is usually used in the industrial."
              },
              "HorAlignment": "Width",
              "Font": ";10;;",
              "Border": ";182,182,182;;;;;;solid:Black",
              "Brush": "solid:0,0,0,0",
              "TextBrush": "solid:74,74,74",
              "TextOptions": {
                "WordWrap": true
              },
              "TextQuality": "Wysiwyg",
              "Type": "Expression"
            },
            "2": {
              "Ident": "StiBarCode",
              "Name": "BarCode36",
              "Guid": "a93c3e0470a04488a571924a5f4b5891",
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "4,0,6,2.2",
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
        "5": {
          "Ident": "StiDataBand",
          "Name": "DataBand20",
          "Guid": "ae785877419d419fb709527694faff29",
          "ClientRectangle": "0,12.6,19,3.2",
          "ComponentStyle": "Data1",
          "Interaction": {
            "Ident": "StiBandInteraction"
          },
          "Border": ";182,182,182;;;;;;solid:Black",
          "Brush": "solid:0,0,0,0",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Text37",
              "Guid": "7ef0e0b18ca048379dac503fb0b7875e",
              "CanGrow": true,
              "GrowToHeight": true,
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "0,0,4,3.2",
              "ComponentStyle": "Header4",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Plessey"
              },
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "Font": ";12;;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:Black",
              "Type": "Expression"
            },
            "1": {
              "Ident": "StiText",
              "Name": "Text38",
              "Guid": "19e0c058dc714ce9939f0b14db612bff",
              "CanGrow": true,
              "GrowToHeight": true,
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "10,0,9,3.2",
              "ComponentStyle": "Data1",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "A Plessey barcode was created by Plessey company in England on March 1971. The Plessey barcode is widely used in libraries, supermarkets, and production environments. A variant of the barcode known as Anker Code and appropriate scanners were provided by the ADS company. Encoding technology of the Plessey barcode was used by MSE Data Corporation. This company used it to create an MSI barcode that sometimes is called 'modified Plessey'. This bar-code is now obsolete and new scanners cannot read it.\r\n\r\n"
              },
              "HorAlignment": "Width",
              "Font": ";10;;",
              "Border": ";182,182,182;;;;;;solid:Black",
              "Brush": "solid:0,0,0,0",
              "TextBrush": "solid:74,74,74",
              "TextOptions": {
                "WordWrap": true
              },
              "TextQuality": "Wysiwyg",
              "Type": "Expression"
            },
            "2": {
              "Ident": "StiBarCode",
              "Name": "BarCode35",
              "Guid": "2759717accb34597b65f9fe8fa287d95",
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "4,0,6,3.2",
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
        "6": {
          "Ident": "StiDataBand",
          "Name": "DataBand24",
          "Guid": "841f2de519d74cd2b1df5f207a728b8d",
          "ClientRectangle": "0,16.6,19,2.2",
          "ComponentStyle": "Data2",
          "Interaction": {
            "Ident": "StiBandInteraction"
          },
          "Border": ";193,152,89;;;;;;solid:Black",
          "Brush": "solid:224,242,241",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Text15",
              "Guid": "f4c758e9496942c8a12f6a6e7ff4385c",
              "CanGrow": true,
              "GrowToHeight": true,
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "0,0,4,2.2",
              "ComponentStyle": "Header4",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Postnet"
              },
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "Font": ";12;;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:Black",
              "Type": "Expression"
            },
            "1": {
              "Ident": "StiText",
              "Name": "Text16",
              "Guid": "2b559654f04f444caea0922dd79f06aa",
              "CanGrow": true,
              "GrowToHeight": true,
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "10,0,9,2.2",
              "ComponentStyle": "Data1",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "The POSTNET (POSTal Numeric Encoding Technique) bar-code was developed by the United States Postal Service for encoding ZIP-codes and correct sorting using BCSs. It can encode ZIP, ZIP+4, and ZIP+4+2 postal codes.\r\nThe Postnet bar-code can encode 0-9 digits. The bar-code consist of short and long bars. Each symbol of data is encoded using five bars. This bar-code contains only one check symbol, that is calculated by the modulo-10 algorithm."
              },
              "HorAlignment": "Width",
              "Font": ";10;;",
              "Border": ";182,182,182;;;;;;solid:Black",
              "Brush": "solid:0,0,0,0",
              "TextBrush": "solid:74,74,74",
              "TextOptions": {
                "WordWrap": true
              },
              "TextQuality": "Wysiwyg",
              "Type": "Expression"
            },
            "2": {
              "Ident": "StiBarCode",
              "Name": "BarCode12",
              "Guid": "8a98359428d7448e8f017158be20d98d",
              "GrowToHeight": true,
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "4,0,6,2.2",
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
        "7": {
          "Ident": "StiDataBand",
          "Name": "DataBand25",
          "Guid": "e1af02337a9245278f0bbb90b774463c",
          "ClientRectangle": "0,19.6,19,2.2",
          "ComponentStyle": "Data1",
          "Interaction": {
            "Ident": "StiBandInteraction"
          },
          "Border": ";182,182,182;;;;;;solid:Black",
          "Brush": "solid:0,0,0,0",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Text73",
              "Guid": "f1d51150548e4a7e9fbbee88980bd454",
              "CanGrow": true,
              "GrowToHeight": true,
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "0,0,4,2.2",
              "ComponentStyle": "Header4",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Australia Post 4 State"
              },
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "Font": ";12;;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:Black",
              "Type": "Expression"
            },
            "1": {
              "Ident": "StiText",
              "Name": "Text74",
              "Guid": "aae129812c8f417f89a25892fb8fb235",
              "CanGrow": true,
              "GrowToHeight": true,
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "10,0,9,2.2",
              "ComponentStyle": "Data1",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "The Australia Post 4-Stage bar-code is used in Australia for the purposes of sorting and directing mail. The barcode consists of 4 elements (4 conditions), each has its own name, value. Each element consists of two bars and two spaces. Each barcode contains 4 check symbols, calculated by the ReedSolomon algorithm. The value of these symbols are usually printed after the text of the barcode."
              },
              "HorAlignment": "Width",
              "Font": ";10;;",
              "Border": ";182,182,182;;;;;;solid:Black",
              "Brush": "solid:0,0,0,0",
              "TextBrush": "solid:74,74,74",
              "TextOptions": {
                "WordWrap": true
              },
              "TextQuality": "Wysiwyg",
              "Type": "Expression"
            },
            "2": {
              "Ident": "StiBarCode",
              "Name": "BarCode13",
              "Guid": "82d5b469bdb54e8a9cc0d61f51b08dd2",
              "GrowToHeight": true,
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "4,0,6,2.2",
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
        "8": {
          "Ident": "StiDataBand",
          "Name": "DataBand26",
          "Guid": "69d156a18d0d4ddba07b7aaf9c18da91",
          "ClientRectangle": "0,22.6,19,1.4",
          "ComponentStyle": "Data2",
          "Interaction": {
            "Ident": "StiBandInteraction"
          },
          "Border": ";193,152,89;;;;;;solid:Black",
          "Brush": "solid:224,242,241",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Text23",
              "Guid": "095fcd018f0943f488d6d36f169bf4e4",
              "CanGrow": true,
              "GrowToHeight": true,
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "0,0,4,1.4",
              "ComponentStyle": "Header4",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Royal Mail 4 State"
              },
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "Font": ";12;;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:Black",
              "Type": "Expression"
            },
            "1": {
              "Ident": "StiText",
              "Name": "Text28",
              "Guid": "325b5bbb22114694918b86103dc8164d",
              "CanGrow": true,
              "GrowToHeight": true,
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "10,0,9,1.4",
              "ComponentStyle": "Data1",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "The Royal Mail 4-state Customer Code(RM4SCC) is a height-modulated barcode symbology for use in automated mail sort process."
              },
              "HorAlignment": "Width",
              "Font": ";10;;",
              "Border": ";182,182,182;;;;;;solid:Black",
              "Brush": "solid:0,0,0,0",
              "TextBrush": "solid:74,74,74",
              "TextOptions": {
                "WordWrap": true
              },
              "TextQuality": "Wysiwyg",
              "Type": "Expression"
            },
            "2": {
              "Ident": "StiBarCode",
              "Name": "BarCode22",
              "Guid": "5818f9d2128f42ffae5dfaf429fbe403",
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "4,0,6,1.4",
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
        "9": {
          "Ident": "StiDataBand",
          "Name": "DataBand27",
          "Guid": "7b241e36bfcf43fd96ed1a632bb50ad7",
          "ClientRectangle": "0,24.8,19,2.2",
          "ComponentStyle": "Data1",
          "Interaction": {
            "Ident": "StiBandInteraction"
          },
          "Border": ";182,182,182;;;;;;solid:Black",
          "Brush": "solid:0,0,0,0",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Text31",
              "Guid": "56ab1cde8fa84293bfaa11e2e2625b7c",
              "CanGrow": true,
              "GrowToHeight": true,
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "0,0,4,2.2",
              "ComponentStyle": "Header4",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Royal TPG Post KIX 4-State"
              },
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "Font": ";12;;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:Black",
              "Type": "Expression"
            },
            "1": {
              "Ident": "StiText",
              "Name": "Text75",
              "Guid": "0073a05b78e643d4ab7ac8f5de56ace9",
              "CanGrow": true,
              "GrowToHeight": true,
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "10,0,9,2.2",
              "ComponentStyle": "Data1",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "This symbology is used by Royal Dutch TPG Post (Netherlands) for Postal code and automatic mail sorting. It provides information about the address of the receiver. This symbology encodes alpha-numeric characters (0-9, A-Z)."
              },
              "HorAlignment": "Width",
              "Font": ";10;;",
              "Border": ";182,182,182;;;;;;solid:Black",
              "Brush": "solid:0,0,0,0",
              "TextBrush": "solid:74,74,74",
              "TextOptions": {
                "WordWrap": true
              },
              "TextQuality": "Wysiwyg",
              "Type": "Expression"
            },
            "2": {
              "Ident": "StiBarCode",
              "Name": "BarCode27",
              "Guid": "e4eec973a9e5418da36199b68290c943",
              "GrowToHeight": true,
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "4,0,6,2.2",
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
      "PageWidth": 21.0,
      "PageHeight": 29.7,
      "Watermark": {
        "TextBrush": "solid:50,0,0,0"
      },
      "Margins": {
        "Left": 1.0,
        "Right": 1.0,
        "Top": 1.0,
        "Bottom": 1.0
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
          "ClientRectangle": "0,0.4,19,1",
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
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "0,0,4,1",
              "ComponentStyle": "Header3",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Symbology"
              },
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "Font": ";16;;",
              "Border": ";182,182,182;;;;;;solid:Black",
              "Brush": "solid:77,182,172",
              "TextBrush": "solid:255,255,255",
              "Type": "Expression"
            },
            "1": {
              "Ident": "StiText",
              "Name": "Text98",
              "Guid": "8bec893ed7f04ae79dd6b5c4bf6afa18",
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "4,0,6,1",
              "ComponentStyle": "Header3",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Example"
              },
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "Font": ";16;;",
              "Border": ";182,182,182;;;;;;solid:Black",
              "Brush": "solid:77,182,172",
              "TextBrush": "solid:255,255,255",
              "Type": "Expression"
            },
            "2": {
              "Ident": "StiText",
              "Name": "Text99",
              "Guid": "8c7fd4626d8a4a91af277ca4de85d614",
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "10,0,9,1",
              "ComponentStyle": "Header3",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Description"
              },
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "Font": ";16;;",
              "Border": ";182,182,182;;;;;;solid:Black",
              "Brush": "solid:77,182,172",
              "TextBrush": "solid:255,255,255",
              "Type": "Expression"
            }
          }
        },
        "1": {
          "Ident": "StiPageFooterBand",
          "Name": "PageFooterBand6",
          "ClientRectangle": "0,32.44,19,0.8",
          "ComponentStyle": "Footer2",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Border": "Top;158,158,158;;;;;;solid:Black",
          "Brush": "solid:",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Text105",
              "Guid": "089ad486aa424c9ab836e3990a923863",
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "0,0,19,0.8",
              "ComponentStyle": "Footer2",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "{PageNofM}"
              },
              "HorAlignment": "Right",
              "VertAlignment": "Center",
              "Font": ";10;Bold;",
              "Border": ";158,158,158;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:158,158,158",
              "Type": "Expression"
            }
          }
        },
        "2": {
          "Ident": "StiDataBand",
          "Name": "DataBand28",
          "Guid": "acf88a5c095f4721a4a0b15ce2f36253",
          "ClientRectangle": "0,2.2,19,1.8",
          "ComponentStyle": "Data2",
          "Interaction": {
            "Ident": "StiBandInteraction"
          },
          "Border": ";193,152,89;;;;;;solid:Black",
          "Brush": "solid:224,242,241",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Text44",
              "Guid": "46ecb6d582ff4e929486d86800766221",
              "CanGrow": true,
              "GrowToHeight": true,
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "0,0,4,1.8",
              "ComponentStyle": "Header4",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "ITF 14"
              },
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "Font": ";12;;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:Black",
              "Type": "Expression"
            },
            "1": {
              "Ident": "StiText",
              "Name": "Text76",
              "Guid": "4052259fb28b4e8db90e1a79558982f4",
              "CanGrow": true,
              "GrowToHeight": true,
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "10,0,9,1.8",
              "ComponentStyle": "Data1",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "The ITF-14 bar-code was developed to encode a Global Trade Item Number. The ITF bar-code has the nominal size of  (152*44mm) and low requirements to the printing surface. Therefore, it can be printed not only on a label but directly onto a packing carton."
              },
              "HorAlignment": "Width",
              "Font": ";10;;",
              "Border": ";182,182,182;;;;;;solid:Black",
              "Brush": "solid:0,0,0,0",
              "TextBrush": "solid:74,74,74",
              "TextOptions": {
                "WordWrap": true
              },
              "TextQuality": "Wysiwyg",
              "Type": "Expression"
            },
            "2": {
              "Ident": "StiBarCode",
              "Name": "BarCode30",
              "Guid": "ff17703a64744368a15e272e872baa5c",
              "GrowToHeight": true,
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "4,0,6,1.8",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Border": ";;;;;;;solid:Black",
              "BackColor": "Transparent",
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "BarCodeType": {
                "Ident": "StiITF14BarCodeType",
                "Module": 10.0
              },
              "Code": {
                "Value": "15400141288763"
              }
            }
          },
          "EvenStyle": "Data2",
          "CountData": 1
        },
        "3": {
          "Ident": "StiDataBand",
          "Name": "DataBand29",
          "Guid": "0fe8dd58f6e04b16b35a97c76b7f59a6",
          "ClientRectangle": "0,4.8,19,8",
          "ComponentStyle": "Data1",
          "Interaction": {
            "Ident": "StiBandInteraction"
          },
          "Border": ";182,182,182;;;;;;solid:Black",
          "Brush": "solid:0,0,0,0",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Text29",
              "Guid": "65b777f5ddbe4f588ce82d837230527f",
              "CanGrow": true,
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "0,0,4,2",
              "ComponentStyle": "Header4",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "FIM A"
              },
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "Font": ";12;;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:Black",
              "Type": "Expression"
            },
            "1": {
              "Ident": "StiText",
              "Name": "Text89",
              "Guid": "b2ed825e58ed4b118348fc5b6b049284",
              "CanGrow": true,
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "10,0,9,8",
              "ComponentStyle": "Data1",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Facing Identification Mark (FIM) is the type of postal bar code used in automated mail processing by the U.S. Postal Service. FIM is a set of vertical bars. FIM patterns are placed in the upper right corner along the top edge and two inches in from the right edge of letters and cards."
              },
              "HorAlignment": "Width",
              "Font": ";10;;",
              "Border": ";182,182,182;;;;;;solid:Black",
              "Brush": "solid:0,0,0,0",
              "TextBrush": "solid:74,74,74",
              "TextOptions": {
                "WordWrap": true
              },
              "TextQuality": "Wysiwyg",
              "Type": "Expression"
            },
            "2": {
              "Ident": "StiText",
              "Name": "Text90",
              "Guid": "835f48a12f2e45c699b518573292dd47",
              "CanGrow": true,
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "0,2,4,2",
              "ComponentStyle": "Header4",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "FIM B"
              },
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "Font": ";12;;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:Black",
              "Type": "Expression"
            },
            "3": {
              "Ident": "StiText",
              "Name": "Text91",
              "Guid": "c18dc15ef1524f4d86167fb0098a3598",
              "CanGrow": true,
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "0,4,4,2",
              "ComponentStyle": "Header4",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "FIM C"
              },
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "Font": ";12;;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:Black",
              "Type": "Expression"
            },
            "4": {
              "Ident": "StiBarCode",
              "Name": "BarCode28",
              "Guid": "33cbc93185fb435fae29cc4cb8919f28",
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "6,0,1.8,2",
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
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "6,2,1.8,2",
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
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "6,4,1.8,2",
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
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "6,6,1.8,2",
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
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "0,6,4,2",
              "ComponentStyle": "Header4",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "FIM D"
              },
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "Font": ";12;;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:Black",
              "Type": "Expression"
            }
          },
          "EvenStyle": "Data2",
          "CountData": 1
        },
        "4": {
          "Ident": "StiDataBand",
          "Name": "DataBand30",
          "Guid": "160099c38d2b4cdcab1053180546afa7",
          "ClientRectangle": "0,13.6,19,2.2",
          "ComponentStyle": "Data2",
          "Interaction": {
            "Ident": "StiBandInteraction"
          },
          "Border": ";193,152,89;;;;;;solid:Black",
          "Brush": "solid:224,242,241",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Text26",
              "Guid": "dc63235c06bf43e4a92e9a7ca3aa6358",
              "CanGrow": true,
              "GrowToHeight": true,
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "0,0,4,2.2",
              "ComponentStyle": "Header4",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "DataMatrix"
              },
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "Font": ";12;;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:Black",
              "Type": "Expression"
            },
            "1": {
              "Ident": "StiText",
              "Name": "Text27",
              "Guid": "e178c89ab6b24c9dbb876054288f09a3",
              "CanGrow": true,
              "GrowToHeight": true,
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "10,0,9,2.2",
              "ComponentStyle": "Data1",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "The DataMatrix barcode was created by the CiMatrix company. Every DataMatrix is composed of two solid adjacent borders in an \"L\" shape (called the \"finder pattern\") and two other borders consisting of alternating dark and light \"cells\" or modules (called the \"timing pattern\"). Symbol sizes vary from 8×8 to 144×144. The DataMatrix is used to mark small products. Data Matrix symbols are rectangular in shape and usually square, they are made of cells: little elements that represent individual bits."
              },
              "HorAlignment": "Width",
              "Font": ";10;;",
              "Border": ";182,182,182;;;;;;solid:Black",
              "Brush": "solid:0,0,0,0",
              "TextBrush": "solid:74,74,74",
              "TextOptions": {
                "WordWrap": true
              },
              "TextQuality": "Wysiwyg",
              "Type": "Expression"
            },
            "2": {
              "Ident": "StiBarCode",
              "Name": "BarCode25",
              "Guid": "1482768564d046a3930cc1413313cd29",
              "GrowToHeight": true,
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "4,0,6,2.2",
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
        "5": {
          "Ident": "StiDataBand",
          "Name": "DataBand31",
          "Guid": "a5dafd06c3df44668daf23cb731eb640",
          "ClientRectangle": "0,16.6,19,3.2",
          "ComponentStyle": "Data1",
          "Interaction": {
            "Ident": "StiBandInteraction"
          },
          "Border": ";182,182,182;;;;;;solid:Black",
          "Brush": "solid:0,0,0,0",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Text33",
              "Guid": "80dfe58c145442a89868ca30d813afe3",
              "CanGrow": true,
              "GrowToHeight": true,
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "0,0,4,3.2",
              "ComponentStyle": "Header4",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "PDF417"
              },
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "Font": ";12;;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:Black",
              "Type": "Expression"
            },
            "1": {
              "Ident": "StiText",
              "Name": "Text34",
              "Guid": "53933e99fd654449bd06a0697d0bc0bb",
              "CanGrow": true,
              "GrowToHeight": true,
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "10,0,9,3.2",
              "ComponentStyle": "Data1",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "The PDF417 barcode was developed by Symbol Technologies in 1991. The name of the barcode consist of 2 parts. The PDF comes from Portable Data File. The 417 comes from the structure of the bar-code: each bar-code character consists of 17 modules, each of which consists of 4 bars and 1 space. PDF417 is a high density 2 dimensional bar code symbology that consists of a stacked set of smaller bar codes. Any ASCII characters can be encoded in this bar-code. The length of data depends on the encoding mode and can reach 1100 bytes, or 1800 text characters, or 2600 digits."
              },
              "HorAlignment": "Width",
              "Font": ";10;;",
              "Border": ";182,182,182;;;;;;solid:Black",
              "Brush": "solid:0,0,0,0",
              "TextBrush": "solid:74,74,74",
              "TextOptions": {
                "WordWrap": true
              },
              "TextQuality": "Wysiwyg",
              "Type": "Expression"
            },
            "2": {
              "Ident": "StiBarCode",
              "Name": "BarCode26",
              "Guid": "1e0d2d7e06244e298c75dae34a31e07e",
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "4,0,6,3.2",
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
        "6": {
          "Ident": "StiDataBand",
          "Name": "DataBand32",
          "Guid": "71a407f056424b43b41643984c184b3a",
          "ClientRectangle": "0,20.6,19,2.8",
          "ComponentStyle": "Data2",
          "Interaction": {
            "Ident": "StiBandInteraction"
          },
          "Border": ";193,152,89;;;;;;solid:Black",
          "Brush": "solid:224,242,241",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Text93",
              "Guid": "ee52280596f24865ad72edd8018cd7d0",
              "CanGrow": true,
              "GrowToHeight": true,
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "0,0,4,2.8",
              "ComponentStyle": "Header4",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "QR Code"
              },
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "Font": ";12;;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:Black",
              "Type": "Expression"
            },
            "1": {
              "Ident": "StiText",
              "Name": "Text94",
              "Guid": "1c554f2e9df34d72884ef1e2cdfa4d7f",
              "CanGrow": true,
              "GrowToHeight": true,
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "10,0,9,2.8",
              "ComponentStyle": "Data1",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "A QR Code (QR is the abbreviation for Quick Response) is a two-dimensional code, readable by QR scanners, mobile phones with a camera, and smartphones. It was created by Toyota subsidiary Denso-Wave in 1994."
              },
              "HorAlignment": "Width",
              "Font": ";10;;",
              "Border": ";182,182,182;;;;;;solid:Black",
              "Brush": "solid:0,0,0,0",
              "TextBrush": "solid:74,74,74",
              "TextOptions": {
                "WordWrap": true
              },
              "TextQuality": "Wysiwyg",
              "Type": "Expression"
            },
            "2": {
              "Ident": "StiBarCode",
              "Name": "BarCode32",
              "Guid": "75cf66cfaddc43ef903b89ba6fb22d54",
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "4,0,6,2.8",
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
            }
          },
          "CountData": 1
        }
      },
      "PrintOnPreviousPage": true,
      "PageWidth": 21.0,
      "PageHeight": 29.7,
      "Watermark": {
        "TextBrush": "solid:50,0,0,0"
      },
      "Margins": {
        "Left": 1.0,
        "Right": 1.0,
        "Top": 1.0,
        "Bottom": 1.0
      }
    }
  }
}