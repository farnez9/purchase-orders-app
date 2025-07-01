# 🛠 Tech Stack

## 🌐 Frontend

- **React**
- **Tanstack Query** - data-fetching
- **shadcn/ui** - styling
- **TypeScript**

## 🔧 Backend

- **Express**
- **Prisma** - ORM
- **TypeScript**
- **Sqlite**

# Installation

- **Clone**: `git clone https://github.com/farnez9/purchase-orders-app.git`
- **Install**: `cd purchase-order-app` and `npm i`
- **DB**: create a `.env` file inside `/purchase-orders-app/backend/` and specify the db url using the env variable `DATABASE_URL`, for example: `DATABASE_URL="file:./dev.db"`
- **Initilize Db**: run `npm run db-deploy` from the root folder
- **Run Back-end**: `npm backend-start`
- **Run Front-end**: `npm frontend-start`

Feel free to modify the file inside `purchase-orders-app/backend/src/seed.ts` and run `npm backend seed` from the root folder in order to seed the database with initial data

If you want to clear db data and start fresh, run `npm run db-reset`

# Usage

Move between the `Purchase` and `Orders` pages by clicking the butto on the top left of the page in order to open the sidebar and change page

## Purchase

- Submit the form in order to get the best purchase option from suppliers based on price, discount and shipping days
- click `buy` and confirm the choice to get the product

## Orders

- Check the list of purchased products
