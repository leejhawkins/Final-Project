const axios = require("axios");
const cheerio = require("cheerio");
const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");

router.use("/api", apiRoutes);

router.get("/scrape/:date", (req, res) => {
    console.log(req.params.date);
    var url = 'https://www.crossfit.com/' + req.params.date ;
    axios.get(url).then(function (body) {
    var $ = cheerio.load(body.data);
    var results = []
    $("._6zX5t4v71r1EQ1b1O0nO2 p").each(function(i, element) {
    results.push($(element).text());
    })
    res.json(results)
})
    

});

router.use(function (req, res) {
    res.sendFile(path.join(__dirname, "../client/public/index.html"));
});


module.exports = router;