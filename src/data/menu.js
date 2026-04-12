export const brands = [
  {
    name: "Kopi Kenangan",
    menu: [
      {
        id: 1,
        name: "Kopi Kenangan Mantan",
        price: 19000,
        options: {
          Temperature: ["Ice", "Hot"],
          Size: ["Regular", "Large", "Jumbo"],
          "Sugar Level": ["Normal Sugar", "Less Sugar", "No Sugar"],
          "Ice Level": ["Normal Ice", "Less Ice", "No Ice"]
        }
      },
      {
        id: 2,
        name: "Friend Chip Cookies",
        price: 17000
      }
    ]
  },
  {
    name: "Janji Jiwa",
    menu: [
      {
        id: 3,
        name: "Signature Kopi Susu",
        price: 20000,
        options: {
          Temperature: ["Ice", "Hot"],
          Size: ["Regular", "Large", "Ultimate"],
          "Ice Level": ["Normal Ice", "Less Ice"],
          "Sugar Level": ["Normal Sugar", "Less Sugar"]
        }
      },
      {
        id: 4,
        name: "Plain Toast",
        price: 19000
      }
    ]
  },
  {
    name: "Fore",
    menu: [
      {
        id: 5,
        name: "Kopi Dari Tani",
        price: 25000,
        options: {
          Temperature: ["Ice"],
          Size: ["Regular Ice", "Large Ice"],
          "Ice Level": ["Normal Ice", "Less Ice", "More Ice"],
          "Sweetness Level": ["Normal Sweet", "Less Sweet"]
        }
      },
      {
        id: 6,
        name: "Butter Croissant",
        price: 24000
      }
    ]
  }
]

export const digitalProducts = [
  {
    id: "imei",
    name: "Unblock IMEI",
    type: "imei",
    variants: [
      { name: "1 Bulan", price: 75000 },
      { name: "3 Bulan", price: 95000 }
    ]
  },
  {
    id: "internet",
    name: "Paket Akrab XL/Axis",
    type: "internet",
    variants: [
      { name: "Super Mini", price: 50000 },
      { name: "Extra Mini", price: 56000 },
      { name: "Mini", price: 62000 },
      { name: "Big", price: 68000 },
      { name: "JV2", price: 75000 },
      { name: "SB", price: 85000 },
      { name: "SJ", price: 93000 },
      { name: "Mega Big", price: 105000 },
    ]
  }
]