import { connect } from "mongoose";

const connectDB = async () => {
  try {
    await connect(process.env.MONGO_URI);
    console.log(`Connection reussie ! ✅`);
  } catch (error) {
    console.log(`Connection echouee ! ❌ ${error.message}`);
    process.exit(1);
  }
};

export default connectDB();
