import SearchBar from "../SearchBar/SearchBar";
import Filters from "../Filters/Filters";
import style from "./NavBar.module.css";
import darkHeartIcon from '../../assets/dark_color_heart_icon.png';
import pawDIcon from "../../assets/paw_logo_icon.png";
import menuIcon from "../../assets/menu-icon.png";
import FilterBarMobile from "../Filters/FilterBarMobile";
import {Link} from "react-router-dom";
import { useDispatch } from "react-redux";
import { sortByDbprocedence, fetchDogs, clearDogs,disableAllFilters } from "../../features/dogsSlice";
import { useState} from "react";
import { setCurrentPage } from "../../features/utilsSlice";
import { useRef } from "react";

const NavBar = () => {
    const [clickSort, setClickSort] = useState(false);

    const dispatch = useDispatch();
    const inputRef = useRef(null);
    
    const handleClick = () => {
        if (!clickSort) {
            dispatch(sortByDbprocedence());
            setClickSort(true);
            dispatch(setCurrentPage(1));
        } else {
            dispatch(clearDogs());
            dispatch(fetchDogs());
            setClickSort(false);
            dispatch(disableAllFilters());
            dispatch(setCurrentPage(1));
        }
        inputRef.current.checked = false;

    };

    const handleAllClick = () => {
        dispatch(clearDogs());
        dispatch(fetchDogs());
        dispatch(disableAllFilters());
        dispatch(setCurrentPage(1));
        inputRef.current.checked = false;
    };

    const handleLogoClick = () => {
        window.location.reload()
        window.scrollTo({top: 0, left:0, behavior: 'auto'})
    }
    return (
        <>
            <header className={style.Header}>

                <div className={style.LogoContainer}>
                    <img className={style.PawIcon} src={pawDIcon} alt="" onClick={handleLogoClick}/>
                    <p onClick={handleLogoClick}>oggo</p>
                </div>
                
                <Filters/>
                <SearchBar/>
                
                <button className={style.HeartContainer} onClick={handleClick}>
                    <img className={style.HeartIcon} src={darkHeartIcon} alt="" />
                    Added
                </button>

                
                <Link to={'/form'} className={style.ButtonAddContainer}>
                    Add your doggy
                </Link>
                

                <label htmlFor="checkbox" className={style.Label}>
                    <img src={menuIcon} alt="" />
                </label>

                <input ref={inputRef} type="checkbox" className={style.Checkbox} name="checkbox" id= "checkbox">
                </input>

                <div className={style.DropMenuMobile}>
                    <ul>
                        <li>
                            <Link to={'/form'}>
                                Add your doggy
                            </Link>
                        </li>
                        <li onClick={handleClick}>
                            Added
                        </li>
                        <li onClick={handleAllClick}>
                            All dogs
                        </li>
                    </ul>
                </div>

            </header>

            <FilterBarMobile/>
        </>
        
        
        
    )
};
export default NavBar;