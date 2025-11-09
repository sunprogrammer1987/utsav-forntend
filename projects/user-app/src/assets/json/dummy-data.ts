// 🌟 Dummy Category, Subcategory & Product Data with Real Image URLs

export const categories = [
  {
    _id: 'cat1',
    name: 'Chairs',
    slug: 'chairs',
    image: 'https://images.unsplash.com/photo-1582582424041-3a31a5e7e0d3?auto=format&fit=crop&w=800&q=80',
    children: [
      {
        _id: 'sub1',
        name: 'Plastic Chairs',
        slug: 'plastic-chairs',
        image: 'https://images.unsplash.com/photo-1608152759125-c2c3e04543b1?auto=format&fit=crop&w=800&q=80'
      },
      {
        _id: 'sub2',
        name: 'Metal Chairs',
        slug: 'metal-chairs',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
      }
    ]
  },
  {
    _id: 'cat2',
    name: 'Tables',
    slug: 'tables',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4df57?auto=format&fit=crop&w=800&q=80',
    children: [
      {
        _id: 'sub3',
        name: 'Banquet Tables',
        slug: 'banquet-tables',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80'
      },
      {
        _id: 'sub4',
        name: 'Dining Tables',
        slug: 'dining-tables',
        image: 'https://images.unsplash.com/photo-1600585154363-1e04c0f87d42?auto=format&fit=crop&w=800&q=80'
      }
    ]
  },
  {
    _id: 'cat3',
    name: 'Tents',
    slug: 'tents',
    image: 'https://images.unsplash.com/photo-1527261834078-9b37d3f2f5ab?auto=format&fit=crop&w=800&q=80',
    children: [
      {
        _id: 'sub5',
        name: 'Canopy Tents',
        slug: 'canopy-tents',
        image: 'https://images.unsplash.com/photo-1593642532973-d31b6557fa68?auto=format&fit=crop&w=800&q=80'
      },
      {
        _id: 'sub6',
        name: 'Pagoda Tents',
        slug: 'pagoda-tents',
        image: 'https://images.unsplash.com/photo-1615895587911-927b0c798c5b?auto=format&fit=crop&w=800&q=80'
      }
    ]
  },
  {
    _id: 'cat4',
    name: 'Lights',
    slug: 'lights',
    image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=800&q=80',
    children: [
      {
        _id: 'sub7',
        name: 'Decoration Lights',
        slug: 'decoration-lights',
        image: 'https://images.unsplash.com/photo-1503424886300-4d4a2a9dc4d0?auto=format&fit=crop&w=800&q=80'
      },
      {
        _id: 'sub8',
        name: 'Stage Lights',
        slug: 'stage-lights',
        image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981d?auto=format&fit=crop&w=800&q=80'
      }
    ]
  },
  {
    _id: 'cat5',
    name: 'Sofa & Decor',
    slug: 'sofa-decor',
    image: 'https://images.unsplash.com/photo-1598300053650-4b4e88e7f8c1?auto=format&fit=crop&w=800&q=80',
    children: [
      {
        _id: 'sub9',
        name: 'Butterfly Sofa',
        slug: 'butterfly-sofa',
        image: 'https://images.unsplash.com/photo-1582582424041-3a31a5e7e0d3?auto=format&fit=crop&w=800&q=80'
      },
      {
        _id: 'sub10',
        name: 'Royal Sofa',
        slug: 'royal-sofa',
        image: 'https://images.unsplash.com/photo-1625241660430-12d8e51a9ee1?auto=format&fit=crop&w=800&q=80'
      }
    ]
  }
];

export const products = [
  {
    _id: 'p1',
    title: 'White Plastic Chair',
    slug: 'white-plastic-chair',
    description: 'Durable white plastic chair suitable for all events and occasions.',
    price: 120,
    salePrice: 100,
    discount: 16.6,
    stock: 50,
    images: ['https://images.unsplash.com/photo-1608152759125-c2c3e04543b1?auto=format&fit=crop&w=800&q=80'],
    category: 'Plastic Chairs',
    tags: ['chair', 'plastic', 'event'],
    ratings: 4.5,
    reviewsCount: 12,
    isFeatured: true
  },
  {
    _id: 'p2',
    title: 'Metal Frame Chair',
    slug: 'metal-frame-chair',
    description: 'Premium metal frame chair for weddings, banquets, and parties.',
    price: 250,
    salePrice: 230,
    discount: 8,
    stock: 30,
    images: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'],
    category: 'Metal Chairs',
    tags: ['chair', 'metal', 'rental'],
    ratings: 4.2,
    reviewsCount: 8,
    isFeatured: false
  },
  {
    _id: 'p3',
    title: 'Banquet Table Set',
    slug: 'banquet-table-set',
    description: 'Strong, foldable banquet table — ideal for wedding halls and corporate events.',
    price: 700,
    salePrice: 650,
    discount: 7,
    stock: 20,
    images: ['https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80'],
    category: 'Banquet Tables',
    tags: ['table', 'banquet', 'event'],
    ratings: 4.7,
    reviewsCount: 20,
    isFeatured: true
  },
  {
    _id: 'p4',
    title: 'Pagoda Tent Luxury',
    slug: 'pagoda-tent-luxury',
    description: 'Elegant pagoda-style tent ideal for weddings, receptions, and outdoor events.',
    price: 4800,
    salePrice: 4500,
    discount: 6.25,
    stock: 10,
    images: ['https://images.unsplash.com/photo-1615895587911-927b0c798c5b?auto=format&fit=crop&w=800&q=80'],
    category: 'Pagoda Tents',
    tags: ['tent', 'wedding', 'rental'],
    ratings: 4.8,
    reviewsCount: 35,
    isFeatured: true
  },
  {
    _id: 'p5',
    title: 'Stage Lighting Set',
    slug: 'stage-lighting-set',
    description: 'Professional LED stage lighting setup for decoration and concerts.',
    price: 1500,
    salePrice: 1350,
    discount: 10,
    stock: 15,
    images: ['https://images.unsplash.com/photo-1555949963-aa79dcee981d?auto=format&fit=crop&w=800&q=80'],
    category: 'Stage Lights',
    tags: ['lights', 'stage', 'rental'],
    ratings: 4.6,
    reviewsCount: 10,
    isFeatured: false
  },
  {
    _id: 'p6',
    title: 'Royal Velvet Sofa',
    slug: 'royal-velvet-sofa',
    description: 'Luxurious royal velvet sofa for premium wedding stages and lounges.',
    price: 2800,
    salePrice: 2500,
    discount: 10.7,
    stock: 5,
    images: ['https://images.unsplash.com/photo-1625241660430-12d8e51a9ee1?auto=format&fit=crop&w=800&q=80'],
    category: 'Royal Sofa',
    tags: ['sofa', 'decor', 'royal'],
    ratings: 4.9,
    reviewsCount: 40,
    isFeatured: true
  }
];
