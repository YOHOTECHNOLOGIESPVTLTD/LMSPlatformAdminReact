// ** MUI Imports
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
// ** Icon Imports
import Icon from 'components/icon';
// ** Custom Components Imports
import CustomAvatar from 'components/mui/avatar';
import CustomChip from 'components/mui/chip';

const SubscriptionTable = ({ data }) => {
  console.log(data);
  const renderTableCell = (row) => {
    if (typeof row.pro === 'boolean') {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CustomAvatar skin="light" sx={{ width: 20, height: 20 }} color={row.starter ? 'primary' : 'secondary'}>
            <Icon fontSize="0.875rem" icon={row.starter ? 'tabler:check' : 'tabler:x'} />
          </CustomAvatar>
        </Box>
      );
    } else {
      return <CustomChip rounded size="small" skin="light" label={row.pro} color="primary" />;
    }
  };

  return data && data.header && data.rows ? (
    <div>
      <Box sx={{ mb: 10, textAlign: 'center' }}>
        <Typography variant="h2" sx={{ mb: 2.5 }}>
          Pick a plan that works best for you
        </Typography>
        <Typography sx={{ color: 'text.disabled' }}>Stay cool, we have a 48-hour money back guarantee!</Typography>
      </Box>

      <Box
        sx={{
          mt: 8,
          borderRadius: 1,
          border: '1px solid',
          borderColor: 'divider',
          '& .MuiTableRow-root:nth-of-type(even)': { backgroundColor: 'action.hover' }
        }}
      >
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {data.header.map((head, index) => (
                  <TableCell key={index}>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: index === 0 ? 'flex-start' : 'center'
                      }}
                    >
                      {head.isPro ? (
                        <Box sx={{ position: 'relative' }}>
                          <Typography noWrap variant="body2" sx={{ mb: 1, fontWeight: 500, color: 'text.primary', lineHeight: 1.154 }}>
                            {head.title}
                          </Typography>
                          {head.isPro ? (
                            <CustomAvatar
                              sx={{
                                top: -10,
                                width: 24,
                                right: -25,
                                height: 24,
                                position: 'absolute',
                                color: 'common.white'
                              }}
                            >
                              <Icon fontSize="1rem" icon="tabler:star" />
                            </CustomAvatar>
                          ) : null}
                        </Box>
                      ) : (
                        <Typography noWrap variant="body2" sx={{ mb: 1, fontWeight: 500, color: 'text.primary', lineHeight: 1.154 }}>
                          {head.title}
                        </Typography>
                      )}
                      <Typography noWrap variant="body2" sx={{ color: 'text.disabled', textTransform: 'capitalize' }}>
                        {head.subtitle}
                      </Typography>
                    </Box>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.rows.map((row, index) => (
                <TableRow key={index} sx={{ '& .MuiTableCell-root': { py: (theme) => `${theme.spacing(3)} !important` } }}>
                  <TableCell sx={{ whiteSpace: 'nowrap' }}>
                    <Typography sx={{ color: 'text.secondary' }}>{row.feature}</Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                      <CustomAvatar skin="light" sx={{ width: 20, height: 20 }} color={row.starter ? 'primary' : 'secondary'}>
                        <Icon fontSize="0.875rem" icon={row.starter ? 'tabler:check' : 'tabler:x'} />
                      </CustomAvatar>
                    </Box>
                  </TableCell>
                  <TableCell align="center">{renderTableCell(row)}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                      <CustomAvatar skin="light" sx={{ width: 20, height: 20 }} color={row.enterprise ? 'primary' : 'secondary'}>
                        <Icon fontSize="0.875rem" icon={row.enterprise ? 'tabler:check' : 'tabler:x'} />
                      </CustomAvatar>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow sx={{ '& .MuiTableCell-root': { border: 0 } }}>
                <TableCell></TableCell>
                <TableCell align="center" sx={{ whiteSpace: 'nowrap' }}>
                  <Button variant="tonal">Choose Plan</Button>
                </TableCell>
                <TableCell align="center" sx={{ whiteSpace: 'nowrap' }}>
                  <Button variant="contained">Choose Plan</Button>
                </TableCell>
                <TableCell align="center" sx={{ whiteSpace: 'nowrap' }}>
                  <Button variant="tonal">Choose Plan</Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  ) : null;
};

export default SubscriptionTable;
