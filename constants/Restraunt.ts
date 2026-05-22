export type CartItem = {
    id: string;
    name: string
    price: number
    description: string
    category: string
    image: any
    isPopular?: boolean
    isVeg?: boolean,
    quantity: number,
    restaurantId: string,
    restaurantName: string,
}

export type Restaurant = {
    id: string
    name: string
    cuisine: string
    rating: number
    image: any
    deliveryTime: string
    deliveryFee: number
    minOrder: number
    distance: string
    address: string
    phone: string
    isOpen: boolean
    tags: string[]
    description: string
    menu: CartItem[]
}

// export type MenuItem = {
//     id: string
//     name: string
//     price: number
//     description: string
//     category: string
//     image: any
//     isPopular?: boolean
//     isVeg?: boolean,
//     quantity?: number,
//     restaurantId: string,
//     restaurantName: string,
// }


export const Restaurants: Restaurant[] = [
    {
        id: '1',
        name: 'Pizza Palace',
        cuisine: 'Italian',
        rating: 4.5,
        image: require('../assets/adrien-olichon-ZgREXhl8ER0-unsplash.jpg'),
        deliveryTime: '20-30 min',
        deliveryFee: 2.99,
        minOrder: 10,
        distance: '1.2 km',
        address: '123 Main Street, Downtown',
        phone: '+1 234 567 8901',
        isOpen: true,
        tags: ['Pizza', 'Pasta', 'Italian', 'Fast Food'],
        description: 'Authentic Italian pizza and pasta made with fresh ingredients imported directly from Italy.',
        menu: [
            {
                id: 'm1',
                name: 'Margherita Pizza',
                price: 12.99,
                description: 'Classic tomato sauce, mozzarella, fresh basil',
                category: 'Pizza',
                image: require('../assets/Online_Shoping_29.jpg'),
                isPopular: true,
                isVeg: true,
                restaurantId: '1',
                restaurantName: 'Pizza Palace',
                quantity: 0,
            },
            {
                id: 'm2',
                name: 'Pepperoni Pizza',
                price: 14.99,
                description: 'Tomato sauce, mozzarella, pepperoni slices',
                category: 'Pizza',
                image: require('../assets/Online_Shoping_29.jpg'),
                isPopular: true,
                isVeg: false,
                restaurantId: '1',
                restaurantName: 'Pizza Palace',
                quantity: 0,
            },
            {
                id: 'm3',
                name: 'Spaghetti Carbonara',
                price: 13.99,
                description: 'Creamy egg sauce, pancetta, parmesan',
                category: 'Pasta',
                image: require('../assets/Online_Shoping_29.jpg'),
                isVeg: false,
                restaurantId: '1',
                restaurantName: 'Pizza Palace',
                quantity: 0,
            },
        ],
    },
    {
        id: '2',
        name: 'Noodle House',
        cuisine: 'Chinese',
        rating: 4.2,
        image: require('../assets/chris-liverani-oCsaxvGCehM-unsplash.jpg'),
        deliveryTime: '25-35 min',
        deliveryFee: 1.99,
        minOrder: 8,
        distance: '0.8 km',
        address: '45 China Town Road',
        phone: '+1 234 567 8902',
        isOpen: true,
        tags: ['Noodles', 'Dim Sum', 'Chinese', 'Soup'],
        description: 'Authentic Chinese noodles and dim sum prepared by chefs straight from Shanghai.',
        menu: [
            {
                id: 'm1',
                name: 'Pad Thai',
                price: 11.99,
                description: 'Stir-fried rice noodles, egg, bean sprouts, peanuts',
                category: 'Noodles',
                image: require('../assets/Online_Shoping_29.jpg'),
                isPopular: true,
                isVeg: false,
                restaurantId: '2',
                restaurantName: 'Noodle House',
                quantity: 0,
            },
            {
                id: 'm2',
                name: 'Vegetable Dim Sum',
                price: 8.99,
                description: 'Steamed dumplings filled with mixed vegetables',
                category: 'Dim Sum',
                image: require('../assets/Online_Shoping_29.jpg'),
                isVeg: true,
                restaurantId: '2',
                restaurantName: 'Noodle House',
                quantity: 0,
            },
        ],
    },
    {
        id: '3',
        name: 'Burger King',
        cuisine: 'American',
        rating: 4.0,
        image: require('../assets/nick-karvounis-Ciqxn7FE4vE-unsplash.jpg'),
        deliveryTime: '15-25 min',
        deliveryFee: 0.99,
        minOrder: 5,
        distance: '0.5 km',
        address: '78 Fast Food Lane',
        phone: '+1 234 567 8903',
        isOpen: true,
        tags: ['Burgers', 'Fast Food', 'American', 'Fries'],
        description: 'Juicy flame-grilled burgers and crispy fries served hot and fresh.',
        menu: [
            {
                id: 'm1',
                name: 'Classic Beef Burger',
                price: 9.99,
                description: 'Flame-grilled beef patty, lettuce, tomato, cheese',
                category: 'Burgers',
                image: require('../assets/Online_Shoping_29.jpg'),
                isPopular: true,
                isVeg: false,
                restaurantId: '3',
                restaurantName: 'Burger King',
                quantity: 0,
            },
            {
                id: 'm2',
                name: 'Veggie Burger',
                price: 8.99,
                description: 'Plant-based patty, lettuce, tomato, special sauce',
                category: 'Burgers',
                image: require('../assets/Online_Shoping_29.jpg'),
                isVeg: true,
                restaurantId: '3',
                restaurantName: 'Burger King',
                quantity: 0,
            },
            {
                id: 'm3',
                name: 'Large Fries',
                price: 3.99,
                description: 'Crispy golden fries with seasoning',
                category: 'Sides',
                image: require('../assets/Online_Shoping_29.jpg'),
                isVeg: true,
                restaurantId: '3',
                restaurantName: 'Burger King',
                quantity: 0,
            },
        ],
    },
    {
        id: '4',
        name: 'Arsalan',
        cuisine: 'Indian',
        rating: 4.8,
        image: require('../assets/patrick-tomasso-GXXYkSwndP4-unsplash.jpg'),
        deliveryTime: '30-45 min',
        deliveryFee: 1.49,
        minOrder: 12,
        distance: '2.1 km',
        address: '12 Biryani Street, Park Circus',
        phone: '+1 234 567 8904',
        isOpen: true,
        tags: ['Biryani', 'Curry', 'Indian', 'Mughlai'],
        description: 'Famous for the best biryani in town, slow-cooked with aromatic spices and tender meat.',
        menu: [
            {
                id: 'm1',
                name: 'Mutton Biryani',
                price: 16.99,
                description: 'Slow-cooked mutton with basmati rice and whole spices',
                category: 'Biryani',
                image: require('../assets/Online_Shoping_29.jpg'),
                isPopular: true,
                isVeg: false,
                restaurantId: '4',
                restaurantName: 'Arsalan',
                quantity: 0,
            },
            {
                id: 'm2',
                name: 'Chicken Rezala',
                price: 14.99,
                description: 'Tender chicken in white Mughlai gravy',
                category: 'Curry',
                image: require('../assets/Online_Shoping_29.jpg'),
                isPopular: true,
                isVeg: false,
                restaurantId: '4',
                restaurantName: 'Arsalan',
                quantity: 0,
            },
            {
                id: 'm3',
                name: 'Veg Biryani',
                price: 11.99,
                description: 'Fragrant basmati rice with seasonal vegetables',
                category: 'Biryani',
                image: require('../assets/Online_Shoping_29.jpg'),
                isVeg: true,
                restaurantId: '4',
                restaurantName: 'Arsalan',
                quantity: 0,
            },
        ],
    },
]