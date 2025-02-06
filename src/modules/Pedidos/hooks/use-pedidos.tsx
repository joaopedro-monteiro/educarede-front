import { useContext, useEffect, useState } from "react";
import { GuiaDeRemessaService } from "../../GuiaDeRemessa/service/guia-de-remessa-service";
import { GuiaDeRemessa } from "../../GuiaDeRemessa/entity/guia-de-remessa";
import { AuthContext } from "../../../infrastructure/context/auth";

export const usePedidos = () => {
  const [pedidos, setPedidos] = useState<GuiaDeRemessa[]>([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const pedidosService = new GuiaDeRemessaService();
    const fetchData = async () => {
      try {
        const pedidosGet = await pedidosService.getAll(user.role!, user.id!);
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
