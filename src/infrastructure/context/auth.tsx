import { createContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserService } from "../../modules/Login/services/user-service";
import { User } from "../../modules/Login/commands/user-command";
import { Login } from "../../modules/Login/commands/login-command";
import { LoginService } from "../../modules/Login/services/login-service";
import { toast } from "react-toastify";

interface AuthContextProps {
  children: React.ReactNode;
}

interface AuthContextType {
  signed: boolean;
  user: User | null;
  loading: boolean;
  login: (login: Login) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: AuthContextProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const loginService = useMemo(() => new LoginService(), []);
  const userService = useMemo(() => new UserService(), []);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await userService.user();
        setUser(userData);
      } catch (error) {
        console.error("Erro ao carregar usuário:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [userService]);

  async function login(loginData: Login) {
    try {
      await loginService.login(loginData);
      const userData = await userService.user();
      setUser(userData);
      toast.success("Login efetuado com sucesso!");
      navigate("/guia-de-remessa");
    } catch (error) {
      console.error("Erro ao efetuar login:", error);
      toast.error("Erro ao efetuar login!");
    }
  }

  function logout() {
    setUser(null);
    loginService.logout();
    navigate("/login");
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};