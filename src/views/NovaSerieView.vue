<template>
  <main>
    <h1>Nova Série</h1>

    <form @submit.prevent="criarNovaSerie">

      <div>
        <label>Título:</label>
        <input
          type="text"
          v-model="titulo"
          required
        >
      </div>

      <div>
        <label>Gênero:</label>
        <input
          type="text"
          v-model="genero"
          required
        >
      </div>

      <div>
        <label>Nota:</label>
        <input
          type="number"
          min="0"
          max="10"
          step="0.1"
          v-model.number="nota"
          required
        >
      </div>

      <div>
        <label>Ano:</label>
        <input
          type="number"
          v-model.number="ano"
          required
        >
      </div>

      <button type="submit">
        Salvar
      </button>

    </form>

    <p v-if="erro">
      {{ erro }}
    </p>
  </main>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const titulo = ref("");
const genero = ref("");
const nota = ref(null);
const ano = ref(null);
const erro = ref("");

async function criarNovaSerie() {
  try {
    erro.value = "";

    const dados = {
      titulo: titulo.value,
      genero: genero.value,
      nota: nota.value,
      ano: ano.value,
      assistida: false
    };

    const response = await fetch(
      "http://localhost:3000/series",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
      }
    );

    if (!response.ok) {
      throw new Error("Erro ao criar série");
    }

    // Volta para a Home após cadastrar
    router.push("/");

  } catch (error) {
    erro.value = error.message;
  }
}
</script>