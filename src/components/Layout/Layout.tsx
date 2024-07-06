import { Box } from "@mui/material";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box className="flex h-[100vh] w-[100vw] items-center justify-center">
      <Box className="rounded-xl bg-gradient-to-r from-purple-200 to-purple-300 p-8 shadow-lg">
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
