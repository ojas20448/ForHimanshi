import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import {
  Mail,
  Instagram,
  MapPin,
  Loader2,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

const formSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(100),
  email: z.string().trim().email("Please enter a valid email address."),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9\s-]{10,15}$/, "Please enter a valid phone number."),
  message: z
    .string()
    .trim()
    .min(10, "Please add a little more detail (at least 10 characters).")
    .max(3000, "Please keep your message under 3,000 characters."),
});
export function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", phone: "", message: "" },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
        signal: AbortSignal.timeout(20000),
      });
      if (
        !response.ok ||
        !response.headers.get("content-type")?.includes("application/json")
      )
        throw new Error("Message could not be sent");
      await response.json();
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }
  return (
    <section
      id="contact"
      className="section-space contact-section"
      aria-labelledby="contact-title"
    >
      <div className="site-container contact-layout">
        <div className="contact-copy">
          <h2 id="contact-title">
            Let’s start with
            <br />
            <em>a conversation.</em>
          </h2>
          <p>
            Reaching out can feel like a big step. Whether you have a question
            about therapy or you’re ready to begin, there’s room for you here.
          </p>
          <div className="contact-links">
            <a href="mailto:manzartherapy@gmail.com" className="contact-link">
              <Mail size={19} aria-hidden="true" />
              manzartherapy@gmail.com
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
            <a
              href="https://wa.me/919599529780"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
            >
              <WhatsAppIcon size={20} />
              +91 95995 29780
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
            <a
              href="https://instagram.com/manzartherapy"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
            >
              <Instagram size={19} aria-hidden="true" />
              @manzartherapy
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
            <p className="contact-link">
              <MapPin size={19} aria-hidden="true" />
              Online & in person · East Delhi
            </p>
          </div>
        </div>
        <div className="contact-form">
          <h3>A note to Himanshi.</h3>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              noValidate
              aria-label="Contact Himanshi"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your name</FormLabel>
                    <FormControl>
                      <Input
                        autoComplete="name"
                        placeholder="What should I call you?"
                        maxLength={100}
                        required
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email address</FormLabel>
                    <FormControl>
                      <Input
                        autoComplete="email"
                        type="email"
                        placeholder="you@example.com"
                        required
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone number</FormLabel>
                    <FormControl>
                      <Input
                        autoComplete="tel"
                        type="tel"
                        placeholder="+91"
                        required
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What would you like to ask?</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="A brief note is enough. Share only what feels comfortable."
                        maxLength={3000}
                        required
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <p className="form-note">
                These details will be used to respond to your enquiry. Please
                avoid sharing sensitive personal or clinical information in this
                form.
              </p>
              <button
                type="submit"
                className="action-button"
                disabled={status === "sending"}
              >
                {status === "sending" ? (
                  <>
                    <Loader2
                      size={17}
                      className="animate-spin"
                      aria-hidden="true"
                    />
                    Sending your note…
                  </>
                ) : (
                  <>
                    Send your note <ArrowUpRight size={18} aria-hidden="true" />
                  </>
                )}
              </button>
              <div aria-live="polite" aria-atomic="true">
                {status === "sent" && (
                  <p className="form-result">
                    <CheckCircle2
                      size={17}
                      className="inline mr-2"
                      aria-hidden="true"
                    />
                    Thank you for reaching out. Your note has been received.
                  </p>
                )}
                {status === "error" && (
                  <p role="alert" className="form-result form-error">
                    Your note couldn’t be sent. Your message is still here, so
                    you can try again or{" "}
                    <a href="mailto:manzartherapy@gmail.com">
                      email Himanshi directly
                    </a>
                    .
                  </p>
                )}
              </div>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}
