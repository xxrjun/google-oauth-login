const router = require("express").Router();
const passport = require("passport");

// login route
router.get("/login", (req, res) => {
  res.render("login", { user: req.user });
});

// logout route
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

// google authentication route
router.get(
  "/google",
  passport.authenticate("google", {
    // scope: 授權項目
    scope: ["profile", "email"],

    // 使用者每次登入都可以選擇帳號
    prompt: "select_account",
  })
);

// callback (redirect URI) route
router.get(
  "/google/redirect",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    // Successful authentication, redirect profile page.
    res.redirect("/profile");
  }
);

module.exports = router;
