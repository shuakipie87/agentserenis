// ============================================
// Shared Types for Meat Shop Application
// ============================================

// --- Enums ---

export type UserRole = 'CUSTOMER' | 'ADMIN';

export type OrderStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'PREPARING'
  | 'READY'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELLED';

export type DeliveryMethod = 'DELIVERY' | 'PICKUP';

// --- User ---

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string | null;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  id: string;
  userId: string;
  label: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
  createdAt: string;
}

// --- Product ---

export interface WeightOption {
  label: string;
  grams: number;
}

export interface NutritionInfo {
  calories?: number;
  protein?: number;
  fat?: number;
  saturatedFat?: number;
  carbohydrates?: number;
  fiber?: number;
  sodium?: number;
  servingSize?: string;
}

export interface ProductImage {
  id: string;
  productId: string;
  url: string;
  alt?: string | null;
  sortOrder: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  categoryId: string;
  category?: Category;
  pricePerKg: number;
  weightOptions: WeightOption[];
  allowCustomWeight: boolean;
  minWeightGrams: number;
  maxWeightGrams: number;
  stockKg: number;
  unit: string;
  pricePerUnit?: number | null;
  images: ProductImage[];
  tags: string[];
  origin?: string | null;
  nutritionInfo?: NutritionInfo | null;
  isActive: boolean;
  isFeatured: boolean;
  isOnSale: boolean;
  salePrice?: number | null;
  averageRating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  image?: string | null;
  sortOrder: number;
  isActive: boolean;
  productCount?: number;
  createdAt: string;
  updatedAt: string;
}

// --- Cart ---

export interface CartItem {
  id: string;
  cartId: string;
  productId: string;
  product?: Product;
  quantity: number;
  weightGrams: number;
  createdAt: string;
}

export interface Cart {
  id: string;
  userId: string;
  items: CartItem[];
  updatedAt: string;
}

// --- Local Cart (Zustand) ---

export interface LocalCartItem {
  productId: string;
  name: string;
  slug: string;
  pricePerKg: number;
  salePrice?: number | null;
  isOnSale: boolean;
  weightGrams: number;
  quantity: number;
  image: string;
  unit: string;
}

// --- Order ---

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  product?: Product;
  productName: string;
  quantity: number;
  weightGrams: number;
  pricePerKg: number;
  lineTotal: number;
  createdAt: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  user?: User;
  addressId?: string | null;
  address?: Address | null;
  status: OrderStatus;
  deliveryMethod: DeliveryMethod;
  deliveryFee: number;
  subtotal: number;
  total: number;
  promoCode?: string | null;
  discount: number;
  specialInstructions?: string | null;
  pickupTime?: string | null;
  deliveryAddress?: Record<string, unknown> | null;
  customerEmail: string;
  customerPhone?: string | null;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
}

// --- Review ---

export interface Review {
  id: string;
  userId: string;
  user?: Pick<User, 'id' | 'firstName' | 'lastName'>;
  productId: string;
  rating: number;
  comment?: string | null;
  isVisible: boolean;
  createdAt: string;
  updatedAt: string;
}

// --- API Response Types ---

export interface ApiResponse<T> {
  data: T;
  meta?: PaginationMeta;
}

export interface PaginationMeta {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

export interface ApiError {
  error: {
    code: string;
    message: string;
    details?: Array<{ field: string; message: string }>;
  };
}

// --- Request Types ---

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface ProductFilters {
  category?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  tags?: string[];
  inStock?: boolean;
  isFeatured?: boolean;
  isOnSale?: boolean;
  sortBy?: 'price_asc' | 'price_desc' | 'name' | 'newest' | 'rating';
  page?: number;
  pageSize?: number;
}

export interface CreateOrderRequest {
  deliveryMethod: DeliveryMethod;
  addressId?: string;
  specialInstructions?: string;
  pickupTime?: string;
  promoCode?: string;
}

export interface UpdateOrderStatusRequest {
  status: OrderStatus;
}

export interface ContactFormRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// --- Dashboard Stats ---

export interface DashboardStats {
  totalOrders: number;
  totalRevenue: number;
  totalCustomers: number;
  totalProducts: number;
  ordersToday: number;
  revenueToday: number;
  recentOrders: Order[];
  topProducts: Array<{
    productId: string;
    productName: string;
    totalSold: number;
    revenue: number;
  }>;
  lowStockProducts: Product[];
  ordersByStatus: Record<OrderStatus, number>;
}
