import React, { useMemo, useRef } from "react";
import classNames from "classnames";

import ProductCard from "../shared/ProductCard";
import SectionHeader from "../shared/SectionHeader";
import LoadingSpiner from "../shared/LoadingSpiner";

function BlockProductsCarousel(props) {
  const { blockTitle, products, loading } = props;

  if (loading) {
    return <LoadingSpiner />;
  }

  return (
    <div className='block block-products-carousel'>
      <div className='container'>
        <SectionHeader sectionTitle={blockTitle} />

        <div
          className={classNames("block-products-carousel__carousel", {
            "block-products-carousel__carousel--loading": loading,
            "block-products-carousel__carousel--has-items": products.length > 0,
          })}
        >
          <div className='block-products-carousel__carousel-loader' />
          <div className='product-card-container'>
            {products.map((product) => (
              <ProductCard
                key={product._id}
                className='block-products-carousel__cell'
                product={product}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlockProductsCarousel;
