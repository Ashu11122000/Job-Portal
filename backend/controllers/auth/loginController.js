import { loginUser } from "../../services/authService.js";


/**
 * Exports an async controller function named login.
 * It will be used in Express routes like: router.post("/login", login)
 * (req, res) are Express objects to handle request and send response.
 */
export const login = async (req, res) => {

  // Extracts email and password from incoming JSON request body.
  // req.body was enabled earlier using app.use(express.json()) in server.js
  const { email, password } = req.body;
  /**
   * Calls the imported loginUser() service function and waits for it to complete.
   * Sends email and password as arguments.
   * The service will:
   *   1. Fetch user from MySQL
   *   2. Compare hashed password using bcrypt
   *   3. Generate JWT if valid
   * The final returned object (user + token) is stored in result.
   */
  const result = await loginUser(email, password);

  if (!result) {

    /**
     * Sends response:
     *   1. 401 → Unauthorized
     *   2. JSON message → "Invalid email or password"
     * return ensures the function stops here and doesn’t send a success response.
     */
    return res.status(401).json({ message: "Invalid email or password" });
  }

  res.json(result);
};
