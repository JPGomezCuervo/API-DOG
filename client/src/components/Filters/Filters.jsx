import Weight from "./Weigth/Weight";
import Breed from "./Breed/Breed";
import Temperament from "./Temperament/Temperament";
import style from "./Filters.module.css"
import { useDispatch, useSelector } from "react-redux";
import {disableAllFilters, fetchDogs, selectFilters} from "../../features/dogsSlice"
import { setSelectedTemperaments } from "../../features/utilsSlice";
import clearIcon from '../../assets/trash_icon.png'
import { useEffect, useState } from "react";
const Filters = () => {
    const filters = useSelector(selectFilters)
    const {temperament, breed, weight} = filters
    const dispatch = useDispatch();

    const [filterOn, setFilterOn] = useState(false); 
    useEffect(() => {
        if (temperament || breed.aToZ || breed.zToA || weight.lighter|| weight.heavier) {
            setFilterOn(true)
        } else {
            setFilterOn(false)
        }
    }, [breed.aToZ, breed.zToA, weight.lighter, weight.heavier, temperament])
    const handleClickClearAll = () => {
        dispatch(disableAllFilters());
        dispatch(fetchDogs());
        dispatch(setSelectedTemperaments([]))
    }
    return (
        <>

            <div className={style.Container}>
                <h3 className={style.Order}>Sort By:</h3>
                <ul className={style.Filters}>
                    <li><Weight/></li>

                    <li><Breed/></li>
                    
                    <li><Temperament/></li>
                    <div className={filterOn ? `${style.ClearContainer} ${style.ClearContainerOn}`: style.ClearContainer} onClick ={handleClickClearAll}>
                        <button className={style.CleanContainer} onClick ={handleClickClearAll}><img className={style.ClearFilters} src={clearIcon} alt=""/></button>
                        <h3>Clear</h3>
                    </div>
                
                </ul>
            </div>
        </>
    )
};

export default Filters;