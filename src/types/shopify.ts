export interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  vendor: string;
  productType: string;
  tags: string[];
  images: ShopifyImage[];
  variants: ShopifyVariant[];
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

export interface ShopifyImage {
  id: string;
  url: string;
  altText?: string;
  width: number;
  height: number;
}

export interface ShopifyVariant {
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

export interface ShopifyCollection {
  id: string;
  title: string;
  handle: string;
  description: string;
  image?: ShopifyImage;
  products: {
    edges: {
      node: ShopifyProduct;
    }[];
  };
}

export interface ShopifyCart {
  id: string;
  checkoutUrl: string;
  lines: {
    edges: {
      node: ShopifyCartLine;
    }[];
  };
  cost: {
    totalAmount: {
      amount: string;
      currencyCode: string;
    };
    subtotalAmount: {
      amount: string;
      currencyCode: string;
    };
    totalTaxAmount?: {
      amount: string;
      currencyCode: string;
    };
  };
}

export interface ShopifyCartLine {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    price: {
      amount: string;
      currencyCode: string;
    };
    product: {
      title: string;
      handle: string;
      images: {
        edges: {
          node: {
            url: string;
            altText?: string;
          };
        }[];
      };
    };
    selectedOptions: {
      name: string;
      value: string;
    }[];
  };
  cost: {
    totalAmount: {
      amount: string;
      currencyCode: string;
    };
  };
}

export interface CiglissimeProduct extends ShopifyProduct {
  category: 'press-go' | 'regular' | 'accessories';
  featured: boolean;
  reviewCount: number;
  rating: number;
  benefits: string[];
  kitContents: string[];
  ingredients?: string;
  duration?: string;
  isKit: boolean;
}

export interface ShopifyMoney {
  amount: string;
  currencyCode: string;
}

export interface ShopifyPageInfo {
  hasNextPage: boolean;
  endCursor?: string;
}

export interface ShopifyFulfillmentTrackingInfo {
  number?: string;
  url?: string;
}

export interface ShopifyOrderLineItemVariant {
  id: string;
  sku?: string;
  title: string;
  image?: {
    url: string;
    altText?: string;
  } | null;
}

export interface ShopifyOrderLineItem {
  title: string;
  quantity: number;
  discountedTotalPrice: ShopifyMoney;
  originalTotalPrice: ShopifyMoney;
  variant?: ShopifyOrderLineItemVariant | null;
}

export interface ShopifyOrderLineItemEdge {
  node: ShopifyOrderLineItem;
}

export interface ShopifyOrderLineItemConnection {
  edges: ShopifyOrderLineItemEdge[];
}

export interface ShopifyOrderAddress {
  name?: string | null;
  address1?: string | null;
  address2?: string | null;
  city?: string | null;
  province?: string | null;
  zip?: string | null;
  country?: string | null;
}

export interface ShopifySuccessfulFulfillmentLineItem {
  quantity: number;
  lineItem: {
    title: string;
  };
}

export interface ShopifySuccessfulFulfillmentLineItemEdge {
  node: ShopifySuccessfulFulfillmentLineItem;
}

export interface ShopifySuccessfulFulfillmentLineItemConnection {
  edges: ShopifySuccessfulFulfillmentLineItemEdge[];
}

export interface ShopifySuccessfulFulfillment {
  trackingInfo: ShopifyFulfillmentTrackingInfo[];
  fulfillmentLineItems: ShopifySuccessfulFulfillmentLineItemConnection;
}

export interface ShopifyOrder {
  id: string;
  name: string;
  processedAt: string;
  financialStatus?: string | null;
  fulfillmentStatus?: string | null;
  statusUrl?: string | null;
  currentSubtotalPrice: ShopifyMoney;
  currentTotalPrice: ShopifyMoney;
  subtotalPrice?: ShopifyMoney;
  totalPrice?: ShopifyMoney;
  totalShippingPrice?: ShopifyMoney;
  totalTax?: ShopifyMoney;
  shippingAddress?: ShopifyOrderAddress | null;
  billingAddress?: ShopifyOrderAddress | null;
  lineItems: ShopifyOrderLineItemConnection;
  successfulFulfillments?: ShopifySuccessfulFulfillment[] | null;
}

export interface ShopifyOrderEdge {
  node: ShopifyOrder;
}

export interface ShopifyOrderConnection {
  edges: ShopifyOrderEdge[];
  pageInfo: ShopifyPageInfo;
}

export interface ShopifyCustomer {
  id: string;
  displayName: string;
  email?: string | null;
  numberOfOrders: number;
  orders: ShopifyOrderConnection;
}

export interface ShopifyCustomerOrdersResponse {
  customer: ShopifyCustomer | null;
}

export interface ShopifyCustomerOrderQueryResponse {
  customer: ShopifyCustomer | null;
  node: ShopifyOrder | null;
}

export interface ShopifyCustomerOrdersQueryVariables {
  customerAccessToken: string;
  first?: number;
  after?: string;
  [key: string]: unknown;
}

export interface ShopifyCustomerOrderQueryVariables {
  customerAccessToken: string;
  orderId: string;
  [key: string]: unknown;
}

export interface CustomerAccessToken {
  accessToken: string;
  expiresAt: string;
}

export interface CustomerCreateResponse {
  customerCreate: {
    customer: {
      id: string;
      email?: string | null;
      firstName?: string | null;
      lastName?: string | null;
    } | null;
    customerUserErrors: Array<{ code?: string | null; field?: string[] | null; message: string }>;
  };
}

export interface CustomerAccessTokenCreateResponse {
  customerAccessTokenCreate: {
    customerAccessToken: CustomerAccessToken | null;
    customerUserErrors: Array<{ code?: string | null; field?: string[] | null; message: string }>;
  };
}

export interface CustomerAccessTokenRenewResponse {
  customerAccessTokenRenew: {
    customerAccessToken: CustomerAccessToken | null;
    userErrors: Array<{ field?: string[] | null; message: string }>;
  };
}

export interface CustomerAccessTokenDeleteResponse {
  customerAccessTokenDelete: {
    deletedAccessToken?: string | null;
    deletedCustomerAccessTokenId?: string | null;
    userErrors: Array<{ field?: string[] | null; message: string }>;
  };
}