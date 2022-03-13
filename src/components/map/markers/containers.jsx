import React, { useState, Fragment, useEffect } from 'react';
import IconLib from '../icons';
import { useTranslation } from "react-i18next";
import { Marker, Tooltip } from "react-leaflet";
import "../tooltip.scss";

const Load = {
Red:()=>{
    const {t} = useTranslation();
    const [data,setData] = useState([]);
    const [marker,setMarker] = useState([]);
    useEffect(()=>{fetch("./api/read.php?table=container__red").then(response=>response.json()).then(d=>setData(d))},[]);
    useEffect(()=>{
        var i = setInterval(()=>setMarker(window.localStorage_Settings.container.red));
        return ()=>clearInterval(i);
    });
    if (data !== null) {return (marker ? (data.map((x=>
        <Marker 
            icon={()=>{setInterval(()=>{
                if(window.localStorage_Checked.redContainers[x.id] === 1){return IconLib.redBoxChecked}else{return IconLib.redBox}
            })}
            }
            position={[x.lat,x.lng]} 
            eventHandlers={function(){
                this.addEventListener("contextmenu", function(e){
                    e.preventDefault();
                    if(window.localStorage_Checked.redContainers[x.id] === 1){
                        window.localStorage_Checked.redContainers[x.id] = 0
                        localStorage.setItem("checked",JSON.stringify(window.localStorage_Checked))
                    } else {
                        window.localStorage_Checked.redContainers[x.id] = 1
                        localStorage.setItem("checked",JSON.stringify(window.localStorage_Checked))
                    };
                })
            }}
        >
            <Tooltip direction='top'><tooltip-window>
                <header>
                     <span><menuicon/> {t("items:container.red.title")}</span>
                </header>
                <content>
                    {t("ui:Map.placedBy")}: {x.contributer}
                    <id>ID: {x.id}</id>
                </content>
            </tooltip-window></Tooltip>
        </Marker>
    ))):<Fragment/>)}else{return <Fragment/>}
},
Green:()=>{
    const {t} = useTranslation();
    const [data,setData] = useState([]);
    const [marker,setMarker] = useState([]);
    useEffect(()=>{fetch("./api/read.php?table=container__green").then(response=>response.json()).then(d=>setData(d))},[]);
    useEffect(()=>{
        var i = setInterval(()=>setMarker(window.localStorage_Settings.container.green));
        return ()=>clearInterval(i);
    });
    if (data !== null) {return (marker ? (data.map((x=>
        <Marker icon={IconLib.greenBox} position={[x.lat,x.lng]}>
            <Tooltip direction='top'><tooltip-window>
                <header>
                    <span><menuicon/> {t("items:container.green.title")}</span>
                </header>
                <content>
                    {t("ui:Map.placedBy")}: {x.contributer}
                    <id>ID: {x.id}</id>
                </content>
            </tooltip-window></Tooltip>
        </Marker>
    ))):<Fragment/>)}else{return <Fragment/>}
}
}

export default function Containers(){return (<>
<Load.Red/>
<Load.Green/>
</>)};