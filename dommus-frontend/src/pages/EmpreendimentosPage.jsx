// src/pages/EmpreendimentosPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { Container, Table, Button, Row, Col, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import FilterBar from '../components/FilterBar';
import AppPagination from '../components/Pagination';
import ModalBatchUnits from '../components/ModalBatchUnits';
import ModalAdjustPrice from '../components/ModalAdjustPrice';

export default function EmpreendimentosPage() {
  const [data, setData] = useState([]);
  const [meta, setMeta] = useState({ current_page: 1, last_page: 1 });
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({ codigo: '', nome: '', cidade: '' });
  const [showBatch, setShowBatch] = useState(false);
  const [showAdjust, setShowAdjust] = useState(false);
  const [selectedEmp, setSelectedEmp] = useState(null);

  const navigate = useNavigate();

  const loadEmpreendimentos = useCallback(async (page = 1) => {
    setLoading(true);
    const params = { ...filters, page };
    const res = await api.get('/empreendimentos', { params });
    setData(res.data.data);
    setMeta({
      current_page: res.data.current_page,
      last_page: res.data.last_page,
    });
    setLoading(false);
  }, [filters]);

  useEffect(() => {
    loadEmpreendimentos(1);
  }, [loadEmpreendimentos]);

  function handleFilterChange(name, value) {
    setFilters(f => ({ ...f, [name]: value }));
  }

  function handleFilterSubmit(e) {
    e.preventDefault();
    loadEmpreendimentos(1);
  }

  function handleClear() {
    setFilters({ codigo: '', nome: '', cidade: '' });
    loadEmpreendimentos(1);
  }

  function handlePageChange(page) {
    loadEmpreendimentos(page);
  }

  async function handleDelete(emp) {
    if (
      !window.confirm(
        `Excluir empreendimento "${emp.nome}"? (não pode ter unidades vendidas/reservadas)`
      )
    ) return;
    await api.delete(`/empreendimentos/${emp.id}`);
    loadEmpreendimentos(meta.current_page);
  }

  function openBatch(emp) {
    setSelectedEmp(emp);
    setShowBatch(true);
  }

  async function submitBatch(values) {
    await api.post(`/empreendimentos/${selectedEmp.id}/unidades-lote`, values);
    loadEmpreendimentos(meta.current_page);
  }

  function openAdjust(emp) {
    setSelectedEmp(emp);
    setShowAdjust(true);
  }

  async function submitAdjust(percentual) {
    await api.post(`/empreendimentos/${selectedEmp.id}/atualizar-precos`, {
      percentual_reajuste: percentual,
    });
    loadEmpreendimentos(meta.current_page);
  }

  return (
    <Container className="py-4">
      <Row className="mb-3">
        <Col><h4>Empreendimentos</h4></Col>
        <Col className="text-end">
          <Button as={Link} to="/empreendimentos/new">+ Novo</Button>
        </Col>
      </Row>

      <FilterBar
        fields={[
          { name: 'codigo', placeholder: 'Código' },
          { name: 'nome',   placeholder: 'Nome'   },
          { name: 'cidade', placeholder: 'Cidade' },
        ]}
        values={filters}
        onChange={handleFilterChange}
        onSubmit={handleFilterSubmit}
        onClear={handleClear}
      />

      {loading ? (
        <div className="text-center py-5"><Spinner animation="border" /></div>
      ) : (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Código</th>
                <th>Nome</th>
                <th>Cidade</th>
                <th>Previsão</th>
                <th>VGV Vendidas</th>
                <th>VGV Reservadas</th>
                <th>Disponíveis</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {data.map(emp => (
                <tr key={emp.id}>
                  <td>{emp.codigo}</td>
                  <td>{emp.nome}</td>
                  <td>{emp.cidade}</td>
                  <td>{new Date(emp.previsao_entrega).toLocaleDateString()}</td>
                  <td>{emp.vgv_vendidas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                  <td>{emp.vgv_reservadas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                  <td>{emp.estoque_disponivel}</td>
                  <td>
                    <Button size="sm" as={Link} to={`/empreendimentos/${emp.id}/edit`} className="me-1">✏️</Button>
                    <Button size="sm" variant="danger" onClick={() => handleDelete(emp)} className="me-1">🗑️</Button>
                    <Button size="sm" variant="secondary" onClick={() => navigate(`/empreendimentos/${emp.id}/unidades`)} className="me-1">
                      🏘️
                    </Button>
                    <Button size="sm" variant="info" onClick={() => openBatch(emp)} className="me-1">
                      📦 Lote
                    </Button>
                    <Button size="sm" variant="warning" onClick={() => openAdjust(emp)}>
                      💲 Reaj.
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <AppPagination meta={meta} onChange={handlePageChange} />
        </>
      )}

      <ModalBatchUnits
        show={showBatch}
        onHide={() => setShowBatch(false)}
        onSubmit={submitBatch}
      />

      <ModalAdjustPrice
        show={showAdjust}
        onHide={() => setShowAdjust(false)}
        onSubmit={submitAdjust}
      />
    </Container>
  );
}
