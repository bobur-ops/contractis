<template>
  <article class="order-card-main">
    <div class="order-card-main__inner">
      <div class="order-card-main__top">
        <div class="order-card-main__top-left">
          <h1 class="order-card-main__title">
            {{ trimText(title, 45) }}
            <svgo-profile-solo
              v-if="team === 'solo'"
              class="order-card-main__title-icon"
            />
            <svgo-profile-team
              v-else-if="team === 'team'"
              class="order-card-main__title-icon"
            />
          </h1>
          <shared-category
            v-if="category"
            :category="category"
            :specialization="specialization"
            class="order-card-main__categories"
          />
          <h2 class="order-card-main__keywords">
            Ключевые слова:
            <span class="order-card-main__keywords-list">{{ keywords }}</span>
          </h2>
        </div>
        <div class="order-card-main__top-right">
          <span v-if="startPrice || endPrice" class="order-card-main__price">
            <span v-if="startPrice">
              {{ new Intl.NumberFormat('ru-RU').format(startPrice) }}
            </span>
            <span v-if="endPrice">
              - {{ new Intl.NumberFormat('ru-RU').format(endPrice) }}
            </span>
            <span class="order-card-main__price-format"> ₽</span>
          </span>
          <shared-deadline
            :max-period="maxPeriod"
            :min-period="minPeriod"
            :format-period="formatPeriod"
            class="order-card-main__period"
          />
        </div>
      </div>
      <h2 class="order-card-main__technologies">
        Технологии: <span v-if="!technologies.length">нет</span>
        <shared-technologies :technologies="technologies" />
      </h2>
      <div class="order-card-main__description">
        <h2 class="order-card-main__description-title">Описание задачи:</h2>
        <p>{{ trimText(description, maxDescriptionLength) }}</p>
        <span
          v-if="isTrimmed"
          class="order-card-main__description-show"
          @click="maxDescriptionLength = 0"
        >
          Показать полностью
        </span>
      </div>
      <h2 v-if="files.length" class="order-card-main__file-label">
        Приложенные файлы:
      </h2>
      <shared-files v-if="files.length" :files="files" />
      <form-textarea
        id="response-text"
        v-model="textareaModel"
        placeholder="Напишите текст вашего отклика"
        label="Ваш отклик:"
        margin-bottom="40px"
        :limit="`${textareaModel.length}/2500`"
      />
      <div class="order-card-main__range-block">
        <form-filter-ui-range title="Стоимость" units="₽" margin-bottom="0" />
        <form-filter-ui-range
          title="Срок"
          :units="timeFormats"
          input-width="110px"
          borders="15px 0 0 15px"
          margin-bottom="0"
        />
      </div>
      <shared-examples class="order-card-main__examples" :examples="examples" />
      <span class="order-card-main__examples-category">
        Автоматически выбрано 3 работы из категории
        <shared-category :category="2" />
      </span>
      <shared-button-gradient-blue
        button-height="50px"
        font-size="20px"
        button-width="392px"
        border="10px"
        @click.prevent
      >
        Оставить отклик
      </shared-button-gradient-blue>
    </div>
  </article>
</template>

<script setup>
import { timeFormats } from '~/components/Form/Filter/model';
import { examples } from '~/components/Order/Card/model';

const { trimText, isTrimmed } = useFormatting();
const maxDescriptionLength = ref(500);

const props = defineProps({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  team: { type: String, required: true },
  startPrice: { type: Number, required: true },
  endPrice: { type: Number, default: null },
  minPeriod: { type: Number, default: null },
  maxPeriod: { type: Number, default: null },
  formatPeriod: { type: String, default: 'h' },
  category: { type: Object, default: () => {} },
  specialization: { type: Object, default: () => {} },
  files: { type: Array, default: () => [] },
  keywords: { type: Array, default: () => [] },
  technologies: { type: Array, default: () => [] }
});

const keywords = computed(() =>
  props.keywords.length
    ? props.keywords.map((item) => item.name).join(', ')
    : 'нет'
);
const textareaModel = ref('');
</script>

<style scoped lang="scss">
@import 'style';
</style>
