import { useEffect, useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Sort from 'components/comon/Sort';
import Filter from 'components/comon/Filter';
import Catalog from 'components/comon/Catalog';

import { getProducts } from 'redux/productSlice';

const DEFAULT_LIMIT = 15;

function Category() {
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);

    const [skip, setSkip] = useState(0);
    const [page, setPage] = useState(null);
    const [lastPage, setLastPage] = useState(null);

    const [loadMore, setLoadMore] = useState(false);
    const [loading, setLoading] = useState(true);

    const [sort, setSort] = useState(null);
    const [filter, setFilter] = useState(null);
    const [hideFilter, setHideFilter] = useState(false);

    const params = useParams();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const dispatch = useDispatch();
    const categories = useSelector(state => state.category.categories);
    const genders = useSelector(state => state.category.genders);

    const convertParamsTitle = Object.fromEntries([...searchParams]).q;

    useEffect(() => {
        // chuyển hướng sẽ reset state
        if (!loading) {
            setProducts([]);
            setLoading(true);
        }
        if (loadMore) {
            setLoadMore(false);
            setSkip(0);
        }

        // *------------------*
        const getData = async () => {
            const title = convertParamsTitle;
            const genders = params.gender;
            const category = categories.find(item => item.slug === params.category)?.name;

            await dispatch(getProducts({ title, genders, category, skip: 0, limit: DEFAULT_LIMIT, sort, ...filter }))
                .then(({ payload }) => {
                    setProducts(payload.products);
                    setTotal(payload.total);
                    setPage(payload.page);
                    setLastPage(payload.lastPage);
                })
                .catch(err => console.log(err));

            setLoading(false);
        };

        let isValid = true;
        const isValidCategory = params.category && categories.every(category => params.category !== category.slug);
        const isValidGender = params.gender && genders.every(gender => params.gender !== gender.name);

        if (isValidCategory || isValidGender) isValid = false;

        if (!isValid) navigate('/404');
        else getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params, sort, filter]);

    useEffect(() => {
        const loadMoreProducts = async () => {
            const genders = params.gender;
            const category = categories.find(item => item.slug === params.category)?.name;

            await dispatch(getProducts({ genders, category, skip, limit: DEFAULT_LIMIT, sort }))
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
    }, [params]);

    return (
        <>
            {convertParamsTitle && <span className="text-xs font-medium">Search result for</span>}
            <div className="flex-between-center mb-6">
                {!convertParamsTitle ? (
                    <h2 className="font-medium text-xl capitalize">
                        {params.gender ? (
                            <>
                                {params.gender}'s {params?.category} shose ({total})
                            </>
                        ) : (
                            <>All shose({total})</>
                        )}
                    </h2>
                ) : (
                    <h2 className="font-medium">
                        {convertParamsTitle}({total})
                    </h2>
                )}
                <Sort sort={sort} onSort={setSort} hideFilter={hideFilter} onHideFilter={setHideFilter} />
            </div>
            <div className="relative flex">
                <div className={`duration-300 w-[240px] ${hideFilter ? 'ml-[-240px] pr-20' : 'ml-0 pr-12'}`}>
                    <Filter filter={filter} setFilter={setFilter} />
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
    );
}

export default Category;
