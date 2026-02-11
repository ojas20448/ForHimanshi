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
import { Mail, Instagram, MapPin } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number is required"),
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
    <section id="contact" className="py-24 bg-secondary/30 relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-white/40 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-24">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <span className="text-primary font-medium tracking-wide uppercase text-sm mb-4 block">Get in Touch</span>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
                Let's start a conversation.
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Reaching out allows us to connect and see how I can support you. Whether you have questions about the process or are ready to book, I'm here.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/60 hover:bg-white transition-colors duration-300 shadow-sm border border-transparent hover:border-border/50">
                <div className="w-12 h-12 rounded-full bg-secondary text-primary flex items-center justify-center shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Email</p>
                  <a href="mailto:himanshi.therapy@gmail.com" className="text-lg font-medium text-foreground hover:text-primary transition-colors">
                    himanshi.therapy@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/60 hover:bg-white transition-colors duration-300 shadow-sm border border-transparent hover:border-border/50">
                <div className="w-12 h-12 rounded-full bg-secondary text-primary flex items-center justify-center shrink-0">
                  <Instagram size={20} />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Instagram</p>
                  <a href="https://instagram.com/therapy.w.himanshi" target="_blank" rel="noreferrer" className="text-lg font-medium text-foreground hover:text-primary transition-colors">
                    @therapy.w.himanshi
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/60 hover:bg-white transition-colors duration-300 shadow-sm border border-transparent hover:border-border/50">
                <div className="w-12 h-12 rounded-full bg-secondary text-primary flex items-center justify-center shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Location</p>
                  <p className="text-lg font-medium text-foreground">
                    Online & In-person (Delhi/Noida)
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/80 backdrop-blur-md p-8 md:p-10 rounded-[2rem] shadow-xl border border-white/50"
          >
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground/80">Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your name"
                          {...field}
                          className="h-12 rounded-xl bg-white/50 border-gray-200 focus:border-primary/50 focus:bg-white transition-all px-4"
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
                      <FormLabel className="text-foreground/80">Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="your@email.com"
                          {...field}
                          className="h-12 rounded-xl bg-white/50 border-gray-200 focus:border-primary/50 focus:bg-white transition-all px-4"
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
                      <FormLabel className="text-foreground/80">Phone</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="+91 98765 43210"
                          {...field}
                          className="h-12 rounded-xl bg-white/50 border-gray-200 focus:border-primary/50 focus:bg-white transition-all px-4"
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
                      <FormLabel className="text-foreground/80">Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="How can I help you?"
                          {...field}
                          className="min-h-[140px] rounded-xl bg-white/50 border-gray-200 focus:border-primary/50 focus:bg-white transition-all p-4 resize-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full rounded-xl h-12 text-base font-medium shadow-lg shadow-primary/20 hover:shadow-xl hover:-translate-y-0.5 transition-all"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
