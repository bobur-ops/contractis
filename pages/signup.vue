<template>
  <AuthSignupStepOne v-if="stepRef === 0" @step-forward="stepForward" />
  <AuthSignupStepTwo v-else-if="stepRef === 1" />
</template>

<script setup>
definePageMeta({
  layout: 'auth'
});

const stepRef = ref(0);

const stepForward = () => {
  stepRef.value++;
};
</script>
