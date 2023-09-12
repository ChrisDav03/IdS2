import mongoose from "mongoose";


export const startConnection = async () => {
  const url = encodeURI("mongodb+srv://root2:sapa@cluster0.kevtnzo.mongodb.net/?retryWrites=true&w=majority");
  await mongoose.connect(url);
}