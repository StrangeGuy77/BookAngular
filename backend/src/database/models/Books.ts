import { Schema, model } from "mongoose";

const bookSchema = new Schema({
  title: { type: String },
  description: { type: String },
  author: { type: String },
  price: { type: Number, default: 0 },
  extension: { type: String, default: ".pdf" },
  publisher: { type: String, default: "" },
  publisherYear: { type: Date, default: Date.now },
  writingYear: { type: Date, default: Date.now },
  categories: { type: Array, default: [] },
  filename: { type: String, default: "test" },
  userUploaderId: { type: String, default: 0 },
  timestamp: { type: Date, default: Date.now }
});

export default model("Book", bookSchema);
