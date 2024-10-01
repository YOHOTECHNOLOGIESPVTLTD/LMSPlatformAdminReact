import { Skeleton, Table, TableCell, TableHead, TableRow, TableBody, Box } from "@mui/material";
import './FaqCategorySkelton.css';

const FaqCategorySkelton = () => {
  return (
    <Table size="medium" sx={{ width: "100%", backgroundColor: "white", borderCollapse: 'collapse' , "& .MuiTableCell-root": { color: "#474747", borderBottom: '1px solid #ddd', borderRadius: "8px" }  }}>
      <TableHead  >
        <TableRow >
          <TableCell sx={{  padding: 1 }}>
            <Box sx={{ width: 100 }}>
              <Skeleton className="custom-skeleton" variant="text" sx={{ height: 25 }} />
            </Box>
          </TableCell>
          <TableCell sx={{  padding: 1 }}>
            <Box sx={{ width: 200 }}>
              <Skeleton className="custom-skeleton" variant="text" sx={{ height : 25 }} />
            </Box>
          </TableCell>
          <TableCell sx={{  padding: 1 }}>
            <Box sx={{ width: 150 }}>
              <Skeleton className="custom-skeleton" variant="text" sx={{ height : 25 }} />
            </Box>
          </TableCell>
          {/* <TableCell sx={{  padding: 1 }}>
            <Box sx={{ width: 100 }}>
              <Skeleton className="custom-skeleton" variant="text" sx={{ height : 25 }} />
            </Box>
          </TableCell> */}
        </TableRow>
      </TableHead>
      <TableBody>
        {[...Array(5)].map((_, index) => (
          <TableRow key={index}>
            <TableCell sx={{  padding: 1 }}>
              <Skeleton className="custom-skeleton" variant="text" sx={{ height : 25 }} />
            </TableCell>
            <TableCell sx={{  padding: 1 }}>
              <Skeleton className="custom-skeleton" variant="text" sx={{ height : 25 }} />
            </TableCell>
            <TableCell sx={{  padding: 1 }}>
              <Skeleton className="custom-skeleton" variant="text" sx={{ height : 25 }} />
            </TableCell>
            {/* <TableCell sx={{  padding: 1 }}>
              <Skeleton className="custom-skeleton" variant="text" sx={{ height : 25 }} />
            </TableCell> */}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default FaqCategorySkelton;
