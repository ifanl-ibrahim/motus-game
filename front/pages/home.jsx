import * as React from "react";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { Box, Button, Container, Modal } from "@mui/material";
import { UserContext } from "../contexts/UserContext";
import Options from '../components/Options'

const Login = () => {
    const router = useRouter();
    const { logout, isLogged } = useContext(UserContext);
    useEffect(() => {
        if (isLogged == "false") {
            router.push("/");
        }
    }, []);

    const [open, setOpen] = useState(false);
    const [option, setOption] = useState("")
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Box>
            <Modal open={open}>
                <Options onClose={handleClose} option={option}/>
            </Modal>
            <Container sx={{ display: 'grid', gridTemplateColumns: 'auto auto auto', gridTemplateRows: '100vh', alignItems: 'center', gap: 5 }}>
                <Button variant="contained" sx={{width: '100%', height: '12vh', fontSize: '4vh'}} onClick={()=> (setOpen(true), setOption('game'))}>Jouer</Button>
                <Button variant="contained" sx={{width: '100%', height: '12vh', fontSize: '4vh'}} onClick={()=> (setOpen(true), setOption('fame'))}>Classement</Button>
                <Button variant="contained" sx={{width: '100%', height: '12vh', fontSize: '4vh'}} onClick={logout}>Déconnection</Button>
            </Container>
        </Box>
    );
};

export default Login;
