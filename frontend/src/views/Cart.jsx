import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateItem } from 'redux/cartSlice';
import { Row, Col } from 'antd';

function Cart() {
    const [loading, setLoading] = useState(false);

    const { items: cart, qty } = useSelector(state => state.cart);

    const dispatch = useDispatch();

    const changeQty = async (type, item) => {
        setLoading(true);
        let newQty = item.qty;
        if (type === 'plus') {
            newQty += 1;
        } else if (type === 'minus') {
            newQty -= 1;
        }
        await dispatch(updateItem({ itemId: item._id, qty: newQty }));
        setLoading(false);
    };
    console.log(cart);
    return (
        qty && (
            <div className="px-12">
                <h2 className="text-center font-semibold">Your cart ({qty})</h2>
                <div className="pb-2 mt-8 mb-4 border-b border-gray-400">
                    <Row>
                        <Col span={11}>
                            <span className="font-semibold text-base">Product</span>
                        </Col>
                        <Col span={4}>
                            <span className="font-semibold text-base">Price</span>
                        </Col>
                        <Col span={5}>
                            <span className="font-semibold text-base">Quantity</span>
                        </Col>
                        <Col span={4}>
                            <span className="font-semibold text-base">Total</span>
                        </Col>
                    </Row>
                </div>
                <div>
                    {cart.map((item, index) => (
                        <div className="py-5 border-b border-gray-200" key={index}>
                            <Row>
                                <Col span={11}>
                                    <Link to={'/d/' + item.product.slug} className="flex pr-6">
                                        <div className="w-[80px] h-[80px]">
                                            <img
                                                src={item.product.thumbnail.url}
                                                className=""
                                                alt={item.product.title}
                                            />
                                        </div>
                                        <div className="relative flex-1">
                                            <span className="absolute translate-y-1/2 left-4 font-medium text-lg">
                                                {item.product?.title}
                                            </span>
                                            <span className="absolute bottom-2 left-4 italic">Size: {item.size}</span>
                                        </div>
                                    </Link>
                                </Col>
                                <Col span={4} className="flex">
                                    <span className="my-auto font-normal text-lg">
                                        {item.product.price?.toLocaleString('vi-VN', {
                                            style: 'currency',
                                            currency: 'VND'
                                        })}
                                    </span>
                                </Col>
                                <Col span={5}>
                                    <div className="mt-5 flex justify-between items-center w-32 h-8 overflow-hidden">
                                        <button
                                            className={`flex-1 h-full text-xl border border-solid border-gray-300 cursor-pointer
                                            rounded-md transition-all ${
                                                loading || item.qty === 1
                                                    ? 'opacity-50 cursor-not-allowed select-none'
                                                    : 'hover:bg-[#F55050] hover:text-white'
                                            }`}
                                            onClick={() => !loading && item.qty > 1 && changeQty('minus', item)}
                                        >
                                            -
                                        </button>
                                        <span className="w-12 text-center" onChange={changeQty}>
                                            {item.qty}
                                        </span>
                                        <button
                                            className={`flex-1 h-full text-xl border border-solid border-gray-300 cursor-pointer
                                            rounded-md transition-all ${
                                                loading || item.qty === item.stock
                                                    ? 'opacity-50 select-none cursor-not-allowed'
                                                    : 'hover:bg-[#F55050] hover:text-white'
                                            }`}
                                            onClick={() => !loading && item.qty < item.stock && changeQty('plus', item)}
                                        >
                                            +
                                        </button>
                                    </div>
                                </Col>
                                <Col span={4} className="flex">
                                    <span className="my-auto font-semibold text-lg">
                                        {(item.product.price * item.qty)?.toLocaleString('vi-VN', {
                                            style: 'currency',
                                            currency: 'VND'
                                        })}
                                    </span>
                                </Col>
                            </Row>
                        </div>
                    ))}
                </div>
            </div>
        )
    );
}

export default Cart;
