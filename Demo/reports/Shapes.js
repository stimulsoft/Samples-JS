var Shapes = {
  "ReportVersion": "2021.3.4.0",
  "ReportGuid": "e54e645a164d47aa98ee831e136ed236",
  "ReportName": "Report",
  "ReportAlias": "Shapes",
  "ReportAuthor": "Stimulsoft",
  "ReportDescription": "This example demonstrates how to use shapes.",
  "ReportCreated": "/Date(1085813940000+0400)/",
  "ReportChanged": "/Date(1550335822000+0300)/",
  "EngineVersion": "EngineV2",
  "CalculationMode": "Interpretation",
  "ReportUnit": "HundredthsOfInch",
  "PreviewMode": "StandardAndDotMatrix",
  "PreviewSettings": 25149439,
  "Script": "using System;\r\nusing System.Drawing;\r\nusing System.Windows.Forms;\r\nusing System.Data;\r\nusing Stimulsoft.Report;\r\nusing Stimulsoft.Report.Components;\r\nusing Stimulsoft.Base.Drawing;\r\n\r\nnamespace StiReports\r\n{\r\n    \r\n    public class Report : Stimulsoft.Report.StiReport\r\n    {\r\n        \r\n        public Report()\r\n        {\r\n            this.InitializeComponent();\r\n        }\r\n        \r\n        #region StiReport Designer generated code - do not modify\r\n\t\t#endregion StiReport Designer generated code - do not modify\r\n    }\r\n}",
  "Styles": {
    "0": {
      "Ident": "StiStyle",
      "CollectionName": "Green",
      "Name": "Green1",
      "VertAlignment": "Center",
      "Font": "Segoe UI;9.75;;",
      "Border": ";182,182,182;;;;;;solid:Black",
      "Brush": "solid:115,172,142",
      "TextBrush": "solid:White",
      "NegativeTextBrush": "solid:Red",
      "AllowUseFont": false,
      "AllowUseBorderFormatting": false,
      "AllowUseBorderSides": false
    },
    "1": {
      "Ident": "StiStyle",
      "CollectionName": "Green",
      "Name": "Green2",
      "VertAlignment": "Center",
      "Font": "Segoe UI;9.75;;",
      "Border": ";182,182,182;;;;;;solid:Black",
      "Brush": "solid:97,129,112",
      "TextBrush": "solid:White",
      "NegativeTextBrush": "solid:Red",
      "AllowUseFont": false,
      "AllowUseBorderFormatting": false,
      "AllowUseBorderSides": false
    },
    "2": {
      "Ident": "StiStyle",
      "CollectionName": "Green",
      "Name": "Green3",
      "VertAlignment": "Center",
      "Font": "Segoe UI;9.75;;",
      "Border": ";182,182,182;;;;;;solid:Black",
      "Brush": "solid:37,112,72",
      "TextBrush": "solid:White",
      "NegativeTextBrush": "solid:Red",
      "AllowUseFont": false,
      "AllowUseBorderFormatting": false,
      "AllowUseBorderSides": false
    },
    "3": {
      "Ident": "StiStyle",
      "CollectionName": "Green",
      "Name": "Green4",
      "VertAlignment": "Center",
      "Font": "Segoe UI;9.75;;",
      "Border": ";182,182,182;;;;;;solid:Black",
      "Brush": "solid:160,214,185",
      "TextBrush": "solid:White",
      "NegativeTextBrush": "solid:Red",
      "AllowUseFont": false,
      "AllowUseBorderFormatting": false,
      "AllowUseBorderSides": false
    },
    "4": {
      "Ident": "StiStyle",
      "CollectionName": "Green",
      "Name": "Green5",
      "VertAlignment": "Center",
      "Font": "Segoe UI;9.75;;",
      "Border": ";182,182,182;;;;;;solid:Black",
      "Brush": "solid:175,214,193",
      "TextBrush": "solid:White",
      "NegativeTextBrush": "solid:Red",
      "AllowUseFont": false,
      "AllowUseBorderFormatting": false,
      "AllowUseBorderSides": false
    },
    "5": {
      "Ident": "StiStyle",
      "CollectionName": "Red",
      "Name": "Red1",
      "VertAlignment": "Center",
      "Font": "Segoe UI;9.75;;",
      "Border": ";182,182,182;;;;;;solid:Black",
      "Brush": "solid:201,63,66",
      "TextBrush": "solid:White",
      "NegativeTextBrush": "solid:Red",
      "AllowUseFont": false,
      "AllowUseBorderFormatting": false,
      "AllowUseBorderSides": false
    },
    "6": {
      "Ident": "StiStyle",
      "CollectionName": "Red",
      "Name": "Red2",
      "VertAlignment": "Center",
      "Font": "Segoe UI;9.75;;",
      "Border": ";182,182,182;;;;;;solid:Black",
      "Brush": "solid:151,73,75",
      "TextBrush": "solid:White",
      "NegativeTextBrush": "solid:Red",
      "AllowUseFont": false,
      "AllowUseBorderFormatting": false,
      "AllowUseBorderSides": false
    },
    "7": {
      "Ident": "StiStyle",
      "CollectionName": "Red",
      "Name": "Red3",
      "VertAlignment": "Center",
      "Font": "Segoe UI;9.75;;",
      "Border": ";182,182,182;;;;;;solid:Black",
      "Brush": "solid:131,20,23",
      "TextBrush": "solid:White",
      "NegativeTextBrush": "solid:Red",
      "AllowUseFont": false,
      "AllowUseBorderFormatting": false,
      "AllowUseBorderSides": false
    },
    "8": {
      "Ident": "StiStyle",
      "CollectionName": "Red",
      "Name": "Red4",
      "VertAlignment": "Center",
      "Font": "Segoe UI;9.75;;",
      "Border": ";182,182,182;;;;;;solid:Black",
      "Brush": "solid:228,111,114",
      "TextBrush": "solid:White",
      "NegativeTextBrush": "solid:Red",
      "AllowUseFont": false,
      "AllowUseBorderFormatting": false,
      "AllowUseBorderSides": false
    },
    "9": {
      "Ident": "StiStyle",
      "CollectionName": "Red",
      "Name": "Red5",
      "VertAlignment": "Center",
      "Font": "Segoe UI;9.75;;",
      "Border": ";182,182,182;;;;;;solid:Black",
      "Brush": "solid:228,142,144",
      "TextBrush": "solid:White",
      "NegativeTextBrush": "solid:Red",
      "AllowUseFont": false,
      "AllowUseBorderFormatting": false,
      "AllowUseBorderSides": false
    },
    "10": {
      "Ident": "StiStyle",
      "CollectionName": "Yellow",
      "Name": "Yellow1",
      "VertAlignment": "Center",
      "Font": "Segoe UI;9.75;;",
      "Border": ";182,182,182;;;;;;solid:Black",
      "Brush": "solid:226,189,90",
      "TextBrush": "solid:White",
      "NegativeTextBrush": "solid:Red",
      "AllowUseFont": false,
      "AllowUseBorderFormatting": false,
      "AllowUseBorderSides": false
    },
    "11": {
      "Ident": "StiStyle",
      "CollectionName": "Yellow",
      "Name": "Yellow2",
      "VertAlignment": "Center",
      "Font": "Segoe UI;9.75;;",
      "Border": ";182,182,182;;;;;;solid:Black",
      "Brush": "solid:170,149,93",
      "TextBrush": "solid:White",
      "NegativeTextBrush": "solid:Red",
      "AllowUseFont": false,
      "AllowUseBorderFormatting": false,
      "AllowUseBorderSides": false
    },
    "12": {
      "Ident": "StiStyle",
      "CollectionName": "Yellow",
      "Name": "Yellow3",
      "VertAlignment": "Center",
      "Font": "Segoe UI;9.75;;",
      "Border": ";182,182,182;;;;;;solid:Black",
      "Brush": "solid:147,115,29",
      "TextBrush": "solid:White",
      "NegativeTextBrush": "solid:Red",
      "AllowUseFont": false,
      "AllowUseBorderFormatting": false,
      "AllowUseBorderSides": false
    },
    "13": {
      "Ident": "StiStyle",
      "CollectionName": "Yellow",
      "Name": "Yellow4",
      "VertAlignment": "Center",
      "Font": "Segoe UI;9.75;;",
      "Border": ";182,182,182;;;;;;solid:Black",
      "Brush": "solid:241,211,132",
      "TextBrush": "solid:White",
      "NegativeTextBrush": "solid:Red",
      "AllowUseFont": false,
      "AllowUseBorderFormatting": false,
      "AllowUseBorderSides": false
    },
    "14": {
      "Ident": "StiStyle",
      "CollectionName": "Yellow",
      "Name": "Yellow5",
      "VertAlignment": "Center",
      "Font": "Segoe UI;9.75;;",
      "Border": ";182,182,182;;;;;;solid:Black",
      "Brush": "solid:241,219,161",
      "TextBrush": "solid:White",
      "NegativeTextBrush": "solid:Red",
      "AllowUseFont": false,
      "AllowUseBorderFormatting": false,
      "AllowUseBorderSides": false
    },
    "15": {
      "Ident": "StiStyle",
      "CollectionName": "Blue",
      "Name": "Blue1",
      "VertAlignment": "Center",
      "Font": "Segoe UI;9.75;;",
      "Border": ";182,182,182;;;;;;solid:Black",
      "Brush": "solid:68,160,208",
      "TextBrush": "solid:White",
      "NegativeTextBrush": "solid:Red",
      "AllowUseFont": false,
      "AllowUseBorderFormatting": false,
      "AllowUseBorderSides": false
    },
    "16": {
      "Ident": "StiStyle",
      "CollectionName": "Blue",
      "Name": "Blue2",
      "VertAlignment": "Center",
      "Font": "Segoe UI;9.75;;",
      "Border": ";182,182,182;;;;;;solid:Black",
      "Brush": "solid:77,128,156",
      "TextBrush": "solid:White",
      "NegativeTextBrush": "solid:Red",
      "AllowUseFont": false,
      "AllowUseBorderFormatting": false,
      "AllowUseBorderSides": false
    },
    "17": {
      "Ident": "StiStyle",
      "CollectionName": "Blue",
      "Name": "Blue3",
      "VertAlignment": "Center",
      "Font": "Segoe UI;9.75;;",
      "Border": ";182,182,182;;;;;;solid:Black",
      "Brush": "solid:22,96,135",
      "TextBrush": "solid:White",
      "NegativeTextBrush": "solid:Red",
      "AllowUseFont": false,
      "AllowUseBorderFormatting": false,
      "AllowUseBorderSides": false
    },
    "18": {
      "Ident": "StiStyle",
      "CollectionName": "Blue",
      "Name": "Blue4",
      "VertAlignment": "Center",
      "Font": "Segoe UI;9.75;;",
      "Border": ";182,182,182;;;;;;solid:Black",
      "Brush": "solid:115,191,232",
      "TextBrush": "solid:White",
      "NegativeTextBrush": "solid:Red",
      "AllowUseFont": false,
      "AllowUseBorderFormatting": false,
      "AllowUseBorderSides": false
    },
    "19": {
      "Ident": "StiStyle",
      "CollectionName": "Blue",
      "Name": "Blue5",
      "VertAlignment": "Center",
      "Font": "Segoe UI;9.75;;",
      "Border": ";182,182,182;;;;;;solid:Black",
      "Brush": "solid:146,202,232",
      "TextBrush": "solid:White",
      "NegativeTextBrush": "solid:Red",
      "AllowUseFont": false,
      "AllowUseBorderFormatting": false,
      "AllowUseBorderSides": false
    },
    "20": {
      "Ident": "StiStyle",
      "CollectionName": "Violet",
      "Name": "Violet1",
      "VertAlignment": "Center",
      "Font": "Segoe UI;9.75;;",
      "Border": ";182,182,182;;;;;;solid:Black",
      "Brush": "solid:147,119,175",
      "TextBrush": "solid:White",
      "NegativeTextBrush": "solid:Red",
      "AllowUseFont": false,
      "AllowUseBorderFormatting": false,
      "AllowUseBorderSides": false
    },
    "21": {
      "Ident": "StiStyle",
      "CollectionName": "Violet",
      "Name": "Violet2",
      "VertAlignment": "Center",
      "Font": "Segoe UI;9.75;;",
      "Border": ";182,182,182;;;;;;solid:Black",
      "Brush": "solid:115,100,131",
      "TextBrush": "solid:White",
      "NegativeTextBrush": "solid:Red",
      "AllowUseFont": false,
      "AllowUseBorderFormatting": false,
      "AllowUseBorderSides": false
    },
    "22": {
      "Ident": "StiStyle",
      "CollectionName": "Violet",
      "Name": "Violet3",
      "VertAlignment": "Center",
      "Font": "Segoe UI;9.75;;",
      "Border": ";182,182,182;;;;;;solid:Black",
      "Brush": "solid:76,39,114",
      "TextBrush": "solid:White",
      "NegativeTextBrush": "solid:Red",
      "AllowUseFont": false,
      "AllowUseBorderFormatting": false,
      "AllowUseBorderSides": false
    },
    "23": {
      "Ident": "StiStyle",
      "CollectionName": "Violet",
      "Name": "Violet4",
      "VertAlignment": "Center",
      "Font": "Segoe UI;9.75;;",
      "Border": ";182,182,182;;;;;;solid:Black",
      "Brush": "solid:189,163,215",
      "TextBrush": "solid:White",
      "NegativeTextBrush": "solid:Red",
      "AllowUseFont": false,
      "AllowUseBorderFormatting": false,
      "AllowUseBorderSides": false
    },
    "24": {
      "Ident": "StiStyle",
      "CollectionName": "Violet",
      "Name": "Violet5",
      "VertAlignment": "Center",
      "Font": "Segoe UI;9.75;;",
      "Border": ";182,182,182;;;;;;solid:Black",
      "Brush": "solid:196,177,215",
      "TextBrush": "solid:White",
      "NegativeTextBrush": "solid:Red",
      "AllowUseFont": false,
      "AllowUseBorderFormatting": false,
      "AllowUseBorderSides": false
    },
    "25": {
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
    "26": {
      "Ident": "StiStyle",
      "Name": "Footer",
      "Font": "Segoe UI;9.75;;",
      "Border": ";58,78,94;;;;;;solid:Black",
      "Brush": "solid:",
      "TextBrush": "solid:158,158,158",
      "NegativeTextBrush": "solid:Red"
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
          "Guid": "88310e77518043bc9e4b0fac9aa4c91d",
          "ClientRectangle": "0,1071,749,20",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Border": ";;;;;;;solid:Black",
          "Brush": "solid:",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Text6",
              "Guid": "27df6ecd8ec849c2bb2653dcbf60a510",
              "ClientRectangle": "0,0,749,20",
              "ComponentStyle": "Footer",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "{PageNofM}"
              },
              "HorAlignment": "Right",
              "VertAlignment": "Center",
              "Font": "Segoe UI;9.75;;",
              "Border": ";58,78,94;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:158,158,158"
            }
          }
        },
        "1": {
          "Ident": "StiShape",
          "Name": "Shape5",
          "ClientRectangle": "10,220,100,100",
          "ComponentStyle": "Red1",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Brush": "solid:201,63,66",
          "BorderColor": "Transparent",
          "ShapeType": {
            "Ident": "StiOvalShapeType"
          }
        },
        "2": {
          "Ident": "StiShape",
          "Name": "Shape6",
          "ClientRectangle": "130,220,100,100",
          "ComponentStyle": "Red4",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Brush": "solid:228,111,114",
          "BorderColor": "Transparent",
          "ShapeType": {
            "Ident": "StiTriangleShapeType"
          }
        },
        "3": {
          "Ident": "StiShape",
          "Name": "Shape7",
          "ClientRectangle": "260,220,100,100",
          "ComponentStyle": "Red2",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Brush": "solid:151,73,75",
          "BorderColor": "Transparent",
          "ShapeType": {
            "Ident": "StiFlowchartDecisionShapeType"
          }
        },
        "4": {
          "Ident": "StiShape",
          "Name": "Shape9",
          "ClientRectangle": "390,220,100,100",
          "ComponentStyle": "Red5",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Brush": "solid:228,142,144",
          "BorderColor": "Transparent",
          "ShapeType": {
            "Ident": "StiTriangleShapeType",
            "Direction": "Down"
          }
        },
        "5": {
          "Ident": "StiShape",
          "Name": "Shape10",
          "ClientRectangle": "10,360,100,100",
          "ComponentStyle": "Yellow1",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Brush": "solid:226,189,90",
          "BorderColor": "Transparent",
          "ShapeType": {
            "Ident": "StiFlowchartOffPageConnectorShapeType",
            "Direction": "Down"
          }
        },
        "6": {
          "Ident": "StiShape",
          "Name": "Shape11",
          "ClientRectangle": "130,360,100,100",
          "ComponentStyle": "Yellow2",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Brush": "solid:170,149,93",
          "BorderColor": "Transparent",
          "ShapeType": {
            "Ident": "StiFlowchartPreparationShapeType"
          }
        },
        "7": {
          "Ident": "StiShape",
          "Name": "Shape12",
          "ClientRectangle": "260,360,100,100",
          "ComponentStyle": "Yellow4",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Brush": "solid:241,211,132",
          "BorderColor": "Transparent",
          "ShapeType": {
            "Ident": "StiRegularPentagonShapeType"
          }
        },
        "8": {
          "Ident": "StiShape",
          "Name": "Shape13",
          "ClientRectangle": "390,360,100,100",
          "ComponentStyle": "Yellow3",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Brush": "solid:147,115,29",
          "BorderColor": "Transparent",
          "ShapeType": {
            "Ident": "StiTrapezoidShapeType"
          }
        },
        "9": {
          "Ident": "StiShape",
          "Name": "Shape14",
          "ClientRectangle": "510,360,100,100",
          "ComponentStyle": "Yellow5",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Brush": "solid:241,219,161",
          "BorderColor": "Transparent",
          "ShapeType": {
            "Ident": "StiFlowchartSortShapeType"
          }
        },
        "10": {
          "Ident": "StiShape",
          "Name": "Shape15",
          "ClientRectangle": "640,220,100,100",
          "ComponentStyle": "Red1",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Brush": "solid:201,63,66",
          "BorderColor": "Transparent",
          "ShapeType": {
            "Ident": "StiFrameShapeType"
          }
        },
        "11": {
          "Ident": "StiShape",
          "Name": "Shape16",
          "ClientRectangle": "510,220,100,100",
          "ComponentStyle": "Red3",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Brush": "solid:131,20,23",
          "BorderColor": "Transparent",
          "ShapeType": {
            "Ident": "StiParallelogramShapeType"
          }
        },
        "12": {
          "Ident": "StiShape",
          "Name": "Shape17",
          "ClientRectangle": "640,360,100,100",
          "ComponentStyle": "Yellow1",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Brush": "solid:226,189,90",
          "BorderColor": "Transparent",
          "ShapeType": {
            "Ident": "StiFlowchartCollateShapeType",
            "Direction": "Down"
          }
        },
        "13": {
          "Ident": "StiShape",
          "Name": "Shape18",
          "ClientRectangle": "10,500,100,100",
          "ComponentStyle": "Blue1",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Brush": "solid:68,160,208",
          "BorderColor": "Transparent",
          "ShapeType": {
            "Ident": "StiArrowShapeType",
            "Direction": "Left"
          }
        },
        "14": {
          "Ident": "StiShape",
          "Name": "Shape20",
          "ClientRectangle": "130,500,100,100",
          "ComponentStyle": "Blue2",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Brush": "solid:77,128,156",
          "BorderColor": "Transparent",
          "ShapeType": {
            "Ident": "StiArrowShapeType"
          }
        },
        "15": {
          "Ident": "StiShape",
          "Name": "Shape21",
          "ClientRectangle": "260,500,100,100",
          "ComponentStyle": "Blue4",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Brush": "solid:115,191,232",
          "BorderColor": "Transparent",
          "ShapeType": {
            "Ident": "StiArrowShapeType",
            "Direction": "Right"
          }
        },
        "16": {
          "Ident": "StiShape",
          "Name": "Shape22",
          "ClientRectangle": "390,500,100,100",
          "ComponentStyle": "Blue3",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Brush": "solid:22,96,135",
          "BorderColor": "Transparent",
          "ShapeType": {
            "Ident": "StiArrowShapeType",
            "Direction": "Down"
          }
        },
        "17": {
          "Ident": "StiShape",
          "Name": "Shape24",
          "ClientRectangle": "630,500,120,100",
          "ComponentStyle": "Blue1",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Brush": "solid:68,160,208",
          "BorderColor": "Transparent",
          "ShapeType": {
            "Ident": "StiComplexArrowShapeType"
          }
        },
        "18": {
          "Ident": "StiShape",
          "Name": "Shape25",
          "ClientRectangle": "10,640,100,100",
          "ComponentStyle": "Violet1",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Brush": "solid:147,119,175",
          "BorderColor": "Transparent",
          "ShapeType": {
            "Ident": "StiPlusShapeType"
          }
        },
        "19": {
          "Ident": "StiShape",
          "Name": "Shape26",
          "ClientRectangle": "130,640,100,100",
          "ComponentStyle": "Violet2",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Brush": "solid:115,100,131",
          "BorderColor": "Transparent",
          "ShapeType": {
            "Ident": "StiMinusShapeType"
          }
        },
        "20": {
          "Ident": "StiShape",
          "Name": "Shape27",
          "ClientRectangle": "260,640,100,100",
          "ComponentStyle": "Violet4",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Brush": "solid:189,163,215",
          "BorderColor": "Transparent",
          "ShapeType": {
            "Ident": "StiMultiplyShapeType"
          }
        },
        "21": {
          "Ident": "StiShape",
          "Name": "Shape28",
          "ClientRectangle": "390,640,100,100",
          "ComponentStyle": "Violet3",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Brush": "solid:76,39,114",
          "BorderColor": "Transparent",
          "ShapeType": {
            "Ident": "StiDivisionShapeType"
          }
        },
        "22": {
          "Ident": "StiShape",
          "Name": "Shape29",
          "ClientRectangle": "510,640,100,100",
          "ComponentStyle": "Violet5",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Brush": "solid:196,177,215",
          "BorderColor": "Transparent",
          "ShapeType": {
            "Ident": "StiEqualShapeType"
          }
        },
        "23": {
          "Ident": "StiShape",
          "Name": "Shape30",
          "ClientRectangle": "640,640,100,100",
          "ComponentStyle": "Violet1",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Brush": "solid:147,119,175",
          "BorderColor": "Transparent",
          "ShapeType": {
            "Ident": "StiBentArrowShapeType"
          }
        },
        "24": {
          "Ident": "StiShape",
          "Name": "Shape31",
          "ClientRectangle": "510,500,100,100",
          "ComponentStyle": "Blue5",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Brush": "solid:146,202,232",
          "BorderColor": "Transparent",
          "ShapeType": {
            "Ident": "StiChevronShapeType"
          }
        },
        "25": {
          "Ident": "StiShape",
          "Name": "Shape1",
          "ClientRectangle": "10,90,100,100",
          "ComponentStyle": "Green1",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Brush": "solid:115,172,142",
          "BorderColor": "Transparent",
          "Size": 3.0,
          "ShapeType": {
            "Ident": "StiRectangleShapeType"
          }
        },
        "26": {
          "Ident": "StiShape",
          "Name": "Shape3",
          "ClientRectangle": "130,90,100,100",
          "ComponentStyle": "Green2",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Brush": "solid:97,129,112",
          "BorderColor": "Transparent",
          "Size": 3.0,
          "ShapeType": {
            "Ident": "StiRoundedRectangleShapeType"
          }
        },
        "27": {
          "Ident": "StiShape",
          "Name": "Shape2",
          "ClientRectangle": "260,90,100,100",
          "ComponentStyle": "Green4",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Brush": "solid:160,214,185",
          "BorderColor": "Transparent",
          "ShapeType": {
            "Ident": "StiSnipSameSideCornerRectangleShapeType"
          }
        },
        "28": {
          "Ident": "StiShape",
          "Name": "Shape4",
          "ClientRectangle": "390,90,100,100",
          "ComponentStyle": "Green3",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Brush": "solid:37,112,72",
          "BorderColor": "Transparent",
          "ShapeType": {
            "Ident": "StiFlowchartCardShapeType"
          }
        },
        "29": {
          "Ident": "StiShape",
          "Name": "Shape19",
          "ClientRectangle": "510,90,100,100",
          "ComponentStyle": "Green5",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Brush": "solid:175,214,193",
          "BorderColor": "Transparent",
          "ShapeType": {
            "Ident": "StiSnipDiagonalSideCornerRectangleShapeType"
          }
        },
        "30": {
          "Ident": "StiShape",
          "Name": "Shape8",
          "ClientRectangle": "640,90,100,100",
          "ComponentStyle": "Green1",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Brush": "solid:115,172,142",
          "BorderColor": "Transparent",
          "ShapeType": {
            "Ident": "StiFlowchartManualInputShapeType"
          }
        },
        "31": {
          "Ident": "StiReportTitleBand",
          "Name": "ReportTitleBand2",
          "Guid": "1127d071d9be434e80a3ea6e1dbf542e",
          "ClientRectangle": "0,20,749,60",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Border": ";;;;;;;solid:Black",
          "Brush": "solid:",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Text20",
              "Guid": "c5e150d59a81471788ac67e868919bde",
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
              "Name": "Text23",
              "Guid": "df68c258ca7841dc8a0ac5641b5a28b9",
              "ClientRectangle": "0,0,570,40",
              "ComponentStyle": "Header2",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Shapes"
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
              "Name": "Text17",
              "Guid": "18d08c97bc274503bc727e82e0814fae",
              "CanGrow": true,
              "ClientRectangle": "0,40,570,20",
              "ComponentStyle": "Footer",
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
              "Name": "Text18",
              "Guid": "8499eda182e74a5ab2015fdf8af8b4a7",
              "CanGrow": true,
              "ClientRectangle": "570,40,179,20",
              "ComponentStyle": "Footer",
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
        }
      },
      "PaperSize": "A4",
      "Watermark": {
        "TextBrush": "solid:50,0,0,0"
      }
    }
  }
}