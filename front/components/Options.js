import * as React from "react";
import { useState, useEffect } from "react";
import { Box, Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Container } from "@mui/material";
import { getClassement } from '../api/classement'
import { useRouter } from "next/router";

const Options = (props) => {
  const router = useRouter()
  const [classement, setClassement] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const response = await getClassement();
      setClassement(response);
    };
    fetch();
  }, []);

  return (
    <Box>
    {props.option == 'fame' ? (
        <Box onClick={() => props.onClose()} sx={{ position: 'relative', margin: 'auto', width: '100%', height: '100vh', alignItems: 'center', display: 'flex' }}>
          {/* <Button
            onClick={() => props.onClose()}
            sx={{ position: 'absolute', top: 8, right: 8 }}
          >
            Fermer
          </Button> */}
          <TableContainer component={Paper} sx={{ margin: 'auto', width: '85vh', overflow: 'auto' }}>
            <Table sx={{ minWidth: 100 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: '600', minWidth: '10vh' }} align="center">Rang</TableCell>
                  <TableCell sx={{ fontWeight: '600', minWidth: '10vh' }} align="center">Player</TableCell>
                  <TableCell sx={{ fontWeight: '600', minWidth: '10vh' }} align="center">Score</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {classement.map((user, index) => (
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="center">{user.username}</TableCell>
                    <TableCell align="center">{user.score}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      ) : (
        <Box onClick={() => props.onClose()} sx={{ position: 'relative', margin: 'auto', width: '100%', height: '100vh', alignItems: 'center', display: 'flex' }}>
          {/* <Button
            onClick={() => props.onClose()}
            sx={{ position: 'absolute', top: 8, right: 8 }}
          >
            Fermer
          </Button> */}
          <Container maxWidth="sm" sx={{ textAlign: "center", display: 'flex', flexDirection: 'column', gap: 5 }}>
            <Button variant="contained" sx={{width: '100%', height: '12vh', fontSize: '4vh'}} onClick={()=> router.push('/game?difficulty=facile')}>Facile</Button>
            <Button variant="contained" sx={{width: '100%', height: '12vh', fontSize: '4vh'}} onClick={()=> router.push('/game?difficulty=normal')}>Normale</Button>
            <Button variant="contained" sx={{width: '100%', height: '12vh', fontSize: '4vh'}} onClick={()=> router.push('/game?difficulty=difficile')}>Difficile</Button>
          </Container>
        </Box>
      )}
    </Box>
  );
};

export default Options;
