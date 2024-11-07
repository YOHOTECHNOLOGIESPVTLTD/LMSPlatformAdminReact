import React, { useState, useEffect } from 'react';
import { Button, Chip, Grid, Typography, Avatar } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { Box } from '@mui/material';
import OnlineIcon from '@mui/icons-material/Wifi';
import PeopleIcon from '@mui/icons-material/People';
import CourseCard from 'features/institute-management/institute[id]-page/components/Course/CourseCard';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import TeacherView from 'features/institute-management/institute[id]-page/components/Course/TeacherView';
import StudentView from 'features/institute-management/institute[id]-page/components/Course/StudentView';

const CourseOverview = () => {
    // State for course and modules
    const [course, setCourse] = useState(null);
    const [modules, setModules] = useState([]);
    const [view, setView] = useState('courseOverview');
    
   

    useEffect(() => {
        setCourse({
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4n6X-Ww9lK5BneuQH7xpHJ760i91x87eHnA&s",
            title: "Java Full Professional Course",
            mode: "Online",
            enrolled: 3621,
            capacity: 4000,
            startDate: "2024-04-14",
            description: "Become a Java expert through our comprehensive course, mastering programming fundamentals and advanced concepts for real-world application.",
            instituteName: "Rajalakshmi Institute",
            instituteUrl: "https://rajalakshmi-institute.edu",
            modulesDescription: "Master Java programming through our comprehensive course, featuring 12 modules with 5-7 classes and tests each. From fundamental syntax to advanced topics like object-oriented programming, you'll gain hands-on experience and personalized feedback to excel in building web, mobile, or enterprise applications.",
        });

        setModules([
            {
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrZLsXFl2zGeUAc5tBdhiS7Nm8Yex0qvONUA&s',
                class_type: "online",
                category: { category_name: "Science" },
                course_name: "Advanced Physics and Quantum Mechanics",
                coursemodules: Array(5).fill({ name: "Module 1" }), // 5 dummy modules
                Test: "3 Mock Test",
                class: 'Module 1 - 30 classes',
                is_active: "true",
                uuid: "123-abc-456"
            },
            {
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBr7P8JEJtNZsln9yrOH55gZImXB6vfxG_Bw&s',
                class_type: "offline",
                category: { category_name: "Mathematics" },
                course_name: "Calculus and Linear Algebra",
                coursemodules: Array(3).fill({ name: "Module 1" }), // 3 dummy modules
                Test: "2 Mock Test",
                class: 'Module 1 - 20 classes',
                is_active: "true",
                uuid: "789-def-123"
            },
            {
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPlJOcE6korun5XqaKZIX9mlXJ5p2ZCxX96w&s',
                class_type: "hybrid",
                category: { category_name: "Computer Science" },
                course_name: "Data Structures and Algorithms",
                coursemodules: Array(4).fill({ name: "Module 1" }), // 4 dummy modules
                Test: "4 Mock Test",
                class: 'Module 1 - 25 classes',
                is_active: "true",
                uuid: "456-ghi-789"
            },
            {
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCroApG3FqMehV5CtgM2DtJgYQqAiC1vTFuQ&s',
                class_type: "online",
                category: { category_name: "Physics" },
                course_name: "Quantum Field Theory",
                coursemodules: Array(6).fill({ name: "Module 1" }), // 6 dummy modules
                Test: "5 Mock Test",
                class: 'Module 1 - 40 classes',
                is_active: "true",
                uuid: "012-jkl-345"
            },
            {
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwbP00O855W6aOK6K3zf-WDTdno9pwl4BiqA&s',
                class_type: "offline",
                category: { category_name: "Biology" },
                course_name: "Genetics and Evolutionary Biology",
                coursemodules: Array(2).fill({ name: "Module 1" }), // 2 dummy modules
                Test: "1 Mock Test",
                class: 'Module 1 - 15 classes',
                is_active: "true",
                uuid: "234-mno-567"
            }
        ]);
    }, []);

    if (!course) {
        return <Typography>Loading...</Typography>;
    }

    if (view === 'teacherView') {
        return <TeacherView onBack={() => setView('courseOverview')} />;
    }

    if (view === 'studentView') {
        return <StudentView onBack={() => setView('courseOverview')} />;
    }

    console.log(modules,"modules")

    return (
        <Box p={3} sx={{  margin: 'auto' }}>
            {/* Header */}
            <Typography variant="h6" component="div" sx={{ display: 'flex', alignItems: 'center', mb: 2 ,fontFamily:"Poppins",fontSize:"24px",fontWeight:700, gap:"10px",marginBottom:"52px"}}>
                <ArrowBack />
                 Institute course view
            </Typography>

            {/* Course Information */}
            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                    <Box
                        component="img"
                        src={course.image} // Dynamic course image
                        alt="Course"
                        sx={{ width: '100%', borderRadius: 2 }}
                    />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Box display="flex" flexDirection="column" justifyContent="space-between" height="100%">
                        
                        <Box my={1}>
                            <Chip 
                                icon={<OnlineIcon />}
                                
                                sx={{
                                    mr: 1,
                                    fontFamily: "Nunito Sans",
                                    fontWeight: 700,
                                    fontSize: "14px",
                                    lineHeight: "30px",
                                    "& .MuiChip-label": {
                                        display: "flex",
                                        gap: "4px",
                                        alignItems: "center",
                                    },
                                }}
                                label={
                                    <Box display="flex">
                                        <Typography sx={{ color: "#000", fontFamily: "Nunito Sans", fontWeight: 700, fontSize: "14px", mr: 1 }}>Mode of Class:</Typography>
                                        <Typography sx={{ color: "green" }}>{course.mode}</Typography>
                                    </Box>
                                }
                            />
                            <Chip
                                icon={<PeopleIcon />}
                                sx={{
                                    mr: 1,
                                    fontFamily: "Nunito Sans",
                                    fontWeight: 700,
                                    fontSize: "14px",
                                    lineHeight: "30px",
                                    "& .MuiChip-label": {
                                        display: "flex",
                                        gap: "4px",
                                        alignItems: "center",
                                    },
                                }}
                            label={
                                <Box display="flex">
                                    <Typography sx={{ color: "#000", fontFamily: "Nunito Sans", fontWeight: 700, fontSize: "14px", mr:1}}>Already Enrolled: {'('}</Typography>
                                    <Typography sx={{ color: "#000", fontFamily: "Nunito Sans", fontWeight: 400, fontSize: "14px", mr: 1 }}>{course.enrolled}/</Typography>
                                    <Typography sx={{ color: "#000", fontFamily: "Nunito Sans", fontWeight: 400, fontSize: "14px" }}>{course.capacity}{')'}</Typography>
                            </Box>
                            }
                            />
                            <Chip label={
                                <Box display="flex">
                                    <Typography sx={{ color: "#000", fontFamily: "Nunito Sans", fontWeight: 700, fontSize: "14px", mr: 1 }}>{`Starting Date: ${new Date(course.startDate).toLocaleDateString()}`}</Typography>
                                    </Box>
                                    } />
                        </Box>
                        <Typography variant="h5" fontWeight="bold" sx={{ fontFamily:"Nunito Sans",fontSize:"28px",fontWeight:700}}>{course.title}</Typography>
                        <Typography variant="body1" color="textSecondary" sx={{ fontFamily: "Nunito Sans", fontSize: "15px", fontWeight: 400 }}>
                            {course.description}
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 1, display: 'flex', alignItems: 'center',gap:'10px' }}>
                            by <a href={course.instituteUrl} style={{ color: '#6380E6', textDecoration: 'none', fontFamily: "Nunito Sans", fontWeight: 600, fontSize: "16px"}}>
                                {course.instituteName}
                            </a> <SchoolOutlinedIcon sx={{ color: '#6380E6 ', mr: 1 }}/>
                            <Avatar
                                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(course.instituteName)}&background=6380E6&color=fff&size=128`} // Provide the URL for the avatar image here
                                alt={course.instituteName}
                                sx={{ width: 24, height: 24, ml: 0.5}}
                            />
                            <Typography
                                variant="caption"
                                sx={{
                                    color: '#333',
                                    fontSize: '12px',
                                    fontFamily: "Nunito Sans",
                                    fontWeight: 500,
                                    ml: 1
                                }}
                            >
                                120+ learning
                            </Typography>
                        </Typography>
                        <Box mt={2}>
                            <Button
                                variant="outlined"
                                sx={{ mr: 1, color: "#002B38", borderRadius: '8px', border: '1px solid #002B38', background: 'rgba(61, 106, 119, 0.12)' }}
                                onClick={() => setView('teacherView')}
                            >
                                View Teacher
                            </Button>
                            <Button
                                variant="outlined"
                                sx={{ mr: 1, color: "#002B38", borderRadius: '8px', border: '1px solid #002B38', background: 'rgba(61, 106, 119, 0.12)' }}
                                onClick={() => setView('studentView')} 
                            >
                                View Student
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            <Typography sx={{ marginTop: "90px", mb:5, fontFamily: "Nunito Sans", fontWeight: 700, fontSize: '28px', color:'#000'}}>Modules</Typography>
            <Typography variant="body1" color="textSecondary" sx={{ mb: 4, fontFamily: "Nunito Sans", fontWeight: 400, fontSize: '16px', color: '#000' }}>
                {course.modulesDescription}
            </Typography>
            <Grid container spacing={2}>
                {modules?.map((module,index) => (
                    <CourseCard key={index} course={course} mod={module}  sx={{ boxShadow : "0 .25rem .875rem 0 rgba(38,43,67,.16)" }} />
                ))}
            
            </Grid>                      
            
        </Box>
    );
};

export default CourseOverview;
