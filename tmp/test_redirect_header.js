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

async function testWithHeaders(headers) {
  const payload = {
    token: appsScriptToken,
    name: "Header Test",
    email: "headertest@example.com",
    preferredContactMethod: "Email",
    customPlatform: "",
    contactHandle: "",
    idea: "Testing header behavior on Google Apps Script redirect",
    deadline: "",
    referenceArtwork: ""
  };

  const res = await fetch(appsScriptUrl, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
    redirect: "follow"
  });

  const text = await res.text();
  console.log("Headers:", JSON.stringify(headers));
  console.log("Response Status:", res.status);
  console.log("Response OK:", res.ok);
  console.log("Response URL:", res.url);
  console.log("Response text snippet:", text.substring(0, 150));
  console.log("---");
}

async function run() {
  console.log("1. Testing with Content-Type: application/json...");
  await testWithHeaders({ "Content-Type": "application/json" });

  console.log("2. Testing with Content-Type: text/plain;charset=utf-8...");
  await testWithHeaders({ "Content-Type": "text/plain;charset=utf-8" });
}

run();
