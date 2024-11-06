import React from 'react';
import { Box, Dialog, Grid, IconButton, Link, Typography} from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';



const InstituteDocument = () => {
    const [open, setOpen] = useState(false);
    const [selectedPdf, setSelectedPdf] = useState(null);
    // Define document data
    const documents = [
        { label: 'GST', value: '4672 3989 3213', name: 'Aadhar PDF', url: 'https://www.orimi.com/pdf-test.pdf' },
        { label: 'PAN', value: 'HGYF0808', name: 'Pan PDF', url: 'https://www.orimi.com/pdf-test.pdf' },
        { label: 'InstituteLicense', value: 'KHHU468w800h', name: 'DL Photo PDF', url: 'https://www.orimi.com/pdf-test.pdf' },
    ];

    const handleOpen  =(url)=>{
        setSelectedPdf(url);
        setOpen(true)
    };
handleOpen 
    const handleClose = () => {
        setOpen(false);
        setSelectedPdf(null);
    };
    
    return (
        <Box padding={4}>
            <Typography variant="body1" sx={{ mb: 3, textAlign: 'center', fontSize: '24px', fontFamily: "Poppins", fontWeight: 700, color:'#2d2b2c'}}>
                Documents:
            </Typography>
            <Grid container spacing={4}>
                {documents.map((doc, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4}>
                        <Box display="flex">
                            <Typography
                                variant="body2"
                                fontWeight="bold"
                                sx={{ mr: 1, color: '#848484', fontFamily: 'Nunito Sans', fontSize: '16px', fontWeight: 600 }}
                            >
                                {doc.label}:
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{ mr: 3, color: '#000', fontFamily: 'Nunito Sans', fontSize: '16px', fontWeight: 400 }}
                            >
                                {doc.value}
                            </Typography>
                        </Box>

                        <Box display="flex" alignItems="center" gap={1} mt={1}>
                            <PictureAsPdfIcon color="#0249E9" sx={{ fontSize: '15px' }} />
                            <Link
                                sx={{ color: '#0249E9', cursor: 'pointer' }}
                                onClick={() => handleOpen(doc.url)}
                                underline="hover"
                            >
                                {doc.name}
                            </Link>
                        </Box>
                    </Grid>
                ))}
            </Grid>

            {/* Dialog for displaying PDF */}
            <Dialog open={open} onClose={handleClose} maxWidth="lg">
                <Box
                    display="flex"
                    justifyContent="flex-end"
                    sx={{ position: 'fixed' }} // Keeps the close icon fixed at the top-right
                >
                    <IconButton onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Box p={5}>
                    {selectedPdf && (
                        <iframe
                            src={selectedPdf}
                            width="300%"
                            height="500px"
                            style={{ border: 'none' }}
                            title="PDF Viewer"
                        />
                    )}
                </Box>
            </Dialog>
        </Box>
    );
};

export default InstituteDocument