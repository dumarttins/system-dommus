import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Formik, Field, Form as FForm, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const schema = Yup.object().shape({
  quantidade_blocos: Yup.number().min(1).required(),
  unidades_por_bloco: Yup.number().min(1).required(),
  preco_venda: Yup.number().min(0).required(),
});

export default function ModalBatchUnits({ show, onHide, onSubmit }) {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Criar Unidades em Lote</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={{ quantidade_blocos: 1, unidades_por_bloco: 1, preco_venda: '' }}
        validationSchema={schema}
        onSubmit={(values, { setSubmitting }) => {
          onSubmit(values);
          setSubmitting(false);
          onHide();
        }}
      >
        {({ isSubmitting }) => (
          <FForm>
            <Modal.Body>
              <Form.Group className="mb-3">
                <Form.Label>Quantidade de Blocos</Form.Label>
                <Field name="quantidade_blocos" type="number" className="form-control" />
                <ErrorMessage name="quantidade_blocos" component="div" className="text-danger" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Unidades por Bloco</Form.Label>
                <Field name="unidades_por_bloco" type="number" className="form-control" />
                <ErrorMessage name="unidades_por_bloco" component="div" className="text-danger" />
              </Form.Group>
              <Form.Group>
                <Form.Label>Preço de Venda</Form.Label>
                <Field name="preco_venda" type="number" className="form-control" />
                <ErrorMessage name="preco_venda" component="div" className="text-danger" />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={onHide}>Cancelar</Button>
              <Button type="submit" disabled={isSubmitting}>Criar</Button>
            </Modal.Footer>
          </FForm>
        )}
      </Formik>
    </Modal>
  );
}
