import mongoose, { Document, Schema } from 'mongoose';

interface IProduct extends Document {
  name: string;
  category: string;
  value: number;
  quantity: number;
  price: number;
  disabled: boolean;
}

const ProductSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  category: { type: String, required: true },
  value: { type: Number, default: 0 },
  quantity: { type: Number, default: 0 },
  price: { type: Number, required: true },
  disabled: { type: Boolean, default: false },
});

export default mongoose.model<IProduct>('Product', ProductSchema);
