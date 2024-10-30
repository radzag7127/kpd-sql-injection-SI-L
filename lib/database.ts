export interface ShoppingItem {
    id: number;
    name: string;
    description: string;
    price: number;
    Url: string;
  }
  
  const defaultItems: ShoppingItem[] = [
    { id: 1, name: "Wireless Earbuds", description: "High-quality sound", price: 79.99, Url: "/1.jpg" },
    { id: 2, name: "Smart Watch", description: "Track your fitness", price: 199.99, Url: "/2.jpg" },
    { id: 3, name: "Portable Charger", description: "Never run out of battery", price: 39.99, Url: "/3.jpg" },
    { id: 4, name: "Bluetooth Speaker", description: "Party anywhere", price: 59.99, Url: "/4.jpg" },
    { id: 5, name: "Fitness Tracker", description: "Monitor your health", price: 89.99, Url: "/5.jpg" },
    { id: 6, name: "Laptop Backpack", description: "Carry your tech safely", price: 49.99, Url: "/6.jpg" },
  ];
  
  export async function fetchDefaultItems(): Promise<ShoppingItem[]> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return defaultItems;
  }
  
  export async function login(email: string, password: string): Promise<boolean> {
    const query = `SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`;
    console.log('Simulated SQL query:', query);
  
    if (email.toLowerCase().includes("' or '1'='1")) {
      return true;
    }
  
    if (email.toLowerCase().includes("'; update items set")) {
      let items: ShoppingItem[] = JSON.parse(localStorage.getItem('items') || '[]');
  
      const nameMatch = email.match(/name\s*=\s*'([^']*)'/i);
      const descriptionMatch = email.match(/description\s*=\s*'([^']*)'/i);
      const priceMatch = email.match(/price\s*=\s*([\d.]+)/i);
      const idMatch = email.match(/where id\s*=\s*(\d+)/i);
  
      if (idMatch) {
        const targetId = parseInt(idMatch[1], 10);
        items = items.map((item) => {
          if (item.id === targetId) {
            return {
              ...item,
              name: nameMatch ? nameMatch[1] : item.name,
              description: descriptionMatch ? descriptionMatch[1] : item.description,
              price: priceMatch ? parseFloat(priceMatch[1]) : item.price,
            };
          }
          return item;
        });
  
        localStorage.setItem('items', JSON.stringify(items));
        console.log('Items updated and saved to local storage:', items);
        return true;
      }
    }
  
    return false;
  }
  