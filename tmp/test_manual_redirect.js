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

async function testManualRedirect() {
  const payload = {
    token: appsScriptToken,
    name: "Manual Redirect Test",
    email: "manual@example.com",
    preferredContactMethod: "Email",
    customPlatform: "",
    contactHandle: "",
    idea: "Testing manual redirect handling for Google Apps Script",
    deadline: "",
    referenceArtwork: ""
  };

  console.log("Step 1: Sending POST with redirect: 'manual'...");
  const postRes = await fetch(appsScriptUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload),
    redirect: "manual"
  });

  console.log("POST Status:", postRes.status);
  console.log("POST Location Header:", postRes.headers.get("location"));

  if (postRes.status >= 300 && postRes.status < 400 && postRes.headers.get("location")) {
    const redirectUrl = postRes.headers.get("location");
    console.log("Step 2: Fetching redirect URL via GET...");
    const getRes = await fetch(redirectUrl, {
      method: "GET"
    });
    console.log("GET Status:", getRes.status);
    console.log("GET Content-Type:", getRes.headers.get("content-type"));
    const text = await getRes.text();
    console.log("GET Body:", text);
  }
}

testManualRedirect();
