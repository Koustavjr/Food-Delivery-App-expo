export const FOODS = [
    {
        id: '1',
        name: 'Margherita Pizza',
        category: 'Pizza',
        price: 12.99,
        rating: 4.8,
        time: '20-30 min',
        image: require('../assets/pizza-svgrepo-com.png'),
        restaurantId: '1',           // ← link to Pizza Palace
        restaurantName: 'Pizza Palace',
    },
    {
        id: '2',
        name: 'Chicken Burger',
        category: 'Burgers',
        price: 9.99,
        rating: 4.5,
        time: '15-25 min',
        image: require('../assets/burger-svgrepo-com.png'),
        restaurantId: '3',           // ← link to Burger King
        restaurantName: 'Burger King',
    },
    {
        id: '3',
        name: 'Hakka Noodles',
        category: 'Noodles',
        price: 11.99,
        rating: 4.6,
        time: '25-35 min',
        image: require('../assets/noodles-pasta-svgrepo-com.png'),
        restaurantId: '2',           // ← link to Noodle House
        restaurantName: 'Noodle House',
    },
    {
        id: '4',
        name: 'Sushi Platter',
        category: 'Japanese',
        price: 18.99,
        rating: 4.9,
        time: '30-40 min',
        image: require('../assets/sushi-svgrepo-com.png'),
        restaurantId: '2',
        restaurantName: 'Noodle House',
    },
]