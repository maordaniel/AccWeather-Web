import React, {useEffect} from "react";
import {connect} from "react-redux";
import {FaMoon} from 'react-icons/fa';
import {BsSun} from 'react-icons/bs';
import {setTheme} from "../redux/actions/main_actions";
import "../css/main_css.css";

function ThemeButton(props) {

    useEffect(() =>{
        if (props.main.theme === "light"){
            document.body.style.backgroundColor = "white";
            document.body.style.color = "black";
        }else {
             document.body.style.backgroundColor = "black";
             document.body.style.color = "white";
        }
    },[]);

    const changeTheme = () =>{
        if (props.main.theme === "light"){
            props.setTheme("dark");
            document.body.style.backgroundColor = "black";
            document.body.style.color = "white";
        }else {
            props.setTheme("light");
            document.body.style.backgroundColor = "white";
            document.body.style.color = "black";
        }
    };

    return(
        <div style={{"cursor": "pointer"}} onClick={changeTheme}>
            {props.main.theme === "light" ?
                <FaMoon color={"#dedc9f"} size={"3em"}/>
                :
                <BsSun color={"#fff438"} size={"3em"}/>
            }
        </div>
    )
}

const mapStateToProps = state =>{
    return{
        main: state.main_reducers
    }
}

export default connect(mapStateToProps,{setTheme})(ThemeButton);
