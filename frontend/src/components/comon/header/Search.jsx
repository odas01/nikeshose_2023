import { useEffect, useRef, useState } from 'react';
import {
    useNavigate
    //  useLocation
} from 'react-router-dom';
import HeadlessTippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import { AiOutlineLoading3Quarters, AiOutlineSearch } from 'react-icons/ai';
import { TbMoodEmpty } from 'react-icons/tb';

import useDebounce from 'hooks/useDebounce';
import useAutoText from 'hooks/useAutoText';
import productApi from 'api/productApi';

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([1]);
    const [showResult, setShowResult] = useState(false);

    const [loading, setLoading] = useState(false);
    const [widthInput, setWidthInput] = useState(false);

    const navigate = useNavigate();
    const inputRef = useRef(null);
    // const location = useLocation();

    const debouncedValue = useDebounce(searchValue, 500);

    const {
        text: placeholder,
        resetText: resetPlaceHolder,
        hideText: hidePlaceHolder
    } = useAutoText('Enter your product...'.split(''), 100, widthInput);

    useEffect(() => {
        const searchProduct = async () => {
            if (!debouncedValue.trim()) {
                setSearchResult([]);
                return;
            }
            try {
                const res = await productApi.getAll({ title: debouncedValue, limit: 7 });
                setSearchResult(res.products);
            } catch (err) {
                console.log(err);
            }
            setLoading(false);
        };
        searchProduct();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedValue]);

    // useEffect(() => {
    //     setSearchValue('');
    //     setShowResult(false);
    //     handleBlur();
    //     console.log('render');
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [location]);

    // event Input
    const handleChange = e => {
        setSearchResult([]);
        setLoading(true);
        setSearchValue(e.target.value);
    };

    const handleFocus = () => {
        setShowResult(true);
        setWidthInput(true);
        hidePlaceHolder();
    };

    const handleBlur = () => {
        setWidthInput(false);
        resetPlaceHolder();
    };

    // event Tippy
    const handleClikcOutside = () => {
        setShowResult(false);
        handleBlur();
    };

    const redirectToDetail = (slug = '') => {
        // window.location.replace('/d/' + slug);
        setSearchValue('');
        setShowResult(false);
        handleBlur();

        slug && navigate('/d/' + slug);
    };

    const redirectToSearch = () => {
        navigate(`c?q=${searchValue}`);
        inputRef.current.blur();
        handleClikcOutside();
    };

    return (
        <HeadlessTippy
            // visible={true}
            visible={showResult && (searchValue || searchResult.length >= 1)}
            render={attrs => (
                <div
                    className="shadow-search bg-white w-[300px] max-h-[500px]  overflow-y-auto p-2 rounded-md"
                    {...attrs}
                    // onScroll={handleScroll}
                >
                    <div className="flex-column">
                        {searchResult.length > 0 &&
                            searchResult.map((result, index) => (
                                <div
                                    key={index}
                                    className="flex items-center px-4 py-2 hover:bg-gray-100 hover:cursor-pointer rounded-md"
                                    onClick={() => redirectToDetail(result.slug)}
                                >
                                    <div className="w-[40px] h-[40px] mr-4">
                                        <img
                                            alt={result.title}
                                            src={result.thumbnail?.url}
                                            className="w-full h-full object-cover rounded-full border border-solid border-gray-100"
                                        />
                                    </div>
                                    <span className="span_text font-medium flex-1 text-[15px]">{result.title}</span>
                                </div>
                            ))}

                        {searchResult.length === 0 && !loading && (
                            <span className="flex-center p-2 text-lg italic" onClick={() => redirectToDetail()}>
                                <TbMoodEmpty size={20} className="mr-2" />
                                No product
                            </span>
                        )}

                        {loading && (
                            <div className="flex-center h-[60px]">
                                <AiOutlineLoading3Quarters size={24} className="animate-spin" />
                            </div>
                        )}
                        <div
                            className="flex items-center px-4 py-2 hover:bg-gray-100 hover:cursor-pointer rounded-md"
                            onClick={redirectToSearch}
                        >
                            <div className="w-[40px] h-[40px] mr-4 flex-center bg-[#2E89FF] rounded-full">
                                <AiOutlineSearch size={20} color="#fff" />
                            </div>
                            <div className="span_text flex-1 text-[15px] text-[#4599FF]">
                                Search:
                                <span className="ml-1 font-bold">{searchValue}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            appendTo="parent"
            placement="bottom-end"
            interactive={true}
            onClickOutside={handleClikcOutside}
        >
            <div
                className={`flex-center pr-3 pl-10 bg-gray-100 rounded-3xl relative transition-all ${
                    !widthInput ? 'w-56' : 'w-[300px]'
                }`}
            >
                <div className="h-10 w-10 flex-center hover:bg-gray-300 rounded-full absolute left-0 cursor-pointer transition ease-in-out">
                    <AiOutlineSearch size={20} />
                </div>
                <input
                    className="bg-transparent abc px-3 py-3 cursor-text flex-1"
                    ref={inputRef}
                    value={searchValue}
                    spellCheck={false}
                    placeholder={!widthInput ? placeholder : ''}
                    onChange={handleChange}
                    onKeyDown={e => searchValue && e.key === 'Enter' && redirectToSearch()}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
            </div>
        </HeadlessTippy>
    );
}

export default Search;
