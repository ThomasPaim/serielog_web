<template>
  <main>
    <h1>Editar Serie</h1>

    <p v-if="erro">{{ erro }}</p>

    <form v-if="serie" @submit.prevent="salvarSerie">
      <div>
        <label>Titulo:</label>
        <input v-model="serie.titulo" required>
      </div>

      <div>
        <label>Genero:</label>
        <input v-model="serie.genero" required>
      </div>

      <div>
        <label>Nota:</label>
        <input
          v-model.number="serie.nota"
          type="number"
          min="0"
          max="10"
          step="0.1"
          required
        >
      </div>

      <div>
        <label>Ano:</label>
        <input
          v-model.number="serie.ano"
          type="number"
          required
        >
      </div>

      <div>
        <label>Assistida:</label>
        <input
          v-model="serie.assistida"
          type="checkbox"
        >
      </div>

      <button type="submit">Salvar</button>
    </form>
  </main>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const serie = ref(null);
const erro = ref("");

async function carregarSerie() {
  try {
    erro.value = "";

    const response = await fetch(
      `http://localhost:3000/series/${route.params.id}`
    );

    if (!response.ok) {
      throw new Error("Erro ao buscar serie");
    }

    serie.value = await response.json();
  } catch (error) {
    erro.value = error.message;
  }
}

async function salvarSerie() {
  try {
    erro.value = "";

    const response = await fetch(
      `http://localhost:3000/series/${route.params.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(serie.value)
      }
    );

    if (!response.ok) {
      throw new Error("Erro ao atualizar serie");
    }

    router.push("/");
  } catch (error) {
    erro.value = error.message;
  }
}

onMounted(() => {
  carregarSerie();
});
</script>
