import {SearchUserStore} from "../../store/search-user/searchUserReducer";
import {Formik, FormikHelpers, FormikProps} from "formik";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import React from "react";
import {connect} from "react-redux";

import {makeStyles} from "@material-ui/core/styles";
import {RootStore} from "../../store/rootStore";
import {searchUser} from "../../store/search-user/searchUserActions";


export interface SearchTerm {
    searchTerm: string
}


interface Props {
    search: SearchUserStore
    searchUser: (searchTerm: string) => any
    isAdmin: boolean
}

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const SearchUser: React.FC<Props> = (props) => {
    const initialValues: SearchTerm = {searchTerm: ""};
    const classes = useStyles();

    async function handleFormSubmit(values: SearchTerm, actions: FormikHelpers<SearchTerm>) {
        await props.searchUser(values.searchTerm);
        actions.setSubmitting(false);
    }


    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Benutzer Suchung
                </Typography>
                <Formik initialValues={initialValues} onSubmit={handleFormSubmit}>
                    {/* tslint:disable-next-line:jsx-no-multiline-js */}
                    {(formProps: FormikProps<SearchTerm>) => (
                        <form className={classes.form} noValidate={true} onSubmit={formProps.handleSubmit}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required={true}
                                fullWidth={true}
                                id="searchTerm"
                                label="search term"
                                name="search term"
                                value={formProps.values.searchTerm}
                                onChange={formProps.handleChange}
                                autoComplete="email"
                                autoFocus={true}
                            />
                            <Button
                                type="submit"
                                fullWidth={true}
                                variant="contained"
                                color="primary"
                                disabled={formProps.isSubmitting}
                                className={classes.submit}
                            >
                                Suchen
                            </Button>
                        </form>
                    )}
                </Formik>
            </div>

        </Container>
    );
};

export default connect(
    (store: RootStore) => ({
        search: store.searchUser,
        isAdmin: store.user.userIsAdmin
    }),
    {searchUser}
)(SearchUser);
