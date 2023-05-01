import { useSelector } from 'react-redux';
import style from './Card.module.css';
import {Link} from 'react-router-dom';
import { selectDogsStatus } from '../../features/dogsSlice';
const Card = ({dog, index}) => {
    const status = useSelector(selectDogsStatus)
    let {name, weight, temperament, image, id } = dog;
    const isOdd = index % 2 === 0;
    let CardType;
    
    if (!name) {
        name = "No name found"
    }
    if (!weight) {
        weight = "No weight found"
    }
    if (!temperament) {
        temperament = "No temperaments found"
    }
    if (!image) {
        image = 'https://nupec.com/wp-content/uploads/2020/07/Captura-de-pantalla-2020-07-24-a-las-17.33.44.png'
    }

    //comprueba si el index es par o impar y le asigna una clase de css
    if (isOdd) {
        CardType = "CardEven"
    } else {
        CardType = "CardOdd"
    };


    return (
        <>
            <div className={style.Back}>
                <Link to = {`/detail/${id}`}>

                        <div className={style[CardType]}>
                                    <div className={style.Attributes}>
                                        <div className={style.Image}>
                                            <img src={image} alt={name}/>
                                        </div>
                                        
                                        <h2 className={style.Title}>{name}</h2>
                                    </div>

                                    <div className={style.Temperament}>
                                        <p>{temperament}</p>
                                        <h2 className={style.Weight}>{weight}</h2>
                                    </div>

                        </div>
                    
                </Link>
            </div>
        </>
    )
};

export default Card;