import { Box } from "@mui/material";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box className="flex h-[75vh] w-[75vw] flex-wrap items-center justify-center">
      {children}
    </Box>
  );
};

export default Layout;
