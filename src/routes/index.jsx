import { Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar";
import GuiaDeRemessa from "../modules/GuiaDeRemessa/component";
import NovoProduto from "../modules/Produto/component/novo-produto";
import Produtos from "../modules/Produto/component/produtos";
import Fornecedores from "../modules/Fornecedor/components/fornecedores";
import UnidadesDeEnvio from "../modules/UnidadeDeEnvio/components/unidades-de-envio";
import Pedidos from "../modules/Pedidos/components/pedidos";
import GerenciarPedidosPage from "../modules/Pedidos/components/gerenciar-pedido";
import LoginPage from "../modules/Login/components";
import Private from "./private";
import Usuarios from "../modules/Usuarios/components/usuarios";

export default function RoutesApp() {
    return (
        <Routes>
            <Route path="/" element={<Private><Navbar tituloDaPagina="Guia de Remessa"><GuiaDeRemessa /></Navbar></Private>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/guia-de-remessa" element={<Private><Navbar tituloDaPagina="Guia de Remessa"><GuiaDeRemessa /></Navbar></Private>} />
            <Route path="produtos" element={<Private><Navbar tituloDaPagina="Produtos"><Produtos /></Navbar></Private>} />
            <Route path="/novo-produto" element={<Private><Navbar tituloDaPagina="Produto"><NovoProduto /></Navbar></Private>} />
            <Route path="/fornecedores" element={<Private><Navbar tituloDaPagina="Fornecedores"><Fornecedores /></Navbar></Private>} />
            <Route path="/unidades-de-envio" element={<Private><Navbar tituloDaPagina="Unidades de Envio"><UnidadesDeEnvio /></Navbar></Private>} />
            <Route path="pedidos" element={<Private><Navbar tituloDaPagina="Pedidos"><Pedidos /></Navbar></Private>} />
            <Route path="pedidos/gerenciar/:guiaDeRemessaId" element={<Private><Navbar tituloDaPagina="Gerenciar Pedido"><GerenciarPedidosPage /></Navbar></Private>} />            
            <Route path="usuarios" element={<Private><Navbar tituloDaPagina="Usuários"><Usuarios /></Navbar></Private>} />
        </Routes>
    );
}