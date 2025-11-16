const API_URL = "http://localhost:3001/creature";

// --- API CRUD usando backend ---
export const api = {
  async getAll() {
    const res = await fetch(API_URL);
    const data = await res.json();
    return { data };
  },

  async getById(id) {
    const res = await fetch(`${API_URL}/${id}`);
    const data = await res.json();
    return { data };
  },

  async create(creature) {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(creature)
    });
    const data = await res.json();
    return { data };
  },

  async update(id, updatedCreature) {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedCreature)
    });
    const data = await res.json();
    return { data };
  },

  async remove(id) {
    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    const data = await res.json();
    return { data };
  }
};

// --- Script de migração do LocalStorage para MongoDB ---
export async function migrateLocalStorageToAPI() {
  const items = JSON.parse(localStorage.getItem("creatures") || "[]");
  for (const c of items) {
    try {
      await api.create(c); // envia cada criatura para o backend
      console.log("Migrado:", c);
    } catch (err) {
      console.error("Erro ao migrar:", c, err);
    }
  }
  console.log("Migração concluída!");
}