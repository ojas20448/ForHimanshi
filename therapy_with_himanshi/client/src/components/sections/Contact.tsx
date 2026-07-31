import { Button } from "@/components/ui/button";
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
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, Instagram, MapPin, Loader2 } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^\+?[0-9\s\-]{10,15}$/, "Please enter a valid phone number"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        toast({
          title: "Message Sent",
          description:
            "Thank you for reaching out. I will get back to you soon.",
        });
        form.reset();
      } else {
        toast({
          title: "Error",
          description: "Failed to send message. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="contact" className="py-16 md:py-28 bg-secondary/30 relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute -top-40 -left-40 w-80 sm:w-96 h-80 sm:h-96 bg-[hsl(var(--accent-pink))]/40 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] sm:w-[500px] h-[400px] sm:h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-20">
          <motion.div
            className="space-y-6 sm:space-y-8"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <span className="text-primary font-semibold tracking-wider uppercase text-xs sm:text-sm mb-3 block">Get in Touch</span>
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 sm:mb-6">
                Let's start a conversation.
              </h2>
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed text-balance">
                Reaching out allows us to connect and see how I can support you. Whether you have questions about the process or are ready to book, I'm here.
              </p>
            </div>

            <div className="space-y-4 sm:space-y-5">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/70 backdrop-blur-sm hover:bg-white transition-all shadow-xs border border-transparent hover:border-primary/10">
                <div className="w-11 h-11 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Mail size={20} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email</p>
                  <a href="mailto:manzartherapy@gmail.com" className="text-base sm:text-lg font-medium text-foreground hover:text-primary transition-colors truncate block">
                    manzartherapy@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/70 backdrop-blur-sm hover:bg-white transition-all shadow-xs border border-transparent hover:border-primary/10">
                <div className="w-11 h-11 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Instagram size={20} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Instagram</p>
                  <a href="https://instagram.com/manzartherapy" target="_blank" rel="noreferrer" className="text-base sm:text-lg font-medium text-foreground hover:text-primary transition-colors truncate block">
                    @manzartherapy
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/70 backdrop-blur-sm hover:bg-white transition-all shadow-xs border border-transparent hover:border-primary/10">
                <div className="w-11 h-11 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <MapPin size={20} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Location</p>
                  <p className="text-base sm:text-lg font-medium text-foreground">
                    Online & In-person (Delhi/Noida)
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/70 backdrop-blur-sm hover:bg-white transition-all shadow-xs border border-transparent hover:border-primary/10">
                <div className="w-11 h-11 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <WhatsAppIcon size={20} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">WhatsApp</p>
                  <a href="https://wa.me/919599529780" target="_blank" rel="noreferrer" className="text-base sm:text-lg font-medium text-foreground hover:text-primary transition-colors truncate block">
                    +91 95995 29780
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/85 backdrop-blur-md p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-[2rem] shadow-xl border border-white/60"
          >
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground/80 font-medium">Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your name"
                          {...field}
                          className="h-12 rounded-xl bg-white/60 border-gray-200 focus:border-primary/50 focus:bg-white transition-all px-4 text-base"
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
                      <FormLabel className="text-foreground/80 font-medium">Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="your@email.com"
                          {...field}
                          className="h-12 rounded-xl bg-white/60 border-gray-200 focus:border-primary/50 focus:bg-white transition-all px-4 text-base"
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
                      <FormLabel className="text-foreground/80 font-medium">Phone</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="+91 98765 43210"
                          {...field}
                          className="h-12 rounded-xl bg-white/60 border-gray-200 focus:border-primary/50 focus:bg-white transition-all px-4 text-base"
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
                      <FormLabel className="text-foreground/80 font-medium">Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="How can I help you?"
                          {...field}
                          className="min-h-[130px] rounded-xl bg-white/60 border-gray-200 focus:border-primary/50 focus:bg-white transition-all p-4 resize-none text-base"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full rounded-xl h-12 text-base font-medium shadow-lg hover:shadow-xl transition-all min-h-[44px]"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin mr-2 h-5 w-5" />
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </form>
            </Form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
