import React from "react";
import {Card} from "react-bootstrap";
import {connect} from "react-redux";

function WeatherCard(props){

    const formatDate = string => {
        let date = new Date(string);
        let formattedDay = date.toString();
        return formattedDay.split(" ")[0];
    };

    const accuweatherIcon = val =>{
        if (val < 10)
            val= `0${val}`;
        return `https://developer.accuweather.com/sites/default/files/${val}-s.png`;
    };

    return(
        <Card style={{ width: '18rem', margin: "10px", minWidth:'18rem',}} bg={props.main.theme}>
            <Card.Img style={{width:"50px",marginLeft:"40%",marginTop:'20px'}}
                      src={accuweatherIcon(props.icon)} />

            <Card.Body>
                <Card.Title className={"card_text"} style={{color:"#5691b0", fontSize:'25px'}}>
                    {formatDate(props.date)}
                </Card.Title>
                <Card.Text className={"card_text"}>
                    {`${props.data["Maximum"]["Value"]}°${props.unit}`}/
                    <span style={{fontSize:'12px',marginTop:'6px'}}>
                        {`${props.data["Minimum"]["Value"]}°${props.unit}`}
                    </span>
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

export default connect(mapStateToProps,{})(WeatherCard);
