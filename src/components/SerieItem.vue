<template>
  <article>
    <h2>{{ serie.titulo }}</h2>
    <p>Genero: {{ serie.genero }}</p>
    <p>Nota: {{ serie.nota }}</p>
    <p>Status: {{ serie.assistida ? "Assistida" : "Nao assistida" }}</p>

    <button @click="$emit('excluir', serie.id)">
      Excluir
    </button>

    <router-link :to="`/series/${serie.id}`">
      Editar
    </router-link>
  </article>
</template>

<script setup>
defineProps({
  serie: {
    type: Object,
    required: true
  }
});

defineEmits(["excluir"]);
</script>
