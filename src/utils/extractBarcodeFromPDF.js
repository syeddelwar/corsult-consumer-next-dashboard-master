import { PDFBarcodeJs } from "pdf-barcode"; // ES6

export default function (pdfBase64) {
  return new Promise((resolve, reject) => {
    try {
      // Convert base64 PDF to buffer
      const pdfBuffer = Buffer.from(pdfBase64, "base64");
      const configs = {
        scale: {
          once: true,
          value: 3,
        },
        resultOpts: {
          singleCodeInPage: true,
        },
        patches: ["x-small", "small", "medium"],
        quagga: {
          decoder: {
            readers: ["code_128_reader"],
          },
        },
      };

      // Create callback which handles the result
      const callback = function (result) {
        console.log(result);
        if (result.success) {
          resolve(result.codes[0]); // Resolve the promise with the barcode value
        } else {
          reject(result.message); // Reject the promise with the error message
        }
      };

      // Decode a single page
      const pageNr = 1;
      PDFBarcodeJs.decodeDocument(pdfBuffer, configs, callback);
    } catch (error) {
      reject(error); // Reject the promise if there's an error
    }
  });
}
