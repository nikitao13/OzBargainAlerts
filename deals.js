const axios = require("axios");
const { load } = require("cheerio");

const URL = "https://www.ozbargain.com.au/deals";

// returns the last 5 deals from OzBargain
async function fetchDeals() {
  const response = await axios.get(URL);
  const $ = load(response.data);

  const deals = [];

  const dealElements = $(".node.node-ozbdeal.node-teaser").toArray();
  const firstFiveDeals = dealElements.slice(0, 5);

  firstFiveDeals.forEach((elem) => {
    const title = $(elem).find("h2.title").text().trim();
    const linkElement = $(elem).find(".via a");
    const link = linkElement.attr("href");
  
    deals.push({
      title,
      link: link ? `https://www.ozbargain.com.au${link}` : null,
    });
  });

  console.log(deals);
  return deals;
}

fetchDeals();
