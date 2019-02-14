var ParametersInvoice = {
  "ReportVersion": "2019.1.1.0",
  "ReportGuid": "86359ddab0e34912bbd339afb56f8325",
  "ReportName": "ParametersInvoice",
  "ReportAlias": "ParametersInvoice",
  "ReportDescription": "This sample demonstrates how to create invoice",
  "ReportCreated": "/Date(1085828340000+0000)/",
  "ReportChanged": "/Date(1522752672000+0000)/",
  "EngineVersion": "EngineV2",
  "CalculationMode": "Interpretation",
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
      "Border": ";Transparent;;;;;;solid:Black",
      "Brush": "solid:96,125,139",
      "TextBrush": "solid:255,255,255",
      "NegativeTextBrush": "solid:Red",
      "AllowUseBorderFormatting": false,
      "AllowUseBorderSides": false
    },
    "1": {
      "Ident": "StiStyle",
      "Name": "Title2",
      "VertAlignment": "Center",
      "Font": ";9;;",
      "Border": ";;;;;;;solid:Black",
      "Brush": "solid:",
      "TextBrush": "solid:69,90,100",
      "NegativeTextBrush": "solid:Red",
      "AllowUseBorderFormatting": false,
      "AllowUseBorderSides": false
    },
    "2": {
      "Ident": "StiStyle",
      "Name": "Header1",
      "VertAlignment": "Center",
      "Font": ";19;;",
      "Border": ";;;;;;;solid:Black",
      "Brush": "solid:",
      "TextBrush": "solid:0,0,0",
      "NegativeTextBrush": "solid:Red",
      "AllowUseBorderSides": false
    },
    "3": {
      "Ident": "StiStyle",
      "Name": "Header2",
      "HorAlignment": "Center",
      "VertAlignment": "Center",
      "Font": ";14.25;Bold;",
      "Border": ";;;;;;;solid:Black",
      "Brush": "solid:",
      "TextBrush": "solid:158,158,158",
      "NegativeTextBrush": "solid:Red",
      "AllowUseBorderSides": false
    },
    "4": {
      "Ident": "StiStyle",
      "Name": "Header3",
      "HorAlignment": "Center",
      "VertAlignment": "Center",
      "Font": ";16;;",
      "Border": "All;182,182,182;;;;;;solid:Black",
      "Brush": "solid:77,182,172",
      "TextBrush": "solid:255,255,255",
      "NegativeTextBrush": "solid:Red",
      "AllowUseBorderFormatting": false,
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
      "Name": "Data1",
      "VertAlignment": "Center",
      "Font": ";10;;",
      "Border": ";182,182,182;;;;;;solid:Black",
      "Brush": "solid:",
      "TextBrush": "solid:74,74,74",
      "NegativeTextBrush": "solid:Red",
      "AllowUseBorderFormatting": false,
      "AllowUseBorderSides": false,
      "AllowUseBrush": false,
      "AllowUseTextBrush": false
    },
    "7": {
      "Ident": "StiStyle",
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
      "Name": "Footer1",
      "VertAlignment": "Center",
      "Font": ";9;;",
      "Border": "Top;Transparent;;;;;;solid:Black",
      "Brush": "solid:255,248,225",
      "TextBrush": "solid:0,0,0",
      "NegativeTextBrush": "solid:Red",
      "AllowUseFont": false,
      "AllowUseBorderSides": false
    },
    "10": {
      "Ident": "StiStyle",
      "Name": "Footer2",
      "HorAlignment": "Right",
      "VertAlignment": "Center",
      "Font": ";10;Bold;",
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
        "Name": "Products",
        "Alias": "Products",
        "Type": "Xml",
        "Image": "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"
      },
      "1": {
        "Name": "Demo",
        "Alias": "Demo",
        "Type": "Xsd",
        "Image": "bxqayGFwFyXe3o7CY1UENirl2iVyaUONlxLoaTnEi8FM4ODCeZoJSZe1MQxj8xFXpO61cKYkjL2fdfobQhqSQGKtd/6Z9WQHorzr0oXh0r28G/bMCyyzH9e37CkRNmp69T0sp+7ZH09DM1LzGODaC+nfx83eZGddxdcp/qvTOpmx+Dk3YO4/s13ObzC5nGzsDsr1KhzXnl+gf8Ow9Kg4R8M2beyieIIhzd9qov1NWjhGvTKfPSwdYWMA2Ed3NrvsiDjOrqVHfLHymxN1YRYk5uRX51YA2UImohjtgZI0wEnGJSSW2hxmYofEwkv/YTXMDlniHJ/aGt01xzLQkAPOUsxQSrPYdeJlKCmY5Pnf/4I+ATEcJqMCqx2MvTy6cN0jDlgGr4djFM2/ZVgfhpu66PxT2aDFdNKwDGLJwt6wXztZGnxBNm4j3/pvWw7q6dcQ16uk8QN6f/OfofcsC9B2dpCf1N2urqdWAkwiYNYqENVdA5yobqXvJ+a+POsbBZJtnIKH3gLihc0D+s5UxU4FUZzijdiAaxzX+y2fCl8+InLdwuryzEp8D0RSCGumNcWF9Ju7kVYbs4lav+6zYy7oitH3HRLC+J8KNbEcbKmz78WjXgiXR47U7KixlJ+DyZoT6oS+WaflxqUSB55lAuLEhjr9MdYvrp3DmWmVl9zY8G7driNIt2GqSDQ0Wx1Pczs/18dBn2bg7t5SR9ZFtSzEugsDmOfJ5Xo8FfY35mnjuaLqlXgu/KQQSyd+bH5aLmamP9lRmGntbJ7/EWf4SdJ4R7JpoQQolrJQMDTJ1Weex1QYkzVaBo7smF8AHGBJGWY4xHdUps6DH1uOn93Kbd72VVhdP/TP8G1O7Tia7bl1lgkm51l+g+KZVY769ougkFAfy819eSFQ8XbuAell6cnT9N/lvoi63J2UEc7ISCYu1smkSxMSpaym9fETkj95q9rK0B4fNqZnUPd0HLjNzRPln1tSl+JoHtchH5pht3GaOtw+DyP1vep8qGwBJ4rVpMfUzGEUg5oBsn7EaZNjMwOgn8mzPmpkPvTaAQPortGi9HKLqvVCkWZGBifwCm3kh9tWE83OPQP267aBW38/Wt+Gvf7QIVvbQB3HxRaAbZanMj0M/wFPOs1f+Kgyb11k6NEUehyF0CqD4MQGOXLHpuVNXoZhqWyYP9QCPM+pD5zPNz6/Sku5RSoClYsDuoCWo179nVIo2nYvq6WRSCdZXUjD28K78833ZcURNzBj8889xrgYiZaW9/o8/y6d0Th52lqTD1GuK4o5DWnnaWNUTiYtmptXqgN7hvyknL+otgmCfPqaAOMCUxvDLK5GGMYPocy6guNvPw7xNKrJw3FsmHtc9IZtFDr/7wMFtBmUEgMp4c3/45F7AW6TqW1WFqnHTtXOgTAuSKo8e+ZWJF3OLbtEYIZ5wXq1dD2BaNRA7wKn0eRGWohKzJfr7iVko6EadkxkFmRowfiY258UHKSB3nN0Kk0CsZSTz8pCCZ8m/IV81q7/C0F2ouE3/vzQOEwak7neHOxJ9qJ+sCKFS3qUB1S+IeifkyOl1wWA3wmmH55Fv9g1a5wj1cF/Gzirug8ykUwAGk7HKfTplPo4XVNCA54dLJgDEhVOtJxXvide+D0WcFrQwcy1HiMGxGfrZzK4FtowUZ0sNxGCxLUk00611NyC7EhFQOGN0dA2/+V+tB6E1nzFA24EV4CNv38jM82vpF42reEdO7/EZDV8RonWeuWzemOr3iLG+UZzZ54="
      }
    },
    "Variables": {
      "0": {
        "Name": "InvoiceNumber",
        "Alias": "InvoiceNumber",
        "Type": "System.Int32",
        "RequestFromUser": true
      },
      "1": {
        "Name": "InvoiceDate",
        "DialogInfo": {
          "DateTimeType": "DateAndTime"
        },
        "Alias": "InvoiceDate",
        "Type": "System.DateTime",
        "RequestFromUser": true
      },
      "2": {
        "Name": "CustomerID",
        "Alias": "CustomerID",
        "Type": "System.Int32",
        "RequestFromUser": true
      },
      "3": {
        "Value": "Name",
        "Name": "BillTo_Name",
        "Alias": "Bill To - Name",
        "Type": "System.String",
        "RequestFromUser": true,
        "Category": "BILLTO"
      },
      "4": {
        "Value": "Street Address",
        "Name": "BillTo_Address",
        "Alias": "Bill To - Address",
        "Type": "System.String",
        "RequestFromUser": true,
        "Category": "BILLTO"
      },
      "5": {
        "Value": "Address 2",
        "Name": "BillTo_Address2",
        "Alias": "Bill To - Address 2",
        "Type": "System.String",
        "RequestFromUser": true,
        "Category": "BILLTO"
      },
      "6": {
        "Value": "City",
        "Name": "BillTo_City",
        "Alias": "Bill To - City",
        "Type": "System.String",
        "RequestFromUser": true,
        "Category": "BILLTO"
      },
      "7": {
        "Name": "BillTo_State",
        "DialogInfo": {
          "Keys": {
            "0": "AL",
            "1": "AK",
            "2": "AZ",
            "3": "AR",
            "4": "CA",
            "5": "CO",
            "6": "CT",
            "7": "DE",
            "8": "FL",
            "9": "GA",
            "10": "HI",
            "11": "ID",
            "12": "IL",
            "13": "IN",
            "14": "IA",
            "15": "KS",
            "16": "KY",
            "17": "LA",
            "18": "ME",
            "19": "MD",
            "20": "MA",
            "21": "MI",
            "22": "MN",
            "23": "MS",
            "24": "MO",
            "25": "MT",
            "26": "NE",
            "27": "NV",
            "28": "NH",
            "29": "NJ",
            "30": "NM",
            "31": "NY",
            "32": "NC",
            "33": "ND",
            "34": "OH",
            "35": "OK",
            "36": "OR",
            "37": "PA",
            "38": "RI",
            "39": "SC",
            "40": "SD",
            "41": "TN",
            "42": "TX",
            "43": "UT",
            "44": "VT",
            "45": "VA",
            "46": "WA",
            "47": "WV",
            "48": "WI",
            "49": "WY"
          },
          "Values": {
            "0": "Alabama",
            "1": "Alaska",
            "2": "Arizona",
            "3": "Arkansas",
            "4": "California",
            "5": "Colorado",
            "6": "Connecticut",
            "7": "Delaware",
            "8": "Florida",
            "9": "Georgia",
            "10": "Hawaii",
            "11": "Idaho",
            "12": "Illinois",
            "13": "Indiana",
            "14": "Iowa",
            "15": "Kansas",
            "16": "Kentucky",
            "17": "Louisiana",
            "18": "Maine",
            "19": "Maryland",
            "20": "Massachusetts",
            "21": "Michigan",
            "22": "Minnesota",
            "23": "Mississippi",
            "24": "Missouri",
            "25": "Montana",
            "26": "Nebraska",
            "27": "Nevada",
            "28": "New Hampshire",
            "29": "New Jersey",
            "30": "New Mexico",
            "31": "New York",
            "32": "North Carolina",
            "33": "North Dakota",
            "34": "Ohio",
            "35": "Oklahoma",
            "36": "Oregon",
            "37": "Pennsylvania",
            "38": "Rhode Island",
            "39": "South Carolina",
            "40": "South Dakota",
            "41": "Tennessee",
            "42": "Texas",
            "43": "Utah",
            "44": "Vermont",
            "45": "Virginia",
            "46": "Washington",
            "47": "West Virginia",
            "48": "Wisconsin",
            "49": "Wyoming"
          }
        },
        "Alias": "Bill To - State",
        "Type": "System.String",
        "RequestFromUser": true,
        "Category": "BILLTO"
      },
      "8": {
        "Value": "ZIP CODE",
        "Name": "BillTo_ZipCode",
        "Alias": "Bill To - ZIP Code",
        "Type": "System.String",
        "RequestFromUser": true,
        "Category": "BILLTO"
      },
      "9": {
        "Value": "Name",
        "Name": "ShipTo_Name",
        "Alias": "Ship To - Name",
        "Type": "System.String",
        "RequestFromUser": true,
        "Category": "SHIPTO"
      },
      "10": {
        "Value": "Street Address",
        "Name": "ShipTo_Address",
        "Alias": "Ship To - Address",
        "Type": "System.String",
        "RequestFromUser": true,
        "Category": "SHIPTO"
      },
      "11": {
        "Value": "Address 2",
        "Name": "ShipTo_Address2",
        "Alias": "Ship To - Address 2",
        "Type": "System.String",
        "RequestFromUser": true,
        "Category": "SHIPTO"
      },
      "12": {
        "Value": "City",
        "Name": "ShipTo_City",
        "Alias": "Ship To - City",
        "Type": "System.String",
        "RequestFromUser": true,
        "Category": "SHIPTO"
      },
      "13": {
        "Name": "ShipTo_State",
        "DialogInfo": {
          "Keys": {
            "0": "AL",
            "1": "AK",
            "2": "AZ",
            "3": "AR",
            "4": "CA",
            "5": "CO",
            "6": "CT",
            "7": "DE",
            "8": "FL",
            "9": "GA",
            "10": "HI",
            "11": "ID",
            "12": "IL",
            "13": "IN",
            "14": "IA",
            "15": "KS",
            "16": "KY",
            "17": "LA",
            "18": "ME",
            "19": "MD",
            "20": "MA",
            "21": "MI",
            "22": "MN",
            "23": "MS",
            "24": "MO",
            "25": "MT",
            "26": "NE",
            "27": "NV",
            "28": "NH",
            "29": "NJ",
            "30": "NM",
            "31": "NY",
            "32": "NC",
            "33": "ND",
            "34": "OH",
            "35": "OK",
            "36": "OR",
            "37": "PA",
            "38": "RI",
            "39": "SC",
            "40": "SD",
            "41": "TN",
            "42": "TX",
            "43": "UT",
            "44": "VT",
            "45": "VA",
            "46": "WA",
            "47": "WV",
            "48": "WI",
            "49": "WY"
          },
          "Values": {
            "0": "Alabama",
            "1": "Alaska",
            "2": "Arizona",
            "3": "Arkansas",
            "4": "California",
            "5": "Colorado",
            "6": "Connecticut",
            "7": "Delaware",
            "8": "Florida",
            "9": "Georgia",
            "10": "Hawaii",
            "11": "Idaho",
            "12": "Illinois",
            "13": "Indiana",
            "14": "Iowa",
            "15": "Kansas",
            "16": "Kentucky",
            "17": "Louisiana",
            "18": "Maine",
            "19": "Maryland",
            "20": "Massachusetts",
            "21": "Michigan",
            "22": "Minnesota",
            "23": "Mississippi",
            "24": "Missouri",
            "25": "Montana",
            "26": "Nebraska",
            "27": "Nevada",
            "28": "New Hampshire",
            "29": "New Jersey",
            "30": "New Mexico",
            "31": "New York",
            "32": "North Carolina",
            "33": "North Dakota",
            "34": "Ohio",
            "35": "Oklahoma",
            "36": "Oregon",
            "37": "Pennsylvania",
            "38": "Rhode Island",
            "39": "South Carolina",
            "40": "South Dakota",
            "41": "Tennessee",
            "42": "Texas",
            "43": "Utah",
            "44": "Vermont",
            "45": "Virginia",
            "46": "Washington",
            "47": "West Virginia",
            "48": "Wisconsin",
            "49": "Wyoming"
          }
        },
        "Alias": "Ship To - State",
        "Type": "System.String",
        "RequestFromUser": true,
        "Category": "SHIPTO"
      },
      "14": {
        "Value": "ZIP CODE",
        "Name": "ShipTo_ZipCode",
        "Alias": "Ship To - ZIP Code",
        "Type": "System.String",
        "RequestFromUser": true,
        "Category": "SHIPTO"
      }
    },
    "DataSources": {
      "0": {
        "Ident": "StiDataTableSource",
        "Name": "Products",
        "Alias": "Products",
        "Columns": {
          "0": {
            "Name": "ProductID",
            "Index": -1,
            "NameInSource": "ProductID",
            "Alias": "ProductID",
            "Type": "System.Int32"
          },
          "1": {
            "Name": "ProductName",
            "Index": -1,
            "NameInSource": "ProductName",
            "Alias": "ProductName",
            "Type": "System.String"
          },
          "2": {
            "Name": "SupplierID",
            "Index": -1,
            "NameInSource": "SupplierID",
            "Alias": "SupplierID",
            "Type": "System.Int32"
          },
          "3": {
            "Name": "CategoryID",
            "Index": -1,
            "NameInSource": "CategoryID",
            "Alias": "CategoryID",
            "Type": "System.Int32"
          },
          "4": {
            "Name": "QuantityPerUnit",
            "Index": -1,
            "NameInSource": "QuantityPerUnit",
            "Alias": "QuantityPerUnit",
            "Type": "System.String"
          },
          "5": {
            "Name": "UnitPrice",
            "Index": -1,
            "NameInSource": "UnitPrice",
            "Alias": "UnitPrice",
            "Type": "System.Decimal"
          },
          "6": {
            "Name": "UnitsInStock",
            "Index": -1,
            "NameInSource": "UnitsInStock",
            "Alias": "UnitsInStock",
            "Type": "System.Int16"
          },
          "7": {
            "Name": "UnitsOnOrder",
            "Index": -1,
            "NameInSource": "UnitsOnOrder",
            "Alias": "UnitsOnOrder",
            "Type": "System.Int16"
          },
          "8": {
            "Name": "ReorderLevel",
            "Index": -1,
            "NameInSource": "ReorderLevel",
            "Alias": "ReorderLevel",
            "Type": "System.Int16"
          },
          "9": {
            "Name": "Discontinued",
            "Index": -1,
            "NameInSource": "Discontinued",
            "Alias": "Discontinued",
            "Type": "System.Boolean"
          }
        },
        "NameInSource": "Demo.Products"
      },
      "1": {
        "Ident": "StiDataTableSource",
        "Name": "Categories",
        "Alias": "Categories",
        "Columns": {
          "0": {
            "Name": "CategoryID",
            "Index": -1,
            "NameInSource": "CategoryID",
            "Alias": "CategoryID",
            "Type": "System.Int32"
          },
          "1": {
            "Name": "CategoryName",
            "Index": -1,
            "NameInSource": "CategoryName",
            "Alias": "CategoryName",
            "Type": "System.String"
          },
          "2": {
            "Name": "Description",
            "Index": -1,
            "NameInSource": "Description",
            "Alias": "Description",
            "Type": "System.String"
          },
          "3": {
            "Name": "Picture",
            "Index": -1,
            "NameInSource": "Picture",
            "Alias": "Picture",
            "Type": "System.Byte[]"
          }
        },
        "NameInSource": "Demo.Categories"
      },
      "2": {
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
      },
      "3": {
        "Ident": "StiDataTableSource",
        "Name": "Employees",
        "Alias": "Employees",
        "Columns": {
          "0": {
            "Name": "EmployeeID",
            "Index": -1,
            "NameInSource": "EmployeeID",
            "Alias": "EmployeeID",
            "Type": "System.Int32"
          },
          "1": {
            "Name": "LastName",
            "Index": -1,
            "NameInSource": "LastName",
            "Alias": "LastName",
            "Type": "System.String"
          },
          "2": {
            "Name": "FirstName",
            "Index": -1,
            "NameInSource": "FirstName",
            "Alias": "FirstName",
            "Type": "System.String"
          },
          "3": {
            "Name": "Title",
            "Index": -1,
            "NameInSource": "Title",
            "Alias": "Title",
            "Type": "System.String"
          },
          "4": {
            "Name": "TitleOfCourtesy",
            "Index": -1,
            "NameInSource": "TitleOfCourtesy",
            "Alias": "TitleOfCourtesy",
            "Type": "System.String"
          },
          "5": {
            "Name": "BirthDate",
            "Index": -1,
            "NameInSource": "BirthDate",
            "Alias": "BirthDate",
            "Type": "System.DateTime"
          },
          "6": {
            "Name": "HireDate",
            "Index": -1,
            "NameInSource": "HireDate",
            "Alias": "HireDate",
            "Type": "System.DateTime"
          },
          "7": {
            "Name": "Address",
            "Index": -1,
            "NameInSource": "Address",
            "Alias": "Address",
            "Type": "System.String"
          },
          "8": {
            "Name": "City",
            "Index": -1,
            "NameInSource": "City",
            "Alias": "City",
            "Type": "System.String"
          },
          "9": {
            "Name": "Region",
            "Index": -1,
            "NameInSource": "Region",
            "Alias": "Region",
            "Type": "System.String"
          },
          "10": {
            "Name": "PostalCode",
            "Index": -1,
            "NameInSource": "PostalCode",
            "Alias": "PostalCode",
            "Type": "System.String"
          },
          "11": {
            "Name": "Country",
            "Index": -1,
            "NameInSource": "Country",
            "Alias": "Country",
            "Type": "System.String"
          },
          "12": {
            "Name": "HomePhone",
            "Index": -1,
            "NameInSource": "HomePhone",
            "Alias": "HomePhone",
            "Type": "System.String"
          },
          "13": {
            "Name": "Extension",
            "Index": -1,
            "NameInSource": "Extension",
            "Alias": "Extension",
            "Type": "System.String"
          },
          "14": {
            "Name": "Photo",
            "Index": -1,
            "NameInSource": "Photo",
            "Alias": "Photo",
            "Type": "System.Byte[]"
          },
          "15": {
            "Name": "Notes",
            "Index": -1,
            "NameInSource": "Notes",
            "Alias": "Notes",
            "Type": "System.String"
          },
          "16": {
            "Name": "ReportsTo",
            "Index": -1,
            "NameInSource": "ReportsTo",
            "Alias": "ReportsTo",
            "Type": "System.Int32"
          }
        },
        "NameInSource": "Demo.Employees"
      },
      "4": {
        "Ident": "StiDataTableSource",
        "Name": "Order Details",
        "Alias": "Order Details",
        "Columns": {
          "0": {
            "Name": "OrderID",
            "Index": -1,
            "NameInSource": "OrderID",
            "Alias": "OrderID",
            "Type": "System.Int32"
          },
          "1": {
            "Name": "ProductID",
            "Index": -1,
            "NameInSource": "ProductID",
            "Alias": "ProductID",
            "Type": "System.Int32"
          },
          "2": {
            "Name": "UnitPrice",
            "Index": -1,
            "NameInSource": "UnitPrice",
            "Alias": "UnitPrice",
            "Type": "System.Decimal"
          },
          "3": {
            "Name": "Quantity",
            "Index": -1,
            "NameInSource": "Quantity",
            "Alias": "Quantity",
            "Type": "System.Int16"
          },
          "4": {
            "Name": "Discount",
            "Index": -1,
            "NameInSource": "Discount",
            "Alias": "Discount",
            "Type": "System.Single"
          }
        },
        "NameInSource": "Demo.Order Details"
      },
      "5": {
        "Ident": "StiDataTableSource",
        "Name": "Orders",
        "Alias": "Orders",
        "Columns": {
          "0": {
            "Name": "OrderID",
            "Index": -1,
            "NameInSource": "OrderID",
            "Alias": "OrderID",
            "Type": "System.Int32"
          },
          "1": {
            "Name": "CustomerID",
            "Index": -1,
            "NameInSource": "CustomerID",
            "Alias": "CustomerID",
            "Type": "System.String"
          },
          "2": {
            "Name": "EmployeeID",
            "Index": -1,
            "NameInSource": "EmployeeID",
            "Alias": "EmployeeID",
            "Type": "System.Int32"
          },
          "3": {
            "Name": "OrderDate",
            "Index": -1,
            "NameInSource": "OrderDate",
            "Alias": "OrderDate",
            "Type": "System.DateTime"
          },
          "4": {
            "Name": "RequiredDate",
            "Index": -1,
            "NameInSource": "RequiredDate",
            "Alias": "RequiredDate",
            "Type": "System.DateTime"
          },
          "5": {
            "Name": "ShippedDate",
            "Index": -1,
            "NameInSource": "ShippedDate",
            "Alias": "ShippedDate",
            "Type": "System.DateTime"
          },
          "6": {
            "Name": "ShipVia",
            "Index": -1,
            "NameInSource": "ShipVia",
            "Alias": "ShipVia",
            "Type": "System.Int32"
          },
          "7": {
            "Name": "Freight",
            "Index": -1,
            "NameInSource": "Freight",
            "Alias": "Freight",
            "Type": "System.Decimal"
          },
          "8": {
            "Name": "ShipName",
            "Index": -1,
            "NameInSource": "ShipName",
            "Alias": "ShipName",
            "Type": "System.String"
          },
          "9": {
            "Name": "ShipAddress",
            "Index": -1,
            "NameInSource": "ShipAddress",
            "Alias": "ShipAddress",
            "Type": "System.String"
          },
          "10": {
            "Name": "ShipCity",
            "Index": -1,
            "NameInSource": "ShipCity",
            "Alias": "ShipCity",
            "Type": "System.String"
          },
          "11": {
            "Name": "ShipRegion",
            "Index": -1,
            "NameInSource": "ShipRegion",
            "Alias": "ShipRegion",
            "Type": "System.String"
          },
          "12": {
            "Name": "ShipPostalCode",
            "Index": -1,
            "NameInSource": "ShipPostalCode",
            "Alias": "ShipPostalCode",
            "Type": "System.String"
          },
          "13": {
            "Name": "ShipCountry",
            "Index": -1,
            "NameInSource": "ShipCountry",
            "Alias": "ShipCountry",
            "Type": "System.String"
          }
        },
        "NameInSource": "Demo.Orders"
      },
      "6": {
        "Ident": "StiDataTableSource",
        "Name": "Shippers",
        "Alias": "Shippers",
        "Columns": {
          "0": {
            "Name": "ShipperID",
            "Index": -1,
            "NameInSource": "ShipperID",
            "Alias": "ShipperID",
            "Type": "System.Int32"
          },
          "1": {
            "Name": "CompanyName",
            "Index": -1,
            "NameInSource": "CompanyName",
            "Alias": "CompanyName",
            "Type": "System.String"
          },
          "2": {
            "Name": "Phone",
            "Index": -1,
            "NameInSource": "Phone",
            "Alias": "Phone",
            "Type": "System.String"
          }
        },
        "NameInSource": "Demo.Shippers"
      },
      "7": {
        "Ident": "StiDataTableSource",
        "Name": "Suppliers",
        "Alias": "Suppliers",
        "Columns": {
          "0": {
            "Name": "SupplierID",
            "Index": -1,
            "NameInSource": "SupplierID",
            "Alias": "SupplierID",
            "Type": "System.Int32"
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
          },
          "11": {
            "Name": "HomePage",
            "Index": -1,
            "NameInSource": "HomePage",
            "Alias": "HomePage",
            "Type": "System.String"
          }
        },
        "NameInSource": "Demo.Suppliers"
      },
      "8": {
        "Ident": "StiDataTableSource",
        "Name": "Countries",
        "Alias": "Countries",
        "Columns": {
          "0": {
            "Name": "CountriesID",
            "Index": -1,
            "NameInSource": "CountriesID",
            "Alias": "CountriesID",
            "Type": "System.Int32"
          },
          "1": {
            "Name": "Flag",
            "Index": -1,
            "NameInSource": "Flag",
            "Alias": "Flag",
            "Type": "System.Byte[]"
          },
          "2": {
            "Name": "CountryName",
            "Index": -1,
            "NameInSource": "CountryName",
            "Alias": "CountryName",
            "Type": "System.String"
          }
        },
        "NameInSource": "Demo.Countries"
      },
      "9": {
        "Ident": "StiDataTableSource",
        "Name": "States",
        "Alias": "States",
        "Columns": {
          "0": {
            "Name": "Name",
            "Index": -1,
            "NameInSource": "Name",
            "Alias": "Name",
            "Type": "System.String"
          },
          "1": {
            "Name": "USPS",
            "Index": -1,
            "NameInSource": "USPS",
            "Alias": "USPS",
            "Type": "System.String"
          },
          "2": {
            "Name": "Population",
            "Index": -1,
            "NameInSource": "Population",
            "Alias": "Population",
            "Type": "System.Int32"
          },
          "3": {
            "Name": "Capital",
            "Index": -1,
            "NameInSource": "Capital",
            "Alias": "Capital",
            "Type": "System.String"
          }
        },
        "NameInSource": "Demo.States"
      },
      "10": {
        "Ident": "StiDataTableSource",
        "Name": "Auto",
        "Alias": "Auto",
        "Columns": {
          "0": {
            "Name": "Rank",
            "Index": -1,
            "NameInSource": "Rank",
            "Alias": "Rank",
            "Type": "System.Double"
          },
          "1": {
            "Name": "Country",
            "Index": -1,
            "NameInSource": "Country",
            "Alias": "Country",
            "Type": "System.String"
          },
          "2": {
            "Name": "Year2009",
            "Index": -1,
            "NameInSource": "Year2009",
            "Alias": "Year2009",
            "Type": "System.Double"
          },
          "3": {
            "Name": "Year2005",
            "Index": -1,
            "NameInSource": "Year2005",
            "Alias": "Year2005",
            "Type": "System.Double"
          },
          "4": {
            "Name": "Year2000",
            "Index": -1,
            "NameInSource": "Year2000",
            "Alias": "Year2000",
            "Type": "System.Double"
          }
        },
        "NameInSource": "Demo.Auto"
      },
      "11": {
        "Ident": "StiDataTableSource",
        "Name": "GlobalGrowth",
        "Alias": "GlobalGrowth",
        "Columns": {
          "0": {
            "Name": "Region",
            "Index": -1,
            "NameInSource": "Region",
            "Alias": "Region",
            "Type": "System.String"
          },
          "1": {
            "Name": "Year2006",
            "Index": -1,
            "NameInSource": "Year2006",
            "Alias": "Year2006",
            "Type": "System.Double"
          },
          "2": {
            "Name": "Year2007",
            "Index": -1,
            "NameInSource": "Year2007",
            "Alias": "Year2007",
            "Type": "System.Double"
          },
          "3": {
            "Name": "Year2008",
            "Index": -1,
            "NameInSource": "Year2008",
            "Alias": "Year2008",
            "Type": "System.Double"
          },
          "4": {
            "Name": "Year2009",
            "Index": -1,
            "NameInSource": "Year2009",
            "Alias": "Year2009",
            "Type": "System.Double"
          }
        },
        "NameInSource": "Demo.GlobalGrowth"
      },
      "12": {
        "Ident": "StiDataTableSource",
        "Name": "Opec",
        "Alias": "Opec",
        "Columns": {
          "0": {
            "Name": "Year",
            "Index": -1,
            "NameInSource": "Year",
            "Alias": "Year",
            "Type": "System.Double"
          },
          "1": {
            "Name": "Iran",
            "Index": -1,
            "NameInSource": "Iran",
            "Alias": "Iran",
            "Type": "System.Double"
          },
          "2": {
            "Name": "Iraq",
            "Index": -1,
            "NameInSource": "Iraq",
            "Alias": "Iraq",
            "Type": "System.Double"
          },
          "3": {
            "Name": "Kuwait",
            "Index": -1,
            "NameInSource": "Kuwait",
            "Alias": "Kuwait",
            "Type": "System.Double"
          },
          "4": {
            "Name": "Saudi Arabia",
            "Index": -1,
            "NameInSource": "Saudi Arabia",
            "Alias": "Saudi Arabia",
            "Type": "System.Double"
          },
          "5": {
            "Name": "UAE",
            "Index": -1,
            "NameInSource": "UAE",
            "Alias": "UAE",
            "Type": "System.Double"
          },
          "6": {
            "Name": "Venezuela",
            "Index": -1,
            "NameInSource": "Venezuela",
            "Alias": "Venezuela",
            "Type": "System.Double"
          },
          "7": {
            "Name": "Libya",
            "Index": -1,
            "NameInSource": "Libya",
            "Alias": "Libya",
            "Type": "System.Double"
          },
          "8": {
            "Name": "Nigeria",
            "Index": -1,
            "NameInSource": "Nigeria",
            "Alias": "Nigeria",
            "Type": "System.Double"
          }
        },
        "NameInSource": "Demo.Opec"
      }
    },
    "Databases": {
      "0": {
        "Ident": "StiXmlDatabase",
        "Name": "Demo",
        "Alias": "Demo",
        "PathSchema": "resource://Demo",
        "PathData": "resource://Products"
      }
    },
    "Relations": {
      "0": {
        "Name": "Categories",
        "ChildColumns": {
          "0": "CategoryID"
        },
        "ParentColumns": {
          "0": "CategoryID"
        },
        "NameInSource": "CategoriesProducts",
        "Alias": "Categories",
        "ParentSource": "Categories",
        "ChildSource": "Products"
      },
      "1": {
        "Name": "Suppliers",
        "ChildColumns": {
          "0": "SupplierID"
        },
        "ParentColumns": {
          "0": "SupplierID"
        },
        "NameInSource": "SuppliersProducts",
        "Alias": "Suppliers",
        "ParentSource": "Suppliers",
        "ChildSource": "Products"
      },
      "2": {
        "Name": "Orders",
        "ChildColumns": {
          "0": "OrderID"
        },
        "ParentColumns": {
          "0": "OrderID"
        },
        "NameInSource": "OrdersOrderDetails",
        "Alias": "Orders",
        "ParentSource": "Orders",
        "ChildSource": "Order Details"
      },
      "3": {
        "Name": "Products",
        "ChildColumns": {
          "0": "ProductID"
        },
        "ParentColumns": {
          "0": "ProductID"
        },
        "NameInSource": "ProductsOrderDetails",
        "Alias": "Products",
        "ParentSource": "Products",
        "ChildSource": "Order Details"
      },
      "4": {
        "Name": "Customers",
        "ChildColumns": {
          "0": "CustomerID"
        },
        "ParentColumns": {
          "0": "CustomerID"
        },
        "NameInSource": "CustomersOrders",
        "Alias": "Customers",
        "ParentSource": "Customers",
        "ChildSource": "Orders"
      },
      "5": {
        "Name": "Employees",
        "ChildColumns": {
          "0": "EmployeeID"
        },
        "ParentColumns": {
          "0": "EmployeeID"
        },
        "NameInSource": "EmployeesOrders",
        "Alias": "Employees",
        "ParentSource": "Employees",
        "ChildSource": "Orders"
      },
      "6": {
        "Name": "Shippers",
        "ChildColumns": {
          "0": "ShipVia"
        },
        "ParentColumns": {
          "0": "ShipperID"
        },
        "NameInSource": "ShippersOrders",
        "Alias": "Shippers",
        "ParentSource": "Shippers",
        "ChildSource": "Orders"
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
          "Guid": "82505fc8c1614e46b13c21042595b7b6",
          "ClientRectangle": "0,26.7,19,1",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Border": ";;;;;;;solid:Black",
          "Brush": "solid:",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Text15",
              "Guid": "d5bdd258319f415d9b50b9cb10cf2be1",
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "0,0.4,19,0.4",
              "ComponentStyle": "Footer2",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "{PageNofM}"
              },
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "Font": ";10;Bold;",
              "Border": ";58,78,94;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:158,158,158",
              "TextQuality": "Typographic"
            }
          }
        },
        "1": {
          "Ident": "StiReportTitleBand",
          "Name": "ReportTitleBand2",
          "Guid": "9a06fb570c99476faf689fa996c826ea",
          "ClientRectangle": "0,0.4,19,2",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Border": ";;;;;;;solid:Black",
          "Brush": "solid:",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Text4",
              "Guid": "bdd94e8edd2646b19ebdcc1a8b7d1944",
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "9.4,0,9.6,1.4",
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
              "Border": ";193,152,89;;;;;;solid:Black",
              "Brush": "solid:96,125,139",
              "TextBrush": "solid:255,255,255",
              "TextQuality": "Typographic",
              "Margins": {
                "Left": 0.0,
                "Right": 5.0,
                "Top": 0.0,
                "Bottom": 0.0
              },
              "Type": "Expression"
            },
            "1": {
              "Ident": "StiText",
              "Name": "Text7",
              "Guid": "82314b967c3f4fae977cdf987d02380f",
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "0,0,9.4,1.4",
              "ComponentStyle": "Title1",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Invoice"
              },
              "VertAlignment": "Center",
              "Font": ";19;;",
              "Border": ";193,152,89;;;;;;solid:Black",
              "Brush": "solid:96,125,139",
              "TextBrush": "solid:255,255,255",
              "TextQuality": "Typographic",
              "Margins": {
                "Left": 5.0,
                "Right": 0.0,
                "Top": 0.0,
                "Bottom": 0.0
              },
              "Type": "Expression"
            },
            "2": {
              "Ident": "StiText",
              "Name": "Text13",
              "Guid": "bc54ceb346334a2dae89a33d254b9da9",
              "CanGrow": true,
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "0,1.4,14.6,0.4",
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
              "TextBrush": "solid:69,90,100",
              "TextOptions": {
                "WordWrap": true
              },
              "TextQuality": "Typographic",
              "Type": "Expression"
            },
            "3": {
              "Ident": "StiText",
              "Name": "Text14",
              "Guid": "28f7a123522b4cbb8cb1eaa9aee8a7ef",
              "CanGrow": true,
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "14.6,1.4,4.4,0.4",
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
              "TextBrush": "solid:69,90,100",
              "TextOptions": {
                "WordWrap": true
              },
              "TextQuality": "Typographic",
              "Type": "Expression"
            }
          }
        },
        "2": {
          "Ident": "StiReportTitleBand",
          "Name": "ReportTitle1",
          "ClientRectangle": "0,3.2,19,1.8",
          "ComponentStyle": "Footer1",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Border": ";Transparent;;;;;;solid:Black",
          "Brush": "solid:255,248,225",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Text17",
              "Guid": "b07fa5d45be84108a7540d6218e6dd2a",
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "0,0,1.8,1.8",
              "ComponentStyle": "Footer1",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "BILL\r\nTO"
              },
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "Font": ";9.75;;",
              "Border": ";Transparent;;;;;;solid:Black",
              "Brush": "solid:255,248,225",
              "TextBrush": "solid:0,0,0",
              "TextQuality": "Typographic",
              "Type": "Expression"
            },
            "1": {
              "Ident": "StiText",
              "Name": "Text18",
              "Guid": "a7d90218912644aa8dd7e69dff97f8f9",
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "1.8,0,4.2,1.8",
              "ComponentStyle": "Footer1",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "{BillTo_Name}\r\n{BillTo_Address}\r\n{BillTo_Address2}\r\n{BillTo_City}, {BillTo_State} {BillTo_ZipCode}"
              },
              "Font": ";9.75;;",
              "Border": ";Transparent;;;;;;solid:Black",
              "Brush": "solid:255,248,225",
              "TextBrush": "solid:0,0,0",
              "TextQuality": "Typographic",
              "Margins": {
                "Left": 5.0,
                "Right": 0.0,
                "Top": 5.0,
                "Bottom": 0.0
              },
              "Type": "Expression"
            },
            "2": {
              "Ident": "StiText",
              "Name": "Text19",
              "Guid": "821f3aa15d25420f890ae8960760f530",
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "6.8,0,1.8,1.8",
              "ComponentStyle": "Footer1",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "SHIP\r\nTO"
              },
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "Font": ";9.75;;",
              "Border": ";Transparent;;;;;;solid:Black",
              "Brush": "solid:255,248,225",
              "TextBrush": "solid:0,0,0",
              "TextQuality": "Typographic",
              "Type": "Expression"
            },
            "3": {
              "Ident": "StiText",
              "Name": "Text21",
              "Guid": "8f72937bf653454fb270038e384d3e01",
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "13,0,6,0.6",
              "ComponentStyle": "Footer1",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Invoice #{InvoiceNumber}"
              },
              "HorAlignment": "Right",
              "VertAlignment": "Center",
              "Font": ";9.75;;",
              "Border": ";Transparent;;;;;;solid:Black",
              "Brush": "solid:255,248,225",
              "TextBrush": "solid:0,0,0",
              "TextQuality": "Typographic",
              "Type": "Expression"
            },
            "4": {
              "Ident": "StiText",
              "Name": "Text22",
              "Guid": "a5977bb799354279b9e5b2ab01017e49",
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "13,0.6,6,0.6",
              "ComponentStyle": "Footer1",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Invoice date {InvoiceDate.ToString(\"d\")}"
              },
              "HorAlignment": "Right",
              "VertAlignment": "Center",
              "Font": ";9.75;;",
              "Border": ";Transparent;;;;;;solid:Black",
              "Brush": "solid:255,248,225",
              "TextBrush": "solid:0,0,0",
              "TextQuality": "Typographic",
              "Type": "Expression"
            },
            "5": {
              "Ident": "StiText",
              "Name": "Text23",
              "Guid": "39933fba4cc041d4950ee69be61e6a84",
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "13,1.2,6,0.6",
              "ComponentStyle": "Footer1",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Customer ID {CustomerID}"
              },
              "HorAlignment": "Right",
              "VertAlignment": "Center",
              "Font": ";9.75;;",
              "Border": ";Transparent;;;;;;solid:Black",
              "Brush": "solid:255,248,225",
              "TextBrush": "solid:0,0,0",
              "TextQuality": "Typographic",
              "Type": "Expression"
            },
            "6": {
              "Ident": "StiText",
              "Name": "Text20",
              "Guid": "8f8d52008e1d4fcebbfc973921eb3b9b",
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "8.6,0,4.2,1.8",
              "ComponentStyle": "Footer1",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "{ShipTo_Name}\r\n{ShipTo_Address}\r\n{ShipTo_Address2}\r\n{ShipTo_City}, {ShipTo_State} {ShipTo_ZipCode}"
              },
              "Font": ";9.75;;",
              "Border": ";Transparent;;;;;;solid:Black",
              "Brush": "solid:255,248,225",
              "TextBrush": "solid:0,0,0",
              "TextQuality": "Typographic",
              "Margins": {
                "Left": 5.0,
                "Right": 0.0,
                "Top": 5.0,
                "Bottom": 0.0
              },
              "Type": "Expression"
            }
          }
        },
        "3": {
          "Ident": "StiReportTitleBand",
          "Name": "ReportTitle2",
          "ClientRectangle": "0,5.8,19,0.4",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Border": ";;;;;;;solid:Black",
          "Brush": "solid:"
        },
        "4": {
          "Ident": "StiHeaderBand",
          "Name": "HeaderBand1",
          "ClientRectangle": "0,7,19,0.8",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Border": ";SaddleBrown;;;;;;solid:Black",
          "Brush": "solid:",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Text10",
              "Guid": "0fc9a719663d44d18cf0cfd22d581859",
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "0,0,5.8,0.8",
              "ComponentStyle": "Header3",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Unit Name"
              },
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "Font": ";16;;",
              "Border": "Left;White;;;;;;solid:Black",
              "Brush": "solid:77,182,172",
              "TextBrush": "solid:255,255,255",
              "TextQuality": "Typographic",
              "Type": "Expression"
            },
            "1": {
              "Ident": "StiText",
              "Name": "Text2",
              "Guid": "a2e46c3ade4e4be28d65cde427a4415f",
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "5.8,0,3.4,0.8",
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
              "Border": "Left;White;;;;;;solid:Black",
              "Brush": "solid:77,182,172",
              "TextBrush": "solid:255,255,255",
              "TextQuality": "Typographic",
              "Type": "Expression"
            },
            "2": {
              "Ident": "StiText",
              "Name": "Text24",
              "Guid": "b3c169bd999144dbb3b399fb812418bd",
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "10.8,0,4.4,0.8",
              "ComponentStyle": "Header3",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Item Price"
              },
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "Font": ";16;;",
              "Border": "Left;White;;;;;;solid:Black",
              "Brush": "solid:77,182,172",
              "TextBrush": "solid:255,255,255",
              "TextQuality": "Typographic",
              "Type": "Expression"
            },
            "3": {
              "Ident": "StiText",
              "Name": "Text26",
              "Guid": "dab2aae47edb45c58e2380fb81db9702",
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "15.2,0,3.8,0.8",
              "ComponentStyle": "Header3",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Total"
              },
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "Font": ";16;;",
              "Border": "Left;White;;;;;;solid:Black",
              "Brush": "solid:77,182,172",
              "TextBrush": "solid:255,255,255",
              "TextQuality": "Typographic",
              "Type": "Expression"
            },
            "4": {
              "Ident": "StiText",
              "Name": "Text11",
              "Guid": "c7a7349305b24079b4a49fd725e464ec",
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "9.2,0,1.6,0.8",
              "ComponentStyle": "Header3",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Qty"
              },
              "HorAlignment": "Center",
              "VertAlignment": "Center",
              "Font": ";16;;",
              "Border": "Left;White;;;;;;solid:Black",
              "Brush": "solid:77,182,172",
              "TextBrush": "solid:255,255,255",
              "TextQuality": "Typographic",
              "Type": "Expression"
            }
          }
        },
        "5": {
          "Ident": "StiDataBand",
          "Name": "DataBand1",
          "ClientRectangle": "0,8.6,19,0.6",
          "Interaction": {
            "Ident": "StiBandInteraction"
          },
          "Border": ";;;;;;;solid:Black",
          "Brush": "solid:",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Text1",
              "Guid": "f085bf97e224431bbbc7406697172cdf",
              "CanGrow": true,
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "0,0,5.8,0.6",
              "ComponentStyle": "Data1",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "{Products.ProductName}"
              },
              "VertAlignment": "Center",
              "Font": ";10;;",
              "Border": ";193,152,89;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:74,74,74",
              "TextOptions": {
                "WordWrap": true
              },
              "TextQuality": "Typographic"
            },
            "1": {
              "Ident": "StiText",
              "Name": "Text3",
              "Guid": "0b82ac69d6ae44988ab7eb4809cf90fe",
              "GrowToHeight": true,
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "5.8,0,3.4,0.6",
              "ComponentStyle": "Data1",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "{Products.QuantityPerUnit}"
              },
              "VertAlignment": "Center",
              "Font": ";10;;",
              "Border": ";193,152,89;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:74,74,74",
              "TextQuality": "Typographic"
            },
            "2": {
              "Ident": "StiText",
              "Name": "Text25",
              "Guid": "730e050badc14a1994300064c2e1bf64",
              "GrowToHeight": true,
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "10.8,0,4.4,0.6",
              "ComponentStyle": "Data1",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "{Products.UnitPrice}"
              },
              "HorAlignment": "Right",
              "VertAlignment": "Center",
              "Font": ";10;;",
              "Border": ";193,152,89;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:74,74,74",
              "TextQuality": "Typographic",
              "TextFormat": {
                "Ident": "StiCurrencyFormatService",
                "NegativePattern": 5,
                "DecimalSeparator": ",",
                "GroupSeparator": " ",
                "PositivePattern": 1,
                "Symbol": "р."
              }
            },
            "3": {
              "Ident": "StiText",
              "Name": "Text12",
              "Guid": "b8f6a542762a4b568a0f07248554bc4f",
              "GrowToHeight": true,
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "15.2,0,3.8,0.6",
              "ComponentStyle": "Data1",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "{Products.UnitsInStock * Products.UnitPrice}"
              },
              "HorAlignment": "Right",
              "VertAlignment": "Center",
              "Font": ";10;;",
              "Border": ";193,152,89;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:74,74,74",
              "TextQuality": "Typographic",
              "TextFormat": {
                "Ident": "StiCurrencyFormatService",
                "NegativePattern": 5,
                "DecimalSeparator": ",",
                "GroupSeparator": " ",
                "PositivePattern": 1,
                "Symbol": "р."
              },
              "Type": "Expression"
            },
            "4": {
              "Ident": "StiText",
              "Name": "Text9",
              "Guid": "c6bcd122071348eba3a42ae14caff418",
              "GrowToHeight": true,
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "9.2,0,1.6,0.6",
              "ComponentStyle": "Data1",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "{Products.UnitsInStock}"
              },
              "HorAlignment": "Right",
              "VertAlignment": "Center",
              "Font": ";10;;",
              "Border": ";193,152,89;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:74,74,74",
              "TextQuality": "Typographic",
              "TextFormat": {
                "Ident": "StiNumberFormatService",
                "NegativePattern": 1,
                "DecimalSeparator": ",",
                "GroupSeparator": " "
              }
            }
          },
          "DataSourceName": "Products",
          "EvenStyle": "Data2",
          "Sort": {
            "0": "ASC",
            "1": "ProductName"
          }
        },
        "6": {
          "Ident": "StiFooterBand",
          "Name": "FooterBand1",
          "CanShrink": true,
          "ClientRectangle": "0,10,19,0.6",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Border": ";;;;;;;solid:Black",
          "Brush": "solid:",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Text8",
              "Guid": "2dccae652f7e41f0a3cd54aaa837dc80",
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "0,0,19,0.6",
              "ComponentStyle": "Footer1",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Items per page {cCount(DataBand1)}"
              },
              "HorAlignment": "Right",
              "VertAlignment": "Center",
              "Font": ";9;;",
              "Border": "All;Transparent;;;;;;solid:Black",
              "Brush": "solid:255,248,225",
              "TextBrush": "solid:0,0,0",
              "TextQuality": "Typographic",
              "TextFormat": {
                "Ident": "StiCurrencyFormatService",
                "NegativePattern": 5,
                "DecimalSeparator": ",",
                "GroupSeparator": " ",
                "PositivePattern": 1,
                "Symbol": "р."
              },
              "Type": "Expression"
            }
          },
          "PrintAtBottom": true,
          "PrintOnAllPages": true
        },
        "7": {
          "Ident": "StiFooterBand",
          "Name": "Footer1",
          "ClientRectangle": "0,11.4,19,1.4",
          "Interaction": {
            "Ident": "StiInteraction"
          },
          "Border": ";;;;;;;solid:Black",
          "Brush": "solid:",
          "Components": {
            "0": {
              "Ident": "StiText",
              "Name": "Text5",
              "Guid": "f78a0567c39f4b3a8ee2c63e1bb7f7ea",
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "15.2,0.2,3.8,1.2",
              "ComponentStyle": "Footer2",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "{Sum(Products.UnitsInStock * Products.UnitPrice)}"
              },
              "HorAlignment": "Right",
              "VertAlignment": "Center",
              "Font": ";10;Bold;",
              "Border": ";58,78,94;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:158,158,158",
              "TextQuality": "Typographic",
              "TextFormat": {
                "Ident": "StiCurrencyFormatService",
                "NegativePattern": 5,
                "DecimalSeparator": ",",
                "GroupSeparator": " ",
                "PositivePattern": 1,
                "Symbol": "р."
              },
              "Type": "Expression"
            },
            "1": {
              "Ident": "StiText",
              "Name": "Text6",
              "Guid": "db3c25760d4641a7b0f6c74a3faf46c3",
              "MinSize": "0,0",
              "MaxSize": "0,0",
              "ClientRectangle": "0,0.2,15.2,1.2",
              "ComponentStyle": "Footer2",
              "Interaction": {
                "Ident": "StiInteraction"
              },
              "Text": {
                "Value": "Total:"
              },
              "HorAlignment": "Right",
              "VertAlignment": "Center",
              "Font": ";10;Bold;",
              "Border": ";58,78,94;;;;;;solid:Black",
              "Brush": "solid:",
              "TextBrush": "solid:158,158,158",
              "TextQuality": "Typographic",
              "TextFormat": {
                "Ident": "StiCurrencyFormatService",
                "NegativePattern": 5,
                "DecimalSeparator": ",",
                "GroupSeparator": " ",
                "PositivePattern": 1,
                "Symbol": "р."
              },
              "Type": "Expression"
            }
          },
          "PrintAtBottom": true
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