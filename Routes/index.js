import { userRoutes } from "./Users/user.route.js";

export default function routes(app) {
  app.use("/api/v1", userRoutes);
  app.get("/", (req, res) => {
    res.status(200).send({
      message: "Welcome "
    });
  });
}
