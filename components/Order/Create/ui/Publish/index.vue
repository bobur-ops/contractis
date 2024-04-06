<template>
  <aside class="order-create-publish">
    <shared-arrow-text-animate
      font-size="18px"
      font-weight="500"
      arrow-gap="15px"
      :revers="true"
      class="order-create-publish__undo-button"
      @click.prevent="lastPage"
    >
      Вернуться назад
    </shared-arrow-text-animate>
    <div class="order-create-publish__content">
      <h2 class="order-create-publish__title">Ваш заказ</h2>
      <h2 class="order-create-publish__title">Дополнительно</h2>
      <div class="order-create-publish__order">
        <div class="order-create-publish__inner">
          <div class="order-create-publish__top">
            <div class="order-create-publish__top-left">
              <h1 class="order-create-publish__order-title">
                {{ trimText(title, 45) }}
                <svgo-profile-solo
                  v-if="team === 'Solo'"
                  class="order-create-publish__team-icon"
                />
                <svgo-profile-team
                  v-else-if="team === 'Team'"
                  class="order-create-publish__team-icon"
                />
              </h1>
              <shared-category
                :category="category"
                :specialization="specialization"
                :categories="categories"
                class="order-create-publish__categories"
              />
              <h2 class="order-create-publish__keywords">
                Ключевые слова:
                <span class="order-create-publish__keywords-list">
                  {{ keywordsString }}
                </span>
              </h2>
            </div>
            <div class="order-create-publish__top-right">
              <span class="order-create-publish__price">
                <span v-if="startPrice">
                  {{ new Intl.NumberFormat('ru-RU').format(startPrice) }}
                </span>
                <span v-else-if="endPrice">
                  {{ new Intl.NumberFormat('ru-RU').format(endPrice) }}
                </span>
                <span v-if="endPrice && startPrice">
                  - {{ new Intl.NumberFormat('ru-RU').format(endPrice) }}
                </span>
                <span
                  v-if="endPrice || startPrice"
                  class="order-create-publish__price-format"
                >
                  ₽
                </span>
              </span>
            </div>
          </div>
          <h2 class="order-create-publish__technologies">
            Технологии: <span v-if="!getTechnologies.length">нет</span>
            <shared-technologies v-else :technologies="getTechnologies" />
          </h2>
          <div class="order-create-publish__description">
            <h2 class="order-create-publish__description-title">
              Описание задачи:
            </h2>
            <p>{{ trimText(description, maxDescriptionLength) }}</p>
            <span
              v-if="isTrimmed"
              class="order-create-publish__description-show"
              @click="maxDescriptionLength = 0"
            >
              Показать полностью
            </span>
          </div>
          <h2 v-if="files.length" class="order-create-publish__file-label">
            Приложенные файлы:
          </h2>
          <shared-files :files="files" margin-bottom="5px" />
        </div>
      </div>
      <div class="order-create-publish__aside">
        <div class="order-create-publish__aside-content">
          <div class="order-create-publish__fixing-block">
            <form-checkbox id="fixing" v-model="fixing" gap="15px">
              Закрепить наверху на 24 часа
            </form-checkbox>
            <p class="order-create-publish__text">
              После закрепления заказ останется наверху списка. Незакрепленные
              заказы будут смещаться вниз по мере поступления новых
            </p>
          </div>
          <div class="order-create-publish__payment-block">
            <div class="order-create-publish__total-block">
              <h3 class="order-create-publish__total-title">Итого к оплате:</h3>
              <span class="order-create-publish__price">
                <span v-if="!fixing"> 0 </span>
                <span v-else> 9999 </span>
                <span class="order-create-publish__price-format"> ₽ </span>
              </span>
            </div>
            <p class="order-create-publish__text">
              Сумма будет списана с вашего баланса
            </p>
          </div>
        </div>
        <shared-button-gradient-blue
          button-height="55px"
          font-size="20px"
          button-width="320px"
          :disabled="pending"
          @click.prevent="publish"
        >
          <shared-arrow-text-animate font-size="20px" font-weight="500">
            Опубликовать
          </shared-arrow-text-animate>
        </shared-button-gradient-blue>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { Orders } from '~/utils/api';

const router = useRouter();
const { trimText, isTrimmed } = useFormatting();
const emit = defineEmits(['publish', 'lastPage']);

const props = defineProps({
  title: { type: String, required: true },
  description: { type: String, required: true },
  team: { type: String, required: true },
  startPrice: { type: Number, default: null },
  endPrice: { type: Number, default: null },
  minPeriod: { type: Number, default: null },
  maxPeriod: { type: Number, default: null },
  formatPeriod: { type: String, default: 'h' },
  files: { type: Object, default: () => {} },
  filesData: { type: FormData, default: () => new FormData() },
  keywords: { type: Array, default: () => [] },
  technologiesList: { type: Array, default: () => [] },
  category: { type: Number, default: null },
  specialization: { type: Number, default: null },
  categories: { type: Array, default: () => {} },
  technologies: { type: Array, default: () => {} }
});

const { currentSlide } = useDashboard();
const pending = ref(false);
const lastPage = () => emit('lastPage', {});
const publish = async () => {
  pending.value = true;
  const postOrderData = {
    name: props.title,
    description: props.description,
    team: props.team,
    start_price: getLowerNumber(props.startPrice, props.endPrice),
    end_price: props.startPrice && props.endPrice ? props.endPrice : null,
    period_type: props.formatPeriod ? props.formatPeriod : 'h',
    min_period: getLowerNumber(props.minPeriod, props.maxPeriod),
    max_period: props.maxPeriod && props.minPeriod ? props.maxPeriod : null,
    technologies: props.technologiesList ? props.technologiesList : null,
    category: props.category ? props.category : null,
    specialization: props.specialization ? props.specialization : null,
    keywords: props.keywords,
    pinned: fixing.value
  };
  const {
    data: orderData,
    error: orderError,
    orderWithFiles
  } = await Orders.createOrder(
    postOrderData,
    props.files.length ? props.filesData : null
  );
  if (orderData.value || orderWithFiles.value) {
    pending.value = false;
    currentSlide.value = 2;
    console.log(orderData.value);
    await router.push('/dashboard');
  } else {
    pending.value = false;
    console.log(orderError.value);
  }
};
const fixing = ref(false);
const maxDescriptionLength = ref(500);

const keywordsString = computed(() =>
  props.keywords.length ? props.keywords.join(', ') : 'нет'
);
const getTechnologies = computed(() => {
  if (!props.technologiesList.length) return [];
  const tech = [];
  props.technologiesList.forEach((e) => {
    props.technologies.forEach((v) => {
      v.list.forEach((l) => {
        if (e === l.id) tech.push(l);
      });
    });
  });
  return tech;
});
const getLowerNumber = (lower, upper) => {
  if (lower) return lower;
  else if (upper) return upper;
  else return 0;
};
</script>

<style scoped lang="scss">
@import 'style';
</style>
