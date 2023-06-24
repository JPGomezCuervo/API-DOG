import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDogsByName, fetchDogs, clearDogs, disableAllFilters, selectAllDogs } from "../../features/dogsSlice";
import { setCurrentPage, setSearchbar, selectSearchbar } from "../../features/utilsSlice";
import style from "./SearchBar.module.css";
import lupaIcon from "../../assets/lupa_icon.png";
const SearchBar = () => {
    const dogs = useSelector(selectAllDogs);
    const buttonRef = useRef(null)
    const deleteRef = useRef(null)
    const dispatch = useDispatch();
    const search = useSelector(selectSearchbar);
    const handleChange = (event) => {
        dispatch(setSearchbar(event.target.value));
    };
    const handleClick = () => {
        dispatch(fetchDogsByName(search));
        dispatch(setCurrentPage(1));
        dispatch(disableAllFilters());
    };
    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
           handleClick();
        }
    };
    const handleAddFocus = () => {
        buttonRef.current.classList.add(style.Focus);
    }
    const handleInputBlur = () => {
        buttonRef.current.classList.remove(style.Focus);
    };

    const handleEraseClick = () => {
        if (search !== '') {
            if (dogs.length >= 160){
                dispatch(setSearchbar(""));
            } else {
                dispatch(clearDogs());
                dispatch(setSearchbar(""));
            }
        } else {
            dispatch(setSearchbar(""))
            dispatch(clearDogs());
            dispatch(fetchDogs())
        }
    };

    useEffect(() => {
        if(!search) dispatch(fetchDogs());
    }, [dispatch, search])
    
    return (
        
        <div className={style.Container}>
            
            
                <div className={style.InputContainer} ref={buttonRef}>
                    <input
                    className={style.Input}
                    type="text" 
                    placeholder="Search by breed" 
                    onFocus = {handleAddFocus}
                    onBlur = {handleInputBlur}
                    onChange={handleChange} 
                    onKeyDown={handleKeyDown}
                    value={search}/>
                    <button ref={deleteRef} className={style.Delete} onClick={handleEraseClick}>X</button>
                </div>

            <button className={style.Button} type="button" onClick={handleClick} >
                <img className={style.Lupa} src={lupaIcon} alt="" />
            </button>

        </div>
    )
};
export default SearchBar;