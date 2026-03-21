import { motion } from "framer-motion";

const AboutSection = () => {
  const skills = ["React", "TypeScript", "Node.js", "Figma", "Tailwind CSS", "PostgreSQL", "Python", "AWS"];

  return (
    <section id="about" className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="grid md:grid-cols-2 gap-16 items-start"
        >
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-primary mb-4">About</p>
            <h2 className="text-4xl sm:text-5xl mb-6">
              Building at the intersection of{" "}
              <span className="italic text-gradient">art & code</span>
            </h2>
          </div>

          <div className="space-y-6">
            <p className="text-muted-foreground leading-relaxed">
              I'm a developer and designer who believes great software should feel effortless. 
              With a background spanning frontend engineering and UI design, I bring ideas to life 
              through thoughtful interfaces and robust architecture.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              When I'm not coding, you'll find me exploring photography, tinkering with creative 
              tools, or diving deep into the latest tech.
            </p>

            <div className="flex flex-wrap gap-2 pt-4">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 text-xs tracking-wider uppercase rounded-full border border-border bg-secondary text-secondary-foreground"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
