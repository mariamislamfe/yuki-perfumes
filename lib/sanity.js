import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "p9sfhx8c";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-05-09",
  useCdn: true,
});

const builder = createImageUrlBuilder({ projectId, dataset });

/** Returns a sized image URL string for a Sanity image. */
export const img = (source, width = 900) =>
  source ? builder.image(source).width(width).auto("format").url() : "";

const revalidate = { next: { revalidate: 60 } };

export const getProducts = () =>
  client.fetch(`*[_type == "product"] | order(_createdAt asc)`, {}, revalidate);

export const getProduct = (slug) =>
  client.fetch(
    `*[_type == "product" && slug.current == $slug][0]`,
    { slug },
    revalidate
  );

export const getBanner = () =>
  client.fetch(`*[_type == "banner"][0]`, {}, revalidate);

