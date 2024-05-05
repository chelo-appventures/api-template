import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";

const restfulRouter = express.Router();
restfulRouter.use(express.json());

restfulRouter.get("/:entity", async (req: Request, res: Response) => {
  const entity = req.params.entity;
  console.log({ entity });
  try {
    const data = await collections[entity]?.find({}).toArray();
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error: { message: `${entity} listing error` } });
  }
});

restfulRouter.get("/:entity/:id", async (req: Request, res: Response) => {
  const entity = req.params.entity;
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  try {
    const data = await collections[entity]?.findOne(query);
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error: { message: `${entity} error` } });
  }
});

restfulRouter.post("/:entity", async (req: Request, res: Response) => {
  const entity = req.params.entity;
  const newEntity = req.body;
  console.log(JSON.stringify({ entity, newEntity }));
  try {
    const data = await collections[entity]?.insertOne(newEntity);
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error: { message: `${entity} Insert error` } });
  }
});

restfulRouter.put("/:entity/:id", async (req: Request, res: Response) => {
  const entity = req.params.entity;
  const id = req.params.id;
  const updateEntity = req.body;
  const query = { _id: new ObjectId(id) };
  try {
    const data = await collections[entity]?.updateOne(query, {
      $set: updateEntity,
    });
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error: { message: `${entity} update error` } });
  }
});

restfulRouter.delete("/:entity/:id", async (req: Request, res: Response) => {
  const entity = req.params.entity;
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  try {
    const data = await collections[entity]?.deleteOne(query);
    res.status(202).json({ data });
  } catch (error) {
    res.status(500).json({ error: { message: `${entity} Delete error` } });
  }
});

export default restfulRouter;
