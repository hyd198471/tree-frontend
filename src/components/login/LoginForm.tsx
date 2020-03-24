import {UserStore} from "../../store/user/userReducer";
import React from "react";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {connect} from "react-redux";
import {RootStore} from "../../store/rootStore";
import {loginAction} from "../../store/user/userActions";
import {Formik, FormikHelpers, FormikProps, Field, Form} from "formik";
import { TextField } from 'formik-material-ui';


export interface LoginCredentials {
    username: string
    password: string
}

interface Props {
    user: UserStore
    loginAction: (credentials: LoginCredentials) => any
}

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const LoginForm: React.FC<Props> = (props) => {
    const classes = useStyles();
    const initialValues: LoginCredentials = {username: '', password: ''};

    async function handleFormSubmit(values: LoginCredentials, actions: FormikHelpers<LoginCredentials>) {
        await props.loginAction(values);
        actions.setSubmitting(false);
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Anmeldung
                </Typography>
                <Formik initialValues={initialValues} onSubmit={handleFormSubmit}>
                    {/* tslint:disable-next-line:jsx-no-multiline-js */}
                    {(formProps: FormikProps<LoginCredentials>) => (
                        <Form className={classes.form} noValidate={true} onSubmit={formProps.handleSubmit}>
                            <Field
                                component={TextField}
                                name="username"
                                type="username"
                                label="Username"
                            />
                            <br />
                            <Field
                                component={TextField}
                                type="password"
                                label="Password"
                                name="password"
                            />
                            <br />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary"/>}
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth={true}
                                variant="contained"
                                color="primary"
                                disabled={formProps.isSubmitting}
                                className={classes.submit}
                            >
                                Anmelden
                            </Button>
                            <Grid container={true}>
                                <Grid item={true} xs={true}>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item={true}>
                                    <Link href="#" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Form>
                    )}
                </Formik>
            </div>
            <Box mt={8}>
                <Copyright/>
            </Box>
        </Container>
    );
};

export default connect(
    (store: RootStore) => ({user: store.user}),
    {loginAction}
)(LoginForm);