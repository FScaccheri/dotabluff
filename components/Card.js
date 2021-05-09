const styles = {
    card: {
        border: "2px solid black",
        borderRadius: "5px",
        width: "100px",
        height: "60px",
        margin: "0 20px",
        textAlign: "center"
    }
}

export default function Card(props) {
    return (
        <div style={styles.card}>
            <p>{props.heroName}</p>
        </div>
    )
}