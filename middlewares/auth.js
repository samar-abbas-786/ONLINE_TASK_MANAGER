const { getUser } = require("../service/auth");
async function restrictedToUserLoggedInOnly(req, res, next) {
  const userUid = req.cookies.uid;
  if (!userId) return res.render("login");

  const user = getUser(userUid);
  if (!user) return res.render("signup");

  req.user = user;
  next();
}
module.exports = {
  restrictedToUserLoggedInOnly,
};
