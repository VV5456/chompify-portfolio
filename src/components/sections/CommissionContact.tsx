"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Artwork } from "@/lib/data";
import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  preferredContactMethod: z.string().optional(),
  customPlatform: z.string().optional(),
  contactHandle: z.string().optional(),
  idea: z.string().min(10, "Please tell me a little bit about your idea"),
  budget: z.string().optional(),
  deadline: z.string().optional(),
  referenceArtwork: z.string().optional(),
  additionalNotes: z.string().optional(),
});

interface CommissionContactProps {
  selectedArtwork?: Artwork | null;
}

export default function CommissionContact({ selectedArtwork }: CommissionContactProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      preferredContactMethod: "Email",
    }
  });

  const selectedContactMethod = watch("preferredContactMethod") || "Email";

  useEffect(() => {
    if (selectedArtwork) {
      setValue("referenceArtwork", `Inspired by "${selectedArtwork.title}" (${selectedArtwork.medium})`);
    }
  }, [selectedArtwork, setValue]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      const response = await fetch("/api/commission", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          preferredContactMethod: data.preferredContactMethod || "Email",
          customPlatform: data.customPlatform || "",
          contactHandle: data.contactHandle || "",
          idea: data.idea,
          deadline: data.deadline || "",
          referenceArtwork: data.referenceArtwork || "",
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitStatus("success");
        reset({
          name: "",
          email: "",
          preferredContactMethod: "Email",
          customPlatform: "",
          contactHandle: "",
          idea: "",
          deadline: "",
          referenceArtwork: "",
        });
      } else {
        setSubmitStatus("error");
        setErrorMessage(result.error || "Something went wrong while sending your inquiry. Please try again.");
      }
    } catch {
      setSubmitStatus("error");
      setErrorMessage("Something went wrong while sending your inquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-10 md:py-14 bg-background min-h-[calc(100vh-80px)] flex flex-col justify-center">
      <div className="container mx-auto px-6 max-w-5xl flex flex-col md:flex-row gap-10 md:gap-14 items-start">
        <div className="md:w-5/12">
          <h2 className="font-serif text-3xl md:text-4xl text-text mb-4">Commission Me</h2>
          <div className="font-sans text-muted mb-6 leading-relaxed text-sm md:text-base space-y-2.5">
            <p>Every great story deserves unforgettable artwork.</p>
            <p>Whether you're looking for a single illustration or a complete collection of visuals, I'd love to help bring your world to life.</p>
            <p>Let's create something your readers will remember.</p>
          </div>

          {selectedArtwork && (
            <div className="p-3.5 bg-primary/10 border border-primary/30 rounded-sm mb-4 flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <div className="font-sans text-xs text-text">
                <span className="font-medium text-primary block mb-0.5">Referencing Selected Work:</span>
                "{selectedArtwork.title}" — {selectedArtwork.medium}
              </div>
            </div>
          )}

          <div className="p-5 bg-surface border border-border">
            <h4 className="font-serif text-lg mb-2.5">How Commissions Work</h4>
            <ul className="font-sans text-xs md:text-sm text-muted space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">1.</span>
                <span>Share your vision, preferences, and any optional timeline.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">2.</span>
                <span>We discuss concepts and confirm final timeline and pricing.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">3.</span>
                <span>Progress updates and final high-res artwork delivery.</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="md:w-7/12 w-full">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 font-sans">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-text mb-1.5 font-medium">Your Name *</label>
                <input 
                  {...register("name")} 
                  className="w-full bg-surface border border-border p-3 text-sm focus:outline-none focus:border-primary transition-colors"
                  placeholder="Jane Doe"
                />
                {errors.name && <span className="text-red-500 text-xs mt-1 block">{errors.name.message}</span>}
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-text mb-1.5 font-medium">Email Address *</label>
                <input 
                  {...register("email")} 
                  className="w-full bg-surface border border-border p-3 text-sm focus:outline-none focus:border-primary transition-colors"
                  placeholder="jane@example.com"
                />
                {errors.email && <span className="text-red-500 text-xs mt-1 block">{errors.email.message}</span>}
              </div>
            </div>

            {/* Preferred Contact Method & Handle in a 2-Column Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-text mb-1.5 font-medium">
                  Preferred Mode of Contact *
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {["Email", "Threads", "Instagram", "Other"].map((method) => {
                    const isSelected = selectedContactMethod === method;
                    return (
                      <button
                        key={method}
                        type="button"
                        onClick={() => setValue("preferredContactMethod", method)}
                        className={`py-1.5 px-2 text-xs font-sans rounded-xs border transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer text-center ${
                          isSelected
                            ? "bg-primary text-background border-primary font-semibold shadow-xs"
                            : "bg-surface text-text/80 border-border hover:border-primary/60 hover:text-primary"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full transition-colors flex-shrink-0 ${
                            isSelected ? "bg-background" : "bg-primary"
                          }`}
                        />
                        <span className="truncate">{method}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {selectedContactMethod === "Other" ? (
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-text mb-1.5 font-medium truncate">
                      Platform Name *
                    </label>
                    <input 
                      {...register("customPlatform")} 
                      className="w-full bg-surface border border-border p-3 text-sm focus:outline-none focus:border-primary transition-colors"
                      placeholder="e.g. Telegram / Bluesky"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-text mb-1.5 font-medium truncate">
                      Handle *
                    </label>
                    <input 
                      {...register("contactHandle")} 
                      className="w-full bg-surface border border-border p-3 text-sm focus:outline-none focus:border-primary transition-colors"
                      placeholder="e.g. @username"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-xs uppercase tracking-wider text-text mb-1.5 font-medium">
                    {selectedContactMethod === "Email" ? "Handle (Optional)" : "Handle *"}
                  </label>
                  <input 
                    {...register("contactHandle")} 
                    className="w-full bg-surface border border-border p-3 text-sm focus:outline-none focus:border-primary transition-colors"
                    placeholder="e.g. @username"
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-text mb-1.5 font-medium">What would you like commissioned? *</label>
              <textarea 
                {...register("idea")} 
                rows={3}
                className="w-full bg-surface border border-border p-3 text-sm focus:outline-none focus:border-primary transition-colors resize-none"
                placeholder="Tell me about your idea, character, mood, color preferences, or story..."
              />
              {errors.idea && <span className="text-red-500 text-xs mt-1 block">{errors.idea.message}</span>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-text mb-1.5 font-medium">Expected Timeline (Optional)</label>
                <input 
                  {...register("deadline")} 
                  className="w-full bg-surface border border-border p-3 text-sm focus:outline-none focus:border-primary transition-colors"
                  placeholder="e.g. Next month / Flexible"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-text mb-1.5 font-medium">Reference Links</label>
                <input 
                  {...register("referenceArtwork")} 
                  className="w-full bg-surface border border-border p-3 text-sm focus:outline-none focus:border-primary transition-colors"
                  placeholder="Link to reference images, Pinterest..."
                />
              </div>
            </div>

            {submitStatus === "success" && (
              <div className="p-3.5 bg-primary/10 border border-primary/30 text-text font-sans text-xs md:text-sm rounded-xs flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-primary block mb-0.5">Inquiry Sent Successfully!</span>
                  Thank you for your commission request. Saanvi will review your details and respond shortly via your preferred contact method.
                </div>
              </div>
            )}

            {submitStatus === "error" && (
              <div className="p-3.5 bg-red-500/10 border border-red-500/30 text-red-600 font-sans text-xs md:text-sm rounded-xs flex items-center justify-between gap-2">
                <span>{errorMessage}</span>
                <button 
                  type="button" 
                  onClick={() => setSubmitStatus("idle")}
                  className="text-xs underline hover:text-red-800 ml-2 cursor-pointer flex-shrink-0 font-medium"
                >
                  Dismiss
                </button>
              </div>
            )}

            <div className="pt-1 flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-xs text-muted/80 font-sans">
                By submitting this form, you agree to the{" "}
                <a 
                  href="#terms" 
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById("terms");
                    if (el) {
                      const navbarOffset = 80;
                      const elementTop = el.getBoundingClientRect().top + window.scrollY;
                      window.scrollTo({
                        top: elementTop - navbarOffset,
                        behavior: "smooth"
                      });
                    }
                  }}
                  className="text-primary underline hover:text-text font-medium transition-colors"
                >
                  Terms of Service
                </a>.
              </p>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3.5 bg-primary text-background font-sans uppercase tracking-widest text-xs font-medium hover:bg-primary/90 transition-colors duration-300 shadow-md flex-shrink-0 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-background border-t-transparent rounded-full animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  "Send Commission Inquiry"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
