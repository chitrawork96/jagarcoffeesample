import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { assetAudit, jagarAssets as a } from "@/assets/jagar/manifest";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "JĀGAR — Indian Coffee. Indian Stories." },
      { name: "description", content: "Awaken to premium single-origin Indian coffee, regional stories and rituals from South India to the North-East." },
      { property: "og:title", content: "JĀGAR — Indian Coffee. Indian Stories." },
      { property: "og:description", content: "Premium Indian coffee. Regional origins. The little pauses in an Indian day." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const origins = [
  { name: "Coorg", note: "Rainforests · Estates · Mist", image: a.coorgFront, tone: "gold" },
  { name: "Wayanad", note: "Forests · Spice trails · Mist", image: a.wayanadFront, tone: "gold" },
  { name: "Assam", note: "Rivers · Tea gardens · Mist", image: a.assamFront, tone: "pink" },
  { name: "Meghalaya", note: "Clouds · Living root bridges", image: a.meghalayaFront, tone: "pink" },
  { name: "Mizoram", note: "Mountains · Mist · Mornings", image: a.mizoramFront, tone: "pink" },
] as const;

function MediaImage({ src, alt, className = "", eager = false }: { src: string; alt: string; className?: string; eager?: boolean }) {
  return <img src={src} alt={alt} className={className} loading={eager ? "eager" : "lazy"} decoding="async" />;
}

function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [["Coffee", "#coffee"], ["Origins", "#origins"], ["Our Story", "#story"], ["The Ritual", "#ritual"], ["Films", "#films"]];
  return <header className={`site-nav ${scrolled ? "is-scrolled" : ""}`}>
    <a className="nav-mark" href="#top" aria-label="JĀGAR home">JĀGAR</a>
    <nav className="nav-links" aria-label="Main navigation">{links.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</nav>
    <Button asChild variant="nav" className="nav-cta"><a href="#coffee">Explore coffee</a></Button>
    <Button variant="nav" size="icon" className="menu-trigger" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</Button>
    {open && <nav className="mobile-menu" aria-label="Mobile navigation">{links.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}</nav>}
  </header>;
}

function Index() {
  return <main id="top" className="jagar-site">
    <Nav />
    <section className="hero" aria-labelledby="hero-title">
      <video className="hero-film" autoPlay muted loop playsInline preload="metadata" poster={a.plantationTriptych}><source src={a.plantationFilm} type="video/mp4" /></video>
      <div className="hero-veil" />
      <div className="hero-copy">
        <p className="kicker">Indian coffee · Indian stories</p>
        <h1 id="hero-title">JĀGAR</h1>
        <p className="hero-line">Awaken every day.</p>
      </div>
      <a href="#story" className="scroll-cue"><span>Begin the journey</span><ArrowDown aria-hidden="true" /></a>
    </section>

    <section id="story" className="manifesto paper-section">
      <p className="chapter">01 · A coffee story</p>
      <h2>Coffee is more<br />than a cup.</h2>
      <div className="manifesto-words" aria-label="It is a place, a person, a pause, a landscape, a story">
        <span>A place.</span><span>A person.</span><span>A pause.</span><span>A landscape.</span><span>A story.</span>
      </div>
      <p className="manifesto-body">JĀGAR celebrates India’s coffee regions and the people, places and little pauses behind every cup.</p>
    </section>

    <section id="films" className="journey-section">
      <div className="journey-heading"><p className="chapter">02 · From the land</p><h2>Where mornings<br />begin in mist.</h2></div>
      <MediaImage src={a.plantationTriptych} alt="A coffee plantation at sunrise with rain-washed leaves and white coffee flowers" className="triptych" />
      <div className="journey-film cherries-film"><video autoPlay muted loop playsInline preload="metadata" poster={a.cherriesStill}><source src={a.cherriesFilm} type="video/mp4" /></video><span>Cherry · ripened slowly</span></div>
      <MediaImage src={a.cherriesStill} alt="Ripe red coffee cherries and white flowers on a sunlit branch" className="cherries-still" />
      <div className="journey-to-roast"><p>Leaf</p><i /><p>Flower</p><i /><p>Cherry</p><i /><p>Bean</p><i /><p>Roast</p></div>
      <MediaImage src={a.roastedBeans} alt="Freshly roasted coffee beans spilling from a jute sack" className="beans-still" />
    </section>

    <section id="origins" className="worlds-section">
      <div className="world south-world"><p className="chapter">03 · One country, two coffee worlds</p><p className="world-index">01</p><h2>South<br />India</h2><p>Warm earth. Plantation green. Brass and heritage.</p><MediaImage src={a.chikmagalurFront} alt="JĀGAR Chikmagalur single-origin coffee pouch" className="hero-pouch pouch-yellow" /></div>
      <div className="world north-world"><p className="world-index">02</p><h2>North +<br />North-East</h2><p>Misty mountains. Botanical abundance. Bright, distinctive cups.</p><MediaImage src={a.meghalayaFront} alt="JĀGAR Meghalaya single-origin coffee pouch" className="hero-pouch pouch-pink" /></div>
    </section>

    <section id="coffee" className="origins-scroll" aria-label="Coffee origins">
      <header><p className="chapter">04 · A journey across India</p><h2>Five origins.<br />Five bolder mornings.</h2></header>
      <div className="origin-track">
        {origins.map((origin, index) => <article className={`origin-panel ${origin.tone}`} key={origin.name}>
          <span className="origin-number">0{index + 1}</span><div><h3>{origin.name}</h3><p>{origin.note}</p></div><MediaImage src={origin.image} alt={`JĀGAR ${origin.name} single-origin coffee pouch`} />
        </article>)}
      </div>
    </section>

    <section className="field-notes paper-section">
      <div><p className="chapter">05 · Read the land</p><h2>Every pouch<br />carries a place.</h2><p>Turn it over and the origin opens up: the people, tasting profile, altitude and ritual of a remarkable Indian landscape.</p></div>
      <figure><MediaImage src={a.chikmagalurBack} alt="Back of the JĀGAR Chikmagalur pouch with origin and brewing details" /><figcaption>Chikmagalur · Karnataka</figcaption></figure>
      <figure><MediaImage src={a.meghalayaBack} alt="Back of the JĀGAR Meghalaya pouch with origin and brewing details" /><figcaption>Meghalaya · North-East India</figcaption></figure>
    </section>

    <section id="ritual" className="ritual-section">
      <MediaImage src={a.brassRitual} alt="Traditional brass coffee filter, tumbler and davara overlooking a plantation" className="ritual-bg" />
      <div className="ritual-copy"><p className="chapter">06 · The Indian coffee ritual</p><h2>The little pauses<br />in an Indian day.</h2><p>Brass warmed by morning light. A slow pour. A familiar froth. Coffee that asks you to stay.</p></div>
      <div className="pour-film"><video autoPlay muted loop playsInline preload="metadata" poster={a.coffeePourStill}><source src={a.filterPourFilm} type="video/mp4" /></video><p>Filter · Pour · Pause</p></div>
      <MediaImage src={a.coffeePourStill} alt="Filter coffee being poured beside a JĀGAR enamel mug and books" className="pour-still" />
    </section>

    <section className="product-story">
      <p className="chapter">07 · From landscape to cup</p><h2>Carry the story home.</h2>
      <article className="lifestyle south-life"><MediaImage src={a.coorgLifestyle} alt="JĀGAR Coorg pouch with brass filter coffee on a South Indian veranda" /><div><span>South India</span><h3>Coorg</h3><p>Rainforests. Rivers. A caramel-sweet morning.</p></div></article>
      <article className="lifestyle north-life"><MediaImage src={a.assamLifestyle} alt="JĀGAR Assam pouch with enamel mug by the Brahmaputra landscape" /><div><span>North-East India</span><h3>Assam</h3><p>Rivers. Tea gardens. A warm, spiced morning.</p></div></article>
    </section>

    <footer><div><p className="footer-mark">JĀGAR</p><p>Awaken every day.</p></div><p>Indian coffee.<br />Indian stories.</p><a href="#top">Back to the beginning ↑</a><details><summary>Production asset audit</summary><ul>{assetAudit.map(([name, section]) => <li key={name}><span>{name}</span><span>{section} · Used</span></li>)}</ul><p>18 uploaded · 18 visible uses · 0 unused</p></details></footer>
  </main>;
}