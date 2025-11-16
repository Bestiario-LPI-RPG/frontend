import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CreatureCard from "../../components/CreatureCard/CreatureCard";
import styles from "./Home.module.css";
import { api } from "../../api/creaturesApi";

export default function Home() {
  const [creatures, setCreatures] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    loadCreatures();
  }, []);

  const loadCreatures = async () => {
    const { data } = await api.getAll();
    setCreatures(data);
  };

  const filtered = creatures.filter((c) =>
    (c.name || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h1 className={styles.title}>Bestiário RPG</h1>

      <button className={styles.addButton} onClick={() => navigate("/nova")}>
        Adicionar Criatura
      </button>

      <input
        type="text"
        placeholder="Buscar criatura..."
        className={styles.search}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className={`${styles.grid} fade-in`}>
        {filtered.length === 0 ? (
          <p className={styles.noCreatures}>📜 Nenhuma criatura encontrada no grimório.</p>
        ) : (
          filtered.map(c => (
            <CreatureCard
              key={c.id}
              creature={c}
              onClick={() => (window.location = `/editar/${c.id}`)}
            />
          ))
        )}
      </div>
    </div>
  );
}