<template>
  <shared-button-edit @to-edit="toEdit">
    <div class="profile-about">
      <h2 v-if="userRole === 'performer'" class="profile-about__title">
        Об исполнителе
      </h2>
      <h2 v-else class="profile-about__title">О заказчике</h2>
      <div class="profile-about__main-data">
        <div class="profile-about__data-item">
          <div class="profile-about__icon-block">
            <svgo-profile-badge
              class="profile-about__icon profile-about__icon_badge"
            />
          </div>
          <div class="profile-about__data-text-block">
            <p class="profile-about__data-title">На площадке</p>
            <p
              v-if="userData?.user.profile?.experience"
              class="profile-about__data"
            >
              {{ userData?.user.profile?.experience }}
              {{
                getNoun(
                  userData?.user.profile?.experience,
                  'день',
                  'дня',
                  'дней'
                )
              }}
            </p>
            <p v-else class="profile-about__data">Менее месяца</p>
          </div>
        </div>
        <div v-if="userRole === 'performer'" class="profile-about__data-item">
          <div class="profile-about__icon-block">
            <svgo-profile-photo-library
              class="profile-about__icon profile-about__icon_photo"
            />
          </div>
          <div class="profile-about__data-text-block">
            <p class="profile-about__data-title">Портфолио</p>
            <p
              v-if="userData?.user.profile?.cases?.length"
              class="profile-about__data"
            >
              {{ userData?.user.profile?.cases?.length }}
              {{
                getNoun(
                  userData?.user.profile?.cases?.length,
                  'работа',
                  'работы',
                  'работ'
                )
              }}
            </p>
            <p v-else class="profile-about__data">Нет работ</p>
          </div>
        </div>
        <div v-if="userRole === 'client'" class="profile-about__data-item">
          <div class="profile-about__icon-block">
            <svgo-profile-reviews
              class="profile-about__icon profile-about__icon_reviews"
            />
          </div>
          <div class="profile-about__data-text-block">
            <p class="profile-about__data-title">Завершенные заказы</p>
            <p
              v-if="userData.user.profile?.doneOrders"
              class="profile-about__data"
            >
              {{ userData.user.profile?.doneOrders }}
              {{
                getNoun(
                  userData.user.profile?.doneOrders,
                  'заказ',
                  'заказа',
                  'заказов'
                )
              }}
            </p>
            <p v-else class="profile-about__data">Нет</p>
          </div>
        </div>
        <div class="profile-about__data-item">
          <div class="profile-about__icon-block">
            <svgo-profile-team
              class="profile-about__icon profile-about__icon_team"
            />
          </div>
          <div class="profile-about__data-text-block">
            <p class="profile-about__data-title">Отзывы</p>
            <p class="profile-about__data">
              <span
                v-if="userData?.user.profile.reviews"
                class="profile-about__reviews"
              >
                <span class="profile-about__reviews_positive">
                  {{
                    userData?.user.profile?.reviews.filter((e) => e.rating >= 3)
                      ?.length
                  }}
                  +
                </span>
                /
                <span class="profile-about__reviews_negative">
                  {{
                    userData?.user.profile?.reviews.filter((e) => e.rating < 3)
                      ?.length
                  }}
                  -
                </span>
              </span>
              <span v-else class="profile-about__reviews"> Отзывов нет </span>
            </p>
          </div>
        </div>
        <div v-if="userRole === 'client'" class="profile-about__data-item">
          <div class="profile-about__icon-block">
            <svgo-profile-reviews
              class="profile-about__icon profile-about__icon_reviews"
            />
          </div>
          <div class="profile-about__data-text-block">
            <p class="profile-about__data-title">В поиске исполнителя</p>
            <p
              v-if="userData.user.profile?.openOrders"
              class="profile-about__data"
            >
              {{ userData.user.profile?.openOrders }}
              {{
                getNoun(
                  userData.user.profile?.openOrders,
                  'заказ',
                  'заказа',
                  'заказов'
                )
              }}
            </p>
            <p v-else class="profile-about__data">Нет</p>
          </div>
        </div>
        <div
          v-if="userType === 'Team' && userRole === 'performer'"
          class="profile-about__data-item"
        >
          <div class="profile-about__icon-block">
            <svgo-profile-team
              class="profile-about__icon profile-about__icon_team"
            />
          </div>
          <div class="profile-about__data-text-block">
            <p class="profile-about__data-title">В команде</p>
            <p
              v-if="userData?.user.profile?.team?.length"
              class="profile-about__data"
            >
              {{ userData?.user.profile?.team?.length }}
              {{
                getNoun(
                  userData?.user.profile?.team?.length,
                  'человек',
                  'человека',
                  'людей'
                )
              }}
            </p>
            <p v-else class="profile-about__data">Не указанно</p>
          </div>
        </div>
      </div>
      <div class="profile-about__details">
        <p v-if="userRole === 'performer'" class="profile-about__price-block">
          Ставка часа исполнителя:
          <span
            v-if="userData?.user.profile.price"
            class="profile-about__price"
          >
            {{ userData.user.profile.price }}
          </span>
          <span v-else class="profile-about__price">Не указана</span>
        </p>
        <p
          v-if="userRole === 'performer' && categoriesList.length"
          class="profile-about__categories"
        >
          Категории:
          <shared-category
            :category="categoriesList"
            :categories="filters.categories"
          />
        </p>
        <p
          v-if="userData.user.profile.description"
          class="profile-about__description"
          :class="{ 'profile-about__description_trim': !showText }"
        >
          {{ userData.user.profile.description }}
        </p>
        <p v-else class="profile-about__description">Описание не указано</p>
        <shared-arrow-text-animate
          v-if="!showText"
          font-size="18px"
          font-weight="500"
          @click.prevent="toShowText(true)"
        >
          Подробнее
        </shared-arrow-text-animate>
        <shared-arrow-text-animate
          v-else
          font-size="18px"
          font-weight="500"
          @click.prevent="toShowText(false)"
        >
          Скрыть
        </shared-arrow-text-animate>
      </div>
    </div>
  </shared-button-edit>
</template>

<script setup>
// todo сделай чудо со статой в shared-stats
defineProps({
  userType: {
    type: [String, null],
    default: null,
    validator: (value) => ['Team', 'Solo', null].includes(value)
  },
  userRole: {
    type: String,
    required: true,
    validator: (value) => ['performer', 'client'].includes(value)
  }
});
const { getNoun } = useWordCase();
const userData = useUserData();
const emit = defineEmits(['toEdit']);
const toEdit = () => emit('toEdit');

const filters = useFiltersData();
const { getCategories } = useFilters();
if (!filters.value.categories?.length) getCategories();

const showText = ref(false);
const toShowText = (val) => (showText.value = val);
const categoriesList = computed(() => {
  if (userData.value.user.profile.mainCategory)
    return [
      userData.value.user.profile.mainCategory,
      ...userData.value.user.profile.additionalCategories
    ];
  else return userData.value.user.profile.additionalCategories;
});
// TODO вынести scss
</script>

<style scoped lang="scss">
.profile-about {
  @apply flex flex-col;
  gap: 30px;
  background: $bg-black-block;
  border-radius: $border-radius-m;
  padding: 35px;
  &__title {
    font-size: 24px;
    font-weight: 600;
  }
  &__main-data {
    @apply flex;
    gap: 45px;
  }
  &__icon-block {
    @apply flex justify-center items-center;
    background: $gray-05;
    border-radius: $border-radius-rounded;
    height: 45px;
    width: 45px;
  }
  &__icon {
    &_badge {
      width: 18px;
    }
    &_photo {
      width: 17px;
    }
    &_reviews {
      width: 18px;
    }
    &_team {
      width: 22px;
    }
  }
  &__reviews {
    line-height: 8px;
    font-weight: 500;
    font-size: 12px;
    letter-spacing: 0.25px;
    &_positive {
      color: #468744;
    }
    &_negative {
      color: #b74040;
    }
  }
  &__data-item {
    @apply flex;
    gap: 20px;
  }
  &__data-title {
    font-size: 15px;
    font-weight: 500;
  }
  &__data {
    font-size: 12px;
    font-weight: 400;
  }
  &__data-text-block {
    @apply flex flex-col justify-center;
  }
  &__price-block {
    @apply flex items-center;
    gap: 15px;
    font-size: 18px;
    font-weight: 600;
    line-height: 100%;
  }
  &__price {
    @include gradient-text($base-font, 20px, 400);
  }
  &__details {
    @apply flex flex-col;
    gap: 30px;
  }
  &__categories {
    @apply flex items-center;
    gap: 10px;
  }
  &__description {
    font-size: 18px;
    font-weight: 400;
    &_trim {
      @apply overflow-hidden;
      -webkit-line-clamp: 6;
      -webkit-box-orient: vertical;
      display: -webkit-box;
    }
  }
}
</style>
