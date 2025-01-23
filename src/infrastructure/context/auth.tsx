import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserService } from "../../modules/Login/services/user-service";
import { User } from "../../modules/Login/commands/user-command";

interface AuthContextProps {
  children: React.ReactNode;
}

interface AuthContextType {
  signed: boolean;
  user: any;
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthProvider = ({ children }: AuthContextProps) => {
  const [user, setUser] = useState<any>(null);
  const [signed, setSigned] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    async function loadUser() {
      const userService = new UserService();

      userService
        .user()
        .then((res) => {
          console.log("AQUI ESTÁ DENTRO DO CONTEXT:", res);
          setUser(res);
          setSigned(true);
        })
        .catch(() => {
          setSigned(false);
        });
      console.log("aqui está o user do state", user);
    }

    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ signed: !!user, user }}>
      {children}
    </AuthContext.Provider>
  );
};
