var SiteStatistics = {
  "ReportVersion": "2015.1.20",
  "ReportGuid": "142d59b9dc234cc39c9c31263e3033c7",
  "ReportName": "Report",
  "ReportAlias": "Report",
  "ReportCreated": "/Date(1435746836000+0300)/",
  "ReportChanged": "/Date(1435876991000+0300)/",
  "EngineVersion": "EngineV2",
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
      "Guid": "1381d2b4f1cb4092ae1a8566e8533431",
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
          "ClientRectangle": "0.2,1.4,18.8,6.4",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Border": ";;;;;;;solid:Black",
          "Brush": "solid:255,255,255",
          "Series": {
            "0": {
              "Ident": "StiLineSeries",
              "SeriesLabels": {
                "Ident": "StiOutsideEndAxisLabels",
                "MarkerSize": {
                  "Width": 8,
                  "Height": 6
                },
                "ValueTypeSeparator": "-",
                "LabelColor": "90,90,90",
                "BorderColor": "140,140,140",
                "Brush": "solid:255,255,255"
              },
              "TrendLine": {
                "Ident": "StiTrendLineNone",
                "ShowShadow": true
              },
              "ListOfValues": {
                "Value": "13914; 20570; 24260; 21233; 26005; 14409; 20878; 24762; 12347; 15519; 25748; 13398; 18584; 22980"
              },
              "Title": {
                "Value": "Passers"
              },
              "ListOfToolTips": {
                "Value": "13914; 20570; 24260; 21233; 26005; 14409; 20878; 24762; 12347; 15519; 25748; 13398; 18584; 22980"
              },
              "Marker": {
                "Brush": "solid:191,255,255",
                "BorderColor": "0,55,113"
              },
              "LineMarker": {
                "Brush": "solid:141,205,255",
                "BorderColor": "0,5,63"
              },
              "LineColor": "91,155,213"
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
                "LabelColor": "90,90,90",
                "BorderColor": "140,140,140",
                "Brush": "solid:255,255,255"
              },
              "TrendLine": {
                "Ident": "StiTrendLineNone",
                "ShowShadow": true
              },
              "ListOfValues": {
                "Value": "16831; 4108; 16089; 12891; 7453; 7948; 14642; 11234; 21205; 15355; 15895; 11886; 17428; 12840"
              },
              "ListOfArguments": {
                "Value": "Jun 1;Jun 2;Jun 3;Jun 4;Jun 5;Jun 6;Jun 7;Jun 8;Jun 9;Jun 10;Jun 11;Jun 12;Jun 13;Jun 14"
              },
              "Title": {
                "Value": "Visitors"
              },
              "ListOfToolTips": {
                "Value": "16831; 4108; 16089; 12891; 7453; 7948; 14642; 11234; 21205; 15355; 15895; 11886; 17428; 12840"
              },
              "Marker": {
                "Brush": "solid:255,225,149",
                "BorderColor": "137,25,0"
              },
              "LineMarker": {
                "Brush": "solid:255,175,99",
                "BorderColor": "87,0,0"
              },
              "LineColor": "237,125,49"
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
            "Ident": "StiNoneLabels",
            "MarkerSize": {
              "Width": 8,
              "Height": 6
            },
            "ValueTypeSeparator": "-"
          },
          "Legend": {
            "ShowShadow": false,
            "BorderColor": "105,105,105",
            "Brush": "solid:255,255,255",
            "TitleColor": "105,105,105",
            "LabelsColor": "140,140,140",
            "VertAlignment": "TopOutside",
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
            "Ident": "StiStyle22"
          }
        },
        "1": {
          "Ident": "StiChart",
          "Name": "Chart2",
          "MinSize": "0,0",
          "MaxSize": "0,0",
          "ClientRectangle": "0,9.2,9.6,9.2",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Border": ";;;;;;;solid:Black",
          "Brush": "solid:255,255,255",
          "Series": {
            "0": {
              "Ident": "StiFunnelSeries",
              "SeriesLabels": {
                "Ident": "StiCenterFunnelLabels",
                "MarkerSize": {
                  "Width": 8,
                  "Height": 6
                },
                "ValueTypeSeparator": "-",
                "LabelColor": "90,90,90",
                "BorderColor": "140,140,140",
                "Brush": "solid:255,255,255"
              },
              "ListOfValues": {
                "Value": "75;45;30;15"
              },
              "ListOfArguments": {
                "Value": "New; 1 Repeat; 2 Repeats; 3 Repeats"
              },
              "Title": {
                "Value": "Series 1"
              },
              "ListOfToolTips": {
                "Value": "75;45;30;15"
              },
              "Brush": "solid:91,155,213",
              "BorderColor": "255,255,255"
            }
          },
          "Area": {
            "Ident": "StiFunnelArea",
            "BorderColor": "171,172,173",
            "Brush": "solid:255,255,255"
          },
          "Table": {
            "Font": ";12;;",
            "GridLineColor": "105,105,105",
            "TextColor": "140,140,140",
            "Header": {
              "Brush": "solid:White"
            }
          },
          "SeriesLabels": {
            "Ident": "StiCenterFunnelLabels",
            "AllowApplyStyle": false,
            "MarkerSize": {
              "Width": 8,
              "Height": 6
            },
            "ValueTypeSeparator": "-",
            "LegendValueType": "Argument",
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
            "HorAlignment": "Center",
            "VertAlignment": "TopOutside",
            "Font": ";12;;",
            "MarkerSize": {
              "Width": 12,
              "Height": 12
            },
            "Columns": 1,
            "Size": "0,0"
          },
          "Title": {
            "Font": ";20;;",
            "Text": "Repeats",
            "Brush": "solid:140,140,140",
            "Spacing": 10
          },
          "Style": {
            "Ident": "StiStyle22"
          }
        },
        "2": {
          "Ident": "StiChart",
          "Name": "Chart3",
          "Guid": "8e267538ac6a45f9bc55a6cb5fc437af",
          "MinSize": "0,0",
          "MaxSize": "0,0",
          "ClientRectangle": "9.6,9.2,9.4,9.2",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Border": ";;;;;;;solid:Black",
          "Brush": "solid:255,255,255",
          "Series": {
            "0": {
              "Ident": "StiPieSeries",
              "SeriesLabels": {
                "Ident": "StiInsideEndPieLabels",
                "MarkerSize": {
                  "Width": 8,
                  "Height": 6
                },
                "ValueTypeSeparator": "-",
                "LabelColor": "90,90,90",
                "BorderColor": "140,140,140",
                "Brush": "solid:255,255,255",
                "Font": ";10;;"
              },
              "ListOfValues": {
                "Value": "60;30;10"
              },
              "ListOfArguments": {
                "Value": "1-5 Min; 5-30 Min; 30-50 Min"
              },
              "Title": {
                "Value": "Series 1"
              },
              "ListOfToolTips": {
                "Value": "60;30;10"
              },
              "BorderColor": "255,255,255",
              "Brush": "solid:91,155,213"
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
            "Ident": "StiInsideEndPieLabels",
            "AllowApplyStyle": false,
            "MarkerSize": {
              "Width": 8,
              "Height": 6
            },
            "ValueTypeSeparator": "-",
            "LegendValueType": "Argument",
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
            "HorAlignment": "Center",
            "VertAlignment": "TopOutside",
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
            "Ident": "StiStyle22"
          }
        },
        "3": {
          "Ident": "StiText",
          "Name": "Text23",
          "Guid": "c303e97a9c9b4b93a068cfe938091c0b",
          "MinSize": "0,0",
          "MaxSize": "0,0",
          "ClientRectangle": "0,0,19,1.2",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Text": {
            "Value": "Count & Conversion\r\n"
          },
          "HorAlignment": "Center",
          "VertAlignment": "Center",
          "Font": ";19;;",
          "Border": ";193,152,89;;;;;;solid:Black",
          "Brush": "solid:",
          "TextBrush": "solid:0,0,0",
          "Type": "Expression"
        },
        "4": {
          "Ident": "StiText",
          "Name": "Text1",
          "Guid": "5be46d0c2a2044738ade534033948ef1",
          "MinSize": "0,0",
          "MaxSize": "0,0",
          "ClientRectangle": "0,7.8,19,1.2",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Text": {
            "Value": "Dwell & Repeat\r\n"
          },
          "HorAlignment": "Center",
          "VertAlignment": "Center",
          "Font": ";19;;",
          "Border": ";193,152,89;;;;;;solid:Black",
          "Brush": "solid:",
          "TextBrush": "solid:0,0,0",
          "Type": "Expression"
        }
      },
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