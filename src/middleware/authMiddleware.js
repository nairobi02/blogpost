export const authMiddleware = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.status(401).json({ status: "fail", message: "unauthorized" });
  }
};
