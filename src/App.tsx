import { motion } from "framer-motion";
import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { ArrowRight, BadgeCheck, Bot, LayoutGrid, Megaphone, Menu, Search, X } from "lucide-react";
import { Button } from "./components/Button";
import { Container } from "./components/Container";
import { GoogleGMark, GoogleStyleStars } from "./components/GoogleTrust";
import { MotionInView } from "./components/MotionInView";
import { ProjectPerspectiveCard } from "./components/ProjectPerspectiveCard";
import { SectionHeading } from "./components/SectionHeading";
import { ContactForm } from "./components/ContactForm";
import { SeoToolsMarquee } from "./components/SeoToolsMarquee";
import { ServiceCard } from "./components/ServiceCard";
import { CONTACT_LINKS } from "./constants/contact";
import ailienShot from "./assets/portfolio/ailien.jpg";
import ailienMobileShot from "./assets/portfolio/ailien-mobile.jpg";
import remidentalShot from "./assets/portfolio/remidental.jpg";
import remidentalMobileShot from "./assets/portfolio/remidental-mobile.jpg";

/** Défaut : fond WebGL. `?bg=mesh` · `?bg=r3f` · `?bg=three` */
function backdropModeFromSearch(): "mesh" | "r3f" | "three" | "webgl" {
  const q = new URLSearchParams(window.location.search).get("bg");
  if (q === "mesh") return "mesh";
  if (q === "three") return "three";
  if (q === "r3f") return "r3f";
  return "webgl";
}

const PaperMeshGradientBackdropLazy = lazy(() =>
  import("@/components/ui/background-paper-shaders").then((m) => ({ default: m.PaperMeshGradientBackdrop })),
);
const PaperR3FBackdropLazy = lazy(() =>
  import("@/components/ui/background-paper-shaders").then((m) => ({ default: m.PaperR3FBackdrop })),
);
const ShaderAnimationLazy = lazy(() =>
  import("@/components/ui/shader-animation").then((m) => ({ default: m.ShaderAnimation })),
);
const WebGLShaderBackdropLazy = lazy(() =>
  import("@/components/ui/web-gl-shader").then((m) => ({ default: m.WebGLShaderBackdrop })),
);

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

type Lang = "fr" | "en";

const COPY = {
  fr: {
    nav: { services: "Services", portfolio: "Portfolio", approach: "Mon approche", contact: "Contact", talk: "Discutons" },
    hero: {
      badge: "SEO · SEA · GEO · Visibilité & conversion",
      titleA: "À chaque recherche, ",
      titleB: "soyez en tête du classement",
      subtitle:
        "SEO, SEA et GEO : je fais remonter votre activité sur Google, dans les annonces et dans les réponses des assistants IA — avec un site clair, crédible et pensé pour convertir.",
      ctaPortfolio: "Voir mon portfolio",
      ctaServices: "Découvrir les services",
      chip1: "Clair",
      chip2: "Professionnel",
      chip3: "Visible localement",
      chip4: "orienté clients",
      f1Title: "Visibilité locale",
      f1Desc: "Amélioration du référencement sur Google",
      f2Title: "Preuve sociale",
      f2Desc: "Mettez en valeur votre excellente réputation (4,9+ ⭐)",
      f3Title: "Conversion",
      f3Desc: "Boutons d'action clairs et parcours rassurant",
    },
    services: {
      eyebrow: "Services",
      title: "Une modernisation complète, orientée conversion",
      subtitle:
        "Un design moderne, une visibilité Google optimisée et une livraison rapide pour booster vos résultats dès maintenant.",
      s1t: "Refonte de Site Web",
      s1d: "Modernisation visuelle, typographie premium et expérience mobile fluide.",
      s2t: "Campagnes SEO",
      s2d: "Optimisation du contenu pour remonter sur les recherches locales et à forte intention.",
      s3t: "Google Ads",
      s3d: "Stratégies ciblées pour générer des leads rapidement, avec un budget maîtrisé.",
      s4t: "Optimisation IA (GEO)",
      s4d: "Préparer votre site à être cité par Perplexity, ChatGPT ou Gemini.",
      toolsMarquee: "Outils SEO & SEA",
    },
    portfolio: {
      eyebrow: "Portfolio",
      title: "Projets live de modernisation web",
      subtitle: "Deux références orientées conversion locale, lisibilité mobile et image premium.",
      contactBtn: "Me contacter",
      p1cat: "Sante / Cabinet dentaire",
      p1desc: "Site orienté conversion locale avec services clairs, preuves sociales et prise de rendez-vous.",
      p2cat: "Bien-etre / Reflexologie",
      p2desc: "Vitrine premium avec navigation simple, sections rassurantes et contact rapide.",
    },
    approach: {
      eyebrow: "Mon approche",
      title: "Une offre sur mesure, alignée sur vos objectifs",
      subtitle:
        "Chaque collaboration repose sur un cadre rigoureux : objectifs, calendrier et budget sont définis avec précision avant de commencer.",
      got: "Ce que vous obtenez",
      i1: "Audit rapide + recommandations actionnables",
      i2: "Refonte UI moderne",
      i3: "Performance & structure SEO-friendly",
      i4: "Format mobile & ordinateur, mise en ligne incluse",
      priceEyebrow: "Collaboration",
      priceTitle: "Devis personnalisé",
      priceDesc:
        "Pas de grille figée : le chiffrage reflète votre besoin réel (refonte, SEO, campagnes). Vous savez ce que vous payez, ce qui est inclus, et quand c’est livré.",
      propose: "Demander un devis",
      limited: "Je limite volontairement le volume de missions pour garder une exécution irréprochable.",
    },
    contact: {
      eyebrow: "Contact",
      title: "Parlons de votre refonte",
      subtitle: "Décrivez votre activité, votre objectif et votre délai. Je réponds vite, avec une proposition claire.",
      coord: "Coordonnées",
      coordText:
        "Partagez votre site actuel (même imparfait). Je vous renvoie un mini-audit et une direction de modernisation en 24–48h.",
      promise: "Promesse",
      promiseText: "Un rendu premium, une structure claire, et des CTA qui font le job — sans blabla.",
    },
    footerApproach: "Mon approche",
  },
  en: {
    nav: { services: "Services", portfolio: "Portfolio", approach: "My approach", contact: "Contact", talk: "Let's talk" },
    hero: {
      badge: "SEO · SEA · GEO · Visibility & conversion",
      titleA: "On every search that matters, ",
      titleB: "show up at the top",
      subtitle:
        "SEO, paid search (SEA), and AI visibility (GEO): I help you rank on Google, win with ads, and get cited by AI assistants—with a clear, trustworthy site built to convert.",
      ctaPortfolio: "View portfolio",
      ctaServices: "Explore services",
      chip1: "Clear",
      chip2: "Professional",
      chip3: "Locally visible",
      chip4: "client-oriented",
      f1Title: "Local visibility",
      f1Desc: "Improve your ranking on Google",
      f2Title: "Social proof",
      f2Desc: "Highlight your excellent reputation (4.9+ ⭐)",
      f3Title: "Conversion",
      f3Desc: "Clear CTAs and a reassuring journey",
    },
    services: {
      eyebrow: "Services",
      title: "Complete modernization focused on conversion",
      subtitle:
        "Modern design, optimized Google visibility, and fast delivery to boost your results starting now.",
      s1t: "Website Redesign",
      s1d: "Visual modernization, premium typography, and smooth mobile experience.",
      s2t: "SEO Campaigns",
      s2d: "Content optimization to rank on high-intent local searches.",
      s3t: "Google Ads",
      s3d: "Targeted ad strategies to generate leads quickly with controlled budgets.",
      s4t: "AI Optimization (GEO)",
      s4d: "Prepare your website to be cited by Perplexity, ChatGPT, and Gemini.",
      toolsMarquee: "SEO & SEA tools",
    },
    portfolio: {
      eyebrow: "Portfolio",
      title: "Live website modernization projects",
      subtitle: "Two references focused on local conversion, mobile readability, and a premium image.",
      contactBtn: "Contact me",
      p1cat: "Health / Dental clinic",
      p1desc: "Conversion-focused local website with clear services, social proof, and appointment booking.",
      p2cat: "Wellness / Reflexology",
      p2desc: "Premium showcase website with simple navigation, reassuring sections, and quick contact.",
    },
    approach: {
      eyebrow: "My approach",
      title: "A tailored offer built around your goals",
      subtitle:
        "Every engagement starts with a brief and a clear scope: deliverables, milestones, and budget are agreed before work begins — the same rigor as the live projects in my portfolio.",
      got: "What you get",
      i1: "Quick audit + actionable recommendations",
      i2: "Modern UI redesign",
      i3: "Performance & SEO-friendly structure",
      i4: "Responsive delivery, ready to publish",
      priceEyebrow: "How we work",
      priceTitle: "Custom quote",
      priceDesc:
        "No one-size-fits-all pricing: the quote reflects your actual needs (redesign, SEO, campaigns). You know what you pay, what’s included, and when it ships.",
      propose: "Request a quote",
      limited: "I intentionally limit workload to keep execution standards high.",
    },
    contact: {
      eyebrow: "Contact",
      title: "Let's discuss your redesign",
      subtitle: "Describe your business, goals, and timeline. I reply quickly with a clear proposal.",
      coord: "Contact details",
      coordText:
        "Share your current website (even if imperfect). I will send a mini-audit and modernization direction within 24–48h.",
      promise: "Promise",
      promiseText: "A premium result, clear structure, and CTAs that actually work — no fluff.",
    },
    footerApproach: "My approach",
  },
} as const;

export default function App() {
  const [lang, setLang] = useState<Lang>("fr");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const backdropMode = useMemo(() => backdropModeFromSearch(), []);
  const t = COPY[lang];

  useEffect(() => {
    if (!mobileNavOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileNavOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [mobileNavOpen]);

  const closeMobileNav = () => setMobileNavOpen(false);
  const menuToggleLabel =
    lang === "fr"
      ? mobileNavOpen
        ? "Fermer le menu"
        : "Ouvrir le menu"
      : mobileNavOpen
        ? "Close menu"
        : "Open menu";
  const projects = useMemo(
    () => [
      {
        title: "Remi Dental",
        category: t.portfolio.p1cat,
        href: "https://www.remidental.com/",
        previewImage: remidentalShot,
        mobilePreviewImage: remidentalMobileShot,
        description: t.portfolio.p1desc,
      },
      {
        title: "Ai Lien",
        category: t.portfolio.p2cat,
        href: "https://ailien-site.vercel.app/",
        previewImage: ailienShot,
        mobilePreviewImage: ailienMobileShot,
        description: t.portfolio.p2desc,
      },
    ],
    [t],
  );

  return (
    <div className="relative min-h-dvh bg-grid-fade">
      <div
        className={
          backdropMode === "mesh"
            ? "pointer-events-none fixed inset-0 z-0 opacity-[0.55]"
            : "pointer-events-none fixed inset-0 z-0 opacity-[0.42]"
        }
      >
        <Suspense fallback={null}>
          {backdropMode === "mesh" && (
            <PaperMeshGradientBackdropLazy className="min-h-dvh bg-transparent [&_canvas]:block" />
          )}
          {backdropMode === "r3f" && (
            <PaperR3FBackdropLazy className="min-h-dvh bg-transparent [&_canvas]:block" />
          )}
          {backdropMode === "three" && (
            <ShaderAnimationLazy className="min-h-dvh bg-transparent [&_canvas]:block" />
          )}
          {backdropMode === "webgl" && (
            <WebGLShaderBackdropLazy className="min-h-dvh bg-transparent [&_canvas]:block" />
          )}
        </Suspense>
      </div>
      <div className="relative z-10">
      <header className="sticky top-0 z-50 border-b border-white/[0.08] glass">
        {mobileNavOpen ? (
          <button
            type="button"
            tabIndex={-1}
            aria-label={lang === "fr" ? "Fermer le menu" : "Close menu"}
            className="fixed inset-0 z-40 bg-black/55 md:hidden"
            onClick={closeMobileNav}
          />
        ) : null}
        <Container className="relative z-50">
          <div className="flex h-14 items-center justify-between gap-3">
            <a
              href="#"
              onClick={closeMobileNav}
              className="flex min-w-0 items-center gap-2 rounded-lg px-1 py-0.5 transition-colors hover:text-white"
            >
              <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-brand-500 shadow-glow" />
              <span className="truncate text-sm font-semibold tracking-tight text-white/95">
                Webmo — Modernisation Web
              </span>
            </a>

            <nav className="hidden items-center gap-6 text-sm text-white/70 md:flex">
              <a
                className="rounded-md px-1 py-0.5 transition-colors hover:text-white"
                href="#services"
              >
                {t.nav.services}
              </a>
              <a
                className="rounded-md px-1 py-0.5 transition-colors hover:text-white"
                href="#portfolio"
              >
                {t.nav.portfolio}
              </a>
              <a
                className="rounded-md px-1 py-0.5 transition-colors hover:text-white"
                href="#approche"
              >
                {t.nav.approach}
              </a>
              <a
                className="rounded-md px-1 py-0.5 transition-colors hover:text-white"
                href="#contact"
              >
                {t.nav.contact}
              </a>
              <motion.button
                type="button"
                onClick={() => scrollToId("contact")}
                whileHover={{ scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 450, damping: 22 }}
                className="rounded-xl border border-white/[0.14] bg-white/[0.08] px-3 py-1.5 text-sm font-semibold text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] backdrop-blur-md transition-colors hover:border-white/25 hover:bg-white/[0.12]"
              >
                {t.nav.talk}
              </motion.button>
              <div className="rounded-xl border border-white/10 bg-white/5 p-1 text-xs">
                <button
                  type="button"
                  onClick={() => setLang("fr")}
                  className={`rounded-md px-2 py-1 font-semibold ${lang === "fr" ? "bg-white/15 text-white" : "text-white/65 hover:text-white"}`}
                >
                  FR
                </button>
                <button
                  type="button"
                  onClick={() => setLang("en")}
                  className={`rounded-md px-2 py-1 font-semibold ${lang === "en" ? "bg-white/15 text-white" : "text-white/65 hover:text-white"}`}
                >
                  EN
                </button>
              </div>
            </nav>

            <button
              type="button"
              className="-m-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-md text-white/85 transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/45 md:hidden"
              aria-expanded={mobileNavOpen}
              aria-controls="mobile-nav"
              aria-label={menuToggleLabel}
              onClick={() => setMobileNavOpen((o) => !o)}
            >
              {mobileNavOpen ? <X className="h-6 w-6" strokeWidth={2} aria-hidden /> : <Menu className="h-6 w-6" strokeWidth={2} aria-hidden />}
            </button>
          </div>

          <nav
            id="mobile-nav"
            className={`border-t border-white/[0.1] md:hidden ${mobileNavOpen ? "block" : "hidden"}`}
            aria-hidden={!mobileNavOpen}
          >
            <div className="flex flex-col gap-1 py-4 text-sm">
              <a
                className="rounded-lg px-3 py-2.5 font-medium text-white/80 transition-colors hover:bg-white/[0.06] hover:text-white"
                href="#services"
                onClick={closeMobileNav}
              >
                {t.nav.services}
              </a>
              <a
                className="rounded-lg px-3 py-2.5 font-medium text-white/80 transition-colors hover:bg-white/[0.06] hover:text-white"
                href="#portfolio"
                onClick={closeMobileNav}
              >
                {t.nav.portfolio}
              </a>
              <a
                className="rounded-lg px-3 py-2.5 font-medium text-white/80 transition-colors hover:bg-white/[0.06] hover:text-white"
                href="#approche"
                onClick={closeMobileNav}
              >
                {t.nav.approach}
              </a>
              <a
                className="rounded-lg px-3 py-2.5 font-medium text-white/80 transition-colors hover:bg-white/[0.06] hover:text-white"
                href="#contact"
                onClick={closeMobileNav}
              >
                {t.nav.contact}
              </a>
              <motion.button
                type="button"
                onClick={() => {
                  scrollToId("contact");
                  closeMobileNav();
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 450, damping: 22 }}
                className="mt-1 rounded-xl border border-white/[0.14] bg-white/[0.1] px-3 py-2.5 text-left text-sm font-semibold text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]"
              >
                {t.nav.talk}
              </motion.button>
              <div className="mt-3 flex items-center gap-2 border-t border-white/[0.08] pt-4">
                <span className="px-1 text-xs font-medium uppercase tracking-wide text-white/45">
                  {lang === "fr" ? "Langue" : "Language"}
                </span>
                <div className="flex rounded-xl border border-white/10 bg-white/5 p-1 text-xs">
                  <button
                    type="button"
                    onClick={() => setLang("fr")}
                    className={`rounded-md px-3 py-1.5 font-semibold ${lang === "fr" ? "bg-white/15 text-white" : "text-white/65 hover:text-white"}`}
                  >
                    FR
                  </button>
                  <button
                    type="button"
                    onClick={() => setLang("en")}
                    className={`rounded-md px-3 py-1.5 font-semibold ${lang === "en" ? "bg-white/15 text-white" : "text-white/65 hover:text-white"}`}
                  >
                    EN
                  </button>
                </div>
              </div>
            </div>
          </nav>
        </Container>
      </header>

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden py-16 sm:py-24">
          <Container>
            <div className="mx-auto flex max-w-6xl flex-col items-center">
              <MotionInView className="relative flex w-full max-w-3xl flex-col items-center text-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.06] px-3 py-1 text-xs font-semibold text-white/80 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] backdrop-blur-xl">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-500 shadow-[0_0_12px_rgba(129,140,248,0.55)]" />
                  {t.hero.badge}
                </div>

                <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
                  <span className="text-white">{t.hero.titleA}</span>
                  <span className="text-gradient">{t.hero.titleB}</span>
                </h1>
                <p className="mt-4 max-w-xl text-pretty text-base leading-7 text-white/70">
                  {t.hero.subtitle}
                </p>

                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
                  <Button onClick={() => scrollToId("portfolio")}>
                    {t.hero.ctaPortfolio} <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" onClick={() => scrollToId("services")}>
                    {t.hero.ctaServices}
                  </Button>
                </div>

              </MotionInView>

              <MotionInView className="mt-8 w-full max-w-6xl" delay={0.04}>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  {/* Carte 1 — Visibilité locale */}
                  <div className="flex h-full min-h-0 flex-col items-center justify-between rounded-2xl border border-slate-800 bg-[#1a1f2c] px-5 py-5 text-center">
                    <div className="flex flex-col items-center">
                      <div className="flex h-10 w-full shrink-0 items-center justify-center">
                        <GoogleGMark className="h-8 w-8 shrink-0" />
                      </div>
                      <h3 className="mt-3 text-lg font-bold text-white">{t.hero.f1Title}</h3>
                      <p className="mt-1.5 max-w-[16rem] text-sm leading-snug text-slate-400">
                        {t.hero.f1Desc}
                      </p>
                    </div>
                    <div className="h-6 w-full shrink-0" aria-hidden />
                  </div>

                  {/* Carte 2 — Preuve sociale */}
                  <div className="flex h-full min-h-0 flex-col items-center justify-between rounded-2xl border border-slate-800 bg-[#1a1f2c] px-5 py-5 text-center">
                    <div className="flex flex-col items-center">
                      <div className="flex h-10 w-full shrink-0 items-center justify-center">
                        <GoogleStyleStars rating={4.9} size="sm" />
                      </div>
                      <h3 className="mt-3 text-lg font-bold text-white">{t.hero.f2Title}</h3>
                      <p className="mt-1.5 max-w-[16rem] text-sm leading-snug text-slate-400">
                        {t.hero.f2Desc}
                      </p>
                    </div>
                    <div className="h-6 w-full shrink-0" aria-hidden />
                  </div>

                  {/* Carte 3 — Conversion */}
                  <div className="flex h-full min-h-0 flex-col items-center justify-between rounded-2xl border border-slate-800 bg-[#1a1f2c] px-5 py-5 text-center">
                    <div className="flex flex-col items-center">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky-500/15 ring-1 ring-sky-400/35">
                        <BadgeCheck className="h-5 w-5 text-sky-300" strokeWidth={2.25} />
                      </div>
                      <h3 className="mt-3 text-lg font-bold text-white">{t.hero.f3Title}</h3>
                      <p className="mt-1.5 max-w-[16rem] text-sm leading-snug text-slate-400">
                        {t.hero.f3Desc}
                      </p>
                    </div>
                    <div className="h-6 w-full shrink-0" aria-hidden />
                  </div>
                </div>
              </MotionInView>
            </div>
          </Container>
        </section>

        {/* Services */}
        <section id="services" className="py-16 sm:py-24">
          <Container>
            <MotionInView>
              <SectionHeading
                eyebrow={t.services.eyebrow}
                titleGradient
                title={t.services.title}
                subtitle={t.services.subtitle}
              />
            </MotionInView>

            <div className="mt-10 grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <MotionInView className="h-full min-h-0 w-full" delay={0.02}>
                <ServiceCard
                  icon={LayoutGrid}
                  title={t.services.s1t}
                  description={t.services.s1d}
                />
              </MotionInView>
              <MotionInView className="h-full min-h-0 w-full" delay={0.06}>
                <ServiceCard
                  icon={Search}
                  title={t.services.s2t}
                  description={t.services.s2d}
                />
              </MotionInView>
              <MotionInView className="h-full min-h-0 w-full" delay={0.1}>
                <ServiceCard
                  icon={Megaphone}
                  title={t.services.s3t}
                  description={t.services.s3d}
                />
              </MotionInView>
              <MotionInView className="h-full min-h-0 w-full" delay={0.14}>
                <ServiceCard
                  icon={Bot}
                  title={t.services.s4t}
                  description={t.services.s4d}
                />
              </MotionInView>
            </div>

            <div className="mt-12">
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] px-2 py-4 sm:px-3 sm:py-5">
                <p className="mb-4 text-center text-xs font-semibold uppercase tracking-widest text-brand-300/90">
                  {t.services.toolsMarquee}
                </p>
                <div className="-mx-2 overflow-x-clip overflow-y-visible sm:-mx-3">
                  <SeoToolsMarquee />
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Portfolio */}
        <section id="portfolio" className="py-12 sm:py-16">
          <Container>
            <MotionInView>
              <div className="rounded-3xl border border-white/[0.12] bg-[#1a1f2c] p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] sm:p-10">
                <p className="text-xs font-semibold uppercase tracking-widest text-brand-300/90">
                  {t.portfolio.eyebrow}
                </p>
                <h2 className="mt-2 text-balance text-2xl font-semibold tracking-tight sm:text-3xl text-gradient-soft">
                  {t.portfolio.title}
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-white/70">
                  {t.portfolio.subtitle}
                </p>

                <div className="mt-8 grid gap-12 p-2 md:grid-cols-2">
                  {projects.map((project, index) => (
                    <ProjectPerspectiveCard
                      key={project.title}
                      title={project.title}
                      category={project.category}
                      href={project.href}
                      previewImage={project.previewImage}
                      mobilePreviewImage={project.mobilePreviewImage}
                      description={project.description}
                      delay={index * 0.08}
                    />
                  ))}
                </div>

                <div className="mt-6">
                  <Button onClick={() => scrollToId("contact")}>
                    {t.portfolio.contactBtn} <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </MotionInView>
          </Container>
        </section>

        {/* Mon approche */}
        <section id="approche" className="py-16 sm:py-24">
          <Container>
            <MotionInView>
              <SectionHeading
                eyebrow={t.approach.eyebrow}
                titleGradient
                title={t.approach.title}
                subtitle={t.approach.subtitle}
              />
            </MotionInView>

            <div className="mt-10 grid gap-4 lg:grid-cols-3">
              <MotionInView delay={0.03} className="lg:col-span-2">
                <div className="rounded-3xl border border-white/[0.12] bg-white/[0.05] p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] backdrop-blur-xl sm:p-8">
                  <h3 className="text-base font-semibold text-white">{t.approach.got}</h3>
                  <ul className="mt-4 grid gap-3 text-sm text-white/70 sm:grid-cols-2">
                    <li className="rounded-2xl border border-white/[0.08] bg-white/[0.04] p-4 backdrop-blur-md">
                      {t.approach.i1}
                    </li>
                    <li className="rounded-2xl border border-white/[0.08] bg-white/[0.04] p-4 backdrop-blur-md">
                      {t.approach.i2}
                    </li>
                    <li className="rounded-2xl border border-white/[0.08] bg-white/[0.04] p-4 backdrop-blur-md">
                      {t.approach.i3}
                    </li>
                    <li className="rounded-2xl border border-white/[0.08] bg-white/[0.04] p-4 backdrop-blur-md">
                      {t.approach.i4}
                    </li>
                  </ul>
                </div>
              </MotionInView>

              <MotionInView delay={0.07}>
                <div className="rounded-3xl border border-brand-500/25 bg-gradient-to-b from-brand-500/20 to-white/[0.05] p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12)] backdrop-blur-xl sm:p-8">
                  <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-brand-300/90">
                    {t.approach.priceEyebrow}
                  </p>
                  <h3 className="mt-2 text-base font-semibold text-white">{t.approach.priceTitle}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/70">
                    {t.approach.priceDesc}
                  </p>
                  <div className="mt-6">
                    <Button onClick={() => scrollToId("contact")} className="w-full">
                      {t.approach.propose} <ArrowRight className="h-4 w-4" />
                    </Button>
                    <p className="mt-3 text-xs text-white/55">
                      {t.approach.limited}
                    </p>
                  </div>
                </div>
              </MotionInView>
            </div>
          </Container>
        </section>

        {/* Contact */}
        <section id="contact" className="py-16 sm:py-24">
          <Container>
            <MotionInView>
              <SectionHeading
                eyebrow={t.contact.eyebrow}
                titleGradient
                title={t.contact.title}
                subtitle={t.contact.subtitle}
              />
            </MotionInView>

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              <MotionInView delay={0.03}>
                <ContactForm lang={lang} />
              </MotionInView>

              <MotionInView delay={0.07}>
                <div className="rounded-3xl border border-white/[0.12] bg-white/[0.05] p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] backdrop-blur-xl sm:p-8">
                  <h3 className="text-base font-semibold text-white">{t.contact.coord}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/70">
                    {t.contact.coordText}
                  </p>

                  <div className="mt-6 grid gap-3">
                    {CONTACT_LINKS.map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        className="flex items-center justify-between rounded-2xl border border-white/[0.1] bg-white/[0.05] px-4 py-3 text-sm text-white/80 backdrop-blur-md transition hover:border-white/[0.18] hover:bg-white/[0.08] active:scale-[0.99]"
                      >
                        <span className="font-semibold text-white">
                          {s.label === "Téléphone" ? (lang === "fr" ? "Téléphone" : "Phone") : "Email"}
                        </span>
                        <span className="text-right text-white/55">{s.display}</span>
                      </a>
                    ))}
                  </div>

                  <div className="mt-8 rounded-2xl border border-white/[0.1] bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 backdrop-blur-md">
                    <p className="text-xs font-semibold uppercase tracking-widest text-white/60">
                      {t.contact.promise}
                    </p>
                    <p className="mt-2 text-sm text-white/70">
                      {t.contact.promiseText}
                    </p>
                  </div>
                </div>
              </MotionInView>
            </div>
          </Container>
        </section>
      </main>

      <footer className="border-t border-white/5 py-10">
        <Container>
          <div className="flex flex-col gap-3 text-sm text-white/55 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} — Webmo</p>
            <div className="flex flex-wrap gap-4">
              <a className="hover:text-white" href="#services">
                {t.nav.services}
              </a>
              <a className="hover:text-white" href="#portfolio">
                {t.nav.portfolio}
              </a>
              <a className="hover:text-white" href="#approche">
                {t.footerApproach}
              </a>
              <a className="hover:text-white" href="#contact">
                {t.nav.contact}
              </a>
            </div>
          </div>
        </Container>
      </footer>
      </div>
    </div>
  );
}

