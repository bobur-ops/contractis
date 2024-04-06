export const userDataAdapter = (user) => {
  const getUserType = () => {
    if (user.team) return 'Team';
    else if (user.team === false) return 'Solo';
    else return null;
  };
  return {
    id: user.id,
    chatId: user?.chat_id,
    firstName: user.first_name,
    lastName: user.last_name,
    avatarPath: user.avatar_path,
    username: user.username,
    profile: userProfileAdapter(user.profile),
    balance: user.balance ?? 0,
    type: getUserType(),
    country: user.country ?? '',
    city: user.city ?? '',
    contacts: {
      telegram: user.telegram ?? null,
      whatsapp: user.whatsapp ?? null,
      instagram: user.instagram ?? null,
      vk: user.vk ?? null,
      behance: user.behance ?? null,
      github: user.github ?? null,
      email: user.email_contact ?? null
    },
    rating: {
      conditions: user?.rating?.conditions ?? 0,
      feedback: user?.rating?.feedback ?? 0,
      result: user?.rating?.result ?? 0,
      term: user?.rating?.term ?? 0,
      main: user?.rating?.main ?? 0,
      communicate: user?.rating?.communicate ?? 0,
      place: user?.rating?.place
    }
  };
};

export const authCurrentUserAdapter = (data) => {
  return {
    user: userDataAdapter(data.user.data),
    role: data.user?.roles[0],
    userToken: data?.token_access ?? null
  };
};

export const performersAdapter = (performer) => {
  return {
    data: userDataAdapter(performer.data),
    role: performer?.roles[0]
  };
};

export const performersPaginationAdapter = (performers) => {
  if (performers.data) {
    return {
      totalPerformers: performers.data?.total,
      lastPage: performers.data.last_page,
      perPage: performers.data.per_page,
      currentPage: performers.data.current_page,
      data: performers.data?.data.map((performer) =>
        performersAdapter(performer)
      )
    };
  }
};

export const userProfileAdapter = (data) => {
  return {
    site: data.site_url ?? null,
    country: data.country ?? null,
    city: data.city ?? null,
    experience: data.work_experience ?? 0,
    description: data.description ?? null,
    team: data.team_members ?? [],
    teamCount: data.count_team_members ?? 0,
    doneOrders: data.count_done_orders ?? 0,
    openOrders: data.count_open_orders ?? 0,
    gallery: data.gallery ?? [],
    certificates: data.awards ?? [],
    cases: data.cases ?? [],
    reviews: data.reviews ?? [],
    mainCategory: data.main_category ?? null,
    additionalCategories: data.categories ?? [],
    technologies: data.technologies ?? [],
    sex: data.gender ?? null,
    hourlyRate: data.hourly_rate ?? null,
    rating: data.star_rating ?? 0,
    portfolio: data.portfolio ?? [],
    portfolioCount: data.portfolio_count ?? 0,
    age: data.age ?? null,
    foundingDate: data.founding_date ?? null
  };
};
