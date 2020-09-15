import { Dish } from '../interfaces/dish.interface';

export const DISHES: Dish[] = [
    {
        id: 0,
        name: 'Uthappizza',
        image: 'assets/images/uthappizza.png',
        category: 'mains',
        label: 'Hot',
        price: '4.99',
        description: 'A unique combination of Indian Uthappam (pancake) and Italian pizza, topped with Cerignola olives, ripe vine cherry tomatoes, Vidalia onion, Guntur chillies and Buffalo Paneer.',
        comments: [
            {
                id: 1,
                author: 'John Lemon',
                date: 'Oct 17, 2012',
                content: 'Sends anyone to heaven, I wish I could get my mother-in-law to eat it!',
            },
            {
                id: 2,
                author: 'Michael Jaikishan',
                date: 'Feb 14, 2015',
                content: 'Ultimate, Reaching for the starts!',
            },
            {
                id: 3,
                author: 'Paul McVites',
                date: 'Sep 6, 2014',
                content: 'Eat it, just eat it!',
            },
            {
                id: 4,
                author: 'Ringo Starry',
                date: 'Dec 03, 2013',
                content: 'Its your birthday, we are gonna party!',
            },
        ]
    },
    {
        id: 1,
        name: 'Zucchipakoda',
        image: 'assets/images/zucchipakoda.png',
        category: 'appetizer',
        label: '',
        price: '1.99',
        description: 'Deep fried Zucchini coated with mildly spiced Chickpea flour batter accompanied with a sweet-tangy tamarind sauce',
        comments: [
            {
                id: 5,
                author: 'Paul McVites',
                date: 'Sep 6, 2014',
                content: 'Eat it, just eat it!',
            },
            {
                id: 6,
                author: 'Ringo Starry',
                date: 'Dec 03, 2013',
                content: 'Its your birthday, we are gonna party!',
            },
        ]
    },
    {
        id: 2,
        name: 'Vadonut',
        image: 'assets/images/vadonut.png',
        category: 'appetizer',
        label: 'New',
        price: '1.99',
        description: 'A quintessential ConFusion experience, is it a vada or is it a donut?',
        comments: null,
    },
    {
        id: 3,
        name: 'ElaiCheese Cake',
        image: 'assets/images/elaicheesecake.png',
        category: 'dessert',
        label: '',
        price: '2.99',
        description: 'A delectable, semi-sweet New York Style Cheese Cake, with Graham cracker crust and spiced with Indian cardamoms',
        comments: [
            {
                id: 6,
                author: 'John Lemon',
                date: 'Oct 17, 2012',
                content: 'Sends anyone to heaven, I wish I could get my mother-in-law to eat it!',
            },
            {
                id: 7,
                author: 'Michael Jaikishan',
                date: 'Feb 14, 2015',
                content: 'Ultimate, Reaching for the starts!',
            },
        ]
    }
];