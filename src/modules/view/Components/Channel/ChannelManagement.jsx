import React,{useState,useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux';
import styles from './channel.module.css';
import {Form} from 'react-bootstrap';
import styles2 from '../Rates/rates.module.css';
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import ReactTooltip from "react-tooltip";
import AddChannel from './Components/AddChannels/AddChannels';
import {addChannel,delChannel} from '../../../../general_redux/calendar/actions';
import channelText from './Components/AddChannels/channelText';

function ChannelManagement(props){
    const dispatch =useDispatch();
    const channels = useSelector(({calendar})=>calendar && calendar.channels);
    const [editMode,setEditMode]=useState(false);
    const rentals=useSelector(({rentals})=>rentals && rentals.rentals);
    const [channelName,setChannelName]=useState('');
    const [addChannelView,setaddChannelView]=useState(false);
    const [editData,setEditData]=useState(null);

    const setInit=()=>{
        let tmp=[];
        if(rentals){
            rentals.map((rental)=>{
                tmp.push({id:rental.id, link:''})
            })
        }
        return tmp;
    }

    const [channelData,setChannelData]=useState(setInit);

    const onSelection=(data)=>{
        setaddChannelView(false);
        setEditMode(true);
        setEditData(data);
        dispatch(addChannel([data]));
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(channelData);
    }

    const handleFieldChange=(e,id)=>{
        // const tmp=;
        let tmp=[...channelData];
        const indx=channelData.findIndex((ch)=>ch.id===Number(id));

        if(indx!==-1){
            tmp[indx]={
                    id:Number(id),
                    link:e.target.value
                }
            setChannelData(tmp);
        }
    }

    const handleDelete=(e,value)=>{
        e.preventDefault();
        dispatch(delChannel(value));
    }

    const handleCopy=(e,id)=>{
        e.preventDefault();
        const copyElem=document.getElementById(`myLinkCopy-${id}`);
        copyElem.select();
        document.execCommand("copy");
    }

    return(
        <>
            <div className={styles.guestHeader}>
                <div>
                    <div className={styles.header}>
                        <span>iCal Connections</span>
                        <div className={styles2.toolTipIconContainer}>
                            <InfoOutlinedIcon
                                fontSize="small"
                                color="white"
                                data-tip
                                data-for="newChannel"
                                className={styles2.toolTipIcon}
                            />
                            <ReactTooltip place="bottom" type="dark" id="newChannel" effect="solid" className={styles2.toolTip}>
                          <span>
                            Beehaz used iCal connections to synchronize rental calendars with other
                            channels. This allows you to view all reservations from one place.
                            Synchronization times may vary according to the connected calendars.
                            Reservation details shared by other channels will vary.
                          </span>
                            </ReactTooltip>
                        </div>
                    </div>
                </div>
                <div className={styles.flexEnd}>
                    <button className={`${styles.btn} w-25`} onClick={()=>setaddChannelView(true)}>
                        Add Connection
                    </button>
                </div>
            </div>
            <AddChannel
                show={addChannelView}
                onHide={()=>setaddChannelView(false)}
                onSelection={(data)=>onSelection(data)}
            />
            {!editMode ?(
                <div className={`p-3`}>
                    <div className={styles.channelHeader}>
                        Connected Channels
                    </div>
                    {(channels && channels.length===0) ?(
                        <>
                            <span>You have not yet linked any calendar to Beehaz.</span>
                        </>
                    ):(
                        <>
                            {channels && channels.map((channel)=>(
                                <>
                                    <div className={styles.listItem} key={channel.value}>
                                        <div>{`${channel.label}`}</div>
                                        <div className={`{styles.modalFooter} p-0 d-flex justify-content-center `}>
                                            <button
                                                type="submit"
                                                className={styles.btnClass}
                                                style={{backgroundColor:"#439a86"}}
                                                onClick={()=> {
                                                    setEditMode(true);
                                                    setEditData(channel);
                                                }}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className={styles.btnClass}
                                                style={{backgroundColor:"#dc3545"}}
                                                onClick={(e)=>handleDelete(e,channel.value)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                    <hr className={styles.underLine} />
                                </>
                            ))}
                        </>
                    )}
                </div>
            ):(
                <div className={`p-3`}>
                    <div className={` d-flex justify-content-between`}>
                        <div className={styles.editHeader}>
                            <div>{editData.label}</div>
                        </div>
                        <button
                            className={styles.btnSave}
                            onClick={()=> {
                                setEditMode(false);
                                setEditData(null);
                            }}
                        >Back</button>
                    </div>
                    <hr className={styles.underLine} />
                    <div>
                        <p>{channelText[`${editData.value}`]}</p>
                    </div>
                    <div>
                        <Form onSubmit={handleSubmit}>
                            <div className={`d-flex`}>
                                <Form.Control
                                    className={`mr-2 ${styles.form_entry}`}
                                    name={"nameAlter"}
                                    value={channelName}
                                    onChange={(e)=>setChannelName(e.target.value)}
                                />
                                <button
                                    className={styles.btnSave}
                                    onClick={()=>console.log(channelName)}
                                >
                                    Save name
                                </button>
                            </div>
                            <br/>
                            {rentals && rentals.map((rental)=>(
                                <>
                                    <div id={rental.id} className={`d-flex mb-2 justify-content-lg-start`} key={rental.id}>
                                        <div className={styles.formInp1}>
                                            <div
                                                className={` col-form-label ${styles.rentalList}`}
                                            >
                                                <div className={styles.rentalName}>{rental.name}</div>
                                            </div>
                                            <Form.Control
                                                className={`w-100 ${styles.form_entry}`}
                                                // id={`${rental.id}-input`}
                                                id={`myLinkCopy-${rental.id}`}
                                                readOnly={true}
                                                value={`https://ical.link.from.beehaz.shows.here/${rental.id}`}
                                            />
                                        </div>
                                        <div className={styles.formInp2}>
                                            <button
                                                className={styles.btnCopy}
                                                onClick={(e)=>handleCopy(e,rental.id)}
                                            >Copy</button>
                                            <icon
                                                className={`fas fa-copy ${styles.hideIcon}`}
                                                style={{color:'#555',padding:'10px 0'}}
                                                onClick={(e)=>handleCopy(e,rental.id)}
                                            />
                                            <Form.Control
                                                className={`w-100 ${styles.form_entry}`}
                                                // id={`${rental.id}-input`}
                                                onChange={(e)=>handleFieldChange(e,rental.id)}
                                            />
                                        </div>
                                        <br/>
                                    </div>
                                </>
                            ))}
                            <button
                                type={"submit"}
                                className={styles.btnSave}
                            >Save</button>
                            <button
                                type={"reset"}
                                style={{background:'rgb(108, 117, 125)'}}
                                className={`${styles.btnSave}`}
                            >
                            Discard
                            </button>
                        </Form>
                    </div>
                </div>
            )}
        </>
    )
}

export default ChannelManagement;
