var UsersAppleIpad = {
  "ReportVersion": "2015.1.20",
  "ReportGuid": "8a8fb5285e3d42acae421880e461ae4d",
  "ReportName": "Report",
  "ReportAlias": "Report",
  "ReportCreated": "/Date(1435793678000+0300)/",
  "ReportChanged": "/Date(1435865621000+0300)/",
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
      "Guid": "174f8d981f3b40b8874859f80b98e722",
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
          "ClientRectangle": "0,0.9,7.6,4.8",
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
                "Value": "15;21;27;15;13;7;2"
              },
              "ListOfArguments": {
                "Value": "<18;18-24;25-34;35-44;45-54;55-64;65>"
              },
              "Title": {
                "Value": "Series 1"
              },
              "ListOfToolTips": {
                "Value": "15%;21%;27%;15%;13%;7%;2%"
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
            "ValueType": "Argument",
            "ValueTypeSeparator": "-",
            "LegendValueType": "Argument",
            "TextAfter": "%",
            "LabelColor": "90,90,90",
            "BorderColor": "140,140,140",
            "Brush": "solid:255,255,255"
          },
          "Legend": {
            "AllowApplyStyle": false,
            "ShowShadow": false,
            "BorderColor": "DimGray",
            "Brush": "solid:255,255,255",
            "TitleColor": "DimGray",
            "LabelsColor": "140,140,140",
            "VertAlignment": "TopOutside",
            "TitleFont": ";12;;",
            "Font": ";12;;",
            "MarkerSize": {
              "Width": 12,
              "Height": 12
            },
            "Columns": 1,
            "Size": "0,0",
            "Title": "Age:"
          },
          "Title": {
            "Brush": "solid:140,140,140"
          },
          "Style": {
            "Ident": "StiStyle25"
          }
        },
        "1": {
          "Ident": "StiChart",
          "Name": "Chart2",
          "MinSize": "0,0",
          "MaxSize": "0,0",
          "ClientRectangle": "0,6,7.7,4.2",
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
                "Value": "65;35"
              },
              "ListOfArguments": {
                "Value": "Male;Female"
              },
              "Title": {
                "Value": "Gender"
              },
              "ListOfToolTips": {
                "Value": "65%;35%"
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
            "AllowApplyStyle": false,
            "ShowShadow": false,
            "BorderColor": "DimGray",
            "Brush": "solid:255,255,255",
            "TitleColor": "DimGray",
            "LabelsColor": "140,140,140",
            "TitleFont": ";10;;",
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
        "2": {
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
                "Value": "Users Apple iPad"
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