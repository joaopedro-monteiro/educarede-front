import { createContext, useEffect, useState } from "react";
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
  user: User;
  login: (login:Login) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthProvider = ({ children }: AuthContextProps) => {
  const [user, setUser] = useState<User>({} as User);
  const [signed, setSigned] = useState<boolean>(false);

  const navigate = useNavigate();  

  async function login(login: Login) {
    const loginService = new LoginService();
    const userService = new UserService();

    const response = await loginService
      .login(login)
      .then(() => {
        toast.success("Login efetuado com sucesso!");
        setSigned(true);
        userService.user().then((res) => {
          console.log(res);
          setUser(res);
          setSigned(true);
        });
        navigate("/guia-de-remessa");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Erro ao efetuar login!");
        setSigned(false);
      });
  }

  function limparCookie() {
    const cookies = document.cookie.split("; ");
    console.log("Cookies: " + cookies);
    cookies.forEach((cookie) => {
      const cookieName = cookie.split("=")[0];
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    });
    console.log("Signed: " + signed + "|" + " User: " + user);
  }

  function logout() {
    const loginService = new LoginService();

    setSigned(false);
    setUser({});
    loginService.logout();
    limparCookie();
  }

  return (
    <AuthContext.Provider value={{ signed, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
