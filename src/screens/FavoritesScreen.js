import React from "react";
import {connect} from "react-redux";
import NavBar from "../components/NavBar";
import CityCard from "../components/CityCard";
import {BiSad} from 'react-icons/bi';
import {ToastContainer} from "react-toastify";

function FavoritesScreen(props) {

    const content = () =>{
        if (props.main.favorites.length > 0){
            return props.main.favorites.map(city =>
                <div key={city["id"]} style={{padding:"30px"}}><
                    CityCard temp={true} city={city}/>
                </div>);
        }
        return <h1 style={{margin:"20px auto"}}>
            Your Favorites List Is Empty
            <BiSad style={{color:'#34c3e7',marginRight:"20px"}} size={"1.5em"}/>
        </h1>;
    };

    return(
        <div >
            <NavBar/>
            <ToastContainer/>
            <div className={"favorites"} >
                {content()}
            </div>
        </div>
    )
}

const mapStateToProps = state =>{
    return{
        main: state.main_reducers
    }
}

export default connect(mapStateToProps,{})(FavoritesScreen);