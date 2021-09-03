import React,{useState,useEffect} from 'react';
import styles from './slide_select.module.css';

function SlideSelect(props){
    const [currentSelect,setCurrentSelect]=useState(props.currentSelect || 0);
    useEffect(() => {
        setCurrentSelect(props.currentSelect);
    }, [props.currentSelect])

    const handleChange=(status)=>{
        const {getCurrentSelection,list, onSelectData}=props;
        const val=currentSelect;
        const len=props.list.length;
        let result;
        if(status==="next"){
            if((list.length - 1) - val){ 
                result = (val+1) % len;
            if(getCurrentSelection){
                getCurrentSelection(list[((val+1) % len)]);
            }
        }
            
        }
        else if(status==="prev"){
            if(val-1<0){
                result = 0;
                if(getCurrentSelection){getCurrentSelection(list[0]);}
            }else{
                result = (val-1) %len;
                if(getCurrentSelection){getCurrentSelection(list[((val-1) %len)]);}
            }
        }
        if (result !== undefined) {
            setCurrentSelect(result)
            onSelectData && onSelectData(result)
        }
    }
    return(
        <div className={styles.borderBox}>
            <div className={styles.mainContainer}>
                    <div
                        className={styles.scroll_menu_arrow}
                        onClick={()=>handleChange('prev')}
                        >{`<<`}
                    </div>
                    <div className={styles.middleSelection}>{props.list[currentSelect]}</div>
                    <div
                        className={styles.scroll_menu_arrow}
                        onClick={()=>handleChange('next')}
                        >{`>>`}
                    </div>
            </div>
        </div>
    )
}

export default SlideSelect;