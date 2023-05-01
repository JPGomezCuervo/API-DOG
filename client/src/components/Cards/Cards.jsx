import { useDispatch, useSelector } from "react-redux";
import { useRef, useState } from "react";
import { fetchDogs,selectAllDogs, selectDogsStatus, selectDogsError, disableAllFilters, clearDogs } from "../../features/dogsSlice";
import Card from "../Card/Card";
import Pagination from "../Pagination/Pagination";
import style from './Cards.module.css'
import { selectCurrentPage, setSearchbar, selectSearchbar} from "../../features/utilsSlice";
import loading from '../../assets/loading.gif'
const Cards = () => {
    const cardsRef = useRef(null)
    const dogs = useSelector(selectAllDogs);
    const status = useSelector(selectDogsStatus);
    const error = useSelector(selectDogsError);
    const currentPage = useSelector(selectCurrentPage);
    const search = useSelector(selectSearchbar);

    const dispatch = useDispatch();

    const [dogsPerPage, setDogsPerPage] = useState(8);
    const lastDogIndex = currentPage * dogsPerPage;
    const firstDogIndex = lastDogIndex - dogsPerPage;

    const currentdogs = dogs && dogs.length > 0 ? dogs.slice(firstDogIndex, lastDogIndex) : [];

    const handleTryAgainCLick = () => {
        dispatch(setSearchbar(""));
        dispatch(clearDogs());
        dispatch(disableAllFilters());
        dispatch(fetchDogs());
    };

    return (
        <div>

            {status === 'loading'?
            <div ref={cardsRef} className={style.CardsContainer}>
            {status === 'loading' && <img className={style.Loading} src={loading} alt="" /> }
            {error && <div className={style.DivError}>
                <h1>{error}</h1>
                <div>
                    <button>Try Again</button>=
                </div>
                </div>}
            </div>:
            
            <div ref={cardsRef} className={style.CardsContainer}>
            {status === 'loading' && <img className={style.Loading} src={loading} alt="" /> }
            {error && <div className={style.DivError}>
                <h1>{error}</h1>
                <div>
                    <button onClick={handleTryAgainCLick}>Try Again</button>
                </div>
                </div>}
            {currentdogs.map((dog, index) => {
                return <Card key={dog.id} dog={dog} index = {index}/>
            })}
            </div>}
            

            <Pagination
                totalDogs={dogs.length}
                dogsPerPage={dogsPerPage}
                currentPage={currentPage}/>


        </div>
        
    )
}

export default Cards;