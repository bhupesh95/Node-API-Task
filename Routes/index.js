import { userAuthRoutes } from "./userAuthRoutes/userAuthRoute.js";
import { userRoutes } from "./Users/user.route.js";

export default function routes(app) {
  app.use("/api/v1/", userRoutes);
  app.use("/api/v1/user", userAuthRoutes);
}
