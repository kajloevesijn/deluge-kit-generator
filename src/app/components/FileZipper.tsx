import JSZip from "jszip";
import { saveAs } from "file-saver";

export function createExport(
  presetFileName: string,
  presetContent: string,
  samplesToZip: SampleData[]
) {
  const zip = new JSZip();
  const sampleFolder = zip.folder("SAMPLES");
  const presetFolder = zip.folder("KIT");

  if (!sampleFolder || !presetFolder) {
    return;
  }

  presetFolder.file(presetFileName + ".xml", presetContent);

  const promises = samplesToZip.map((sample) => {
    return new Promise<void>((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = function () {
        // Add the file content to the zip
        sampleFolder.file(sample.file.name, reader.result as ArrayBuffer);
        resolve();
      };

      reader.onerror = function () {
        // Reject the promise with the error
        reject(reader.error);
      };

      // Start reading the file
      reader.readAsArrayBuffer(sample.file);
    });
  });

  // Wait for all files to be read
  Promise.all(promises)
    .then(() => {
      // Generate the zip file
      zip.generateAsync({ type: "blob" }).then(function (content) {
        // 'content' is a Blob representing the zip file
        saveAs(content, `${presetFileName}.zip`);
      });
    })
    .catch((error) => {
      // Handle any errors that occurred while reading the files
      console.error("An error occurred:", error);
    });
}
