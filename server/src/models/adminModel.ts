import mongoose, { Document, Schema } from "mongoose";

export interface AdminData extends Document {
  adminName: string;
  adminPassword: string;
  adminSecret: string;
}

const adminSchema = new Schema<AdminData>({
  adminName: {
    type: String,
    required: [true, "Please enter adminName"],
  },
  adminPassword: {
    type: String,
    required: [true, "Please enter admin password"],
  },
  adminSecret: {
    type: String,
    required: [true, "Please enter admin Secret"],
  },
});

export default mongoose.model<AdminData>("Admindata", adminSchema);
