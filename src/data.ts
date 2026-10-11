export const site = {
  name: 'Afterdark Dwellings',
  email: 'afterdarkdwellings@gmail.com',
  pinterest: 'https://www.pinterest.com/afterdarkdwellings_/',
  temporaryBaseUrl: 'https://afterdarkdwellings.us/',
};

export const images = {
  main: '/afterdark-images/dark-blue-parlor.webp',
  bathroom: '/afterdark-images/gothic-blue-mirror.webp',
  office: '/afterdark-images/muted-gray-sable.webp',
  smallSpace: '/afterdark-images/blue-sable-alt.webp',
  blackStone: '/afterdark-images/noir-elegance.webp',
  entryway: '/afterdark-images/dark-entryways.webp',
  blueSable: '/afterdark-images/dark-blue-parlor.webp',
  blueSableAlt: '/afterdark-images/blue-sable-alt.webp',
  vesperRed: '/afterdark-images/vesper-red.webp',
  sterlingGreen: '/afterdark-images/sterling-green.webp',
  noirElegance: '/afterdark-images/dark-noir-elegance-raven-sage-velvet.JPG',
  duskworn: '/afterdark-images/Duskworn - alt.PNG',
  darkEntryways: '/afterdark-images/dark-entryways.webp',
  darkBathrooms: '/afterdark-images/gothic-blue-mirror.webp',
  gothicBlueMirror: '/afterdark-images/gothic-blue-mirror.webp',
  darkBlueParlor: '/afterdark-images/dark-blue-parlor.webp',
};

export type Product = {
  id: string;
  name: string;
  merchant: 'Walmart' | "Lowe's";
  category: string;
  editorialNote: string;
  destinationUrl: string;
  affiliateUrl?: string;
  verified: boolean;
  relatedSpaces: string[];
};

export const products: Product[] = [
  {
    id: 'walmart-wall-sconce',
    name: 'Better Homes & Gardens Matte Black 1-Light Indoor Wall Sconce',
    merchant: 'Walmart',
    category: 'Lighting',
    editorialNote: 'A compact matte-black sconce that works in bedside zones, entries, hallways, or anywhere a dark room needs a smaller pool of light.',
    destinationUrl: 'https://www.walmart.com/ip/998572418',
    verified: true,
    relatedSpaces: ['bedrooms', 'entryways', 'living-rooms'],
  },
  {
    id: 'walmart-arc-floor-lamp',
    name: 'Better Homes & Gardens Modern Matte Black 3-Head Arc Floor Lamp',
    merchant: 'Walmart',
    category: 'Lighting',
    editorialNote: 'Three adjustable light sources create layered illumination without asking one ceiling fixture to light the entire room.',
    destinationUrl: 'https://www.walmart.com/ip/142753705',
    verified: true,
    relatedSpaces: ['living-rooms', 'home-offices'],
  },
  {
    id: 'walmart-end-table',
    name: 'Better Homes & Gardens James Wood End Table — Rich Black',
    merchant: 'Walmart',
    category: 'Furniture',
    editorialNote: 'A visually grounded black side table that can anchor a chair or sofa without adding ornament or clutter.',
    destinationUrl: 'https://www.walmart.com/ip/5678968502',
    verified: true,
    relatedSpaces: ['living-rooms', 'bedrooms'],
  },
  {
    id: 'walmart-organic-mirror',
    name: 'Better Homes & Gardens Soft Organic Wood Frame Wall Mirror — Black',
    merchant: 'Walmart',
    category: 'Mirrors',
    editorialNote: 'The irregular outline breaks up rigid architecture while the black frame keeps the object restrained and easy to integrate into a darker palette.',
    destinationUrl: 'https://www.walmart.com/ip/17931801973',
    verified: true,
    relatedSpaces: ['bathrooms', 'entryways', 'bedrooms'],
  },
  {
    id: 'walmart-metal-tray',
    name: 'Better Homes & Gardens Black Metal Accessory Tray',
    merchant: 'Walmart',
    category: 'Objects',
    editorialNote: 'A low-profile black tray can turn several small objects into one visual composition on a console, vanity, counter, or coffee table.',
    destinationUrl: 'https://www.walmart.com/ip/15339169308',
    verified: true,
    relatedSpaces: ['bathrooms', 'entryways', 'living-rooms'],
  },
  {
    id: 'lowes-up-down-sconce',
    name: 'IUEST Dimmable Black Up/Down LED Wall Sconce',
    merchant: "Lowe's",
    category: 'Lighting',
    editorialNote: 'An up/down wall wash is useful when a dark wall needs shape and depth without flooding the entire room with direct light.',
    destinationUrl: 'https://www.lowes.com/pd/IUEST-Indoor-Wall-Sconce-Dimmable-10W-Modern-LED-Wall-Lamp-Black-Up-Down-Wall-Mount-Mini-Metal-for-Living-Room-Bedroom-Hallway-Decor-Warm-White/105789421',
    verified: true,
    relatedSpaces: ['entryways', 'bathrooms', 'living-rooms'],
  },
  {
    id: 'lowes-pharmacy-lamp',
    name: 'Brightech Linden Black LED Pharmacy Floor Lamp',
    merchant: "Lowe's",
    category: 'Lighting',
    editorialNote: 'Focused adjustable light is useful beside a reading chair or desk because it lets the surrounding room stay darker.',
    destinationUrl: 'https://www.lowes.com/pd/Brightech-65-in-Linden-Black-LED-Pharmacy-Floor-Lamp-with-Adjustable-Shade/7626400',
    verified: true,
    relatedSpaces: ['living-rooms', 'home-offices', 'bedrooms'],
  },
  {
    id: 'lowes-under-cabinet',
    name: 'BLACK+DECKER 18-in Warm White LED Under-Cabinet Light Bar',
    merchant: "Lowe's",
    category: 'Lighting',
    editorialNote: 'Warm under-cabinet lighting keeps work surfaces readable while preserving contrast through the rest of a black kitchen.',
    destinationUrl: 'https://www.lowes.com/pd/BLACK-DECKER-18-in-Plug-in-Light-Bar/1000332161',
    verified: true,
    relatedSpaces: ['kitchens'],
  },
  {
    id: 'walmart-desk-lamp',
    name: 'Newhouse Lighting Zlata Black LED Desk Lamp',
    merchant: 'Walmart',
    category: 'Lighting',
    editorialNote: 'A focused black task lamp keeps the work surface bright while letting the surrounding office stay visually quiet.',
    destinationUrl: 'https://www.walmart.com/ip/663683486',
    verified: true,
    relatedSpaces: ['home-offices'],
  },
];

export const getProduct = (id: string) => products.find((product) => product.id === id);

export type GuideStep = {
  number: string;
  title: string;
  copy: string;
  productId?: string;
};

export type Guide = {
  slug: string;
  category: string;
  title: string;
  deck: string;
  readTime: string;
  image: string;
  imageAlt: string;
  steps: GuideStep[];
  rule: string;
  relatedSpaces: string[];
};

export const guides: Guide[] = [
  {
    slug: '7-ways-to-make-a-dark-room-feel-expensive',
    category: 'Dark Interiors',
    title: '7 Ways to Make a Dark Room Feel Expensive',
    deck: 'Dark interiors feel elevated when contrast, texture, scale and light are controlled instead of simply making every surface black.',
    readTime: '4 min read',
    image: images.main,
    imageAlt: 'Dark editorial living room with black and charcoal finishes, natural stone, and warm architectural lighting.',
    relatedSpaces: ['living-rooms', 'bedrooms', 'small-spaces'],
    steps: [
      { number: '01', title: 'Layer Your Blacks', copy: 'Mix soft black, charcoal, graphite and deep gray so walls, furniture and textiles remain distinct. Small tonal shifts create depth without breaking the darker atmosphere.' },
      { number: '02', title: 'Use Warm, Low Lighting', copy: 'Several lower light sources usually create more depth than one harsh ceiling fixture. Keep brightness close to the places where the room actually functions.', productId: 'walmart-arc-floor-lamp' },
      { number: '03', title: 'Mix Your Textures', copy: 'Combine stone, wood, textile, glass and metal. Matte and reflective surfaces beside each other keep a restrained palette from turning visually flat.' },
      { number: '04', title: 'Choose Fewer, Larger Pieces', copy: 'Too many small objects create noise. A few well-scaled pieces make the composition feel more deliberate and give darker finishes room to register.' },
      { number: '05', title: 'Bring In Natural Stone', copy: 'Stone introduces natural movement and variation without requiring bright color. Use it as an architectural surface or as one weighty object.' },
      { number: '06', title: 'Add Warm Contrast', copy: 'Warm wood, aged metal, pale stone or controlled warm light can break up black and charcoal without turning the room beige.' },
      { number: '07', title: 'Leave Negative Space', copy: 'Not every wall, shelf or corner needs to be filled. Empty space makes strong materials and objects feel more important.' },
    ],
    rule: 'A convincing dark interior is not about making everything black. It is about controlling contrast, texture, scale and light.',
  },
  {
    slug: 'layered-lighting-for-dark-interiors',
    category: 'Lighting',
    title: 'Layered Lighting for Dark Interiors',
    deck: 'The goal is not maximum brightness. It is controlled visibility, depth and atmosphere.',
    readTime: '3 min read',
    image: images.entryway,
    imageAlt: 'Dark architectural interior with warm wall lighting and layered illumination.',
    relatedSpaces: ['living-rooms', 'bedrooms', 'entryways', 'home-offices'],
    steps: [
      { number: '01', title: 'Start With Ambient Light, Not a Bright Ceiling', copy: 'A dark room needs enough overall illumination to remain usable, but one bright overhead source can erase depth. Use dimmable indirect light, concealed LEDs or low-output fixtures as the base layer.', productId: 'lowes-up-down-sconce' },
      { number: '02', title: 'Add Task Light Where the Room Actually Works', copy: 'Reading chairs, desks, counters and bedside areas need focused light. Keeping task light local lets the rest of the room stay atmospheric instead of forcing the entire space brighter.', productId: 'lowes-pharmacy-lamp' },
      { number: '03', title: 'Use Accent Light to Reveal Material', copy: 'Aim light across stone, plaster, wood grain, artwork or textured textiles. Grazing light creates shadow and makes surfaces feel dimensional.', productId: 'walmart-wall-sconce' },
      { number: '04', title: 'Keep Color Temperature Consistent', copy: 'Mixing very cool and very warm bulbs can make a dark room feel accidental. A consistent warm temperature usually keeps black, graphite and natural materials cohesive.' },
      { number: '05', title: 'Let Some Areas Stay Dark', copy: 'A room does not need equal brightness everywhere. Controlled shadow is part of the composition. Light the surfaces and activities that matter, then let quieter zones recede.' },
    ],
    rule: 'Light for function first, material second and atmosphere third.',
  },
  {
    slug: 'dark-bedroom-without-feeling-heavy',
    category: 'Bedroom',
    title: 'How to Make a Dark Bedroom Feel Calm, Not Heavy',
    deck: 'A dark bedroom should feel cocooning, not crowded. Tonal variation, tactile materials and disciplined lighting keep it restful.',
    readTime: '3 min read',
    image: images.main,
    imageAlt: 'Dark layered interior in black and charcoal with warm low lighting.',
    relatedSpaces: ['bedrooms'],
    steps: [
      { number: '01', title: 'Use More Than One Dark Tone', copy: 'Pair black with charcoal, graphite, deep brown-black or smoky gray so the room has separation without losing the darker mood.' },
      { number: '02', title: 'Soften With Texture, Not Pastel Color', copy: 'Linen, wool, velvet, brushed cotton and matte wood can make a dark bedroom comfortable without turning it pale or overly soft.' },
      { number: '03', title: 'Keep the Bed Visually Simple', copy: 'The bed is usually the largest object in the room. Too many patterns and competing details can make the space feel crowded.' },
      { number: '04', title: 'Use Low Light at More Than One Height', copy: 'Bedside lamps, sconces and a low floor lamp create a calmer rhythm than one ceiling fixture.', productId: 'walmart-wall-sconce' },
      { number: '05', title: 'Protect Negative Space', copy: 'Leave some wall, nightstand and floor area unfilled. Dark rooms feel more expensive when strong objects have space around them.' },
    ],
    rule: 'Deep color can stay. Clutter, harsh light and unnecessary contrast are what usually make the room feel heavy.',
  },
  {
    slug: 'black-kitchen-without-feeling-flat',
    category: 'Kitchen',
    title: 'Black Kitchens Without the Flat Look',
    deck: 'A black kitchen needs material contrast more than color contrast. Finish, grain, stone movement and directional light keep it dimensional.',
    readTime: '3 min read',
    image: images.blackStone,
    imageAlt: 'Black and stone interior with dark surfaces and warm architectural lighting.',
    relatedSpaces: ['kitchens'],
    steps: [
      { number: '01', title: 'Separate Black Surfaces by Finish', copy: 'Matte cabinetry beside honed stone and brushed metal reads as layered even when the colors are similar.' },
      { number: '02', title: 'Use Stone With Visible Movement', copy: 'Veining, mineral variation or subtle aggregate gives the eye something to read without requiring a white countertop.' },
      { number: '03', title: 'Bring In Grain', copy: 'Wood grain or reeded panels can soften large fields of black cabinetry while keeping the palette controlled.' },
      { number: '04', title: 'Light the Work Surfaces', copy: 'Under-cabinet lighting should make counters readable without flooding the entire kitchen.', productId: 'lowes-under-cabinet' },
      { number: '05', title: 'Use Metal as a Controlled Highlight', copy: 'Brushed steel, blackened metal or aged nickel can create small points of reflection. Keep the finish consistent.' },
    ],
    rule: 'When color is restrained, finish becomes color.',
  },
  {
    slug: 'dark-bathroom-that-feels-expensive',
    category: 'Bathroom',
    title: 'How to Make a Dark Bathroom Feel Expensive',
    deck: 'Stone, reflection, hardware and light should read as one composition instead of separate decorating decisions.',
    readTime: '3 min read',
    image: images.bathroom,
    imageAlt: 'Dark luxury bathroom with black stone, mirror lighting and warm architectural glow.',
    relatedSpaces: ['bathrooms'],
    steps: [
      { number: '01', title: 'Let Stone Carry the Detail', copy: 'Honed stone, veining, textured tile or a mineral finish can create depth without adding decorative clutter.' },
      { number: '02', title: 'Use Warm Light Around the Mirror', copy: 'Face-level lighting matters more than a dramatic ceiling fixture. Warm sconces make the room usable while keeping the rest subdued.', productId: 'lowes-up-down-sconce' },
      { number: '03', title: 'Mix Matte and Reflective Surfaces', copy: 'A matte wall beside glass, mirror, brushed metal and polished stone creates contrast inside a narrow color range.' },
      { number: '04', title: 'Keep Hardware Consistent', copy: 'Repeat one metal direction across faucets, shower hardware, pulls and accessories.' },
      { number: '05', title: 'Leave the Counter Mostly Clear', copy: 'Dark rooms show clutter quickly. Limit visible products and let the strongest surfaces remain exposed.', productId: 'walmart-metal-tray' },
    ],
    rule: 'In a small dark bathroom, fewer materials used well usually look more expensive than many materials competing for attention.',
  },
  {
    slug: 'dark-home-office-without-feeling-closed-in',
    category: 'Home Office',
    title: 'Dark Home Offices Without the Closed-In Feeling',
    deck: 'A dark office should support concentration, not make the room feel smaller. Local task light and disciplined storage keep it focused.',
    readTime: '3 min read',
    image: images.office,
    imageAlt: 'Dark home office with black wood, warm shelf lighting and a focused desk lamp.',
    relatedSpaces: ['home-offices'],
    steps: [
      { number: '01', title: 'Separate the Work Surface From the Wall', copy: 'Use a slight shift in tone, finish or material so a black desk does not disappear into a black wall.' },
      { number: '02', title: 'Prioritize Task Light Over Ambient Brightness', copy: 'Keep strong focused light at the desk and let the rest of the room stay darker.', productId: 'walmart-desk-lamp' },
      { number: '03', title: 'Use One Warm Material to Break the Field', copy: 'Wood grain, leather or cork can prevent graphite and black from feeling sterile without making the room rustic.' },
      { number: '04', title: 'Keep Storage Visually Quiet', copy: 'Closed cabinetry, dark shelving and fewer visible objects keep the room focused.' },
      { number: '05', title: 'Protect One Empty Plane', copy: 'Leave one wall, corner or surface intentionally sparse so the room keeps a sense of width.' },
    ],
    rule: 'The office can be dark without being dim. Put brightness where the work happens and let the rest stay calm.',
  },
  {
    slug: 'small-dark-spaces-that-still-feel-open',
    category: 'Small Spaces',
    title: 'Small Dark Spaces That Still Feel Open',
    deck: 'Small rooms do not have to be pale. Scale, reflection, tonal variation and placed light can keep them atmospheric without feeling cramped.',
    readTime: '3 min read',
    image: images.smallSpace,
    imageAlt: 'Small dark interior with black finishes, warm lighting and open sightlines.',
    relatedSpaces: ['small-spaces'],
    steps: [
      { number: '01', title: 'Use Tonal Variation Instead of Bright Contrast', copy: 'Charcoal beside black gives separation without cutting the room into pieces.' },
      { number: '02', title: 'Choose Fewer Pieces With Cleaner Profiles', copy: 'Fewer, better-scaled pieces create fewer visual edges and usually make a compact room feel larger.' },
      { number: '03', title: 'Use Reflection Strategically', copy: 'A mirror, glass surface or subtle sheen can bounce existing light deeper into the room.', productId: 'walmart-organic-mirror' },
      { number: '04', title: 'Keep the Floor Line Visible', copy: 'Clear floor around furniture helps the eye understand the full footprint of the room.' },
      { number: '05', title: 'Light Vertical Surfaces', copy: 'Wall lighting or upward washes draw the eye vertically and make the room feel taller.', productId: 'walmart-wall-sconce' },
    ],
    rule: 'A compact room feels smaller because of visual congestion, not simply because the walls are dark.',
  },
  {
    slug: 'dark-living-room-feel-expensive',
    category: 'Living Room',
    title: 'How to Make a Dark Living Room Feel Expensive',
    deck: 'A dark living room feels elevated when scale, light and material are controlled. The goal is stronger composition, not more decor.',
    readTime: '3 min read',
    image: images.main,
    imageAlt: 'Dark living room with layered black materials, natural stone and warm architectural light.',
    relatedSpaces: ['living-rooms'],
    steps: [
      { number: '01', title: 'Start With One Dominant Dark Tone', copy: 'Choose one main black or charcoal for the largest surfaces, then shift slightly for upholstery, rugs and secondary furniture.' },
      { number: '02', title: 'Use One Large Anchor Instead of Many Small Pieces', copy: 'A substantial sofa, coffee table or artwork gives the room weight.' },
      { number: '03', title: 'Let Lighting Reveal the Room in Layers', copy: 'Combine a low floor lamp, table lamp, sconces or concealed light. Separate pools of light create depth.', productId: 'walmart-arc-floor-lamp' },
      { number: '04', title: 'Mix Matte, Soft and Reflective Surfaces', copy: 'Velvet, brushed textile, honed stone, glass and metal should react differently to light.' },
      { number: '05', title: 'Edit the Styling Hard', copy: 'Keep shelves, tables and corners selective so the strongest materials and shapes can register.', productId: 'walmart-end-table' },
    ],
    rule: 'Expensive-looking dark rooms usually have fewer competing objects, better light and clearer material hierarchy.',
  },
  {
    slug: 'black-and-stone-interiors',
    category: 'Material',
    title: 'Black & Stone Interiors Without the Flat Look',
    deck: 'Black and natural stone work best when texture, sheen and light do the separating.',
    readTime: '3 min read',
    image: images.blackStone,
    imageAlt: 'Black and stone interior with marble surfaces, charcoal furnishings and warm architectural lighting.',
    relatedSpaces: ['living-rooms', 'kitchens', 'bathrooms'],
    steps: [
      { number: '01', title: 'Let the Stone Have Visible Movement', copy: 'Veining, aggregate, mineral variation or a rough edge gives a black interior something natural to read.' },
      { number: '02', title: 'Separate Materials by Sheen', copy: 'Matte walls, honed stone and brushed metal can live in the same color family while remaining distinct.' },
      { number: '03', title: 'Use Stone at Different Scales', copy: 'A large slab creates architectural weight while a smaller stone object can repeat the material quietly.' },
      { number: '04', title: 'Warm the Composition With Light', copy: 'Warm white lighting can pull bronze, brown and mineral undertones from stone without adding orange decor.', productId: 'lowes-up-down-sconce' },
      { number: '05', title: 'Keep Surrounding Objects Quiet', copy: 'When stone is visually active, nearby furniture and accessories should be simpler.' },
    ],
    rule: 'Use black as the field and let natural variation become the detail.',
  },
  {
    slug: 'dark-entryway-lighting-mirrors-contrast',
    category: 'Entryway',
    title: 'Dark Entryways: Lighting, Mirrors & Contrast',
    deck: 'A dark entryway works when the first sightline is controlled. Vertical light, reflection and fewer stronger objects create a sharper impression.',
    readTime: '3 min read',
    image: images.entryway,
    imageAlt: 'Dark entryway with black stone, warm wall sconces and a clean architectural sightline.',
    relatedSpaces: ['entryways'],
    steps: [
      { number: '01', title: 'Light the Vertical Surfaces', copy: 'Wall sconces, concealed uplight or a narrow wash can make a dark entry feel taller than a single ceiling fixture.', productId: 'lowes-up-down-sconce' },
      { number: '02', title: 'Use One Mirror With Purpose', copy: 'Place a mirror where it reflects light or extends a clean view rather than merely filling a wall.', productId: 'walmart-organic-mirror' },
      { number: '03', title: 'Choose One Strong Console or Bench', copy: 'One well-scaled piece gives the entry a clear anchor and leaves enough open floor to breathe.' },
      { number: '04', title: 'Use Stone or Metal for Visual Weight', copy: 'A dark stone top or blackened metal detail can make the entry feel finished without adding lots of color.' },
      { number: '05', title: 'Control What Is Visible From the Door', copy: 'The first view should have one focal point and a clean line of sight.' },
    ],
    rule: 'The entry needs one clear focal point, enough light to read the materials and a clean path into the home.',
  },
];

export const guideBySlug = Object.fromEntries(guides.map((guide) => [guide.slug, guide]));

export type Space = {
  slug: string;
  name: string;
  kicker: string;
  intro: string;
  image: string;
  imageAlt: string;
  guideSlugs: string[];
  productCategories: string[];
  pinterestBoard: string;
};

export const spaces: Space[] = [
  {
    slug: 'living-rooms',
    name: 'Living Rooms',
    kicker: 'Scale / Light / Texture',
    intro: 'Build the room around one strong anchor, layered light and materials that react differently as the light falls off.',
    image: images.main,
    imageAlt: 'Dark editorial living room with layered black materials and warm architectural lighting.',
    guideSlugs: ['dark-living-room-feel-expensive', '7-ways-to-make-a-dark-room-feel-expensive', 'layered-lighting-for-dark-interiors', 'black-and-stone-interiors'],
    productCategories: ['Lighting', 'Furniture', 'Objects', 'Mirrors'],
    pinterestBoard: 'https://www.pinterest.com/afterdarkdwellings_/dark-living-rooms/',
  },
  {
    slug: 'bedrooms',
    name: 'Bedrooms',
    kicker: 'Quiet / Tactile / Low Light',
    intro: 'Use tonal variation, tactile materials and several low light sources to make deep color feel restful rather than heavy.',
    image: images.main,
    imageAlt: 'Dark layered interior with black and charcoal tones and warm low lighting.',
    guideSlugs: ['dark-bedroom-without-feeling-heavy', 'layered-lighting-for-dark-interiors'],
    productCategories: ['Lighting', 'Furniture', 'Textiles', 'Mirrors'],
    pinterestBoard: 'https://www.pinterest.com/afterdarkdwellings_/dark-bedrooms/',
  },
  {
    slug: 'kitchens',
    name: 'Kitchens',
    kicker: 'Finish / Grain / Stone',
    intro: 'Black kitchens stay dimensional when stone, grain, metal and task light create the contrast instead of more color.',
    image: images.blackStone,
    imageAlt: 'Black and stone interior with dark surfaces and warm architectural lighting.',
    guideSlugs: ['black-kitchen-without-feeling-flat', 'black-and-stone-interiors', 'layered-lighting-for-dark-interiors'],
    productCategories: ['Lighting', 'Kitchen', 'Storage', 'Objects'],
    pinterestBoard: 'https://www.pinterest.com/afterdarkdwellings_/dark-kitchens/',
  },
  {
    slug: 'bathrooms',
    name: 'Bathrooms',
    kicker: 'Stone / Mirror / Metal',
    intro: 'Treat stone, reflection, hardware and face-level lighting as one composition, especially in smaller rooms.',
    image: images.bathroom,
    imageAlt: 'Dark bathroom with black stone, mirror lighting and refined metal details.',
    guideSlugs: ['dark-bathroom-that-feels-expensive', 'layered-lighting-for-dark-interiors', 'black-and-stone-interiors'],
    productCategories: ['Lighting', 'Mirrors', 'Bath', 'Objects'],
    pinterestBoard: 'https://www.pinterest.com/afterdarkdwellings_/dark-bathrooms/',
  },
  {
    slug: 'home-offices',
    name: 'Home Offices',
    kicker: 'Focus / Task Light / Quiet Storage',
    intro: 'Keep light where the work happens, storage visually quiet and one empty plane protected so darker finishes do not close in.',
    image: images.office,
    imageAlt: 'Dark home office with black wood and focused task lighting.',
    guideSlugs: ['dark-home-office-without-feeling-closed-in', 'layered-lighting-for-dark-interiors'],
    productCategories: ['Lighting', 'Furniture', 'Storage'],
    pinterestBoard: 'https://www.pinterest.com/afterdarkdwellings_/dark-home-offices/',
  },
  {
    slug: 'entryways',
    name: 'Entryways',
    kicker: 'Sightline / Reflection / Weight',
    intro: 'Control the first view with vertical light, one reflective surface and a single strong anchor instead of a crowded collection.',
    image: images.entryway,
    imageAlt: 'Dark entryway with warm wall light, black stone and a clear sightline.',
    guideSlugs: ['dark-entryway-lighting-mirrors-contrast', 'layered-lighting-for-dark-interiors'],
    productCategories: ['Lighting', 'Mirrors', 'Furniture', 'Objects'],
    pinterestBoard: 'https://www.pinterest.com/afterdarkdwellings_/dark-entryways/',
  },
  {
    slug: 'small-spaces',
    name: 'Small Spaces',
    kicker: 'Scale / Reflection / Air',
    intro: 'Small rooms can stay dark when you reduce visual congestion, keep the floor line readable and place reflection and light deliberately.',
    image: images.smallSpace,
    imageAlt: 'Small dark room with open sightlines and warm architectural lighting.',
    guideSlugs: ['small-dark-spaces-that-still-feel-open', 'layered-lighting-for-dark-interiors'],
    productCategories: ['Lighting', 'Mirrors', 'Storage', 'Furniture'],
    pinterestBoard: 'https://www.pinterest.com/afterdarkdwellings_/small-dark-spaces/',
  },
];

export const spaceBySlug = Object.fromEntries(spaces.map((space) => [space.slug, space]));

export const pinterestBoards = [
  ['Dark Interior Ideas', 'https://www.pinterest.com/afterdarkdwellings_/dark-interior-ideas/'],
  ['Dark Living Rooms', 'https://www.pinterest.com/afterdarkdwellings_/dark-living-rooms/'],
  ['Dark Bedrooms', 'https://www.pinterest.com/afterdarkdwellings_/dark-bedrooms/'],
  ['Dark Kitchens', 'https://www.pinterest.com/afterdarkdwellings_/dark-kitchens/'],
  ['Dark Bathrooms', 'https://www.pinterest.com/afterdarkdwellings_/dark-bathrooms/'],
  ['Dark Home Offices', 'https://www.pinterest.com/afterdarkdwellings_/dark-home-offices/'],
  ['Lighting After Dark', 'https://www.pinterest.com/afterdarkdwellings_/lighting-after-dark/'],
  ['Black & Stone Interiors', 'https://www.pinterest.com/afterdarkdwellings_/black-stone-interiors/'],
  ['Dark Entryways', 'https://www.pinterest.com/afterdarkdwellings_/dark-entryways/'],
  ['Small Dark Spaces', 'https://www.pinterest.com/afterdarkdwellings_/small-dark-spaces/'],
  ['Curated Home Finds', 'https://www.pinterest.com/afterdarkdwellings_/curated-home-finds/'],
] as const;
