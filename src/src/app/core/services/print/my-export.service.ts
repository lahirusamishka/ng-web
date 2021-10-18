import { Injectable } from "@angular/core";
import JsBarcode from "jsbarcode/bin/JsBarcode";

import { PDFDocument } from "pdf-lib";
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import * as printJS from "print-js";

@Injectable({
  providedIn: "root",
})
export class MyExportService {
  productsArray: any[];

  constructor() {}

  async PrintBorrower(data) {
    this.productsArray = [];
    var address = {};
    var invoiceName = {};
    var subTotal = 0;

    console.log(data);
    

    if (data.gender != null) {
      subTotal = Number(data.gender);
    }

    var tax = 123;
    var total = subTotal + tax;

    // if (data.invoice_products.length > 0) {
    //   data.invoice_products.forEach((product, index) => {
    //     var unitName = "lb";
    //     if (product.product.unit != undefined && product.product.unit != null) {
    //       unitName = product.product.unit.name;
    //     }

    //     var caseArray = [];
    //     if (
    //       product.ordering_unit == "case" ||
    //       product.ordering_unit == "Case"
    //     ) {
    //       if (
    //         product.case_weight_details &&
    //         product.case_weight_details.length > 0
    //       ) {
    //         try {
    //           var weight = JSON.parse(product.case_weight_details);
    //           weight.forEach((element) => {
    //             if (element.weight != undefined && element != {}) {
    //               caseArray.push("---");
    //             } else {
    //               caseArray.push("____");
    //             }
    //           });
    //         } catch (error) {
    //           console.log("case_weight_details : invalid Json");
    //         }
    //       }
    //     }
    //     var caseItemString = "\n";
    //     if (caseArray.length > 0) {
    //       caseArray.forEach((element, index) => {
    //         caseItemString += element;
    //         if (caseArray.length != index + 1) {
    //           caseItemString += ", ";
    //         }
    //       });
    //     }
    //     var productQuantity = product.quantity != null ? product.quantity : "";
    //     var productOrderingUnit =
    //       product.ordering_unit != null ? product.ordering_unit : "";
    //     var productNameAndCaseUnits =
    //       product.name != null ? product.name + caseItemString : "";
    //     var productFinalWeight =
    //       product.final_weight != null ? product.final_weight + " lbs" : "";
    //     var productOrderingPrice = "";
    //     var productLineTotal = "";
    //     this.productsArray.push([
    //       {
    //         text: { text: productQuantity, alignment: "left", fontSize: 9 },
    //         border: [false, false, false, true],
    //         alignment: "left",
    //         margin: [0, 5, 0, 5],
    //       },
    //       {
    //         text: {
    //           text: productOrderingUnit,
    //           alignment: "center",
    //           textTransform: "capitalize",
    //           fontSize: 9,
    //         },
    //         border: [false, false, false, true],
    //         margin: [0, 5, 0, 5],
    //         alignment: "left",
    //       },
    //       {
    //         text: { text: productNameAndCaseUnits, fontSize: 9 },
    //         border: [false, false, false, true],
    //         margin: [0, 5, 0, 5],
    //         alignment: "left",
    //       },
    //       {
    //         text: {
    //           text: productFinalWeight,
    //           alignment: "center",
    //           fontSize: 9,
    //         },
    //         border: [false, false, false, true],
    //         margin: [0, 5, 0, 5],
    //         alignment: "left",
    //       },
    //       {
    //         text: {
    //           text: productOrderingPrice,
    //           alignment: "center",
    //           fontSize: 9,
    //         },
    //         border: [false, false, false, true],
    //         margin: [0, 5, 0, 5],
    //         alignment: "left",
    //       },
    //       {
    //         text: { text: productLineTotal, alignment: "right", fontSize: 9 },
    //         border: [false, false, false, true],
    //         margin: [0, 5, 0, 5],
    //         alignment: "left",
    //       },
    //     ]);
    //   });
    // }
    var extraChargesArray;
    try {
      extraChargesArray = JSON.parse(data.extra_charges);
    } catch (error) {
      console.log("extra_charges : invalid Json");
    }

    if (extraChargesArray != null && extraChargesArray.length > 0) {
      extraChargesArray.forEach((element) => {
        var productQuantity = 1;
        var productOrderingUnit = "";
        var productNameAndCaseUnits = element.text != null ? element.text : "";
        var productFinalWeight = "";
        var productOrderingPrice = "";
        var productLineTotal = element.value != null ? "$" + "" : "";
        this.productsArray.push([
          {
            text: { text: productQuantity, alignment: "left", fontSize: 9 },
            border: [false, false, false, true],
            alignment: "left",
            margin: [0, 5, 0, 5],
          },
          {
            text: {
              text: productOrderingUnit,
              alignment: "center",
              textTransform: "capitalize",
              fontSize: 9,
            },
            border: [false, false, false, true],
            margin: [0, 5, 0, 5],
            alignment: "left",
          },
          {
            text: { text: productNameAndCaseUnits, fontSize: 9 },
            border: [false, false, false, true],
            margin: [0, 5, 0, 5],
            alignment: "left",
          },
          {
            text: {
              text: productFinalWeight,
              alignment: "center",
              fontSize: 9,
            },
            border: [false, false, false, true],
            margin: [0, 5, 0, 5],
            alignment: "left",
          },
          {
            text: {
              text: productOrderingPrice,
              alignment: "center",
              fontSize: 9,
            },
            border: [false, false, false, true],
            margin: [0, 5, 0, 5],
            alignment: "left",
          },
          {
            text: { text: productLineTotal, alignment: "right", fontSize: 9 },
            border: [false, false, false, true],
            margin: [0, 5, 0, 5],
            alignment: "left",
          },
        ]);
        // this.productsArray.push(
        //   [{
        //     text:
        //       { text: productQuantity, alignment: "left", fontSize: 9 }, border: [false, false, false, true], alignment: "left", margin: [0, 5, 0, 5],
        //   },
        //   { text: { text: productOrderingUnit, alignment: "center", textTransform: "capitalize", fontSize: 9 }, border: [false, false, false, true], margin: [0, 5, 0, 5], alignment: "left", },
        //   { text: { text: productNameAndCaseUnits, fontSize: 9, }, border: [false, false, false, true], margin: [0, 5, 0, 5], alignment: "left", },
        //   { text: { text: productFinalWeight, alignment: "center", fontSize: 9 }, border: [false, false, false, true], margin: [0, 5, 0, 5], alignment: "left", },
        //   { text: { text: productOrderingPrice, alignment: "center", fontSize: 9, }, border: [false, false, false, true], margin: [0, 5, 0, 5], alignment: "left", },
        //   { text: { text: productLineTotal, alignment: "right", fontSize: 9 }, border: [false, false, false, true], margin: [0, 5, 0, 5], alignment: "left", },
        //   ]
        // );
      });
    }

    const harissonlogo =
      "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Y+ImIiIiINIyBn4iIiIhIwxj4iYiIiIg0jIGfiIiIiEjDGPiJiIiIiDSMgZ+IiIiISMMY+ImIiIiINIyBn4iIiIhIwxj4iYiIiIg0jIGfiIiIiEjDGPiJiIiIiDSMgZ+IiIiISMMY+ImIiIiINIyBn4iIiIhIwxj4iYiIiIg0jIGfiIiIiEjDGPiJiIiIiDSMgZ+IiIiISMMY+ImIiIiINIyBn4iIiIhIwxj4iYiIiIg0jIGfiIiIiEjDGPiJiIiIiDSMgZ+IiIiISMMY+ImIiIiINIyBn4iIiIhIwxj4iYiIiIg0jIGfiIiIiEjDGPiJiIiIiDSMgZ+IiIiISMMY+ImIiIiINIyBn4iIiIhIwxj4iYiIiIg0jIGfiIiIiEjDGPiJiIiIiDSMgZ+IiIiISMMY+ImIiIiINIyBn4iIiIhIwxj4iYiIiIg0jIGfiIiIiEjDGPiJiIiIiDSMgZ+IiIiISMMY+ImIiIiINIyBn4iIiIhIwxj4iYiIiIg0jIGfiIiIiEjDGPiJiIiIiDSMgZ+IiIiISMMY+ImIiIiINIyBn4iIiIhIwxj4iYiIiIg0jIGfiIiIiEjDGPiJiIiIiDSMgZ+IiIiISMMY+ImIiIiINIyBn4iIiIhIwxj4iYiIiIg0jIGfiIiIiEjDGPiJiIiIiDSMgZ+IiIiISMMY+ImIiIiINIyBn4iIiIhIwxj4iYiIiIg0jIGfiIiIiEjDGPiJiIiIiDSMgZ+IiIiISMMY+ImIiIiINIyBn4iIiIhIwxj4iYiIiIg0jIGfiIiIiEjDGPiJiIiIiDSMgZ+IiIiISMP+P0PJfUAuCJFVAAAAAElFTkSuQmCC";
    var invoicePdf = {
      info: {
        title: "Invoice_" + String(data.id),
      },

      pageSize: "A4",
      pageMargins: [40, 33, 40, 115],
      header: function (currentPage, pageCount) {
        var pageNumber = {};
        if (currentPage == 1) {
          pageNumber = {
            text: "Page " + currentPage + " of " + pageCount,
            fontSize: 10,
            color: "#458DC2",
            relativePosition: { x: 505, y: 120 },
          };
        } else {
          pageNumber = {
            text: "Page " + currentPage + " of " + pageCount,
            fontSize: 10,
            color: "#458DC2",
            relativePosition: { x: 505, y: 20 },
          };
        }
        return pageNumber;
      },
      content: [
        {
          columns: [
            {
              table: {
                widths: ["25%", "*", "35%"],
                body: [
                  [
                    {
                      image: "data:image/png;base64," + harissonlogo,
                      width: 110,
                    },
                    {
                      text: "Matara.\nSri lanka\n easyloan.com\nPhone: (077) 336-1715\nFax: (847) 724-9209\nEmail: lkeasyloan@gmail.com",
                      color: "#458DC2",
                      width: "*",
                      fontSize: 9,
                      alignment: "left",
                      margin: [0, 0, 0, 15],
                    },
                    {
                      table: {
                        headerRows: 1,
                        widths: ["100%"],
                        body: [
                          [
                            {
                              text: "Borrower Application",
                              alignment: "right",
                              color: "#458DC2",
                              fontSize: 24,
                              bold: true,
                              relativePosition: { x: 0, y: -3 },
                            },
                          ],
                          [{}],
                        ],
                        layout: "noBorders",
                      },
                      layout: "noBorders",
                    },
                  ],
                ],
              },
              layout: "noBorders",
            },
          ],
        },
        {
          columns: [
            {
              text: invoiceName,
              color: "#458DC2",
              bold: true,
              fontSize: 15,
              alignment: "left",
              margin: [0, 20, 0, 5],
            },
          ],
        },
        {
          columns: [
            { text: address, style: "invoiceBillingAddress", fontSize: 11 },
          ],
        },
        "\n\n",
        {
          layout: {
            defaultBorder: false,
            hLineWidth: function (i, node) {
              return 1;
            },
            vLineWidth: function (i, node) {
              return 1;
            },
            hLineColor: function (i, node) {
              if (i === 1 || i === 0) {
                return "#bfdde8";
              }
              return "#eaeaea";
            },
            vLineColor: function (i, node) {
              return "#eaeaea";
            },
            hLineStyle: function (i, node) {
              return null;
            },
            paddingLeft: function (i, node) {
              return 10;
            },
            paddingRight: function (i, node) {
              return 10;
            },
            paddingTop: function (i, node) {
              return 2;
            },
            paddingBottom: function (i, node) {
              return 2;
            },
            fillColor: function (rowIndex, node, columnIndex) {
              return "#fff";
            },
          },
          table: {
            headerRows: 1,
            widths: ["20%", "60%"],
            body: [
              [
                {
                  text: {
                    text: "Full Name",
                    fontSize: 10,
                    bold: true,
                    color: "black",
                  },
                  alignment: "left",
                },
                {
                  text: {
                    text: data.title + " " + data.first_name +" " + data.middle_name +" "+ data.last_name,
                    fontSize: 10,
                    bold: true,
                    color: "black",
                  },
                }
              ],
              [
                {
                  text: {
                    text: "Select Loan Product",
                    fontSize: 10,
                    bold: true,
                    color: "black",
                  },
                  alignment: "left",
                },
                {
                  text: {
                    text: data.loan_product,
                    fontSize: 10,
                    bold: true,
                    color: "black",
                  },
                }
              ],
              [
                {
                  text: {
                    text: "disbursed by ",
                    fontSize: 10,
                    bold: true,
                    color: "black",
                  },
                  alignment: "left",
                },
                {
                  text: {
                    text: data.disbursed,
                    fontSize: 10,
                    bold: true,
                    color: "black",
                  },
                  
                }
              ],
              [
                {
                  text: {
                    text: "Address 1",
                    fontSize: 10,
                    bold: true,
                    color: "black",
                  },
                  alignment: "left",
                },
                {
                  text: {
                    text: data.address1,
                    fontSize: 10,
                    bold: true,
                    color: "black",
                  },
                  
                }
              ],
              [
                {
                  text: {
                    text: "Address 2",
                    fontSize: 10,
                    bold: true,
                    color: "black",
                  },
                  alignment: "left",
                },
                {
                  text: {
                    text: data.address2,
                    fontSize: 10,
                    bold: true,
                    color: "black",
                  },
                  
                }
              ],
              [
                {
                  text: {
                    text: "Email Address",
                    fontSize: 10,
                    bold: true,
                    color: "black",
                  },
                  alignment: "left",
                },
                {
                  text: {
                    text: data.email,
                    fontSize: 10,
                    bold: true,
                    color: "black",
                  },
                  
                }
              ],
              [
                {
                  text: {
                    text: "Mobile",
                    fontSize: 10,
                    bold: true,
                    color: "black",
                  },
                  alignment: "left",
                },
                {
                  text: {
                    text: data.mobile,
                    fontSize: 10,
                    bold: true,
                    color: "black",
                  },
                  
                }
              ],
              [
                {
                  text: {
                    text: "Date of Birth",
                    fontSize: 10,
                    bold: true,
                    color: "black",
                  },
                  alignment: "left",
                },
                {
                  text: {
                    text: data.dob,
                    fontSize: 10,
                    bold: true,
                    color: "black",
                  },
                  
                }
              ],
              [
                {
                  text: {
                    text: "Gender",
                    fontSize: 10,
                    bold: true,
                    color: "black",
                  },
                  alignment: "left",
                },
                {
                  text: {
                    text: data.gender,
                    fontSize: 10,
                    bold: true,
                    color: "black",
                  },
                  
                }
              ],
              [
                {
                  text: {
                    text: "City",
                    fontSize: 10,
                    bold: true,
                    color: "black",
                  },
                  alignment: "left",
                },
                {
                  text: {
                    text: data.city,
                    fontSize: 10,
                    bold: true,
                    color: "black",
                  },
                }
              ],
              [
                {
                  text: {
                    text: "State",
                    fontSize: 10,
                    bold: true,
                    color: "black",
                  },
                  alignment: "left",
                },
                {
                  text: {
                    text: data.state,
                    fontSize: 10,
                    bold: true,
                    color: "black",
                  },
                }
              ],
              [
                {
                  text: {
                    text: "Postal code",
                    fontSize: 10,
                    bold: true,
                    color: "black",
                  },
                  alignment: "left",
                },
                {
                  text: {
                    text: data.postal_code,
                    fontSize: 10,
                    bold: true,
                    color: "black",
                  },
                }
              ],
              [
                {
                  text: {
                    text: "Working Status",
                    fontSize: 10,
                    bold: true,
                    color: "black",
                  },
                  alignment: "left",
                },
                {
                  text: {
                    text: data.working_status,
                    fontSize: 10,
                    bold: true,
                    color: "black",
                  },
                }
              ],
              [
                {
                  text: {
                    text: "Description",
                    fontSize: 10,
                    bold: true,
                    color: "black",
                  },
                  alignment: "left",
                },
                {
                  text: {
                    text: data.description,
                    fontSize: 10,
                    bold: true,
                    color: "black",
                  },
                }
              ],
              [{ text: { text: "\n" } }, {}],
              // ...this.productsArray,
            ],
          },
        },
        "\n\n\n",
        {
          layout: {
            defaultBorder: false,
            hLineWidth: function (i, node) {
              return 1;
            },
            vLineWidth: function (i, node) {
              return 1;
            },
            hLineColor: function (i, node) {
              return "#eaeaea";
            },
            vLineColor: function (i, node) {
              return "#eaeaea";
            },
            hLineStyle: function (i, node) {
              return null;
            },
            paddingLeft: function (i, node) {
              return 10;
            },
            paddingRight: function (i, node) {
              return 10;
            },
            paddingTop: function (i, node) {
              return 3;
            },
            paddingBottom: function (i, node) {
              return 3;
            },
            fillColor: function (rowIndex, node, columnIndex) {
              return "#fff";
            },
          },

          table: {
            headerRows: 1,
            widths: ["75%", "12.5%", "12.5%"],
            body: [
              [
                {},
                {
                  text: "",
                  alignment: "left",
                  fontSize: 9,
                  margin: [0, 2, 0, 2],
                },
                {
                  text: "",
                  alignment: "right",
                  fontSize: 9,
                  margin: [0, 2, 0, 2],
                },
              ],
              [
                {},
                {
                  text: "",
                  fontSize: 9,
                  alignment: "left",
                  margin: [0, 2, 0, 2],
                },
                {
                  text: "",
                  fontSize: 9,
                  alignment: "right",
                  margin: [0, 2, 0, 2],
                },
              ],
              [
                {},
                {
                  text: "",
                  bold: true,
                  color: "#458DC2",
                  fontSize: 13,
                  alignment: "left",
                  margin: [0, 2, 0, 2],
                },
                {
                  text: "",
                  bold: true,
                  fontSize: 13,
                  color: "#458DC2",
                  alignment: "right",
                  margin: [0, 2, 0, 2],
                },
              ],
            ],
            layout: "noBorders",
          },
        },
      ],
      footer: function (currentPage, pageCount) {
        if (currentPage == pageCount) {
          return {
            columns: [
              {
                table: {
                  widths: ["80%", "20%"],
                  body: [
                    [
                      {
                        canvas: [
                          {
                            type: "line",
                            x1: 0,
                            y1: 0,
                            x2: 400,
                            y2: 0,
                            lineWidth: 1,
                          },
                        ],
                      },
                      {
                        canvas: [
                          {
                            type: "line",
                            x1: 0,
                            y1: 0,
                            x2: 95,
                            y2: 0,
                            lineWidth: 1,
                          },
                        ],
                      },
                    ],
                    [
                      {
                        text: [
                          {
                            text: "Signature",
                            marginBottom: 50,
                            italics: true,
                          },
                        ],
                      },
                      { text: [{ text: "Date\n", italics: true }] },
                    ],
                    [{ colSpan: 2, text: "" }],
                    [
                      {
                        colSpan: 2,
                        text: [
                          {
                            text: "By signing, I acknowledge the following: Above merchandise is received and in good condition. All Invoices are due within 30 days of sale. Overdue invoices are subject to 1.5% interest per month. Should collection procedures be necessary, customer is responsible for all collection costs. Merchandise for resale only. No deductions without prior approval. No returns without prior approval. Service charge of $25 for returned checks.",
                            fontSize: 9,
                          },
                        ],
                      },
                    ],
                  ],
                },
                layout: "noBorders",
                margin: [0, 20, 0, 5],
              },
            ],
            margin: [35, 0],
          };
        }
      },
      styles: {
        notesTitle: {
          fontSize: 10,
          bold: true,
          margin: [0, 0, 0, 3],
        },
        notesText: {
          fontSize: 10,
        },
      },
      defaultStyle: {
        columnGap: 20,
      },
    };

    pdfMake.fonts = {
      Roboto: {
        normal: "Roboto-Regular.ttf",
        bold: "Roboto-Medium.ttf",
        italics: "Roboto-Italic.ttf",
        bolditalics: "Roboto-Medium.ttf",
      },
      fileIcons: {
        normal: "iconFont",
      },
    };

    try {
      const mergedPdf = await PDFDocument.create();

      pdfMake.createPdf(invoicePdf).getBuffer(async function (buffer) {
        const pdf = await PDFDocument.load(buffer);
        const copiedPages = await mergedPdf.copyPages(
          pdf,
          pdf.getPageIndices()
        );
        copiedPages.forEach((page) => {
          mergedPdf.addPage(page);
        });
        const mergedPdfFile = await mergedPdf.save();
        const blob = new Blob([mergedPdfFile], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);
        // window.open(url);
        printJS({
          printable: url,
          type: "pdf",
        });
      });
    } catch (error) {
      console.log(error);
    }
  }
  async PrintGuarantor(data) {
    this.productsArray = [];
    var address = {};
    var invoiceName = {};
    var subTotal = 0;

    console.log(data);
    

    if (data.gender != null) {
      subTotal = Number(data.gender);
    }

    var tax = 123;
    var total = subTotal + tax;

    // if (data.invoice_products.length > 0) {
    //   data.invoice_products.forEach((product, index) => {
    //     var unitName = "lb";
    //     if (product.product.unit != undefined && product.product.unit != null) {
    //       unitName = product.product.unit.name;
    //     }

    //     var caseArray = [];
    //     if (
    //       product.ordering_unit == "case" ||
    //       product.ordering_unit == "Case"
    //     ) {
    //       if (
    //         product.case_weight_details &&
    //         product.case_weight_details.length > 0
    //       ) {
    //         try {
    //           var weight = JSON.parse(product.case_weight_details);
    //           weight.forEach((element) => {
    //             if (element.weight != undefined && element != {}) {
    //               caseArray.push("---");
    //             } else {
    //               caseArray.push("____");
    //             }
    //           });
    //         } catch (error) {
    //           console.log("case_weight_details : invalid Json");
    //         }
    //       }
    //     }
    //     var caseItemString = "\n";
    //     if (caseArray.length > 0) {
    //       caseArray.forEach((element, index) => {
    //         caseItemString += element;
    //         if (caseArray.length != index + 1) {
    //           caseItemString += ", ";
    //         }
    //       });
    //     }
    //     var productQuantity = product.quantity != null ? product.quantity : "";
    //     var productOrderingUnit =
    //       product.ordering_unit != null ? product.ordering_unit : "";
    //     var productNameAndCaseUnits =
    //       product.name != null ? product.name + caseItemString : "";
    //     var productFinalWeight =
    //       product.final_weight != null ? product.final_weight + " lbs" : "";
    //     var productOrderingPrice = "";
    //     var productLineTotal = "";
    //     this.productsArray.push([
    //       {
    //         text: { text: productQuantity, alignment: "left", fontSize: 9 },
    //         border: [false, false, false, true],
    //         alignment: "left",
    //         margin: [0, 5, 0, 5],
    //       },
    //       {
    //         text: {
    //           text: productOrderingUnit,
    //           alignment: "center",
    //           textTransform: "capitalize",
    //           fontSize: 9,
    //         },
    //         border: [false, false, false, true],
    //         margin: [0, 5, 0, 5],
    //         alignment: "left",
    //       },
    //       {
    //         text: { text: productNameAndCaseUnits, fontSize: 9 },
    //         border: [false, false, false, true],
    //         margin: [0, 5, 0, 5],
    //         alignment: "left",
    //       },
    //       {
    //         text: {
    //           text: productFinalWeight,
    //           alignment: "center",
    //           fontSize: 9,
    //         },
    //         border: [false, false, false, true],
    //         margin: [0, 5, 0, 5],
    //         alignment: "left",
    //       },
    //       {
    //         text: {
    //           text: productOrderingPrice,
    //           alignment: "center",
    //           fontSize: 9,
    //         },
    //         border: [false, false, false, true],
    //         margin: [0, 5, 0, 5],
    //         alignment: "left",
    //       },
    //       {
    //         text: { text: productLineTotal, alignment: "right", fontSize: 9 },
    //         border: [false, false, false, true],
    //         margin: [0, 5, 0, 5],
    //         alignment: "left",
    //       },
    //     ]);
    //   });
    // }
    var extraChargesArray;
    try {
      extraChargesArray = JSON.parse(data.extra_charges);
    } catch (error) {
      console.log("extra_charges : invalid Json");
    }

    if (extraChargesArray != null && extraChargesArray.length > 0) {
      extraChargesArray.forEach((element) => {
        var productQuantity = 1;
        var productOrderingUnit = "";
        var productNameAndCaseUnits = element.text != null ? element.text : "";
        var productFinalWeight = "";
        var productOrderingPrice = "";
        var productLineTotal = element.value != null ? "$" + "" : "";
        this.productsArray.push([
          {
            text: { text: productQuantity, alignment: "left", fontSize: 9 },
            border: [false, false, false, true],
            alignment: "left",
            margin: [0, 5, 0, 5],
          },
          {
            text: {
              text: productOrderingUnit,
              alignment: "center",
              textTransform: "capitalize",
              fontSize: 9,
            },
            border: [false, false, false, true],
            margin: [0, 5, 0, 5],
            alignment: "left",
          },
          {
            text: { text: productNameAndCaseUnits, fontSize: 9 },
            border: [false, false, false, true],
            margin: [0, 5, 0, 5],
            alignment: "left",
          },
          {
            text: {
              text: productFinalWeight,
              alignment: "center",
              fontSize: 9,
            },
            border: [false, false, false, true],
            margin: [0, 5, 0, 5],
            alignment: "left",
          },
          {
            text: {
              text: productOrderingPrice,
              alignment: "center",
              fontSize: 9,
            },
            border: [false, false, false, true],
            margin: [0, 5, 0, 5],
            alignment: "left",
          },
          {
            text: { text: productLineTotal, alignment: "right", fontSize: 9 },
            border: [false, false, false, true],
            margin: [0, 5, 0, 5],
            alignment: "left",
          },
        ]);
        // this.productsArray.push(
        //   [{
        //     text:
        //       { text: productQuantity, alignment: "left", fontSize: 9 }, border: [false, false, false, true], alignment: "left", margin: [0, 5, 0, 5],
        //   },
        //   { text: { text: productOrderingUnit, alignment: "center", textTransform: "capitalize", fontSize: 9 }, border: [false, false, false, true], margin: [0, 5, 0, 5], alignment: "left", },
        //   { text: { text: productNameAndCaseUnits, fontSize: 9, }, border: [false, false, false, true], margin: [0, 5, 0, 5], alignment: "left", },
        //   { text: { text: productFinalWeight, alignment: "center", fontSize: 9 }, border: [false, false, false, true], margin: [0, 5, 0, 5], alignment: "left", },
        //   { text: { text: productOrderingPrice, alignment: "center", fontSize: 9, }, border: [false, false, false, true], margin: [0, 5, 0, 5], alignment: "left", },
        //   { text: { text: productLineTotal, alignment: "right", fontSize: 9 }, border: [false, false, false, true], margin: [0, 5, 0, 5], alignment: "left", },
        //   ]
        // );
      });
    }

    const harissonlogo =
      "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Y+ImIiIiINIyBn4iIiIhIwxj4iYiIiIg0jIGfiIiIiEjDGPiJiIiIiDSMgZ+IiIiISMMY+ImIiIiINIyBn4iIiIhIwxj4iYiIiIg0jIGfiIiIiEjDGPiJiIiIiDSMgZ+IiIiISMMY+ImIiIiINIyBn4iIiIhIwxj4iYiIiIg0jIGfiIiIiEjDGPiJiIiIiDSMgZ+IiIiISMMY+ImIiIiINIyBn4iIiIhIwxj4iYiIiIg0jIGfiIiIiEjDGPiJiIiIiDSMgZ+IiIiISMMY+ImIiIiINIyBn4iIiIhIwxj4iYiIiIg0jIGfiIiIiEjDGPiJiIiIiDSMgZ+IiIiISMMY+ImIiIiINIyBn4iIiIhIwxj4iYiIiIg0jIGfiIiIiEjDGPiJiIiIiDSMgZ+IiIiISMMY+ImIiIiINIyBn4iIiIhIwxj4iYiIiIg0jIGfiIiIiEjDGPiJiIiIiDSMgZ+IiIiISMMY+ImIiIiINIyBn4iIiIhIwxj4iYiIiIg0jIGfiIiIiEjDGPiJiIiIiDSMgZ+IiIiISMMY+ImIiIiINIyBn4iIiIhIwxj4iYiIiIg0jIGfiIiIiEjDGPiJiIiIiDSMgZ+IiIiISMMY+ImIiIiINIyBn4iIiIhIwxj4iYiIiIg0jIGfiIiIiEjDGPiJiIiIiDSMgZ+IiIiISMMY+ImIiIiINIyBn4iIiIhIwxj4iYiIiIg0jIGfiIiIiEjDGPiJiIiIiDSMgZ+IiIiISMMY+ImIiIiINIyBn4iIiIhIwxj4iYiIiIg0jIGfiIiIiEjDGPiJiIiIiDSMgZ+IiIiISMP+P0PJfUAuCJFVAAAAAElFTkSuQmCC";
    var invoicePdf = {
      info: {
        title: "Invoice_" + String(data.id),
      },

      pageSize: "A4",
      pageMargins: [40, 33, 40, 115],
      header: function (currentPage, pageCount) {
        var pageNumber = {};
        if (currentPage == 1) {
          pageNumber = {
            text: "Page " + currentPage + " of " + pageCount,
            fontSize: 10,
            color: "#458DC2",
            relativePosition: { x: 505, y: 120 },
          };
        } else {
          pageNumber = {
            text: "Page " + currentPage + " of " + pageCount,
            fontSize: 10,
            color: "#458DC2",
            relativePosition: { x: 505, y: 20 },
          };
        }
        return pageNumber;
      },
      content: [
        {
          columns: [
            {
              table: {
                widths: ["25%", "*", "35%"],
                body: [
                  [
                    {
                      image: "data:image/png;base64," + harissonlogo,
                      width: 110,
                    },
                    {
                      text: "Matara.\nSri lanka\n easyloan.com\nPhone: (077) 336-1715\nFax: (847) 724-9209\nEmail: lkeasyloan@gmail.com",
                      color: "#458DC2",
                      width: "*",
                      fontSize: 9,
                      alignment: "left",
                      margin: [0, 0, 0, 15],
                    },
                    {
                      table: {
                        headerRows: 1,
                        widths: ["100%"],
                        body: [
                          [
                            {
                              text: "Guarantor Application",
                              alignment: "right",
                              color: "#458DC2",
                              fontSize: 24,
                              bold: true,
                              relativePosition: { x: 0, y: -3 },
                            },
                          ],
                          [{}],
                        ],
                        layout: "noBorders",
                      },
                      layout: "noBorders",
                    },
                  ],
                ],
              },
              layout: "noBorders",
            },
          ],
        },
        {
          columns: [
            {
              text: invoiceName,
              color: "#458DC2",
              bold: true,
              fontSize: 15,
              alignment: "left",
              margin: [0, 20, 0, 5],
            },
          ],
        },
        {
          columns: [
            { text: address, style: "invoiceBillingAddress", fontSize: 11 },
          ],
        },
        "\n\n",
        {
          layout: {
            defaultBorder: false,
            hLineWidth: function (i, node) {
              return 1;
            },
            vLineWidth: function (i, node) {
              return 1;
            },
            hLineColor: function (i, node) {
              if (i === 1 || i === 0) {
                return "#bfdde8";
              }
              return "#eaeaea";
            },
            vLineColor: function (i, node) {
              return "#eaeaea";
            },
            hLineStyle: function (i, node) {
              return null;
            },
            paddingLeft: function (i, node) {
              return 10;
            },
            paddingRight: function (i, node) {
              return 10;
            },
            paddingTop: function (i, node) {
              return 2;
            },
            paddingBottom: function (i, node) {
              return 2;
            },
            fillColor: function (rowIndex, node, columnIndex) {
              return "#fff";
            },
          },
          table: {
            headerRows: 1,
            widths: ["20%", "60%"],
            body: [
              [
                {
                  text: {
                    text: "Full Name",
                    fontSize: 10,
                    bold: true,
                    color: "black",
                  },
                  alignment: "left",
                },
                {
                  text: {
                    text: data.title + " " + data.first_name +" " + data.middle_name +" "+ data.last_name,
                    fontSize: 10,
                    bold: true,
                    color: "black",
                  },
                }
              ],
              [
                {
                  text: {
                    text: "Select Loan Product",
                    fontSize: 10,
                    bold: true,
                    color: "black",
                  },
                  alignment: "left",
                },
                {
                  text: {
                    text: data.loan_product,
                    fontSize: 10,
                    bold: true,
                    color: "black",
                  },
                }
              ],
              [
                {
                  text: {
                    text: "disbursed by ",
                    fontSize: 10,
                    bold: true,
                    color: "black",
                  },
                  alignment: "left",
                },
                {
                  text: {
                    text: data.disbursed,
                    fontSize: 10,
                    bold: true,
                    color: "black",
                  },
                  
                }
              ],
              [
                {
                  text: {
                    text: "Address 1",
                    fontSize: 10,
                    bold: true,
                    color: "black",
                  },
                  alignment: "left",
                },
                {
                  text: {
                    text: data.address1,
                    fontSize: 10,
                    bold: true,
                    color: "black",
                  },
                  
                }
              ],
              [
                {
                  text: {
                    text: "Address 2",
                    fontSize: 10,
                    bold: true,
                    color: "black",
                  },
                  alignment: "left",
                },
                {
                  text: {
                    text: data.address2,
                    fontSize: 10,
                    bold: true,
                    color: "black",
                  },
                  
                }
              ],
              [
                {
                  text: {
                    text: "Email Address",
                    fontSize: 10,
                    bold: true,
                    color: "black",
                  },
                  alignment: "left",
                },
                {
                  text: {
                    text: data.email,
                    fontSize: 10,
                    bold: true,
                    color: "black",
                  },
                  
                }
              ],
              [
                {
                  text: {
                    text: "Mobile",
                    fontSize: 10,
                    bold: true,
                    color: "black",
                  },
                  alignment: "left",
                },
                {
                  text: {
                    text: data.mobile,
                    fontSize: 10,
                    bold: true,
                    color: "black",
                  },
                  
                }
              ],
              [
                {
                  text: {
                    text: "Date of Birth",
                    fontSize: 10,
                    bold: true,
                    color: "black",
                  },
                  alignment: "left",
                },
                {
                  text: {
                    text: data.dob,
                    fontSize: 10,
                    bold: true,
                    color: "black",
                  },
                  
                }
              ],
              [
                {
                  text: {
                    text: "Gender",
                    fontSize: 10,
                    bold: true,
                    color: "black",
                  },
                  alignment: "left",
                },
                {
                  text: {
                    text: data.gender,
                    fontSize: 10,
                    bold: true,
                    color: "black",
                  },
                  
                }
              ],
              [
                {
                  text: {
                    text: "City",
                    fontSize: 10,
                    bold: true,
                    color: "black",
                  },
                  alignment: "left",
                },
                {
                  text: {
                    text: data.city,
                    fontSize: 10,
                    bold: true,
                    color: "black",
                  },
                }
              ],
              [
                {
                  text: {
                    text: "State",
                    fontSize: 10,
                    bold: true,
                    color: "black",
                  },
                  alignment: "left",
                },
                {
                  text: {
                    text: data.state,
                    fontSize: 10,
                    bold: true,
                    color: "black",
                  },
                }
              ],
              [
                {
                  text: {
                    text: "Postal code",
                    fontSize: 10,
                    bold: true,
                    color: "black",
                  },
                  alignment: "left",
                },
                {
                  text: {
                    text: data.postal_code,
                    fontSize: 10,
                    bold: true,
                    color: "black",
                  },
                }
              ],
              [
                {
                  text: {
                    text: "Working Status",
                    fontSize: 10,
                    bold: true,
                    color: "black",
                  },
                  alignment: "left",
                },
                {
                  text: {
                    text: data.working_status,
                    fontSize: 10,
                    bold: true,
                    color: "black",
                  },
                }
              ],
              [
                {
                  text: {
                    text: "Description",
                    fontSize: 10,
                    bold: true,
                    color: "black",
                  },
                  alignment: "left",
                },
                {
                  text: {
                    text: data.description,
                    fontSize: 10,
                    bold: true,
                    color: "black",
                  },
                }
              ],
              [{ text: { text: "\n" } }, {}],
              // ...this.productsArray,
            ],
          },
        },
        "\n\n\n",
        {
          layout: {
            defaultBorder: false,
            hLineWidth: function (i, node) {
              return 1;
            },
            vLineWidth: function (i, node) {
              return 1;
            },
            hLineColor: function (i, node) {
              return "#eaeaea";
            },
            vLineColor: function (i, node) {
              return "#eaeaea";
            },
            hLineStyle: function (i, node) {
              return null;
            },
            paddingLeft: function (i, node) {
              return 10;
            },
            paddingRight: function (i, node) {
              return 10;
            },
            paddingTop: function (i, node) {
              return 3;
            },
            paddingBottom: function (i, node) {
              return 3;
            },
            fillColor: function (rowIndex, node, columnIndex) {
              return "#fff";
            },
          },

          table: {
            headerRows: 1,
            widths: ["75%", "12.5%", "12.5%"],
            body: [
              [
                {},
                {
                  text: "",
                  alignment: "left",
                  fontSize: 9,
                  margin: [0, 2, 0, 2],
                },
                {
                  text: "",
                  alignment: "right",
                  fontSize: 9,
                  margin: [0, 2, 0, 2],
                },
              ],
              [
                {},
                {
                  text: "",
                  fontSize: 9,
                  alignment: "left",
                  margin: [0, 2, 0, 2],
                },
                {
                  text: "",
                  fontSize: 9,
                  alignment: "right",
                  margin: [0, 2, 0, 2],
                },
              ],
              [
                {},
                {
                  text: "",
                  bold: true,
                  color: "#458DC2",
                  fontSize: 13,
                  alignment: "left",
                  margin: [0, 2, 0, 2],
                },
                {
                  text: "",
                  bold: true,
                  fontSize: 13,
                  color: "#458DC2",
                  alignment: "right",
                  margin: [0, 2, 0, 2],
                },
              ],
            ],
            layout: "noBorders",
          },
        },
      ],
      footer: function (currentPage, pageCount) {
        if (currentPage == pageCount) {
          return {
            columns: [
              {
                table: {
                  widths: ["80%", "20%"],
                  body: [
                    [
                      {
                        canvas: [
                          {
                            type: "line",
                            x1: 0,
                            y1: 0,
                            x2: 400,
                            y2: 0,
                            lineWidth: 1,
                          },
                        ],
                      },
                      {
                        canvas: [
                          {
                            type: "line",
                            x1: 0,
                            y1: 0,
                            x2: 95,
                            y2: 0,
                            lineWidth: 1,
                          },
                        ],
                      },
                    ],
                    [
                      {
                        text: [
                          {
                            text: "Signature",
                            marginBottom: 50,
                            italics: true,
                          },
                        ],
                      },
                      { text: [{ text: "Date\n", italics: true }] },
                    ],
                    [{ colSpan: 2, text: "" }],
                    [
                      {
                        colSpan: 2,
                        text: [
                          {
                            text: "By signing, I acknowledge the following: Above merchandise is received and in good condition. All Invoices are due within 30 days of sale. Overdue invoices are subject to 1.5% interest per month. Should collection procedures be necessary, customer is responsible for all collection costs. Merchandise for resale only. No deductions without prior approval. No returns without prior approval. Service charge of $25 for returned checks.",
                            fontSize: 9,
                          },
                        ],
                      },
                    ],
                  ],
                },
                layout: "noBorders",
                margin: [0, 20, 0, 5],
              },
            ],
            margin: [35, 0],
          };
        }
      },
      styles: {
        notesTitle: {
          fontSize: 10,
          bold: true,
          margin: [0, 0, 0, 3],
        },
        notesText: {
          fontSize: 10,
        },
      },
      defaultStyle: {
        columnGap: 20,
      },
    };

    pdfMake.fonts = {
      Roboto: {
        normal: "Roboto-Regular.ttf",
        bold: "Roboto-Medium.ttf",
        italics: "Roboto-Italic.ttf",
        bolditalics: "Roboto-Medium.ttf",
      },
      fileIcons: {
        normal: "iconFont",
      },
    };

    try {
      const mergedPdf = await PDFDocument.create();

      pdfMake.createPdf(invoicePdf).getBuffer(async function (buffer) {
        const pdf = await PDFDocument.load(buffer);
        const copiedPages = await mergedPdf.copyPages(
          pdf,
          pdf.getPageIndices()
        );
        copiedPages.forEach((page) => {
          mergedPdf.addPage(page);
        });
        const mergedPdfFile = await mergedPdf.save();
        const blob = new Blob([mergedPdfFile], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);
        // window.open(url);
        printJS({
          printable: url,
          type: "pdf",
        });
      });
    } catch (error) {
      console.log(error);
    }
  }

  async PrintList(data) {
    this.productsArray = [];
    var address = {};
    var invoiceName = {};
    var subTotal = 0;

    if (data.gender != null) {
      subTotal = Number(data.gender);
    }

    var tax = 123;
    var total = subTotal + tax;

    // if (data.invoice_products.length > 0) {
    //   data.invoice_products.forEach((product, index) => {
    //     var unitName = "lb";
    //     if (product.product.unit != undefined && product.product.unit != null) {
    //       unitName = product.product.unit.name;
    //     }

    //     var caseArray = [];
    //     if (
    //       product.ordering_unit == "case" ||
    //       product.ordering_unit == "Case"
    //     ) {
    //       if (
    //         product.case_weight_details &&
    //         product.case_weight_details.length > 0
    //       ) {
    //         try {
    //           var weight = JSON.parse(product.case_weight_details);
    //           weight.forEach((element) => {
    //             if (element.weight != undefined && element != {}) {
    //               caseArray.push("---");
    //             } else {
    //               caseArray.push("____");
    //             }
    //           });
    //         } catch (error) {
    //           console.log("case_weight_details : invalid Json");
    //         }
    //       }
    //     }
    //     var caseItemString = "\n";
    //     if (caseArray.length > 0) {
    //       caseArray.forEach((element, index) => {
    //         caseItemString += element;
    //         if (caseArray.length != index + 1) {
    //           caseItemString += ", ";
    //         }
    //       });
    //     }
    //     var productQuantity = product.quantity != null ? product.quantity : "";
    //     var productOrderingUnit =
    //       product.ordering_unit != null ? product.ordering_unit : "";
    //     var productNameAndCaseUnits =
    //       product.name != null ? product.name + caseItemString : "";
    //     var productFinalWeight =
    //       product.final_weight != null ? product.final_weight + " lbs" : "";
    //     var productOrderingPrice = "";
    //     var productLineTotal = "";
    //     this.productsArray.push([
    //       {
    //         text: { text: productQuantity, alignment: "left", fontSize: 9 },
    //         border: [false, false, false, true],
    //         alignment: "left",
    //         margin: [0, 5, 0, 5],
    //       },
    //       {
    //         text: {
    //           text: productOrderingUnit,
    //           alignment: "center",
    //           textTransform: "capitalize",
    //           fontSize: 9,
    //         },
    //         border: [false, false, false, true],
    //         margin: [0, 5, 0, 5],
    //         alignment: "left",
    //       },
    //       {
    //         text: { text: productNameAndCaseUnits, fontSize: 9 },
    //         border: [false, false, false, true],
    //         margin: [0, 5, 0, 5],
    //         alignment: "left",
    //       },
    //       {
    //         text: {
    //           text: productFinalWeight,
    //           alignment: "center",
    //           fontSize: 9,
    //         },
    //         border: [false, false, false, true],
    //         margin: [0, 5, 0, 5],
    //         alignment: "left",
    //       },
    //       {
    //         text: {
    //           text: productOrderingPrice,
    //           alignment: "center",
    //           fontSize: 9,
    //         },
    //         border: [false, false, false, true],
    //         margin: [0, 5, 0, 5],
    //         alignment: "left",
    //       },
    //       {
    //         text: { text: productLineTotal, alignment: "right", fontSize: 9 },
    //         border: [false, false, false, true],
    //         margin: [0, 5, 0, 5],
    //         alignment: "left",
    //       },
    //     ]);
    //   });
    // }
    var extraChargesArray;
    try {
      extraChargesArray = JSON.parse(data.extra_charges);
    } catch (error) {
      console.log("extra_charges : invalid Json");
    }

    if (extraChargesArray != null && extraChargesArray.length > 0) {
      extraChargesArray.forEach((element) => {
        var productQuantity = 1;
        var productOrderingUnit = "";
        var productNameAndCaseUnits = element.text != null ? element.text : "";
        var productFinalWeight = "";
        var productOrderingPrice = "";
        var productLineTotal = element.value != null ? "$" + "" : "";
        this.productsArray.push([
          {
            text: { text: productQuantity, alignment: "left", fontSize: 9 },
            border: [false, false, false, true],
            alignment: "left",
            margin: [0, 5, 0, 5],
          },
          {
            text: {
              text: productOrderingUnit,
              alignment: "center",
              textTransform: "capitalize",
              fontSize: 9,
            },
            border: [false, false, false, true],
            margin: [0, 5, 0, 5],
            alignment: "left",
          },
          {
            text: { text: productNameAndCaseUnits, fontSize: 9 },
            border: [false, false, false, true],
            margin: [0, 5, 0, 5],
            alignment: "left",
          },
          {
            text: {
              text: productFinalWeight,
              alignment: "center",
              fontSize: 9,
            },
            border: [false, false, false, true],
            margin: [0, 5, 0, 5],
            alignment: "left",
          },
          {
            text: {
              text: productOrderingPrice,
              alignment: "center",
              fontSize: 9,
            },
            border: [false, false, false, true],
            margin: [0, 5, 0, 5],
            alignment: "left",
          },
          {
            text: { text: productLineTotal, alignment: "right", fontSize: 9 },
            border: [false, false, false, true],
            margin: [0, 5, 0, 5],
            alignment: "left",
          },
        ]);
        // this.productsArray.push(
        //   [{
        //     text:
        //       { text: productQuantity, alignment: "left", fontSize: 9 }, border: [false, false, false, true], alignment: "left", margin: [0, 5, 0, 5],
        //   },
        //   { text: { text: productOrderingUnit, alignment: "center", textTransform: "capitalize", fontSize: 9 }, border: [false, false, false, true], margin: [0, 5, 0, 5], alignment: "left", },
        //   { text: { text: productNameAndCaseUnits, fontSize: 9, }, border: [false, false, false, true], margin: [0, 5, 0, 5], alignment: "left", },
        //   { text: { text: productFinalWeight, alignment: "center", fontSize: 9 }, border: [false, false, false, true], margin: [0, 5, 0, 5], alignment: "left", },
        //   { text: { text: productOrderingPrice, alignment: "center", fontSize: 9, }, border: [false, false, false, true], margin: [0, 5, 0, 5], alignment: "left", },
        //   { text: { text: productLineTotal, alignment: "right", fontSize: 9 }, border: [false, false, false, true], margin: [0, 5, 0, 5], alignment: "left", },
        //   ]
        // );
      });
    }

    const harissonlogo =
      "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Y+ImIiIiINIyBn4iIiIhIwxj4iYiIiIg0jIGfiIiIiEjDGPiJiIiIiDSMgZ+IiIiISMMY+ImIiIiINIyBn4iIiIhIwxj4iYiIiIg0jIGfiIiIiEjDGPiJiIiIiDSMgZ+IiIiISMMY+ImIiIiINIyBn4iIiIhIwxj4iYiIiIg0jIGfiIiIiEjDGPiJiIiIiDSMgZ+IiIiISMMY+ImIiIiINIyBn4iIiIhIwxj4iYiIiIg0jIGfiIiIiEjDGPiJiIiIiDSMgZ+IiIiISMMY+ImIiIiINIyBn4iIiIhIwxj4iYiIiIg0jIGfiIiIiEjDGPiJiIiIiDSMgZ+IiIiISMMY+ImIiIiINIyBn4iIiIhIwxj4iYiIiIg0jIGfiIiIiEjDGPiJiIiIiDSMgZ+IiIiISMMY+ImIiIiINIyBn4iIiIhIwxj4iYiIiIg0jIGfiIiIiEjDGPiJiIiIiDSMgZ+IiIiISMMY+ImIiIiINIyBn4iIiIhIwxj4iYiIiIg0jIGfiIiIiEjDGPiJiIiIiDSMgZ+IiIiISMMY+ImIiIiINIyBn4iIiIhIwxj4iYiIiIg0jIGfiIiIiEjDGPiJiIiIiDSMgZ+IiIiISMMY+ImIiIiINIyBn4iIiIhIwxj4iYiIiIg0jIGfiIiIiEjDGPiJiIiIiDSMgZ+IiIiISMMY+ImIiIiINIyBn4iIiIhIwxj4iYiIiIg0jIGfiIiIiEjDGPiJiIiIiDSMgZ+IiIiISMMY+ImIiIiINIyBn4iIiIhIwxj4iYiIiIg0jIGfiIiIiEjDGPiJiIiIiDSMgZ+IiIiISMP+P0PJfUAuCJFVAAAAAElFTkSuQmCC";
    var invoicePdf = {
      info: {
        title: "Invoice_" + String(data.id),
      },

      pageSize: "A4",
      pageMargins: [40, 33, 40, 115],
      header: function (currentPage, pageCount) {
        var pageNumber = {};
        if (currentPage == 1) {
          pageNumber = {
            text: "Page " + currentPage + " of " + pageCount,
            fontSize: 10,
            color: "#458DC2",
            relativePosition: { x: 505, y: 120 },
          };
        } else {
          pageNumber = {
            text: "Page " + currentPage + " of " + pageCount,
            fontSize: 10,
            color: "#458DC2",
            relativePosition: { x: 505, y: 20 },
          };
        }
        return pageNumber;
      },
      content: [
        {
          columns: [
            {
              table: {
                widths: ["25%", "*", "35%"],
                body: [
                  [
                    {
                      image: "data:image/png;base64," + harissonlogo,
                      width: 110,
                    },
                    {
                      text: "Matara.\nSri lanka\n easyloan.com\nPhone: (077) 336-1715\nFax: (847) 724-9209\nEmail: lkeasyloan@gmail.com",
                      color: "#458DC2",
                      width: "*",
                      fontSize: 9,
                      alignment: "left",
                      margin: [0, 0, 0, 15],
                    },
                    {
                      table: {
                        headerRows: 1,
                        widths: ["100%"],
                        body: [
                          [
                            {
                              text: "Borrower Application",
                              alignment: "right",
                              color: "#458DC2",
                              fontSize: 24,
                              bold: true,
                              relativePosition: { x: 0, y: -3 },
                            },
                          ],
                          [{}],
                        ],
                        layout: "noBorders",
                      },
                      layout: "noBorders",
                    },
                  ],
                ],
              },
              layout: "noBorders",
            },
          ],
        },
        {
          columns: [
            {
              text: invoiceName,
              color: "#458DC2",
              bold: true,
              fontSize: 15,
              alignment: "left",
              margin: [0, 20, 0, 5],
            },
          ],
        },
        {
          columns: [
            { text: address, style: "invoiceBillingAddress", fontSize: 11 },
          ],
        },
        "\n\n",
        {
          layout: {
            defaultBorder: false,
            hLineWidth: function (i, node) {
              return 1;
            },
            vLineWidth: function (i, node) {
              return 1;
            },
            hLineColor: function (i, node) {
              if (i === 1 || i === 0) {
                return "#bfdde8";
              }
              return "#eaeaea";
            },
            vLineColor: function (i, node) {
              return "#eaeaea";
            },
            hLineStyle: function (i, node) {
              return null;
            },
            paddingLeft: function (i, node) {
              return 10;
            },
            paddingRight: function (i, node) {
              return 10;
            },
            paddingTop: function (i, node) {
              return 2;
            },
            paddingBottom: function (i, node) {
              return 2;
            },
            fillColor: function (rowIndex, node, columnIndex) {
              return "#fff";
            },
          },
          table: {
            headerRows: 1,
            widths: ["6%", "10%", "*", "14%", "14%", "14%"],
            body: [
              [
                {
                  text: {
                    text: "Qty",
                    fontSize: 10,
                    bold: true,
                    color: "white",
                  },
                  alignment: "left",
                  fillColor: "#458DC2",
                },
                {
                  text: {
                    text: "Units",
                    fontSize: 10,
                    bold: true,
                    color: "white",
                  },
                  alignment: "center",
                  fillColor: "#458DC2",
                },
                {
                  text: {
                    text: "Product",
                    fontSize: 10,
                    bold: true,
                    color: "white",
                  },
                  fillColor: "#458DC2",
                },
                {
                  text: {
                    text: "Weight",
                    fontSize: 10,
                    bold: true,
                    color: "white",
                  },
                  alignment: "center",
                  fillColor: "#458DC2",
                },
                {
                  text: {
                    text: "Price",
                    fontSize: 10,
                    bold: true,
                    color: "white",
                  },
                  alignment: "center",
                  fillColor: "#458DC2",
                },
                {
                  text: {
                    text: "Total",
                    fontSize: 10,
                    bold: true,
                    color: "white",
                  },
                  alignment: "right",
                  fillColor: "#458DC2",
                },
              ],
              [{ text: { text: "\n" } }, {}, {}, {}, {}, {}],
              // ...this.productsArray,
            ],
          },
        },
        "\n\n\n",
        {
          layout: {
            defaultBorder: false,
            hLineWidth: function (i, node) {
              return 1;
            },
            vLineWidth: function (i, node) {
              return 1;
            },
            hLineColor: function (i, node) {
              return "#eaeaea";
            },
            vLineColor: function (i, node) {
              return "#eaeaea";
            },
            hLineStyle: function (i, node) {
              return null;
            },
            paddingLeft: function (i, node) {
              return 10;
            },
            paddingRight: function (i, node) {
              return 10;
            },
            paddingTop: function (i, node) {
              return 3;
            },
            paddingBottom: function (i, node) {
              return 3;
            },
            fillColor: function (rowIndex, node, columnIndex) {
              return "#fff";
            },
          },

          table: {
            headerRows: 1,
            widths: ["75%", "12.5%", "12.5%"],
            body: [
              [
                {},
                {
                  text: "Subtotal",
                  alignment: "left",
                  fontSize: 9,
                  margin: [0, 2, 0, 2],
                },
                {
                  text: "$" + "",
                  alignment: "right",
                  fontSize: 9,
                  margin: [0, 2, 0, 2],
                },
              ],
              [
                {},
                {
                  text: "Tax",
                  fontSize: 9,
                  alignment: "left",
                  margin: [0, 2, 0, 2],
                },
                {
                  text: "$" + "",
                  fontSize: 9,
                  alignment: "right",
                  margin: [0, 2, 0, 2],
                },
              ],
              [
                {},
                {
                  text: "Total",
                  bold: true,
                  color: "#458DC2",
                  fontSize: 13,
                  alignment: "left",
                  margin: [0, 2, 0, 2],
                },
                {
                  text: "$" + "",
                  bold: true,
                  fontSize: 13,
                  color: "#458DC2",
                  alignment: "right",
                  margin: [0, 2, 0, 2],
                },
              ],
            ],
            layout: "noBorders",
          },
        },
      ],
      footer: function (currentPage, pageCount) {
        if (currentPage == pageCount) {
          return {
            columns: [
              {
                table: {
                  widths: ["80%", "20%"],
                  body: [
                    [
                      {
                        canvas: [
                          {
                            type: "line",
                            x1: 0,
                            y1: 0,
                            x2: 400,
                            y2: 0,
                            lineWidth: 1,
                          },
                        ],
                      },
                      {
                        canvas: [
                          {
                            type: "line",
                            x1: 0,
                            y1: 0,
                            x2: 95,
                            y2: 0,
                            lineWidth: 1,
                          },
                        ],
                      },
                    ],
                    [
                      {
                        text: [
                          {
                            text: "Signature",
                            marginBottom: 50,
                            italics: true,
                          },
                        ],
                      },
                      { text: [{ text: "Date\n", italics: true }] },
                    ],
                    [{ colSpan: 2, text: "" }],
                    [
                      {
                        colSpan: 2,
                        text: [
                          {
                            text: "By signing, I acknowledge the following: Above merchandise is received and in good condition. All Invoices are due within 30 days of sale. Overdue invoices are subject to 1.5% interest per month. Should collection procedures be necessary, customer is responsible for all collection costs. Merchandise for resale only. No deductions without prior approval. No returns without prior approval. Service charge of $25 for returned checks.",
                            fontSize: 9,
                          },
                        ],
                      },
                    ],
                  ],
                },
                layout: "noBorders",
                margin: [0, 20, 0, 5],
              },
            ],
            margin: [35, 0],
          };
        }
      },
      styles: {
        notesTitle: {
          fontSize: 10,
          bold: true,
          margin: [0, 0, 0, 3],
        },
        notesText: {
          fontSize: 10,
        },
      },
      defaultStyle: {
        columnGap: 20,
      },
    };

    pdfMake.fonts = {
      Roboto: {
        normal: "Roboto-Regular.ttf",
        bold: "Roboto-Medium.ttf",
        italics: "Roboto-Italic.ttf",
        bolditalics: "Roboto-Medium.ttf",
      },
      fileIcons: {
        normal: "iconFont",
      },
    };

    try {
      const mergedPdf = await PDFDocument.create();

      pdfMake.createPdf(invoicePdf).getBuffer(async function (buffer) {
        const pdf = await PDFDocument.load(buffer);
        const copiedPages = await mergedPdf.copyPages(
          pdf,
          pdf.getPageIndices()
        );
        copiedPages.forEach((page) => {
          mergedPdf.addPage(page);
        });
        const mergedPdfFile = await mergedPdf.save();
        const blob = new Blob([mergedPdfFile], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);
        // window.open(url);
        printJS({
          printable: url,
          type: "pdf",
        });
      });
    } catch (error) {
      console.log(error);
    }
  }
  textToBase64Barcode(text) {
    var canvas = document.createElement("canvas");
    JsBarcode(canvas, text, { format: "CODE39" });
    return canvas.toDataURL("image/png");
  }
}
