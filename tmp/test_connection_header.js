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

async function runTest(i) {
  const payload = {
    token: appsScriptToken,
    name: `Resilience Test ${i}`,
    email: `resilience${i}@example.com`,
    preferredContactMethod: "Email",
    customPlatform: "",
    contactHandle: "",
    idea: `Testing connection stability ${i}`,
    deadline: "",
    referenceArtwork: ""
  };

  const start = Date.now();
  try {
    const res = await fetch(appsScriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Connection": "close"
      },
      body: JSON.stringify(payload),
      redirect: "follow",
      cache: "no-store"
    });

    const elapsed = Date.now() - start;
    const text = await res.text();
    console.log(`Test #${i}: HTTP ${res.status} OK=${res.ok} in ${elapsed}ms. Body: ${text.substring(0, 100)}`);
    return true;
  } catch (err) {
    const elapsed = Date.now() - start;
    console.error(`Test #${i} FAILED in ${elapsed}ms:`, err.message);
    return false;
  }
}

async function main() {
  console.log("Starting resilience test (3 rapid requests)...");
  let passed = 0;
  for (let i = 1; i <= 3; i++) {
    const ok = await runTest(i);
    if (ok) passed++;
  }
  console.log(`Result: ${passed}/3 passed.`);
}

main();
