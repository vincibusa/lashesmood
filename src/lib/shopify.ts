import {
	ShopifyProduct,
	ShopifyCollection,
	LashesmoodProduct,
	ShopifyCart,
	CustomerCreateResponse,
	CustomerAccessTokenCreateResponse,
	CustomerAccessTokenRenewResponse,
	CustomerAccessTokenDeleteResponse,
	ShopifyCustomerOrdersResponse,
	ShopifyCustomerOrdersQueryVariables,
	ShopifyCustomerOrderQueryVariables,
	ShopifyCustomerOrderQueryResponse,
	ShopifyImage,
	ShopPolicy,
	ShopPolicyPage,
	PagesResponse,
	PageResponse,
} from '@/types/shopify';
import {
  GET_PRODUCTS_QUERY,
  GET_PRODUCT_BY_HANDLE_QUERY,
  GET_COLLECTIONS_QUERY,
  GET_COLLECTION_BY_HANDLE_QUERY,
  CREATE_CART_MUTATION,
  ADD_TO_CART_MUTATION,
  UPDATE_CART_LINES_MUTATION,
  REMOVE_FROM_CART_MUTATION,
	GET_CART_QUERY,
	CUSTOMER_CREATE_MUTATION,
	CUSTOMER_ACCESS_TOKEN_CREATE_MUTATION,
	CUSTOMER_ACCESS_TOKEN_RENEW_MUTATION,
	CUSTOMER_ACCESS_TOKEN_DELETE_MUTATION,
	GET_CUSTOMER_ORDERS_QUERY,
	GET_CUSTOMER_ORDER_QUERY,
	GET_PAGES_QUERY,
	GET_PAGE_BY_HANDLE_QUERY,
} from './shopify-queries';

export interface ShopifyError {
	message: string;
}

const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN || '';
const SHOPIFY_STOREFRONT_ACCESS_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || '';
const SHOPIFY_API_VERSION = process.env.NEXT_PUBLIC_SHOPIFY_API_VERSION || '2024-10';
const SHOPIFY_COUNTRY = (process.env.NEXT_PUBLIC_SHOPIFY_COUNTRY as CountryCode) || 'IT';
const SHOPIFY_LANGUAGE = (process.env.NEXT_PUBLIC_SHOPIFY_LANGUAGE as LanguageCode) || 'IT';

const SHOPIFY_GRAPHQL_URL = `https://${SHOPIFY_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;

// Types for internationalization
type CountryCode = 'IT' | 'US' | 'GB' | 'FR' | 'DE' | 'ES';
type LanguageCode = 'IT' | 'EN' | 'FR' | 'DE' | 'ES';

interface ShopifyResponse<T> {
  data: T;
  errors?: Array<{ message: string }>;
}

// Interfaces for raw Shopify API data
interface RawShopifyImage {
  id: string;
  url: string;
  altText?: string;
  width: number;
  height: number;
}

interface RawShopifyVariant {
  id: string;
  title: string;
  price: {
    amount: string;
    currencyCode: string;
  };
  compareAtPrice?: {
    amount: string;
    currencyCode: string;
  };
  availableForSale: boolean;
  quantityAvailable?: number;
  selectedOptions: {
    name: string;
    value: string;
  }[];
}

interface RawShopifyProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  vendor: string;
  productType: string;
  tags: string[];
  images?: {
    edges: Array<{ node: RawShopifyImage }>;
  };
  variants?: {
    edges: Array<{ node: RawShopifyVariant }>;
  };
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
    maxVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  compareAtPriceRange?: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
    maxVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
}

async function shopifyFetch<T>({
	query,
	variables = {},
	cache = 'force-cache',
	revalidate = 3600,
	includeContext = true,
}: {
	query: string;
	variables?: Record<string, unknown>;
	cache?: RequestCache;
	revalidate?: number | false;
	includeContext?: boolean;
}): Promise<T> {
  // Validate configuration
  if (!SHOPIFY_DOMAIN) {
    throw new Error('NEXT_PUBLIC_SHOPIFY_DOMAIN is not configured');
  }
  if (!SHOPIFY_STOREFRONT_ACCESS_TOKEN) {
    throw new Error('NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN is not configured');
  }

  // Add country and language to variables if not present
	const enhancedVariables = includeContext
		? {
			country: SHOPIFY_COUNTRY,
			language: SHOPIFY_LANGUAGE,
			...variables,
		  }
		: variables;

  try {
    // Determine if it's a private token and use the correct header
    const isPrivateToken = SHOPIFY_STOREFRONT_ACCESS_TOKEN.startsWith('shpat_');
    const tokenHeaderName = isPrivateToken 
      ? 'Shopify-Storefront-Private-Token' 
      : 'X-Shopify-Storefront-Access-Token';

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      [tokenHeaderName]: SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    };

    const response = await fetch(SHOPIFY_GRAPHQL_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query,
        variables: enhancedVariables
      }),
      cache,
      next: revalidate !== false ? { revalidate } : undefined,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ [Shopify] HTTP error:', {
        status: response.status,
        statusText: response.statusText,
        errorText,
      });
      throw new Error(`Shopify API error (${response.status}): ${errorText}`);
    }

    const result: ShopifyResponse<T> = await response.json();

    if (result.errors) {
      console.error('❌ [Shopify] GraphQL errors:', result.errors);
      throw new Error(`Shopify GraphQL errors: ${result.errors.map(e => e.message).join(', ')}`);
    }

    if (!result.data) {
      console.error('❌ [Shopify] No data in response:', result);
      throw new Error('No data returned from Shopify API');
    }

    return result.data;
  } catch (error) {
    console.error('💥 [Shopify] Fetch error:', error);
    throw error;
  }
}

// Transform raw Shopify API response to our ShopifyProduct format
function transformShopifyProductData(rawProduct: RawShopifyProduct): ShopifyProduct {
  console.log('🔍 RAW PRODUCT DATA:', {
    title: rawProduct.title,
    rawImages: rawProduct.images,
    imagesEdges: rawProduct.images?.edges,
  });

  const transformedImages: ShopifyImage[] = rawProduct.images?.edges?.map((edge) => edge.node) || [];
  
  console.log('✅ TRANSFORMED IMAGES:', transformedImages);

  return {
    id: rawProduct.id,
    title: rawProduct.title,
    handle: rawProduct.handle,
    description: rawProduct.description,
    vendor: rawProduct.vendor,
    productType: rawProduct.productType,
    tags: rawProduct.tags,
    images: transformedImages,
    variants: rawProduct.variants?.edges?.map((edge) => edge.node) || [],
    priceRange: rawProduct.priceRange,
    compareAtPriceRange: rawProduct.compareAtPriceRange,
  };
}

// Transform Shopify product to our extended format
function transformToLashesmoodProduct(product: ShopifyProduct): LashesmoodProduct {
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

export async function getProducts(first = 20, query?: string): Promise<LashesmoodProduct[]> {
  try {
    const data = await shopifyFetch<{
      products: {
        edges: Array<{ node: RawShopifyProduct }>;
      };
    }>({
      query: GET_PRODUCTS_QUERY,
      variables: { first, query },
      revalidate: 3600, // Cache for 1 hour
    });

    console.log('📦 FETCHED PRODUCTS:', data.products.edges.length);

    return data.products.edges.map(({ node }) => {
      const product = transformShopifyProductData(node);
      const lashesmoodProduct = transformToLashesmoodProduct(product);
      
      console.log('🎁 FINAL PRODUCT:', {
        title: lashesmoodProduct.title,
        images: lashesmoodProduct.images,
      });
      
      return lashesmoodProduct;
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    // Return empty array instead of failing completely
    return [];
  }
}

export async function getProductByHandle(handle: string): Promise<LashesmoodProduct | null> {
  try {
    const data = await shopifyFetch<{
      productByHandle: RawShopifyProduct | null;
    }>({
      query: GET_PRODUCT_BY_HANDLE_QUERY,
      variables: { handle },
    });

    if (!data.productByHandle) {
      return null;
    }

    const product = transformShopifyProductData(data.productByHandle);
    return transformToLashesmoodProduct(product);
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
      collectionByHandle: {
        id: string;
        title: string;
        handle: string;
        description: string;
        image?: ShopifyImage;
        products: {
          edges: Array<{ node: RawShopifyProduct }>;
        };
      } | null;
    }>({
      query: GET_COLLECTION_BY_HANDLE_QUERY,
      variables: { handle, first: 20 },
    });

    if (!data.collectionByHandle) {
      return null;
    }

    // Transform products to LashesmoodProduct format
    const transformedProducts = data.collectionByHandle.products.edges.map(({ node }) => {
      const product = transformShopifyProductData(node);
      return transformToLashesmoodProduct(product);
    });

    return {
      ...data.collectionByHandle,
      products: {
        edges: transformedProducts.map((product) => ({ node: product })),
      },
    };
  } catch (error) {
    console.error('Error fetching collection:', error);
    return null;
  }
}

// Get featured products (products with 'featured' tag)
export async function getFeaturedProducts(first = 8): Promise<LashesmoodProduct[]> {
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

// Cart API functions
export async function createCart(variantId: string, quantity: number): Promise<ShopifyCart> {
  const data = await shopifyFetch<{
    cartCreate: {
      cart: ShopifyCart;
      userErrors: Array<{ field: string; message: string }>;
    };
  }>({
    query: CREATE_CART_MUTATION,
    variables: {
      input: {
        lines: [{ merchandiseId: variantId, quantity }],
      },
    },
    cache: 'no-store',
  });

  if (data.cartCreate.userErrors.length > 0) {
    throw new Error(data.cartCreate.userErrors[0].message);
  }

  return data.cartCreate.cart;
}

export async function addToCart(cartId: string, variantId: string, quantity: number): Promise<ShopifyCart> {
  const data = await shopifyFetch<{
    cartLinesAdd: {
      cart: ShopifyCart;
      userErrors: Array<{ field: string; message: string }>;
    };
  }>({
    query: ADD_TO_CART_MUTATION,
    variables: {
      cartId,
      lines: [{ merchandiseId: variantId, quantity }],
    },
    cache: 'no-store',
  });

  if (data.cartLinesAdd.userErrors.length > 0) {
    throw new Error(data.cartLinesAdd.userErrors[0].message);
  }

  return data.cartLinesAdd.cart;
}

export async function updateCartLines(cartId: string, lineId: string, quantity: number): Promise<ShopifyCart> {
  const data = await shopifyFetch<{
    cartLinesUpdate: {
      cart: ShopifyCart;
      userErrors: Array<{ field: string; message: string }>;
    };
  }>({
    query: UPDATE_CART_LINES_MUTATION,
    variables: {
      cartId,
      lines: [{ id: lineId, quantity }],
    },
    cache: 'no-store',
  });

  if (data.cartLinesUpdate.userErrors.length > 0) {
    throw new Error(data.cartLinesUpdate.userErrors[0].message);
  }

  return data.cartLinesUpdate.cart;
}

export async function removeFromCart(cartId: string, lineIds: string[]): Promise<ShopifyCart> {
  const data = await shopifyFetch<{
    cartLinesRemove: {
      cart: ShopifyCart;
      userErrors: Array<{ field: string; message: string }>;
    };
  }>({
    query: REMOVE_FROM_CART_MUTATION,
    variables: {
      cartId,
      lineIds,
    },
    cache: 'no-store',
  });

  if (data.cartLinesRemove.userErrors.length > 0) {
    throw new Error(data.cartLinesRemove.userErrors[0].message);
  }

  return data.cartLinesRemove.cart;
}

export async function getCart(cartId: string): Promise<ShopifyCart | null> {
  try {
    const data = await shopifyFetch<{
      cart: ShopifyCart;
    }>({
      query: GET_CART_QUERY,
      variables: { cartId },
      cache: 'no-store',
    });

    return data.cart;
  } catch (error) {
    console.error('Error fetching cart:', error);
    return null;
  }
}

export async function createCustomer(
  email: string,
  password: string,
  firstName?: string,
  lastName?: string,
): Promise<CustomerCreateResponse['customerCreate']> {
  console.log('🔄 [Shopify] createCustomer called with:', {
    email,
    hasPassword: !!password,
    firstName,
    lastName,
  });

  const data = await shopifyFetch<CustomerCreateResponse>({
    query: CUSTOMER_CREATE_MUTATION,
    variables: {
      input: {
        email,
        password,
        firstName,
        lastName,
      },
    },
    cache: 'no-store',
    includeContext: false,
  });

  console.log('📦 [Shopify] createCustomer response:', JSON.stringify(data, null, 2));

  return data.customerCreate;
}

export async function createCustomerAccessToken(
  email: string,
  password: string,
): Promise<CustomerAccessTokenCreateResponse['customerAccessTokenCreate']> {
  console.log('🔄 [Shopify] createCustomerAccessToken called with:', {
    email,
    hasPassword: !!password,
  });

  const data = await shopifyFetch<CustomerAccessTokenCreateResponse>({
    query: CUSTOMER_ACCESS_TOKEN_CREATE_MUTATION,
    variables: {
      input: {
        email,
        password,
      },
    },
    cache: 'no-store',
    includeContext: false,
  });

  console.log('📦 [Shopify] createCustomerAccessToken response:', JSON.stringify(data, null, 2));

  return data.customerAccessTokenCreate;
}

export async function renewCustomerAccessToken(
  customerAccessToken: string,
): Promise<CustomerAccessTokenRenewResponse['customerAccessTokenRenew']> {
  const data = await shopifyFetch<CustomerAccessTokenRenewResponse>({
    query: CUSTOMER_ACCESS_TOKEN_RENEW_MUTATION,
    variables: { customerAccessToken },
    cache: 'no-store',
    includeContext: false,
  });

  return data.customerAccessTokenRenew;
}

export async function deleteCustomerAccessToken(
  customerAccessToken: string,
): Promise<CustomerAccessTokenDeleteResponse['customerAccessTokenDelete']> {
  const data = await shopifyFetch<CustomerAccessTokenDeleteResponse>({
    query: CUSTOMER_ACCESS_TOKEN_DELETE_MUTATION,
    variables: { customerAccessToken },
    cache: 'no-store',
    includeContext: false,
  });

  return data.customerAccessTokenDelete;
}

export async function getCustomerOrders(
	variables: ShopifyCustomerOrdersQueryVariables,
): Promise<ShopifyCustomerOrdersResponse['customer']> {
	const data = await shopifyFetch<ShopifyCustomerOrdersResponse>({
		query: GET_CUSTOMER_ORDERS_QUERY,
		variables,
		cache: 'no-store',
		includeContext: false,
	});

	return data.customer;
}

export async function getCustomerOrderById(
	variables: ShopifyCustomerOrderQueryVariables,
): Promise<ShopifyCustomerOrderQueryResponse> {
	const data = await shopifyFetch<ShopifyCustomerOrderQueryResponse>({
		query: GET_CUSTOMER_ORDER_QUERY,
		variables,
		cache: 'no-store',
		includeContext: false,
	});

	return data;
}

export async function getShopPolicies(): Promise<ShopPolicy[]> {
	try {
		// Try to fetch policy pages by querying for common policy handles
		const policyHandles = [
			'privacy-policy',
			'privacy',
			'refund-policy',
			'refund',
			'shipping-policy',
			'shipping',
			'terms-of-service',
			'terms',
			'politica-privacy',
			'politica-reso',
			'politica-spedizione',
			'termini-condizioni',
		];

		// Fetch all pages and filter for policy-related ones
		const data = await shopifyFetch<PagesResponse>({
			query: GET_PAGES_QUERY,
			variables: { first: 50 },
			revalidate: 3600, // Cache for 1 hour
		});

		// Filter pages that match policy handles or contain policy-related keywords
		const policyPages = data.pages.edges
			.map((edge) => edge.node)
			.filter((page) => {
				const handle = page.handle.toLowerCase();
				return (
					policyHandles.some((ph) => handle.includes(ph)) ||
					page.title.toLowerCase().includes('privacy') ||
					page.title.toLowerCase().includes('reso') ||
					page.title.toLowerCase().includes('spedizione') ||
					page.title.toLowerCase().includes('termini') ||
					page.title.toLowerCase().includes('condizioni')
				);
			});

		return policyPages.map((page) => ({
			id: page.id,
			title: page.title,
			body: page.body,
			handle: page.handle,
		}));
	} catch (error) {
		console.error('Error fetching shop policies:', error);
		return [];
	}
}

export async function getShopPolicyByHandle(handle: string): Promise<ShopPolicy | null> {
	try {
		// Map common policy handles to possible Shopify page handles
		const handleMap: Record<string, string[]> = {
			'privacy-policy': ['privacy-policy', 'privacy', 'politica-privacy', 'informativa-privacy'],
			'refund-policy': ['refund-policy', 'refund', 'politica-reso', 'reso'],
			'shipping-policy': ['shipping-policy', 'shipping', 'politica-spedizione', 'spedizione'],
			'terms-of-service': ['terms-of-service', 'terms', 'termini-condizioni', 'termini'],
		};

		const normalizedHandle = handle.toLowerCase();
		const possibleHandles = handleMap[normalizedHandle] || [normalizedHandle];

		// Try each possible handle
		for (const possibleHandle of possibleHandles) {
			try {
				const data = await shopifyFetch<PageResponse>({
					query: GET_PAGE_BY_HANDLE_QUERY,
					variables: { handle: possibleHandle },
					revalidate: 3600,
				});

				if (data.pageByHandle) {
					return {
						id: data.pageByHandle.id,
						title: data.pageByHandle.title,
						body: data.pageByHandle.body,
						handle: data.pageByHandle.handle,
					};
				}
			} catch (err) {
				// Continue to next handle if this one fails
				continue;
			}
		}

		// If direct lookup fails, try fetching all policies and filtering
		const policies = await getShopPolicies();
		return policies.find((p) => p.handle.toLowerCase() === normalizedHandle) || null;
	} catch (error) {
		console.error('Error fetching shop policy:', error);
		return null;
	}
}