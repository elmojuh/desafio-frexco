const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authConfig = require("../../config/auth");
const crypto = require("crypto");
const mailer = require("../../modules/mailer");

const User = require("../models/User");

const router = express.Router();

function generateToken(paramts = {}) {
  return jwt.sign(paramts, authConfig.secret, {
    expiresIn: 86400,
  });
}

router.post("/register", async (req, res) => {
  const { email } = req.body;
  try {
    if (await User.findOne({ email })) {
      return res.status(400).send({ error: "Usuário já existe" });
    }
    const user = await User.create(req.body);

    user.password = undefined;

    return res.send({
      user,
      token: generateToken({ id: user.id }),
    });
  } catch (err) {
    return res.status(400).send({ error: "Registro falhou" });
  }
});

router.post("/authenticate", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user) return res.status(400).send({ error: "Usuário não encontrado" });

  if (!(await bcrypt.compare(password, user.password)))
    return res.status(400).send({ error: "Senha invalida" });

  user.password = undefined;

  const token = generateToken({ id: user.id })

  res.cookie("Token", token);

  res.send({
    user,
    token: token
  });

});

router.post("/forgot_password", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).send({ error: "Usuário não encontrado" });
    }

    const token = crypto.randomBytes(20).toString("hex");

    const now = new Date();
    now.setDate(now.getHours() + 1);

    await User.findByIdAndUpdate(user.id, {
      $set: {
        passwordResetToken: token,
        passwordResetExpires: now,
      },
    });

    mailer.sendMail(
      {
        from: "elmosanchesjr@gmail.com",
        to: email,
        subject: "Recuperar Senha",
        template: "auth/forgot_password",
        context: { token },
      },
      (err) => {
        if (err) {
          return res
            .status(400)
            .send({ error: "Erro no envio de email de Esqueci minha senha" });
        }
        return res.send();
      }
    );
  } catch (err) {
    res
      .status(400)
      .send({ error: "Erro em esquecer a senha, tente novamente!" });
  }
});

router.post("/reset_password", async (req, res) => {
  const { email, token, password } = req.body;

  try {
    const user = await User.findOne({ email }).select(
      "+passwordResetToken passwordResetExpires"
    );

    if (!user) {
      return res.status(400).send({ error: "Usuário não encontrado" });
    }

    if (token !== user.passwordResetToken)
      return res.status(400).send({ error: "Token Inválido" });

    const now = new Date();

    if (now < user.passwordResetExpires)
      return res.status(400).send({ error: "Token expirou, gere novamente" });

    user.password = password;

    await user.save();

    res.send();
  } catch (err) {
    return res.status(400).send({ error: "Reset falhou, tente novamente" });
  }
});

router.get("/desconect", async (req, res) => {
  res.clearCookie("Token");
  res.redirect("/");
});

module.exports = (app) => app.use("/auth", router);
