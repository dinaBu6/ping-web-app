import { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import LinearProgress from '@mui/material/LinearProgress';
import '../index.css';

const Statistics = () => {

    const [hosts, setHosts] = useState([]);
    const [loading, setLoading] = useState(true);

    //We need to retrieve the hosts when the page is loaded
    useEffect(() => {
        const fetchHosts = async () => {
            fetch('http://localhost:4000/tophosts', {
                method: 'GET',
              })
            .then(response => response.json())
            .then((data) => {
                setHosts(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
          }
          fetchHosts();
    }, []);

    return (
        <div className='home'>
        <Container maxWidth="sm">
            <Box mb = {5}>
                <h2 className='title'>Top pinged sites</h2>
                <p className='text'>The table below shows the top most pinged hosts and how many times each host was pinged.</p>
            </Box>
            {loading &&
            <Box sx={{ width: '100%' }}>
                <LinearProgress />
            </Box>}
            {!loading && 
            <TableContainer component={Paper} elevation={3} sx={{width: 'fit-content', minWidth: '60%', margin: "auto"}}>
                <Table aria-label="simple table" sx = {{margin: "auto"}}>
                    <TableHead>
                        <TableRow>
                        <TableCell align="center">Host</TableCell>
                        <TableCell align="center">Count</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {hosts.map((h) => (
                        <TableRow key={h.host} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell align="center">{h.host}</TableCell>
                            <TableCell align="center">{h.pingCounter}</TableCell>
                        </TableRow>
                        ))}
                </TableBody>
                </Table>
          </TableContainer>}
        </Container>
        </div>
    )
}
export default Statistics;