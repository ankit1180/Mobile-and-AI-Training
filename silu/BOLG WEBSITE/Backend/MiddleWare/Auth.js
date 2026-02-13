import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  const cookies = parseCookies(req.headers.cookie);
  const accessToken = cookies.accessToken;
  if (!accessToken) {
    return res.status(401).json({ message: "No access token" });
  }

  try {
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    next();
  } catch (err) {
    const refreshToken = cookies.refreshToken;
    if (!refreshToken) return res.status(401).json({ message: "Refresh token missing" });

    try {
      const decodedRefresh = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

      const newAccessToken = jwt.sign(
        { id: decodedRefresh.id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: ACCESS_TOKEN_EXPIRES }
      );


      res.cookie("accessToken", newAccessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: Number(process.env.ACCESS_TOKEN_MAX_AGE)
      });
      next();
    } catch (err) {
      console.log(err);
      return res.status(401).json({ message: "Refresh token invalid/expired" });
    }
  }
};

const parseCookies = (cookieHeader = "") => {
  return cookieHeader.split(';').reduce((cookies, item) => {
    const [key, value] = item.trim().split('=');
    if (key && value) cookies[key] = decodeURIComponent(value);
    return cookies;
  }, {});
};


