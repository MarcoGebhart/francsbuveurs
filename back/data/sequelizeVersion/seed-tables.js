
import {AppUser, Event, Drink, Food, sequelize} from "../../app/models/associations.js";
import bcrypt from "bcrypt";

console.log("🌱 Seeding des tables");
console.log("🚧 Ajout données app_user");

const appUsers = [
    {id_client_shopify: 'fake-shopify-id-001', email: 'marco@admin.io', password: 'Admin-marco1', role: 'admin'},
    {id_client_shopify: 'fake-shopify-id-002', email: 'test@user.io', password: 'User-test2', role: 'user'},
];

let adminUser = null;

for (const appUser of appUsers) {
    try {
        const password_hash = await bcrypt.hash(appUser.password, 10);
        const createdUser = await AppUser.create({
           id_client_shopify: appUser.id_client_shopify,
           email: appUser.email,
           password: password_hash,
           role: appUser.role,
        })

        if(appUser.email === "marco@admin.io") {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            adminUser = createdUser;
        }
    } catch (error) {
        console.log("Error with appuser:", appUser.firstname);
		console.error(error);
    }
}

console.log("🚧 Ajout données évènements");

const events = [
    {title: 'fête de la musique', description: 'Viens avec nous fêter ce jour magique autour d\'une bonne bière artisanale et un dj incroyable', date: '2025-06-21', hour: '20:00', img: 'feteMusique', slug: 'fete-de-la-musique', id_app_user: 1 },
    {title: 'fête de la bière', description: 'Viens avec nous pour fêter la bière artisanale', date: '2025-08-14', hour: '21:00', img: 'fetebiere', slug: 'fete-de-la-biere', id_app_user: 1 },
];

for (const event of events) {
    try {
        await Event.create({
            title: event.title,
            description: event.description,
            date: event.date,
            hour: event.hour,
            img: event.img,
            slug: event.slug,
            id_app_user: event.id_app_user

        })
    } catch (error) {
        console.log("Error with evenment of:", event.id_app_user);
		console.error(error);
    }
}

console.log("🚧 Ajout données food");

const foods = [
    {name: 'assiette de charcuterie', description: 'assortiment de quatre charteries francaise', price: 12, img: 'charcuterie', id_app_user: 1},
    {name: 'plateau de fromage', description: 'assortiment de quatre fromages francais', price: 10, img: 'fromage', id_app_user: 1},
    {name: 'hamburger du francbuveur', description: 'hamburger maison avec frite maison steak de 200g', price: 18, img: 'burger', id_app_user: 1},
    {name: 'mi-cuit au chocolat', description: '100% chocolat', price: 7, img: 'choco', id_app_user: 1},
];

for (const food of foods) {
    try {
        await Food.create({
            name: food.name,
            description: food.description,
            price: food.price,
            img: food.img,
            id_app_user: food.id_app_user,
        })
    } catch (error) {
        console.log("Error with food of:", food.id_app_user);
		console.error(error);
    }
}

console.log("🚧 Ajout données drink")

const drinks = [
    {name: 'Coca-cola', price: 5, img: 'coca', id_app_user: 1},
    {name: 'Oasis', price: 5, img: 'oasis', id_app_user: 1},
    {name: 'Jus de fruit', price: 5, img: 'jusdefruit', id_app_user: 1},
    {name: 'Café', price: 2, img: 'cafe', id_app_user: 1},
    {name: 'Chocolat chaud', price: 3, img: 'chocolat', id_app_user: 1},
    {name: 'Sirop à l\'eau', price: 2, img: 'sirop', id_app_user: 1},
];

for (const drink of drinks) {
    try {
        await Drink.create({
            name: drink.name,
            price: drink.price,
            img: drink.img,
            id_app_user: drink.id_app_user,
        })
    } catch (error) {
        console.log("Error with drink of:", drink.id_app_user);
		console.error(error);
    }
}

console.log("✅ Données inserées");
sequelize.close();
