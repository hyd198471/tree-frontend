import {UserStore} from "../../store/user/userReducer";
import {Formik, FormikHelpers, FormikProps} from "formik";
import {connect} from "react-redux";
import {RootStore} from "../../store/rootStore";
import styles from './LoginForm.module.css';
import classnames from "classnames";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import Logo from './logo.jpg'
import React from "react";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import {loginAction} from "../../store/user/userActions";
import {Form, InputGroup} from "react-bootstrap";
import {faLock, faUser} from "@fortawesome/free-solid-svg-icons";

export interface LoginCredentials {
    username: string
    password: string
    rememberMe: boolean
}

interface Props {
    user: UserStore
    loginAction: (credentials: LoginCredentials) => any
}


const LoginForm: React.FC<Props> = (props) => {
    const initialValues: LoginCredentials = {username: '', password: '', rememberMe: false};

    async function handleFormSubmit(values: LoginCredentials, actions: FormikHelpers<LoginCredentials>) {
        await props.loginAction(values);
        actions.setSubmitting(false);
    }

    return (
        <Card id="LoginForm" className={styles.card}>
            <ListGroup variant="flush">
                <ListGroup.Item>
                    <div id="mvi-solve-it-logo">
                        <img alt="MVI SOlVE IT Logo" src={Logo} className={styles.logo}/>
                    </div>
                </ListGroup.Item>
                <ListGroup.Item>
                    <p className={classnames("pb-4", styles.heading)}>ProjektManagement Board</p>
                    <Formik initialValues={initialValues} onSubmit={handleFormSubmit}>
                        {/* tslint:disable-next-line:jsx-no-multiline-js */}
                        {(formProps: FormikProps<LoginCredentials>) => (
                            <Form noValidate={true} onSubmit={formProps.handleSubmit} className={"px-5"}>
                                <Form.Group as={Row} controlId="formGroupEmail">
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text id="inputGroupPrepend">
                                                <FontAwesomeIcon icon={faUser}/></InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control
                                            type="email"
                                            name="username"
                                            value={formProps.values.username}
                                            onChange={formProps.handleChange}
                                            placeholder="Email eingeben"
                                        />
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group as={Row} controlId="formGroupPassword">
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text id="inputGroupPrepend">
                                                <FontAwesomeIcon icon={faLock}/>
                                            </InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control
                                            type="password"
                                            name="password"
                                            value={formProps.values.password}
                                            onChange={formProps.handleChange}
                                            placeholder="Passwort eingeben"
                                        />
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group as={Row} controlId="formGroupRememberMe">
                                    <InputGroup>
                                        <Form.Check
                                            type="checkbox"
                                            label="Remember Me"
                                            value={String(formProps.values.rememberMe)}
                                            onChange={formProps.handleChange}
                                        />
                                    </InputGroup>
                                </Form.Group>
                                <Row>
                                    <Button
                                        type="submit"
                                        className={styles.signInButton}
                                        disabled={formProps.isSubmitting}
                                    >
                                        Anmelden
                                    </Button>
                                </Row>
                            </Form>
                        )}
                    </Formik>
                </ListGroup.Item>
            </ListGroup>
        </Card>
    );
};

export default connect(
    (store: RootStore) => ({user: store.user}),
    {loginAction}
)(LoginForm);