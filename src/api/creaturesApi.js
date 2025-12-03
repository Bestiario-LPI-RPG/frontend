const API_URL = `${process.env.REACT_APP_BACKEND_URL}/creature`;

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

export async function migrateLocalStorageToAPI() {
  const items = JSON.parse(localStorage.getItem("creatures") || "[]");
  for (const c of items) {
    try {
      await api.create(c);
      console.log("Migrado:", c);
    } catch (err) {
      console.error("Erro ao migrar:", c, err);
    }
  }
  console.log("Migração concluída!");
}