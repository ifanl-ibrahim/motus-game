import * as React from "react";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { Box, Card, Typography, Container, Avatar, Stack, IconButton, TextField, FormControl, Snackbar, Button, InputAdornment } from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { UserContext } from "../contexts/UserContext";

const Login = () => {
  const router = useRouter();
  const { isLogged, authentication, register } = useContext(UserContext);
  useEffect(() => {
    if (isLogged == "true") {
      router.push("/home");
    }
  }, []);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (username === "" || password === "") {
      setMessage("Veuillez remplir tous les champs");
      setOpen(true);
      return;
    }
    if (username.length < 3) {
      setMessage("Le login doit contenir 3 caractères minimums");
      setOpen(true);
      return;
    }
    if (password.length < 6) {
      setMessage("Le mot de passe doit contenir 6 caractères minimums");
      setOpen(true);
      return;
    }

    try {
      const response = await authentication(username, password);
      if (response) {
        setMessage("Connexion réussie");
        setOpen(true);
        router.push("/home");
      }
    } catch (error) {
      if (error.request.status) {
        setMessage("Login ou mot de passe incorrect");
        setOpen(true);

      }
    }
    
    try {
      var userInformations
      userInformations = {
        username: username,
        password: password,
        email: 'public@strapi.io',
        role: 1
      };
      const response = await register(userInformations)
      if (response) {
        setMessage("Enregistrement Réussie");
        setOpen(true);
        router.push("/game");
      }
    } catch (error) {
      if (error.request) {
        setMessage("Erreur lors de l'enregistrement");
        setOpen(true);
      }
    }
  };

  return (
    <Box>
      <Container maxWidth="sm" sx={{ textAlign: "center", marginTop: "12rem", marginBottom: 23.5 }}>
        <Card sx={{ p: 8, m: 2, borderRadius: "1vh" }}>
          <Stack direction="row" alignItems="center" justifyContent="center" flexDirection="column">
            <Avatar
              sx={{
                width: "10vh",
                height: "10vh",
                marginBottom: "2vh",
                background: "gray",
              }}
              src="sutom-1920x1080.jpg"
            />
          </Stack>
          <Typography variant="h4" component="h1" gutterBottom sx={{ marginBottom: "2em" }}>
            Connexion
          </Typography>
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth sx={{ m: 1 }}>
              <TextField label="Login" id="username" value={username} onChange={handleUsernameChange} variant="outlined" />
            </FormControl>
            <FormControl fullWidth sx={{ m: 1 }}>
              <TextField
                label="Mot de passe"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                variant="outlined"
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
                        {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
            <Button
              variant="contained"
              sx={{
                m: 1,
                width: "100%",
                padding: "1vh",
                background: "#a3a3a3",
                "&:hover": {
                  background: "#87afc0",
                },
              }}
              type="submit"
            >
              Connexion
            </Button>
          </form>
          <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
            message={message}
          />
        </Card>
      </Container>
    </Box>
  );
};

export default Login;
