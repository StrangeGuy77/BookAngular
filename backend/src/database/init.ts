import { connect } from "mongoose";

const stablishConnection = async () => {
  const connection = await connect("mongodb://localhost:27017/angular_server", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).catch((err: Error) => console.log(err));

  console.log("Connected to database");

  return connection;
};

export default stablishConnection;
