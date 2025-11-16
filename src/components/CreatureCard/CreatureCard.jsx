import styles from "./CreatureCard.module.css";

export default function CreatureCard({ creature, onClick, onHover }) {
  const imgSrc = creature.imageUrl || creature.imageBase64 || "";

  return (
    <div
      className={styles.card}
      onClick={onClick}
      onMouseEnter={onHover}
      style={{ cursor: "pointer" }}
    >
      <img src={imgSrc} alt={creature.name} className={styles.image} />
      <h3>{creature.name}</h3>
      <p>Tipo: {creature.type}</p>
      <p>Level: {creature.level ?? 1}</p>
      <p>Habitat: {creature.habitat || "-"}</p>
    </div>
  );
}