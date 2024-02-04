import React from "react";
import { signin, socialLogin } from "./service/ApiService";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function Login() {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        const username = data.get("username");
        const password = data.get("password");
        signin({ username: username, password: password });
    };

    const handlerSocialLogin = (provider) => { socialLogin(provider); }

    return (
        <Container component="main" maxWidth="xs" style={{ marginTop: "8%" }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography component="h1" variant="h5">
                        Login
                    </Typography>
                </Grid>
            </Grid>
            <form noValidate onSubmit={handleSubmit}>
                {" "}
                {/*submit 버튼을 누르면 handleSubmit이 실행됨.*/}
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField variant="outlined" required fullWidth id="username" label="ID" name="username" autoComplete="username" />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField variant="outlined" required fullWidth id="password" label="PW" name="password" type="password" autoComplete="current-password" />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" fullWidth variant="contained" color="primary">
                            Login
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button onClick={() => handlerSocialLogin("kakao")} fullWidth variant="contained" style={{backgroundColor: '#000'}}>
                            Kakao Login
                        </Button>
                    </Grid>
                    <Grid item>
                        <Link to="/signup" variant="body2">
                            계정이 없습니까 여기서 가입하세요.
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </Container>
    )
}

export default Login;