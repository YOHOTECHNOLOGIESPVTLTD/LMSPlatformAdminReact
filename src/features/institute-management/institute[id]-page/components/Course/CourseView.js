import React  ,{useEffect}from "react";
import { styled } from "@mui/system";
import { Card, CardMedia, CardContent, Typography, Button, Grid, Avatar, Chip, AvatarGroup, Box } from "@mui/material";
import { useNavigate } from "react-router";
import axios from "axios";

const courses = [
    {
        id: 1,
        title: "Java Full Stack",
        description: "By Rajalakshmi Institute",
        learners: 120,
        startDate: "09 Apr 24",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeJSO0DAPNNCxRRFyXKJCQ6ZD5xWRd4QXPBQ&s",
    },
    {
        id: 2,
        title: "SQL Courses",
        description: "By Rajalakshmi Institute",
        learners: 120,
        startDate: "09 Apr 24",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR98GMV56tQOuDTws4MfY5VJTpO_lpzgnyC8w&s",
    },
    {
        id: 3,
        title: "Digital Marketing",
        description: "By Rajalakshmi Institute",
        learners: 120,
        startDate: "09 Apr 24",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6OixYwhbf2wLBn-m-EyKZQcPT2GyruoRScg&s",
    },
];

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

const CourseView = () => {
    const navigate = useNavigate();

    const handleViewDetails = (id) => {
        navigate(`/courseview/course-overview/${id}`);
    };

    useEffect(() => {
        getAllCourses()
    }, [])
    
  
     const getAllCourses = async() => {
       
        try {
            const response = await axios.get(`${process.env.REACT_APP_PUBLIC_API_URL}/api/institutes/01d78342-5ebd-4c6e-9714-17a73467d36b/courses`,{
               
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Token ${localStorage.getItem('token')}`
                }
            })
            if (response.data) {
                console.log('ok');
                return         
            }
        } catch (error) {
            console.log(error);
            
        }

     }
        

    return (
        <Box sx={{ p: 4 }}>
            <Grid container spacing={3}>
                {courses.map((course) => (
                    <Grid item xs={12} sm={6} md={4} key={course.id}>
                        <StyledCard>
                            <Box sx={{ position: "relative" }}>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={course.image}
                                    alt={course.title}
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
                                        {course.title}
                                    </Typography>
                                </Overlay>
                            </Box>
                            <CardContent>
                                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                                    {course.title}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ fontSize: "14px", mb: 2 }}
                                >
                                    {course.description}
                                </Typography>
                                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                                    <AvatarGroup max={4}>
                                        <Avatar
                                            alt="Learner 1"
                                            src="/static/images/avatar/1.jpg"
                                            sx={{ width: 28, height: 28 }}
                                        />
                                        <Avatar
                                            alt="Learner 2"
                                            src="/static/images/avatar/2.jpg"
                                            sx={{ width: 28, height: 28 }}
                                        />
                                    </AvatarGroup>
                                    <Typography variant="caption" sx={{ ml: 1 }}>
                                        {course.learners}+ Learners
                                    </Typography>
                                </Box>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                        Start Date:
                                    </Typography>
                                    <Typography variant="body2">
                                        {course.startDate}
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
