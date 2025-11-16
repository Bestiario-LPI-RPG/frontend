import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/creaturesApi";
import styles from "./Create.module.css";

export default function Create() {
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [level, setLevel] = useState(1);
    const [habitat, setHabitat] = useState("");
    const navigate = useNavigate();
    const toBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });

    async function handleSubmit(e) {
        e.preventDefault();

        const creature = {
            name,
            type,
            level,
            habitat,
            imageUrl: imageUrl || null
        };

        if (imageFile) {
            creature.imageBase64 = await toBase64(imageFile);
        }

        await api.create(creature);
        navigate("/");
    }

    return (
        <div className={styles.container}>
            <h1>Cadastrar Criatura</h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <input
                    type="text"
                    placeholder="Tipo"
                    value={type}
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
                    placeholder="URL da imagem"
                    value={imageUrl}
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
        </div>
    );
}