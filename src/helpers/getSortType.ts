import { SortType } from "../types/sortType";

export const getSortType = (sort: SortType) => {
  const sortTypeMap: { [key in SortType]: { [key: string]: 1 | -1 } } = {
    priceAscending: { price: 1, title: 1 },
    priceDescending: { price: -1, title: 1 },
    ratingAscending: { rating: 1, title: 1 },
    ratingDescending: { rating: -1, title: 1 },
  };

  return sortTypeMap[sort] ?? { rating: -1, title: 1 };
};

// 1 - ask
// -1 - desc
