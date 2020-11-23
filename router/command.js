const express = require("express"),
    router = express.Router();
const db = require("../database/db");

router.post("/new", (req, res) => {


    console.log(req.body.panier)
    var command = {
        clientId: req.body.clientId,
        status: 1,

    };
    var panier = {};


    for (let i = 0; i < req.body.panier.length; i++) {
        panier = {
            produitId: req.body.panier[i].produitId,
            prix: req.body.panier[i].prix,
            qtn: req.body.panier[i].qtn
        }
    }



    console.log(panier)

    db.command.create(command)
        .then((command) => {
            /*    command.addProduit(panier.produitId, { through: panier })
                   .then((rep) => {
                       res.json(rep)
                   })
                   .catch((err) => {
                       res.json(err)
                   }) */
            for (let i = 0; i < req.body.panier.length; i++) {
                db.contien.create({
                        prix: req.body.panier[i].soustotal,
                        qtn: req.body.panier[i].quantite,
                        commandId: command.id,
                        produitId: req.body.panier[i].produitId
                    })
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
})


module.exports = router;