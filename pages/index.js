import Head from 'next/head'
import { useState } from 'react'

const styles = {
  enemyTeamHeroName: {
    color: "red",
    fontSize: "80%",
  },
  recommendedPickHeroName: {
    color: "blue",
    fontSize: "80%",
  },
  mainContainer: {
    margin: "5%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  }
}

export default function Home() {
  const [mainInput, setMainInput] = useState("");
  const [enemyTeam, setEnemyTeam] = useState([]);
  const [recommendedPicks, setRecommendedPicks] = useState({});

  const addHero = async () => {
    const response = await fetch(`/api/recommended-picks?hero=${mainInput}`);
    const apiPicks = await response.json();
    const newRecommendedPicks = Object.assign({}, recommendedPicks);
    console.log(newRecommendedPicks);
    for (const hero of apiPicks) {
      if (newRecommendedPicks[hero.name]) {
        newRecommendedPicks[hero.name].priority++;
      } else {
        newRecommendedPicks[hero.name] =  { name: hero.name, priority: 1 };
      }
    }
    setRecommendedPicks(newRecommendedPicks);
    setEnemyTeam([...enemyTeam, mainInput]);
    setMainInput("");
  }

  const devTools = async () => {
    console.log(enemyTeam);
    console.log(recommendedPicks);
  }

  const getFormattedRecommendedPicks = () => {
    const picksList = Object.values(recommendedPicks);
    const sortedList = picksList.sort((heroA, heroB) => heroB.priority - heroA.priority)
    return sortedList.filter(hero => !enemyTeam.includes(hero.name.toLowerCase())).slice(0, 10).map(hero => <p style={styles.recommendedPickHeroName}>{hero.name}</p>);
  }

  return (
    <div>
      <Head>
        <title>DotaBluff</title>
      </Head>
      <main style={styles.mainContainer}>
        <div>
          <input type="text" value={mainInput} onChange={(event) => setMainInput(event.target.value)}></input>
          <button onClick={addHero}>Add Hero</button>
        </div>
        <div>
          <p>Enemy team:</p>
          {enemyTeam.map((hero) => {
            return (
              <p style={styles.enemyTeamHeroName}>{hero}</p>
            );
          })}
        </div>
        <div>
          <p>Recommended picks:</p>
          {getFormattedRecommendedPicks()}
        </div>
      </main>
    </div>
  )
}
