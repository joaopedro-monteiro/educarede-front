import { Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar";
import GuiaDeRemessa from "../pages/GuiaDeRemessa/component";
import ProdutoPage from "../pages/Produto/component";
import NovoProdutoPage from "../pages/Produto/component";

export default function RoutesApp() {
    return (
        <Routes>
            <Route path="/" element={<Navbar tituloDaPagina="Teste">Teste</Navbar>} />
            <Route path="/guia-de-remessa" element={<Navbar tituloDaPagina="Guia de Remessa"><GuiaDeRemessa /></Navbar>} />
            <Route path="/novo-produto" element={<Navbar tituloDaPagina="Produto"><NovoProdutoPage /></Navbar>} />
        </Routes>
    );
}