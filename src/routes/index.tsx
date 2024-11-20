import { Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar";
import GuiaDeRemessa from "../pages/GuiaDeRemessa/component";
import NovoProduto from "../pages/Produto/component/novo-produto";
import Produtos from "../pages/Produto/component/produtos";

export default function RoutesApp() {
    return (
        <Routes>
            <Route path="/" element={<Navbar tituloDaPagina="Teste">Teste</Navbar>} />
            <Route path="/guia-de-remessa" element={<Navbar tituloDaPagina="Guia de Remessa"><GuiaDeRemessa /></Navbar>} />
            <Route path="produtos" element={<Navbar tituloDaPagina="Produtos"><Produtos /></Navbar>} />
            <Route path="/novo-produto" element={<Navbar tituloDaPagina="Produto"><NovoProduto /></Navbar>} />
        </Routes>
    );
}