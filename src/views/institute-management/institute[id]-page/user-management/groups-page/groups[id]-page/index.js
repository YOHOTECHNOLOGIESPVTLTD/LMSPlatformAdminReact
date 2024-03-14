import React, { useState, useEffect, useMemo } from 'react';
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

const GroupViewPage = () => {
  const [permissions, setPermissions] = useState([]);
  const location = useLocation();
  const group = location?.state?.group;
  const [loading, setLoading] = useState(true);

  // Effect to fetch permissions when the group ID changes
  useEffect(() => {
    if (group?.id) {
      getPermissions(group.id);
    }
  }, [group?.id]);

  // Function to fetch permissions by group ID
  const getPermissions = async (id) => {
    try {
      setLoading(true);
      const result = await getAllPermissionsByRoleId(id);
      if (result.success) {
        setPermissions(result.data);
      } else {
        console.log(result.message);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // Memoized rendering of permissions to prevent unnecessary re-renders
  const renderPermissions = useMemo(() => {
    return permissions?.map((module, moduleIndex) => (
      <React.Fragment key={moduleIndex}>
        {module?.screens?.map((screen, screenIndex) => (
          <TableRow key={screenIndex} sx={{ '& .MuiTableCell-root:first-of-type': { pl: '0 !important' } }}>
            <TableCell
              sx={{
                fontWeight: 600,
                whiteSpace: 'nowrap',
                fontSize: (theme) => theme.typography.h6.fontSize
              }}
            >
              {screen?.screen_name}
            </TableCell>
            {screen?.permissions?.map((permission, permissionIndex) => (
              <TableCell key={permissionIndex}>
                <FormControlLabel
                  label={permission}
                  sx={{ '& .MuiTypography-root': { color: 'text.secondary' } }}
                  control={<Checkbox size="small" id={`${permissionIndex}-write`} checked={true} />}
                />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </React.Fragment>
    ));
  }, [permissions]);

  return (
    <>
      {loading ? (
        <AddGroupSkeleton />
      ) : (
        <Card>
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
                <TableBody>{renderPermissions}</TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default GroupViewPage;
