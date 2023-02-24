import React from 'react';
import { RiStackLine } from 'react-icons/ri';
import { BsCartCheck } from 'react-icons/bs';
import { AiOutlineCreditCard, AiOutlineShoppingCart, AiOutlineCheck } from 'react-icons/ai';
import { MdOutlinePending, MdOutlineLocalShipping } from 'react-icons/md';
import { Col, Row } from 'antd';

function Main() {
    return (
        <>
            {/* Title */}
            <h2 className="mb-6 mt-0 font-bold text-xl text-gray-800 dark:text-[#d5d6d7]">Dashboard Overview</h2>

            {/* Total */}
            <Row gutter={24}>
                <Col span={8}>
                    <div className="py-6 w-full rounded-xl flex-column items-center text-white bg-cyan-700">
                        <RiStackLine size={32} />
                        <span className="text-base my-2 font-normal">Today Order</span>
                        <span className="text-xl font-bold">120.000.000đ</span>
                    </div>
                </Col>
                <Col span={8}>
                    <div className="py-6 w-full rounded-xl flex-column items-center text-white bg-slate-700">
                        <BsCartCheck size={32} />
                        <span className="text-base my-2 font-normal">This Month</span>
                        <span className="text-xl font-bold">120.000.000đ</span>
                    </div>
                </Col>
                <Col span={8}>
                    <div className="py-6 w-full rounded-xl flex-column items-center text-white bg-green-800">
                        <AiOutlineCreditCard size={32} />
                        <span className="text-base my-2 font-normal">Total Order</span>
                        <span className="text-xl font-bold">120.000.000đ</span>
                    </div>
                </Col>
            </Row>

            {/* Order */}
            <Row gutter={24} className="mt-6">
                <Col span={6}>
                    <div className="py-4 pl-4 w-full rounded-xl flex items-center text-white bg-gray-bg">
                        <div className="rounded-full flex-center w-12 h-12 bg-orange-600">
                            <AiOutlineShoppingCart size={20} />
                        </div>
                        <div className="flex-column ml-4">
                            <span className="text-sm font-normal text-gray-text">Today Order</span>
                            <span className="text-lg font-bold">120.000.000đ</span>
                        </div>
                    </div>
                </Col>
                <Col span={6}>
                    <div className="py-4 pl-4 w-full rounded-xl flex items-center text-white bg-gray-bg">
                        <div className="rounded-full flex-center w-12 h-12 bg-sky-700">
                            <MdOutlinePending size={20} />
                        </div>
                        <div className="flex-column ml-4">
                            <span className="text-sm font-normal text-gray-text">Today Order</span>
                            <span className="text-lg font-bold">120.000.000đ</span>
                        </div>
                    </div>
                </Col>
                <Col span={6}>
                    <div className="py-4 pl-4 w-full rounded-xl flex items-center text-white bg-gray-bg">
                        <div className="rounded-full flex-center w-12 h-12 bg-[#0694A2]">
                            <MdOutlineLocalShipping size={20} />
                        </div>
                        <div className="flex-column ml-4">
                            <span className="text-sm font-normal text-gray-text">Today Order</span>
                            <span className="text-lg font-bold">120.000.000đ</span>
                        </div>
                    </div>
                </Col>
                <Col span={6}>
                    <div className="py-4 pl-4 w-full rounded-xl flex items-center text-white bg-gray-bg">
                        <div className="rounded-full flex-center w-12 h-12 bg-green-600">
                            <AiOutlineCheck size={20} />
                        </div>
                        <div className="flex-column ml-4">
                            <span className="text-sm font-normal text-gray-text">Today Order</span>
                            <span className="text-lg font-bold">120.000.000đ</span>
                        </div>
                    </div>
                </Col>
            </Row>
        </>
    );
}

export default Main;
