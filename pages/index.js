import Head from 'next/head'
import { useState } from 'react'

const styles = {
  yourTeamHeroName: {
    color: "blue",
    fontSize: "80%",
  }
}

export default function Home() {
  const [mainInput, setMainInput] = useState("");
  const [yourTeam, setYourTeam] = useState([]);
  const [recommendedPicks, setRecommendedPicks] = useState([]);

  const addHero = async () => {
    const response = await fetch(`/api/recommended-picks?hero=${mainInput}`);
    const newRecommendedPicks = await response.json();
    setRecommendedPicks([...recommendedPicks, ...newRecommendedPicks]);
    setYourTeam([...yourTeam, mainInput]);
    setMainInput("");
  }
  return (
    <div>
      <Head>
        <title>DotaBluff</title>
      </Head>
      <div>
        <input type="text" value={mainInput} onChange={(event) => setMainInput(event.target.value)}></input>
        <button onClick={addHero}>Add Hero</button>
        <button onClick={() => console.log(mainInput)}>DEV TOOLS</button>
      </div>
      <div>
        <p>Your team:</p>
        {yourTeam.map((hero) => {
          return (
            <p style={styles.yourTeamHeroName}>{hero}</p>
          );
        })}
      </div>
      <div>
        <p>Recommended picks:</p>
      </div>
    </div>
  )
}
