"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Artwork } from "@/lib/data";
import { useEffect } from "react";
import { Sparkles } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
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
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  });

  useEffect(() => {
    if (selectedArtwork) {
      setValue("referenceArtwork", `Inspired by "${selectedArtwork.title}" (${selectedArtwork.medium})`);
    }
  }, [selectedArtwork, setValue]);

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log("Inquiry submitted:", data);
    alert("Thank you! Your commission inquiry has been logged (Draft Mode). Saanvi will review it shortly.");
  };

  return (
    <section id="contact" className="py-32 bg-background">
      <div className="container mx-auto px-6 max-w-5xl flex flex-col md:flex-row gap-16">
        <div className="md:w-5/12">
          <h2 className="font-serif text-4xl md:text-5xl text-text mb-6">Commission Me</h2>
          <p className="font-sans text-muted mb-8 leading-relaxed text-lg">
            Have an idea for a custom piece? Simply describe what you are looking for. There are no rigid templates—let's create something unique together.
          </p>

          {selectedArtwork && (
            <div className="p-4 bg-primary/10 border border-primary/30 rounded-sm mb-6 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div className="font-sans text-xs text-text">
                <span className="font-medium text-primary block mb-0.5">Referencing Selected Work:</span>
                "{selectedArtwork.title}" — {selectedArtwork.medium}
              </div>
            </div>
          )}

          <div className="p-8 bg-surface border border-border">
            <h4 className="font-serif text-xl mb-3">How Commissions Work</h4>
            <ul className="font-sans text-sm text-muted space-y-3">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">1.</span>
                <span>Share your vision, preferences, and any optional budget or timeline.</span>
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

        <div className="md:w-7/12">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 font-sans">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-wider text-text mb-2 font-medium">Your Name *</label>
                <input 
                  {...register("name")} 
                  className="w-full bg-surface border border-border p-4 text-sm focus:outline-none focus:border-primary transition-colors"
                  placeholder="Jane Doe"
                />
                {errors.name && <span className="text-red-500 text-xs mt-1 block">{errors.name.message}</span>}
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-text mb-2 font-medium">Email Address *</label>
                <input 
                  {...register("email")} 
                  className="w-full bg-surface border border-border p-4 text-sm focus:outline-none focus:border-primary transition-colors"
                  placeholder="jane@example.com"
                />
                {errors.email && <span className="text-red-500 text-xs mt-1 block">{errors.email.message}</span>}
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-text mb-2 font-medium">What would you like commissioned? *</label>
              <textarea 
                {...register("idea")} 
                rows={5}
                className="w-full bg-surface border border-border p-4 text-sm focus:outline-none focus:border-primary transition-colors resize-none"
                placeholder="Tell me about your idea, character, mood, color preferences, or story..."
              />
              {errors.idea && <span className="text-red-500 text-xs mt-1 block">{errors.idea.message}</span>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-wider text-text mb-2 font-medium">Target Budget (Optional)</label>
                <input 
                  {...register("budget")} 
                  className="w-full bg-surface border border-border p-4 text-sm focus:outline-none focus:border-primary transition-colors"
                  placeholder="e.g. $200 - $400"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-text mb-2 font-medium">Expected Timeline (Optional)</label>
                <input 
                  {...register("deadline")} 
                  className="w-full bg-surface border border-border p-4 text-sm focus:outline-none focus:border-primary transition-colors"
                  placeholder="e.g. Next month / Flexible"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-text mb-2 font-medium">Inspired Artwork or Reference Links</label>
              <input 
                {...register("referenceArtwork")} 
                className="w-full bg-surface border border-border p-4 text-sm focus:outline-none focus:border-primary transition-colors"
                placeholder="Link to reference images, Pinterest board, or gallery piece..."
              />
            </div>

            <p className="text-xs text-muted/80 font-sans text-left pt-1">
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
              className="w-full py-5 bg-primary text-background font-sans uppercase tracking-widest text-sm font-medium hover:bg-primary/90 transition-colors duration-300 mt-2 shadow-md"
            >
              Send Commission Inquiry
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
