import { useProductsBySKU } from "@/data";
import { useEffect, useState } from "react";
import Grid from "../../Styles/Grid";
import HeadingStyle from "../../Styles/HeadingStyle";
import ProductCard from "../ProductCard";

const RecentlyViewed = () => {  
  const [dataLimit, setDataLimit] = useState(4);
  const [products, setProducts] = useState({});
  let recentlyViewed = localStorage.getItem('recentViewed');  
  
  if(!recentlyViewed){
    return null;
  }

  const recentlyViewedItems = JSON.parse(recentlyViewed);
  const { data, status, isLoading, isError } = useProductsBySKU(
    0,
    dataLimit,
    [...recentlyViewedItems.reverse()]
  );
  
  useEffect(() => {
    if (status === "success") {
      setProducts({ ...products, ...data });
    }
  }, [status]);
    return (
      <div className="top-trending-products">
        <HeadingStyle>
          <h2 className="heading">
            Recently Viewed Products
            <span className="heading-underline"></span>
          </h2>
        </HeadingStyle>
        <Grid className="" count={4} gap={20}>
        {!isError && Object.keys(products).map((product, index) => (
          <ProductCard
            key={index}
            id={product}
            {...products[product]}
          />
        ))}
        </Grid>
      </div>
    )
}

export default RecentlyViewed;