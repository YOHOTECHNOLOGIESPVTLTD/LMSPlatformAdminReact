import React  ,{useEffect}from "react";
import { styled } from "@mui/system";
import { Card, CardMedia, CardContent, Typography, Button, Grid, Chip, Box } from "@mui/material";
import { useNavigate } from "react-router";
import Client from "api/index";
import { useState } from "react";
import { getImageUrl } from "themes/imageUtlis";


const StyledCard = styled(Card)(() => ({
    transition: "transform 0.4s ease, box-shadow 0.4s ease",
    borderRadius: "15px",
    border: "1px solid #E0E0E0",
    width: "100%",
    height: "100%",
    overflow: "hidden",
    position: "relative",
    "&:hover": {
        transform: "translateY(-10px)",
        boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.2)",
    },
}));

const CategoryChip = styled(Chip)(({ theme }) => ({
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
    fontWeight: "bold",
    fontSize: "12px",
    zIndex: 2,
}));

const Overlay = styled(Box)({
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0))",
    opacity: 0,
    transition: "opacity 0.3s ease",
    zIndex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "&:hover": {
        opacity: 1,
    },
});

const CourseView = ({institute}) => {
    const navigate = useNavigate();
    const [CourseList,setCourseList] = useState([])

    const handleViewDetails = (id) => {
        navigate(`/courseview/course-overview/${id}`);
    };

    useEffect(() => {
        getAllCourses()
    }, [])
    
  
     const getAllCourses = async() => {
       
        try {
            const response = await Client.institute.getCourseList({ institute_id: institute?.uuid})
            setCourseList(response?.data?.data)
            if (response.data) {
                console.log('ok');
                return         
            }
        } catch (error) {
            console.log(error);
            
        }

     }
        
    console.log(CourseList,"courseList")
    return (
        <Box sx={{ p: 4 }}>
            <Grid container spacing={3}>
                {CourseList.map((course) => (
                    <Grid item xs={12} sm={6} md={4} key={course.id}>
                        <StyledCard>
                            <Box sx={{ position: "relative" }}>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={ getImageUrl(course.image)}
                                    alt={course.course_name}
                                    sx={{
                                        borderRadius: "4px 4px 0 0",
                                    }}
                                />
                                <CategoryChip label="Featured" />
                                <Overlay>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            color: "#fff",
                                            fontWeight: "bold",
                                            textAlign: "center",
                                        }}
                                    >
                                        {course.course_name}
                                    </Typography>
                                </Overlay>
                            </Box>
                            <CardContent>
                                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                                    {course.course_name}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ fontSize: "14px", mb: 2 }}
                                >
                                    {course.description}
                                </Typography>
                                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                                    <Typography variant="caption" sx={{ ml: 1 }}>
                                        {course.coursemodules.length}+ Modules
                                    </Typography>
                                </Box>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                        Duration:
                                    </Typography>
                                    <Typography variant="body2">
                                        {course.duration}
                                    </Typography>
                                </Box>
                            </CardContent>
                            <Box sx={{ p: 2 }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    sx={{
                                        borderRadius: "8px",
                                        textTransform: "none",
                                        transition: "background 0.3s ease",
                                        "&:hover": {
                                            backgroundColor: "#004D61",
                                        },
                                    }}
                                    onClick={() => handleViewDetails(course.id)}
                                >
                                    View Details
                                </Button>
                            </Box>
                        </StyledCard>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default CourseView;
