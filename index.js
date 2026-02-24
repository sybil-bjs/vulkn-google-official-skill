const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');

/**
 * Core Google Auth Provider
 * Returns an authorized client for any Google API.
 */
function getGoogleAuth(scopes = ['https://www.googleapis.com/auth/cloud-platform']) {
    const keyPath = path.join(process.env.HOME, '.config/gog/vulkn-service-account.json');
    if (!fs.existsSync(keyPath)) {
        throw new Error(`Missing service account key at ${keyPath}`);
    }
    const keyFile = JSON.parse(fs.readFileSync(keyPath, 'utf8'));
    return new google.auth.JWT({
        email: keyFile.client_email,
        key: keyFile.private_key,
        scopes: scopes
    });
}

module.exports = { google, getGoogleAuth };
