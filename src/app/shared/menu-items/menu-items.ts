import { Injectable } from '@angular/core';

// Define the Menu Interface
export interface Menu {
  id: number;
  description: string;
  icon: string;
  route: string;
  submenus?: { description: string; route: string }[];
}

// Define Menu Items Array
const MENUITEMS: Menu[] = [
  {
    id: 1,
    description: 'Dashboard',
    icon: 'dashboard',
    route: '/dashboard',
    submenus: []
  },
  {
    id: 2,
    description: 'Products',
    icon: 'store',
    route: '/products',
    submenus: [
      { description: 'All Products', route: '/products/all' },
      { description: 'Categories', route: '/products/categories' },
      { description: 'Add Product', route: '/products/add' }
    ]
  },
  {
    id: 3,
    description: 'Orders',
    icon: 'shopping_cart',
    route: '/orders',
    submenus: [
      { description: 'All Orders', route: '/orders/all' },
      { description: 'Pending Orders', route: '/orders/pending' },
      { description: 'Completed Orders', route: '/orders/completed' }
    ]
  },
  {
    id: 4,
    description: 'Customers',
    icon: 'people',
    route: '/customers',
    submenus: [
      { description: 'All Customers', route: '/customers/all' },
      { description: 'Loyal Customers', route: '/customers/loyal' }
    ]
  },
  {
    id: 5,
    description: 'Settings',
    icon: 'settings',
    route: '/settings',
    submenus: []
  }
];

// Injectable Service to Retrieve Menu Items
@Injectable({
  providedIn: 'root' // Ensures singleton service across the app
})
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
