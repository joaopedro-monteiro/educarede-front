import { ReactNode, useContext } from "react";
import { AuthContext } from "../infrastructure/context/auth";
import { Navigate } from "react-router-dom";
import { Flex, Spin } from "antd";

interface PrivateProps {
  children: ReactNode;
}

const Private = ({ children }: PrivateProps) => {
  const { signed, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div>
        <Flex align="center" gap="middle">
          <Spin size="large" />
        </Flex>
      </div>
    );
  }

  if (!signed) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default Private;
