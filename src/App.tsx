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
    upsertMeta('meta[property="og:image"]', 'property', 'og:image', image);
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
      <span className="brand-mark">AD</span>
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
      <img src={src} alt={alt} loading={priority ? 'eager' : 'lazy'} />
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
    { name: 'Blue Sable', tone: 'sable', note: 'Inky blues / velvet / cool shadow', image: images.blueSable, link: '/spaces/living-rooms' },
    { name: 'Vesper Red', tone: 'vesper', note: 'Red velvet / black accents / rich contrast', image: images.vesperRed, link: '/spaces/living-rooms' },
    { name: 'Sterling Green', tone: 'sterling', note: 'Deep green / architectural detail / soft light', image: images.sterlingGreen, link: '/spaces/bedrooms' },
    { name: 'Noir Elegance', tone: 'noir', note: 'Black & ivory / ornate detail / candlelit', image: images.noirElegance, link: '/spaces/living-rooms' },
    { name: 'Duskworn', tone: 'duskworn', note: 'Smoky patina / storm shades / aged surfaces', image: images.duskworn, link: '/spaces/entryways' },
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
              <img src={mood.image} alt={`${mood.name} interior mood`} loading="lazy" />
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
        <SectionTitle index="02 / ROOM BY ROOM" title="FIND YOUR SPACE." copy="From dramatic entryways to richly layered bedrooms, start with a room you can actually transform." />
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
        <div><p>Beautiful inspiration should lead somewhere useful. Explore room guides, discover comparable décor and materials, and shop existing retailer listings—not imaginary products.</p><Link className="button light" to="/shop-the-look">Shop the look ↗</Link><Link className="text-link" to="/curated-finds">See curated finds →</Link></div>
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
      <SEO title="Dark Interior Design Guides | Afterdark Dwellings" description="Original Afterdark Dwellings guides for dark living rooms, bedrooms, kitchens, bathrooms, offices, lighting, materials, and small spaces." />
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
            Editorial content by Afterdark Dwellings. Some retailer links may later become affiliate links. When affiliate tracking is added, it will be disclosed and may earn Afterdark Dwellings a commission at no additional cost to the purchaser.
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
      <SEO title="Explore Rooms | Afterdark Dwellings" description="Explore Afterdark Dwellings by room: dark living rooms, bedrooms, kitchens, bathrooms, home offices, entryways, and small spaces." />
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
        <SectionTitle index="02 / FINDS" title="USEFUL OBJECTS" copy="Verified retailer destinations that fit the room's actual design needs." />
        {roomProducts.length > 0 ? (
          <div className="product-grid">
            {roomProducts.map((product) => <ProductLink product={product} key={product.id} />)}
          </div>
        ) : (
          <ComingSoon>Verified recommendations for this room are being sourced now.</ComingSoon>
        )}
      </section>

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
  const categories = ['Lighting', 'Furniture', 'Mirrors', 'Stone + Material', 'Textiles', 'Storage', 'Kitchen', 'Bath', 'Objects'];

  return (
    <>
      <SEO title="Curated Finds | Afterdark Dwellings" description="Verified lighting, furniture, mirrors, objects and home upgrades selected for dark modern interiors by Afterdark Dwellings." />
      <PageHero kicker="VERIFIED RETAILER LINKS" title="REAL FINDS. SELECTED AFTERDARK." copy="No invented inventory, fake prices, or filler listings. Each live recommendation corresponds to a real retailer destination." />
      <section className="content-section">
        <div className="finds-intro">
          <p>Curated Finds is organized by use, not by whatever happens to be trending. Live product cards are verified against real merchant destinations. Empty categories stay visibly empty until there is something worth adding.</p>
        </div>
        <nav className="finds-nav" aria-label="Curated Finds categories">
          {categories.map((category) => (
            <a key={category} href={`#finds-${category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}>{category}</a>
          ))}
        </nav>
        {categories.map((category) => {
          const categoryProducts = products.filter((product) => product.category === category);
          return (
            <div className="category-block" id={`finds-${category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} key={category}>
              <SectionTitle index={category.toUpperCase()} title={category.toUpperCase()} />
              {categoryProducts.length > 0 ? (
                <div className="product-grid">
                  {categoryProducts.map((product) => (
                    <ProductLink product={product} key={product.id} />
                  ))}
                </div>
              ) : (
                <ComingSoon>No verified {category.toLowerCase()} recommendation has been added yet.</ComingSoon>
              )}
            </div>
          );
        })}
        <p className="disclosure wide">
          Retailer links on this page are provided for product discovery. If an affiliate relationship is activated and a tracked link is added, the relevant disclosure will be shown. Merchant pricing, stock, shipping, returns and warranty terms can change.
        </p>
      </section>
    </>
  );
}

function ShopTheLookPage() {
  const looks = [
    {
      name: 'Black Stone Living Room',
      label: 'LOOK 01 / LIVING ROOM',
      image: images.blackStone,
      productIds: ['walmart-arc-floor-lamp', 'walmart-end-table', 'walmart-metal-tray', 'walmart-organic-mirror'],
      spaceSlug: 'living-rooms',
    },
    {
      name: 'Afterdark Entry',
      label: 'LOOK 02 / ENTRYWAY',
      image: images.entryway,
      productIds: ['lowes-up-down-sconce', 'walmart-organic-mirror', 'walmart-metal-tray'],
      spaceSlug: 'entryways',
    },
    {
      name: 'Focused Home Office',
      label: 'LOOK 03 / OFFICE',
      image: images.office,
      productIds: ['walmart-desk-lamp', 'lowes-pharmacy-lamp'],
      spaceSlug: 'home-offices',
    },
  ];

  return (
    <>
      <SEO title="Shop the Look | Afterdark Dwellings" description="Shop editorial dark-interior looks with verified retailer links selected by Afterdark Dwellings." />
      <PageHero kicker="ROOM / OBJECT / SOURCE" title="SHOP THE LOOK." copy="Start with a room composition, then move directly to the real objects that can help build it." />
      <section className="shop-look-note">
        <span>HOW THIS WORKS</span>
        <p>The room image sets the direction. Only products already verified against real retailer destinations are linked below it. A visual match is editorial inspiration, not a claim that the exact photographed room contains those products.</p>
      </section>
      <section className="content-section looks">
        {looks.map((look) => (
          <article className="look" key={look.name}>
            <ImageFrame src={look.image} alt={`${look.name} editorial inspiration`} />
            <div className="look-copy">
              <span className="eyebrow">{look.label}</span>
              <h2>{look.name}</h2>
              <Link className="look-room-link" to={`/spaces/${look.spaceSlug}`}>Read the room guide →</Link>
              <div className="look-products">
                {look.productIds.map((id, index) => {
                  const product = getProduct(id);
                  if (!product) return null;
                  return (
                    <div className="look-product" key={id}>
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      <div>
                        <h3>{product.name}</h3>
                        <p>{product.merchant} · {product.category}</p>
                        <a href={product.affiliateUrl || product.destinationUrl} target="_blank" rel={product.affiliateUrl ? 'nofollow sponsored noreferrer' : 'nofollow noreferrer'}>
                          View product →
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
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
        <p>Not every retailer link is an affiliate link. Normal retailer links may be published before an affiliate relationship exists. Tracked links should be disclosed when added.</p>
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
    ['Do you use affiliate links?', 'Some links may become affiliate links. When tracked affiliate links are used, the relationship is disclosed.'],
    ['Do you sell the products shown?', 'Not unless a page explicitly says otherwise. Curated Finds normally points to third-party merchants that handle checkout, fulfillment, returns and warranties.'],
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
      <span>VERIFIED RECOMMENDATIONS COMING SOON</span>
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
