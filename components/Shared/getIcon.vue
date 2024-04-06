<template>
  <component :is="currentIcon" />
</template>

<script setup>
const props = defineProps({
  name: { type: String, required: true }
});
const technologies = {
  CSS: resolveComponent('SvgoTechnologiesCSS'),
  HTML: resolveComponent('SvgoTechnologiesHTML'),
  JS: resolveComponent('SvgoTechnologiesJavaScript'),
  Nuxt: resolveComponent('SvgoTechnologiesNuxt'),
  Figma: resolveComponent('SvgoTechnologiesFigma'),
  Python: resolveComponent('SvgoTechnologiesPython'),
  React: resolveComponent('SvgoTechnologiesReact'),
  Dart: resolveComponent('SvgoTechnologiesDart'),
  FastApi: resolveComponent('SvgoTechnologiesFastApi'),
  Cpp: resolveComponent('SvgoTechnologiesCpp'),
  OpenGL: resolveComponent('SvgoTechnologiesOpenGl'),
  Cs: resolveComponent('SvgoTechnologiesCs'),
  Kotlin: resolveComponent('SvgoTechnologiesKotlin'),
  Laravel: resolveComponent('SvgoTechnologiesLaravel'),
  Modx: resolveComponent('SvgoTechnologiesModx'),
  Next: resolveComponent('SvgoTechnologiesNext'),
  Node: resolveComponent('SvgoTechnologiesNode'),
  OpenCV: resolveComponent('SvgoTechnologiesOpenCv'),
  PostgresSQL: resolveComponent('SvgoTechnologiesPostgresSql'),
  Swift: resolveComponent('SvgoTechnologiesSwift'),
  Symfony: resolveComponent('SvgoTechnologiesSymfony'),
  UnrealEngine: resolveComponent('SvgoTechnologiesUnreal'),
  Wordpress: resolveComponent('SvgoTechnologiesWordpress')
};
// TODO добавить все технологии и страны

const currentIcon = computed(() => {
  switch (props.name) {
    case 'CSS':
      return technologies.CSS;
    case 'HTML':
      return technologies.HTML;
    case 'JAVASCRIPT':
      return technologies.JS;
    case 'NUXT.JS':
      return technologies.Nuxt;
    case 'FIGMA':
      return technologies.Figma;
    case 'PYTHON':
      return technologies.Python;
    case 'REACT.JS':
      return technologies.React;
    case 'DART':
      return technologies.Dart;
    case 'FAST API':
      return technologies.FastApi;
    case 'C++':
      return technologies.Cpp;
    case 'OPEN GL':
      return technologies.OpenGL;
    case 'C#':
      return technologies.Cs;
    case 'KOTLIN':
      return technologies.Kotlin;
    case 'LARAVEL':
      return technologies.Laravel;
    case 'MODX':
      return technologies.Modx;
    case 'NEXT.JS':
      return technologies.Next;
    case 'NODE.JS':
      return technologies.Node;
    case 'OPEN CV':
      return technologies.OpenCV;
    case 'POSTGRESQL':
      return technologies.PostgresSQL;
    case 'SWIFT':
      return technologies.Swift;
    case 'SYMFONY':
      return technologies.Symfony;
    case 'UNREAL ENGINE':
      return technologies.UnrealEngine;
    case 'WORDPRESS':
      return technologies.Wordpress;
  }
});
</script>

<style scoped lang="scss"></style>
