<template>
  <p v-if="series.length === 0">Nenhuma serie encontrada.</p>

  <div v-else>
    <SerieItem
      v-for="serie in series"
      :key="serie.id"
      :serie="serie"
      @excluir="$emit('excluir', $event)"
    />
  </div>
</template>

<script setup>
import SerieItem from "./SerieItem.vue";

defineProps({
  series: {
    type: Array,
    required: true
  }
});

defineEmits(["excluir"]);
</script>
