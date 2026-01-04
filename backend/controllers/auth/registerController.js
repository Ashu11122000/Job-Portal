import { registerUser } from "../../services/authService.js";


/**
 * Exports an async controller named register.
 * It will later be attached to a route like: router.post("/register", register)
 * req = request object, res = response object.
 */
export const register = async (req, res) => {

  /**
   * Exports an async controller named register.
   * It will later be attached to a route like: router.post("/register", register)
   * req = request object, res = response object.
   */
  console.log("BODY RECEIVED →", req.body); // test log

  /**
   * Calls the imported registerUser() service function and waits for DB insertion to finish.
   * Passes entire request body object (req.body) as argument.
   * That service expects an object like:
   */
  const user = await registerUser(req.body);

  /**
   * Sends a JSON response back to client with:
   *   1. user → data returned from DB insert (no password included)
   *   2. token: "temp-test-token" → a hard-coded temporary token just for testing
   * This is NOT a real JWT, just a placeholder until you replace it with generateToken(user) or jwt.sign().
   */
  res.json({ user, token: "temp-test-token" });
};
