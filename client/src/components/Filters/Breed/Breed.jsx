import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {sortFromAToZStore, sortFromZToAStore, selectAllDogs, fetchDogs, activeFilters, selectFilters, sortAtoZHeaviest, sortAtoZLightest, sortZtoAHeaviest, sortZtoALightest } from "../../../features/dogsSlice";
import { useDispatch } from "react-redux";
import style from "./Breed.module.css"
import BreedIcon from "../../../assets/breed_icon.png"
import PawIcon from "../../../assets/paw_icon.png"

const Breed = () => {
    const filters = useSelector(selectFilters);
    const {weight, breed} = filters;
    const dogs = useSelector(selectAllDogs);
    const dispatch = useDispatch();
    const [sortFromA, setSortFromA] = useState(false);
    const [sortFromZ, setSortFromZ] = useState(false);
    
    const handleFilterClick = (event) => {
        const name = event.target.name;
        
        

        switch (name) {
            case 'SortFromA':
                if(!sortFromA) {
                    if (weight.heavier) {
                        dispatch(sortAtoZHeaviest(dogs));
                        setSortFromA(true);
                        setSortFromZ(false);

                    } else if (weight.lighter) {
                        dispatch(sortAtoZLightest(dogs));
                        setSortFromA(true);
                        setSortFromZ(false);
                    } else {
                    dispatch(sortFromAToZStore(dogs));
                    setSortFromA(true);
                    setSortFromZ(false);
                    }

                } else {
                    setSortFromA(false);
                    dispatch(fetchDogs());
                }
                
                break;
            case 'SortFromZ':
                if(!sortFromZ) {
                    if (weight.heavier) {
                        dispatch(sortZtoAHeaviest(dogs));
                        setSortFromZ(true);
                        setSortFromA(false);
                    } else if (weight.lighter) {
                        dispatch(sortZtoALightest(dogs));
                        setSortFromZ(true);
                        setSortFromA(false);

                    } else {
                    dispatch(sortFromZToAStore(dogs));
                    setSortFromZ(true);
                    setSortFromA(false);
                    }
                    
                } else {
                    setSortFromZ(false);
                    dispatch(fetchDogs());
                }
                break;

            default:
                dispatch(fetchDogs())
                break;

        };
    };
    useEffect(() => {
        if (sortFromA){
            dispatch(activeFilters({name: 'breed', value: {aToZ: true, zToA: false}}));
        } else if (sortFromZ) {
            dispatch(activeFilters({name: 'breed', value: {aToZ: false, zToA: true}}));    
        } else {
            dispatch(activeFilters({name: 'breed', value: {aToZ: false, zToA: false}}));
        }
    }, [sortFromA, sortFromZ, dispatch]);

    return (
        
        <div className={style.Desktop}>
            <div className = {style.TotalButtonContainer} onClick={() => {dispatch(activeFilters({name: 'breed', value: {aToZ: false, zToA: false}}));}}>
                <img 
                    className={breed.aToZ === true || breed.zToA === true ? `${style.FilterImage} ${style.EnableImg}`: style.FilterImage} src={BreedIcon} alt="Breed" />
                <h3 
                    className={breed.aToZ === true || breed.zToA === true ? `${style.Description} ${style.EnableDescription}` : style.Description }>Breed
                </h3>
            </div>
            <ul className={style.Dropmenu}>
                <li className={breed.aToZ === true ? `${style.ListOption} ${style.Pressed}` : style.ListOption}>
                        
                            <button className={style.Button} name={'SortFromA'} onClick={handleFilterClick}> 
                                <img className={style.PawIconUp} src={PawIcon} alt="" name={'SortFromA'}/>
                                A-Z 
                            </button>
                        
                </li>

                <li className={breed.zToA === true ? `${style.ListOption2} ${style.Pressed}` : style.ListOption2}>
                        
                            <button className={style.Button} name={'SortFromZ'} onClick={handleFilterClick}>
                                <img className={style.PawIconDown} src={PawIcon} alt="" name={'SortFromZ'}/>
                                Z-A
                            </button>
                        
                </li>
            </ul>
        </div>
    )
};

export default Breed;

