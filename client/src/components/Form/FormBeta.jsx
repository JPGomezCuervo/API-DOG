import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchTemperaments} from '../../features/temperamentsSlice';
import validations from './validations';
import style from './Form.module.css'
import validationTemperaments from './validations/validationTemperaments';
import rulerIcon from '../../assets/height_icon.png'
import weightIcon from '../../assets/weight_icon.png'
import lifeSpanIcon from '../../assets/life_span_icon.png'
import breedIcon from '../../assets/breed_icon.png'
import checkIcon from '../../assets/check_icon.png'
import padLock from '../../assets/padlock_icon.png'
import crossIcon from '../../assets/remove_icon.png'
import { NavLink} from 'react-router-dom';


class FormBeta extends Component {

    constructor (props) {
        super(props);
        this.state = {
            temperaments: props.temperaments,
            selectedTemperaments: [],
            errors: {
                breed: '',
                height: '',
                weight: '',
                life_span: '',
                image: '',
                temperaments: '',
            },
            
            input: {
                breed: '',
                min_height: '',
                max_height: '',
                min_weight: '',
                max_weight: '',
                min_life_span: '',
                max_life_span: '',
                image: '',
                temperaments: [],
            },
            allowSubmit: false,
            succeeded: '',
            rejected: '',
            
        };
    }
    handleTemperament = (event) => {
        event.preventDefault();
        const name = event.target.name;
        const id = event.target.id;
        const temperament = {id, name};

        if (!this.state.selectedTemperaments.some(temp => temp.name === name)) {
            this.setState({selectedTemperaments: [...this.state.selectedTemperaments, temperament]}, () => {
                this.setState({errors: validationTemperaments(this.state.selectedTemperaments, this.state.errors, this.state.input.temperaments)});
            });
        } else {
            this.setState({selectedTemperaments: this.state.selectedTemperaments.filter((temperament) => temperament.name !== name)}, () => {
                this.setState({errors: validationTemperaments(this.state.selectedTemperaments, this.state.errors, this.state.input.temperaments)});
            });
        }
    };

    handleChange = (event) => {
        this.setState({input: {...this.state.input, [event.target.name]: event.target.value}}, () => {
          this.setState({errors: validations(event.target.value, event.target.name, this.state.errors, this.state.input)});
        });
      };

    handleDeleteClick = (event) => {
        event.preventDefault()
        document.querySelectorAll(`.${style.active}`).forEach(button => button.classList.remove(style.active));
        this.setState({selectedTemperaments: []})
    }
      
    handleSubmit = (event) => {
        window.scrollTo({top: 0, left:0, behavior: 'auto'})
        event.preventDefault();
            fetch('http://localhost:3001/dogs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.input)
            }).then((response) => {
                if (!response.ok ) {
                    return response.json().then((data) => {

                        throw (data)
                    })
                } else {
                    return response.json()
                }
            })
            .then((data)=> {
                if (data && data.dog && data.dog.breed) {
                    this.setState({rejected:""})}
                    this.setState({succeeded:`${data.dog.breed } was created successfully`})
                }
                )
            .catch((error) => {
                this.setState({succeeded: ""})
                this.setState({rejected: error.error})
            })
        
    };

    componentDidMount () {
        this.props.fetchTemperaments();
    };

    componentDidUpdate (prevProps, prevState) {
        if (prevState.selectedTemperaments !== this.state.selectedTemperaments) {
            this.setState({input: {...this.state.input, temperaments: this.state.selectedTemperaments}});
        }
        if (prevProps.temperaments !== this.props.temperaments) {
            this.setState({temperaments: this.props.temperaments});
        }
        if (prevState.input !== this.state.input) {

            this.setState({allowSubmit: Object.values(this.state.errors).every(error => error === '' && this.state.input.temperaments.length > 0 )});
        }
    };

    render () {
        const {temperaments, input, errors, succeeded,rejected, allowSubmit} = this.state;
        return (

            <>

                <>
                    {succeeded &&  
                    <div>
                        <div className={style.AdvertiseContainer} ></div>
                            
                            <div className={style.Advertise}>
                                <h1>{succeeded}</h1> 
                                <img className={style.CheckIcon} src={checkIcon} alt="Check icon" />
                                <div>
                                    <NavLink to = {'/homepage'} className={style.AdvertiseButton1}>Home</NavLink>
                                    <button onClick={() => { 
                                        window.scrollTo({top: 0, left:0, behavior: 'auto'})
                                        window.location.reload()
                                        }} className={style.AdvertiseButton2}>Another dog</button>    
                                </div>
                            </div>
                    </div>
                    } 
                    {rejected &&  
                    <div>
                        <div className={style.AdvertiseContainer}></div>
                            
                            <div className={style.Advertise}>
                                <h1>{rejected}</h1> 
                                <img className={style.CheckIcon} src={crossIcon} alt="Check icon" />
                                <div>
                                    <NavLink to = {'/homepage'} className={style.AdvertiseButton1}>Home</NavLink>
                                    <button onClick={() => { 
                                        window.scrollTo({top: 0, left:0, behavior: 'auto'})
                                        window.location.reload()
                                        }} className={style.AdvertiseButton2}>Another dog</button>    
                                </div>
                            </div>
                    </div>
                    } 
                </>
            
            <div className={style.BigContainer}>

                
                <div>
                    <NavLink to = {'/homepage'} className={style.Back}>
                        Back
                    </NavLink>
                    <h1 className={style.BigTitle}>Create your Doggo</h1>
                </div>

                <form className={style.FormContainer}>
                        <div className={style.ContainerTop}>
                            <div className={style.BreedContainer}>
                                <div className={style.Search}>
                                    <div className={style.search1}>
                                        <label className={style.Perro} htmlFor='breed'>Breed</label>
                                        <input value={input.breed} type='text' name='breed' id='breed' onChange={this.handleChange} autoComplete='off'/>
                                    </div>
                                    {errors.breed && <p>{errors.breed}</p>}
                                </div>
                            </div>
                            <img className={style.ImageBreed} src={breedIcon} alt="" />
                            <div className={style.BreedContainer2}>
                                <div>
                                    <label className={style.Perro} htmlFor='url'>URL photo</label>
                                    <input type='text' name='url' id='url' onChange={this.handleChange} autoComplete='off'/>
                                    {errors.url && <p>{errors.url}</p>}
                                </div>
                            </div>
                        </div>
                    
                    <div className={`${style.HeightContainer} ${style.AttributeContainer}`}>
                        <h2 className={style.Titles}>Height</h2>

                        <div className={style.OptionsContainer}>
                            <div className={style.InputContainer}>
                                <label htmlFor='min_height'>Min</label>
                                <input value={input.min_height} type='text' name='min_height' id='min_height' onChange={this.handleChange} autoComplete='off'/>    
                            </div>

                            <img className={`${style.Image} ${style.Ruler}`} src={rulerIcon} alt="" />

                            <div className={style.InputContainer}>
                                <label htmlFor='max_height'>Max</label>
                                <input value={input.max_height} type='text' name='max_height' id='max_height' onChange={this.handleChange} autoComplete='off'/>
                                <h2 className={style.Measure}>Centimeters</h2>
                            </div>
                        </div>
                        <div className={style.Error}>
                            {errors.height && <p>{errors.height}</p>}

                        </div>

                    </div>

                    <div className={`${style.WeightContainer} ${style.AttributeContainer}`}>
                        <h2 className={style.TitleWeight}>Weight</h2>

                        <div className={style.OptionsContainer}>
                            <div className={style.InputContainer}>
                                <label htmlFor='min_weight'>Min</label>
                                <input value={input.min_weight} type='text' name='min_weight' id='min_weight' onChange={this.handleChange} autoComplete='off'/>
                            </div>

                            <img className={style.Image} src={weightIcon} alt="" />

                            <div className={style.InputContainer}>
                                <label htmlFor='max_weight'>Max</label>
                                <input value={input.max_weight} type='text' name='max_weight' id='max_weight' onChange={this.handleChange} autoComplete='off'/>    
                                <h2 className={style.Measure}>Kilograms</h2>
                            </div>
                        </div>
                        <div className={style.Error}>
                            {errors.weight && <p>{errors.weight}</p>}
  
                        </div>
                    </div>

                    <div className={`${style.LifeSpanContainer} ${style.AttributeContainer}`}>
                        <h2 className={style.Titles}>Life Span</h2>

                        <div className={style.OptionsContainer}>
                            <div className={style.InputContainer}>
                                <label htmlFor='min_life_span'>Min</label>
                                <input value={input.min_life_span} type='text' name='min_life_span' id='min_life_span' onChange={this.handleChange} autoComplete='off'/>
                            </div>

                            <img className={style.Image} src={lifeSpanIcon} alt="" />
                            
                            <div className={style.InputContainer}>
                                <label htmlFor='max_life_span'>Max</label>
                                <input value={input.max_life_span} type='text' name='max_life_span' id='max_life_span' onChange={this.handleChange} autoComplete='off'/>   
                                <h2 className={style.Measure}>Years</h2> 
                            </div>
                        </div>
                        <div className={style.Error}>
                            {errors.life_span && <p>{errors.life_span}</p>}
                        </div>
                    </div>
                    
                    
                    <div className={style.TemperamentContainer}>
                        <h2>Temperaments</h2>
                        <ul className={style.Temperaments}>
                            {temperaments.map((temperament, index) => {
                                return (
                                    <li key={index}> 
                                        <button
                                        className={this.state.selectedTemperaments.some((element) => element.name === temperament.name) ? `${style.Button} ${style.active}` : style.Button}
                                        key={temperament.id} 
                                        name={temperament.name}
                                        onClick={this.handleTemperament}
                                        id={temperament.id}                                        
                                        >
                                        {temperament.name}
                                        </button>
                                    </li>
                                )
                            })}

                            <button  onClick={this.handleDeleteClick}>Delete</button>
                        </ul>
                            {errors.temperaments && <p className={style.Error}>{errors.temperaments}</p>}
                    </div>
                    
                    <div>
                        <div className={style.LockContainer}>
                            <img className={allowSubmit === true ? `${style.Allow} ${style.PadLock}` : style.PadLock} src={padLock} alt="" />
                            <div className={style.SubmitContainer}>
                                <button className={style.Submit} onClick={this.handleSubmit} disabled={!allowSubmit}><h3>Submit</h3></button>
                            </div>
                        </div>
                    {(!allowSubmit)? (<p className={style.ErrorLast}>Please fill all the fields</p>) : (<p></p> )}
                    </div>
                </form>
                </div>
                

            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        temperaments: state.temperaments.temperaments
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchTemperaments: () => dispatch(fetchTemperaments())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(FormBeta); 