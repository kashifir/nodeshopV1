const express = require("express"),
    router = express.Router();
const db = require("../database/db");

router.post("/new", (req, res) => {
    var command = { clientId: req.body.clientId, status: 1 };
    db.command.create(command)
        .then((command) => {
            for (let i = 0; i < req.body.panier.length; i++) {
                command.addProduits(req.body.panier[i].produitId, { through: { prix: req.body.panier[i].prix_unitaire, qtn: req.body.panier[i].quantite } })
                    .then(resp => {
                        res.json(resp)
                    })
                    .catch(err => {
                        res.json(err)
                    })
            }
        })
        .catch((err) => {
            res.json(err)
        })
});

/* router.post("/new", (req, res) => {
    var command = { clientId: req.body.clientId, status: 1, contients: req.body.panier };

    db.command.create(command, { include: { all: true, through: "contient" } })
        .then((command) => {
            res.json(command);
        })
        .catch((err) => {
            res.json(err)
        })
}); */











router.get("/all", (req, res) => {
    db.command.findAll({
            include: [{ all: true }]
        })
        .then((command) => {
            res.json(command)
                /*  command.addProduit([produitId = req.body.produitId], { through: { prix: req.body.prix, qtn: req.body.qtn } })
                     .then((rep) => {
                         res.json(rep)
                     })
                     .catch((err) => {
                         res.json(err)
                     }) */
        })
        .catch((err) => {
            res.json(err)
        })
});


router.post('/new', (req, res) => {

    console.log(req.body.produitId);
    console.log(req.body.prix);
    console.log(req.body.qtn);
    db.command.create({ clientId: req.body.clientId, stauts: 1 })
        .then((command) => {
            command.addProduit(req.body.produitId, {
                    through: { prix: req.body.prix, qtn: req.body.qtn }
                })
                .then((rep) => {
                    res.json(rep)
                })
                .catch((err) => {
                    res.json(err)
                })
        })
})



module.exports = router;