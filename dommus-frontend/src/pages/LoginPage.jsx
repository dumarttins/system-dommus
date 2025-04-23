import React, { useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { AuthContext } from '../context/AuthContext';
import * as Yup from 'yup';
import { Container, Button, Form as BSForm, Alert } from 'react-bootstrap';

const schema = Yup.object().shape({
  email: Yup.string().email('E-mail inválido').required('Obrigatório'),
  password: Yup.string().required('Obrigatório'),
});

export default function LoginPage() {
  const { login } = useContext(AuthContext);

  return (
    <Container style={{ maxWidth: 400, marginTop: '5rem' }}>
      <h3 className="mb-4">Login</h3>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={schema}
        onSubmit={async (values, { setSubmitting, setStatus }) => {
          try {
            await login(values);
          } catch (err) {
            setStatus('Usuário ou senha inválidos');
          }
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, status }) => (
          <Form>
            {status && <Alert variant="danger">{status}</Alert>}
            <BSForm.Group className="mb-3">
              <BSForm.Label>E-mail</BSForm.Label>
              <Field
                name="email"
                type="email"
                className="form-control"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-danger"
              />
            </BSForm.Group>

            <BSForm.Group className="mb-3">
              <BSForm.Label>Senha</BSForm.Label>
              <Field
                name="password"
                type="password"
                className="form-control"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-danger"
              />
            </BSForm.Group>

            <Button
              type="submit"
              variant="primary"
              disabled={isSubmitting}
            >
              Entrar
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
}
