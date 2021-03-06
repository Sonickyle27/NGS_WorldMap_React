import React, { useState, Fragment, useEffect, useRef } from 'react';
import IconLib from '../icons';
import { useTranslation } from "react-i18next";
import { Marker, Tooltip, Popup} from "react-leaflet";
import "../tooltip.scss";
import "../popup.scss";

const Load = {
Battledia:()=>{
    const {t} = useTranslation();
    const popupRef = useRef();
    const close = () => {popupRef.current._closeButton.click()}
    const [data,setData] = useState([]);
    const [marker,setMarker] = useState([]);
    const [tier,setTier] = useState("1");
    const handleSelectChange=(e)=>setTier(e.target.value);
    useEffect(()=>{fetch("./assets/data/battledias.json").then(response=>response.json()).then(d=>setData(d))},[]);
    useEffect(()=>{
        var i = setInterval(()=>setMarker(window.localStorage_Settings.landmark.battledia));
        return ()=>clearInterval(i);
    });
    return(marker ? (data.map((x=>
        <Marker icon={IconLib.battledia} position={[x.lat,x.lng]}>
            <Tooltip direction='top'><tooltip-window>
                <header>
                    <span><menuicon/> {t("battledias:"+x.id+".title")}</span>
                </header>
                <content>
                    {t("items:landmark.battledia.title")}
                    <id>ID: {x.id}</id>
                </content>
            </tooltip-window></Tooltip>
            <Popup ref={popupRef}><popup-window>
                <header>
                    <span><menuicon/> {t("items:landmark.battledia.title")}</span><closebutton onClick={()=>close()}/>
                </header>
                <content>
                    <select onChange={handleSelectChange}>
                        {(x.ranks.map((y=> 
                            <option value={y.rank}>{t("ui:Map.rank")} {y.rank}</option>
                        )))}
                    </select>
                    <br/><br/>
                    <name>{t("battledias:"+x.id+".title")}</name>
                    <br/>
                    {(x.ranks.map((y=>
                        <info className={tier === y.rank.toString() ? "" : "hidden"}>
                            <div>
                                <level>
                                    <span>{t("ui:Map.maxPlayers")}</span>
                                    <border/>
                                    <value>{x.players}</value>
                                </level>
                                <level>
                                    <span>{t("ui:Map.requiredBP")}</span>
                                    <border/>
                                    <value>{y.minBP}</value>
                                </level>
                                <level>
                                    <span>{t("ui:Map.enemyLv")}</span>
                                    <border/>
                                    <value>{y.enemyLv}</value>
                                </level>
                            </div>
                        </info>
                    )))}
                    <cont>
                        <img src="./assets/images/banners/other/battledia.png" alt="" />
                        {(x.ranks.map((y=>
                            <info className={tier === y.rank.toString() ? "" : "hidden"}>
                                <span>{(()=>{
                                    switch(x.type){
                                        case "purple":
                                            return t("ui:Map.rewards.possible")
                                        case "yellow":
                                            return t("ui:Map.rewards.guaranteed")
                                        default:
                                            return <Fragment/>
                                    }
                                })()}</span>
                                <border/>
                                <rewards>
                                    <div>
                                        {(y.rewards.map((z=><>
                                            {(()=>{if (z.count != null){
                                                return (<>
                                                    <l>{t("rewards:"+z.item)}</l>
                                                    <r>x{z.count}</r>
                                                </>);
                                            } else {
                                                return (<full>{t("rewards:"+z.item)}</full>);
                                            }})()}
                                        </>)))}
                                    </div>
                                </rewards>
                            </info>
                        )))}
                    </cont>
                    <span>{t("ui:Map.clearCondition")}</span>
                    <border/>
                    {t("battledias:"+x.id+".clearCondition")}
                    <br/><br/>
                    <span>{t("ui:Map.description")}</span>
                    <border/>
                    {t("battledias:"+x.id+".description")}
                </content>
            </popup-window></Popup>
        </Marker>
    ))):<Fragment/>)
},
Cocoon:()=>{
    const {t} = useTranslation();
    const popupRef = useRef();
    const close=()=>popupRef.current._closeButton.click();
    const [data,setData] = useState([]);
    const [marker,setMarker] = useState([]);
    useEffect(()=>{fetch("./assets/data/cocoons.json").then(response=>response.json()).then(d=>setData(d))},[]);
    useEffect(()=>{
        var i = setInterval(()=>setMarker(window.localStorage_Settings.landmark.cocoon));
        return ()=>clearInterval(i);
    });
    return(marker?(data.map((x=>
        <Marker icon={IconLib.cocoon} position={[x.lat,x.lng]}>
            <Tooltip direction='top'><tooltip-window>
                <header>
                    <span><menuicon/> {t("cocoons:"+x.id+".title")}</span>
                </header>
                <content>
                    {t("items:landmark.cocoon.title")}
                    <id>ID: {x.id}</id>
                </content>
            </tooltip-window></Tooltip>
            <Popup ref={popupRef}><popup-window>
                <header>
                    <span><menuicon/> {t("items:landmark.cocoon.title")}</span><closebutton onClick={()=>close()}/>
                </header>
                <content>
                    <name>{t("cocoons:"+x.id+".title")}</name>
                    <br/>
                    <info>
                        <div>
                            <level>
                                <span>{t("ui:Map.maxPlayers")}</span>
                                <border/>
                                <value>{x.players}</value>
                             </level>
                            <level>
                                <span>{t("ui:Map.requiredBP")}</span>
                                <border/>
                                <value>{x.minBP}</value>
                            </level>
                            <level>
                                <span>{t("ui:Map.enemyLv")}</span>
                                <border/>
                                <value>{x.enemyLv}</value>
                            </level>
                        </div>
                    </info>
                    <cont>
                        <img src="./assets/images/banners/other/trainia.png" alt="" />
                        <info>
                            <span>{t("ui:Map.rewards.firstTime")}</span>
                            <border/>
                            <rewards>{(x.firstrewards.map((y=>
                                <div>
                                    <l>{t("rewards:"+y.item)}</l>
                                    <r>x{y.count}</r>
                                </div>
                            )))}</rewards>
                            </info>
                    </cont>
                    <span>{t("ui:Map.clearCondition")}</span>
                    <border/>
                    {t("cocoons:"+x.id+".clearCondition")}
                    <br/><br/>
                    <span>{t("ui:Map.subMissions")}</span>
                    <border/>
                    <submission-divider/> {t("cocoons:"+x.id+".subMission1")}
                    <br/>
                    <submission-divider/> {t("cocoons:"+x.id+".subMission2")}
                    <br/>
                    <submission-divider/> {t("cocoons:"+x.id+".subMission3")}
                    <br/><br/>
                    <span>{t("ui:Map.description")}</span>
                    <border/>
                    {t("cocoons:"+x.id+".description")}
                </content>
            </popup-window></Popup>
        </Marker>
    ))):<Fragment/>)
},
Mag:()=>{
    const {t} = useTranslation();
    const [data,setData] = useState([]);
    const [marker,setMarker] = useState([]);
    useEffect(()=>{fetch("./api/read.php?table=landmark__mag").then(response=>response.json()).then(d=>setData(d))},[]);
    useEffect(()=>{
        var i = setInterval(()=>setMarker(window.localStorage_Settings.landmark.mag));
        return ()=>clearInterval(i);
    });
    return(marker ? (data.map((x=>
        <Marker icon={IconLib.mag} position={[x.lat,x.lng]}>
            <Tooltip direction='top'><tooltip-window>
            <header>
                <span><menuicon/> {t("mags:"+x.string)}</span>
            </header>
            <content>
                {t("items:landmark.mag.title")}
                <id>ID: {x.string}</id>
            </content>
            </tooltip-window></Tooltip>
        </Marker>
    ))):<Fragment/>)
},
Ryuker:()=>{
    const {t} = useTranslation();
    const [data,setData] = useState([]);
    const [marker,setMarker] = useState([]);
    useEffect(()=>{fetch("./api/read.php?table=landmark__ryuker").then(response=>response.json()).then(d=>setData(d))},[]);
    useEffect(()=>{
        var i = setInterval(()=>setMarker(window.localStorage_Settings.landmark.ryuker));
        return ()=>clearInterval(i);
    });
    return(marker ? (data.map((x=>
        <Marker icon={IconLib.ryuker} position={[x.lat,x.lng]}>
            <Tooltip direction='top'><tooltip-window>
                <header>
                    <span><menuicon/> {t("ryukers:"+x.string)}</span>
                </header>
                <content>
                    {t("items:landmark.ryuker.title")}
                    <id>ID: {x.string}</id>
                </content>
            </tooltip-window></Tooltip>
        </Marker>
    ))) : <Fragment/>)
},
Tower:()=>{
    const {t} = useTranslation();
    const popupRef = useRef();
    const close=()=>popupRef.current._closeButton.click();
    const [data,setData] = useState([]);
    const [marker,setMarker] = useState([]);
    useEffect(()=>{fetch("./assets/data/towers.json").then(response=>response.json()).then(d=>setData(d))},[]);
    useEffect(()=>{
        var i = setInterval(()=>setMarker(window.localStorage_Settings.landmark.tower));
        return ()=>clearInterval(i);
    });
    return(marker ? (data.map((x=>
        <Marker icon={IconLib.tower} position={[x.lat,x.lng]}>
            <Tooltip direction='top'><tooltip-window>
                <header>
                    <span><menuicon/> {t("towers:"+x.id+".title")}</span>
                </header>
                <content>
                    {t("items:landmark.tower.title")}
                    <id>ID: {x.id}</id>
                </content>
            </tooltip-window></Tooltip>
            <Popup ref={popupRef}><popup-window>
                <header>
                    <span><menuicon/> {t("items:landmark.tower.title")}</span><closebutton onClick={()=>close()}/>
                </header>
                <content>
                    <name>{t("towers:"+x.id+".title")}</name>
                    <br/>
                    <info>
                        <div>
                            <level>
                                <span>{t("ui:Map.maxPlayers")}</span>
                                <border/>
                                <value>{x.players}</value>
                             </level>
                            <level>
                                <span>{t("ui:Map.requiredBP")}</span>
                                <border/>
                                <value>{x.minBP}</value>
                            </level>
                            <level>
                                <span>{t("ui:Map.enemyLv")}</span>
                                <border/>
                                <value>{x.enemyLv}</value>
                            </level>
                        </div>
                    </info>
                    <cont>
                        <img src="./assets/images/banners/other/trainia.png" alt="" />
                        <info>
                            <span>{t("ui:Map.rewards.firstTime")}</span>
                            <border/>
                            <rewards>{(x.firstrewards.map((y=>
                                <div>
                                    <l>{t("rewards:"+y.item)}</l>
                                    <r>x{y.count}</r>
                                </div>
                            )))}</rewards>
                            </info>
                    </cont>
                    <span>{t("ui:Map.clearCondition")}</span>
                    <border/>
                    {t("towers:"+x.id+".clearCondition")}
                    <br/><br/>
                    <span>{t("ui:Map.subMissions")}</span>
                    <border/>
                    <submission-divider/> {t("towers:"+x.id+".subMission1")}
                    <br/>
                    <submission-divider/> {t("towers:"+x.id+".subMission2")}
                    <br/>
                    <submission-divider/> {t("towers:"+x.id+".subMission3")}
                    <br/><br/>
                    <span>{t("ui:Map.description")}</span>
                    <border/>
                    {t("towers:"+x.id+".description")}
                </content>
            </popup-window></Popup>
        </Marker>
    ))):<Fragment/>)
},
UQ:()=>{
    const {t} = useTranslation();
    const popupRef = useRef();
    const close=()=>popupRef.current._closeButton.click();
    const [data,setData] = useState([]);
    const [marker,setMarker] = useState([]);
    const [tier,setTier] = useState("1");
    const handleSelectChange=(e)=>setTier(e.target.value);
    useEffect(()=>{fetch("./assets/data/uq.json").then(response=>response.json()).then(d=>setData(d))},[]);
    useEffect(()=>{
        var i = setInterval(()=>setMarker(window.localStorage_Settings.landmark.urgent));
        return ()=>clearInterval(i);
    });
    return(marker ? (data.map((x=>
        <Marker icon={IconLib.urgent} position={[x.lat,x.lng]}>
            <Tooltip direction='top'><tooltip-window>
                <header>
                    <span><menuicon/> {t("urgents:"+x.id+".title")}</span>
                </header>
                <content>
                    {t("items:landmark.urgent.title")}
                    <id>ID: {x.id}</id>
                </content>
            </tooltip-window></Tooltip>
            <Popup ref={popupRef}><popup-window>
                <header>
                    <span><menuicon/> {t("items:landmark.urgent.title")}</span><closebutton onClick={()=>close()}/>
                </header>
                <content>
                    <select onChange={handleSelectChange}>
                        {(x.ranks.map((y=> 
                            <option value={y.rank}>{t("ui:Map.rank")} {y.rank}</option>
                        )))}
                    </select>
                    <br/><br/>
                    <name>{t("urgents:"+x.id+".title")}</name>
                    <br/>
                    {(x.ranks.map((y=>
                        <info className={tier === y.rank.toString() ? "" : "hidden"}>
                            <div>
                                <level>
                                    <span>{t("ui:Map.maxPlayers")}</span>
                                    <border/>
                                    <value>{x.players}</value>
                                </level>
                                <level>
                                    <span>{t("ui:Map.requiredBP")}</span>
                                    <border/>
                                    <value>{y.minBP}</value>
                                </level>
                                <level>
                                    <span>{t("ui:Map.enemyLv")}</span>
                                    <border/>
                                    <value>{y.enemyLv}</value>
                                </level>
                            </div>
                        </info>
                    )))}
                    <cont>
                        <img src={"./assets/images/banners/urgents/"+x.id+".png"} alt="" />
                        {(x.ranks.map((y=>
                            <info className={tier === y.rank.toString() ? "" : "hidden"}>
                                <span>{t("ui:Map.rewards.firstTime")}</span>
                                <border/>
                                <rewards>{(x.firstRewards.map((z=>
                                    <div>
                                        <l>{t("rewards:"+z.item)}</l>
                                        <r>{(()=>{switch (z.item){
                                            case "meseta":
                                            case "season_points":
                                            case "experience":
                                                return (<>{z.count}</>)
                                            default:
                                                return (<>x{z.count}</>)
                                            }
                                        })()}</r>
                                        </div>
                                )))}</rewards>
                                <br/>
                                <span>{t("ui:Map.rewards.guaranteed")}</span>
                                <border/>
                                <rewards>{(y.rewards.map((z=>
                                    <div>
                                        <l>{t("rewards:"+z.item)}</l>
                                        <r>{(()=>{switch (z.item){
                                            case "meseta":
                                            case "season_points":
                                            case "experience":
                                                return (<>{z.count}</>)
                                            default:
                                                return (<>x{z.count}</>)
                                            }
                                        })()}</r>
                                    </div>
                                )))}</rewards>
                            </info>
                        )))}
                    </cont>
                    <span>{t("ui:Map.clearCondition")}</span>
                    <border/>
                    {t("urgents:"+x.id+".clearCondition")}
                    <br/><br/>
                    <span>{t("ui:Map.description")}</span>
                    <border/>
                    {t("urgents:"+x.id+".description")}
                </content>
            </popup-window></Popup>
        </Marker>
    ))):<Fragment/>)
}}

export default function Landmarks(){return(<>
<Load.Battledia/>
<Load.Cocoon/>
<Load.Mag/>
<Load.Ryuker/>
<Load.Tower/>
<Load.UQ/>
</>)};