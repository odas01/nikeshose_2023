import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, Navigate, useSearchParams } from 'react-router-dom';

import Sort from 'components/comon/Sort';
import Filter from 'components/comon/Filter';
import Catalog from 'components/comon/Catalog';

import { getProducts } from 'redux/productSlice';

const DEFAULT_LIMIT = 20;

function Search() {
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);

    const [skip, setSkip] = useState(0);
    const [page, setPage] = useState(null);
    const [lastPage, setLastPage] = useState(null);

    const [loadMore, setLoadMore] = useState(false);
    const [loading, setLoading] = useState(true);

    const [sort, setSort] = useState(null);
    const [hideFilter, setHideFilter] = useState(false);

    const dispatch = useDispatch();
    const { search } = useLocation();

    const [searchParams] = useSearchParams();
    const convertParams = () => Object.fromEntries([...searchParams]).q;

    useEffect(() => {
        // chuyển hướng sẽ restart state
        if (!loading) {
            setProducts([]);
            setLoading(true);
        }
        if (loadMore) {
            setLoadMore(false);
            setSkip(0);
        }

        const getData = async () => {
            await dispatch(getProducts({ title: convertParams(), skip: 0, limit: DEFAULT_LIMIT, sort }))
                .then(({ payload }) => {
                    setProducts(payload.products);
                    setTotal(payload.total);
                    setPage(payload.page);
                    setLastPage(payload.lastPage);
                })
                .catch(err => console.log(err));

            setLoading(false);
        };
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search, sort]);

    useEffect(() => {
        const loadMoreProducts = async () => {
            await dispatch(getProducts({ title: convertParams(), skip, limit: DEFAULT_LIMIT, sort }))
                .then(({ payload }) => {
                    setProducts(state => [...state, ...payload.products]);
                    setPage(payload.page);
                })
                .catch(err => console.log(err));

            setLoadMore(false);
            setLoading(false);
        };

        if (page < lastPage) {
            setLoading(true);
            loadMoreProducts();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [skip]);

    useEffect(() => {
        if (sort) {
            setSort(null);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    return convertParams() ? (
        <>
            <span className="text-xs font-medium">Search result for</span>
            <div className="flex-between-center mb-6">
                <h3 className="font-medium">
                    {convertParams()}({total})
                </h3>
                <Sort sort={sort} onSort={setSort} hideFilter={hideFilter} onHideFilter={setHideFilter} />
            </div>
            <div className="relative flex">
                <div className={`duration-300 w-[240px] ${hideFilter ? 'ml-[-240px] pr-20' : 'ml-0 pr-12'}`}>
                    <Filter />
                </div>

                <div className="flex-1">
                    <Catalog
                        products={products}
                        loading={loading}
                        loadMore={loadMore}
                        skip={skip}
                        setSkip={setSkip}
                        setLoadMore={setLoadMore}
                        defaultLimit={DEFAULT_LIMIT}
                    />
                </div>
            </div>
        </>
    ) : (
        <Navigate to="/404" />
    );
}

export default Search;
