import { ShopifyProduct, ShopifyCollection, CiglissimeProduct } from '@/types/shopify';
import {
  GET_PRODUCTS_QUERY,
  GET_PRODUCT_BY_HANDLE_QUERY,
  GET_COLLECTIONS_QUERY,
  GET_COLLECTION_BY_HANDLE_QUERY,
} from './shopify-queries';

const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN || '';
const SHOPIFY_STOREFRONT_ACCESS_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || '';
const SHOPIFY_COUNTRY = (process.env.NEXT_PUBLIC_SHOPIFY_COUNTRY as CountryCode) || 'IT';
const SHOPIFY_LANGUAGE = (process.env.NEXT_PUBLIC_SHOPIFY_LANGUAGE as LanguageCode) || 'IT';

const SHOPIFY_GRAPHQL_URL = `https://${SHOPIFY_DOMAIN}/api/2025-01/graphql.json`;

// Types for internationalization
type CountryCode = 'IT' | 'US' | 'GB' | 'FR' | 'DE' | 'ES';
type LanguageCode = 'IT' | 'EN' | 'FR' | 'DE' | 'ES';

interface ShopifyResponse<T> {
  data: T;
  errors?: Array<{ message: string }>;
}

async function shopifyFetch<T>({
  query,
  variables = {},
  cache = 'force-cache',
  revalidate = 3600,
}: {
  query: string;
  variables?: Record<string, unknown>;
  cache?: RequestCache;
  revalidate?: number | false;
}): Promise<T> {
  // Validate configuration
  if (!SHOPIFY_DOMAIN) {
    throw new Error('NEXT_PUBLIC_SHOPIFY_DOMAIN is not configured');
  }
  if (!SHOPIFY_STOREFRONT_ACCESS_TOKEN) {
    throw new Error('NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN is not configured');
  }

  // Add country and language to variables if not present
  const enhancedVariables = {
    country: SHOPIFY_COUNTRY,
    language: SHOPIFY_LANGUAGE,
    ...variables,
  };

  try {
    const response = await fetch(SHOPIFY_GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN,
      },
      body: JSON.stringify({
        query,
        variables: enhancedVariables
      }),
      cache,
      next: revalidate !== false ? { revalidate } : undefined,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Shopify API error (${response.status}): ${errorText}`);
    }

    const result: ShopifyResponse<T> = await response.json();

    if (result.errors) {
      throw new Error(`Shopify GraphQL errors: ${result.errors.map(e => e.message).join(', ')}`);
    }

    if (!result.data) {
      throw new Error('No data returned from Shopify API');
    }

    return result.data;
  } catch (error) {
    console.error('Shopify fetch error:', error);
    throw error;
  }
}

// Transform Shopify product to our extended format
function transformToCiglissimeProduct(product: ShopifyProduct): CiglissimeProduct {
  return {
    ...product,
    category: product.tags.includes('press-go') ? 'press-go' : 
              product.tags.includes('regular') ? 'regular' : 'accessories',
    featured: product.tags.includes('featured'),
    reviewCount: Math.floor(Math.random() * 5000) + 100, // Mock data
    rating: 4.8, // Mock data
    benefits: [
      'Adesive, non hanno bisogno di colla',
      'Risultati da salone',
      'Sguardo impeccabile anche appena sveglia',
      'Facili da applicare in pochi secondi',
      'Resistenti all\'acqua'
    ],
    kitContents: [
      '27 ciuffetti di Extension Ciglia',
      '1 pinzetta di precisione',
      '1 piegaciglia',
      '1 pettinino in OMAGGIO'
    ],
    ingredients: 'Polyisobutene, Hydrogenated styrene/butadiene copolymer, Acrylates/c10-30 alkyl Acrylate Crosspolymer',
    duration: '3-10 giorni',
    isKit: product.title.toLowerCase().includes('kit'),
  };
}

export async function getProducts(first = 20, query?: string): Promise<CiglissimeProduct[]> {
  try {
    const data = await shopifyFetch<{
      products: {
        edges: Array<{ node: ShopifyProduct }>;
      };
    }>({
      query: GET_PRODUCTS_QUERY,
      variables: { first, query },
      revalidate: 3600, // Cache for 1 hour
    });

    return data.products.edges.map(({ node }) => transformToCiglissimeProduct(node));
  } catch (error) {
    console.error('Error fetching products:', error);
    // Return empty array instead of failing completely
    return [];
  }
}

export async function getProductByHandle(handle: string): Promise<CiglissimeProduct | null> {
  try {
    const data = await shopifyFetch<{
      productByHandle: ShopifyProduct;
    }>({
      query: GET_PRODUCT_BY_HANDLE_QUERY,
      variables: { handle },
    });

    if (!data.productByHandle) {
      return null;
    }

    return transformToCiglissimeProduct(data.productByHandle);
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export async function getCollections(): Promise<ShopifyCollection[]> {
  try {
    const data = await shopifyFetch<{
      collections: {
        edges: Array<{ node: ShopifyCollection }>;
      };
    }>({
      query: GET_COLLECTIONS_QUERY,
      variables: { first: 10 },
    });

    return data.collections.edges.map(({ node }) => node);
  } catch (error) {
    console.error('Error fetching collections:', error);
    return [];
  }
}

export async function getCollectionByHandle(handle: string): Promise<ShopifyCollection | null> {
  try {
    const data = await shopifyFetch<{
      collectionByHandle: ShopifyCollection;
    }>({
      query: GET_COLLECTION_BY_HANDLE_QUERY,
      variables: { handle, first: 20 },
    });

    return data.collectionByHandle || null;
  } catch (error) {
    console.error('Error fetching collection:', error);
    return null;
  }
}

// Get featured products (products with 'featured' tag)
export async function getFeaturedProducts(first = 8): Promise<CiglissimeProduct[]> {
  try {
    // Try to get products with 'featured' tag first
    let products = await getProducts(first, 'tag:featured');

    // If no featured products, get the latest products
    if (products.length === 0) {
      console.warn('No featured products found, fetching latest products');
      products = await getProducts(first);
    }

    return products;
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return [];
  }
}