import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

export default function FilterBar({ fields, values, onChange, onSubmit, onClear }) {
  return (
    <Form onSubmit={onSubmit} className="mb-3">
      <Row>
        {fields.map(f => (
          <Col key={f.name} md={3} className="mb-2">
            <Form.Control
              placeholder={f.placeholder}
              value={values[f.name] || ''}
              onChange={e => onChange(f.name, e.target.value)}
            />
          </Col>
        ))}
        <Col md={3} className="mb-2">
          <Button type="submit" className="me-2">Filtrar</Button>
          <Button variant="secondary" onClick={onClear}>Limpar</Button>
        </Col>
      </Row>
    </Form>
  );
}
