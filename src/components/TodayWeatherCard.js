import React from "react";
import {Card} from "react-bootstrap";
import {connect} from "react-redux";

function TodayWeatherCard(props){

    const accuweatherIcon = val =>{
        if (val < 10)
            val= `0${val}`;
        return `https://developer.accuweather.com/sites/default/files/${val}-s.png`;
    };

    return(
        <Card style={{ width: '22rem', margin: "10px", minWidth:'18rem',}} bg={props.main.theme}>
            <Card.Header className={"card_text"} style={{fontSize:'20px'}}>
                Today
            </Card.Header>
            <Card.Img style={{width:"50px",marginLeft:"40%",marginTop:'20px'}}
                      src={accuweatherIcon(props.icon)} />
            <Card.Body>
                <Card.Title className={"card_text"} style={{color:"#5691b0", fontSize:'25px'}}>
                    {props.header}
                </Card.Title>
                <Card.Text className={"card_text"}>
                    {`${props.main.unit ? props.data["Metric"]["Value"]: props.data["Imperial"]["Value"]}°${props.unit}`}
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

export default connect(mapStateToProps,{})(TodayWeatherCard);
