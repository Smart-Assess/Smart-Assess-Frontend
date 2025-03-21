import React from "react";
import { Box, Button, Image, Text } from "@chakra-ui/react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "./../../assets/images/Logo.png";
import { navItems } from "../../data/NavigationData";

const Header = ({ role }) => {
  const items = navItems[role] || [];
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      position="sticky"
      top={8}
      zIndex={1}
      alignItems={"center"}
      mx={12}
      p={3}
      mt={8}
      border="1px solid #e0e0e0"
      boxShadow="lg"
      borderRadius="xl"
      bg="white"
    >
      <Box display="flex" alignItems={"center"} gap={4}>
        <Image src={logo} />
        <Text fontSize={"24px"}>
          <span style={{ color: "#0D64C1", fontWeight: "500" }}>Smart</span>{" "}
          <span style={{ color: "#B2BBC6" }}>Assess</span>
        </Text>
      </Box>
      <Box display="flex" alignItems="center" gap={8}>
        {items.map((item) => (
          <NavLink
            to={item.path}
            key={item.label}
            style={({ isActive }) => ({
              textDecoration: "none",
              color: "#0D64C1",
              fontSize: "18px",
              fontWeight: "500",
            })}
          >
            <Text>{item.label}</Text>
          </NavLink>
        ))}
      </Box>
      <Box>
        <Button
          bg="#0D64C1"
          _hover={{ bg: "#0D64C8" }}
          onClick={logout}
          color="white"
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
};

export default Header;
