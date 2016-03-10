var ParametersSelectingCountry = {
  "ReportVersion": "2015.2.0",
  "ReportGuid": "729711b0d3a44368a849277be4f0c772",
  "ReportName": "Report",
  "ReportAlias": "ParametersSelectingCountry",
  "ReportDescription": "Отображение данных только по выбранным странам.",
  "ReportCreated": "/Date(1085813940000+0400)/",
  "ReportChanged": "/Date(1444384036405+0300)/",
  "EngineVersion": "EngineV2",
  "PreviewMode": "StandardAndDotMatrix",
  "PreviewSettings": 33538047,
  "Script": "using System;\r\nusing System.Drawing;\r\nusing System.Windows.Forms;\r\nusing System.Data;\r\nusing Stimulsoft.Controls;\r\nusing Stimulsoft.Base.Drawing;\r\nusing Stimulsoft.Report;\r\nusing Stimulsoft.Report.ReportControls;\r\nusing Stimulsoft.Report.Components;\r\n\r\nnamespace Reports\r\n{\r\n    \r\n    public class SimpleList : Stimulsoft.Report.StiReport\r\n    {\r\n        \r\n\t\tpublic SimpleList()\r\n        {\r\n            this.InitializeComponent();\r\n        }\r\n        #region StiReport Designer generated code - do not modify\r\n\t\t#endregion StiReport Designer generated code - do not modify\r\n    }\r\n}",
  "Styles": {
    "0": {
      "Ident": "StiStyle",
      "Name": "Title1",
      "HorAlignment": "Right",
      "VertAlignment": "Center",
      "Font": ";19;;",
      "Border": ";193,152,89;;;;;;solid:Black",
      "Brush": "solid:",
      "TextBrush": "solid:193,152,89",
      "AllowUseBorderSides": false
    },
    "1": {
      "Ident": "StiStyle",
      "Name": "Title2",
      "VertAlignment": "Center",
      "Font": ";9;;",
      "Border": ";102,77,38;;;;;;solid:Black",
      "Brush": "solid:",
      "TextBrush": "solid:102,77,38",
      "AllowUseBorderSides": false
    },
    "2": {
      "Ident": "StiStyle",
      "Name": "Header1",
      "VertAlignment": "Center",
      "Font": ";19;;",
      "Border": ";193,152,89;;;;;;solid:Black",
      "Brush": "solid:",
      "TextBrush": "solid:193,152,89",
      "AllowUseBorderSides": false
    },
    "3": {
      "Ident": "StiStyle",
      "Name": "Header2",
      "HorAlignment": "Center",
      "VertAlignment": "Center",
      "Font": ";12;Bold;",
      "Border": ";193,152,89;;;;;;solid:Black",
      "Brush": "solid:",
      "TextBrush": "solid:193,152,89",
      "AllowUseBorderSides": false
    },
    "4": {
      "Ident": "StiStyle",
      "Name": "Header3",
      "HorAlignment": "Center",
      "VertAlignment": "Center",
      "Font": ";9;Bold;",
      "Border": "All;193,152,89;;;;;;solid:Black",
      "Brush": "solid:242,234,221",
      "TextBrush": "solid:193,152,89",
      "AllowUseHorAlignment": true,
      "AllowUseVertAlignment": true,
      "AllowUseBorderSides": false
    },
    "5": {
      "Ident": "StiStyle",
      "Name": "Header4",
      "HorAlignment": "Center",
      "VertAlignment": "Center",
      "Font": ";9;Bold;",
      "Border": "All;193,152,89;;;;;;solid:Black",
      "Brush": "solid:",
      "TextBrush": "solid:193,152,89",
      "AllowUseBorderSides": false
    },
    "6": {
      "Ident": "StiStyle",
      "Name": "Data1",
      "VertAlignment": "Center",
      "Font": ";9;;",
      "Border": ";193,152,89;;;;;;solid:Black",
      "Brush": "solid:",
      "TextBrush": "solid:102,77,38",
      "AllowUseBorderSides": false
    },
    "7": {
      "Ident": "StiStyle",
      "Name": "Data2",
      "Font": ";9;;",
      "Border": ";;;;;;;solid:Black",
      "Brush": "solid:240,237,232",
      "TextBrush": "solid:Black",
      "AllowUseFont": false,
      "AllowUseBorderFormatting": false,
      "AllowUseBorderSides": false,
      "AllowUseTextBrush": false,
      "AllowUseTextOptions": false
    },
    "8": {
      "Ident": "StiStyle",
      "Name": "Data3",
      "VertAlignment": "Center",
      "Font": ";9;;",
      "Border": ";193,152,89;;;;;;solid:Black",
      "Brush": "solid:240,237,232",
      "TextBrush": "solid:102,77,38",
      "AllowUseBorderSides": false
    },
    "9": {
      "Ident": "StiStyle",
      "Name": "Footer1",
      "VertAlignment": "Center",
      "Font": ";9;;",
      "Border": "Top;193,152,89;;;;;;solid:Black",
      "Brush": "solid:",
      "TextBrush": "solid:102,77,38",
      "AllowUseBorderSides": false
    },
    "10": {
      "Ident": "StiStyle",
      "Name": "Footer2",
      "HorAlignment": "Right",
      "VertAlignment": "Center",
      "Font": ";12;Bold;",
      "Border": ";193,152,89;;;;;;solid:Black",
      "Brush": "solid:",
      "TextBrush": "solid:193,152,89",
      "AllowUseBorderSides": false
    },
    "11": {
      "Ident": "StiCrossTabStyle",
      "Name": "CrossTab",
      "Color": "242,234,221"
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
  "Dictionary": {
    "Variables": {
      "0": {
        "Value": "true",
        "Name": "AllCountries",
        "Alias": "All countries",
        "Type": "System.Boolean",
        "RequestFromUser": true
      },
      "1": {
        "Value": "Germany",
        "Name": "SelectedCountry",
        "DialogInfo": {
          "AllowUserValues": false,
          "Keys": {
            "0": "Germany",
            "1": "Mexico",
            "2": "UK",
            "3": "Sweden",
            "4": "France",
            "5": "Spain",
            "6": "Canada",
            "7": "Argentina",
            "8": "Switzerland",
            "9": "Brazil",
            "10": "Austria",
            "11": "Italy",
            "12": "Portugal",
            "13": "USA",
            "14": "Venezuela",
            "15": "Ireland",
            "16": "Belgium",
            "17": "Norway",
            "18": "Denmark",
            "19": "Finland",
            "20": "Poland"
          },
          "Values": {
            "0": "Germany",
            "1": "Mexico",
            "2": "UK",
            "3": "Sweden",
            "4": "France",
            "5": "Spain",
            "6": "Canada",
            "7": "Argentina",
            "8": "Switzerland",
            "9": "Brazil",
            "10": "Austria",
            "11": "Italy",
            "12": "Portugal",
            "13": "USA",
            "14": "Venezuela",
            "15": "Ireland",
            "16": "Belgium",
            "17": "Norway",
            "18": "Denmark",
            "19": "Finland",
            "20": "Poland"
          }
        },
        "Alias": "Selected country only",
        "Type": "System.String",
        "RequestFromUser": true
      }
    },
    "DataSources": {
      "0": {
        "Ident": "StiDataTableSource",
        "Name": "Customers",
        "Alias": "Customers",
        "Columns": {
          "0": {
            "Name": "CustomerID",
            "Index": -1,
            "NameInSource": "CustomerID",
            "Alias": "CustomerID",
            "Type": "System.String"
          },
          "1": {
            "Name": "CompanyName",
            "Index": -1,
            "NameInSource": "CompanyName",
            "Alias": "CompanyName",
            "Type": "System.String"
          },
          "2": {
            "Name": "ContactName",
            "Index": -1,
            "NameInSource": "ContactName",
            "Alias": "ContactName",
            "Type": "System.String"
          },
          "3": {
            "Name": "ContactTitle",
            "Index": -1,
            "NameInSource": "ContactTitle",
            "Alias": "ContactTitle",
            "Type": "System.String"
          },
          "4": {
            "Name": "Address",
            "Index": -1,
            "NameInSource": "Address",
            "Alias": "Address",
            "Type": "System.String"
          },
          "5": {
            "Name": "City",
            "Index": -1,
            "NameInSource": "City",
            "Alias": "City",
            "Type": "System.String"
          },
          "6": {
            "Name": "Region",
            "Index": -1,
            "NameInSource": "Region",
            "Alias": "Region",
            "Type": "System.String"
          },
          "7": {
            "Name": "PostalCode",
            "Index": -1,
            "NameInSource": "PostalCode",
            "Alias": "PostalCode",
            "Type": "System.String"
          },
          "8": {
            "Name": "Country",
            "Index": -1,
            "NameInSource": "Country",
            "Alias": "Country",
            "Type": "System.String"
          },
          "9": {
            "Name": "Phone",
            "Index": -1,
            "NameInSource": "Phone",
            "Alias": "Phone",
            "Type": "System.String"
          },
          "10": {
            "Name": "Fax",
            "Index": -1,
            "NameInSource": "Fax",
            "Alias": "Fax",
            "Type": "System.String"
          }
        },
        "NameInSource": "Demo.Customers"
      }
    }
  },
  "Pages": {
    "0": {
      "Ident": "StiPage",
      "Name": "Page1",
      "Guid": "366bfdc35bcf48f3aeb38f2b5f58db21",
      "Interaction": {
        "Ident": "StiInteraction"
      },
      "Border": ";;2;;;;;solid:Black",
      "Brush": "solid:",
      "Components": {
        "0": {
          "Ident": "StiPageFooterBand",
          "Name": "PageFooterBand1",
          "Guid": "f4ce1014c0454279ba99a4e6a633b36f",
          "ClientRectangle": "0,27.3,19,0.4",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Border": ";;;;;;;solid:Black",
          "Brush": "solid:",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Text6",
              "Guid": "a195cb499e0b4bdcb84079abedbb3207",
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "6.8,0,12.2,0.4",
              "ComponentStyle": "Footer1",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "{PageNofM}"
              },
              "HorAlignment": "Right",
              "VertAlignment": "Center",
              "Font": ";9;;",
              "Border": ";193,152,89;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:102,77,38"
            }
          }
        },
        "1": {
          "Ident": "StiReportTitleBand",
          "Name": "ReportTitleBand2",
          "Guid": "dc71e6748bb24f168226833c75cee439",
          "ClientRectangle": "0,0.4,19,2",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Border": ";;;;;;;solid:Black",
          "Brush": "solid:",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Text20",
              "Guid": "156dc5f28b8946c6828989624919731d",
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "9.4,0,9.6,0.8",
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
              "Border": "Bottom;193,152,89;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:193,152,89",
              "Type": "Expression"
            },
            "1": {
              "Ident": "StiText",
              "Name": "Text23",
              "Guid": "7123692fb8e94f07b593c2c773f9f7e5",
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "0,0,9.4,0.8",
              "ComponentStyle": "Title1",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Selecting Country"
              },
              "VertAlignment": "Center",
              "Font": ";19;;",
              "Border": "Bottom;193,152,89;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:193,152,89",
              "Type": "Expression"
            },
            "2": {
              "Ident": "StiText",
              "Name": "Text17",
              "Guid": "08478f239a3c433e8e935725529a41a4",
              "CanGrow": true,
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "0,1,14.6,0.8",
              "ComponentStyle": "Title2",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "{ReportDescription}"
              },
              "Font": ";9;;",
              "Border": ";102,77,38;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:102,77,38",
              "TextOptions": {
                "WordWrap": true
              },
              "Type": "Expression"
            },
            "3": {
              "Ident": "StiText",
              "Name": "Text18",
              "Guid": "40b462fd71d64adba7ae41f775066020",
              "CanGrow": true,
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "14.6,1,4.4,0.8",
              "ComponentStyle": "Title2",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Date: {Today.ToString(\"Y\")}"
              },
              "HorAlignment": "Right",
              "Font": ";9;;",
              "Border": ";102,77,38;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:102,77,38",
              "TextOptions": {
                "WordWrap": true
              },
              "Type": "Expression",
              "TextFormat": {
                "Ident": "StiDateFormatService",
                "StringFormat": "yyyy, MMMM"
              }
            }
          }
        },
        "2": {
          "Ident": "StiHeaderBand",
          "Name": "HeaderBand1",
          "ClientRectangle": "0,3.2,19,0.6",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Border": ";;;;;;;solid:Black",
          "Brush": "solid:",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Text11",
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "5.4,0,4.2,0.6",
              "ComponentStyle": "Header3",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Address"
              },
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "Font": ";9;Bold;",
              "Border": "Top, Left, Bottom;193,152,89;;;;;;solid:Black",
              "Brush": "solid:242,234,221",
              "TextBrush": "solid:193,152,89"
            },
            "1": {
              "Ident": "StiText",
              "Name": "Text10",
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "0,0,5.4,0.6",
              "ComponentStyle": "Header3",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Company"
              },
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "Font": ";9;Bold;",
              "Border": "Top, Left, Bottom;193,152,89;;;;;;solid:Black",
              "Brush": "solid:242,234,221",
              "TextBrush": "solid:193,152,89"
            },
            "2": {
              "Ident": "StiText",
              "Name": "Text12",
              "ShiftMode": "DecreasingSize, OnlyInWidthOfComponent",
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "9.6,0,3.2,0.6",
              "ComponentStyle": "Header3",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Phone"
              },
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "Font": ";9;Bold;",
              "Border": "Top, Left, Bottom;193,152,89;;;;;;solid:Black",
              "Brush": "solid:242,234,221",
              "TextBrush": "solid:193,152,89"
            },
            "3": {
              "Ident": "StiText",
              "Name": "Text13",
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "12.8,0,3.8,0.6",
              "ComponentStyle": "Header3",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Contact"
              },
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "Font": ";9;Bold;",
              "Border": "Top, Left, Bottom;193,152,89;;;;;;solid:Black",
              "Brush": "solid:242,234,221",
              "TextBrush": "solid:193,152,89"
            },
            "4": {
              "Ident": "StiText",
              "Name": "Text9",
              "Guid": "25f1f4322b0b4ee28b083c644b29a683",
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "16.6,0,2.4,0.6",
              "ComponentStyle": "Header3",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Country"
              },
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "Font": ";9;Bold;",
              "Border": "All;193,152,89;;;;;;solid:Black",
              "Brush": "solid:242,234,221",
              "TextBrush": "solid:193,152,89",
              "Type": "Expression"
            }
          },
          "PrintIfEmpty": true
        },
        "3": {
          "Ident": "StiDataBand",
          "Name": "DataBand1",
          "ClientRectangle": "0,4.6,19,0.6",
          "Interaction": {
            "Ident": "StiBandInteraction"
          },
          "Border": ";;;;;;;solid:Black",
          "Brush": "solid:",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Text4",
              "CanGrow": true,
              "GrowToHeight": true,
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "9.6,0,3.2,0.6",
              "ComponentStyle": "Data1",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "{Customers.Phone}"
              },
              "VertAlignment": "Center",
              "Font": ";9;;",
              "Border": "Left;193,152,89;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:102,77,38"
            },
            "1": {
              "Ident": "StiText",
              "Name": "Text3",
              "CanGrow": true,
              "GrowToHeight": true,
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "12.8,0,3.8,0.6",
              "ComponentStyle": "Data1",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "{Customers.ContactTitle}"
              },
              "VertAlignment": "Center",
              "Font": ";9;;",
              "Border": "Left;193,152,89;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:102,77,38"
            },
            "2": {
              "Ident": "StiText",
              "Name": "Text1",
              "CanGrow": true,
              "GrowToHeight": true,
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "0,0,5.4,0.6",
              "ComponentStyle": "Data1",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "{Customers.CompanyName}"
              },
              "VertAlignment": "Center",
              "Font": ";9;;",
              "Border": "Left;193,152,89;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:102,77,38"
            },
            "3": {
              "Ident": "StiText",
              "Name": "Text2",
              "CanGrow": true,
              "GrowToHeight": true,
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "5.4,0,4.2,0.6",
              "ComponentStyle": "Data1",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "{Customers.Address}"
              },
              "VertAlignment": "Center",
              "Font": ";9;;",
              "Border": "Left;193,152,89;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:102,77,38"
            },
            "4": {
              "Ident": "StiText",
              "Name": "Text14",
              "Guid": "10940acebff64115806c153cff3886ba",
              "CanGrow": true,
              "GrowToHeight": true,
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "16.6,0,2.4,0.6",
              "ComponentStyle": "Data1",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "{Customers.Country}"
              },
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "Font": ";9;;",
              "Border": "Left, Right;193,152,89;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:102,77,38",
              "Type": "DataColumn"
            }
          },
          "DataSourceName": "Customers",
          "EvenStyle": "Data2",
          "Filters": {
            "0": {
              "Ident": "StiFilter",
              "Item": "Expression",
              "Expression": {
                "Value": "{Customers.Country == SelectedCountry || AllCountries}"
              }
            }
          }
        },
        "4": {
          "Ident": "StiFooterBand",
          "Name": "FooterBand1",
          "ClientRectangle": "0,6,19,0.2",
          "ComponentStyle": "Footer1",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Border": "Top;193,152,89;;;;;;solid:Black",
          "Brush": "solid:",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Text8",
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "0,0,19,0.2",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "VertAlignment": "Center",
              "Font": ";10;;",
              "Border": ";;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:Black"
            }
          },
          "PrintIfEmpty": true,
          "PrintOnAllPages": true
        }
      },
      "PageWidth": 21.0,
      "PageHeight": 29.7,
      "Watermark": {
        "Font": ";;Bold;",
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