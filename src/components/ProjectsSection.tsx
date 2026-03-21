import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "Meridian",
    description: "A real-time analytics dashboard for SaaS teams. Built with React, D3, and WebSockets.",
    tags: ["React", "D3.js", "WebSockets"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
  },
  {
    title: "Duskfall",
    description: "A generative art platform where users create and mint evolving digital artworks.",
    tags: ["Three.js", "Solidity", "GLSL"],
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
  },
  {
    title: "Voxel",
    description: "A collaborative design tool for remote teams with real-time cursor sharing.",
    tags: ["TypeScript", "Figma API", "CRDTs"],
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80",
  },
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-primary mb-4">Projects</p>
          <h2 className="text-4xl sm:text-5xl">Selected work</h2>
        </motion.div>

        <div className="space-y-24">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="group grid md:grid-cols-2 gap-8 items-center"
            >
              <div className={`${i % 2 === 1 ? "md:order-2" : ""}`}>
                <div className="overflow-hidden rounded-xl border border-border">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              </div>

              <div className={`${i % 2 === 1 ? "md:order-1" : ""} space-y-4`}>
                <h3 className="text-3xl sm:text-4xl flex items-center gap-3 group-hover:text-primary transition-colors cursor-pointer">
                  {project.title}
                  <ArrowUpRight className="w-6 h-6 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                </h3>
                <p className="text-muted-foreground leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-xs tracking-wider uppercase text-muted-foreground border border-border rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
