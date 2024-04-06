import { userDataAdapter } from '~/utils/api';

export const OrderListPaginationAdapter = (orders) => {
  if (orders.data) {
    return {
      totalOrders: orders.data?.total,
      lastPage: orders.data.last_page,
      perPage: orders.data.per_page,
      currentPage: orders.data.current_page,
      data: orders.data?.data.map((order) => OrderAdapter(order))
    };
  }
};
export const OrderAdapter = (order) => {
  return {
    data: OrderAdapterProfile(order.data),
    responses: OrderResponsesAdapter(order.responses)
  };
};
export const OrderAdapterProfile = (order) => {
  return {
    id: order.id,
    title: order.name,
    description: order.description,
    team: order.team,
    startPrice: order.start_price,
    endPrice: order.end_price,
    minPeriod: order.min_period,
    maxPeriod: order.max_period,
    periodType: order.period_type,
    category: order.categories[0],
    specialization: order.specializations[0],
    files: order.files,
    keywords: order.keywords,
    technologies: order.technologies,
    clientData: order?.client ? userDataAdapter(order.client) : null,
    performerData: order?.performer ? userDataAdapter(order.performer) : null,
    moderStatus: order.moder_status,
    status: order.status,
    pathOrderDataPatch: order.id ? `/order/${order.id}/info` : null
  };
};
export const OrderResponsesAdapter = (responses) => {
  return {
    count: responses.count,
    minPeriod: responses.min_period,
    maxPeriod: responses.max_period,
    minPrice: responses.min_price,
    maxPrice: responses.max_price
  };
};
