
export interface Product {
  id: string;
  title: string;
  name: string;
  category: string;
  subcategory?: string;   // 👈 new field
  description?: string;
  price: number;
  stock: number;
  images: string[];
  type: 'sale' | 'rental';
  isFeatured?: boolean;
  highlightedName?: string;
  serviceType:string
}


export interface CategoryNode {
  name: string;
  children?: CategoryNode[];
}

export interface Order {
  id: string;
  userId: string;
  items: Product[];
  total: number;
  date: Date;
  type: 'purchase' | 'rental';
  status: 'Pending' | 'Confirmed' | 'Delivered';
}

export interface Booking {
  id: string;
  userId: string;
  eventType: string;
  date: Date;
  address: string;
  notes?: string;
  packageId?: string;
}

export interface EventPackage {
  id: string;
  name: string;
  type: string;
  image: string;
  price: number;
  isPopular?: boolean;
  discount?: number;
  features?: string[];
}


