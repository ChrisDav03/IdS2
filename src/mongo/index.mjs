import mongoose from "mongoose";


export const startConnection = async () => {
  const url = encodeURI("mongodb+srv://aaaaa:077olcr1zBb1n7fC@cluster0.doacvbo.mongodb.net/?retryWrites=true&w=majority");
  await mongoose.connect(url);
}