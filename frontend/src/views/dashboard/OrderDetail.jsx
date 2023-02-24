import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col } from 'antd';

import productApi from 'api/productApi';

function ProductDetail() {
    const [product, setProduct] = useState(null);

    const { slug } = useParams();

    useEffect(() => {
        const getProduct = async () => {
            const res = await productApi.get(slug);
            setProduct(res.product);
        };

        getProduct();
    }, [slug]);

    return (
        product && (
            <Row gutter={20}>
                <Col xl={14}>
                    <Row gutter={[8, 8]}>
                        <Col span={12}>
                            <img src={product?.thumbnail.url} alt={product?.title} className="rounded" />
                        </Col>
                        {product.images.map(image => (
                            <Col span={12} key={image._id}>
                                <img src={image.url} alt={product.title} className="rounded" />
                            </Col>
                        ))}
                    </Row>
                </Col>
                <Col xl={10}>
                    <div className="p-4">
                        <h2 className="text-2xl">{product.title}</h2>
                        <p className="text-">
                            {product.price.toLocaleString('vi-VN', {
                                style: 'currency',
                                currency: 'VND'
                            })}
                        </p>
                        <div>
                            <span className="inline-block rounded-xl px-2 pt-1 py-2 mb-2 text-sm text-white bg-green-900">
                                Options:
                            </span>
                            <table className="w-1/2 border-[#24262d] border rounded">
                                <thead className="border-b border-[#24262d]">
                                    <tr>
                                        <td className="text-center p-1">Size</td>
                                        <td className="text-center p-1">Stock</td>
                                    </tr>
                                </thead>
                                <tbody className="divide-[#24262d] divide-y">
                                    {product.options.map((option, index) => (
                                        <tr key={index}>
                                            <td className="text-center p-1">{option.size}</td>
                                            <td className="text-center p-1">{option.stock}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <p className="leading-6 text-base font-normal">{product.description}</p>
                        <div className="text-lg">
                            Category: <span className=" text-gray-500">{product.category}</span>
                        </div>
                        <div className="mt-2">
                            {product.genders.map((gender, index) => (
                                <span key={index} className="px-2 py-1 bg-gray-800 text-slate-300 rounded-xl text-xs">
                                    {gender}
                                </span>
                            ))}
                        </div>
                    </div>
                </Col>
            </Row>
        )
    );
}

export default ProductDetail;
