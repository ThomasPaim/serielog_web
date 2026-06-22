<template>
  <main>
    <h1>SerieFlow</h1>

    <section>
      <label>
        Genero
        <select v-model="generoSelecionado">
          <option value="">Todos</option>
          <option value="Drama">Drama</option>
          <option value="Ficcao">Ficcao Cientifica</option>
          <option value="Comedia">Comedia</option>
          <option value="Historia">Historia</option>
          <option value="Aventura">Aventura</option>
        </select>
      </label>

      <label>
        Status
        <select v-model="statusSelecionado">
          <option value="">Todos</option>
          <option value="assistida">Assistida</option>
          <option value="nao-assistida">Nao assistida</option>
        </select>
      </label>
    </section>

    <p v-if="erro">{{ erro }}</p>

    <SerieLista
      :series="seriesFiltradas"
      @excluir="excluirSerie"
    />
  </main>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import SerieLista from "../components/SerieLista.vue";

const series = ref([]);
const erro = ref("");
const generoSelecionado = ref("");
const statusSelecionado = ref("");

const seriesFiltradas = computed(() => {
  return series.value.filter((serie) => {
    const filtroGenero =
      !generoSelecionado.value ||
      serie.genero === generoSelecionado.value;

    const filtroStatus =
      !statusSelecionado.value ||
      (statusSelecionado.value === "assistida" && serie.assistida) ||
      (statusSelecionado.value === "nao-assistida" && !serie.assistida);

    return filtroGenero && filtroStatus;
  });
});

async function listarSeries() {
  try {
    erro.value = "";

    const response = await fetch("http://localhost:3000/series");

    if (!response.ok) {
      throw new Error("Erro ao buscar series");
    }

    series.value = await response.json();
  } catch (error) {
    erro.value = error.message;
  }
}

async function excluirSerie(id) {
  try {
    erro.value = "";

    const response = await fetch(`http://localhost:3000/series/${id}`, {
      method: "DELETE"
    });

    if (!response.ok) {
      throw new Error("Erro ao excluir serie");
    }

    series.value = series.value.filter((serie) => serie.id !== id);
  } catch (error) {
    erro.value = error.message;
  }
}

onMounted(() => {
  listarSeries();
});
</script>
