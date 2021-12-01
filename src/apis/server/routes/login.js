import express from "express";
import User from "../../database/user.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const user = new User(req.body);
  console.log(req);
  const result = await user.enter();
  if (result.status) {
    res.cookie("sessionCookie", result.sessionCookie, {
      expires: new Date(Date.now() + 86400),
      httpOnly: true,
      sameSite: true,
    });
    res.status(200);
  } else res.status(400);
  res.send(result.content);
});

export default router;
