const express = require("express");
const router = express.Router();

const moroccoCities = [
    "Casablanca",
    "Rabat",
    "Marrakech",
    "Fes",
    "Tangier",
    "Agadir",
    "Meknes",
    "Oujda",
    "Kenitra",
    "Tetouan",
];

router.get("/", (req, res) => {
    res.json(moroccoCities);
});

module.exports = router;