import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
app.use(express.json());

const prisma = new PrismaClient();

app.get("/client", async (req, res) => {
  const clients = await prisma.usuario.findMany();
  return res.json(clients);
});

app.get("/client/:id", async (req, res) => {
  const client = await prisma.usuario.findFirst({
    where: {
      id: Number(req.params.id),
    },
  });
  return res.json(client);
});

app.post("/client", async (req, res) => {
  const { name, email } = req.body;
  const client = await prisma.usuario.create({
    data: {
      name,
      email,
    },
  });
  return res.json(client);
});
app.put("/client/:id", async (req, res) => {
  const { name, email } = req.body;
  const client = await prisma.usuario.update({
    data: {
      name,
      email,
    },
    where: {
      id: Number(req.params.id),
    },
  });
  return res.json(client);
});
app.delete("/client/:id", async (req, res) => {
  await prisma.usuario.delete({
    where: {
      id: Number(req.params.id),
    },
  });
  return res.status(204).send();
});

app.listen(5555, () => console.log("Server Runnig"));
