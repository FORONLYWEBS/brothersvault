import { motion } from "framer-motion";
import { Mail, Github, Linkedin } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="py-32 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-sm uppercase tracking-[0.3em] text-primary mb-4">Contact</p>
          <h2 className="text-4xl sm:text-6xl mb-6">
            Let's build something{" "}
            <span className="italic text-gradient">together</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto mb-12">
            Have a project in mind or just want to say hello? I'd love to hear from you.
          </p>

          <a
            href="mailto:hello@example.com"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors text-sm tracking-wide uppercase"
          >
            <Mail className="w-4 h-4" />
            Get in touch
          </a>

          <div className="flex items-center justify-center gap-6 mt-12">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
