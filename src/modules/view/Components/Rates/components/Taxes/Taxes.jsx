import React, { useState } from 'react';
import styles from '../../rates.module.css';
import { useSelector, useDispatch } from 'react-redux';
import AddTax from './AddTax/AddTax';
import { addTax, deleteTax, editTax } from '../../../../../../general_redux/rates/actions';
import Table from '../../../../../../components/Table';

function Taxes() {
  const [addTaxModal, setAddTaxModal] = useState(false);
  const [edited, setEdited] = useState(false);
  const dispatch = useDispatch();

  const properties = useSelector(({ rentals }) => rentals && rentals.rentals);
  const taxList = useSelector(({ rates }) => rates && rates.taxList);

  const cols = [
    { lable: 'Name', key: 'tax_name' },
    { lable: 'Type', key: 'tax_type' },
    { lable: 'Amount', key: 'amount' },
    { lable: 'Modality', key: 'modality' },
    { lable: 'Actions', key: '' },
  ];

  const closeModal = (data) => {
    if (edited) {
      dispatch(editTax(data));
    } else {
      dispatch(addTax(data));
    }
    setEdited(null);
    setAddTaxModal(false);
  };
  const editRow = (val) => {
    setAddTaxModal(true);
    setEdited(val);
  };
  const deleteRow = (id) => {
    dispatch(deleteTax(id));
  };

  return (
    <>
      <AddTax
        show={addTaxModal}
        onHide={() => {
          setAddTaxModal(false);
          setEdited(null);
        }}
        onEdit={(data) => closeModal(data)}
        viewforedit={edited}
      />
      <div className="py-3">
        <button className={styles.ratelistBtn} onClick={() => setAddTaxModal(true)}>
          Add Tax
        </button>
      </div>

      <div className="col-lg-10 col-xl-8 px-0 mb-3">
        {properties &&
          properties.map((property, index) => (
            <div key={index} className="mb-4">
              <div className={styles.taxHeader}>{property.name}</div>
              <Table
                // rows={taxList.filter((fee) => fee.rentalSelection === property.name)}
                rows={taxList}
                cols={cols}
                onEdit={editRow}
                onDelete={(data) => deleteRow(data.id)}
                startKey={cols[0].key}
              />
            </div>
          ))}
      </div>
    </>
  );
}

export default Taxes;
