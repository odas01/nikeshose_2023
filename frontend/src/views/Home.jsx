import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';

import Slider from 'components/comon/Slider';
import Card from 'components/comon/Card';
import images from 'assets/images';
import productApi from 'api/productApi';

function Home() {
    const [popularProducts, setPopularProducts] = useState(null);

    useEffect(() => {
        const getPopularProducts = async () => {
            try {
                const { products } = await productApi.popular();
                setPopularProducts(products);
            } catch (err) {
                console.log(err);
            }
        };
        getPopularProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Slider />
            <h2 className="mt-10 mb-6 font-semibold">Popular products</h2>
            <div>
                <Swiper spaceBetween={12} slidesPerView={4}>
                    {popularProducts?.map((item, index) => (
                        <SwiperSlide key={index}>
                            <Card data={item} size={16} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <img className="rounded mt-12" src={images.banner.top} alt="banner-top" />

            <div className="text-center mt-10 mb-14 ">
                <h1 className="font-nikeFutura text-5xl uppercase">Just do it</h1>
                <p className="font-medium text-base my-1">Free your sparkle</p>
                <Link
                    to="c"
                    className="mt-6 bg-[#181823] text-white inline-block px-5 py-2 rounded-full 
                    cursor-pointer hover:opacity-80 hover:text-white"
                >
                    Shop now
                </Link>
            </div>
            <img className="rounded" src={images.banner.men} alt="banner-kids" />

            <div className="text-center mt-16 mb-14 ">
                <h1 className="font-nikeFutura text-5xl uppercase">Keep up the spirit</h1>
                <Link
                    to="c"
                    className="mt-6 bg-[#181823] text-white inline-block px-5 py-2 rounded-full 
                    cursor-pointer hover:opacity-80 hover:text-white"
                >
                    Shop now
                </Link>
            </div>
            <img className="rounded" src={images.banner.parent} alt="banner-parent" />
        </>
    );
}

export default Home;
