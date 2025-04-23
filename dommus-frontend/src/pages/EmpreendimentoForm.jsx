import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Container, Button, Spinner } from 'react-bootstrap';
import api from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';

const schemaEmp = Yup.object().shape({
  codigo: Yup.string().required('Obrigatório'),
  nome: Yup.string().required('Obrigatório'),
  cidade: Yup.string().required('Obrigatório'),
  previsao_entrega: Yup.date().required('Obrigatório'),
});

export default function EmpreendimentoForm() {
  const [initialValues, setInitialValues] = useState({
    codigo: '', nome: '', cidade: '', previsao_entrega: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setLoading(true);
      api.get(`/empreendimentos/${id}`).then(res => {
        setInitialValues(res.data);
        setLoading(false);
      });
    }
  }, [id]);

  const handleSubmit = async (values, { setSubmitting }) => {
    if (id) await api.put(`/empreendimentos/${id}`, values);
    else    await api.post('/empreendimentos', values);
    setSubmitting(false);
    navigate('/empreendimentos');
  };

  if (loading) return <div className="text-center py-5"><Spinner animation="border" /></div>;

  return (
    <Container className="py-4">
      <h4>{id ? 'Editar' : 'Novo'} Empreendimento</h4>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={schemaEmp}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="mb-3">
              <label className="form-label">Código</label>
              <Field name="codigo" className="form-control" />
              <ErrorMessage name="codigo" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
              <label className="form-label">Nome</label>
              <Field name="nome" className="form-control" />
              <ErrorMessage name="nome" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
              <label className="form-label">Cidade</label>
              <Field name="cidade" className="form-control" />
              <ErrorMessage name="cidade" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
              <label className="form-label">Previsão de Entrega</label>
              <Field name="previsao_entrega" type="date" className="form-control" />
              <ErrorMessage name="previsao_entrega" component="div" className="text-danger" />
            </div>

            <Button type="submit" variant="primary" disabled={isSubmitting}>
              {id ? 'Atualizar' : 'Criar'}
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
}