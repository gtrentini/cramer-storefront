export type ThemeMode = 'vault' | 'gallery' | 'terminal';

export type Category = 'sports-cards' | 'comics' | 'toys';

export type BuyingFormat = 'fixed-price' | 'auction';

export interface GradingDetails {
  company: 'PSA' | 'BGS' | 'SGC' | 'CGC' | 'Raw';
  grade?: number;
  certNumber?: string;
  qualifier?: string;
}

export interface CollectableItem {
  id: string;
  title: string;
  subtitle: string;
  category: Category;
  price: number;
  originalPrice?: number;
  currency: string;
  format: BuyingFormat;
  condition: string;
  grading: GradingDetails;
  imageUrls: string[];
  ebayListingUrl: string;
  itemSpecifics: Record<string, string>;
  featured: boolean;
}
