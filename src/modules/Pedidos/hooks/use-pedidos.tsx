import { useContext, useEffect, useMemo, useState } from "react";
import { GuiaDeRemessaService } from "../../GuiaDeRemessa/service/guia-de-remessa-service";
import { GuiaDeRemessa } from "../../GuiaDeRemessa/entity/guia-de-remessa";
import { AuthContext } from "../../../infrastructure/context/auth";

export const usePedidos = () => {
  const [pedidos, setPedidos] = useState<GuiaDeRemessa[]>([]);
  const { user } = useContext(AuthContext);

  var guiaDeRemessaService = useMemo(() => new GuiaDeRemessaService(), []);
  
  var refreshFornecedores = () => {
    guiaDeRemessaService.getAll(user!.role!, user!.id!).then((guiasDeRemessa) => {
      setPedidos(guiasDeRemessa);
    });
  }

  useEffect(() => refreshFornecedores(), []);

  useEffect(() => {
    const pedidosService = new GuiaDeRemessaService();
    const fetchData = async () => {
      try {
        const pedidosGet = await pedidosService.getAll(user?.role!, user?.id!);
        setPedidos(pedidosGet);
        console.log("pedidos: ", pedidos);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

    return { pedidos, refreshFornecedores };
};
