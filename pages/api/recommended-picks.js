// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import cheerio from "cheerio"

export default async (req, res) => {
  const response = await fetch("https://www.dotabuff.com/heroes/anti-mage");
  const html = await response.text();

  const $ = cheerio.load(html);
  const worstVersus = $("header:contains(Worst Versus)").parent().find('tbody').children();
  const heroes = [];
  for (const heroSelector of worstVersus) {
    console.log(heroSelector.children[1].children)
  }
  const recommendedPicks = ["morphling"];
  res.status(200).json(recommendedPicks);
}
