import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { selectIndividualDog, fetchDogById, clearDog, selectDogsStatus } from '../../features/dogsSlice';
import style from './DetailCard.module.css'
import happyDogIcon from "../../assets/happy_dog_icon.png"
import weightIcon from "../../assets/weight_icon.png"
import rulerIcon from "../../assets/height_icon.png"
import heartIcon from "../../assets/life_span_icon.png"
import tapeIcon from "../../assets/tape_icon.png"
import loading from '../../assets/loading.gif'

const DetailCard = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const dog = useSelector(selectIndividualDog);
    const status = useSelector(selectDogsStatus);
    const {name, height, weight, life_span, temperament, image } = dog;
    const dispatch = useDispatch();
    
    const handleClick = () => {
        navigate(-1)
        dispatch(clearDog());
    };

    useEffect(() => {
        dispatch(fetchDogById(id))
    }, [dispatch, id])

    return (
        <div className={style.BigContainer}>
            <div className={style.Title}><h2>{name}</h2></div>

            <div className={style.Container}>
                <div className={style.LeftSide}>
                        
                    <div className={style.Card}>
                        <img className={style.TapeTop} src={tapeIcon} alt="" />
                        <img className={style.TapeBottom} src={tapeIcon} alt="" />
                        <div className={style.Description}>
                            <div className={style.ImageDiv}>
                                {status === 'loading' ? <img className={style.Image} src={loading} alt={name}></img> : <img className={style.Image} src={image} alt={name}/>}
                            </div>
                                    
                            <h2 className={style.Name}>{name}</h2>
                            <h2 className={style.Id}>{`ID: ${id}`}</h2>
                        </div>

                    </div>

                </div>
            
                <div className={style.RightSide}>

                            <div className={style.AttributesContainer}>

                                <div className={style.TextTemperament}>
                                    <img className={style.Icon} src={happyDogIcon} alt="" />
                                    <h3>{temperament}</h3>
                                </div>

                                <div className={style.Text}>
                                    <img className={style.Icon} src={weightIcon} alt="" />
                                    <h3>{weight}</h3>
                                </div>

                                <div className={style.Text}>
                                    <img className={style.Icon} src={rulerIcon} alt="" />
                                    <h3>{height}</h3>
                                </div>

                                <div className={style.Text}>
                                    <img className={style.Icon} src={heartIcon} alt="" />
                                    <h3>{life_span}</h3>
                                </div>
                            </div>
                </div>
            </div>

            <div className={style.ButtonContainer}>
                <button className={style.Button} onClick={handleClick}>Go Back</button></div>
            </div>
    )
}

export default DetailCard;