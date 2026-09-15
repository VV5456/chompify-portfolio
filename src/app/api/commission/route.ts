import { NextResponse } from "next/server";
import { z } from "zod";

const commissionSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Name is required (at least 2 characters)")
      .max(100, "Name must be 100 characters or less"),
    email: z
      .string()
      .trim()
      .email("Valid email address is required")
      .max(150, "Email must be 150 characters or less"),
    preferredContactMethod: z
      .string()
      .trim()
      .min(1, "Preferred contact method is required")
      .max(50, "Preferred contact method is invalid"),
    customPlatform: z.string().trim().max(100, "Platform name is too long").optional().default(""),
    contactHandle: z.string().trim().max(100, "Handle is too long").optional().default(""),
    idea: z
      .string()
      .trim()
      .min(10, "Please tell me a little bit about your idea (at least 10 characters)")
      .max(5000, "Idea description is too long (max 5000 characters)"),
    deadline: z.string().trim().max(200, "Timeline description is too long").optional().default(""),
    referenceArtwork: z.string().trim().max(1000, "Reference links are too long").optional().default(""),
  })
  .superRefine((data, ctx) => {
    const method = data.preferredContactMethod;

    if (method === "Other") {
      if (!data.customPlatform || data.customPlatform.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Platform name is required when 'Other' is selected",
          path: ["customPlatform"],
        });
      }
      if (!data.contactHandle || data.contactHandle.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Handle / username is required when 'Other' is selected",
          path: ["contactHandle"],
        });
      }
    } else if (method === "Threads" || method === "Instagram") {
      if (!data.contactHandle || data.contactHandle.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Handle is required for ${method}`,
          path: ["contactHandle"],
        });
      }
    }
  });

export async function POST(request: Request) {
  try {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON request payload." },
        { status: 400 }
      );
    }

    const validationResult = commissionSchema.safeParse(body);
    if (!validationResult.success) {
      const firstError = validationResult.error.issues[0]?.message || "Validation failed.";
      return NextResponse.json(
        { success: false, error: firstError },
        { status: 400 }
      );
    }

    const validatedData = validationResult.data;

    const appsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;
    const appsScriptToken = process.env.GOOGLE_APPS_SCRIPT_TOKEN;

    if (!appsScriptUrl || !appsScriptToken) {
      console.error("[Commission API Error] Missing server environment variables.");
      return NextResponse.json(
        { success: false, error: "Server configuration issue. Please contact support or try again later." },
        { status: 500 }
      );
    }

    const payload = {
      token: appsScriptToken,
      name: validatedData.name,
      email: validatedData.email,
      preferredContactMethod: validatedData.preferredContactMethod,
      customPlatform: validatedData.customPlatform,
      contactHandle: validatedData.contactHandle,
      idea: validatedData.idea,
      deadline: validatedData.deadline,
      referenceArtwork: validatedData.referenceArtwork,
    };

    let appsScriptResponse: Response;
    try {
      appsScriptResponse = await fetch(appsScriptUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        redirect: "follow",
        cache: "no-store",
      });
    } catch (fetchError) {
      console.error("[Commission API Error] Network request to Google Apps Script failed:", fetchError);
      return NextResponse.json(
        { success: false, error: "Failed to submit inquiry due to a network communication error." },
        { status: 500 }
      );
    }

    // Extract safe non-sensitive diagnostic parameters for logging
    let finalHost = "unknown";
    try {
      if (appsScriptResponse.url) {
        finalHost = new URL(appsScriptResponse.url).host;
      }
    } catch {
      finalHost = "unknown";
    }

    console.log("[Commission API Diagnostic]", {
      status: appsScriptResponse.status,
      statusText: appsScriptResponse.statusText,
      ok: appsScriptResponse.ok,
      redirected: appsScriptResponse.redirected,
      finalHost,
      contentType: appsScriptResponse.headers.get("content-type"),
    });

    let responseText = "";
    try {
      responseText = await appsScriptResponse.text();
    } catch (textErr) {
      console.warn("[Commission API Warning] Could not read response text:", textErr);
    }

    let isJson = false;
    let responseData: Record<string, unknown> = {};
    if (responseText) {
      try {
        responseData = JSON.parse(responseText);
        isJson = true;
      } catch {
        isJson = false;
      }
    }

    // 1. Evaluate structured JSON response if available
    if (isJson) {
      const isExplicitFailure =
        responseData.success === false ||
        responseData.status === "error" ||
        responseData.result === "error";

      if (isExplicitFailure) {
        const errorMsg =
          typeof responseData.error === "string"
            ? responseData.error
            : typeof responseData.message === "string"
            ? responseData.message
            : "Submission failed at Google Apps Script.";

        return NextResponse.json({ success: false, error: errorMsg }, { status: 400 });
      }

      const isExplicitSuccess =
        responseData.success === true ||
        responseData.status === "success" ||
        responseData.result === "success" ||
        responseData.ok === true;

      if (isExplicitSuccess) {
        return NextResponse.json({ success: true });
      }
    }

    // 2. Handle Google Apps Script ContentService redirect outcome:
    // When Google Apps Script writes to Sheet, it responds with a redirect to script.googleusercontent.com.
    const isGoogleUserContent = finalHost.includes("googleusercontent.com");
    const isScriptDomain = finalHost.includes("script.google.com");

    if (appsScriptResponse.ok || appsScriptResponse.redirected || isGoogleUserContent) {
      // Check for explicit error text from Google Apps Script engine
      const hasEngineError =
        responseText.includes("Exception:") ||
        responseText.includes("Script error") ||
        responseText.includes("Google Drive - Error") ||
        responseText.includes("Unauthorized");

      if (hasEngineError) {
        console.error("[Commission API Error] Engine error detected in response text.");
        return NextResponse.json(
          { success: false, error: "External service error. Please try again later." },
          { status: 502 }
        );
      }

      // Successful write to Google Sheet
      return NextResponse.json({ success: true });
    }

    // 3. Genuine non-2xx failure directly from script.google.com without redirect
    if (!appsScriptResponse.ok && isScriptDomain) {
      console.error(
        `[Commission API Error] Google Apps Script returned status ${appsScriptResponse.status}. Body preview:`,
        responseText.substring(0, 300)
      );

      return NextResponse.json(
        { success: false, error: "External service error. Please try again later." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Commission API Internal Error]:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected server error occurred." },
      { status: 500 }
    );
  }
}
