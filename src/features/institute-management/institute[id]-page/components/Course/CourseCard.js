import React, { useState } from 'react';
import { Box, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import Icon from 'components/icon';
import { default as DeleteDialog,} from 'components/modal/DeleteModel';
import CustomChip from 'components/mui/chip';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';

const CourseCard = ({sx,mod}) => {
    

    // // Dummy course data
    // const course = {
    //     image: null,
    //     class_type: "online",
    //     category: { category_name: "Science" },
    //     course_name: "Advanced Physics and Quantum Mechanics",
    //     coursemodules: Array(5).fill({ name: "Module 1" }), // 5 dummy modules
    //     Test: "3 Mock Test",
    //     class: 'Module 1 - 30 classes',
    //     is_active: "true",
    //     uuid: "123-abc-456"
    // };

    // const imageUrl = mod.image
    //     ? `${process.env.REACT_APP_PUBLIC_API_URL}/${mod.image}`
    //     : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1UftbVrlc1qcsJiUIghbXPXRGYHPLHWfVJQ&s';

    
    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

    // const maxCharacters = 100;

  

console.log(mod, "mod")
  
   

    return (
        <Grid item xs={12} sm={6} md={4}>
            <Card sx={{
                ...sx,
                background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
                borderRadius: "12px",
                boxShadow: "0 .25rem 1.25rem rgba(0,0,0,.1)",
                overflow: "hidden",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                ":hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 .5rem 1.25rem rgba(38,43,67,.2)"
                }
            }}>
                <CardContent sx={{ pb: 0 }}>
                    <CardMedia
                        sx={{
                            position: 'relative',
                            height: '10.5625rem',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            objectFit: 'cover'
                        }}
                        image={mod.image}>
                        <CustomChip
                            sx={{
                                position: 'absolute',
                                top: 0,
                                right: 0,
                                zIndex: 1,
                                backgroundColor: "#ff4081",
                                color: "white",
                                borderRadius: '0px 6px 0px 10px',
                                height: '2rem'
                            }}
                            label={`Day`}
                            size="small"
                            variant="filled"
                        />
                    </CardMedia>
                </CardContent>
                <CardContent sx={{ pt: 2 }}>
                    <Box>
                        <CustomChip
                            sx={{ px: 1, py: 0.5, backgroundColor: "#e0f7fa", color: "#00796b" }}
                            label={mod?.category?.category_name}
                            size="small"
                            variant="filled"
                        />
                    </Box>
                    <Box sx={{ mr: 2, mt: 1, display: 'flex', flexDirection: 'row', height: '50px',justifyContent:'space-between' }}>
                        <Typography
                            variant="h5"
                            sx={{
                                mt: 1,
                                color: "#37474f",
                                fontWeight: 600,
                                overflow: 'hidden',
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                textOverflow: 'ellipsis'
                            }}
                        >
                            {mod.course_name}
                        </Typography>
                        <Box>
                            
                                <Grid
                                    
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        '& svg': { color: '#ff4081', mr: 0.5 }
                                    }}
                                >
                                    <Icon icon="tabler:augmented-reality" fontSize={20} />
                                    <Typography sx={{ color: 'text.secondary' }}>{mod.coursemodules.length} Modules</Typography>
                                </Grid>
                            
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            mt: 2,
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}
                    >
                        <Grid>
                            <Typography variant="h4" sx={{ color: '#37474f', mr: 1, fontWeight: 500 }}>
                                {mod?.class}
                            </Typography>
                        </Grid>
                        <Grid>
                            <Typography variant="h4" sx={{ color: '#37474f', mr: 1, fontWeight: 500 }}>
                                {mod?.Test}
                            </Typography>
                        </Grid>
                    </Box>
                </CardContent>
            </Card>

            {/* Delete Dialog */}
            <DeleteDialog
                open={isDeleteDialogOpen}
                setOpen={setDeleteDialogOpen}
                description="Are you sure you want to delete this item?"
                title="Delete"
            />
        </Grid>
    );
};

CourseCard.propTypes = {
    course: PropTypes.any,
    details: PropTypes.any,
    mod: PropTypes.any,
    sx: PropTypes.any,
};

export default CourseCard;
