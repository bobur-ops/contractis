// eslint-disable-next-line no-undef
export default defineEventHandler((event) => {
  // eslint-disable-next-line no-undef
  const id = getRouterParam(event, 'id');

  const users = [
    {
      id: 1,
      title: 'Разработка Корпоративного Веб-портала',
      price: 479000,
      min_period: 60,
      max_period: 80,
      categories: [
        {
          id: 1,
          name: 'Категория 1'
        },
        {
          id: 2,
          name: 'Категория 2'
        }
      ],
      keywords: ['E-commerce', 'Frontend', 'UX/UI'],
      technologies: [
        {
          id: 1,
          name: 'Vue.js',
          img: 'JavaScript'
        },
        {
          id: 2,
          name: 'CSS',
          img: 'CSS'
        },
        {
          id: 3,
          name: 'HTML',
          img: 'HTML'
        }
      ],
      description:
        'Идейные соображения высшего порядка, а также сложившаяся структура организации влечет за собой процесс от внедрения и модернизации систем массового участия. Разнообразный и богатый опыт дальнейшее развитие. Идейные соображения высшего порядка, а также сложившаяся структура организации влечет за собой процесс как вне дрения и модернизации систем массового участия. Разнообразный и богатый опыт дальнейшее развитие. Так по Идейные соображения высшего порядка, а также сложившаяся структура организации влечет за собой процесс внедрения и модернизации систем массового участия. Разнообразный и богатый опыт дальнейшее развитие. Идейные соображения высшего порядка, а также сложившаяся структура организации влечет за собой процесс внедрения и модернизации систем массового участия.',
      files: [
        { name: 'Майнинг', type: 'pdf' },
        { name: 'Secret', type: 'docx' }
      ],
      examples: [
        'Разработка Интернет-магазин',
        'Мобильное приложение Алрино',
        'Разработка Лендинга под ключ для Шестакович клуб'
      ],
      employee: {
        avatar: 'aaa',
        first_name: 'Паша',
        last_name: 'Бамбук',
        stat: {
          completed: 54,
          search: 54,
          reviews: {
            positive: 54,
            negative: 92
          }
        },
        contacts: {
          telegram: '@tolkachewww',
          number: '+7 (929) 374 48-84',
          whatsapp: '+7 (929) 374 48-84',
          email: 'artymt04@gmail.com'
        },
        low_price: 24000,
        high_price: 30000,
        responses: 12,
        min_period: 1,
        max_period: 999
      }
    },
    {
      id: 2,
      title: 'Супер пупер разработка ПО',
      price: 1,
      min_period: 3,
      max_period: 6,
      categories: [
        {
          id: 1,
          name: 'Категория 1'
        },
        {
          id: 2,
          name: 'Категория 2'
        },
        {
          id: 3,
          name: 'Категория 3'
        }
      ],
      keywords: ['E-commerce', 'Frontend', 'UX/UI', 'GameWebDesigner3D'],
      technologies: [
        {
          id: 1,
          name: 'Имба',
          img: 'JavaScript'
        },
        {
          id: 2,
          name: 'CSS',
          img: 'CSS'
        },
        {
          id: 3,
          name: 'HTML',
          img: 'HTML'
        }
      ],
      description:
        'Только настоящим GameWebDesigner3D по силам выполнить данную задачу!',
      files: [
        { name: '1 неделя', type: 'pdf' },
        { name: '2 неделя', type: 'docx' }
      ],
      examples: [
        'Разработка Интернет-магазин',
        'Мобильное приложение Алрино',
        'Разработка Лендинга под ключ для Шестакович клуб'
      ],
      employee: {
        avatar: 'aaa',
        first_name: 'Стас',
        last_name: 'Васос',
        stat: {
          completed: 54,
          search: 57,
          reviews: {
            positive: 99,
            negative: 0
          }
        },
        contacts: {
          telegram: '@mamamakysa',
          number: '+7 (800) 555 35-35',
          whatsapp: '+7 (800) 555 35-35',
          email: 'bimbimbambam@gmail.com'
        },
        low_price: 90000,
        high_price: 500000,
        responses: 12,
        min_period: 1,
        max_period: 2
      }
    }
  ];
  return users.find((user) => user.id === +id);
});
