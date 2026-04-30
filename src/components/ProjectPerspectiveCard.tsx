import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

type Props = {
  title: string;
  category: string;
  href: string;
  previewImage: string;
  mobilePreviewImage?: string;
  description: string;
  delay?: number;
  /** Libellé du CTA au survol (desktop). */
  visitLabel?: string;
};

export function ProjectPerspectiveCard({
  title,
  category,
  href,
  previewImage,
  mobilePreviewImage,
  description,
  delay = 0,
  visitLabel = "Visiter le site",
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
        <motion.div
          className="relative overflow-hidden rounded-2xl md:hidden"
          initial={{ opacity: 0.5, scale: 0.95, rotateX: -12, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }}
          viewport={{ once: false, amount: 0.55 }}
          transition={{ type: "spring", stiffness: 50, damping: 20, delay }}
          whileTap={{
            scale: 0.98,
            boxShadow:
              "0 22px 54px rgba(0,0,0,0.52), -8px -8px 24px rgba(255,255,255,0.06)",
          }}
          style={{ transformPerspective: 1200 }}
        >
          <div className="mx-auto w-full max-w-[210px] rounded-[1.8rem] border border-white/15 bg-[#0b1220] p-2 shadow-[0_16px_40px_rgba(0,0,0,0.45)]">
            <div className="relative overflow-hidden rounded-[1.2rem] border border-white/10">
              <img
                src={mobilePreviewImage ?? previewImage}
                alt={`Apercu mobile du projet ${title}`}
                className="h-[380px] w-full object-cover object-top sm:h-[400px]"
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0d1322]/78 via-transparent to-transparent" />
            </div>
          </div>
        </motion.div>

        <div className="relative hidden overflow-hidden rounded-2xl md:block">
          <img
            src={previewImage}
            alt={`Apercu du projet ${title}`}
            className="h-56 w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03] sm:h-64"
            loading="lazy"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0d1322]/80 via-[#0d1322]/25 to-transparent" />
        </div>

        <div className="mt-4 px-2 md:absolute md:inset-x-6 md:bottom-5 md:mt-0 md:px-0">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-300/95">{category}</p>
          <h3 className="mt-1 text-lg font-semibold text-white">{title}</h3>
          <p className="mt-1 line-clamp-2 text-sm text-white/75">{description}</p>
        </div>

        <div className="absolute bottom-5 right-5 hidden translate-y-1 scale-95 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100 md:block">
          <span className="inline-flex items-center gap-1 rounded-xl border border-white/20 bg-[#0f172a]/80 px-3 py-1.5 text-xs font-semibold text-white">
            {visitLabel} <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </motion.a>
  );
}

