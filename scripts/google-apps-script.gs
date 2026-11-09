/**
 * ==============================================================================
 * KETAKI ADHAR FOUNDATION - UNIFIED GOOGLE APPS SCRIPT WEB APP (EXECUTIVE EDITION)
 * ==============================================================================
 * Features:
 *  - ALL details & headers perfectly CENTER-ALIGNED horizontally & vertically
 *  - Generous, tailored column widths (no squashed/truncated text or messy overflow)
 *  - Automatic text wrapping on long messages, remarks & addresses
 *  - Elegant header styling (42px height, bold white text, themed brand colors)
 *  - Subtle alternating row backgrounds (zebra striping) & crisp grid borders
 *  - Includes "formatAndBeautifyAllSheets()" function to clean up existing data in 1 click!
 * ==============================================================================
 */

function doGet(e) {
  return ContentService.createTextOutput(
    JSON.stringify({ status: 'online', service: 'Ketaki Adhar Form Sync', timestamp: new Date().toISOString() })
  ).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var rawData = e.postData.contents;
    var data = JSON.parse(rawData);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var timestamp = data.submittedAt || new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    var formType = (data.formType || 'general').toLowerCase();

    // 1. Log to Master "All Submissions" Tab
    logToMaster(ss, timestamp, data);

    // 2. Route to Dedicated Tab based on formType
    switch (formType) {
      case 'donation':
        logDonation(ss, timestamp, data);
        break;

      case 'volunteer':
        logVolunteer(ss, timestamp, data);
        break;

      case 'farmer_registration':
        logFarmerRegistration(ss, timestamp, data);
        break;

      case 'farmer_quick':
        logFarmerQuick(ss, timestamp, data);
        break;

      case 'contact':
        logContact(ss, timestamp, data);
        break;

      case 'career':
        logCareer(ss, timestamp, data);
        break;

      case 'faq':
        logFAQ(ss, timestamp, data);
        break;

      default:
        logGeneral(ss, timestamp, data);
        break;
    }

    return ContentService.createTextOutput(
      JSON.stringify({ result: 'success', message: 'Data logged successfully' })
    ).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ result: 'error', error: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);

  } finally {
    lock.releaseLock();
  }
}

// ------------------------------------------------------------------------------
// Helper: Get or Create Sheet with Formatted Headers & Tailored Column Widths
// ------------------------------------------------------------------------------
function getOrCreateSheet(ss, sheetName, headers, headerColor, columnWidths) {
  var sheet = ss.getSheetByName(sheetName);
  var isNew = false;
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    isNew = true;
  }

  // Format header row
  var headerRow = sheet.getRange(1, 1, 1, headers.length);
  headerRow.setValues([headers]);
  headerRow.setFontWeight('bold');
  headerRow.setFontSize(10.5);
  headerRow.setFontFamily('Arial');
  headerRow.setFontColor('#FFFFFF');
  headerRow.setBackground(headerColor || '#059669');
  headerRow.setHorizontalAlignment('center');
  headerRow.setVerticalAlignment('middle');
  headerRow.setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP);
  sheet.setRowHeight(1, 42);
  sheet.setFrozenRows(1);

  // Apply generous custom column widths
  if (columnWidths && columnWidths.length > 0) {
    for (var i = 0; i < columnWidths.length; i++) {
      sheet.setColumnWidth(i + 1, columnWidths[i]);
    }
  }

  return sheet;
}

// ------------------------------------------------------------------------------
// Helper: Append Perfectly Centered, Padded & Styled Data Row
// ------------------------------------------------------------------------------
function appendFormattedRow(sheet, rowValues) {
  sheet.appendRow(rowValues);
  var lastRow = sheet.getLastRow();
  var range = sheet.getRange(lastRow, 1, 1, rowValues.length);

  // Center alignment & clean typography
  range.setHorizontalAlignment('center');
  range.setVerticalAlignment('middle');
  range.setFontFamily('Arial');
  range.setFontSize(10);
  range.setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP);

  // Subtle zebra striping for high readability
  if (lastRow % 2 === 0) {
    range.setBackground('#F9FAFB'); // very light subtle gray
  } else {
    range.setBackground('#FFFFFF');
  }

  // Crisp, clean gridlines
  range.setBorder(true, true, true, true, true, true, '#E5E7EB', SpreadsheetApp.BorderStyle.SOLID);
  sheet.setRowHeight(lastRow, 36);
}

// ------------------------------------------------------------------------------
// Tab 1: Master "All Submissions" Log
// ------------------------------------------------------------------------------
function logToMaster(ss, timestamp, data) {
  var headers = [
    'Timestamp',
    'Form Type',
    'Full Name',
    'Phone',
    'Email',
    'Location / City',
    'Summary / Reference Code'
  ];
  // Column widths: Timestamp, Type, Name, Phone, Email, Location, Summary
  var widths = [180, 200, 200, 160, 240, 200, 260];
  var sheet = getOrCreateSheet(ss, '📋 All Submissions', headers, '#064E3B', widths);

  var name = data.fullName || data.name || '-';
  var phone = data.phone || '-';
  var email = data.email || '-';
  var location = data.city || data.district || data.village || '-';
  var summary = data.pledgeCode || data.enrollmentCode || data.subject || data.supportPillar || data.roleInterest || data.inquiryType || '-';

  appendFormattedRow(sheet, [
    timestamp,
    data.formTitle || data.formType,
    name,
    phone,
    email,
    location,
    summary
  ]);
}

// ------------------------------------------------------------------------------
// Tab 2: Donations & Pledges
// ------------------------------------------------------------------------------
function logDonation(ss, timestamp, data) {
  var headers = [
    'Timestamp',
    'Pledge Code',
    'Full Name',
    'Email',
    'Phone',
    'City',
    'Support Pillar / Initiative',
    'Pledge Frequency',
    'Message / Notes'
  ];
  // Generous widths so pledge code & notes have ample space
  var widths = [180, 180, 200, 240, 160, 160, 260, 180, 320];
  var sheet = getOrCreateSheet(ss, '💚 Donations', headers, '#10B981', widths);

  appendFormattedRow(sheet, [
    timestamp,
    data.pledgeCode || '-',
    data.fullName || '-',
    data.email || '-',
    data.phone || '-',
    data.city || '-',
    data.supportPillar || '-',
    data.frequency || '-',
    data.notes || '-'
  ]);
}

// ------------------------------------------------------------------------------
// Tab 3: Volunteers
// ------------------------------------------------------------------------------
function logVolunteer(ss, timestamp, data) {
  var headers = [
    'Timestamp',
    'Full Name',
    'Email',
    'Phone',
    'City',
    'Preferred Role / Area',
    'Weekly Availability',
    'Previous Experience / Skills',
    'Motivation'
  ];
  var widths = [180, 200, 240, 160, 160, 240, 200, 280, 320];
  var sheet = getOrCreateSheet(ss, '🤝 Volunteers', headers, '#2563EB', widths);

  appendFormattedRow(sheet, [
    timestamp,
    data.fullName || '-',
    data.email || '-',
    data.phone || '-',
    data.city || '-',
    data.roleInterest || '-',
    data.availability || '-',
    data.experience || '-',
    data.motivation || '-'
  ]);
}

// ------------------------------------------------------------------------------
// Tab 4: Farmer Registrations (Full Detailed Form)
// ------------------------------------------------------------------------------
function logFarmerRegistration(ss, timestamp, data) {
  var headers = [
    'Timestamp',
    'Enrollment Code',
    'Farmer Name',
    'Phone',
    'Land Size (Acres)',
    'District',
    'Taluka',
    'Village',
    'Crops Grown',
    'Soil Type',
    'Water / Irrigation Source',
    'Support Required',
    'Additional Remarks'
  ];
  var widths = [180, 190, 200, 160, 140, 160, 160, 160, 220, 160, 200, 250, 300];
  var sheet = getOrCreateSheet(ss, '🌾 Farmer Registrations', headers, '#15803D', widths);

  appendFormattedRow(sheet, [
    timestamp,
    data.enrollmentCode || '-',
    data.fullName || '-',
    data.phone || '-',
    data.acres || '-',
    data.district || '-',
    data.taluka || '-',
    data.village || '-',
    data.cropTypes || '-',
    data.soilType || '-',
    data.irrigationSource || '-',
    data.supportRequired || '-',
    data.notes || '-'
  ]);
}

// ------------------------------------------------------------------------------
// Tab 5: Homepage Farmer Quick Assistance
// ------------------------------------------------------------------------------
function logFarmerQuick(ss, timestamp, data) {
  var headers = [
    'Timestamp',
    'Farmer Name',
    'Phone',
    'Land Size (Acres)',
    'District',
    'Taluka',
    'Village',
    'Reported Problem / Assistance Needed'
  ];
  var widths = [180, 200, 160, 140, 160, 160, 160, 340];
  var sheet = getOrCreateSheet(ss, '🚜 Farmer Quick Help', headers, '#D97706', widths);

  appendFormattedRow(sheet, [
    timestamp,
    data.fullName || '-',
    data.phone || '-',
    data.acres || '-',
    data.district || '-',
    data.taluka || '-',
    data.village || '-',
    data.remarkProblem || '-'
  ]);
}

// ------------------------------------------------------------------------------
// Tab 6: Contact Page Inquiries
// ------------------------------------------------------------------------------
function logContact(ss, timestamp, data) {
  var headers = [
    'Timestamp',
    'Full Name',
    'Email',
    'Phone',
    'Inquiry Type',
    'Subject',
    'Message'
  ];
  var widths = [180, 200, 240, 160, 180, 240, 360];
  var sheet = getOrCreateSheet(ss, '✉️ Contact Inquiries', headers, '#7C3AED', widths);

  appendFormattedRow(sheet, [
    timestamp,
    data.fullName || '-',
    data.email || '-',
    data.phone || '-',
    data.inquiryType || '-',
    data.subject || '-',
    data.message || '-'
  ]);
}

// ------------------------------------------------------------------------------
// Tab 7: Job Applications (Careers Page)
// ------------------------------------------------------------------------------
function logCareer(ss, timestamp, data) {
  var headers = [
    'Timestamp',
    'Full Name',
    'Email',
    'Phone',
    'Applied Role',
    'Total Experience',
    'Current City',
    'Portfolio / LinkedIn / Cover Note'
  ];
  var widths = [180, 200, 240, 160, 200, 160, 180, 320];
  var sheet = getOrCreateSheet(ss, '💼 Job Applications', headers, '#0D9488', widths);

  appendFormattedRow(sheet, [
    timestamp,
    data.fullName || '-',
    data.email || '-',
    data.phone || '-',
    data.role || '-',
    data.experience || '-',
    data.city || '-',
    data.coverLetter || data.portfolioUrl || '-'
  ]);
}

// ------------------------------------------------------------------------------
// Tab 8: FAQ & Visitor Questions
// ------------------------------------------------------------------------------
function logFAQ(ss, timestamp, data) {
  var headers = [
    'Timestamp',
    'Full Name',
    'Email',
    'Question'
  ];
  var widths = [180, 200, 240, 350];
  var sheet = getOrCreateSheet(ss, '❓ Questions & FAQ', headers, '#4B5563', widths);

  appendFormattedRow(sheet, [
    timestamp,
    data.fullName || '-',
    data.email || '-',
    data.question || '-'
  ]);
}

function logGeneral(ss, timestamp, data) {
  var headers = ['Timestamp', 'Form Type', 'Payload JSON'];
  var widths = [180, 200, 500];
  var sheet = getOrCreateSheet(ss, '📦 Miscellaneous', headers, '#374151', widths);
  appendFormattedRow(sheet, [timestamp, data.formType || 'Unknown', JSON.stringify(data)]);
}

// ------------------------------------------------------------------------------
// ONE-CLICK CLEANUP FUNCTION: Reformat & Beautify All Existing Sheets & Rows
// ------------------------------------------------------------------------------
/**
 * Run this function once from the Google Apps Script editor to instantly
 * clean up, widen columns, center-align, and format ALL existing sheets and rows!
 */
function formatAndBeautifyAllSheets() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheets = ss.getSheets();

  var widthMap = {
    '📋 All Submissions': [180, 200, 200, 160, 240, 200, 260],
    '💚 Donations': [180, 180, 200, 240, 160, 160, 260, 180, 320],
    '🤝 Volunteers': [180, 200, 240, 160, 160, 240, 200, 280, 320],
    '🌾 Farmer Registrations': [180, 190, 200, 160, 140, 160, 160, 160, 220, 160, 200, 250, 300],
    '🚜 Farmer Quick Help': [180, 200, 160, 140, 160, 160, 160, 340],
    '✉️ Contact Inquiries': [180, 200, 240, 160, 180, 240, 360],
    '💼 Job Applications': [180, 200, 240, 160, 200, 160, 180, 320],
    '❓ Questions & FAQ': [180, 200, 240, 350]
  };

  for (var s = 0; s < sheets.length; s++) {
    var sheet = sheets[s];
    var name = sheet.getName();
    var lastRow = sheet.getLastRow();
    var lastCol = sheet.getLastColumn();

    if (lastRow === 0 || lastCol === 0) continue;

    // 1. Header styling
    var headerRange = sheet.getRange(1, 1, 1, lastCol);
    headerRange.setFontWeight('bold');
    headerRange.setFontSize(10.5);
    headerRange.setFontFamily('Arial');
    headerRange.setFontColor('#FFFFFF');
    headerRange.setHorizontalAlignment('center');
    headerRange.setVerticalAlignment('middle');
    headerRange.setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP);
    sheet.setRowHeight(1, 42);
    sheet.setFrozenRows(1);

    // 2. Data rows styling
    if (lastRow > 1) {
      var dataRange = sheet.getRange(2, 1, lastRow - 1, lastCol);
      dataRange.setHorizontalAlignment('center');
      dataRange.setVerticalAlignment('middle');
      dataRange.setFontFamily('Arial');
      dataRange.setFontSize(10);
      dataRange.setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP);
      dataRange.setBorder(true, true, true, true, true, true, '#E5E7EB', SpreadsheetApp.BorderStyle.SOLID);

      for (var r = 2; r <= lastRow; r++) {
        sheet.setRowHeight(r, 36);
        var rowRange = sheet.getRange(r, 1, 1, lastCol);
        if (r % 2 === 0) {
          rowRange.setBackground('#F9FAFB');
        } else {
          rowRange.setBackground('#FFFFFF');
        }
      }
    }

    // 3. Apply custom generous column widths
    var customWidths = widthMap[name];
    if (customWidths) {
      for (var c = 0; c < customWidths.length && c < lastCol; c++) {
        sheet.setColumnWidth(c + 1, customWidths[c]);
      }
    } else {
      for (var col = 1; col <= lastCol; col++) {
        sheet.setColumnWidth(col, 200);
      }
    }
  }

  Logger.log('All sheets have been beautifully centered, formatted, and widened!');
}
