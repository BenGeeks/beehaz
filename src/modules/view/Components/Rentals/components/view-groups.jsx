import React, { useEffect, useState } from 'react';
import Table from '../../../../../components/Table';
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { loadGroup, deleteGroup } from '../../../../../general_redux/rentals/actions';
import Loading from '../../../../../components/loading';
import ConfirmMessage from '../../../../../components/Confirmation';

const ViewGroups = (props) => {
  const groups = useSelector(({ rentals }) => rentals && rentals.groups).filter((row) => row.groupName !== 'Default');
  const loading = useSelector(({ rentals }) => rentals && rentals.actionForGroup);
  const [deleteData, setDeleteData] = useState(null);
  const [confirmDel, setConfirmDel] = useState(false);
  const dispatch = useDispatch();
  const cols = [
    { lable: 'Group name', key: 'groupName' },
    { lable: 'Colour', key: 'color' },
    { lable: 'Actions', key: '' },
  ];
  useEffect(() => {
    dispatch(loadGroup());
  }, [dispatch]);

  const deleteGroupData = (data) => {
    setDeleteData(data.id);
    setConfirmDel(true);
  };

  const ConfirmedDeleteGroup = () => {
    if (deleteData) {
      dispatch(deleteGroup(deleteData));
      setDeleteData(null);
    }
  };

  return (
    <div>
      <Loading loadingStatus={loading.loading} />
      <ConfirmMessage
        show={confirmDel}
        onHide={() => {
          setConfirmDel(false);
        }}
        confirmHeader={`Delete Group`}
        confirmBody={`Are you sure you want to delete this group?`}
        onConfirmAct={() => {
          ConfirmedDeleteGroup();
          setConfirmDel(false);
        }}
      />
      <Container fluid>
        <Row className="justify-content-left">
          <Col xs={12} md={8} lg={8} xl={6} className={`pt-3`}>
            <Table
              cols={cols}
              rows={groups}
              onEdit={props.editGroup}
              onDelete={deleteGroupData}
              startKey={cols[0].key}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default ViewGroups;
