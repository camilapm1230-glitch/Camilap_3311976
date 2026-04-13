import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    res.json({
        message: "API funcionando"
    });
});

router.get("/ping", (req, res) => {
    res.send("pong");
});

export default router;