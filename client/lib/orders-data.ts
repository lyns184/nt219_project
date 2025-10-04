export interface Order {
  id: string
  date: string
  status: "processing" | "shipped" | "delivered" | "cancelled"
  total: number
  items: {
    id: string
    name: string
    quantity: number
    price: number
    image: string
  }[]
  shippingAddress: string
  trackingNumber?: string
  securityScore: number
  fraudCheckPassed: boolean
}

export const mockOrders: Order[] = [
  {
    id: "ORD-1735891234567",
    date: "2025-01-02",
    status: "delivered",
    total: 549.98,
    items: [
      {
        id: "1",
        name: "Wireless Noise-Cancelling Headphones",
        quantity: 1,
        price: 299.99,
        image: "/wireless-headphones.png",
      },
      {
        id: "2",
        name: "Smart Fitness Watch",
        quantity: 1,
        price: 249.99,
        image: "/fitness-smartwatch.png",
      },
    ],
    shippingAddress: "123 Main St, San Francisco, CA 94102",
    trackingNumber: "1Z999AA10123456784",
    securityScore: 98,
    fraudCheckPassed: true,
  },
  {
    id: "ORD-1735804834567",
    date: "2024-12-28",
    status: "shipped",
    total: 189.99,
    items: [
      {
        id: "7",
        name: "Portable SSD 2TB",
        quantity: 1,
        price: 189.99,
        image: "/portable-ssd.jpg",
      },
    ],
    shippingAddress: "123 Main St, San Francisco, CA 94102",
    trackingNumber: "1Z999AA10123456785",
    securityScore: 95,
    fraudCheckPassed: true,
  },
  {
    id: "ORD-1735718434567",
    date: "2024-12-25",
    status: "processing",
    total: 679.98,
    items: [
      {
        id: "5",
        name: "Ergonomic Office Chair",
        quantity: 1,
        price: 399.99,
        image: "/ergonomic-office-chair.png",
      },
      {
        id: "6",
        name: "Standing Desk Converter",
        quantity: 1,
        price: 279.99,
        image: "/standing-desk-setup.png",
      },
    ],
    shippingAddress: "123 Main St, San Francisco, CA 94102",
    securityScore: 97,
    fraudCheckPassed: true,
  },
]
