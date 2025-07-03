const dishDetails: Record<string, any> = {
  "1": {
    id: "1",
    name: "Margherita Pizza",
    price: 299,
    image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=800&h=600&fit=crop",
    category: "Pizza",
    rating: 4.5,
    cookTime: "15-20 min",
    description: "Classic pizza with fresh tomatoes, mozzarella, and basil. Made with our signature dough and the finest Italian ingredients.",
    ingredients: ["Fresh Mozzarella", "San Marzano Tomatoes", "Fresh Basil", "Extra Olive Oil", "Pizza Dough"],
    nutritionalInfo: {
      calories: 280,
      protein: "12g",
      carbs: "35g",
      fat: "10g"
    }
  },
  "2": {
    id: "2",
    name: "Veg Burger",
    price: 199,
    image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800&h=600&fit=crop",
    category: "Burger",
    rating: 4.3,
    cookTime: "10-15 min",
    description: "Crispy veggie patty with fresh vegetables and sauces.",
    ingredients: ["Veg Patty", "Lettuce", "Tomato", "Onion", "Burger Bun", "Special Sauce"],
    nutritionalInfo: {
      calories: 320,
      protein: "9g",
      carbs: "40g",
      fat: "12g"
    }
  },
  "3": {
    id: "3",
    name: "Chocolate Brownie",
    price: 149,
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&h=600&fit=crop",
    category: "Dessert",
    rating: 4.8,
    cookTime: "5-10 min",
    description: "Rich and fudgy chocolate brownie with vanilla ice cream.",
    ingredients: ["Chocolate", "Flour", "Sugar", "Butter",  "Vanilla Ice Cream"],
    nutritionalInfo: {
      calories: 400,
      protein: "5g",
      carbs: "50g",
      fat: "20g"
    }
  },

  // 👇 More added dishes below:
  "4": {
    id: "4",
    name: "Pasta Alfredo",
    price: 249,
    image: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Pasta",
    rating: 4.6,
    cookTime: "20-25 min",
    description: "Creamy Alfredo pasta with fresh cream, herbs, and parmesan cheese.",
    ingredients: ["Fettuccine", "Cream", "Butter", "Garlic", "Parmesan Cheese"],
    nutritionalInfo: {
      calories: 350,
      protein: "10g",
      carbs: "45g",
      fat: "15g"
    }
  },
  "5": {
    id: "5",
    name: "French Fries",
    price: 129,
    image: "https://images.unsplash.com/photo-1598679253544-2c97992403ea?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Snacks",
    rating: 4.2,
    cookTime: "10-12 min",
    description: "Crispy golden fries with a sprinkle of salt and seasoning.",
    ingredients: ["Potatoes", "Salt", "Oil", "Seasoning"],
    nutritionalInfo: {
      calories: 300,
      protein: "4g",
      carbs: "35g",
      fat: "15g"
    }
  },
  "6": {
    id: "6",
    name: "Paneer Tikka",
    price: 279,
    image: "https://images.unsplash.com/photo-1701579231320-cc2f7acad3cd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dhttps://images.unsplash.com/photo-1626082891098-bbdf6ec4db61?w=800&h=600&fit=crop",
    category: "Indian",
    rating: 4.7,
    cookTime: "15-20 min",
    description: "Grilled paneer cubes marinated in yogurt and spices.",
    ingredients: ["Paneer", "Yogurt", "Spices", "Bell Peppers", "Onions"],
    nutritionalInfo: {
      calories: 310,
      protein: "16g",
      carbs: "12g",
      fat: "20g"
    }
  }
};

export default dishDetails;
