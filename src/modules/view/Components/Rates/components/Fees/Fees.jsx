import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../../rates.module.css';
import Loading from '../../../../../../components/loading';
import AddFee from './AddFee/AddFee';
import { getFeeList, addFee, deleteFee, editFee,clearAction } from '../../../../../../general_redux/rates/actions';
import Table from '../../../../../../components/Table';

function Fees() {
  const dispatch = useDispatch();
  const [addFeeModal, setAddFeeModal] = useState(false);
  const [edited, setEdited] = useState(false);

  const cols = [
    { lable: 'Name', key: 'name' },
    { lable: 'Type', key: 'feeType' },
    { lable: 'Amount', key: 'amount' },
    { lable: 'Modality', key: 'modality' },
    { lable: 'Actions', key: '' },
  ];

  const properties = useSelector(({ rentals }) => rentals && rentals.rentals);
  const feesList = useSelector(({ rates }) => rates && rates.feesList);
  const actionForGetFeeList = useSelector(({ rates }) => rates && rates.actionForGetFeeList);
  const actionForEditFee=useSelector(({rates})=> rates && rates.actionForEditFee);
  const actionForAddFee = useSelector(({rates})=>rates && rates.actionForAddFee);
  const actionForDeleteFee=useSelector(({rates})=>rates && rates.actionForDeleteFee);
  const [feeCategory,setFeeCategory]=useState([]);

  useEffect(() => {
    dispatch(getFeeList());
  }, []);

  useEffect(()=>{
    if(actionForGetFeeList.success || actionForEditFee.success || actionForAddFee.success || actionForDeleteFee.success){
      const tmp=[];
      properties.forEach((property)=>{
        const ls = feesList.filter((fee) => fee.rentalId === property.id);
        tmp[`${property.id}`]=ls;
      })
      setFeeCategory(tmp);
      dispatch(clearAction());
    }
  },[actionForGetFeeList,actionForEditFee,actionForAddFee,actionForDeleteFee])

  const closeModal = (data) => {
    const payload = {
      id: data.id,
      name: data.name,
      feeType: data.feeType,
      amount: data.amount,
      modality: data.modality,
    };
    if (edited) {
      dispatch(editFee(payload));
    } else {
      dispatch(addFee(data));
    }
    setEdited(null);
    setAddFeeModal(false);
  };
  const deleteRow = (id) => {
    dispatch(deleteFee(id));
  };

  const editRow = (val) => {
    setAddFeeModal(true);
    setEdited(val);
  };
  return (
    <div>
      <Loading loadingStatus={actionForGetFeeList.loading} />
      <AddFee
        show={addFeeModal}
        onHide={() => {
          setAddFeeModal(false);
          setEdited(null);
        }}
        onEdit={(data) => closeModal(data)}
        viewForEdit={edited}
        properties={properties}
      />
      <div className="py-3">
        <button className={styles.ratelistBtn} onClick={() => setAddFeeModal(true)}>
          Add Fee
        </button>
      </div>

      <div className="col-lg-10 col-xl-8 px-0 mb-3">
        {properties &&
          properties.map((property, index) => (
            <div key={index} className="mb-4">
              <div className={styles.taxHeader}>{property.name}</div>
              <Table
                rows={(feeCategory && feeCategory[property.id]) ? feeCategory[property.id] :[]}
                cols={cols}
                onEdit={editRow}
                onDelete={(data) => deleteRow(data.id)}
                startKey={cols[0].key}
              />
            </div>
          ))}
      </div>
    </div>
  );
}

export default Fees;
