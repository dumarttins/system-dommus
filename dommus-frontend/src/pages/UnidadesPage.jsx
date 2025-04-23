import React, { useState, useEffect, useCallback } from 'react';
import { Container, Table, Button, Spinner, Row, Col } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import FilterBar from '../components/FilterBar';
import AppPagination from '../components/Pagination';
import api from '../services/api';

export default function UnidadesPage() {
  const { empreendimentoId } = useParams();
  const [data, setData] = useState([]);
  const [meta, setMeta] = useState({ current_page:1, last_page:1 });
  const [filters, setFilters] = useState({ codigo:'', preco_min:'', preco_max:'', status:'', bloco:'' });
  const [loading, setLoading] = useState(false);

  const load = useCallback(async (page=1) => {
    setLoading(true);
    const params = { empreendimento_id: empreendimentoId, ...filters, page };
    const res = await api.get('/unidades', { params });
    setData(res.data.data);
    setMeta({ current_page: res.data.current_page, last_page: res.data.last_page });
    setLoading(false);
  }, [empreendimentoId, filters]);

  useEffect(() => { load(1); }, [load]);

  const handleFilterChange = (name, value) => setFilters(f => ({ ...f, [name]: value }));
  const handleFilterSubmit = e => { e.preventDefault(); load(1); };
  const handleClear        = () => { setFilters({ codigo:'', preco_min:'', preco_max:'', status:'', bloco:'' }); load(1); };
  const handlePageChange   = page => load(page);

  const handleDelete = async uni => {
    if (!window.confirm(`Excluir unidade ${uni.codigo}?`)) return;
    await api.delete(`/unidades/${uni.id}`);
    load(meta.current_page);
  };

  return (
    <Container className="py-4">
      <Row className="mb-3">
        <Col><h4>Unidades - Empreendimento {empreendimentoId}</h4></Col>
        <Col className="text-end">
          <Button as={Link} to={`/empreendimentos/${empreendimentoId}/unidades/new`}>+ Nova</Button>
        </Col>
      </Row>

      <FilterBar
        fields={[
          { name:'codigo', placeholder:'Código' },
          { name:'preco_min', placeholder:'Preço Mín.' },
          { name:'preco_max', placeholder:'Preço Máx.' },
          { name:'status',   placeholder:'Status'   },
          { name:'bloco',    placeholder:'Bloco'    },
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
                <th>Bloco</th>
                <th>Preço</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {data.map(uni => (
                <tr key={uni.id}>
                  <td>{uni.codigo}</td>
                  <td>{uni.bloco}</td>
                  <td>{Number(uni.preco_venda).toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}</td>
                  <td>{uni.status}</td>
                  <td>
                    <Button size="sm" as={Link} to={`/empreendimentos/${empreendimentoId}/unidades/${uni.id}/edit`} className="me-1">✏️</Button>
                    <Button size="sm" variant="danger" onClick={()=>handleDelete(uni)}>🗑️</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <AppPagination meta={meta} onChange={handlePageChange} />
        </>
      )}
    </Container>
  );
}
