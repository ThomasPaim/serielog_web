<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const serie = ref(null);

async function carregarSerie() {
  const response = await fetch(
    `http://localhost:3000/series/${route.params.id}`
  );

  serie.value = await response.json();
}

onMounted(() => {
  carregarSerie();
});
</script>

<template>
  <div v-if="serie">
    <h1>{{ serie.titulo }}</h1>
    <p>{{ serie.genero }}</p>
    <p>{{ serie.ano }}</p>
    <p>{{ serie.nota }}</p>
  </div>
</template>