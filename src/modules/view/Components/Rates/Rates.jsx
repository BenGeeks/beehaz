import React from  'react';
import {connect} from 'react-redux';

import RatesList from './components/RatesList/RatesList';
import RatesCalendar from "./components/RateCalendar/RatesCalendar";
import Loading from '../../../../components/loading';
import {rateList} from '../../../../general_redux/rates/actions';
import Taxes from './components/Taxes/Taxes';
import Fees from './components/Fees/Fees';
import styles2 from "../Guest/guest.module.css";

class Rates extends React.Component{
    state={
        currentTab:"Rates",
        tabs:[
            "Rates",
            "Defaults",
            "Fees",
            "Taxes"
        ],
    }
    handleTab = (tab)=>{
        this.setState({
            currentTab:tab
        })
    }
    componentDidMount() {
        const {rateList} =this.props;
        rateList();
    }

    render(){
        const {currentTab,tabs}=this.state;
        const {rateLoadStatus}=this.props;
        return(
            <div style={{margin:'0em 1em'}}>
                <Loading loadingStatus={rateLoadStatus.loading}/>
                <div className={styles2.upperRow}>
                    {tabs.length!==0 && tabs.map((tab,index)=>(
                        <a className={(currentTab===tab)?`${styles2.tabBox} ${styles2.active}`:`${styles2.tabBox}`}
                           key={index} onClick={()=> this.setState({
                            currentTab:tab
                        })}>
                            {tab}
                        </a>
                    ))}
                </div>

                <div >
                    {currentTab==="Rates" && (
                        <RatesCalendar/>
                    )}
                    {currentTab==="Defaults" && (
                        <RatesList/>
                    )}
                    {currentTab==="Fees" && (
                        <Fees/>
                    )}
                    {currentTab==="Taxes" &&(
                        <Taxes/>
                    )}
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state)=>({
    rateLoadStatus: state.rates.actionForRateList
})
const mapDispatchToProps = dispatch => ({
    rateList: (data)=>{
        dispatch(rateList(data))
    }
});

export default connect(mapStateToProps,mapDispatchToProps)(Rates);