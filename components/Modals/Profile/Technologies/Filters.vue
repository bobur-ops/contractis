<template>
  <form-filter-ui-multi-accordion
    title="Выберите технологии"
    :filters="technologies"
    :init-val="initTechnologies"
    :multiple-radio="false"
    :switchable-radio="true"
    margin-bottom="0"
    :default-open="true"
    @update-checkbox="updateTechnologies"
  />
</template>

<script setup>
defineProps({
  initTechnologies: { type: Array, default: () => [] },
  technologies: { type: Array, required: true }
});
const emits = defineEmits(['updateTechnologies']);

let technologiesValues = [];
const updateTechnologies = (val) => {
  technologiesValues = val;
  emits('updateTechnologies', technologiesValues);
};
</script>

<style scoped lang="scss"></style>
