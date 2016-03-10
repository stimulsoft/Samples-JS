var SmartphoneBestsellersInQ12015 = {
  "ReportVersion": "2015.1.20",
  "ReportGuid": "1e086a480a954df7ade16f38c57e1a1a",
  "ReportName": "Report",
  "ReportAlias": "Report",
  "ReportCreated": "/Date(1435796390000+0300)/",
  "ReportChanged": "/Date(1435865338000+0300)/",
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
      "Guid": "84de82738d8845e4bc7c709d65a78f8d",
      "Interaction": {
        "Ident": "StiInteraction"
      },
      "Border": ";;2;;;;;solid:Black",
      "Brush": "solid:",
      "Components": {
        "0": {
          "Ident": "StiChart",
          "Name": "Chart1",
          "MinSize": "0,0",
          "MaxSize": "0,0",
          "ClientRectangle": "0,1,7.7,6.2",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Border": ";;;;;;;solid:Black",
          "Brush": "solid:255,255,255",
          "Series": {
            "0": {
              "Ident": "StiClusteredBarSeries",
              "ShowSeriesLabels": "FromSeries",
              "SeriesLabels": {
                "Ident": "StiInsideBaseAxisLabels",
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
              "TrendLine": {
                "Ident": "StiTrendLineNone",
                "ShowShadow": true
              },
              "ListOfValues": {
                "Value": "20.1;20.1;6.6;6.6;4.2"
              },
              "Title": {
                "Value": "Market Share in 2014"
              },
              "ListOfToolTips": {
                "Value": "20.1%;20.1%;6.6%;6.6%;4.2%"
              },
              "BorderColor": "255,255,255",
              "Brush": "solid:237,125,49",
              "BrushNegative": "solid:Firebrick"
            },
            "1": {
              "Ident": "StiClusteredBarSeries",
              "ShowSeriesLabels": "FromSeries",
              "SeriesLabels": {
                "Ident": "StiInsideBaseAxisLabels",
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
              "TrendLine": {
                "Ident": "StiTrendLineNone",
                "ShowShadow": true
              },
              "ListOfValues": {
                "Value": "24.3;17.9;5.5;5.1;4.5"
              },
              "Title": {
                "Value": "Market Share in 2015"
              },
              "ListOfToolTips": {
                "Value": "24.3%;17.9%;5.5%;5.1%;4.5%"
              },
              "BorderColor": "255,255,255",
              "Brush": "solid:255,192,0",
              "BrushNegative": "solid:Firebrick"
            },
            "2": {
              "Ident": "StiClusteredBarSeries",
              "ShowSeriesLabels": "FromSeries",
              "SeriesLabels": {
                "Ident": "StiInsideBaseAxisLabels",
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
              "TrendLine": {
                "Ident": "StiTrendLineNone",
                "ShowShadow": true
              },
              "ListOfValues": {
                "Value": "82.8;61.6;18.7;17.5;15.4"
              },
              "ListOfArguments": {
                "Value": "Samsung;Apple;Lenovo;Huawei;LG"
              },
              "Title": {
                "Value": "Units, in Millions"
              },
              "ListOfToolTips": {
                "Value": "82.8 Millions;61.6 Millions;18.7 Millions;17.5 Millions;15.4 Millions"
              },
              "BorderColor": "255,255,255",
              "Brush": "solid:112,173,71",
              "BrushNegative": "solid:Firebrick"
            }
          },
          "Area": {
            "Ident": "StiClusteredBarArea",
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
            "MarkerSize": {
              "Width": 8,
              "Height": 6
            },
            "ValueTypeSeparator": "-",
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
            "HorAlignment": "Right",
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
            "Ident": "StiStyle24"
          }
        },
        "1": {
          "Ident": "StiReportTitleBand",
          "Name": "ReportTitleBand1",
          "ClientRectangle": "0,0.2,7.72,0.5",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Border": ";;;;;;;solid:Black",
          "Brush": "solid:",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Text1",
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "0,0,7.7,0.5",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Smartphone bestsellers in Q1 2015"
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