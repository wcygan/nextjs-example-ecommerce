import { Product } from "@/types";

export const products: Product[] = [
  {
    id: "prod_001",
    slug: "modern-oak-bench",
    name: "Modern Oak Bench",
    price: 45000, // $450.00
    image: "/products/oak-bench.svg",
    description: "Handcrafted solid oak bench with minimalist design. Perfect for entryways or dining rooms. Features smooth edges and a natural finish that highlights the wood grain.",
    options: [
      {
        id: "legs",
        name: "Legs",
        values: [
          { id: "standard", label: "Standard Oak Legs" },
          { id: "gold", label: "Gold Aston Legs" },
          { id: "black", label: "Matte Black Legs" },
        ],
      },
    ],
    sku: "BNCH-OAK-001",
  },
  {
    id: "prod_002",
    slug: "ceramic-planter-set",
    name: "Ceramic Planter Set",
    price: 8900, // $89.00
    image: "/products/planter-set.svg",
    description: "Set of three handmade ceramic planters in varying sizes. Matte white finish with drainage holes. Ideal for succulents and small plants.",
    sku: "PLNT-CER-SET3",
  },
  {
    id: "prod_003",
    slug: "minimalist-floor-lamp",
    name: "Minimalist Floor Lamp",
    price: 22500, // $225.00
    image: "/products/floor-lamp.svg",
    description: "Sleek floor lamp with adjustable height and dimmable LED bulb. Matte black finish with brass accents. Energy efficient and modern design.",
    options: [
      {
        id: "finish",
        name: "Finish",
        values: [
          { id: "black", label: "Matte Black" },
          { id: "brass", label: "Brushed Brass" },
          { id: "white", label: "Pure White" },
        ],
      },
    ],
    sku: "LAMP-FLR-MIN",
  },
  {
    id: "prod_004",
    slug: "linen-throw-pillows",
    name: "Linen Throw Pillows",
    price: 6500, // $65.00
    image: "/products/throw-pillows.svg",
    description: "Set of two premium linen throw pillows. Natural texture with hidden zipper closure. Machine washable covers with hypoallergenic filling.",
    options: [
      {
        id: "color",
        name: "Color",
        values: [
          { id: "natural", label: "Natural Linen" },
          { id: "sage", label: "Sage Green" },
          { id: "charcoal", label: "Charcoal Grey" },
          { id: "rust", label: "Rust Orange" },
        ],
      },
    ],
    sku: "PILL-LIN-002",
  },
  {
    id: "prod_005",
    slug: "walnut-side-table",
    name: "Walnut Side Table",
    price: 32500, // $325.00
    image: "/products/side-table.svg",
    description: "Solid walnut side table with mid-century modern design. Features tapered legs and a small drawer for storage. Hand-finished with natural oil.",
    sku: "TBL-WAL-SIDE",
  },
  {
    id: "prod_006",
    slug: "geometric-wall-art",
    name: "Geometric Wall Art",
    price: 12500, // $125.00
    image: "/products/wall-art.svg",
    description: "Abstract geometric print in a minimalist style. Museum-quality giclée print on archival paper. Available framed or unframed.",
    options: [
      {
        id: "frame",
        name: "Frame",
        values: [
          { id: "unframed", label: "Unframed" },
          { id: "oak", label: "Oak Frame" },
          { id: "black", label: "Black Frame" },
          { id: "white", label: "White Frame" },
        ],
      },
    ],
    sku: "ART-GEO-001",
  },
  {
    id: "prod_007",
    slug: "marble-coasters",
    name: "Marble Coasters",
    price: 4500, // $45.00
    image: "/products/coasters.svg",
    description: "Set of four genuine marble coasters with cork backing. Each piece features unique natural veining. Protects surfaces while adding elegance.",
    sku: "CSTR-MRB-004",
  },
  {
    id: "prod_008",
    slug: "woven-storage-basket",
    name: "Woven Storage Basket",
    price: 7800, // $78.00
    image: "/products/storage-basket.svg",
    description: "Handwoven seagrass storage basket with sturdy handles. Perfect for blankets, toys, or laundry. Natural color complements any decor.",
    options: [
      {
        id: "size",
        name: "Size",
        values: [
          { id: "small", label: "Small (12\" diameter)" },
          { id: "medium", label: "Medium (16\" diameter)" },
          { id: "large", label: "Large (20\" diameter)" },
        ],
      },
    ],
    sku: "BSKT-WVN-001",
  },
  {
    id: "prod_009",
    slug: "copper-pendant-light",
    name: "Copper Pendant Light",
    price: 18900, // $189.00
    image: "/products/pendant-light.svg",
    description: "Hammered copper pendant light with adjustable cord length. Warm metallic finish adds industrial charm. E26 bulb compatible.",
    sku: "LAMP-PND-CPR",
  },
  {
    id: "prod_010",
    slug: "organic-cotton-blanket",
    name: "Organic Cotton Blanket",
    price: 12000, // $120.00
    image: "/products/cotton-blanket.svg",
    description: "Luxuriously soft organic cotton blanket. Breathable waffle weave perfect for all seasons. Pre-washed for extra softness.",
    options: [
      {
        id: "color",
        name: "Color",
        values: [
          { id: "cream", label: "Cream" },
          { id: "grey", label: "Stone Grey" },
          { id: "navy", label: "Navy Blue" },
          { id: "olive", label: "Olive Green" },
        ],
      },
    ],
    sku: "BLKT-COT-ORG",
  },
  {
    id: "prod_011",
    slug: "terracotta-vase",
    name: "Terracotta Vase",
    price: 5600, // $56.00
    image: "/products/terracotta-vase.svg",
    description: "Hand-thrown terracotta vase with organic shape. Natural clay finish with subtle glaze. Perfect for dried flowers or as standalone decor.",
    sku: "VASE-TER-001",
  },
  {
    id: "prod_012",
    slug: "modern-bookends",
    name: "Modern Bookends",
    price: 8500, // $85.00
    image: "/products/bookends.svg",
    description: "Sculptural bookends in powder-coated steel. Minimalist design keeps books organized in style. Non-slip base protects furniture.",
    options: [
      {
        id: "color",
        name: "Color",
        values: [
          { id: "black", label: "Matte Black" },
          { id: "white", label: "Matte White" },
          { id: "sage", label: "Sage Green" },
        ],
      },
    ],
    sku: "BOOK-END-MOD",
  },
];