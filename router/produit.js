const Express = require("express"),
    router = Express.Router(),
    db = require("../database/db");

router.post("/new", (req, res) => {
    console.log(req.body);
    db.produit
        .findOne({
            where: { ref: req.body.ref },
        })
        .then((produit) => {
            if (!produit) {
                db.produit
                    .create(req.body)
                    .then((produititem) => {
                        res.status(200).json({ produit: produititem, message: "ok " });
                    })
                    .catch((err) => {
                        res.status(400).send("error" + err);
                    });
            } else {
                produit
                    .update({
                        stock: req.body.stock,
                    })
                    .then((rep) => {
                        res.status(200).json({ produit: rep });
                    })
                    .catch((err) => {
                        res.status(403).json("not updated");
                    });
            }
        })
        .catch((err) => {
            res.status(404).json("Not found");
        });
});

router.get("/all", (req, res) => {
    db.produit
        .findAll({ include: [{ model: db.img }] })
        .then((produits) => {
            if (produits) {
                res.status(200).json({
                    produits: produits,
                });
            } else {
                res.status(404).json("il n'a pas de produits");
            }
        })
        .catch((err) => {
            res.json(err);
        });
});

module.exports = router;