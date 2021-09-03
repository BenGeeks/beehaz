import React, { useState,useEffect } from 'react';
import styles from '../../rates.module.css';
import { useDispatch,useSelector } from 'react-redux';
import { Table } from 'react-bootstrap';
import BulkDefaultChange from '../BulkDefaultChanges/BullkDefaultChange';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import ReactTooltip from 'react-tooltip';
import {LoadSettings} from '../../../../../../general_redux/general settings/actions';
import Loading from "../../../../../../components/loading";

function RatesList() {
  const rateList = useSelector(({ rates }) => rates && rates.rateSettings);
  const actionForBulkDefault = useSelector(({rates})=>rates && rates.actionForBulkDefault);
  const rentals =useSelector(({rentals})=>rentals && rentals.rentals);
  const setting = useSelector(({generalSetting})=> generalSetting && generalSetting.setting);
  const rateListStatus = useSelector(({rates})=> rates && rates.actionForRateList);
  const [bulkDefaultModal, setBulkDefaultModal] = useState(false);
  const dispatch=useDispatch();

  useEffect(()=>{
    if(actionForBulkDefault.success){
      dispatch(LoadSettings());
    }
  },[actionForBulkDefault])

  const rateName=(id)=>{
    const tmp=rentals.filter((rental)=> {
      return rental.id === Number(id)
    })
    if(tmp.length!==0){
      return tmp[0].name;
    }else{
      return "";
    }
  }

  const findCurrency = (id)=>{
    const tmp= rentals.filter((rental)=>rental.id===Number(id))
    if(tmp.length!==0){
      return tmp[0].currency;
    }else{
      return "";
    }
  }

  return (
    <div>
      <Loading loadingStatus={rateListStatus.loading || actionForBulkDefault.loading}/>
      <BulkDefaultChange
          show={bulkDefaultModal}
          onHide={() => setBulkDefaultModal(false)}
          rateList={rateList}
      />
      <div className={`my-2 col-sm-8 col-lg-6 col-xl-4 col-xs-12 p-0`}>
        <div className={`my-3 ${styles.btnContainer}`}>
          <button className={`${styles.ratelistBtn}`} onClick={() => setBulkDefaultModal(true)}>
            Set Defaults
          </button>
        </div>
        <Table responsive hover className={styles.ratelistTable}>
          <thead>
            <tr>
              <th colspan="2">
                <div className="d-flex flex-direction-column">
                  <div>New rentals</div>
                  <div className={styles.toolTipIconContainer}>
                    <InfoOutlinedIcon
                      fontSize="small"
                      color="inherit"
                      data-tip
                      data-for="newRentals"
                      className={styles.toolTipIcon}
                    />
                    <ReactTooltip place="bottom" type="dark" id="newRentals" effect="solid" className={styles.toolTip}>
                      <span>
                        Defaults are used when there is no rate set for particular date. When you create a new rental,
                        we will use the default rate and minimum stay requirement you set here. You can later change the
                        default for that (or any) rental. Defaults are used for your own peace of mind: you are always
                        certain to have a rate set at all times.
                      </span>
                    </ReactTooltip>
                  </div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={styles.tableWidth65}>Default nightly rate:</td>
              <td className={styles.tableWidth35}>{`${setting.dailyRate} ${setting.currency ? setting.currency.label:""}`}</td>
            </tr>
            <tr>
              <td className={styles.tableWidth65}>Minimum stay:</td>
              <td className={styles.tableWidth35}>{`${setting.minimumStayRequirement}`}</td>
            </tr>
          </tbody>
        </Table>
      </div>
      <hr />
      <div className={`col-sm-8 col-lg-6 col-xl-4 col-xs-12 p-0`}>
        {rateList && rateList.length !== 0 ? (
            rateList.map((data, index) => {
            return (
              <Table responsive hover className={styles.ratelistTable} key={index}>
                <thead>
                  <tr>
                    <th colSpan={2}>
                      <div className={styles.rentalName}>
                          {rateName(data.rentalId)}
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={styles.tableWidth65}>Default nightly rate:</td>
                    <td className={styles.tableWidth35}>
                      {data.dailyRate} {findCurrency(data.rentalId)}
                    </td>
                  </tr>
                  <tr>
                    <td className={styles.tableWidth65}>Minimum stay:</td>
                    <td className={styles.tableWidth35}>{data.minimumStayRequirement} nights</td>
                  </tr>
                </tbody>
              </Table>
            );
          })
        ) : (
          <h1>No table to display</h1>
        )}
      </div>
    </div>
  );
}

export default RatesList;
