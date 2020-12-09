import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import NavBar from "../components/NavBar";
import WeatherCard from "../components/WeatherCard";
import "../css/main_css.css";
import GlobalSearch from "../components/GlobalSearch";
import {GetData, apiKey} from "../services/api";
import TodayWeatherCard from "../components/TodayWeatherCard";
import {Spinner} from "react-bootstrap";
import AddToFavorites from "../components/AddToFavorites";
import {GoLocation} from 'react-icons/go';
import {setCurrentLocation} from "../redux/actions/main_actions";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MainScreen(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [currentWeather, setCurrentWeather] = useState({});
    const [dailyForecasts, setDailyForecasts] = useState([]);
    const [city, setCity] = useState("");
    const [geoPosition, setGeoPosition] = useState(false);

    useEffect(() =>{
        setIsLoading(true);
        getGeoPosition();
    }, [props.main.unit, props.main.currentLocation]);

    const getGeoPosition = () =>{
        const success = async (position) =>{
            setGeoPosition(true);
            const latitude  = position.coords.latitude;
            const longitude = position.coords.longitude;
            try {
                const params = new URLSearchParams([['apikey', apiKey],["q", `${latitude},${longitude}`]]);
                const res = await GetData(`/locations/v1/cities/geoposition/search`, params);
                if (res.status === 200){
                    const location = {"id":res.data["Key"], LocalizedName: res.data["EnglishName"], Country:res.data["Country"]};
                    getCurrentWeather(location);
                    getDailyWeather(location);
                }
            }catch (e){
                notify();
            }
        };

        const error = () =>{
            getCurrentWeather();
            getDailyWeather();
            setGeoPosition(false);
        }
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, error);
        }else {
            error();
        }

    };

    const getDailyWeather = async (key = props.main.defaultLocation) =>{
        try {
            if (Object.keys(props.main.currentLocation).length > 0){
                key = props.main.currentLocation;
            }

            const params = new URLSearchParams([['apikey', apiKey],["metric", props.main.unit]]);
            const res = await GetData(`/forecasts/v1/daily/5day/${key["id"]}`, params);
            if (res.status === 200) {
                setDailyForecasts(res.data["DailyForecasts"]);
            }
        }catch (e){
            notify();

        }
    };

    const getCurrentWeather = async (key = props.main.defaultLocation) =>{
        try {
            if (Object.keys(props.main.currentLocation).length > 0){
                key = props.main.currentLocation;
            }
            setCity(key);
            const params = new URLSearchParams([['apikey', apiKey]]);
            const res = await GetData(`/currentconditions/v1/${key["id"]}`, params);
            if (res.status === 200) {
                setIsLoading(false);
                setCurrentWeather(res.data);
            }
        }catch (e){
            notify();
        }
    };

    const fiveDaysWeather = () =>{
        return dailyForecasts.map(item =>
                <WeatherCard key={item["EpochDate"]} header={city["LocalizedName"]} date={item["Date"]}
                             unit={props.main.unit ? "C" : "F"}
                             data={item["Temperature"]} icon={item["Day"]["Icon"]}/>
            );
    }

    const todayWeather = () =>{
        if (currentWeather.length > 0)
            return <TodayWeatherCard key={currentWeather[0]["EpochDate"]} header={city["LocalizedName"]} unit={props.main.unit ? "C" : "F"}
                         date={currentWeather[0]["LocalObservationDateTime"]}
                         data={currentWeather[0]["Temperature"]} icon={currentWeather[0]["WeatherIcon"]}/>
    }

    const notify = () => toast("Connection Problem");

    return(
        <div>
            <NavBar/>
            <ToastContainer />
            {isLoading ?
                <div style={{display:'flex', justifyContent:'center', marginTop: "30vh"}}>
                    <Spinner variant="primary"  animation="border"
                        style={{width:'100px', height:'100px'}}/>
                </div>
                :
                <div>
                    <GlobalSearch/>
                    <div className="grid-container">
                        <div className={"today"}>
                             <div style={{display:"flex", margin:'0 auto', alignItems:'center'}}>
                                 {geoPosition ?
                                     <GoLocation style={{color:'#496288',marginRight:"20px",
                                     marginBottom:"10vh", cursor:"pointer"}}  size={"3em"}
                                     onClick={()=>props.setCurrentLocation({})}/>
                                     :
                                     null}

                                {todayWeather()}
                                <AddToFavorites city={city}/>
                            </div>

                        </div>
                        <div className={"header"}>
                            <h1 className={"card_text"} style={{fontSize: "calc(18px + 2.5vw)", color:'#8a65cf', fontFamily: "monospace"}}>
                                scattered clouds
                            </h1>
                        </div>
                        <div className={"content"}>
                            <div style={{display:"flex", margin:'0 auto'}}>
                                {fiveDaysWeather()}
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

const mapStateToProps = state =>{
    return{
        main: state.main_reducers
    }
}

export default connect(mapStateToProps,{setCurrentLocation})(MainScreen);
