import React, { useEffect, useState } from "react";
import { Box, Button, Image, Text } from "@chakra-ui/react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "./../../assets/images/Logo.png";
import { navItems } from "../../data/NavigationData";

import { IconButton } from "@chakra-ui/react";
import { FiLogOut } from "react-icons/fi";

const Header = ({ role }) => {
  const items = navItems[role] || [];
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("role");
    localStorage.removeItem("name");

    navigate("/login");
  };

  

  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      position="sticky"
      zIndex={1}
      top={1}
      alignItems={"center"}
      mx={{ base: 4, lg: 12 }}
      p={3}
      mt={8}
      border="1px solid #e0e0e0"
      boxShadow="lg"
      borderRadius="xl"
      bg="white"
    >
      <Box display="flex" alignItems={"center"} gap={2}>
        <Image
          src={logo}
          w={{ base: "32px", lg: "auto" }}
          h={{ base: "32px", lg: "auto" }}
        />
        <Text fontSize={{ base: "md", lg: "24px" }}>
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
        <IconButton
          icon={<FiLogOut />}
          bg="#0D64C1"
          _hover={{ bg: "#0D64C8" }}
          onClick={logout}
          color="white"
          aria-label="Logout"
        />
      </Box>
    </Box>
  );
};

export default Header;
