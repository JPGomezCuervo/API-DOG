import weightIcon from "../../../assets/weight_icon.png"
import smallDogIcon from "../../../assets/small_dog_icon.png"
import guideDogIcon from "../../../assets/guide_dog_icon.png"
import { useSelector, useDispatch } from "react-redux";
import { sortHeaviestStore, sortLightestStore, selectAllDogs, fetchDogs, activeFilters, selectFilters, sortHeaviestAtoZ, sortHeaviestZtoA, sortLightestAtoZ, sortLightestZtoA } from "../../../features/dogsSlice";
import { useEffect, useState } from "react";
import style from "./Weight.module.css"
const Weight = () => {
    const filters = useSelector(selectFilters);
    const { breed, weight } = filters
    const dogs = useSelector(selectAllDogs);
    const dispatch = useDispatch();
    const [sortHeaviest, setSortHeaviest] = useState(false);
    const [sortLightest, setSortLightest] = useState(false);
    
    const handleFilterClick = (event) => {
        const name = event.target.name;
        switch (name) {
            case 'SortHeaviest':
                if(!sortHeaviest) {
                    if (breed.aToZ) {
                        dispatch(sortHeaviestAtoZ(dogs));
                        setSortHeaviest(true);
                        setSortLightest(false);

                    } else if (breed.zToA) {
                        dispatch(sortHeaviestZtoA(dogs));
                        setSortHeaviest(true);
                        setSortLightest(false);
                    } else {
                        dispatch(sortHeaviestStore(dogs));
                        setSortHeaviest(true);
                        setSortLightest(false);
                    }
                    
                } else {
                    setSortHeaviest(false);
                    dispatch(fetchDogs());
                }
                break;

            case 'SortLightest':
                if (!sortLightest) {
                    if (breed.aToZ) {
                        dispatch(sortLightestAtoZ(dogs));
                        setSortLightest(true);
                        setSortHeaviest(false);
                    } else if (breed.zToA) {
                        dispatch(sortLightestZtoA(dogs));
                        setSortLightest(true);
                        setSortHeaviest(false);
                    } else {
                        dispatch(sortLightestStore(dogs));
                        setSortLightest(true);
                        setSortHeaviest(false);
                    }

                } else {
                    setSortLightest(false);
                    dispatch(fetchDogs());
                }

                break;

            default:
                dispatch(fetchDogs());
                break;
        };
    };

    useEffect(() => {
        if (sortHeaviest){
            dispatch(activeFilters({name: 'weight', value: {heavier: true, lighter: false}}));
        } else if (sortLightest) {
            dispatch(activeFilters({name: 'weight', value: {heavier: false, lighter: true}}));    
        } else {
            dispatch(activeFilters({name: 'weight', value: {heavier: false, lighter: false}}));
        }
    }, [sortHeaviest, sortLightest, dispatch]);

    return (
        <>
            <div className={style.Desktop}>
                <div className = {style.TotalButtonContainer} onClick={ () => {dispatch(activeFilters({name: 'weight', value: {heavier: false, lighter: false}}));}}>
                    <img 
                        className={weight.lighter === true || weight.heavier === true ? `${style.FilterImage} ${style.EnableImg}`: style.FilterImage} src={weightIcon}
                        alt="Weigth"/>

                    <h3 
                        className={weight.lighter === true || weight.heavier === true? `${style.Description} ${style.EnableDescription}` : style.Description }>Weigth
                    </h3>
                </div>

                <ul className={style.Dropmenu}>
                    <li className={weight.heavier === true ? `${style.ListOption} ${style.Pressed}` : style.ListOption}>   
                        <button className={style.Button} onClick={handleFilterClick} name={'SortHeaviest'}>
                        <img className={style.OptionsImage} name={'SortHeaviest'} src={guideDogIcon} alt="" />
                            Heaviest to lightest
                        </button>

                    </li>

                        <li className={weight.lighter === true ? `${style.ListOption} ${style.Pressed}` : style.ListOption}>
                            <button className={style.Button} onClick={handleFilterClick} name={'SortLightest'}>
                                <img className={style.OptionsImageSmallDog} name={'SortLightest'} src={smallDogIcon} alt="" />
                                lightest to heaviest
                            </button>
                        </li>
                </ul>
                
            </div>

            <div className={style.Mobile}>
                <div className = {style.TotalButtonContainer}>
                    <img 
                        className={weight.lighter === true || weight.heavier === true ? `${style.FilterImage} ${style.EnableImg}`: style.FilterImage} src={weightIcon}
                        alt="Weigth"/>

                    <h3 
                        className={weight.lighter === true || weight.heavier === true? `${style.Description} ${style.EnableDescription}` : style.Description }>Weigth
                    </h3>
                </div>

                <ul className={style.Dropmenu}>
                    <li className={weight.heavier === true ? `${style.ListOption} ${style.Pressed}` : style.ListOption}>   
                        <button className={style.Button} onClick={handleFilterClick} name={'SortHeaviest'}>
                        <img className={style.OptionsImage} name={'SortHeaviest'} src={guideDogIcon} alt="" />
                            Heaviest to lightest
                        </button>

                    </li>

                    <li className={weight.lighter === true ? `${style.ListOption} ${style.Pressed}` : style.ListOption}>
                        <button className={style.Button} onClick={handleFilterClick} name={'SortLightest'}>
                            <img className={style.OptionsImageSmallDog} name={'SortLightest'} src={smallDogIcon} alt="" />
                            Lightest to heaviest
                        </button>
                    </li>

            
                    <li onClick={ () => {dispatch(activeFilters({name: 'weight', value: {heavier: false, lighter: false}}));}}>Disable</li> 
                </ul>
            </div>
        </>
    );
};
export default Weight;