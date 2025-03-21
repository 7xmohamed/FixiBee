const express = require("express");

const app = express();
const PORT = 5000;

const citiesRoutes = require("./routes/cities");
app.use("/api/cities", citiesRoutes);

app.get("/api/services", (req, res) => {
    const services = [
        { id: 1, title: 'Plumbing', description: 'Expert plumbing services for your home.' },
        { id: 2, title: 'Cleaning', description: 'Professional cleaning services.' },
        { id: 3, title: 'Electrician', description: 'Safe and reliable electrical repairs.' },
        { id: 3, title: 'Electrician', description: 'Safe and reliable electrical repairs.' },
    ];
    res.json(services);
});


app.get("/", (req, res) => {
    res.send("Welcome to the FixeBee API 🚀");
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
