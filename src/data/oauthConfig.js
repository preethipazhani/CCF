// =============================================================================
// OAuth Configuration — CyberQuest
// =============================================================================
// To enable Google or Microsoft sign-in:
//
// 1. Create a `.env` file in the project root.
// 2. Add the following environment variables:
//
//    VITE_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
//    VITE_GOOGLE_REDIRECT_URI=http://localhost:5173/auth/google/callback
//
//    VITE_MICROSOFT_CLIENT_ID=your-microsoft-application-client-id
//    VITE_MICROSOFT_REDIRECT_URI=http://localhost:5173/auth/microsoft/callback
//    VITE_MICROSOFT_TENANT_ID=common
//
// 3. Restart the dev server after adding the variables.
// =============================================================================

export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';
export const GOOGLE_REDIRECT_URI = import.meta.env.VITE_GOOGLE_REDIRECT_URI || '';

export const MICROSOFT_CLIENT_ID = import.meta.env.VITE_MICROSOFT_CLIENT_ID || '';
export const MICROSOFT_REDIRECT_URI = import.meta.env.VITE_MICROSOFT_REDIRECT_URI || '';
export const MICROSOFT_TENANT_ID = import.meta.env.VITE_MICROSOFT_TENANT_ID || 'common';

/** Returns true if Google OAuth credentials have been configured. */
export const isGoogleConfigured = () =>
  Boolean(GOOGLE_CLIENT_ID && GOOGLE_REDIRECT_URI);

/** Returns true if Microsoft OAuth credentials have been configured. */
export const isMicrosoftConfigured = () =>
  Boolean(MICROSOFT_CLIENT_ID && MICROSOFT_REDIRECT_URI);

/**
 * Build the Google OAuth 2.0 authorization URL.
 * Opens the Google consent screen for the user.
 */
export const getGoogleAuthUrl = () => {
  if (!isGoogleConfigured()) return null;
  const params = new URLSearchParams({
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: GOOGLE_REDIRECT_URI,
    response_type: 'code',
    scope: 'openid email profile',
    access_type: 'offline',
    prompt: 'consent',
  });
  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
};

/**
 * Build the Microsoft OAuth 2.0 authorization URL.
 * Opens the Microsoft consent screen for the user.
 */
export const getMicrosoftAuthUrl = () => {
  if (!isMicrosoftConfigured()) return null;
  const params = new URLSearchParams({
    client_id: MICROSOFT_CLIENT_ID,
    redirect_uri: MICROSOFT_REDIRECT_URI,
    response_type: 'code',
    scope: 'openid email profile User.Read',
    response_mode: 'query',
  });
  return `https://login.microsoftonline.com/${MICROSOFT_TENANT_ID}/oauth2/v2.0/authorize?${params.toString()}`;
};
