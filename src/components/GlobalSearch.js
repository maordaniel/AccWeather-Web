import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {Button} from "react-bootstrap";
import ic_search from "../assets/icons/ic_search_24px.png";
import "../css/main_css.css";
import {setUnit} from "../redux/actions/main_actions";
import CityCard from "./CityCard";
import {GetData, apiKey} from "../services/api";
import {toast} from "react-toastify";

function GlobalSearch(props) {
    const [text, setText] = useState("");
    const [cities, setCities] = useState([]);

    const clearInput = () =>{
        setText("");
        setCities([]);
    }

    const setUnitType = () =>{
        if(props.main.unit){
            props.setUnit(false);
        }else{
            props.setUnit(true);
       }
    };

     const isEmpty = (str) => {
        return (
            (typeof str == 'undefined')
                  ||
            (str == null)
                  ||
            (str === false)        //same as: !x
                  ||
            (str.length === 0)
                  ||
            (str === "")
                  ||
            (str.replace(/\s/g,"") === "")
                  ||
            (!/[^\s]/.test(str))
                  ||
            (/^\s*$/.test(str))
        );
    }

    const getCity = async (text)=>{
        let reg = /^[a-z ]+$/i;
        if (!reg.test(text) && text.length > 0)
            return alert("Sorry, English letters only!");
        setText(text);
        try {
            if (!isEmpty(text)){
                const params = new URLSearchParams([['apikey', apiKey],["q", `${text}`]]);
                const res = await GetData(`/locations/v1/cities/autocomplete`, params);
                if (res.status === 200){
                    setCities(res.data);
                }
            }else {
                setCities([]);
            }
        }catch (e){
            notify();
        }
    };

    const citiesCard = () =>{
        return cities.map(city => <CityCard temp={false} key={city["Key"]} city={city}/>);
    }

    const notify = () => toast("Connection Problem");

    return(
        <div style={{margin:"3em"}}>
            <div className={"global_search"}>
                <input className={"global_search_input"} style={{ backgroundImage: text ? 'none' : `url(${ic_search})`}}
                    value={text} onChange={(e) => getCity(e.target.value)}
                       placeholder={"Global Search"}/>
                <Button style={{marginLeft:'10px', border:'none', backgroundColor: '#3d678f'}}  onClick={clearInput}>
                   Clear
                </Button>
                <Button style={{marginLeft:'10px'}} variant="outline-info" onClick={setUnitType}>
                   °C/°F
                </Button>
            </div>
            <div style={{display:"flex", overflowX:'auto'}}>
                {citiesCard()}
            </div>
        </div>
    )
}

const mapStateToProps = state =>{
    return{
        main: state.main_reducers
    }
}

export default connect(mapStateToProps,{setUnit})(GlobalSearch);
