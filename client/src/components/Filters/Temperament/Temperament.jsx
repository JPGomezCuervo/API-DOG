import style from "./Temperament.module.css";
import icon from "../../../assets/happy_dog_icon.png"
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAllTemperaments, fetchTemperaments } from "../../../features/temperamentsSlice";
import { sortByTemperament, fetchDogs, activeFilters, selectFilters, clearDogs } from "../../../features/dogsSlice";
import { setCurrentPage, setSelectedTemperaments, selectedTemperamentsStore } from "../../../features/utilsSlice";
import removeIcon from '../../../assets/remove_icon.png'

const Temperament = () => {
    const filters = useSelector(selectFilters);
    const temperaments = useSelector(selectAllTemperaments);
    const dispatch = useDispatch();
    const selectedTemperaments = useSelector(selectedTemperamentsStore);
    const [error, setError] = useState(null);
    const buttonRef = useRef(null)


    const handleFilterClick = (event) => {
        const name = event.target.name;
        
        if (!selectedTemperaments.includes(name)) {
         dispatch(setSelectedTemperaments([...selectedTemperaments, name]));
            
        } else {
            dispatch(setSelectedTemperaments(selectedTemperaments.filter((temperament) => temperament !== name)));
            event.target.classList.remove(style.active)
        }
    };

    const handleDoneClick = () => {

        if (selectedTemperaments.length > 0) {
            dispatch(activeFilters({name: 'temperament', value: true}));
            dispatch(sortByTemperament(selectedTemperaments));
            dispatch(setCurrentPage(1));
            setError(null);
        } else {
            setError('Please select at least one temperament');
        }
    }

    const handleDeleteClick = () => {
        document.querySelectorAll(`.${style.active}`).forEach(button => button.classList.remove(style.active));
        dispatch(setSelectedTemperaments([]));
        dispatch(clearDogs());
    }

    const handleError = () => {
        buttonRef.current.classList.remove(style.ErrorActive)
        setError(null)

    }

    useEffect(() => {
        if(selectedTemperaments.length === 0) {
            dispatch(fetchDogs());
            dispatch(activeFilters({ name: 'temperament', value: false }));
        }
    }
    , [selectedTemperaments, dispatch])

    
    
    useEffect(() => {
        dispatch(fetchTemperaments());
    }, [dispatch])

    return (
        <>
            <div className={style.Desktop}>
                <div className = {style.TotalButtonContainer} onClick={() => { dispatch(activeFilters({ name: 'temperament', value: false  }));  dispatch(setSelectedTemperaments([])); dispatch(clearDogs())}}>
                    <img 
                        className={filters.temperament === true ? `${style.FilterImage} ${style.EnableImg}`: style.FilterImage} src={icon} alt='Temperament Icon'/>
                    <h3 
                        className={filters.temperament === true ? `${style.Description} ${style.EnableDescription}` : style.Description }>Temperament
                    </h3>
                </div>

                <ul className={style.Dropmenu}>
                    {temperaments.map((temperament, index) => {
                        return (
                            <li key={index}>
                                <button 
                                className={selectedTemperaments.includes(temperament.name) ? `${style.Button} ${style.active}` : style.Button} 
                                key={temperament.id} 
                                name={temperament.name} 
                                onClick={handleFilterClick}>
                                    {temperament.name}
                                </button>
                            </li>
                        )
                    })}
                    {error !== null ? 
                        <div ref={buttonRef} className={`${style.Error} ${style.ErrorActive}` }>
                            <h1 className={style.ErrorTitle}>{error}</h1>
                            <img className={style.Remove} src={removeIcon} alt=""/>
                            <button onClick={handleError}>Again</button>
                        </div>:
                        <div className={style.Error}>{error}</div>}
                    <button className={style.Delete} onClick={handleDeleteClick}>Delete</button>
                    <button className={style.Done} onClick={handleDoneClick}>filter</button>
                </ul>
            </div>

            <div className={style.Mobile}>

            {/* onClick={() => { dispatch(activeFilters({ name: 'temperament', value: false  }));  dispatch(setSelectedTemperaments([])); dispatch(clearDogs())}}
            para despues por si las moscas */}
            
            <div className = {style.TotalButtonContainer}>
                    <img 
                        className={filters.temperament === true ? `${style.FilterImage} ${style.EnableImg}`: style.FilterImage} src={icon} alt='Temperament Icon'/>
                    <h3 
                        className={filters.temperament === true ? `${style.Description} ${style.EnableDescription}` : style.Description }>Temperament
                    </h3>
                </div>

                <ul className={style.Dropmenu}>
                    {temperaments.map((temperament, index) => {
                        return (
                            <li key={index}>
                                <button 
                                className={selectedTemperaments.includes(temperament.name) ? `${style.Button} ${style.active}` : style.Button} 
                                key={temperament.id} 
                                name={temperament.name} 
                                onClick={handleFilterClick}>
                                    {temperament.name}
                                </button>
                            </li>
                        )
                    })}
                    {error !== null ? 
                        <div ref={buttonRef} className={`${style.Error} ${style.ErrorActive}` }>
                            <h1 className={style.ErrorTitle}>{error}</h1>
                            <img className={style.Remove} src={removeIcon} alt=""/>
                            <button onClick={handleError}>Again</button>
                        </div>:
                        <div className={style.Error}>{error}</div>}
                    <button className={style.Delete} onClick={handleDeleteClick}>Delete</button>
                    <button className={style.Done} onClick={handleDoneClick}>filter</button>
                </ul>
            </div>
        </>
    )
};

export default Temperament;