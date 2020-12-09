import React from "react";
import {Nav} from "react-bootstrap";
import "../css/main_css.css";
import ThemeButton from "./ThemeButton";

function NavBar(){

    return(
        <div className={"nav_bar"}>
            <h4 style={{color:'#bea3a3',margin:'15px'}}>
                AccWeather
            </h4>
             <Nav className="justify-content-end" style={{margin:'10px'}}>
                 <Nav.Item>
                    <Nav.Link href="/home"
                              style={{color: window.location.pathname.startsWith("/home") ? "#FFF" : null}}>
                        Home
                    </Nav.Link>
                 </Nav.Item>
                 <Nav.Item>
                    <Nav.Link href="/favorites"
                              style={{color: window.location.pathname.startsWith("/favorites") ? "#FFF" : null}}>
                        Favorites
                    </Nav.Link>
                 </Nav.Item>
                 <Nav.Item style={{marginLeft:'30px'}}>
                     <ThemeButton/>
                 </Nav.Item>
             </Nav>
        </div>
    )
}

export default NavBar;
