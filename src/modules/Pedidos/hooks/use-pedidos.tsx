import { useEffect, useState } from "react";
import { GuiaDeRemessaService } from "../../GuiaDeRemessa/service/guia-de-remessa-service";
import { GuiaDeRemessa } from "../../GuiaDeRemessa/entity/guia-de-remessa";

export const usePedidos = () => {
  const [pedidos, setPedidos] = useState<GuiaDeRemessa[]>([]);

  useEffect(() => {
    const pedidosService = new GuiaDeRemessaService();
    const fetchData = async () => {
      try {
        const pedidosGet = await pedidosService.getAll();
        setPedidos(pedidosGet);
        console.log("pedidos: ", pedidos);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

    return { pedidos };
};
