import SearchBar from "../SearchBar/SearchBar";
import Filters from "../Filters/Filters";
import style from "./NavBar.module.css";
import darkHeartIcon from '../../assets/dark_color_heart_icon.png'
import pawDIcon from "../../assets/paw_logo_icon.png"
import {Link} from "react-router-dom";
import { useDispatch } from "react-redux";
import { sortByDbprocedence, fetchDogs, clearDogs,disableAllFilters } from "../../features/dogsSlice";
import { useState} from "react";
import { setCurrentPage } from "../../features/utilsSlice";
const NavBar = () => {
    
    const [clickSort, setClickSort] = useState(false);

    const dispatch = useDispatch();
    
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
    };
    const handleLogoClick = () => {
        window.location.reload()
        window.scrollTo({top: 0, left:0, behavior: 'auto'})
    }
    return (

        <header className={style.Header}>
            <button className={style.LogoContainer}>
                <img className={style.PawIcon} src={pawDIcon} alt="" onClick={handleLogoClick}/>
                <p onClick={handleLogoClick}>oggo</p>
            </button>
            
            <Filters/>
            <SearchBar/>
            <div className={style.ButtonHeartContainer}>
                <button className={style.HeartContainer} onClick={handleClick}>
                    <img className={style.HeartIcon} src={darkHeartIcon} alt="" />
                    <h3>Added</h3>
                </button>
            </div>
            <Link to={'/form'}>
                <div className={style.ButtonAddContainer}>
                <button className={style.Button} type='button'><h3>Add your doggy</h3></button>
                </div>
            </Link>
        </header>
        
        
        
    )
};
export default NavBar;