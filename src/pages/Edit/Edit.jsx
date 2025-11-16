import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../api/creaturesApi";
import styles from "./Edit.module.css";

export default function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [level, setLevel] = useState();
  const [habitat, setHabitat] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    api.getById(id).then((res) => {
      const c = res.data;
      if (!c) return;

      setName(c.name);
      setType(c.type);
      setLevel(c.level);
      setHabitat(c.habitat);
      setImageUrl(c.imageUrl || "");
    });
  }, [id]);

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  function handleDelete() {
    api.remove(id).then(() => navigate("/"));
  }

  async function handleSave(e) {
    e.preventDefault();

    const updated = {
      name,
      type,
      level,
      habitat,
      imageUrl: imageUrl || null
    };

    if (imageFile) {
      updated.imageBase64 = await toBase64(imageFile);
    }

    await api.update(id, updated);
    navigate("/");
  }

  return (
    <div className={styles.container}>
      <h1>Editar Criatura</h1>

      <form onSubmit={handleSave}>
        <input
          type="text"
          value={name}
          placeholder="Nome"
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="text"
          value={type}
          placeholder="Tipo"
          onChange={(e) => setType(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Level"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
        />

        <input
          type="text"
          placeholder="Habitat"
          value={habitat}
          onChange={(e) => setHabitat(e.target.value)}
        />

        <input
          type="text"
          value={imageUrl}
          placeholder="URL da imagem"
          onChange={(e) => setImageUrl(e.target.value)}
        />

        <label className={styles.hbt}>
          Escolher arquivo
          <input
            type="file"
            onChange={(e) => setImageFile(e.target.files[0])}
            style={{ display: "none" }}
          />
        </label>

        <button type="submit">Salvar</button>
      </form>

      <button className={styles.deleteBtn} onClick={handleDelete}>
        Excluir Criatura
      </button>
    </div>
  );
}