const axios = require("axios");
const cheerio = require("cheerio");
const Parser = require("rss-parser");

const parser = new Parser();

const fetchRssUrls = async () => {
  let rssUrls = {};
  try {
    const response = await axios.get(
      "https://timesofindia.indiatimes.com/rss.cms"
    );
    const html = response.data;
    const $ = cheerio.load(html);

    $("#main-copy .rssp .rssurl").each((index, element) => {
      const url = $(element).attr("href");
      const category = $(element).closest("td").prev("td").text().trim();
      if (url && category) {
        rssUrls[category] = url;
      }
    });
    return rssUrls;
    // console.log("RSS URLs fetched:", rssUrls);
  } catch (error) {
    console.error("Error fetching RSS URLs:", error);
  }
};

const fetchRssFeeds = async (url, type) => {
  const feedUrl = await axios.get(url);
  const feedData = await parser.parseString(feedUrl.data);
  const data = feedData?.items.map(
    ({ title, link, contentSnippet, isoDate }) => {
      ({
        title: title,
        link: link,
        image_url: feedData?.image?.url,
        description: contentSnippet,
        pubDate: isoDate,
      });
    }
  );
  return data;
};

const fetchStates = async (stateCode) => {
  const url = `https://results.eci.gov.in/PcResultGenJune2024/partywiseresult-${stateCode}.htm`;
  console.log(url);

  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    const stateName = $(".page-title h2 span strong").text().trim();

    const selectData = [];
    $("#ctl00_ContentPlaceHolder1_Result1_ddlState option").each(
      (index, element) => {
        const value = $(element).attr("value");
        const label = $(element).text().trim();

        if (value) {
          selectData.push({ label, value });
        }
      }
    );

    const assemblyData = Promise.all(
      selectData.map(async ({ label, value }) => {
        const gotoLink = `https://results.eci.gov.in/PcResultGenJune2024/Constituencywise${value}.htm`;
        const response = await axios.get(gotoLink);
        const html = response.data;
        const $ = cheerio.load(html);

        const constName = $(".page-title h2 span strong").text().trim();

        let results = [];
        $("table.table tbody tr").each((index, element) => {
          const row = $(element).children("td");
          const result = {
            state: stateName,
            constituency: constName,
            sn: $(row[0]).text().trim(),
            candidate: $(row[1]).text().trim(),
            party: $(row[2]).text().trim(),
            evmVotes: $(row[3]).text().trim(),
            postalVotes: $(row[4]).text().trim(),
            totalVotes: $(row[5]).text().trim(),
            percentVotes: $(row[6]).text().trim(),
          };
          results.push(result);
        });
        return results;
      })
    );
    const modifiedData = (await assemblyData).flat();
    const sortedData = modifiedData
      .map((item) => {
        const pcNo = item.constituency?.split("-")[0];
        const pcName = item.constituency?.split("-")[1]?.includes(" (")
          ? item.constituency?.split("-")[1]?.split("(")[0]
          : item.constituency?.split("-")[1];
        return {
          State: item.state,
          Constituency: pcName,
          PC_NO: pcNo,
          Position: item.sn,
          Candidate: item.candidate,
          Party: item.party,
          Evm_Votes: item.evmVotes,
          Postal_Votes: item.postalVotes,
          Total_Votes: item.totalVotes,
          Percent_Votes: item.percentVotes,
        };
      })
      .sort((a, b) => a.PC_NO - b.PC_NO);
    return sortedData;
  } catch (error) {
    console.log("error >>>>>>", error.message);
    console.error("Error fetching data:", error);
  }
};

module.exports = { fetchRssUrls, fetchRssFeeds, fetchStates };
