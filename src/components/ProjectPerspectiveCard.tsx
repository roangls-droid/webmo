import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

type Props = {
  title: string;
  category: string;
  href: string;
  previewImage: string;
  description: string;
  delay?: number;
};

export function ProjectPerspectiveCard({
  title,
  category,
  href,
  previewImage,
  description,
  delay = 0,
}: Props) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.55, ease: "easeOut", delay }}
      className="group block"
    >
      <div
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm transition-all duration-500 ease-out md:[transform:perspective(1200px)_rotateX(10deg)_rotateY(-14deg)_rotateZ(3deg)] md:group-hover:[transform:perspective(1200px)_rotateX(5deg)_rotateY(-7deg)_rotateZ(1deg)] shadow-[20px_20px_60px_-10px_rgba(0,0,0,0.5),-20px_-20px_60px_rgba(255,255,255,0.05)] md:group-hover:shadow-[10px_12px_36px_-8px_rgba(0,0,0,0.4),-8px_-8px_26px_rgba(255,255,255,0.04)]"
      >
        <div className="relative overflow-hidden rounded-2xl">
          <img
            src={previewImage}
            alt={`Apercu du projet ${title}`}
            className="h-56 w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03] sm:h-64"
            loading="lazy"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0d1322]/80 via-[#0d1322]/25 to-transparent" />
        </div>

        <div className="absolute inset-x-6 bottom-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-300/95">{category}</p>
          <h3 className="mt-1 text-lg font-semibold text-white">{title}</h3>
          <p className="mt-1 line-clamp-2 text-sm text-white/75">{description}</p>
        </div>

        <div className="absolute bottom-5 right-5 translate-y-1 scale-95 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100">
          <span className="inline-flex items-center gap-1 rounded-xl border border-white/20 bg-[#0f172a]/80 px-3 py-1.5 text-xs font-semibold text-white">
            Visiter le site <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </motion.a>
  );
}

