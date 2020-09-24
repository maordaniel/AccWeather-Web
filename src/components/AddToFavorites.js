import React from "react";
import {connect} from "react-redux";
import {BsHeartFill, BsHeart} from 'react-icons/bs';
import {Button} from "react-bootstrap";
import {setFavorites} from "../redux/actions/main_actions";


function AddToFavorites(props) {
    const addToFavorites = () =>{
        props.setFavorites([...props.main.favorites, props.city]);
    };

    const removeFromFavorites = () =>{
        let newList = props.main.favorites.filter(item => item["id"] !== props.city["id"]);
        props.setFavorites(newList);
    };

    const content = () => {
        if(props.main.favorites.some(e => e["id"] === props.city["id"])) {
            return  <div>
                       <BsHeartFill style={{color:'#dc3545',marginRight:"20px"}} size={"3em"}/>
                       <Button variant="danger" onClick={removeFromFavorites}>Remove From Favorites</Button>
                    </div>
        }else {
            return <div>
                       <BsHeart style={{color:'#dc3545',marginRight:"20px"}} size={"3em"}/>
                       <Button variant="outline-danger"  onClick={addToFavorites}>Add To Favorites</Button>
                   </div>
        }
    };

    return(
        <div className={"favorites_btn"}>
            {content()}
        </div>
    )
}

const mapStateToProps = state =>{
    return{
        main: state.main_reducers
    }
}

export default connect(mapStateToProps,{setFavorites})(AddToFavorites);