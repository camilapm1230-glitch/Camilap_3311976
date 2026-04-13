export const index = (req, res) => {
    res.json({
        message: "API funcionando"
    });
};

export const ping = (req, res) => {
    res.send("pong");
};