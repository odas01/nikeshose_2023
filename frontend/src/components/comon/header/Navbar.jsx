import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dropdown } from 'antd';

function Navbar({ offset }) {
    const genders = useSelector(state => state.category.genders);
    return (
        <div id="dropdown_navbar" className="flex-center capitalize absolute right-1/2 translate-x-1/2 z-10">
            {genders &&
                genders.map((gender, index) => (
                    <Dropdown
                        menu={{
                            items: gender.children.map((item, index) => ({
                                key: index,
                                category: gender.name,
                                label: (
                                    <Link to={`c/${gender.name}/${item.slug}`} className="block px-2 py-1 font-medium">
                                        {item.name}
                                    </Link>
                                )
                            }))
                        }}
                        key={index}
                        placement="bottom"
                        arrow
                        overlayStyle={{
                            minWidth: '140%'
                        }}
                        getPopupContainer={() => document.querySelector('#dropdown_navbar')}
                    >
                        <Link
                            to={`c/${gender.name}`}
                            className={`font-medium transition-all ${offset ? 'text-lg' : 'text-base'} ${
                                !!index ? 'ml-6' : ''
                            } `}
                        >
                            {gender.name}
                        </Link>
                    </Dropdown>
                ))}
        </div>
    );
}

export default Navbar;
