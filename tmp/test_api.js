async function testApi() {
  const payload = {
    name: "Jane Tester",
    email: "jane.test@example.com",
    preferredContactMethod: "Email",
    customPlatform: "",
    contactHandle: "",
    idea: "Testing localhost commission submission route to observe response",
    deadline: "Next week",
    referenceArtwork: ""
  };

  try {
    const res = await fetch("http://localhost:3000/api/commission", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    console.log("Next.js API Status:", res.status);
    console.log("Next.js API OK:", res.ok);
    const json = await res.json();
    console.log("Next.js API JSON Response:", json);
  } catch (err) {
    console.error("API test error:", err);
  }
}

testApi();
