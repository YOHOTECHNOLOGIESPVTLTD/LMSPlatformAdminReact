// MUI Imports
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography'; // For loading text
import Logo from "../../assets/images/logo.png";

const FallbackSpinner = ({ sx, show }) => {
  if (!show) return null;

  return (
    <Box
      sx={{
        position: 'fixed',           
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background
        backdropFilter: 'blur(8px)',  // Blur effect on the background
        zIndex: 9999,                
        pointerEvents: 'none',        
        ...sx                        
      }}
    >
      <Box 
        sx={{ 
          pointerEvents: 'auto', 
          display: "flex", 
          flexDirection: "column", 
          alignItems: "center",
          textAlign: "center", // Center align the text
        }}
      > 
        {/* Logo */}
        <img src={Logo} alt='kiaq' width={224} height={56} />
        
        {/* Spinner */}
        <CircularProgress disableShrink sx={{ mt: 6 }} />
        
        {/* Loading Text */}
        <Typography variant="h6" sx={{ mt: 2, color: '#000', fontWeight: 500, fontSize: "20px" }}>
          Loading, please wait...
        </Typography>
      </Box>
    </Box>
  );
};

export default FallbackSpinner;
