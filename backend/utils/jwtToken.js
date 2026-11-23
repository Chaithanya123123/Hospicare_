import { cookieOptions } from "./cookieOptions.js";

export const generateToken = (user, message, statusCode, res) => {
  const token = user.generateJsonWebToken();
  // Never send the password hash to the browser.
  const safeUser = user.toObject();
  delete safeUser.password;
  // Determine the cookie name based on the user's role
  const cookieName = user.role === 'Admin' ? 'adminToken' : 'patientToken';

  res
    .status(statusCode)
    .cookie(cookieName, token, {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      ...cookieOptions(),
    })
    .json({
      success: true,
      message,
      user: safeUser,
      token,
    });
};

