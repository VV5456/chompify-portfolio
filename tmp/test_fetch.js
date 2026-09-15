const fs = require('fs');

const envLocal = fs.readFileSync('.env.local', 'utf8');
let appsScriptUrl = '';
let appsScriptToken = '';

envLocal.split('\n').forEach(line => {
  if (line.startsWith('GOOGLE_APPS_SCRIPT_URL=')) {
    appsScriptUrl = line.substring('GOOGLE_APPS_SCRIPT_URL='.length).trim();
  }
  if (line.startsWith('GOOGLE_APPS_SCRIPT_TOKEN=')) {
    appsScriptToken = line.substring('GOOGLE_APPS_SCRIPT_TOKEN='.length).trim();
  }
});

async function testFetch() {
  const payload = {
    token: appsScriptToken,
    name: "Test Diagnostic",
    email: "test@example.com",
    preferredContactMethod: "Email",
    customPlatform: "",
    contactHandle: "",
    idea: "Diagnostic test inquiry to verify Google Apps Script response format",
    deadline: "",
    referenceArtwork: ""
  };

  const res = await fetch(appsScriptUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload),
    redirect: "follow"
  });

  const text = await res.text();

  const details = {
    status: res.status,
    statusText: res.statusText,
    ok: res.ok,
    redirected: res.redirected,
    finalUrlHost: new URL(res.url).host,
    contentType: res.headers.get("content-type"),
    rawText: text,
  };

  console.log(JSON.stringify(details, null, 2));
}

testFetch();
