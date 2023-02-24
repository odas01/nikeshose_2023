import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Row, Col } from 'antd';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, Thumbs } from 'swiper';

import productApi from 'api/productApi';
import images from 'assets/images';
import { getCart, createCart } from 'redux/cartSlice';
import { setRedirectOfLogin } from 'redux/authSlice';
import Card from 'components/comon/Card';
import { toast } from 'handler/toast.handler';

function Detail() {
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState(null);
    const [size, setSize] = useState(null);
    const [qty, setQty] = useState(1);

    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [error, setError] = useState(false);

    const userId = useSelector(state => state.auth.currentUser?._id);

    const { slug } = useParams();
    const { pathname } = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const getProduct = async () => {
            try {
                const { product } = await productApi.get(slug);
                setProduct(product);

                getRelated(product.slug, product.category.name);
            } catch (err) {
                navigate('404');
            }
        };

        const getRelated = async (slug, category) => {
            try {
                const res = await productApi.related(slug, category);
                setRelatedProducts(res.products);
            } catch (err) {
                console.log(err);
            }
        };

        getProduct();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [slug]);

    const choseSize = size => {
        setSize(size);
        if (error) setError(false);
    };

    const changeQty = type => {
        if (!size) {
            setError(true);
        } else {
            const stock = product.options.find(item => item.size === size).stock;

            if (type === 'minus') {
                qty > 1 && setQty(qty => qty - 1);
            } else if (type === 'plus') {
                qty < stock && setQty(qty => qty + 1);
            } else {
                const value = type.target.value;

                if (value > stock) setQty(stock);
                else if (value < 1) setQty(1);
                else setQty(value);
            }
        }
    };

    const addToCart = async () => {
        if (!size) {
            setError(true);
        } else if (!userId) {
            dispatch(setRedirectOfLogin(pathname));

            navigate('/login');
        } else {
            const data = {
                size: Number(size),
                qty,
                product: product._id,
                stock: product.options.find(item => item.size === size).stock
            };

            dispatch(createCart(data)).then(() => {
                dispatch(getCart(userId));
                toast('success', 'Successfully added', 'top-right');
                setSize(null);
            });
        }
    };

    return (
        product && (
            <>
                <Row gutter={24}>
                    <Col span={16}>
                        <Row gutter={[12, 12]} justify="center">
                            <Col span={12}>
                                <Swiper
                                    thumbs={{ swiper: thumbsSwiper }}
                                    spaceBetween={4}
                                    autoplay={{
                                        delay: 3000,
                                        disableOnInteraction: false
                                    }}
                                    loop={true}
                                    modules={[FreeMode, Thumbs, Autoplay]}
                                    className="mySwiper2"
                                >
                                    {product.images.map((item, index) => (
                                        <SwiperSlide key={index}>
                                            <img
                                                src={item.url}
                                                className="rounded cursor-pointer"
                                                alt={`slide ${index}`}
                                            />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </Col>
                            <Col span={12}>
                                <img src={product.thumbnail.url} className="rounded" alt={`${product.title}-0`} />
                            </Col>

                            <Col span={12}>
                                <Swiper
                                    onSwiper={setThumbsSwiper}
                                    slidesPerView={4}
                                    spaceBetween={20}
                                    loop={true}
                                    freeMode={true}
                                    watchSlidesProgress={true}
                                    modules={[FreeMode, Thumbs]}
                                    className="mySwiper w-[80%]"
                                >
                                    {product.images.map((item, index) => (
                                        <SwiperSlide key={index}>
                                            <img
                                                src={item.url}
                                                alt={`slide ${index}`}
                                                className="rounded cursor-pointer"
                                            />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={8}>
                        <div className="px-5 flex-column">
                            <h1 className="capitalize font-semibold text-3xl">{product.title}</h1>
                            <span className="mt-1 font-medium text-base">{product.subTitle}</span>
                            <span className="mt-2 text-lg font-medium text-red-500">
                                {product.price.toLocaleString('de-DE')}đ
                            </span>
                            <p className="mt-3 text-sm text-justify">{product.description}</p>
                            <div className="mt-5 flex items-center gap-x-2 capitalize">
                                <span className="font-semibold text-base">Category: </span>
                                <Link to={`/c/${product.genders[0]}/${product.category.name}`}>
                                    {product.category.name}
                                </Link>
                            </div>
                            <div className="mt-5 flex items-center gap-x-2 capitalize">
                                <span className="font-semibold text-base">Gender: </span>
                                {product.genders.map((gender, index) => (
                                    <Link to={`/c/${gender}`} key={index}>
                                        {gender}
                                    </Link>
                                ))}
                            </div>
                            <div className="mt-5 flex gap-x-3">
                                <span className="font-semibold text-base">Size: </span>
                                <div className="flex-1 b-2">
                                    <div className="mb-2">
                                        <Row gutter={[5, 5]}>
                                            {product.options.map((option, index) => (
                                                <Col span={3} key={index}>
                                                    <span
                                                        className={`py-[5px] w-full block text-center font-normal transition-all border border-gray-300 rounded text-xs
                                                    ${option.size === size ? 'bg-[#20262E] text-white' : ''}
                                                    ${
                                                        option.stock === 4
                                                            ? 'opacity-50 cursor-default select-none'
                                                            : 'hover:border-gray-700 cursor-pointer'
                                                    }`}
                                                        onClick={() => option.stock !== 4 && choseSize(option.size)}
                                                    >
                                                        {option.size}
                                                    </span>
                                                </Col>
                                            ))}
                                        </Row>
                                    </div>
                                    <div className="h-[20px]">
                                        <span
                                            className={`cursor-pointer transition-all duration-200 pl-1 hover:opacity-40 ${
                                                !size ? 'hidden' : 'block'
                                            }`}
                                            onClick={() => setSize(null)}
                                        >
                                            Clear
                                        </span>
                                        <span className={`text-red-600 ${!error ? 'hidden' : 'block'}`}>
                                            Please select size
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-3 flex items-center">
                                <span className="font-semibold text-base">Share: </span>
                                <div className="flex-center">
                                    <div
                                        className="w-8 h-8 shadow-icon rounded-full flex-center ml-4 transition-all 
                                    duration-300 cursor-pointer hover:bg-[rgba(0,0,0,0.8)] hover:-translate-y-1"
                                    >
                                        <img className="w-4 h-4" src={images.social.facebook} alt="facebook" />
                                    </div>
                                    <div
                                        className="w-8 h-8 shadow-icon rounded-full flex-center ml-4 transition-all 
                                    duration-300 cursor-pointer hover:bg-[rgba(0,0,0,0.8)] hover:-translate-y-1"
                                    >
                                        <img className="w-4 h-4" src={images.social.instagram} alt="instagram" />
                                    </div>
                                    <div
                                        className="w-8 h-8 shadow-icon rounded-full flex-center ml-4 transition-all 
                                    duration-300 cursor-pointer hover:bg-[rgba(0,0,0,0.8)] hover:-translate-y-1"
                                    >
                                        <img className="w-4 h-4" src={images.social.google} alt="google" />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5 flex justify-between items-center w-32 h-8 overflow-hidden">
                                <button
                                    className="flex-1 flex-center h-full text-xl border border-solid border-gray-300 
                                rounded-md transition-all hover:bg-[#F55050] hover:text-white"
                                    onClick={() => changeQty('minus')}
                                >
                                    -
                                </button>
                                <input type="number" value={qty} className="w-12 text-center" onChange={changeQty} />
                                <button
                                    className="flex-1 h-full text-xl border border-solid border-gray-300 rounded-md 
                                    transition-all hover:bg-[#F55050] hover:text-white"
                                    onClick={() => changeQty('plus')}
                                >
                                    +
                                </button>
                            </div>
                            <div className="mt-8 w-60 h-14 rounded-xl flex-center text-[#5B8FB9]  border-[3px] border-current transition-all duration-200 hover:-translate-y-1 hover:shadow-raise">
                                <button className="text-base font-bold w-full h-full text-inherit " onClick={addToCart}>
                                    Add to cart
                                </button>
                            </div>
                        </div>
                    </Col>
                </Row>
                {/* <h3 className="font-medium text-xl my-8">You Might Also Like</h3> */}
                <h2 className="font-medium mt-8 mb-6">Related products</h2>
                <div className="mb-8">
                    <Swiper spaceBetween={12} slidesPerView={3}>
                        {relatedProducts?.map((item, index) => (
                            <SwiperSlide key={index}>
                                <Card data={item} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </>
        )
    );
}

export default Detail;
