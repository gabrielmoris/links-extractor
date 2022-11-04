require("dotenv").config();
const { jsonMaker } = require("./modules/json-maker");
const axios = require("axios");
var cheerio = require("cheerio");

var baseUrl = process.env.WEB_TO_CHECK;

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
    let httpResponse = await axios.get(url);

    let $ = cheerio.load(httpResponse.data);
    let linkObjects = $("a"); // get all hyperlinks
    let hrefLink;
    linkObjects.each((index, element) => {
      if (
        $(element).text().trim().replace(" ", "") !== "" &&
        $(element).attr("href") &&
        $(element).attr("href") !== "#"
      ) {
        // get the href attribute
        if ($(element).attr("href").substring(0, 4) != "http") {
          hrefLink = process.env.HOMEPAGE + $(element).attr("href");
        } else {
          hrefLink = $(element).attr("href");
        }
        links.push({
          text: $(element).text().trim().replace(" ", ""), // get the text
          href: hrefLink,
        });
      }
    });
    jsonMaker(links);
    return ">>> results.json was created.";
  } catch (e) {
    console.log(e);
  }
}
