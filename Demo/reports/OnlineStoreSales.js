var OnlineStoreSales = {
  "ReportVersion": "2015.1.20",
  "ReportGuid": "344680ba92c84de696fc55a62c7f33e0",
  "ReportName": "Report",
  "ReportAlias": "Report",
  "ReportCreated": "/Date(1435798583000+0300)/",
  "ReportChanged": "/Date(1435865082000+0300)/",
  "EngineVersion": "EngineV2",
  "ReportUnit": "Inches",
  "Script": "using System;\r\nusing System.Drawing;\r\nusing System.Windows.Forms;\r\nusing System.Data;\r\nusing Stimulsoft.Controls;\r\nusing Stimulsoft.Base.Drawing;\r\nusing Stimulsoft.Report;\r\nusing Stimulsoft.Report.Dialogs;\r\nusing Stimulsoft.Report.Components;\r\n\r\nnamespace Reports\r\n{\r\n    public class Report : Stimulsoft.Report.StiReport\r\n    {\r\n        public Report()        {\r\n            this.InitializeComponent();\r\n        }\r\n\r\n        #region StiReport Designer generated code - do not modify\r\n\t\t#endregion StiReport Designer generated code - do not modify\r\n    }\r\n}\r\n",
  "ReferencedAssemblies": {
    "0": "System.Dll",
    "1": "System.Drawing.Dll",
    "2": "System.Windows.Forms.Dll",
    "3": "System.Data.Dll",
    "4": "System.Xml.Dll",
    "5": "Stimulsoft.Controls.Dll",
    "6": "Stimulsoft.Base.Dll",
    "7": "Stimulsoft.Report.Dll"
  },
  "Pages": {
    "0": {
      "Ident": "StiPage",
      "Name": "Page1",
      "Guid": "fde0582f10ed4e83866a47410f2df22c",
      "Interaction": {
        "Ident": "StiInteraction"
      },
      "Border": ";;2;;;;;solid:Black",
      "Brush": "solid:",
      "Components": {
        "0": {
          "Ident": "StiChart",
          "Name": "Chart2",
          "MinSize": "0,0",
          "MaxSize": "0,0",
          "ClientRectangle": "0,5.8,7.7,4.4",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Border": ";;;;;;;solid:Black",
          "Brush": "solid:255,255,255",
          "Series": {
            "0": {
              "Ident": "StiPieSeries",
              "ShowSeriesLabels": "FromSeries",
              "SeriesLabels": {
                "Ident": "StiInsideEndPieLabels",
                "AllowApplyStyle": false,
                "MarkerSize": {
                  "Width": 8,
                  "Height": 6
                },
                "ValueTypeSeparator": "-",
                "TextAfter": "%",
                "DrawBorder": false,
                "LabelColor": "White",
                "BorderColor": "0,0,0,0",
                "Brush": "empty",
                "Font": ";12;Bold;"
              },
              "ListOfValues": {
                "Value": "82;8;10"
              },
              "ListOfArguments": {
                "Value": "PC;Mobilephone;Tablet"
              },
              "Title": {
                "Value": "Series 1"
              },
              "ListOfToolTips": {
                "Value": "82%;8%;10%"
              },
              "BorderColor": "255,255,255",
              "Brush": "solid:112,173,71"
            }
          },
          "Area": {
            "Ident": "StiPieArea",
            "BorderColor": "171,172,173",
            "Brush": "solid:255,255,255"
          },
          "Table": {
            "GridLineColor": "105,105,105",
            "TextColor": "140,140,140",
            "Header": {
              "Brush": "solid:White"
            }
          },
          "SeriesLabels": {
            "Ident": "StiCenterAxisLabels",
            "MarkerSize": {
              "Width": 8,
              "Height": 6
            },
            "ValueTypeSeparator": "-",
            "LegendValueType": "Argument",
            "LabelColor": "90,90,90",
            "BorderColor": "140,140,140",
            "Brush": "solid:255,255,255"
          },
          "Legend": {
            "ShowShadow": false,
            "BorderColor": "105,105,105",
            "Brush": "solid:255,255,255",
            "TitleColor": "105,105,105",
            "LabelsColor": "140,140,140",
            "Direction": "LeftToRight",
            "Font": ";12;;",
            "MarkerSize": {
              "Width": 12,
              "Height": 12
            },
            "Columns": 1,
            "Size": "0,0"
          },
          "Title": {
            "Brush": "solid:140,140,140"
          },
          "Style": {
            "Ident": "StiStyle25"
          }
        },
        "1": {
          "Ident": "StiText",
          "Name": "Text1",
          "MinSize": "0,0",
          "MaxSize": "0,0",
          "ClientRectangle": "0,5.4,7.6,0.3",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Text": {
            "Value": "Devices from which orders were placed"
          },
          "HorAlignment": "Center",
          "VertAlignment": "Center",
          "Font": ";20;;",
          "Border": ";193,152,89;;;;;;solid:Black",
          "Brush": "solid:",
          "TextBrush": "solid:0,0,0",
          "Type": "Expression"
        },
        "2": {
          "Ident": "StiChart",
          "Name": "Chart1",
          "MinSize": "0,0",
          "MaxSize": "0,0",
          "ClientRectangle": "0,0.7,7.6,4.5",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Border": ";;;;;;;solid:Black",
          "Brush": "solid:255,255,255",
          "Series": {
            "0": {
              "Ident": "StiClusteredColumnSeries",
              "SeriesLabels": {
                "Ident": "StiCenterAxisLabels",
                "MarkerSize": {
                  "Width": 8,
                  "Height": 6
                },
                "ValueTypeSeparator": "-",
                "DrawBorder": false,
                "LabelColor": "90,90,90",
                "BorderColor": "140,140,140",
                "Brush": "solid:255,255,255",
                "Font": ";10;;"
              },
              "TrendLine": {
                "Ident": "StiTrendLineNone",
                "ShowShadow": true
              },
              "ListOfValues": {
                "Value": "1.06;1.25;1.51;1.77"
              },
              "ListOfArguments": {
                "Value": "2012;2013;2014;2015"
              },
              "Title": {
                "Value": "The volume of online store sales, in Trillion dollars"
              },
              "ListOfToolTips": {
                "Value": "1.06;1.25;1.51;1.77"
              },
              "BorderColor": "255,255,255",
              "Brush": "solid:112,173,71",
              "BrushNegative": "solid:Firebrick"
            },
            "1": {
              "Ident": "StiLineSeries",
              "SeriesLabels": {
                "Ident": "StiOutsideEndAxisLabels",
                "MarkerSize": {
                  "Width": 8,
                  "Height": 6
                },
                "ValueTypeSeparator": "-",
                "DrawBorder": false,
                "LabelColor": "90,90,90",
                "BorderColor": "140,140,140",
                "Brush": "solid:255,255,255",
                "Font": ";10;;"
              },
              "TrendLine": {
                "Ident": "StiTrendLineNone",
                "ShowShadow": true
              },
              "ListOfValues": {
                "Value": "0.223;0.183;0.202;0.177"
              },
              "ListOfArguments": {
                "Value": "2012;2013;2014;2015"
              },
              "Title": {
                "Value": "Ratio of sales growth"
              },
              "ListOfToolTips": {
                "Value": "22.3%;18.3%;20.2%;17.7%"
              },
              "Marker": {
                "Brush": "solid:168,214,255",
                "BorderColor": "0,14,96"
              },
              "LineMarker": {
                "Brush": "solid:118,164,246",
                "BorderColor": "0,0,46"
              },
              "LineColor": "68,114,196"
            }
          },
          "Area": {
            "Ident": "StiClusteredColumnArea",
            "BorderColor": "171,172,173",
            "Brush": "solid:255,255,255",
            "InterlacingHor": {
              "InterlacedBrush": "solid:10,155,155,155",
              "Area": true
            },
            "InterlacingVert": {
              "InterlacedBrush": "solid:10,155,155,155",
              "Area": true
            },
            "GridLinesHor": {
              "Color": "100,105,105,105",
              "MinorColor": "100,105,105,105",
              "Area": true
            },
            "GridLinesHorRight": {
              "Visible": false,
              "Area": true
            },
            "GridLinesVert": {
              "Color": "100,105,105,105",
              "MinorColor": "100,105,105,105",
              "Area": true
            },
            "YAxis": {
              "Ident": "StiYLeftAxis",
              "Labels": {
                "Font": ";10;;",
                "Color": "140,140,140",
                "TextAlignment": "Right"
              },
              "Title": {
                "Color": "140,140,140",
                "Direction": "BottomToTop"
              }
            },
            "YRightAxis": {
              "Ident": "StiYRightAxis",
              "Labels": {
                "Color": "140,140,140",
                "TextAlignment": "Left"
              },
              "Title": {
                "Color": "140,140,140",
                "Direction": "TopToBottom"
              }
            },
            "XAxis": {
              "Ident": "StiXBottomAxis",
              "Labels": {
                "Font": ";10;;",
                "Color": "140,140,140",
                "TextAlignment": "Right"
              },
              "Title": {
                "Color": "140,140,140"
              }
            },
            "XTopAxis": {
              "Ident": "StiXTopAxis",
              "Labels": {
                "Color": "140,140,140",
                "TextAlignment": "Right"
              },
              "Title": {
                "Color": "140,140,140"
              }
            }
          },
          "Table": {
            "GridLineColor": "105,105,105",
            "TextColor": "140,140,140",
            "Header": {
              "Brush": "solid:White"
            }
          },
          "SeriesLabels": {
            "Ident": "StiCenterAxisLabels",
            "AllowApplyStyle": false,
            "MarkerSize": {
              "Width": 8,
              "Height": 6
            },
            "ValueTypeSeparator": "-",
            "DrawBorder": false,
            "LabelColor": "White",
            "BorderColor": "0,0,0,0",
            "Brush": "empty",
            "Font": ";12;Bold;"
          },
          "Legend": {
            "ShowShadow": false,
            "BorderColor": "105,105,105",
            "Brush": "solid:255,255,255",
            "TitleColor": "105,105,105",
            "LabelsColor": "140,140,140",
            "Font": ";12;;",
            "MarkerSize": {
              "Width": 12,
              "Height": 12
            },
            "Size": "0,0"
          },
          "Title": {
            "Brush": "solid:140,140,140"
          },
          "Style": {
            "Ident": "StiStyle25"
          }
        },
        "3": {
          "Ident": "StiReportTitleBand",
          "Name": "ReportTitleBand1",
          "ClientRectangle": "0,0.2,7.72,0.4",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Border": ";;;;;;;solid:Black",
          "Brush": "solid:",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Text2",
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "0,0,7.7,0.4",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Online Store Sales"
              },
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "Font": ";24;;",
              "Border": ";193,152,89;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:0,0,0",
              "Type": "Expression"
            }
          }
        }
      },
      "PaperSize": "Letter",
      "PageWidth": 8.5,
      "PageHeight": 11.0,
      "Watermark": {
        "TextBrush": "solid:50,0,0,0"
      },
      "Margins": {
        "Left": 0.39,
        "Right": 0.39,
        "Top": 0.39,
        "Bottom": 0.39
      }
    }
  }
}