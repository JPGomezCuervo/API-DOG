import style from "./Footer.module.css";
import gitHubLogo from "../../assets/github.svg";
import linkedInLogo from "../../assets/linkedin.svg";
import gmailLogo from "../../assets/gmail.svg";
import { github, linkedin, gmail, home, form } from "../../utils/constants";

const Footer = () => {

    return (

        <footer className={style.Footer}>

            <div className={style.LogosContainer}>

                <a href={github} target="_blank" rel="noreferrer">
                    <img src={gitHubLogo} alt=""/>
                </a>
                <a href={linkedin} target="_blank" rel="noreferrer">
                    <img src={linkedInLogo} alt=""/>
                </a>
                <a href={`mailto: ${gmail}`} target="_blank" rel="noreferrer">
                    <img src={gmailLogo} alt=""/>
                </a>
            </div>

            <div className={style.Container}>

                <div className={style.Navegation}>
                    <h3>Navigation</h3>
                    <ul>
                        <a href={home}>
                            <li>Home</li>
                        </a>



                        <a href={form}>
                            <li>Add your doggy</li>
                        </a>

                    </ul>
                </div>

                <div className={style.SocialMedia}>
                    <h3>Social Media</h3>
                    <ul>
                            <a href={github} target="_blank" rel="noreferrer">
                                <li>GitHub</li>
                            </a>

                            <a href={linkedin} target="_blank" rel="noreferrer">
                                <li>Linkedin</li>
                            </a>

                            <a href={`mailto: ${gmail}`} target="_blank" rel="noreferrer">
                                <li>Gmail</li>
                            </a>
                        </ul>

                </div>
            </div>
            <h2>Open to work</h2>
            <h2>2023</h2>

        </footer>

    )
}

export default Footer;
            