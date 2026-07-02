// ─────────────────────────────────────────────────────────────────
// GENERIC SCORECARD DATA FEED — dataset-agnostic version of Code.gs
// Works for ANY Google Sheet, not just the Mezza operations sheet.
// ─────────────────────────────────────────────────────────────────
//
// What it does: loops through every tab in the spreadsheet, turns each
// tab's rows into an array of {header: value} objects, and returns the
// whole thing as one JSON object keyed by tab name — e.g.
//   { "Revenue": [...], "Headcount": [...] }
//
// You do NOT need to edit this file to match your columns. It reads
// whatever headers are in Row 1 of each tab automatically.
//
// Conventions (match Peter's original sheet, optional but recommended):
//   - Row 1 of each tab = column headers
//   - Any tab you want the script to SKIP (scratch work, notes, config)
//     should be named starting with an underscore, e.g. "_notes"
//   - If your data starts on Row 3 (Row 2 is a formatting/notes row,
//     like the Mezza sheet), change START_ROW to 2 below.

var START_ROW = 1; // 1 = data starts right after headers. Use 2 if row 2 is a spacer row.

function doGet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheets = ss.getSheets();
  var output = {};

  sheets.forEach(function (sheet) {
    var name = sheet.getName();
    if (name.indexOf('_') === 0) return; // skip tabs starting with "_"

    var values = sheet.getDataRange().getValues();
    if (values.length < 2) return; // needs headers + at least 1 row

    var headers = values[0];

    var rows = values
      .slice(START_ROW)
      .filter(function (row) {
        return row[0] !== '' && row[0] !== null;
      })
      .map(function (row) {
        var obj = {};
        headers.forEach(function (h, i) {
          if (h) obj[h] = row[i];
        });
        return obj;
      });

    output[name] = rows;
  });

  var result = ContentService.createTextOutput(JSON.stringify(output));
  result.setMimeType(ContentService.MimeType.JSON);
  return result;
}

// ─────────────────────────────────────────────────────────────────
// DEPLOY THIS (same as the original setup):
// Deploy → New deployment → Web app → Execute as: Me →
// Who has access: Anyone → Deploy → copy the /exec URL.
// That URL goes into SCRIPT_URL in scorecard_template.html.
// ─────────────────────────────────────────────────────────────────
