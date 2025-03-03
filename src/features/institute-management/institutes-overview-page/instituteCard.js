import { Button, Grid, Typography, Box, Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import CardBg from "../../../assets/images/dashboard/institute_card.svg";
import { getImageUrl } from "themes/imageUtlis";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BusinessIcon from "@mui/icons-material/Business";

const backgroundColors = [
  "#4A24E3",
  "#E36924",
  "#E33A24",
  "linear-gradient(112deg, #FED4B4 0%, #3BB9A1 100%)",
  "linear-gradient(112deg, #E77879 0%, #FBDDB3 100%)",
  "linear-gradient(112deg, #BAE8FB 0%, #B2B1FD 100%)",
  "linear-gradient(112deg, #6E8B75 0%, #D0C9C1 100%)",
  "#D14D72",
  "#4DD1A1",
];

const InstituteCard = ({ institute, index }) => {
  const backgroundColor = backgroundColors[index] || "#ffffff";

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Box
        sx={{
          position: "relative",
          borderRadius: "16px",
          padding: "24px",
          minWidth: "320px",
          minHeight: "20px",
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          overflow: "hidden",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            transform: "translateY(-8px)",
            boxShadow: "0 8px 30px rgba(0, 0, 0, 0.25)",
          },
        }}
      >
        <Box
          sx={{
            background: backgroundColor,
            position: "absolute",
            inset: 0,
            zIndex: 1,
            opacity: 0.85,
          }}
        />
        <Box
          sx={{
            backgroundImage: `url(${CardBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "absolute",
            inset: 0,
            zIndex: 2,
            opacity: 0.5,
          }}
        />

        <Box sx={{ position: "relative", zIndex: 3, width: "100%" }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={4}>
              {/* Institute Logo */}
              <Box
                sx={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "12px",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  padding: "8px",
                }}
              >
                <Avatar
                  src={getImageUrl(institute?.image)}
                  sx={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "8px",
                    objectFit: "cover",
                  }}
                />
              </Box>
            </Grid>

            <Grid item xs={8}>
              {/* Institute Name */}
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  fontSize: "18px",
                  wordWrap: "break-word",
                  color: "white",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                }}
              >
                {institute?.institute_name}
              </Typography>

              {/* Address */}
              <Box sx={{ display: "flex", alignItems: "center", gap: "6px", mt: 1 }}>
                <LocationOnIcon fontSize="small" sx={{ color: "rgba(255, 255, 255, 0.8)" }} />
                <Typography
                  variant="body2"
                  sx={{
                    color: "rgba(255, 255, 255, 0.8)",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    maxWidth: "200px",
                  }}
                >
                  {institute?.contact_info?.address?.address1 || "123 Main St, City"}
                </Typography>
              </Box>

              {/* Branches */}
              <Box sx={{ display: "flex", alignItems: "center", gap: "6px", mt: 1 }}>
                <BusinessIcon fontSize="small" sx={{ color: "rgba(255, 255, 255, 0.8)" }} />
                <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.8)" }}>
                  Branches: {institute?.branches || 5}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Footer */}
        <Box
          sx={{
            mt: 3,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            zIndex:100
          }}
        >
          {/* Subscription Plan */}
          <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "rgba(255, 255, 255, 0.85)" }}>
            {institute?.subscription?.identity} Plan
          </Typography>

          {/* View Button */}
          <Button
            component={Link}
            to={`/institute-management/institutes/${institute?.uuid}`}
            state={{ id: institute?.uuid }}
            sx={{
              padding: "8px 20px",
              backgroundColor: "white",
              color: "#4A24E3",
              fontWeight: "bold",
              borderRadius: "10px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
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
    </Grid>
  );
};

export default InstituteCard;
