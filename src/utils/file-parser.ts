import Papa from "papaparse";

const parseFile = (file: File): Promise<any> => {
  return new Promise((resolve, reject) => {
    const { type } = file;

    if (type === "text/csv") {
      // Parse CSV
      const reader = new FileReader();
      reader.onload = () => {
        const csvText = reader.result as string;
        Papa.parse(csvText, {
          header: true, // Parses the first row as keys
          skipEmptyLines: true,
          complete: (results) => resolve(results.data),
          error: (error: any) => reject(error),
        });
      };
      reader.onerror = () => reject(new Error("Failed to read CSV file."));
      reader.readAsText(file);
    } else if (type === "application/json") {
      // Parse JSON
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const json = JSON.parse(reader.result as string);
          resolve(json);
        } catch (error) {
          reject(new Error("Invalid JSON format."));
        }
      };
      reader.onerror = () => reject(new Error("Failed to read JSON file."));
      reader.readAsText(file);
    } else {
      // Unsupported file type
      reject(
        new Error("Unsupported file type. Please upload a CSV or JSON file."),
      );
    }
  });
};

export default parseFile;
