async function runSubmission(id) {
  const payload = {
    name: `Verification User ${id}`,
    email: `verification${id}@chompify.test`,
    preferredContactMethod: "Email",
    customPlatform: "",
    contactHandle: "",
    idea: `Verification inquiry ${id} for Google Apps Script integration fix`,
    deadline: "2 weeks",
    referenceArtwork: ""
  };

  console.log(`Sending Submission #${id}...`);
  const start = Date.now();
  const res = await fetch("http://localhost:3001/api/commission", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });
  const elapsed = Date.now() - start;

  console.log(`Submission #${id} Status:`, res.status);
  console.log(`Submission #${id} OK:`, res.ok);
  const json = await res.json();
  console.log(`Submission #${id} JSON Response:`, JSON.stringify(json));
  console.log(`Submission #${id} Time: ${elapsed}ms\n`);
  return json;
}

async function testBoth() {
  console.log("=== Testing Submission #1 ===");
  const res1 = await runSubmission(1);
  
  console.log("=== Testing Submission #2 ===");
  const res2 = await runSubmission(2);

  if (res1.success && res2.success) {
    console.log("SUCCESS: Both commission submissions succeeded with { success: true }!");
  } else {
    console.error("FAILURE: One or both submissions failed.");
  }
}

testBoth();
