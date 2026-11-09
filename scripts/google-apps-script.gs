/**
 * ==============================================================================
 * KETAKI ADHAR FOUNDATION - UNIFIED GOOGLE APPS SCRIPT WEB APP
 * ==============================================================================
 * This script accepts JSON form submissions from ketakiadhar.in and routes
 * them automatically into separate, professionally formatted tabs inside
 * ONE Google Spreadsheet workbook.
 *
 * TABS CREATED AUTOMATICALLY:
 *  1. "📋 All Submissions" - Master real-time activity log
 *  2. "💚 Donations" - Support pledges & donor details
 *  3. "🤝 Volunteers" - Volunteer applications & availability
 *  4. "🌾 Farmer Registrations" - Detailed farmer registrations & farm profiles
 *  5. "🚜 Farmer Quick Help" - Homepage quick farmer assistance requests
 *  6. "✉️ Contact Inquiries" - General contact & support queries
 *  7. "💼 Job Applications" - Career applications
 *  8. "❓ Questions & FAQ" - Questions submitted via FAQ
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
// Helper: Get or Create Sheet with Formatted Headers
// ------------------------------------------------------------------------------
function getOrCreateSheet(ss, sheetName, headers, headerColor) {
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    var headerRow = sheet.getRange(1, 1, 1, headers.length);
    headerRow.setValues([headers]);
    headerRow.setFontWeight('bold');
    headerRow.setFontColor('#FFFFFF');
    headerRow.setBackground(headerColor || '#059669');
    headerRow.setHorizontalAlignment('center');
    sheet.setFrozenRows(1);

    // Auto-adjust column widths
    for (var i = 1; i <= headers.length; i++) {
      sheet.setColumnWidth(i, 160);
    }
  }
  return sheet;
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
  var sheet = getOrCreateSheet(ss, '📋 All Submissions', headers, '#064E3B');

  var name = data.fullName || data.name || '-';
  var phone = data.phone || '-';
  var email = data.email || '-';
  var location = data.city || data.district || data.village || '-';
  var summary = data.pledgeCode || data.enrollmentCode || data.subject || data.supportPillar || data.roleInterest || data.inquiryType || '-';

  sheet.appendRow([
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
  var sheet = getOrCreateSheet(ss, '💚 Donations', headers, '#10B981');

  sheet.appendRow([
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
  var sheet = getOrCreateSheet(ss, '🤝 Volunteers', headers, '#2563EB');

  sheet.appendRow([
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
  var sheet = getOrCreateSheet(ss, '🌾 Farmer Registrations', headers, '#15803D');

  sheet.appendRow([
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
  var sheet = getOrCreateSheet(ss, '🚜 Farmer Quick Help', headers, '#D97706');

  sheet.appendRow([
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
  var sheet = getOrCreateSheet(ss, '✉️ Contact Inquiries', headers, '#7C3AED');

  sheet.appendRow([
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
  var sheet = getOrCreateSheet(ss, '💼 Job Applications', headers, '#0D9488');

  sheet.appendRow([
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
  var sheet = getOrCreateSheet(ss, '❓ Questions & FAQ', headers, '#4B5563');

  sheet.appendRow([
    timestamp,
    data.fullName || '-',
    data.email || '-',
    data.question || '-'
  ]);
}

function logGeneral(ss, timestamp, data) {
  var headers = ['Timestamp', 'Form Type', 'Payload JSON'];
  var sheet = getOrCreateSheet(ss, '📦 Miscellaneous', headers, '#374151');
  sheet.appendRow([timestamp, data.formType || 'Unknown', JSON.stringify(data)]);
}

