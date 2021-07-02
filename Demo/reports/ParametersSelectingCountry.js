var ParametersSelectingCountry = {
  "ReportVersion": "2021.3.4.0",
  "ReportGuid": "4998e7c507154fce8ac930414b078c0b",
  "ReportName": "ParametersSelectingCountry",
  "ReportAlias": "ParametersSelectingCountry",
  "ReportAuthor": "Stimulsoft",
  "ReportDescription": "Showing data only by selected countries.",
  "ReportCreated": "/Date(1085813940000+0400)/",
  "ReportChanged": "/Date(1552981727000+0300)/",
  "EngineVersion": "EngineV2",
  "CalculationMode": "Interpretation",
  "ReportUnit": "HundredthsOfInch",
  "PreviewMode": "StandardAndDotMatrix",
  "PreviewSettings": 25149439,
  "Script": "using System;\r\nusing System.Drawing;\r\nusing System.Windows.Forms;\r\nusing System.Data;\r\nusing Stimulsoft.Controls;\r\nusing Stimulsoft.Base.Drawing;\r\nusing Stimulsoft.Report;\r\nusing Stimulsoft.Report.ReportControls;\r\nusing Stimulsoft.Report.Components;\r\n\r\nnamespace Reports\r\n{\r\n    \r\n    public class SimpleList : Stimulsoft.Report.StiReport\r\n    {\r\n        \r\n\t\tpublic SimpleList()\r\n        {\r\n            this.InitializeComponent();\r\n        }\r\n        #region StiReport Designer generated code - do not modify\r\n\t\t#endregion StiReport Designer generated code - do not modify\r\n    }\r\n}",
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
      "NegativeTextBrush": "solid:Red"
    },
    "2": {
      "Ident": "StiStyle",
      "Name": "Data1",
      "VertAlignment": "Center",
      "Font": "Segoe UI;9.75;;",
      "Border": ";182,182,182;;;;;;solid:Black",
      "Brush": "solid:",
      "TextBrush": "solid:74,74,74",
      "NegativeTextBrush": "solid:Red"
    },
    "3": {
      "Ident": "StiStyle",
      "Name": "Data2",
      "Font": "Segoe UI;9.75;;",
      "Border": ";255,255,255;;;;;;solid:Black",
      "Brush": "solid:224,242,241",
      "TextBrush": "solid:74,74,74",
      "NegativeTextBrush": "solid:Red"
    },
    "4": {
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
  "Dictionary": {
    "Resources": {
      "0": {
        "Name": "SelectingCountry",
        "Alias": "SelectingCountry",
        "Type": "Xml",
        "Image": "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"
      }
    },
    "Variables": {
      "0": {
        "Name": "SelectedCountry",
        "DialogInfo": {
          "ItemsInitializationType": "Columns",
          "KeysColumn": "Customers.Country",
          "AllowUserValues": false
        },
        "Alias": "Selected country only",
        "Type": "System.String",
        "RequestFromUser": true
      },
      "1": {
        "Value": "true",
        "Name": "AllCountries",
        "Alias": "All countries",
        "Type": "System.Boolean",
        "RequestFromUser": true
      }
    },
    "DataSources": {
      "0": {
        "Ident": "StiDataTableSource",
        "Name": "Customers",
        "Alias": "Customers",
        "Key": "2d38407ae58f45cab6ffcad502daa1d1",
        "Columns": {
          "0": {
            "Name": "Address",
            "Index": -1,
            "NameInSource": "Address",
            "Alias": "Address",
            "Type": "System.String"
          },
          "1": {
            "Name": "City",
            "Index": -1,
            "NameInSource": "City",
            "Alias": "City",
            "Type": "System.String"
          },
          "2": {
            "Name": "CompanyName",
            "Index": -1,
            "NameInSource": "CompanyName",
            "Alias": "CompanyName",
            "Type": "System.String"
          },
          "3": {
            "Name": "ContactName",
            "Index": -1,
            "NameInSource": "ContactName",
            "Alias": "ContactName",
            "Type": "System.String"
          },
          "4": {
            "Name": "ContactTitle",
            "Index": -1,
            "NameInSource": "ContactTitle",
            "Alias": "ContactTitle",
            "Type": "System.String"
          },
          "5": {
            "Name": "Country",
            "Index": -1,
            "NameInSource": "Country",
            "Alias": "Country",
            "Type": "System.String"
          },
          "6": {
            "Name": "CustomerID",
            "Index": -1,
            "NameInSource": "CustomerID",
            "Alias": "CustomerID",
            "Type": "System.String"
          },
          "7": {
            "Name": "Fax",
            "Index": -1,
            "NameInSource": "Fax",
            "Alias": "Fax",
            "Type": "System.String"
          },
          "8": {
            "Name": "Phone",
            "Index": -1,
            "NameInSource": "Phone",
            "Alias": "Phone",
            "Type": "System.String"
          },
          "9": {
            "Name": "PostalCode",
            "Index": -1,
            "NameInSource": "PostalCode",
            "Alias": "PostalCode",
            "Type": "System.String"
          },
          "10": {
            "Name": "Region",
            "Index": -1,
            "NameInSource": "Region",
            "Alias": "Region",
            "Type": "System.String"
          }
        },
        "NameInSource": "Demo.Customers"
      }
    },
    "Databases": {
      "0": {
        "Ident": "StiXmlDatabase",
        "Name": "Demo",
        "Alias": "Demo",
        "PathData": "resource://SelectingCountry"
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
              "Guid": "a195cb499e0b4bdcb84079abedbb3207",
              "ClientRectangle": "0,0,749,20",
              "ComponentStyle": "Footer2",
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
          "Ident": "StiReportTitleBand",
          "Name": "ReportTitleBand2",
          "Guid": "dc71e6748bb24f168226833c75cee439",
          "ClientRectangle": "0,20,749,80",
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
              "Guid": "7123692fb8e94f07b593c2c773f9f7e5",
              "ClientRectangle": "0,0,570,40",
              "ComponentStyle": "Header2",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Selecting Country"
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
              "Guid": "08478f239a3c433e8e935725529a41a4",
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
              "Name": "Text18",
              "Guid": "40b462fd71d64adba7ae41f775066020",
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
        "2": {
          "Ident": "StiHeaderBand",
          "Name": "HeaderBand1",
          "ClientRectangle": "0,140,749,40",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Border": ";;;;;;;solid:Black",
          "Brush": "solid:",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Text11",
              "ClientRectangle": "210,0,170,40",
              "ComponentStyle": "Header3",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Address"
              },
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "Font": "Segoe UI;12;Bold;",
              "Border": "Left, Right;White;;;;;;solid:Black",
              "Brush": "solid:77,182,172",
              "TextBrush": "solid:255,255,255"
            },
            "1": {
              "Ident": "StiText",
              "Name": "Text10",
              "ClientRectangle": "0,0,210,40",
              "ComponentStyle": "Header3",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Company"
              },
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "Font": "Segoe UI;12;Bold;",
              "Border": "Left, Right;White;;;;;;solid:Black",
              "Brush": "solid:77,182,172",
              "TextBrush": "solid:255,255,255"
            },
            "2": {
              "Ident": "StiText",
              "Name": "Text12",
              "ShiftMode": "DecreasingSize, OnlyInWidthOfComponent",
              "ClientRectangle": "380,0,130,40",
              "ComponentStyle": "Header3",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Phone"
              },
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "Font": "Segoe UI;12;Bold;",
              "Border": "Left, Right;White;;;;;;solid:Black",
              "Brush": "solid:77,182,172",
              "TextBrush": "solid:255,255,255"
            },
            "3": {
              "Ident": "StiText",
              "Name": "Text13",
              "ClientRectangle": "510,0,150,40",
              "ComponentStyle": "Header3",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Contact"
              },
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "Font": "Segoe UI;12;Bold;",
              "Border": "Left, Right;White;;;;;;solid:Black",
              "Brush": "solid:77,182,172",
              "TextBrush": "solid:255,255,255"
            },
            "4": {
              "Ident": "StiText",
              "Name": "Text9",
              "Guid": "25f1f4322b0b4ee28b083c644b29a683",
              "ClientRectangle": "660,0,89,40",
              "ComponentStyle": "Header3",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Country"
              },
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "Font": "Segoe UI;12;Bold;",
              "Border": "Left, Right;White;;;;;;solid:Black",
              "Brush": "solid:77,182,172",
              "TextBrush": "solid:255,255,255",
              "Type": "Expression"
            }
          },
          "PrintIfEmpty": true
        },
        "3": {
          "Ident": "StiDataBand",
          "Name": "DataBand1",
          "ClientRectangle": "0,220,749,20",
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
              "ClientRectangle": "380,0,130,20",
              "ComponentStyle": "Data1",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "{Customers.Phone}"
              },
              "VertAlignment": "Center",
              "Font": "Segoe UI;9.75;;",
              "Border": ";182,182,182;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:74,74,74",
              "TextOptions": {
                "Trimming": "Character"
              },
              "Margins": {
                "Left": 3.0,
                "Right": 3.0,
                "Top": 3.0,
                "Bottom": 3.0
              }
            },
            "1": {
              "Ident": "StiText",
              "Name": "Text3",
              "CanGrow": true,
              "GrowToHeight": true,
              "ClientRectangle": "510,0,150,20",
              "ComponentStyle": "Data1",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "{Customers.ContactTitle}"
              },
              "VertAlignment": "Center",
              "Font": "Segoe UI;9.75;;",
              "Border": ";182,182,182;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:74,74,74",
              "TextOptions": {
                "Trimming": "Character"
              },
              "Margins": {
                "Left": 3.0,
                "Right": 3.0,
                "Top": 3.0,
                "Bottom": 3.0
              }
            },
            "2": {
              "Ident": "StiText",
              "Name": "Text1",
              "CanGrow": true,
              "GrowToHeight": true,
              "ClientRectangle": "0,0,210,20",
              "ComponentStyle": "Data1",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "{Customers.CompanyName}"
              },
              "VertAlignment": "Center",
              "Font": "Segoe UI;9.75;;",
              "Border": ";182,182,182;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:74,74,74",
              "TextOptions": {
                "Trimming": "Character"
              },
              "Margins": {
                "Left": 3.0,
                "Right": 3.0,
                "Top": 3.0,
                "Bottom": 3.0
              }
            },
            "3": {
              "Ident": "StiText",
              "Name": "Text2",
              "CanGrow": true,
              "GrowToHeight": true,
              "ClientRectangle": "210,0,170,20",
              "ComponentStyle": "Data1",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "{Customers.Address}"
              },
              "VertAlignment": "Center",
              "Font": "Segoe UI;9.75;;",
              "Border": ";182,182,182;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:74,74,74",
              "TextOptions": {
                "Trimming": "Character"
              },
              "Margins": {
                "Left": 3.0,
                "Right": 3.0,
                "Top": 3.0,
                "Bottom": 3.0
              }
            },
            "4": {
              "Ident": "StiText",
              "Name": "Text14",
              "Guid": "10940acebff64115806c153cff3886ba",
              "CanGrow": true,
              "GrowToHeight": true,
              "ClientRectangle": "660,0,89,20",
              "ComponentStyle": "Data1",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "{Customers.Country}"
              },
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "Font": "Segoe UI;9.75;;",
              "Border": ";182,182,182;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:74,74,74",
              "TextOptions": {
                "Trimming": "Character"
              },
              "Margins": {
                "Left": 3.0,
                "Right": 3.0,
                "Top": 3.0,
                "Bottom": 3.0
              },
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
          "ClientRectangle": "0,280,749,10",
          "ComponentStyle": "Footer2",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Border": ";58,78,94;;;;;;solid:Black",
          "Brush": "solid:",
          "PrintIfEmpty": true,
          "PrintOnAllPages": true
        }
      },
      "PaperSize": "A4",
      "Watermark": {
        "Font": ";;Bold;",
        "TextBrush": "solid:50,0,0,0"
      }
    }
  }
}