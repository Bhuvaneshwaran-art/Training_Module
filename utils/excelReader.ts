import * as XLSX from "xlsx";

export interface ExcelRow {
  [key: string]: any;
}

/**
 * Reads a sheet from an Excel workbook and returns each row as an object,
 * keyed by the column headers in row 1.
 *
 * @param filePath  absolute or relative path to the .xlsx file
 * @param sheetName exact name of the sheet tab to read
 */
export function readExcelSheet(filePath: string, sheetName: string): ExcelRow[] {
  const workbook = XLSX.readFile(filePath);
  const sheet = workbook.Sheets[sheetName];

  if (!sheet) {
    throw new Error(
      `Sheet "${sheetName}" was not found in "${filePath}". Available sheets: ${workbook.SheetNames.join(", ")}`
    );
  }

  // defval: "" ensures blank cells come back as "" instead of being omitted
  return XLSX.utils.sheet_to_json<ExcelRow>(sheet, { defval: "" });
}