// src/components/ModalAdjustPrice.jsx
import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Formik, Field, Form as FForm, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const schema = Yup.object().shape({
  percentual_reajuste: Yup.number()
    .min(0, 'Deve ser no mínimo 0')
    .required('Obrigatório'),
});

export default function ModalAdjustPrice({ show, onHide, onSubmit }) {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Reajustar Preços</Modal.Title>
      </Modal.Header>

      <Formik
        initialValues={{ percentual_reajuste: '' }}
        validationSchema={schema}
        onSubmit={(values, { setSubmitting }) => {
          onSubmit(values.percentual_reajuste);
          setSubmitting(false);
          onHide();
        }}
      >
        {({ isSubmitting }) => (
          <FForm>
            <Modal.Body>
              <Form.Group>
                <Form.Label>Percentual de Reajuste (%)</Form.Label>
                <Field
                  name="percentual_reajuste"
                  type="number"
                  step="0.01"
                  className="form-control"
                />
                <ErrorMessage
                  name="percentual_reajuste"
                  component="div"
                  className="text-danger mt-1"
                />
              </Form.Group>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={onHide}>
                Cancelar
              </Button>
              <Button type="submit" variant="primary" disabled={isSubmitting}>
                Reajustar
              </Button>
            </Modal.Footer>
          </FForm>
        )}
      </Formik>
    </Modal>
  );
}
