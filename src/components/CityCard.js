import React, {useEffect, useState} from "react";
import {Card} from "react-bootstrap";
import {connect} from "react-redux";
import ReactCountryFlag from "react-country-flag";
import {setCurrentLocation} from "../redux/actions/main_actions";
import {useHistory} from "react-router-dom";
import {apiKey, GetData} from "../services/api";
import {toast} from "react-toastify";

function CityCard(props){
    const history = useHistory();
    const [temperature, setTemperature] = useState({});

    let id = props.city["Key"] ? props.city["Key"] : props.city["id"];

    useEffect(() =>{
        if(props.temp)
            getCurrentWeather(id);
    },[]);

    const getCurrentWeather = async (key) =>{
        try {
            const params = new URLSearchParams([['apikey', apiKey]]);
            const res = await GetData(`/currentconditions/v1/${key}`, params);
            if (res.status === 200) {
                return setTemperature(res.data[0]["Temperature"])

            }
        }catch (e){
            notify();
        }
    };

    const weather = () =>{
        if (Object.keys(temperature).length  > 0){
            let temp = props.main.unit ? temperature["Metric"]: temperature["Imperial"];
             return `${temp["Value"]}°${temp["Unit"]}`;
        }
    }

    const notify = () => toast("Connection Problem");

    return(
        <Card style={{ width: '22rem', margin: "20px", minWidth:'18rem', cursor:"pointer"}} bg={props.main.theme}
            onClick={() =>{
                props.setCurrentLocation({id: id, LocalizedName:props.city["LocalizedName"],
                    Country:props.city["Country"]});
                history.push('/home');
            }}>
            <Card.Header className={"card_text"} style={{fontSize:'20px'}}>
                <ReactCountryFlag countryCode={props.city["Country"]["ID"]} svg style={{width: '3em', height: '3em'}}/>
            </Card.Header>
            <Card.Body>
                <Card.Title className={"card_text"} style={{color:"#e58059", fontSize:'25px'}}>
                    {props.city["LocalizedName"]}
                </Card.Title>
                <Card.Text className={"card_text"} style={{color:"#8a3535",fontWeight:"bold"}}>
                    {props.city["Country"]["LocalizedName"]}
                </Card.Text>
                <Card.Text className={"card_text"} >
                    {weather()}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

const mapStateToProps = state =>{
    return{
        main: state.main_reducers
    }
}

export default connect(mapStateToProps,{setCurrentLocation})(CityCard);
