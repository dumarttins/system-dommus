import React, { useState, useEffect } from 'react';
import { Container, Button, Spinner } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import api from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';

const schemaUni = Yup.object().shape({
  codigo: Yup.string().required('Obrigatório'),
  bloco: Yup.string().required('Obrigatório'),
  preco_venda: Yup.number().min(0).required('Obrigatório'),
  status: Yup.string().oneOf(['DISPONIVEL','RESERVADA','VENDIDA']).required('Obrigatório'),
});

export default function UnidadeForm() {
  const { empreendimentoId, id } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState({
    codigo:'', bloco:'', preco_venda:'', status:'DISPONIVEL', empreendimento_id: empreendimentoId
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      api.get(`/unidades/${id}`).then(res => {
        setInitialValues(res.data);
        setLoading(false);
      });
    }
  }, [id]);

  const handleSubmit = async (values, { setSubmitting }) => {
    if (id) await api.put(`/unidades/${id}`, values);
    else    await api.post('/unidades', values);
    setSubmitting(false);
    navigate(`/empreendimentos/${empreendimentoId}/unidades`);
  };

  if (loading) return <div className="text-center py-5"><Spinner animation="border" /></div>;

  return (
    <Container className="py-4">
      <h4>{id ? 'Editar' : 'Nova'} Unidade</h4>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={schemaUni}
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
              <label className="form-label">Bloco</label>
              <Field name="bloco" className="form-control" />
              <ErrorMessage name="bloco" component="div" className="text-danger" />
            </div>
            <div className="mb-3">
              <label className="form-label">Preço de Venda</label>
              <Field name="preco_venda" type="number" className="form-control" />
              <ErrorMessage name="preco_venda" component="div" className="text-danger" />
            </div>
            <div className="mb-3">
              <label className="form-label">Status</label>
              <Field as="select" name="status" className="form-control">
                <option value="DISPONIVEL">Disponível</option>
                <option value="RESERVADA">Reservada</option>
                <option value="VENDIDA">Vendida</option>
              </Field>
              <ErrorMessage name="status" component="div" className="text-danger" />
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
