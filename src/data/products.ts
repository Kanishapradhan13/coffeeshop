export interface Product {
  id: number;
  name: string;
  origin: string;
  category: string;
  price: number;
  weight: string;
  roast: string;
  description: string;
  notes: string[];
  image: string;
  rating: number;
  inStock: boolean;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Ethiopian Yirgacheffe",
    origin: "Ethiopia",
    category: "Single Origin",
    price: 18.50,
    weight: "250g",
    roast: "Light",
    description: "A bright and complex coffee from the birthplace of coffee. Grown at high elevations in the Yirgacheffe region, this lot delivers an extraordinary cup with floral aromatics and a silky body.",
    notes: ["Blueberry", "Jasmine", "Citrus Zest", "Honey"],
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&h=600&fit=crop&crop=center",
    rating: 4.9,
    inStock: true
  },
  {
    id: 2,
    name: "Colombian Supremo",
    origin: "Colombia",
    category: "Single Origin",
    price: 16.00,
    weight: "250g",
    roast: "Medium",
    description: "From the lush mountains of Huila, this Supremo grade bean offers a perfectly balanced cup. Smooth, sweet, and incredibly versatile — ideal for any brewing method.",
    notes: ["Caramel", "Red Apple", "Milk Chocolate", "Walnut"],
    image: "https://images.unsplash.com/photo-1587734195503-904fca47e0e9?w=600&h=600&fit=crop&crop=center",
    rating: 4.7,
    inStock: true
  },
  {
    id: 3,
    name: "Midnight Velvet Blend",
    origin: "Brazil & Indonesia",
    category: "Blend",
    price: 15.00,
    weight: "250g",
    roast: "Dark",
    description: "Our signature dark roast blend combines the chocolate richness of Brazilian beans with the earthy depth of Sumatran Mandheling. Bold, full-bodied, and deeply satisfying.",
    notes: ["Dark Chocolate", "Smoky Oak", "Brown Sugar", "Tobacco"],
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefda?w=600&h=600&fit=crop&crop=center",
    rating: 4.6,
    inStock: true
  },
  {
    id: 4,
    name: "Kenya AA Nyeri",
    origin: "Kenya",
    category: "Single Origin",
    price: 21.00,
    weight: "250g",
    roast: "Medium-Light",
    description: "A premium AA grade from the renowned Nyeri county. This coffee is washed and sun-dried, producing a wine-like acidity with intense fruit flavors and a sparkling finish.",
    notes: ["Blackcurrant", "Grapefruit", "Tomato", "Brown Sugar"],
    image: "https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?w=600&h=600&fit=crop&crop=center",
    rating: 4.8,
    inStock: true
  },
  {
    id: 5,
    name: "Morning Ritual Blend",
    origin: "Central America",
    category: "Blend",
    price: 14.50,
    weight: "250g",
    roast: "Medium",
    description: "Crafted for your daily ritual. This smooth, approachable blend combines Guatemalan and Costa Rican beans for a clean, balanced cup that's perfect every morning.",
    notes: ["Hazelnut", "Vanilla", "Toffee", "Orange Peel"],
    image: "https://images.unsplash.com/photo-1498804103079-a6351b050096?w=600&h=600&fit=crop&crop=center",
    rating: 4.5,
    inStock: true
  },
  {
    id: 6,
    name: "Decaf Sunset Reserve",
    origin: "Mexico",
    category: "Decaf",
    price: 17.00,
    weight: "250g",
    roast: "Medium",
    description: "Swiss Water Process decaffeination preserves the full flavor of these carefully selected Mexican beans. Enjoy a rich, flavorful cup any time of day without the caffeine.",
    notes: ["Cocoa", "Cinnamon", "Dried Fig", "Maple"],
    image: "https://images.unsplash.com/photo-1442550528053-c431ecb55509?w=600&h=600&fit=crop&crop=center",
    rating: 4.4,
    inStock: true
  }
];

export const categories = ["All", "Single Origin", "Blend", "Decaf"];
