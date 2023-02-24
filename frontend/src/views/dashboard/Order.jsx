import { useState, useEffect } from 'react';

import userApi from 'api/userApi';
import Loading from 'components/comon/loading/Loading';

function Order() {
    const [customers, setCustomers] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCustomers();
    }, []);
    const getCustomers = async () => {
        const res = await userApi.getAll();
        res.forEach(user => {
            const date = new Date(user.createdAt);
            user.createdAt = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
        });
        setCustomers(res);
        setLoading(false);
    };

    const handleSearch = async () => {};

    return (
        <>
            {/* Title */}
            <h2 className="mb-6 mt-0 font-bold text-xl text-gray-800 dark:text-[#d5d6d7]">Order</h2>

            {/* Search */}
            <div className="p-4 rounded-lg border border-solid border-gray-300 dark:border-none dark:bg-gray-bg">
                <div className="py-3 flex-center">
                    <input
                        type="text"
                        className="input w-4/12 mr-6 hover:cursor-text"
                        placeholder="Search by phone"
                        onKeyDown={handleSearch}
                    />
                    <select
                        name="price"
                        className="input flex-1 mr-6 appearance"
                        // onChange={()}
                    >
                        <option value="">--- Status ---</option>
                        <option value="delivered">Delivered</option>
                        <option value="pending">Pending</option>
                        <option value="cancel">cancel</option>
                    </select>
                    <select
                        name="price"
                        className="input flex-1 mr-6 appearance"
                        // onChange={()}
                    >
                        <option value="">--- Order limits ---</option>
                        <option value="5">Last 5 days order</option>
                        <option value="7">Last 7 days order</option>
                        <option value="15">Last 15days order</option>
                        <option value="30">Last 30 days order</option>
                    </select>
                </div>
            </div>

            {/* Body */}
            {loading ? (
                <Loading />
            ) : customers.length ? (
                <div className="overflow-x-auto mt-4 rounded-lg border border-solid border-gray-300 dark:border-none dark:bg-gray-bg">
                    <table className="w-full">
                        <thead className="text-xs text-gray-500 font-extrabold border-b bg-gray-200 dark:bg-inherit border-gray-300 dark:border-[#24262d]">
                            <tr>
                                <td className="px-4 py-4w-[50px]"></td>
                                <td className="px-4 py-3">ORDER DATE</td>
                                <td className="px-4 py-3">ADDRESS</td>
                                <td className="px-4 py-3">PHONE</td>
                                <td className="px-4 py-3">METHOD</td>
                                <td className="px-4 py-3">AMOUNT</td>
                                <td className="px-4 py-3">STATUS</td>
                                <td className="px-4 py-3">ACTIONS</td>
                                <td className="px-4 py-3">INVOICE</td>
                            </tr>
                        </thead>
                        <tbody className="dark:divide-[#24262d] divide-y capitalize text-sm font-medium"></tbody>
                    </table>
                </div>
            ) : (
                <span className="text-center block py-8 text-2xl ">No customer</span>
            )}
        </>
    );
}

export default Order;
