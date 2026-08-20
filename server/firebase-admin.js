// Firebase Admin SDK initialization for the Flight Counter project.
//
// Credentials are never stored in this repository (see AGENTS.md rule 8).
// The service account is resolved at runtime, in this order:
//
//   1. FIREBASE_SERVICE_ACCOUNT           — the service account JSON, raw or base64
//   2. FIREBASE_SERVICE_ACCOUNT_PATH      — path to a service account JSON file
//   3. GOOGLE_APPLICATION_CREDENTIALS     — path to a service account JSON file
//   4. Application Default Credentials    — gcloud / Cloud Run / Cloud Functions
//
// Usage:
//   const { initializeFirebaseAdmin } = require('./server/firebase-admin');
//   const app = initializeFirebaseAdmin();

'use strict';

const fs = require('fs');
const admin = require('firebase-admin');

const PROJECT_ID = process.env.FIREBASE_PROJECT_ID || 'ord-pr-flight-counter';

const REQUIRED_KEYS = ['project_id', 'client_email', 'private_key'];

// Accepts either raw JSON or the base64 form that CI secrets often carry.
function parseServiceAccountJson(value, source) {
  const trimmed = value.trim();
  const decoded = trimmed.startsWith('{')
    ? trimmed
    : Buffer.from(trimmed, 'base64').toString('utf8');

  let parsed;
  try {
    parsed = JSON.parse(decoded);
  } catch (error) {
    throw new Error(source + ' does not contain valid service account JSON: ' + error.message);
  }

  const missing = REQUIRED_KEYS.filter((key) => !parsed[key]);
  if (missing.length > 0) {
    throw new Error(source + ' is missing service account fields: ' + missing.join(', '));
  }

  return parsed;
}

function readServiceAccountFile(filePath, source) {
  if (!fs.existsSync(filePath)) {
    throw new Error(source + ' points to a missing file: ' + filePath);
  }
  return parseServiceAccountJson(fs.readFileSync(filePath, 'utf8'), source);
}

// Returns { credential, source } without ever logging or returning secret material.
function resolveCredential() {
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    const serviceAccount = parseServiceAccountJson(
      process.env.FIREBASE_SERVICE_ACCOUNT,
      'FIREBASE_SERVICE_ACCOUNT'
    );
    return {
      credential: admin.credential.cert(serviceAccount),
      source: 'FIREBASE_SERVICE_ACCOUNT'
    };
  }

  const filePathVar = process.env.FIREBASE_SERVICE_ACCOUNT_PATH
    ? 'FIREBASE_SERVICE_ACCOUNT_PATH'
    : process.env.GOOGLE_APPLICATION_CREDENTIALS
      ? 'GOOGLE_APPLICATION_CREDENTIALS'
      : null;

  if (filePathVar) {
    const serviceAccount = readServiceAccountFile(process.env[filePathVar], filePathVar);
    return {
      credential: admin.credential.cert(serviceAccount),
      source: filePathVar
    };
  }

  return {
    credential: admin.credential.applicationDefault(),
    source: 'application default credentials'
  };
}

// Idempotent: repeated calls return the already initialized app.
function initializeFirebaseAdmin(options) {
  const settings = options || {};

  if (admin.apps.length > 0) {
    return admin.app();
  }

  const resolved = resolveCredential();

  return admin.initializeApp({
    credential: resolved.credential,
    projectId: settings.projectId || PROJECT_ID
  });
}

// Reports which credential source is configured, without exposing its contents.
function describeCredentialSource() {
  try {
    return resolveCredential().source;
  } catch (error) {
    return 'unavailable (' + error.message + ')';
  }
}

module.exports = {
  admin,
  PROJECT_ID,
  initializeFirebaseAdmin,
  describeCredentialSource
};

if (require.main === module) {
  process.stdout.write(
    'Firebase project: ' + PROJECT_ID + '\n' +
      'Credential source: ' + describeCredentialSource() + '\n'
  );
}
