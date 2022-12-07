require("dotenv").config();
const { jsonMaker } = require("./modules/json-maker");
const axios = require("axios");
var cheerio = require("cheerio");

var baseUrl = "https://formvalidation.io/guide/validators/iban/";

(async () => {
  try {
    let homePageLinks = await getLinksFromURL(baseUrl);
    console.log(homePageLinks);
  } catch (e) {
    console.log(e);
  }
})();

async function getLinksFromURL(url) {
  try {
    let links = [];
    let countries = [];
    let ibans = [];
    let httpResponse = await axios.get(url);

    let $ = cheerio.load(httpResponse.data);
    let countriesArr = $("td:nth-child(1)"); // get all countries
    let ibansArr = $("td:nth-child(4)"); //get all ibans
    countriesArr.each((index, element) => {
      if (index > 2) {
        countries.push($(element).text().trim().replace(" ", ""));
      }
    });
    ibansArr.each((index, element) => {
      if (index > 2) {
        ibans.push($(element).text().trim().replace(" ", ""));
      }
    });
    for (let i = 0; i < countries.length; i++) {
      links.push({
        country: countries[i],
        iban: ibans[i],
      });
    }

    jsonMaker(links);
    return ">>> results.json was created in folder /results.";
  } catch (e) {
    console.log(e);
  }
}
