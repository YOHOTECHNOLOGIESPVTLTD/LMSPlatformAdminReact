import { Button, Grid, Typography, Box, Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import CardBg from "../../../assets/images/dashboard/institute_card.svg";
import { getImageUrl } from "themes/imageUtlis";
import LocationOnIcon from "@mui/icons-material/LocationOn"; // Icon for address
import BusinessIcon from "@mui/icons-material/Business"; // Icon for branches
import { imagePlaceholder } from "lib/placeholders";

const backgroundColors = [
  "#4A24E3",
  "#E36924",
  "#E33A24",
  "linear-gradient(112deg, #FED4B4 0%, #3BB9A1 100%)",
  "linear-gradient(112deg, #E77879 0%, #FBDDB3 100%)",
  "linear-gradient(112deg, #BAE8FB 0%, #B2B1FD 100%)",
  "linear-gradient(112deg, #6E8B75 0%, #D0C9C1 100%)",
  "linear-gradient(112deg, #6E8B75 0%, #9CD1EB 0.01%, #1D739F 100%, #D0C9C1 100%)",
  "#D14D72",
  "#4DD1A1",
  "#D1654D",
  "#000",
  "#6FD14D",
  "linear-gradient(248deg, #597D86 0%, #599DA9 32.81%, #89CBB9 57.81%, #BBEDDD 100%)",
  "linear-gradient(248deg, #0C2546 0%, #1B396C 29.17%, #586EBA 56.55%, #A7D7E7 93.23%)",
  "linear-gradient(248deg, #6C25FB 0%, #407DF2 29.17%, #3ACDDE 56.55%, #F2DEBC 93.23%)",
  "linear-gradient(248deg, #2DFFF5 0%, #28E7FD 29.17%, #1BA0FC 63.02%, #0B2BFB 100%)",
  "linear-gradient(248deg, #B3E2FE 0%, #B0B6FD 29.17%, #9DA1FB 56.55%, #A671FC 93.23%)",
  "url(<path-to-image>) lightgray 50% / cover no-repeat",
  "url(<path-to-image>) lightgray 50% / cover no-repeat",
  "url(<path-to-image>) lightgray 50% / cover no-repeat",
  "url(<path-to-image>) lightgray 50% / cover no-repeat",
  "url(<path-to-image>) lightgray 50% / cover no-repeat",
];

const InstituteCard = ({ institute, index }) => {
  const backgroundColor = backgroundColors[index] || "#ffffff"; 

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Box
        sx={{
          position: "relative",
          borderRadius: "16px",
          padding: "26px",
          minWidth: "300px",
          minHeight: "200px",
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          overflow: "hidden",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
          transition: "transform 0.3s ease, box-shadow 0.3s ease", // Smooth hover effect
          "&:hover": {
            transform: "translateY(-10px)", // Lift effect on hover
            boxShadow: "0 8px 30px rgba(0, 0, 0, 0.2)", // Increased shadow on hover
          },
        }}
      >
        {/* Background color */}
        <Box
          sx={{
            background: backgroundColor,
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1,
            opacity: 0.9, // Higher opacity for clarity
          }}
        />

        {/* Background image */}
        <Box
          sx={{
            backgroundImage: `url(${CardBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 2,
            opacity: 0.6, // Softer image overlay
          }}
        />

        <Box sx={{ position: "relative", zIndex: 3 }}>
          <Box>
            <Grid container spacing={2} alignItems="flex-start">
              <Grid item xs={4}>
                {/* Avatar or image */}
                <Box sx={{ width: "93px", height: "43px", borderRadius: "8px", overflow: "hidden",marginTop: "8px" }}>
                  {institute?.image ? (
                    <Avatar
                      src={getImageUrl(institute?.image)}
                      alt={institute?.institute_name}
                      sx={{ width: "100%", height: "100%", borderRadius: "0px" }}
                    />
                  ) : (
                    <Avatar src={imagePlaceholder} sx={{ width: "100%", height: "100%", borderRadius: "0px" }} />
                  )}
                </Box>
              </Grid>

              <Grid item xs={8} sx={{ display: "flex", gap: "10px", flexDirection: "column" }}>
                {/* Institute Name */}
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    fontSize: "20px",
                    wordWrap: "break-word",
                    color: "white",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    textShadow: "1px 1px 5px rgba(0,0,0,0.3)", // Slight text shadow for readability
                  }}
                >
                  {institute?.institute_name}
                </Typography>

                {/* Address */}
                <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <LocationOnIcon fontSize="small" sx={{ color: "rgba(255, 255, 255, 0.7)" }} />
                  <Typography
                    variant="body2"
                    sx={{ color: "rgba(255, 255, 255, 0.7)", textOverflow: "ellipsis",overflow: "hidden",textWrap: "nowrap" }}
                  >
                    {institute?.contact_info?.address?.address1 ? institute?.contact_info?.address?.address1 :  '123 Main St, City'} 
                  </Typography>
                </Box>

                {/* Branches */}
                <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <BusinessIcon fontSize="small" sx={{ color: "rgba(255, 255, 255, 0.7)" }} />
                  <Typography
                    variant="body2"
                    sx={{ color: "rgba(255, 255, 255, 0.7)" }}
                  >
                    Branches: 5
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>

          {/* Plan and Button */}
          <Box
            sx={{
              mt: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              position: "relative",
              zIndex: 3,
            }}
          >
            {/* Subscription Plan */}
            <Typography
              variant="subtitle1"
              sx={{ color: "rgba(255, 255, 255, 0.85)", fontWeight: "bold" }}
            >
              {institute?.subscription?.identity} Plan
            </Typography>

            {/* View Button */}
            <Button
              component={Link}
              to={`/institute-management/institutes/${institute?.uuid}`}
              state={{ id: institute?.uuid }}
              sx={{
                mt: 1,
                padding: "6px 16px",
                display: "none",
                backgroundColor: "white",
                color: "#4A24E3", // Accent color for button
                fontWeight: "bold",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", // Soft shadow
                "&:hover": {
                  backgroundColor: "#f0f0f0",
                },
                transition: "background-color 0.3s ease",
              }}
            >
              View
            </Button>
          </Box>
        </Box>
      </Box>
    </Grid>
  );
};

export default InstituteCard;
