<template>
  <div id="reputation" class="profile-reputation">
    <h2 class="profile-reputation__title">Репутация и достижения</h2>
    <div class="profile-reputation__rating-block">
      <div class="profile-reputation__main-rating-block">
        <p class="profile-reputation__main-rating">
          {{ userData.user.rating?.main }}
        </p>
      </div>
      <div class="profile-reputation__detail-rating-block">
        <p class="profile-reputation__detail-title">
          <span class="profile-reputation__detail-title-string">
            {{ userData.user.firstName }} {{ userData.user?.lastName }}
          </span>
          <span
            v-if="userRole === 'performer'"
            class="profile-reputation__detail-title-string"
          >
            — находится на {{ userData.user.rating?.place }} месте в рейтинге
            Исполнителей
          </span>
          <span
            v-else-if="userRole === 'client'"
            class="profile-reputation__detail-title-string"
          >
            — завершил {{ completedOrders }}
            {{ getNoun(completedOrders, 'заказ', 'заказа', 'заказов') }} на
            площадке
          </span>
        </p>
        <div
          v-if="userRole === 'performer'"
          class="profile-reputation__stars-list"
        >
          <div class="profile-reputation__rating-item">
            <shared-stars :count="userData.user.rating.result" />
            <p class="profile-reputation__rating-title">Результат</p>
          </div>
          <div class="profile-reputation__rating-item">
            <shared-stars :count="userData.user.rating.term" />
            <p class="profile-reputation__rating-title">Соблюдение сроков</p>
          </div>
          <div class="profile-reputation__rating-item">
            <shared-stars :count="userData.user.rating.communicate" />
            <p class="profile-reputation__rating-title">Общение, понимание</p>
          </div>
        </div>
        <div
          v-else-if="userRole === 'client'"
          class="profile-reputation__stars-list"
        >
          <div class="profile-reputation__rating-item">
            <shared-stars :count="userData.user.rating.conditions" />
            <p class="profile-reputation__rating-title">Условия</p>
          </div>
          <div class="profile-reputation__rating-item">
            <shared-stars :count="userData.user.rating.feedback" />
            <p class="profile-reputation__rating-title">Обратная связь</p>
          </div>
          <div class="profile-reputation__rating-item">
            <shared-stars :count="userData.user.rating.communicate" />
            <p class="profile-reputation__rating-title">Общение, понимание</p>
          </div>
        </div>
      </div>
    </div>
    <div class="profile-reputation__reviews-block">
      <h3
        v-if="userData.user.profile.reviews?.length"
        class="profile-reputation__reviews-title"
      >
        Всего {{ userData.user.profile.reviews.length }}
        {{
          getNoun(
            userData.user.profile.reviews.length,
            'отзыв',
            'отзыва',
            'отзывов'
          )
        }}
      </h3>
      <h3 v-else class="profile-reputation__reviews-title">0 отзывов</h3>
      <swiper
        v-if="userData.user.profile.reviews?.length"
        slides-per-view="auto"
        space-between="30px"
        :modules="[SwiperPagination]"
        :pagination="{
          clickable: true,
          renderBullet: pagination
        }"
        class="profile-reputation__swiper"
      >
        <swiper-slide
          v-for="review in userData.user.profile.reviews.slice(0, 4)"
          :key="review.id"
          class="profile-reputation__swiper-slide"
        >
          <div class="profile-reputation__review">
            <div class="profile-reputation__review-top">
              <div class="profile-reputation__author">
                <img
                  v-if="review.avatarPath"
                  src="/assets/images/avatars/avatar.png"
                  alt="avatar"
                  class="profile-reputation__avatar"
                />
                <profile-ui-default-avatar
                  v-else
                  class="profile-reputation__avatar"
                />
                <div class="profile-reputation__review-title">
                  <h4 class="profile-reputation__author-name">
                    {{ review.author }}
                  </h4>
                  <span class="profile-reputation__date">
                    {{ getDate(review.time) }}
                  </span>
                </div>
              </div>
              <span class="profile-reputation__rating">
                {{ review.rating }}
                <svgo-star class="profile-reputation__star" />
              </span>
            </div>
            <p class="profile-reputation__review-description">
              {{ review.text }}
            </p>
            <shared-arrow-text-animate
              font-size="15px"
              font-weight="600"
              class="profile-reputation__more-review"
            >
              Подробнее
            </shared-arrow-text-animate>
          </div>
        </swiper-slide>
      </swiper>
      <div v-else class="profile-reputation__no-reviews">
        <p class="profile-reputation__no-reviews-text">
          У вас пока нет отзывов
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  completedOrders: { type: Number, default: 0 },
  userRole: {
    type: String,
    required: true,
    validator: (value) => ['performer', 'client'].includes(value)
  }
});
const userData = useUserData();
const { timeFormat } = useFormatting();
const { getNoun } = useWordCase();
const getDate = (unix) => {
  const { sec, min, hour, days } = timeFormat(
    Math.floor(Date.now() / 1000 - unix)
  );
  if (days > 0) return days + ` ${getNoun(days, 'день', 'дня', 'дней')}`;
  if (hour > 0) return hour + ` ${getNoun(hour, 'час', 'часа', 'часов')}`;
  if (min > 0) return min + ` ${getNoun(min, 'минута', 'минуты', 'минут')}`;
  if (sec > 0) return sec + ` ${getNoun(sec, 'секунда', 'секунды', 'секунд')}`;
};
const pagination = (id, className) => '<span class="' + className + '"></span>';
</script>

<style scoped lang="scss">
@import 'index';
</style>
<style lang="scss">
@import 'swiper';
</style>
