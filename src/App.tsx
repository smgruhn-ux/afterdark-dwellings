import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { Link, NavLink, Route, Routes, useLocation, useParams } from 'react-router-dom';
import {
  guideBySlug,
  guides,
  images,
  pinterestBoards,
  products,
  site,
  spaceBySlug,
  spaces,
  getProduct,
  type Guide,
  type Product,
} from './data';

const HOME_DESCRIPTION =
  'Afterdark Dwellings is an independent dark-interiors publication focused on architectural lighting, material depth, room-by-room guides, and considered home finds.';

function upsertMeta(selector: string, attr: 'name' | 'property', key: string, content: string) {
  let element = document.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attr, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function SEO({
  title,
  description,
  image = images.main,
}: {
  title: string;
  description: string;
  image?: string;
}) {
  const location = useLocation();

  useEffect(() => {
    document.title = title;
    upsertMeta('meta[name="description"]', 'name', 'description', description);
    upsertMeta('meta[property="og:title"]', 'property', 'og:title', title);
    upsertMeta('meta[property="og:description"]', 'property', 'og:description', description);
    upsertMeta('meta[property="og:image"]', 'property', 'og:image', new URL(image, window.location.origin).href);
    upsertMeta('meta[property="og:site_name"]', 'property', 'og:site_name', site.name);
    upsertMeta('meta[property="og:type"]', 'property', 'og:type', 'website');
    upsertMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');

    const href = window.location.href.split('#')[0];
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = href;
  }, [title, description, image, location.pathname]);

  return null;
}

function ScrollToTop() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [location.pathname]);
  return null;
}

function BrandMark() {
  return (
    <Link className="brand" to="/" aria-label="Afterdark Dwellings home">
      <span className="brand-copy">
        <strong>AFTERDARK</strong>
        <em>DWELLINGS</em>
      </span>
    </Link>
  );
}

function Layout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <BrandMark />
        <button
          className="menu-button"
          type="button"
          aria-expanded={open}
          aria-controls="main-nav"
          onClick={() => setOpen((value) => !value)}
        >
          <span>Menu</span>
          <i aria-hidden="true" />
        </button>
        <nav id="main-nav" className={open ? 'main-nav open' : 'main-nav'} aria-label="Main navigation">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/guides">Guides</NavLink>
          <NavLink to="/spaces">Spaces</NavLink>
          <NavLink to="/curated-finds">Curated Finds</NavLink>
          <NavLink to="/shop-the-look">Shop the Look</NavLink>
          <NavLink to="/about">About</NavLink>
          <a href={site.pinterest} target="_blank" rel="noreferrer">Pinterest</a>
        </nav>
      </header>

      <main id="main">{children}</main>

      <footer className="site-footer">
        <div className="footer-lead">
          <span className="eyebrow">AFTERDARK DWELLINGS</span>
          <p>Dark interiors, considered objects, and home upgrades worth bringing inside.</p>
          <a href={site.pinterest} target="_blank" rel="noreferrer">@afterdarkdwellings_</a>
        </div>
        <div>
          <h2>Explore</h2>
          <Link to="/guides">Guides</Link>
          <Link to="/spaces">Spaces</Link>
          <Link to="/curated-finds">Curated Finds</Link>
          <Link to="/shop-the-look">Shop the Look</Link>
        </div>
        <div>
          <h2>Trust</h2>
          <Link to="/about">About</Link>
          <Link to="/editorial-policy">Editorial Policy</Link>
          <Link to="/affiliate-disclosure">Affiliate Disclosure</Link>
          <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/terms-of-use">Terms of Use</Link>
          <Link to="/faq">FAQ</Link>
        </div>
        <div>
          <h2>Contact</h2>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <Link to="/contact">Contact page</Link>
        </div>
      </footer>
    </div>
  );
}

function SectionTitle({ index, title, copy }: { index: string; title: string; copy?: string }) {
  return (
    <div className="section-heading">
      <div className="section-index">{index}</div>
      <div>
        <h2>{title}</h2>
        {copy && <p>{copy}</p>}
      </div>
    </div>
  );
}


const imageFallbacks: Record<string, string> = {};

function ImageFrame({
  src,
  alt,
  className = '',
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={`image-frame ${className}`}>
      <img src={src} alt={alt} loading={priority ? 'eager' : 'lazy'} onError={(event) => { const fallback = imageFallbacks[src]; if (fallback && event.currentTarget.src !== fallback) event.currentTarget.src = fallback; }} />
    </div>
  );
}

function GuideCard({ guide }: { guide: Guide }) {
  return (
    <Link className="guide-card" to={`/guides/${guide.slug}`}>
      <ImageFrame src={guide.image} alt={guide.imageAlt} />
      <div className="guide-card-copy">
        <span>{guide.category} / {guide.readTime}</span>
        <h3>{guide.title}</h3>
        <p>{guide.deck}</p>
        <em>Read guide →</em>
      </div>
    </Link>
  );
}

function ProductLink({ product, compact = false }: { product: Product; compact?: boolean }) {
  const url = product.affiliateUrl || product.destinationUrl;
  const rel = product.affiliateUrl ? 'nofollow sponsored noreferrer' : 'nofollow noreferrer';

  return (
    <article className={compact ? 'product-card compact' : 'product-card'}>
      <div className="product-topline">
        <span className="product-category">{product.category} / {product.merchant}</span>
        {product.verified && <span className="verified-mark">VERIFIED DESTINATION</span>}
      </div>
      <h3>{product.name}</h3>
      <p>{product.editorialNote}</p>
      <a href={url} target="_blank" rel={rel}>View at {product.merchant} →</a>
      <small>
        {product.affiliateUrl
          ? 'Affiliate link. Afterdark Dwellings may earn a commission at no additional cost to you.'
          : 'Retailer link. Pricing and availability may change. Affiliate tracking is not currently attached to this link.'}
      </small>
    </article>
  );
}

function HomePage() {
  const latest = guides.slice(0, 4);
  const collections = [
    { name: 'Blue Sable', tone: 'sable', note: 'Inky blues / velvet / cool shadow', image: '/38-tonal-blue-velvet-sectional.jpg', link: '/collections/blue-sable' },
    { name: 'Vesper Red', tone: 'vesper', note: 'Red velvet / black accents / rich contrast', image: images.vesperRed, link: '/collections/vesper-red' },
    { name: 'Sterling Green', tone: 'sterling', note: 'Deep green / architectural detail / soft light', image: '/50-teal-velvet-living-v3.jpg', link: '/collections/sterling-green' },
    { name: 'Noir Elegance', tone: 'noir', note: 'Black & ivory / ornate detail / candlelit', image: images.noirElegance, link: '/collections/noir-elegance' },
    { name: 'Duskworn', tone: 'duskworn', note: 'Smoky patina / storm shades / aged surfaces', image: '/Duskworn.PNG', link: '/collections/duskworn' },
  ];
  return (
    <>
      <SEO title="Afterdark Dwellings | Dark Interiors, Rooms & Curated Home Finds" description="Discover color-drenched, atmospheric interiors, practical dark room guides, and carefully sourced home finds at Afterdark Dwellings." />
      <section className="hero new-hero">
        <div className="hero-copy">
          <span className="eyebrow">THE ART OF LIVING AFTER DARK · EST. 2026</span>
          <h1>BEAUTY<br /><i>IN THE</i><br />DARK.</h1>
          <p>Color-drenched rooms. Velvet, shadow, and architectural detail. Explore atmospheric interiors—and discover real pieces to bring the look home.</p>
          <div className="hero-actions">
            <Link className="button light" to="/shop-the-look">Explore the looks ↗</Link>
            <Link className="text-link" to="/spaces">Browse rooms →</Link>
          </div>
          <div className="hero-footnote"><span>AFTERDARK DWELLINGS</span><span>INTERIORS / ATMOSPHERE / OBJECTS</span></div>
        </div>
        <div className="new-hero-visual">
          <ImageFrame src={images.main} alt="Moody architectural interior with layered shadow and warm accent lighting." className="hero-image" priority />
          <div className="hero-image-caption"><span>01 — THE AFTERDARK EDIT</span><strong>Live beautifully. Stay in the shadows.</strong></div>
        </div>
      </section>
      <div className="mood-ticker" aria-label="Our design language"><span>VELVET & SHADOW</span><span>◆</span><span>COLOR-DRENCHED WALLS</span><span>◆</span><span>LIGHT WITH INTENTION</span><span>◆</span><span>RECREATE THE LOOK</span></div>
      <section className="content-section collections-section">
        <SectionTitle index="01 / THE PALETTE" title="MOODS TO LIVE IN." copy="Not one shade of dark. Explore the palettes and details behind our Pinterest inspiration." />
        <div className="mood-grid">
          {collections.map((mood, index) => (
            <Link to={mood.link} className={`mood-card mood-${mood.tone}`} key={mood.name}>
              <img src={mood.image} alt={`${mood.name} interior mood`} loading="lazy" onError={(event) => { const fallback = imageFallbacks[mood.image]; if (fallback && event.currentTarget.src !== fallback) event.currentTarget.src = fallback; }} />
              <div className="mood-card-shade" />
              <div className="mood-card-content">
                <span>0{index + 1} / COLLECTION</span>
                <h3>{mood.name}</h3>
                <p>{mood.note}</p>
                <em>Explore interiors ↗</em>
              </div>
            </Link>
          ))}
        </div>
        <p className="collections-disclaimer">Color collections are editorial inspiration; room pages feature practical ideas and relevant finds, not claimed exact product matches.</p>
      </section>
      <section className="statement-section">
        <span className="eyebrow">DESIGN IS MORE THAN A COLOR</span>
        <h2>NOT JUST DARK.<br /><em>DEEPLY FELT.</em></h2>
        <p>Smoky blue. Blackened stone. Rich red velvet. Reflective brass. Walls that hold shadow, and light that makes every material come alive.</p>
        <Link className="text-link" to="/guides">Read the design guides →</Link>
      </section>
      <section className="content-section editorial-rooms">
        <SectionTitle index="02 / ROOM BY ROOM" title="FIND YOUR SPACE." copy="From richly layered bedrooms to atmospheric bathrooms, start with a room you can actually transform." />
        <div className="space-grid">
          {spaces.map((space) => (
            <Link className="space-card" to={`/spaces/${space.slug}`} key={space.slug}>
              <ImageFrame src={space.image} alt={space.imageAlt} />
              <div><span>{space.kicker}</span><h3>{space.name}</h3><p>{space.intro}</p><em>Explore room →</em></div>
            </Link>
          ))}
        </div>
      </section>
      <section className="shop-promise">
        <div><span className="eyebrow">03 / THE REAL-LIFE EDIT</span><h2>LOVE THE ROOM?<br /><i>MAKE IT YOURS.</i></h2></div>
        <div><p>Explore room guides and design details. Shopping links appear only for exact, confirmed products from authorized affiliate partners.</p><Link className="button light" to="/shop-the-look">Shop the look ↗</Link><Link className="text-link" to="/curated-finds">See curated finds →</Link></div>
      </section>
      <section className="content-section latest-section">
        <SectionTitle index="04 / THE JOURNAL" title="DESIGN AFTER DARK." copy="Guides for creating strong atmosphere with real choices in texture, light, scale and finish." />
        <div className="guide-grid">{latest.map(guide => <GuideCard guide={guide} key={guide.slug} />)}</div>
        <div className="section-cta"><Link className="text-link" to="/guides">All design guides →</Link></div>
      </section>
      <section className="pinterest-band refreshed-pinterest">
        <span className="eyebrow">SAVE WHAT MOVES YOU</span>
        <h2>Follow the darker side of design.</h2>
        <p>Explore Blue Sable, Vesper Red, Sterling Green, Noir Elegance and more on Pinterest.</p>
        <a className="button light" href={site.pinterest} target="_blank" rel="noreferrer">Pinterest · @afterdarkdwellings__ ↗</a>
      </section>
    </>
  );
}

function GuidesPage() {
  return (
    <>
      <SEO title="Dark Interior Design Guides | Afterdark Dwellings" description="Original Afterdark Dwellings guides for dark living rooms, bedrooms, bathrooms, entryways, lighting, and small spaces." />
      <PageHero kicker="EDITORIAL / GUIDES" title="DESIGN NOTES AFTERDARK." copy="Practical original guides built around darker palettes, architectural light, material depth and rooms that feel deliberate rather than themed." />
      <section className="content-section">
        <div className="guide-grid">
          {guides.map((guide) => <GuideCard guide={guide} key={guide.slug} />)}
        </div>
      </section>
    </>
  );
}

function GuideArticlePage() {
  const { slug } = useParams();
  const guide = slug ? guideBySlug[slug] : undefined;

  if (!guide) return <NotFoundPage />;

  const related = guides
    .filter((item) => item.slug !== guide.slug && item.relatedSpaces.some((space) => guide.relatedSpaces.includes(space)))
    .slice(0, 3);

  return (
    <>
      <SEO title={`${guide.title} | Afterdark Dwellings`} description={guide.deck} image={guide.image} />
      <article className="article">
        <header className="article-header">
          <span className="eyebrow">{guide.category} / GUIDE</span>
          <h1>{guide.title}</h1>
          <p>{guide.deck}</p>
          <div className="article-meta">AFTERDARK DWELLINGS · {guide.readTime.toUpperCase()}</div>
        </header>

        <ImageFrame src={guide.image} alt={guide.imageAlt} className="article-hero-image" priority />

        <div className="article-body">
          {guide.steps.map((step) => {
            const product = step.productId ? getProduct(step.productId) : undefined;
            return (
              <section className="article-step" key={step.number}>
                <span className="step-number">{step.number}</span>
                <div>
                  <h2>{step.title}</h2>
                  <p>{step.copy}</p>
                  {product && (
                    <div className="shop-idea">
                      <span>SHOP THE IDEA</span>
                      <ProductLink product={product} compact />
                    </div>
                  )}
                </div>
              </section>
            );
          })}

          <aside className="rule-box">
            <span>THE AFTERDARK RULE</span>
            <p>{guide.rule}</p>
          </aside>

          <p className="disclosure">
            Editorial content by Afterdark Dwellings. Only confirmed Amazon or HOROW affiliate links will be displayed when an exact product match is available.
          </p>
        </div>
      </article>

      <section className="content-section related-section">
        <SectionTitle index="RELATED" title="KEEP GOING" />
        <div className="guide-grid compact-grid">
          {related.map((item) => <GuideCard guide={item} key={item.slug} />)}
        </div>
        <div className="related-spaces">
          <span>EXPLORE THE ROOM</span>
          <div>
            {guide.relatedSpaces.map((spaceSlug) => {
              const space = spaceBySlug[spaceSlug];
              return space ? <Link key={spaceSlug} to={`/spaces/${spaceSlug}`}>{space.name} →</Link> : null;
            })}
          </div>
        </div>
      </section>

      <section className="article-pinterest">
        <span className="eyebrow">SAVE / RETURN</span>
        <h2>Keep this idea close.</h2>
        <p>Save inspiration and find related room ideas on the Afterdark Dwellings Pinterest boards.</p>
        <a className="button light" href={site.pinterest} target="_blank" rel="noreferrer">Follow on Pinterest</a>
      </section>
    </>
  );
}

function SpacesPage() {
  return (
    <>
      <SEO title="Explore Rooms | Afterdark Dwellings" description="Explore Afterdark Dwellings by room: dark living rooms, bedrooms, kitchens, bathrooms, and small spaces." />
      <PageHero kicker="ROOM BY ROOM" title="SPACES WITH A POINT OF VIEW." copy="Choose the room first. Each space connects practical design guidance, product categories, and the relevant Pinterest board." />
      <section className="content-section">
        <div className="space-grid large">
          {spaces.map((space) => (
            <Link className="space-card" to={`/spaces/${space.slug}`} key={space.slug}>
              <ImageFrame src={space.image} alt={space.imageAlt} />
              <div>
                <span>{space.kicker}</span>
                <h3>{space.name}</h3>
                <p>{space.intro}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

function SpacePage() {
  const { slug } = useParams();
  const space = slug ? spaceBySlug[slug] : undefined;
  if (!space) return <NotFoundPage />;

  const roomGuides = space.guideSlugs.map((guideSlug) => guideBySlug[guideSlug]).filter(Boolean);
  const roomProducts = products.filter((product) => product.relatedSpaces.includes(space.slug)).slice(0, 6);

  return (
    <>
      <SEO title={`${space.name} | Afterdark Dwellings`} description={space.intro} image={space.image} />
      <section className="space-hero">
        <ImageFrame src={space.image} alt={space.imageAlt} priority />
        <div>
          <span className="eyebrow">{space.kicker}</span>
          <h1>{space.name}</h1>
          <p>{space.intro}</p>
        </div>
      </section>

      <section className="content-section">
        <SectionTitle index="01 / INSIGHT" title="READ THE ROOM" />
        <div className="guide-grid">
          {roomGuides.map((guide) => <GuideCard guide={guide} key={guide.slug} />)}
        </div>
      </section>

      <section className="content-section">
        <SectionTitle index="02 / FINDS" title="USEFUL OBJECTS" copy="Exact product links appear only when an authorized Amazon or HOROW affiliate destination is confirmed." />
        {roomProducts.length > 0 ? (
          <div className="product-grid">
            {roomProducts.map((product) => <ProductLink product={product} key={product.id} />)}
          </div>
        ) : (
          <ComingSoon>Product sourcing is in progress. No unverified shopping links are displayed.</ComingSoon>
        )}
      </section>

      {space.slug === 'bathrooms' && (
        <section className="content-section">
          <SectionTitle index="BATHROOMS / MORE INSPIRATION" title="SAPPHIRE LUXE." copy="A second bathroom direction from the Afterdark Dwellings collection." />
          <div className="palette-photo-grid">
            <figure className="palette-photo">
              <img src="/Sapphire%20Luxe%20Bathroom.PNG" alt="Sapphire Luxe bathroom inspiration" loading="lazy" />
              <figcaption>Sapphire Luxe Bathroom</figcaption>
            </figure>
          </div>
        </section>
      )}

      {space.slug === 'bedrooms' && (
        <section className="content-section noir-elegance-collection">
          <SectionTitle index="BLUE SABLE / BEDROOMS" title="MIDNIGHT BLUE DETAILS" copy="Additional bedroom inspiration from the Blue Sable collection." />
          <div className="palette-photo-grid">
            <figure className="palette-photo"><img src="/BEDROOMS%20%E2%80%94%20Quiet%20_%20Tactile%20_%20Low%20Light_An%20intimate%20midnight-blue%20bedroom%20featuring%20textured%20bedding%2C%20layered%20fabrics%2C%20subtle%20botanical%20details%2C%20and%20multiple%20soft%2C%20low-positioned%20light%20sources.%20Restful%2C%20enveloping%2C%20and%20visually%20rich%20without%20excess%202.JPEG" alt="Midnight blue bedroom inspiration 1" loading="lazy" /><figcaption>Midnight Blue Bedroom 1</figcaption></figure>
            <figure className="palette-photo"><img src="/BEDROOMS%20%E2%80%94%20Quiet%20_%20Tactile%20_%20Low%20Light_An%20intimate%20midnight-blue%20bedroom%20featuring%20textured%20bedding%2C%20layered%20fabrics%2C%20subtle%20botanical%20details%2C%20and%20multiple%20soft%2C%20low-positioned%20light%20sources.%20Restful%2C%20enveloping%2C%20and%20visually%20rich%20without%20excessiv.JPEG" alt="Midnight blue bedroom inspiration 2" loading="lazy" /><figcaption>Midnight Blue Bedroom 2</figcaption></figure>
          </div>
        </section>
      )}

      <section className="pinterest-band">
        <span className="eyebrow">03 / PINTEREST</span>
        <h2>{space.name}, saved.</h2>
        <p>Continue the visual research on the dedicated Afterdark Dwellings board.</p>
        <a className="button dark" href={space.pinterestBoard} target="_blank" rel="noreferrer">Open board</a>
      </section>
    </>
  );
}

function CuratedFindsPage() {
  const selections = [
    { image: '/Jade%20Kitchen.PNG', title: 'Stone & Shadow', mood: 'MATERIAL / SHADOW', copy: 'Architectural lighting and dark surfaces create depth in the Jade Kitchen.' },
    { image: '/38-tonal-blue-velvet-sectional.jpg', title: 'Velvet After Dark', mood: 'TEXTURE / DEPTH', copy: 'Tonal upholstery brings softness to an architectural blue interior.' },
    { image: '/50-teal-velvet-living-v3.jpg', title: 'The Black Silhouette', mood: 'LIGHT / ARCHITECTURE', copy: 'A study of contrast, placement and controlled illumination.' },
    { image: '/Emerald%20Noir%20bathroom.PNG', title: 'A Softer Glow', mood: 'LIGHT / SOFT CONTRAST', copy: 'Slim vertical lighting and concealed illumination shape this dark bathroom.' },
  ];
  return (
    <>
      <SEO title="Curated Finds | Afterdark Dwellings" description="An editorial selection of atmospheric rooms, materials and lighting details." />
      <PageHero kicker="THE AFTERDARK EDIT" title="CURATED FINDS" copy="An intentional edit of material, silhouette, light and shadow." />
      <section className="content-section curated-editorial">
        <div className="curated-editorial-intro"><span className="eyebrow">AN EDIT, NOT A CATALOG</span><p>Explore the details behind each room. Shopping links are intentionally not provided.</p></div>
        <div className="curated-editorial-grid">
          {selections.map((selection, index) => (
            <article className="curated-editorial-card" key={selection.title}>
              <img src={selection.image} alt={`${selection.title} — Afterdark Dwellings room inspiration`} loading="lazy" />
              <div className="curated-editorial-copy">
                <span className="eyebrow">{String(index + 1).padStart(2, '0')} / {selection.mood}</span>
                <h2>{selection.title}</h2><p>{selection.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

type PaletteCollection = 'blue-sable' | 'vesper-red' | 'sterling-green' | 'duskworn';
const paletteCollections: Record<PaletteCollection, { title: string; description: string; photos: { src: string; label: string }[] }> = {
  'blue-sable': {
    title: 'BLUE SABLE', description: 'Inky navy, slate velvet, and tonal blue rooms with architectural depth.',
    photos: [
      { src: '/38-tonal-blue-velvet-sectional.jpg', label: 'Tonal Blue Velvet Sectional' },
      { src: '/39-tonal-blue-parlor-chair.jpg', label: 'Tonal Blue Parlor Chair' },
      { src: '/42-tonal-blue-window-nook.jpg', label: 'Tonal Blue Window Nook' },
      { src: '/46-cobalt-bay-window.jpg', label: 'Cobalt Bay Window' },
      { src: '/47-slate-velvet-sofa-molding.jpg', label: 'Slate Velvet Sofa & Molding' },
      { src: '/48-navy-entry-velvet-bench.jpg', label: 'Navy Entry Velvet Bench' },
      { src: '/BEDROOMS%20%E2%80%94%20Quiet%20_%20Tactile%20_%20Low%20Light_An%20intimate%20midnight-blue%20bedroom%20featuring%20textured%20bedding%2C%20layered%20fabrics%2C%20subtle%20botanical%20details%2C%20and%20multiple%20soft%2C%20low-positioned%20light%20sources.%20Restful%2C%20enveloping%2C%20and%20visually%20rich%20without%20excess%202.JPEG', label: 'Midnight Blue Bedroom — 1' },
      { src: '/BEDROOMS%20%E2%80%94%20Quiet%20_%20Tactile%20_%20Low%20Light_An%20intimate%20midnight-blue%20bedroom%20featuring%20textured%20bedding%2C%20layered%20fabrics%2C%20subtle%20botanical%20details%2C%20and%20multiple%20soft%2C%20low-positioned%20light%20sources.%20Restful%2C%20enveloping%2C%20and%20visually%20rich%20without%20excessiv.JPEG', label: 'Midnight Blue Bedroom — 2' },
      { src: '/5E615937-888C-4F9B-AC67-906D1E08B3DE.PNG', label: 'Blue Sable — Editorial 01' },
      { src: '/FDA9E35D-BE96-4C25-900C-D8E08AD0914D.PNG', label: 'Blue Sable — Editorial 02' },
      { src: '/IMG_9948.JPG', label: 'Blue Sable — Editorial 03' },
      { src: '/IMG_9979.JPG', label: 'Blue Sable — Editorial 04' },
      { src: '/IMG_9980.JPG', label: 'Blue Sable — Editorial 05' },
      { src: '/IMG_9983.JPG', label: 'Blue Sable — Editorial 06' },
      { src: '/IMG_9989.JPG', label: 'Blue Sable — Editorial 07' },
      { src: '/IMG_9990.JPG', label: 'Blue Sable — Editorial 08' },
      { src: '/IMG_9993.JPG', label: 'Blue Sable — Editorial 09' },
    ],
  },
  'vesper-red': {
    title: 'VESPER RED', description: 'Oxblood, crimson, blackened burgundy, and richly layered interiors.',
    photos: [
      { src: '/afterdark-images/vesper-red.webp', label: 'Vesper Red — Original Collection' },
      { src: '/IMG_9981.JPG', label: 'Vesper Red — Editorial 01' },
      { src: '/A%20stunning%20and%20vibrant%20cinematic%20photo%20of%20It%E2%80%99s%20a%20striking%20combination%20of%20monochromatic%20crimson%20interiors%2C%20gothic%20architectural%20detailing%2C%20and%20restrained%20contemporary%20furniture.__The%20aesthetic___%20Color_%20Deep%20oxblood%2C%20blackened%20burgundy%2C%20wine%20red%2C%20and.PNG', label: 'Vesper Red — Editorial 02' },
      { src: '/IMG_9992.JPG', label: 'Vesper Red — Editorial 03' },
    ],
  },
  'sterling-green': {
    title: 'STERLING GREEN', description: 'Deep teal, green velvet, and richly layered interiors.',
    photos: [
      { src: '/50-teal-velvet-living-v3.jpg', label: 'Teal Velvet Living Room' },
      { src: '/51-teal-velvet-bedroom.jpg', label: 'Teal Velvet Bedroom' },
      { src: '/52-teal-parlor-chesterfield.jpg', label: 'Teal Parlor Chesterfield' },
      { src: '/sterling-green.webp', label: 'Sterling Green' },
      { src: '/IMG_9987.JPG', label: 'Sterling Green — Editorial 02' },
      { src: '/B4D22CCF-B5F1-4FE1-B5FC-5D6C74266DA1.PNG', label: 'Sterling Green — Editorial 03' },
      { src: '/IMG_9988.JPG', label: 'Sterling Green — Editorial 04' },
    ],
  },
  duskworn: {
    title: 'DUSKWORN', description: 'Smoky, weathered surfaces and quietly dramatic rooms.',
    photos: [
      { src: '/Duskworn.PNG', label: 'Duskworn' },
      { src: '/Duskworn%20-%20alt.PNG', label: 'Duskworn — Alternative' },
    ],
  },
};
function PaletteCollectionPage({ collection }: { collection: PaletteCollection }) {
  const palette = paletteCollections[collection];
  return (
    <>
      <SEO title={`${palette.title} | Afterdark Dwellings`} description={palette.description} />
      <section className={`content-section noir-elegance-collection palette-theme-${collection}`}>
        <div className="noir-collection-heading">
          <span className="eyebrow">THE PALETTE / {palette.title}</span>
          <h1>{palette.title}</h1>
          <p>{palette.description}</p>
        </div>
        <div className="palette-photo-grid">
          {palette.photos.map((photo) => (
            <figure className="palette-photo" key={photo.src}>
              <img src={photo.src} alt={photo.label} loading="lazy" />
              <figcaption>{photo.label}</figcaption>
            </figure>
          ))}
        </div>
      </section>
    </>
  );
}

function NoirElegancePage() {
  const scenes = [
    {
      title: 'The Winged Bedroom',
      label: '01 / BEDROOM',
      image: '/57-noir-bedroom-wings-v2.jpg',
      alt: 'Noir Elegance bedroom composition with ornate, wing-inspired details.',
      description: 'Build the atmosphere with a dark foundation, tactile bedding, and precisely placed low lighting. Let one sculptural feature take the lead.',
    },
    {
      title: 'The Raven Console',
      label: '02 / CONSOLE',
      image: '/58-noir-console-raven.jpg',
      alt: 'Ornate Noir Elegance console scene with raven-inspired detailing.',
      description: 'Treat the console like a still life: a strong focal object, restrained accessories, and enough empty surface to frame the silhouette.',
    },
    {
      title: 'The Filigree Corner',
      label: '03 / LOUNGE',
      image: '/61-noir-chaise-corner-filigree.jpg',
      alt: 'Moody Noir Elegance chaise lounge corner with decorative filigree.',
      description: 'Anchor a quiet corner with black velvet seating. Keep surrounding objects secondary so the chair and architectural detail remain the focus.',
    },
  ];

  return (
    <>
      <SEO title="Noir Elegance | Afterdark Dwellings" description="Three richly detailed Noir Elegance interior scenes with carefully chosen ways to recreate the atmosphere." />
      <section className="content-section noir-elegance-collection palette-theme-noir-elegance">
        <div className="noir-collection-heading">
          <span className="eyebrow">THE PALETTE / NOIR ELEGANCE</span>
          <h1>NOIR ELEGANCE</h1>
          <p>Dark velvet, ornate details, and sculptural contrast. Three distinct compositions, each with a considered starting point for bringing the atmosphere home.</p>
        </div>
        <div className="noir-scene-list">
          {scenes.map((scene) => (
            <article className="noir-scene" key={scene.label}>
              <img src={scene.image} alt={scene.alt} loading="lazy" />
              <div className="noir-scene-copy">
                <span className="eyebrow">{scene.label}</span>
                <h2>{scene.title}</h2>
                <p>{scene.description}</p>

              </div>
            </article>
          ))}
        </div>
        <div className="palette-photo-grid">
          <figure className="palette-photo">
            <img src="/IMG_9997.JPG" alt="The Raven's Reflection — raven in an ornate mirror above a dark fireplace and black velvet chair" loading="lazy" />
            <figcaption>Noir Elegance — The Raven's Reflection</figcaption>
          </figure>
        </div>
        <p className="noir-collection-note">These scenes are editorial inspiration. Shopping links are not currently displayed.</p>
      </section>
    </>
  );
}

function ShopTheLookPage() {
  const looks = [
    {
      name: 'Teal Velvet Living Room',
      label: 'LOOK 01 / LIVING ROOM',
      image: '/50-teal-velvet-living-v3.jpg',
      spaceSlug: 'living-rooms',
    },
    {
      name: 'Jade Kitchen',
      label: 'LOOK 02 / KITCHEN',
      image: '/Jade%20Kitchen.PNG',
      spaceSlug: 'kitchens',
    },
    {
      name: 'Emerald Noir Bathroom',
      label: 'LOOK 03 / BATHROOM',
      image: images.bathroom,
      spaceSlug: 'bathrooms',
    },
  ];

  return (
    <>
      <SEO title="Shop the Look | Afterdark Dwellings" description="Explore dark-interior looks. Exact-match affiliate products are added only after verification." />
      <PageHero kicker="ROOM / OBJECT / SOURCE" title="SHOP THE LOOK." copy="Explore the composition, materials and details behind each room." />
      <section className="shop-look-note">
        <span>HOW THIS WORKS</span>
        <p>The room image sets the direction. Shopping links are shown only when the pictured product and authorized Amazon or HOROW affiliate destination have been confirmed.</p>
      </section>
      <section className="content-section looks">
        {looks.map((look) => (
          <article className="look" key={look.name}>
            <ImageFrame src={look.image} alt={`${look.name} editorial inspiration`} />
            <div className="look-copy">
              <span className="eyebrow">{look.label}</span>
              <h2>{look.name}</h2>
              <Link className="look-room-link" to={`/spaces/${look.spaceSlug}`}>Read the room guide →</Link>
              <p className="look-note">Editorial inspiration only. No product shopping links are provided.</p>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}

function AboutPage() {
  return (
    <>
      <SEO title="About | Afterdark Dwellings" description="About Afterdark Dwellings, an independent publication focused on dark modern interiors, architectural lighting, material depth, and considered home finds." />
      <TextPage kicker="ABOUT THE PUBLICATION" title="AFTERDARK DWELLINGS">
        <p className="lede">Afterdark Dwellings is an independent interiors publication focused on dark modern rooms, architectural lighting, material depth and considered home products.</p>
        <h2>What gets published</h2>
        <p>Guides are built around practical design decisions: light, proportion, texture, material, contrast, scale and space. The goal is to make visual inspiration usable rather than simply decorative.</p>
        <h2>How products are selected</h2>
        <p>Products are included because they fit a real editorial use case. A product must correspond to a real retailer destination before it is shown as purchasable. Fake reviews, invented prices and fabricated listings are not used.</p>
        <h2>Affiliate relationships</h2>
        <p>Affiliate relationships may support the publication. They do not guarantee product inclusion. When a tracked affiliate link is used, the relationship is disclosed.</p>
        <h2>Contact</h2>
        <p><a href={`mailto:${site.email}`}>{site.email}</a></p>
      </TextPage>
    </>
  );
}

function EditorialPolicyPage() {
  return (
    <>
      <SEO title="Editorial Policy | Afterdark Dwellings" description="The Afterdark Dwellings editorial policy for guides, product recommendations, verification, pricing, and affiliate relationships." />
      <TextPage kicker="TRUST / EDITORIAL" title="EDITORIAL POLICY">
        <p className="lede">The publication is designed to separate useful design guidance from advertising pressure.</p>
        <h2>Product verification</h2>
        <p>Products shown as purchasable must correspond to a real product and a real merchant destination. Afterdark Dwellings does not knowingly publish fictional inventory, fake reviews, invented ratings or fabricated availability.</p>
        <h2>Pricing</h2>
        <p>Prices are omitted unless there is a clear reason to show a current price. Merchant pages remain the final source for current pricing, stock, shipping, returns and warranties.</p>
        <h2>Affiliate relationships</h2>
        <p>Affiliate eligibility does not determine editorial inclusion. If a normal retailer link later becomes a tracked affiliate link, the content should remain useful without the commission.</p>
        <h2>Corrections</h2>
        <p>If a product destination breaks or information becomes inaccurate, contact <a href={`mailto:${site.email}`}>{site.email}</a>.</p>
      </TextPage>
    </>
  );
}

function AffiliateDisclosurePage() {
  return (
    <>
      <SEO title="Affiliate Disclosure | Afterdark Dwellings" description="Affiliate disclosure for product links and recommendations published by Afterdark Dwellings." />
      <TextPage kicker="LEGAL / TRANSPARENCY" title="AFFILIATE DISCLOSURE">
        <p>Afterdark Dwellings may participate in affiliate programs. When a tracked affiliate link is used and a qualifying purchase is made, Afterdark Dwellings may receive a commission at no additional cost to the purchaser.</p>
        <h2>Current links</h2>
        <p>Not every retailer link is an affiliate link. Only verified Amazon and HOROW affiliate product links are permitted. Products without confirmed matching affiliate links are not linked.</p>
        <h2>Editorial independence</h2>
        <p>Affiliate eligibility does not guarantee placement. Products must still fit the editorial topic and correspond to a real merchant destination.</p>
      </TextPage>
    </>
  );
}

function PrivacyPage() {
  return (
    <>
      <SEO title="Privacy Policy | Afterdark Dwellings" description="Privacy information for visitors to Afterdark Dwellings." />
      <TextPage kicker="LEGAL" title="PRIVACY POLICY">
        <p>Last updated October 5, 2026.</p>
        <h2>Information you provide</h2>
        <p>If you contact Afterdark Dwellings by email, the information you choose to send may be used to respond to your message and maintain ordinary correspondence.</p>
        <h2>Technical and third-party services</h2>
        <p>The site may use hosting, analytics, social platforms, embedded media or other third-party services that process technical information such as browser, device, referral and usage data under their own policies.</p>
        <h2>External and affiliate links</h2>
        <p>Third-party merchants and affiliate partners operate independently and have their own privacy practices. Afterdark Dwellings does not control their checkout, account or tracking systems.</p>
        <h2>Contact</h2>
        <p><a href={`mailto:${site.email}`}>{site.email}</a></p>
      </TextPage>
    </>
  );
}

function TermsPage() {
  return (
    <>
      <SEO title="Terms of Use | Afterdark Dwellings" description="Terms governing use of Afterdark Dwellings editorial content, external links, and recommendations." />
      <TextPage kicker="LEGAL" title="TERMS OF USE">
        <p>Last updated October 5, 2026.</p>
        <h2>Editorial information</h2>
        <p>Afterdark Dwellings provides design inspiration, guides, commentary and curated recommendations for informational purposes. Product availability, pricing and specifications can change.</p>
        <h2>Third-party products</h2>
        <p>External merchants are responsible for their products, orders, shipping, returns, warranties, terms and customer service. A link from this site does not make Afterdark Dwellings the seller.</p>
        <h2>Content</h2>
        <p>Original text, branding and site design may not be republished or presented as another party's work without permission. Third-party trademarks remain the property of their respective owners.</p>
      </TextPage>
    </>
  );
}

function FAQPage() {
  const faqs = [
    ['What is Afterdark Dwellings?', 'An independent interior and home editorial focused on dark architectural spaces, considered objects and practical upgrades.'],
    ['Do you use affiliate links?', 'There are currently no shopping or affiliate links on the website. Any future affiliate links will be disclosed.'],
    ['Do you sell the products shown?', 'Not unless a page explicitly says otherwise. The site currently provides design inspiration without shopping links.'],
    ['Are the products real?', 'Anything displayed as a purchasable recommendation should correspond to a real product and real merchant destination.'],
    ['How do I get in touch?', site.email],
  ];

  return (
    <>
      <SEO title="FAQ | Afterdark Dwellings" description="Frequently asked questions about Afterdark Dwellings, Curated Finds, affiliate links, product recommendations, and contact." />
      <TextPage kicker="INFORMATION" title="FAQ">
        <div className="faq-list">
          {faqs.map(([question, answer]) => (
            <article key={question}>
              <h2>{question}</h2>
              <p>{answer}</p>
            </article>
          ))}
        </div>
      </TextPage>
    </>
  );
}

function ContactPage() {
  return (
    <>
      <SEO title="Contact | Afterdark Dwellings" description="Contact Afterdark Dwellings for corrections, partnerships, and editorial inquiries." />
      <TextPage kicker="CONTACT" title="GET IN TOUCH">
        <p className="lede">Corrections, partnerships and editorial inquiries can be sent directly by email.</p>
        <p><a className="large-email" href={`mailto:${site.email}`}>{site.email}</a></p>
        <h2>Pinterest</h2>
        <p><a href={site.pinterest} target="_blank" rel="noreferrer">@afterdarkdwellings_</a></p>
      </TextPage>
    </>
  );
}

function PinterestPage() {
  return (
    <>
      <SEO title="Pinterest Boards | Afterdark Dwellings" description="Explore Afterdark Dwellings Pinterest boards for dark living rooms, bedrooms, kitchens, bathrooms, lighting, home offices, entryways, and curated finds." />
      <PageHero kicker="SAVE / SEARCH / RETURN" title="PINTEREST AFTERDARK." copy="Boards are organized by room, material and use case so inspiration can lead back to the most relevant guide." />
      <section className="content-section">
        <div className="board-grid">
          {pinterestBoards.map(([name, url], index) => (
            <a className="board-card" href={url} target="_blank" rel="noreferrer" key={name}>
              <span>{String(index + 1).padStart(2, '0')} / BOARD</span>
              <h3>{name}</h3>
              <em>Open on Pinterest →</em>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}

function PageHero({ kicker, title, copy }: { kicker: string; title: string; copy: string }) {
  return (
    <section className="page-hero">
      <span className="eyebrow">{kicker}</span>
      <h1>{title}</h1>
      <p>{copy}</p>
    </section>
  );
}

function TextPage({ kicker, title, children }: { kicker: string; title: string; children: ReactNode }) {
  return (
    <section className="text-page">
      <span className="eyebrow">{kicker}</span>
      <h1>{title}</h1>
      <div className="text-page-body">{children}</div>
    </section>
  );
}

function ComingSoon({ children }: { children: ReactNode }) {
  return (
    <div className="coming-soon">
      <span>PRODUCT SOURCING IN PROGRESS</span>
      <p>{children}</p>
    </div>
  );
}

function NotFoundPage() {
  return (
    <>
      <SEO title="Page Not Found | Afterdark Dwellings" description="The requested Afterdark Dwellings page could not be found." />
      <section className="not-found">
        <span className="eyebrow">404 / AFTERDARK</span>
        <h1>THIS ROOM IS EMPTY.</h1>
        <p>The page moved, changed, or never existed.</p>
        <Link className="button light" to="/">Return home</Link>
      </section>
    </>
  );
}

export default function App() {
  return (
    <Layout>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/guides" element={<GuidesPage />} />
        <Route path="/guides/:slug" element={<GuideArticlePage />} />
        <Route path="/spaces" element={<SpacesPage />} />
        <Route path="/spaces/:slug" element={<SpacePage />} />
        <Route path="/curated-finds" element={<CuratedFindsPage />} />
        <Route path="/shop-the-look" element={<ShopTheLookPage />} />
        <Route path="/collections/blue-sable" element={<PaletteCollectionPage collection="blue-sable" />} />
        <Route path="/collections/vesper-red" element={<PaletteCollectionPage collection="vesper-red" />} />
        <Route path="/collections/sterling-green" element={<PaletteCollectionPage collection="sterling-green" />} />
        <Route path="/collections/duskworn" element={<PaletteCollectionPage collection="duskworn" />} />
        <Route path="/collections/noir-elegance" element={<NoirElegancePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/privacy-policy" element={<PrivacyPage />} />
        <Route path="/terms-of-use" element={<TermsPage />} />
        <Route path="/affiliate-disclosure" element={<AffiliateDisclosurePage />} />
        <Route path="/editorial-policy" element={<EditorialPolicyPage />} />
        <Route path="/pinterest" element={<PinterestPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
}
