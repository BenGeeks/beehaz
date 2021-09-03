import React, {useEffect} from 'react';
import styles from './pricing.module.css';
import {useDispatch} from 'react-redux';
import Header from '../../Header/Header';
import Main from './components/Main';
import GreyArea from './components/GreyArea';
import FAQ from './components/FAQ';
import Footer from '../../Footer/Footer';
import {onLoad} from "../../../general_redux/actions";

function Home() {
    const dispatch=useDispatch();
    useEffect(() => {
        dispatch(onLoad());
        window.scrollTo(0, 0);
    }, []);
  return (
    <>
      <Header />
      <div className={styles.mainContainer}>
        <Main />
        <GreyArea />
        <FAQ />
        <Footer />
      </div>
    </>
  );
}

export default Home;
