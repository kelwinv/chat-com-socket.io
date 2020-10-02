import express from 'express';
const router = express.Router();

router.get('/', (req, res) =>{
  res.send({ reponse: "i am alive"}).status(200);
});

export default router;