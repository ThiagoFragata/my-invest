/* eslint-disable no-undef */

import "antd/dist/antd.css";

import { Link } from 'react-router-dom';

import { Layout, Menu, Form, Button, DatePicker, Input, InputNumber, message, Select } from 'antd';

import InvestimentoService from "../../services/InvestimentoService";
import CategoriaService from "../../services/CategoriaService";

import { useEffect, useState } from "react";
import { Option } from "antd/lib/mentions";

const { Header, Content, Footer } = Layout;

export default function CadastrarInvestimento() {

    const [categorias, setCategorias] = useState([]);
    const [categoria, setCategoria] = useState([]);

    useEffect(() => {
        refreshCategorias();
        return () => {

        }
    }, [])

    async function refreshCategorias() {
        CategoriaService.retrieveAllCategorias()
            .then(
                response => {
                    setCategorias(response.data)
                }
            )
    }

    function handleChangeCategoria(value) {
        setCategoria(value);
    }

    const layout = {
        labelCol: {
            span: 4,
        },
        wrapperCol: {
            span: 3,
        },
    };

    const tailLayout = {
        wrapperCol: {
            offset: 4,
        },
    };

    const onFinish = (values) => {
        InvestimentoService.saveInvestimento(values);
        message.success("Investimento salvo com sucesso");
    }

    const onFinishFailed = (erroInfo) => {
        message.danger("Investimento salvo com sucesso");
        console.log("Failed: ", erroInfo);
    }





    return (
        <div className="container">
            <Layout className="layout">
                <Header>

                    <div className="logo" />

                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
                        <Menu.Item key="1">
                            <Link to="/cadastrar-investimento">
                                Cadastrar Investimento
                            </Link>
                        </Menu.Item>

                        <Menu.Item key="2">
                            <Link to="/listar-investimentos">
                                Listar investimentos
                            </Link>
                        </Menu.Item>
                    </Menu>
                </Header>

                <Content style={{ padding: "0 50px" }}>
                    <div className="site-layout-content">
                        <h2>CADASTRAR INVESTIMENTO</h2>

                        <Form {...layout} name="basic" initialValues={{ remember: true }} onFinish={onFinish}>
                            <Form.Item label="Código do ativo" name="codigoAtivo"
                                rules={[
                                    {
                                        required: true,
                                        message: "Insira o código do ativo!",
                                    },
                                ]}>

                                <Input />
                            </Form.Item>

                            <Form.Item label="Valor" name="valorCota"
                                rules={[
                                    {
                                        required: true,
                                        message: "Insira o valor!",
                                    }
                                ]}>
                                <Input />

                            </Form.Item>

                            <Form.Item label="Quantidades de cotas" name="quantidadeCotas"
                                rules={[
                                    {
                                        required: true,
                                        message: "Insira a quantidade de cotas!",
                                    }
                                ]}>
                                <InputNumber />

                            </Form.Item>

                            <Form.Item label="Data de compra" name="dataCompra"
                                rules={[
                                    {
                                        required: true,
                                        message: "Insira a data da compra!",
                                    }
                                ]}>
                                <DatePicker />

                            </Form.Item>

                            <Form.Item label="Categoria" name="categoria"
                                rules={[
                                    {
                                        required: false,
                                        message: "Insira a categoria!",
                                    }
                                ]}>
                                <Select onChange={handleChangeCategoria}>
                                    {categorias.map((item, index) => {
                                        return (
                                            <Option key={item.codigo} value={index}>
                                                {item.nome}
                                            </Option>
                                        )
                                    })}
                                </Select>

                            </Form.Item>

                            <Form.Item {...tailLayout}>
                                <Button type="primary" htmlType="submit">
                                    Salvar
                                </Button>
                            </Form.Item>
                        </Form>

                    </div>
                </Content>
                <Footer style={{ textAlign: "center" }}>My Invest &copy; 2021</Footer>
            </Layout>
        </div>
    );
}