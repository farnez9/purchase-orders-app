import express from 'express';
import cors from 'cors';
import purchaseRouter from './routes/purchase.route';
import productsRouter from './routes/products.route';
import ordersRouter from './routes/orders.route';

const app = express();
const PORT = 3000;

app.use(cors({
    origin: 'http://localhost:5173'
}))

app.use(express.json());

app.use("/v1/purchase", purchaseRouter);
app.use("/v1/products", productsRouter);
app.use("/v1/orders", ordersRouter);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});