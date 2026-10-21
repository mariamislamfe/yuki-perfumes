const products = [
  {
    _id: "rosa-glow",
    name: "Rosa Glow",
    slug: "rosa-glow",
    price: 400,
    notes: "Rose & Jasmine",
    details: "Fresh-cut rose wrapped in soft white jasmine. A luminous floral for the days you want to be remembered.",
    images: ["/products/rosa-glow.png"],
  },
  {
    _id: "blossom-bloom",
    name: "Blossom Bloom",
    slug: "blossom-bloom",
    price: 400,
    notes: "Cherry & Musk",
    details: "Cherry blossom petals over a warm, skin-close musk. Delicate at first spray, unforgettable by evening.",
    images: ["/products/blossom-bloom.png"],
  },
  {
    _id: "sweet-nectar",
    name: "Sweet Nectar",
    slug: "sweet-nectar",
    price: 400,
    notes: "Peach & Vanilla",
    details: "Ripe, juicy peach melting into creamy vanilla. A sweet signature that lingers long after you leave.",
    images: ["/products/sweet-nectar.png"],
  },
  // Placeholder images until each scent gets its own photo.
  {
    _id: "velvet-petal",
    name: "Velvet Petal",
    slug: "velvet-petal",
    price: 450,
    notes: "Peony & Amber",
    details: "Soft peony petals over a glowing amber base. Velvety, warm and quietly confident.",
    images: ["/products/rosa-glow.png"],
  },
  {
    _id: "cherry-silk",
    name: "Cherry Silk",
    slug: "cherry-silk",
    price: 420,
    notes: "Black Cherry & Almond",
    details: "Dark cherry and toasted almond draped in silk. Playful by day, magnetic by night.",
    images: ["/products/blossom-bloom.png"],
  },
  {
    _id: "honey-blush",
    name: "Honey Blush",
    slug: "honey-blush",
    price: 380,
    notes: "Honey & Apricot",
    details: "Golden honey drizzled over sun-warmed apricot. A cosy, glowing sweetness.",
    images: ["/products/sweet-nectar.png"],
  },
  {
    _id: "rose-whisper",
    name: "Rose Whisper",
    slug: "rose-whisper",
    price: 400,
    notes: "Damask Rose & Oud",
    details: "Damask rose softened by a whisper of oud. Elegant, deep and made to linger.",
    images: ["/products/rosa-glow.png"],
  },
  {
    _id: "sakura-dream",
    name: "Sakura Dream",
    slug: "sakura-dream",
    price: 430,
    notes: "Sakura & White Tea",
    details: "Airy cherry blossom with a calm note of white tea. Light, clean and dreamy.",
    images: ["/products/blossom-bloom.png"],
  },
  {
    _id: "sugar-kiss",
    name: "Sugar Kiss",
    slug: "sugar-kiss",
    price: 360,
    notes: "Caramel & Pear",
    details: "Crisp pear dipped in soft caramel. Sweet, bright and impossible to forget.",
    images: ["/products/sweet-nectar.png"],
  },
  {
    _id: "jasmine-veil",
    name: "Jasmine Veil",
    slug: "jasmine-veil",
    price: 410,
    notes: "Jasmine & Sandalwood",
    details: "Night-blooming jasmine resting on creamy sandalwood. A soft veil of elegance.",
    images: ["/products/rosa-glow.png"],
  },
];

const banner = {
  largeText1: "Blossom Bloom",
  largeText2: "Don't miss",
  midText: "Season Sale",
  smallText: "A scent that speaks your story — discover our exclusive perfume collection.",
  desc: "New collection",
  discount: "20% off DON'T LET IT OUT",
  saleTime: "15 Nov to 7 Dec",
  buttonText: "Buy now",
  product: "Blossom Bloom",
  image: "/products/blossom-bloom.png",
};

export const getProducts = async () => products;

export const getProduct = async (slug) => products.find((p) => p.slug === slug) ?? null;

export const getBanner = async () => banner;
