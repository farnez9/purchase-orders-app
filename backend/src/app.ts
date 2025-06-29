import express from 'express';
import purchaseRouter from './routes/purchase.route';
import productsRouter from './routes/products.route';

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/v1/purchase", purchaseRouter);
app.use("/v1/products", productsRouter);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});