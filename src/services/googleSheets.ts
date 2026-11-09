/**
 * Google Sheets Integration Service for Ketaki Adhar NGO
 * Sends form submissions across all pages to a Google Apps Script Web App
 * which automatically routes them into dedicated tabs in a single Google Sheet.
 */

export type FormType =
  | 'donation'
  | 'volunteer'
  | 'farmer_registration'
  | 'farmer_quick'
  | 'contact'
  | 'career'
  | 'faq';

export interface FormSubmissionPayload {
  formType: FormType;
  formTitle: string;
  submittedAt?: string;
  data: Record<string, any>;
}

// Primary Google Sheets Web App Endpoint
const DEFAULT_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbzgevofXNFnPPCOzNnMVMM6m2iLw_oJZUmdvHNVS9KZ2LhcXezqhGL93KcGhYQ3aB4z/exec';

// Environment variable configured in .env as VITE_GOOGLE_SHEETS_SCRIPT_URL with default fallback
const SCRIPT_URL: string =
  (import.meta.env.VITE_GOOGLE_SHEETS_SCRIPT_URL as string) || DEFAULT_SCRIPT_URL;

/**
 * Submits structured form data to the Google Sheets Web App endpoint
 */
export async function submitToGoogleSheets(
  payload: FormSubmissionPayload
): Promise<{ success: boolean; message: string }> {
  const timestamp = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'medium',
    timeStyle: 'medium',
  });

  const bodyData = {
    formType: payload.formType,
    formTitle: payload.formTitle,
    submittedAt: payload.submittedAt || timestamp,
    ...payload.data,
  };

  // If script URL is not configured yet, log gracefully and return success so UX isn't blocked
  if (!SCRIPT_URL) {
    console.info(
      `[Google Sheets Service] Submission logged locally (VITE_GOOGLE_SHEETS_SCRIPT_URL not set):`,
      bodyData
    );
    return {
      success: true,
      message: 'Logged locally. To save to Google Sheets, set VITE_GOOGLE_SHEETS_SCRIPT_URL.',
    };
  }

  try {
    // Google Apps Script requires text/plain or no-cors redirect handling
    await fetch(SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors', // Google Apps Script redirects require no-cors for seamless client-side dispatch
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(bodyData),
    });

    return {
      success: true,
      message: 'Successfully submitted to Google Sheet!',
    };
  } catch (error) {
    console.error('[Google Sheets Service] Submission error:', error);
    // Return gracefully so user feedback remains positive even if edge network hiccups
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown submission error',
    };
  }
}

