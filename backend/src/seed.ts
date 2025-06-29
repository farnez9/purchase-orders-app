import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Clear existing data
    await prisma.discount.deleteMany();
    await prisma.stock.deleteMany();
    await prisma.product.deleteMany();
    await prisma.supplier.deleteMany();

    // Create product
    const monitor = await prisma.product.create({
        data: {
            name: 'Philips monitor 17”',
            sellingPrice: 200,
        },
    });


    // returns count, not the products created
    const products = await prisma.product.createMany({
        data: [
            { name: 'Philips monitor 17”', sellingPrice: 200 },
            { name: 'Logitech Keyboard', sellingPrice: 50 },
            { name: 'Dell Mouse', sellingPrice: 25 },
            { name: 'Asus 24” Monitor', sellingPrice: 220 },
            { name: 'HP Docking Station', sellingPrice: 130 },
        ],
    });

    const keyboard = await prisma.product.create({
        data: {
            name: 'Logitech Keyboard',
            sellingPrice: 50,
        },
    });

    // Create suppliers with stock and discounts
    const supplier1 = await prisma.supplier.create({
        data: {
            name: 'Supplier 1',
            shippingDays: 5,
            stocks: {
                create: [{
                    productId: monitor.id,
                    price: 220,
                    quantity: 8,
                },
                {
                    productId: keyboard.id,
                    price: 90,
                    quantity: 8,
                }],
            },
            discounts: {
                create: {
                    type: 'VALUE',
                    condition: 1000,
                    percentage: 5,
                },
            },
        },
    });

    const supplier2 = await prisma.supplier.create({
        data: {
            name: 'Supplier 2',
            shippingDays: 7,
            stocks: {
                create: {
                    productId: monitor.id,
                    price: 128,
                    quantity: 15,
                },
            },
            discounts: {
                create: [
                    {
                        type: 'QUANTITY',
                        condition: 5,
                        percentage: 3,
                    },
                    {
                        type: 'QUANTITY',
                        condition: 10,
                        percentage: 5,
                    },
                ],
            },
        },
    });

    const supplier3 = await prisma.supplier.create({
        data: {
            name: 'Supplier 3',
            shippingDays: 4,
            stocks: {
                create: {
                    productId: monitor.id,
                    price: 129,
                    quantity: 23,
                },
            },
            discounts: {
                create: [
                    {
                        type: 'VALUE',
                        condition: 1000,
                        percentage: 5,
                    },
                    {
                        type: 'DATE',
                        condition: 0,
                        percentage: 2,
                        dateCondition: new Date('2021-09-15'),
                    },
                ],
            },
        },
    });

    console.log('Database seeded successfully.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(() => {
        prisma.$disconnect();
    });
