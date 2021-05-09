import Head from 'next/head'
import { useState } from 'react'
import Card from '../components/Card'

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
  },
  cardsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
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
    return sortedList.filter(hero => !enemyTeam.includes(hero.name.toLowerCase())).slice(0, 10).map(hero => <Card heroName={hero.name} />);
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
          <div style={styles.cardsContainer}>
            {enemyTeam.map((hero) => {
              return (
                <Card heroName={hero}/>
              );
            })}
          </div>
        </div>
        <div>
          <p>Recommended picks:</p>
          <div style={styles.cardsContainer}>
            {getFormattedRecommendedPicks()}
          </div>
        </div>
      </main>
    </div>
  )
}
