import React from 'react';
import phone from '../../../icons/phone.png';
import ContainerMain from '../Containers/ContainerMain';
import styles from '../home.module.css';

function Main3(props) {
  return (
    <>
      <ContainerMain
        whiteText={'There is more in the horizon'}
        TextBeforeBreak={`We don't stop at beta! We want to make your rental `}
        textAfterBreak={`management simpler from any aspect! You got suggestions? Get in touch and
        help us build the software that suits your needs!`}
        message={`Get in touch!`}
        onMessageClick={props.setViewContactUs}
        featureList={true}
      />
      <div className={styles.containerWhite}>
        <div className={styles.mainContainer}>
          <div className={styles.main3Container}>
            <div className={`${styles.main3_textarea} order2`}>
              <h1 className="text-header">Be the first to know</h1>
              <p>
                We are launching the Beta Version soon! <br />
                Be the first to know and try it out!{' '}
              </p>
              <p>
                <strong>Join our mailing list!</strong>{' '}
              </p>
              <form>
                <div className={'pb-2'}>
                  <label htmlFor="email">Enter your email here: </label>
                  <input type="email" id="email" name="email" className={styles.email}/>
                </div>
                <p className="center">
                  <div className={`btn btn-success mb-5 ${styles.join}`} onClick={props.setMailModal}>
                    Join mailing list!
                  </div>
                </p>
              </form>
            </div>
            <div className={`${styles.main3Imagearea} order1`}>
              <img src={phone} className={`${styles.responsive} ${styles.phone}`} alt="phone" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main3;
