export const slugify = (s = "") =>
  s
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const formatPrice = (n) => `EGP ${Number(n).toLocaleString("en-US")}`;
