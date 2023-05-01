import { Link } from 'react-router-dom'
import style from './LandingPage.module.css'
import canela from '../../assets/canelita.png'
import starring from '../../assets/starring_dog.png'


const LandingPage = () => {
    return(
        <div className={style.BackGround}>
            <div className={style.LeftSide}>
                <img className={style.Canela} src={canela} alt="" />
            </div>

            <div className={style.RightSide}>
                <div className={style.Container}>
                    <h1 className={style.Title}>Doggo finder</h1>
                    <h2 className={style.Description}>Explore and share dogs' breeds</h2>
                    <Link className={style.Link} to={'/homepage'}> 
                        <button className={style.Button}>Explore</button>
                 </Link>
                </div>
                <img className={style.Starring} src={starring} alt="" />
            </div>

        </div>
    )
}

export default LandingPage