import { connectDB } from "./db/database.js";
import { app } from "./index.js";

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  connectDB();
});
