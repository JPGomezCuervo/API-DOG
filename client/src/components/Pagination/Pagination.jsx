import style from './Pagination.module.css'
import { useDispatch } from 'react-redux';
import { setCurrentPage, setNextPage, setPrevPage } from '../../features/utilsSlice';

const Pagination = ({totalDogs, dogsPerPage, currentPage}) => {
    const dispatch = useDispatch();
    const lastPage = Math.ceil(totalDogs / dogsPerPage);
    const pages = [];
    for (let i = 1 ; i <= lastPage; i++) {
        if (i === Math.ceil(totalDogs / dogsPerPage)) {
            pages.push(i);
            break;
        }
        if(i === 1 || i === lastPage|| (i >= currentPage - 2 && i <= currentPage + 2)
        ) pages.push(i);
        if ( currentPage < 5 && i > 1 && i < 7 && !pages.includes(i)) pages.push(i);

    }

    const handleNextClick = () => {
        if(pages.length -1 !== currentPage - 1){
            window.scrollTo({top: 0, left:0, behavior: 'smooth'})
            dispatch(setNextPage(lastPage))
        }
    }

    const handlePrevClick = () => {
        if(pages[0] !== currentPage ){
            window.scrollTo({top: 0, left:0, behavior: 'smooth'})
            dispatch(setPrevPage())
        }
    }

    return (
            <div className={style.Container}>
                <button onClick={handlePrevClick} className={pages.length < 1 ? `${style.ButtonArrows} ${style.ButtonDisable}`: style.ButtonArrows}>
                &lt;&lt;
                </button>
                {
                    pages.map((page, index) => {
                        return (
                            <button 
                            className={currentPage === page ? `${style.Button} ${style.active}` : style.Button} 
                            key={index} 
                            onClick={() => {
                                dispatch(setCurrentPage(page))
                                window.scrollTo({top: 0, left:0, behavior: 'smooth'})
                                }}>
                            {page}
                        </button>
                        )
                    })
                }
                <button onClick={handleNextClick} type='button' className={pages.length < 1 ? `${style.ButtonArrows} ${style.ButtonDisable}`: style.ButtonArrows} >
                &gt;&gt;
                </button>
                
            </div>
        
    )
};

export default Pagination;