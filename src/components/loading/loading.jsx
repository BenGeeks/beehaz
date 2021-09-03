import React, { Component } from 'react';
//import { Modal } from 'reactstrap';
import {Modal} from 'react-bootstrap';
import styles from './loading.module.css';
import Loader from "react-loader-spinner";

class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      large: false
    };
  }

  toggleLarge = () => {
    const { large } = this.state;
    this.setState({ large: !large });
  }

  render() {
    const { loadingStatus, className, zindex } = this.props;
    return (
      <>
        <Modal
          show={loadingStatus}
          centered
          size="lg"
          contentClassName={styles.modalContent}
        >
            <div className={styles.loader} >
              <Loader
                  type="Bars"
                  color="lightgrey"
                  height={100}
                  width={60}
                  style={{marginLeft:'23rem'}}
              />
            </div>
        </Modal>
      </>
    );
  }
}

export default Loading;
