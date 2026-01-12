import { motion } from "framer-motion";
import { portfolioData } from "@/data";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, Mail, MapPin, CheckCircle, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { personal } = portfolioData;
  const ref = useRef(null);
  const formRef = useRef<HTMLFormElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create FormData for Web3Forms submission
      const formDataToSend = new FormData();
      formDataToSend.append("access_key", "bcc2ce6e-f558-44b1-8684-4a9df70315d4");
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("message", formData.message);
      formDataToSend.append("subject", `New message from ${formData.name}`);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error("Failed to send message");
      }

      setIsSuccess(true);
      setFormData({ name: "", email: "", message: "" });

      toast({
        title: "Message sent successfully! 🎉",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });

      // Reset success state after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "Failed to send message",
        description: "Please try again or email me directly at " + personal.email,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Get in <span className="text-gradient">Touch</span>
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Have a project in mind? Let's create something amazing together.
          </p>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <div className="glass rounded-2xl p-8 hover:glow transition-all duration-300 border border-border/50 hover:border-primary/50">
                <h3 className="text-2xl font-bold mb-6">Let's Connect</h3>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  I'm always open to discussing new projects, creative ideas, or
                  opportunities to be part of your vision. Reach out and let's make
                  it happen!
                </p>

                <div className="space-y-4">
                  <motion.div
                    className="flex items-center gap-3 p-4 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 hover:from-primary/20 hover:to-secondary/20 transition-all"
                    whileHover={{ x: 5 }}
                  >
                    <div className="w-10 h-10 rounded-full glass flex items-center justify-center flex-shrink-0">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Email</div>
                      <a
                        href={`mailto:${personal.email}`}
                        className="text-foreground font-semibold hover:text-primary transition-colors"
                      >
                        {personal.email}
                      </a>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-center gap-3 p-4 rounded-lg bg-gradient-to-r from-green-500/10 to-emerald-500/10 hover:from-green-500/20 hover:to-emerald-500/20 transition-all"
                    whileHover={{ x: 5 }}
                  >
                    <div className="w-10 h-10 rounded-full glass flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">WhatsApp</div>
                      <a
                        href={`https://wa.me/${personal.phone.replace(/\s+/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground font-semibold hover:text-green-500 transition-colors"
                      >
                        {personal.phone}
                      </a>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-center gap-3 p-4 rounded-lg bg-gradient-to-r from-secondary/10 to-primary/10 hover:from-secondary/20 hover:to-primary/20 transition-all"
                    whileHover={{ x: 5 }}
                  >
                    <div className="w-10 h-10 rounded-full glass flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-5 w-5 text-secondary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Location</div>
                      <div className="text-foreground font-semibold">{personal.location}</div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {isSuccess ? (
                <motion.div
                  className="glass rounded-2xl p-8 border border-border/50 h-full flex flex-col items-center justify-center text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: 2 }}
                  >
                    <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground mb-6">
                    Thank you for reaching out. I'll get back to you as soon as possible.
                  </p>
                  <Button
                    onClick={() => setIsSuccess(false)}
                    variant="outline"
                    className="w-full"
                  >
                    Send Another Message
                  </Button>
                </motion.div>
              ) : (
                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  className="glass rounded-2xl p-8 space-y-6 border border-border/50 hover:border-primary/50 transition-all duration-300 h-full flex flex-col"
                >
                  {/* Form Header */}
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
                    transition={{ delay: 0.45 }}
                  >
                    <h3 className="text-2xl font-bold mb-2">Send Me a Message</h3>
                    <p className="text-sm text-muted-foreground">
                     
                    </p>
                  </motion.div>

                  {/* Form Fields */}
                  <div className="flex-grow space-y-6">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                      transition={{ delay: 0.5 }}
                    >
                      <Input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="glass border-primary/30 focus:border-primary bg-background/50"
                        disabled={isSubmitting}
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                      transition={{ delay: 0.55 }}
                    >
                      <Input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="glass border-primary/30 focus:border-primary bg-background/50"
                        disabled={isSubmitting}
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                      transition={{ delay: 0.6 }}
                    >
                      <Textarea
                        name="message"
                        placeholder="Your Message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="glass border-primary/30 focus:border-primary bg-background/50 resize-none"
                        disabled={isSubmitting}
                      />
                    </motion.div>
                  </div>

                  {/* Submit Button */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 0.65 }}
                  >
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg transition-all duration-300 glow"
                      size="lg"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                          Sending...
                        </div>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </motion.div>

                  {/* Form Footer */}
                  <motion.p
                    className="text-xs text-muted-foreground text-center"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    
                  </motion.p>
                </form>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
