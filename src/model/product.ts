import mongoose, {Schema} from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {type: String,unique: true,required: true,},
    description:{type: String,required: true,},
    price:{type: String,required: true,    },
    image:{type: [String],required: true,},
    owner: {type:Schema.Types.ObjectId,ref:"user", required: true},
  },
  { timestamps: true }
);

const productModel = mongoose.model("Product", productSchema);
export type ProductType = {
  _id: string;
  name: string;
  description: string;
  price: string;
  image: string[];
  owner: string;
  createdAt: Date;
  updatedAt: Date;
};
export default productModel;
