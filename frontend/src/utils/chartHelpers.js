export const getTopByPrice = (products, n = 10) =>
  [...products]
    .sort((a, b) => b.price - a.price)
    .slice(0, n)
    .map((p) => ({
      name:   p.title?.slice(0, 14) + "…",
      price:  p.price,
      rating: p.rating,
    }));

export const getRatingDist = (products) =>
  [1, 2, 3, 4, 5].map((r) => ({
    star:  `${r}★`,
    count: products.filter((p) => Math.round(p.rating) === r).length,
  }));
