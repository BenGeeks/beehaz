import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import ModalButton from '../../../../../../components/ModalButton';
import { Formik, Field } from 'formik';
import styles from '../../rentals.module.css';

function GroupForm(props) {
  const { schema, handleSubmit } = props;
  const [color, setColor] = useState('');
  const colorDrop = ['#a4bdfc', '#4287f5', '#7ae7bf', '#46d6db', '#53bf4b', '#ffc107', '#C8A2C8', '#dc3545'];

  return (
    <>
      <Formik
        validationSchema={schema}
        initialValues={
          props.initValue
            ? props.initValue
            : {
                groupName: '',
                color: '#439a86',
              }
        }
        onSubmit={handleSubmit}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({ errors, handleChange, handleSubmit, initialValues, values }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Row>
              <Form.Label className="col-sm-4 col-form-label">Group name:</Form.Label>
              <div className="col-md-6">
                <Form.Control
                  type="text"
                  name="groupName"
                  onChange={handleChange}
                  isInvalid={!!errors.groupName}
                  defaultValue={initialValues.groupName}
                  style={{ fontSize: 'inherit' }}
                />
                <Form.Control.Feedback type="invalid">{errors.groupName}</Form.Control.Feedback>
              </div>
            </Form.Row>
            <br />

            <Form.Row>
              <Form.Label className="col-sm-4 col-form-label">Color:</Form.Label>
              <div className="col-md-6">
                <div className={styles.containerColor}>
                  {colorDrop.map((item) => (
                    <div
                      className={`${styles.containerBox} ${color === item ? styles.active : ``}`}
                      style={{ background: `${item}` }}
                      onClick={() => {
                        setColor(item);
                        values.color = item;
                      }}
                      key={item}
                    />
                  ))}
                  <span className={styles.color_picker_text}>Color Picker: </span>
                  <Field
                    type={'color'}
                    name={'color'}
                    value={values.color}
                    onChange={handleChange}
                    onClick={() => setColor(null)}
                    className={styles.form_entry_color}
                    required
                  />
                </div>
              </div>
            </Form.Row>
            <br />
            <ModalButton btnText={'Save changes'} />
          </Form>
        )}
      </Formik>
    </>
  );
}

export default GroupForm;
