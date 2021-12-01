import express from "express";
import User from "../../database/user.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const user = new User(req.body);
  const result = await user.create();
  res.status(result.status);
  if (result.status !== 200) res.send(result.content);
  else res.end();
});

export default router;
