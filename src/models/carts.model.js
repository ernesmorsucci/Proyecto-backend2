import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId },
      quantity: { type: Number, default: 1 }
    }
  ]
});

export const cartModel = mongoose.model('carts', cartSchema);