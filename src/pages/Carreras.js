import { Layout, Row, Col } from 'antd';
import { getParticipantesFin2025, eliminarParticipante, enviarEmail  } from '../api/participantesApi';
import React, { useState, useEffect } from 'react';
import { Table, Spin, Alert, Space, Button, message, Popconfirm, Input  } from 'antd';
import { EditOutlined, DeleteOutlined, SearchOutlined, MailOutlined  } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";

const { Content } = Layout;

function Carreras() {
  const navigate = useNavigate();
  const [participantes, setParticipantes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState("");

  const handleEdit = (record) => {
    console.log("Editar:", record.id);
    navigate(`/usuarios/editar/${record.id}`);
  };

  const handleDelete = async (record) => {
    try {
      await eliminarParticipante(record.id);

      message.success("Registro eliminado correctamente");

      obtenerUsuarios(); // 👈 vuelve a cargar la tabla
    } catch (error) {
      message.error("Error al eliminar el registro");
      console.error(error);
    }
  };

  const sendEmail = async (record) => {
    try {
      await enviarEmail(record);

      message.success("Email correctamente");

      //obtenerUsuarios(); // 👈 vuelve a cargar la tabla
    } catch (error) {
      message.error("Error al enviar email");
      console.error(error);
    }
  };
  const obtenerUsuarios = async () => {
  try {
    setLoading(true);

    const data = await getParticipantesFin2025();

    if (data.success) {
      setParticipantes(data.data);
      // setTotal(data.total);
    } else {
      setError(data.message || "Error desconocido");
    }

  } catch (err) {
    setError(err.message || "Fallo al conectar con el servidor");
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    obtenerUsuarios();
    
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
        <Button
          type="success"
          icon={<MailOutlined />}
          onClick={() => sendEmail(record)}
        >
          Email
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
  const filteredData = participantes.filter((item) =>
    item.nombre?.toLowerCase().includes(searchText.toLowerCase()) ||
    item.email?.toLowerCase().includes(searchText.toLowerCase()) ||
    item.numero?.toString().includes(searchText) ||
    item.telefono?.toString().includes(searchText)
  );

  return (
      <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ padding: '24px', background: '#f0f2f5' }}>
      <h1>Listado de Participantes Carrera Fin de Año 2025</h1>

      <Row style={{ marginBottom: 16 }}>
        <Col span={4}>
          <Input
            prefix={<SearchOutlined />}
            placeholder="Buscar participante..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            allowClear
          />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Table
            dataSource={filteredData}
            columns={columns}
            rowKey="id"
            scroll={{ x: true }}
          />
        </Col>
      </Row>
    </Content>
  </Layout>
  );
}
export default Carreras;