var Shapes = {
  "ReportVersion": "2019.1.1.0",
  "ReportGuid": "d7460560477743409a7701b053c3fff8",
  "ReportName": "Report",
  "ReportAlias": "Shapes",
  "ReportDescription": "The sample demonstrates how to create a report with shapes.",
  "ReportCreated": "/Date(1085828340000+0000)/",
  "ReportChanged": "/Date(1522752756000+0000)/",
  "EngineVersion": "EngineV2",
  "CalculationMode": "Interpretation",
  "PreviewMode": "StandardAndDotMatrix",
  "PreviewSettings": 33538047,
  "Script": "using System;\r\nusing System.Drawing;\r\nusing System.Windows.Forms;\r\nusing System.Data;\r\nusing Stimulsoft.Report;\r\nusing Stimulsoft.Report.Components;\r\nusing Stimulsoft.Base.Drawing;\r\n\r\nnamespace StiReports\r\n{\r\n    \r\n    public class Report : Stimulsoft.Report.StiReport\r\n    {\r\n        \r\n        public Report()\r\n        {\r\n            this.InitializeComponent();\r\n        }\r\n        \r\n        #region StiReport Designer generated code - do not modify\r\n\t\t#endregion StiReport Designer generated code - do not modify\r\n    }\r\n}",
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
      "Brush": "solid:26,160,148",
      "TextBrush": "solid:255,255,255",
      "NegativeTextBrush": "solid:Red",
      "AllowUseBorderSides": false
    },
    "5": {
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
    "6": {
      "Ident": "StiStyle",
      "CollectionName": "Style",
      "Name": "Data2",
      "Font": ";9;;",
      "Border": ";255,255,255;;;;;;solid:Black",
      "Brush": "solid:178,223,219",
      "TextBrush": "solid:0,0,0",
      "NegativeTextBrush": "solid:Red",
      "AllowUseFont": false,
      "AllowUseBorderFormatting": false,
      "AllowUseBorderSides": false,
      "AllowUseTextBrush": false
    },
    "7": {
      "Ident": "StiStyle",
      "CollectionName": "Style",
      "Name": "Data3",
      "VertAlignment": "Center",
      "Font": ";9;;",
      "Border": ";255,255,255;;;;;;solid:Black",
      "Brush": "solid:178,223,219",
      "TextBrush": "solid:0,0,0",
      "NegativeTextBrush": "solid:Red",
      "AllowUseBorderSides": false
    },
    "8": {
      "Ident": "StiStyle",
      "CollectionName": "Style",
      "Name": "Footer1",
      "VertAlignment": "Center",
      "Font": ";9;;",
      "Border": "Top;58,78,94;;;;;;solid:Black",
      "Brush": "solid:",
      "TextBrush": "solid:0,0,0",
      "NegativeTextBrush": "solid:Red",
      "AllowUseBorderSides": false
    },
    "9": {
      "Ident": "StiStyle",
      "CollectionName": "Style",
      "Name": "Footer2",
      "HorAlignment": "Right",
      "VertAlignment": "Center",
      "Font": ";12;Bold;",
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
      "Guid": "6f2b2cabb01546738f4e441fd2de86dc",
      "Interaction": {
        "Ident": "StiInteraction"
      },
      "Border": ";;2;;;;;solid:Black",
      "Brush": "solid:",
      "Components": {
        "0": {
          "Ident": "StiPageFooterBand",
          "Name": "PageFooterBand1",
          "ClientRectangle": "0,26.9,19,0.8",
          "ComponentStyle": "Footer2",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Border": "Top;158,158,158;;;;;;solid:Black",
          "Brush": "solid:",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Text1",
              "Guid": "75dfccbeae7543e1ab7fed675b02df83",
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
              "Font": ";12;Bold;",
              "Border": ";158,158,158;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:158,158,158",
              "Type": "Expression"
            }
          }
        },
        "1": {
          "Ident": "StiShape",
          "Name": "Shape1",
          "MinSize": "0,0",
          "MaxSize": "0,0",
          "ClientRectangle": "0.2,4,2.6,2.6",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Brush": "solid:178,235,242",
          "BorderColor": "Transparent",
          "Size": 3.0,
          "ShapeType": {
            "Ident": "StiRectangleShapeType"
          }
        },
        "2": {
          "Ident": "StiShape",
          "Name": "Shape3",
          "MinSize": "0,0",
          "MaxSize": "0,0",
          "ClientRectangle": "3.6,4,2.6,2.6",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Brush": "solid:128,222,234",
          "BorderColor": "Transparent",
          "Size": 3.0,
          "ShapeType": {
            "Ident": "StiRoundedRectangleShapeType"
          }
        },
        "3": {
          "Ident": "StiShape",
          "Name": "Shape2",
          "MinSize": "0,0",
          "MaxSize": "0,0",
          "ClientRectangle": "6.8,4,2.6,2.6",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Brush": "solid:77,208,225",
          "BorderColor": "Transparent",
          "ShapeType": {
            "Ident": "StiSnipSameSideCornerRectangleShapeType"
          }
        },
        "4": {
          "Ident": "StiShape",
          "Name": "Shape4",
          "MinSize": "0,0",
          "MaxSize": "0,0",
          "ClientRectangle": "10,4,2.6,2.6",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Brush": "solid:38,198,218",
          "BorderColor": "Transparent",
          "ShapeType": {
            "Ident": "StiFlowchartCardShapeType"
          }
        },
        "5": {
          "Ident": "StiShape",
          "Name": "Shape19",
          "MinSize": "0,0",
          "MaxSize": "0,0",
          "ClientRectangle": "13.2,4,2.6,2.6",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Brush": "solid:0,188,212",
          "BorderColor": "Transparent",
          "ShapeType": {
            "Ident": "StiSnipDiagonalSideCornerRectangleShapeType"
          }
        },
        "6": {
          "Ident": "StiShape",
          "Name": "Shape5",
          "MinSize": "0,0",
          "MaxSize": "0,0",
          "ClientRectangle": "0.2,7.4,2.6,2.6",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Brush": "solid:229,57,53",
          "BorderColor": "Transparent",
          "ShapeType": {
            "Ident": "StiOvalShapeType"
          }
        },
        "7": {
          "Ident": "StiShape",
          "Name": "Shape6",
          "MinSize": "0,0",
          "MaxSize": "0,0",
          "ClientRectangle": "3.6,7.4,2.6,2.6",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Brush": "solid:244,67,54",
          "BorderColor": "Transparent",
          "ShapeType": {
            "Ident": "StiTriangleShapeType"
          }
        },
        "8": {
          "Ident": "StiShape",
          "Name": "Shape7",
          "MinSize": "0,0",
          "MaxSize": "0,0",
          "ClientRectangle": "6.8,7.4,2.6,2.6",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Brush": "solid:239,83,80",
          "BorderColor": "Transparent",
          "ShapeType": {
            "Ident": "StiFlowchartDecisionShapeType"
          }
        },
        "9": {
          "Ident": "StiShape",
          "Name": "Shape8",
          "MinSize": "0,0",
          "MaxSize": "0,0",
          "ClientRectangle": "16.4,4,2.6,2.6",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Brush": "solid:0,172,193",
          "BorderColor": "Transparent",
          "ShapeType": {
            "Ident": "StiFlowchartManualInputShapeType"
          }
        },
        "10": {
          "Ident": "StiShape",
          "Name": "Shape9",
          "MinSize": "0,0",
          "MaxSize": "0,0",
          "ClientRectangle": "10,7.4,2.6,2.6",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Brush": "solid:229,115,115",
          "BorderColor": "Transparent",
          "ShapeType": {
            "Ident": "StiTriangleShapeType",
            "Direction": "Down"
          }
        },
        "11": {
          "Ident": "StiShape",
          "Name": "Shape10",
          "MinSize": "0,0",
          "MaxSize": "0,0",
          "ClientRectangle": "0.2,11,2.6,2.6",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Brush": "solid:220,237,200",
          "BorderColor": "Transparent",
          "ShapeType": {
            "Ident": "StiFlowchartOffPageConnectorShapeType",
            "Direction": "Down"
          }
        },
        "12": {
          "Ident": "StiShape",
          "Name": "Shape11",
          "MinSize": "0,0",
          "MaxSize": "0,0",
          "ClientRectangle": "3.6,11,2.6,2.6",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Brush": "solid:197,225,165",
          "BorderColor": "Transparent",
          "ShapeType": {
            "Ident": "StiFlowchartPreparationShapeType"
          }
        },
        "13": {
          "Ident": "StiShape",
          "Name": "Shape12",
          "MinSize": "0,0",
          "MaxSize": "0,0",
          "ClientRectangle": "6.8,11,2.6,2.6",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Brush": "solid:174,213,129",
          "BorderColor": "Transparent",
          "ShapeType": {
            "Ident": "StiRegularPentagonShapeType"
          }
        },
        "14": {
          "Ident": "StiShape",
          "Name": "Shape13",
          "MinSize": "0,0",
          "MaxSize": "0,0",
          "ClientRectangle": "10,11,2.6,2.6",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Brush": "solid:156,204,101",
          "BorderColor": "Transparent",
          "ShapeType": {
            "Ident": "StiTrapezoidShapeType"
          }
        },
        "15": {
          "Ident": "StiShape",
          "Name": "Shape14",
          "MinSize": "0,0",
          "MaxSize": "0,0",
          "ClientRectangle": "13.2,11,2.6,2.6",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Brush": "solid:139,195,74",
          "BorderColor": "Transparent",
          "ShapeType": {
            "Ident": "StiFlowchartSortShapeType"
          }
        },
        "16": {
          "Ident": "StiShape",
          "Name": "Shape15",
          "MinSize": "0,0",
          "MaxSize": "0,0",
          "ClientRectangle": "16.4,7.4,2.6,2.6",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Brush": "solid:255,205,210",
          "BorderColor": "Transparent",
          "ShapeType": {
            "Ident": "StiFrameShapeType"
          }
        },
        "17": {
          "Ident": "StiShape",
          "Name": "Shape16",
          "MinSize": "0,0",
          "MaxSize": "0,0",
          "ClientRectangle": "13.2,7.4,2.6,2.6",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Brush": "solid:239,154,154",
          "BorderColor": "Transparent",
          "ShapeType": {
            "Ident": "StiParallelogramShapeType"
          }
        },
        "18": {
          "Ident": "StiShape",
          "Name": "Shape17",
          "MinSize": "0,0",
          "MaxSize": "0,0",
          "ClientRectangle": "16.4,11,2.6,2.6",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Brush": "solid:124,179,66",
          "BorderColor": "Transparent",
          "ShapeType": {
            "Ident": "StiFlowchartCollateShapeType",
            "Direction": "Down"
          }
        },
        "19": {
          "Ident": "StiShape",
          "Name": "Shape18",
          "MinSize": "0,0",
          "MaxSize": "0,0",
          "ClientRectangle": "0.2,14.2,2.6,2.6",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Brush": "solid:142,36,170",
          "BorderColor": "Transparent",
          "ShapeType": {
            "Ident": "StiArrowShapeType",
            "Direction": "Left"
          }
        },
        "20": {
          "Ident": "StiShape",
          "Name": "Shape20",
          "MinSize": "0,0",
          "MaxSize": "0,0",
          "ClientRectangle": "3.6,14.2,2.6,2.6",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Brush": "solid:156,39,176",
          "BorderColor": "Transparent",
          "ShapeType": {
            "Ident": "StiArrowShapeType"
          }
        },
        "21": {
          "Ident": "StiShape",
          "Name": "Shape21",
          "MinSize": "0,0",
          "MaxSize": "0,0",
          "ClientRectangle": "6.8,14.2,2.6,2.6",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Brush": "solid:171,71,188",
          "BorderColor": "Transparent",
          "ShapeType": {
            "Ident": "StiArrowShapeType",
            "Direction": "Right"
          }
        },
        "22": {
          "Ident": "StiShape",
          "Name": "Shape22",
          "MinSize": "0,0",
          "MaxSize": "0,0",
          "ClientRectangle": "9.8,14.2,2.6,2.6",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Brush": "solid:186,104,200",
          "BorderColor": "Transparent",
          "ShapeType": {
            "Ident": "StiArrowShapeType",
            "Direction": "Down"
          }
        },
        "23": {
          "Ident": "StiShape",
          "Name": "Shape24",
          "MinSize": "0,0",
          "MaxSize": "0,0",
          "ClientRectangle": "16.4,14.2,2.6,2.6",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Brush": "solid:225,190,231",
          "BorderColor": "Transparent",
          "ShapeType": {
            "Ident": "StiComplexArrowShapeType",
            "Direction": "Up"
          }
        },
        "24": {
          "Ident": "StiShape",
          "Name": "Shape25",
          "MinSize": "0,0",
          "MaxSize": "0,0",
          "ClientRectangle": "0.2,17.8,2.6,2.6",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Brush": "solid:250,206,170",
          "BorderColor": "Transparent",
          "ShapeType": {
            "Ident": "StiPlusShapeType"
          }
        },
        "25": {
          "Ident": "StiShape",
          "Name": "Shape26",
          "MinSize": "0,0",
          "MaxSize": "0,0",
          "ClientRectangle": "3.6,17.8,2.6,2.6",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Brush": "solid:250,206,170",
          "BorderColor": "Transparent",
          "ShapeType": {
            "Ident": "StiMinusShapeType"
          }
        },
        "26": {
          "Ident": "StiShape",
          "Name": "Shape27",
          "MinSize": "0,0",
          "MaxSize": "0,0",
          "ClientRectangle": "6.8,17.8,2.6,2.6",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Brush": "solid:247,181,128",
          "BorderColor": "Transparent",
          "ShapeType": {
            "Ident": "StiMultiplyShapeType"
          }
        },
        "27": {
          "Ident": "StiShape",
          "Name": "Shape28",
          "MinSize": "0,0",
          "MaxSize": "0,0",
          "ClientRectangle": "10,17.8,2.6,2.6",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Brush": "solid:247,181,128",
          "BorderColor": "Transparent",
          "ShapeType": {
            "Ident": "StiDivisionShapeType"
          }
        },
        "28": {
          "Ident": "StiShape",
          "Name": "Shape29",
          "MinSize": "0,0",
          "MaxSize": "0,0",
          "ClientRectangle": "13.2,17.8,2.6,2.6",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Brush": "solid:183,117,64",
          "BorderColor": "Transparent",
          "ShapeType": {
            "Ident": "StiEqualShapeType"
          }
        },
        "29": {
          "Ident": "StiShape",
          "Name": "Shape30",
          "MinSize": "0,0",
          "MaxSize": "0,0",
          "ClientRectangle": "16.4,17.8,2.6,2.6",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Brush": "solid:183,117,64",
          "BorderColor": "Transparent",
          "ShapeType": {
            "Ident": "StiBentArrowShapeType"
          }
        },
        "30": {
          "Ident": "StiShape",
          "Name": "Shape31",
          "MinSize": "0,0",
          "MaxSize": "0,0",
          "ClientRectangle": "13.2,14.2,2.6,2.6",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Brush": "solid:206,147,216",
          "BorderColor": "Transparent",
          "ShapeType": {
            "Ident": "StiChevronShapeType"
          }
        },
        "31": {
          "Ident": "StiReportTitleBand",
          "Name": "ReportTitleBand2",
          "Guid": "1127d071d9be434e80a3ea6e1dbf542e",
          "ClientRectangle": "0,0.4,19,2.6",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Border": ";;;;;;;solid:Black",
          "Brush": "solid:",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Text17",
              "Guid": "c8f457d430be4bd1af6565fa99f4cde5",
              "CanGrow": true,
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "0,1.6,14.2,0.8",
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
              "TextOptions": {
                "WordWrap": true
              },
              "Type": "Expression"
            },
            "1": {
              "Ident": "StiText",
              "Name": "Text18",
              "Guid": "4f76817837374685b9df1f5421bb4cda",
              "CanGrow": true,
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "14.2,1.6,4.8,0.8",
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
              "TextOptions": {
                "WordWrap": true
              },
              "Type": "Expression"
            },
            "2": {
              "Ident": "StiText",
              "Name": "Text20",
              "Guid": "718236e7024c44edaa517cc8aec0eefb",
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
              "Border": ";0,0,0,0;;;;;;solid:Black",
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
              "Name": "Text23",
              "Guid": "4beff844a0b8434c8e52dc3897d07cff",
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "0.6,0.2,9.4,1",
              "ComponentStyle": "Title1",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Shapes"
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
        }
      },
      "PaperSize": "A4",
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