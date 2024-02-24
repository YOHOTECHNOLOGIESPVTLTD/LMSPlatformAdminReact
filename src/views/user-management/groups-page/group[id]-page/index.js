import React, { useState, useEffect } from 'react';
import {
  Typography,
  Table,
  TableContainer,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  FormControlLabel,
  Checkbox,
  Card,
  CardHeader,
  CardContent
} from '@mui/material';
import { getAllPermissionsByRoleId } from 'features/user-management/groups-page/services/groupService';
import { useLocation } from 'react-router';
import AddGroupSkeleton from 'components/cards/Skeleton/AddGroupSkeleton';

const useTimeout = (callback, delay) => {
  useEffect(() => {
    const timeoutId = setTimeout(callback, delay);

    return () => clearTimeout(timeoutId);
  }, [callback, delay]);
};

const GroupViewPage = () => {
  const [permissions, setPermissions] = useState([]);
  const location = useLocation();
  const group = location?.state?.group?.role;
  const [loading, setLoading] = useState(true);

  useTimeout(() => {
    setLoading(false);
  }, 1000);

  useEffect(() => {
    getPermissions();
  }, [group?.id]);
  console.log(location);

  const getPermissions = async () => {
    try {
      const result = await getAllPermissionsByRoleId(group?.id);
      if (result.success) {
        setPermissions(result.data);
        console.log(result.data);
      } else {
        console.log(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderPermissions = () => {
    return permissions?.map((module) =>
      module?.screens?.map((screen, index) => (
        <TableRow key={index} sx={{ '& .MuiTableCell-root:first-of-type': { pl: '0 !important' } }}>
          <TableCell
            sx={{
              fontWeight: 600,
              whiteSpace: 'nowrap',
              fontSize: (theme) => theme.typography.h6.fontSize
            }}
          >
            {screen?.screen_name}
          </TableCell>
          {screen?.permissions?.map((permission, index) => (
            <TableCell key={index}>
              <FormControlLabel
                label={permission?.name}
                sx={{ '& .MuiTypography-root': { color: 'text.secondary' } }}
                control={<Checkbox size="small" id={`${index}-write`} checked={true} />}
              />
            </TableCell>
          ))}
        </TableRow>
      ))
    );
  };

  return (
    <>
      {loading ? (
        <AddGroupSkeleton />
      ) : (
        <Card fullWidth maxWidth="md" scroll="body">
          <CardHeader
            component="div"
            sx={{
              textAlign: 'center',
              px: (theme) => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
              pt: (theme) => [`${theme.spacing(5)} !important`, `${theme.spacing(8)} !important`]
            }}
            title={group?.name}
          ></CardHeader>
          <CardContent
            sx={{
              pb: (theme) => `${theme.spacing(3)} !important`,
              px: (theme) => [`${theme.spacing(5)} !important`, `${theme.spacing(8)} !important`]
            }}
          >
            <Typography variant="h4" sx={{ pb: 3 }}>
              Group Permissions
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead></TableHead>
                <TableBody>{renderPermissions()}</TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default GroupViewPage;
