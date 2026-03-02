import { Layout, Row, Col } from 'antd';
import { getParticipantesFin2025 } from '../api/participantesApi';
import React, { useState, useEffect } from 'react';
import { Table, Spin, Alert, Space, Button, message, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";

const { Content } = Layout;

function Carreras() {
  const navigate = useNavigate();
  const [participantes, setParticipantes] = useState([]);
  //const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const handleEdit = (record) => {
    console.log("Editar:", record.id);
    navigate(`/usuarios/editar/${record.id}`);
    // Aquí puedes abrir un modal o navegar
  };

  const handleDelete = (record) => {
    console.log("Eliminar:", record.id);
    message.success("Registro eliminado");
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getParticipantesFin2025();
        if (data.success) {
          setParticipantes(data.data);
          //setTotal(data.total);
        } else {
          setError(data.message || 'Error desconocido');
        }
      } catch (err) {
        setError(err.message || 'Fallo al conectar con el servidor');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Spin tip="Cargando participantes..." size="large" />;
  if (error) return <Alert message="Error" description={error} type="error" showIcon />;

  const columns = [
    { title: 'Nombre', dataIndex: 'nombre', key: 'nombre' },
    { title: 'Nacimiento', dataIndex: 'nacimiento', key: 'nacimiento' },
    { title: 'Edad', dataIndex: 'edad', key: 'edad' },
    { title: 'Categoria', dataIndex: 'categoria', key: 'categoria' },
    { title: 'Sexo', dataIndex: 'sexo', key: 'sexo' },
    { title: 'Nùmero', dataIndex: 'numero', key: 'numero' },
    { title: 'Correo', dataIndex: 'email', key: 'email' },
    { title: 'Pagado', dataIndex: 'pago', key: 'pago' },
    { title: 'Tèlefono', dataIndex: 'telefono', key: 'telefono' },
    {
      title: 'Acciones',
      key: 'acciones',
      render: (_, record) => (
      <Space>
        <Button
          type="primary"
          icon={<EditOutlined />}
          onClick={() => handleEdit(record)}
        >
          Editar
        </Button>

        <Popconfirm
          title="¿Seguro que deseas eliminar?"
          onConfirm={() => handleDelete(record)}
          okText="Sí"
          cancelText="No"
        >
          <Button
            danger
            icon={<DeleteOutlined />}
          >
            Eliminar
          </Button>
        </Popconfirm>
      </Space>
    ),
  },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ padding: '24px', background: '#f0f2f5' }}>
        <h1>Listado de Participantes Carrera Fin de Año 2025 </h1>
        <Row>
          <Col span={24}>
            <Table dataSource={participantes} columns={columns} rowKey="id" scroll={{ x: true }}  />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}

export default Carreras;