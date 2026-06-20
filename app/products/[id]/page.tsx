import Navbar from "@/user/frontend/components/Navbar";
import Footer from "@/user/frontend/components/Footer";

import ProductGallery from "@/user/frontend/products/ProductGallery";
import ProductBuyBox from "@/user/frontend/products/ProductBuyBox";

import { getProductById } from "@/user/backend/products/getProductById";
import { getProductImages } from "@/user/backend/products/getProductImages";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductDetailsPage({
  params,
}: PageProps) {
  const { id } = await params;

  const product =
    await getProductById(id);

  const galleryImages =
    await getProductImages(id);

  if (!product) {
    return (
      <main className="bg-[#F8F6F2] min-h-screen">
        <Navbar />

        <div className="luxury-container py-32">
          <h1 className="text-4xl">
            Product Not Found
          </h1>
        </div>

        <Footer />
      </main>
    );
  }

  return (
    <main className="bg-[#F8F6F2] min-h-screen">
      <Navbar />

      <section className="luxury-section">
        <div className="luxury-container">
          <div
            className="
              grid
              lg:grid-cols-[1.4fr_1fr_0.8fr]
              gap-12
            "
          >
            {/* PRODUCT GALLERY */}

            <ProductGallery
              coverImage={
                product.cover_image
              }
              galleryImages={galleryImages.map(
                (image: any) =>
                  image.image_url
              )}
              productName={
                product.name
              }
            />

            {/* PRODUCT DETAILS */}

            <div>
              <p
                className="
                  uppercase
                  tracking-[5px]
                  text-[#B8860B]
                  text-sm
                "
              >
                Signature Collection
              </p>

              <h1
                className="
                  font-luxury
                  text-5xl
                  mt-4
                  leading-tight
                "
              >
                {product.name}
              </h1>

              <p
                className="
                  text-[#B8860B]
                  text-3xl
                  mt-6
                "
              >
                ₹
                {Number(
                  product.price
                ).toLocaleString()}
              </p>

              {product.compare_price &&
                Number(
                  product.compare_price
                ) >
                  Number(
                    product.price
                  ) && (
                  <p
                    className="
                      text-gray-400
                      line-through
                      mt-2
                    "
                  >
                    ₹
                    {Number(
                      product.compare_price
                    ).toLocaleString()}
                  </p>
                )}

              {product.description && (
                <div className="mt-8">
                  <p
                    className="
                      text-gray-600
                      leading-8
                    "
                  >
                    {product.description}
                  </p>
                </div>
              )}

              <div
                className="
                  mt-10
                  space-y-5
                "
              >
                <div>
                  <h3 className="font-medium">
                    Product Details
                  </h3>

                  <p className="text-gray-600 mt-2">
                    Product ID:
                    {" "}
                    {product.id}
                  </p>
                </div>

                <div>
                  <p className="text-gray-600">
                    Available Stock:
                    {" "}
                    {product.stock}
                  </p>
                </div>

                <div>
                  <p className="text-gray-600">
                    Status:
                    {" "}
                    {product.is_active
                      ? "In Stock"
                      : "Unavailable"}
                  </p>
                </div>

                {product.category_id && (
                  <div>
                    <p className="text-gray-600">
                      Category:
                      {" "}
                      {product.category_id}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* BUY BOX */}

            <ProductBuyBox
              product={{
                id: product.id,
                name: product.name,
                cover_image:
                  product.cover_image,
                price:
                  Number(
                    product.price
                  ),
              }}
            />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}