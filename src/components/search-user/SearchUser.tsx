import {SearchUserStore} from "../../store/search-user/searchUserReducer";
import {Formik, FormikHelpers, FormikProps} from "formik";
import React from "react";
import {connect} from "react-redux";

import {RootStore} from "../../store/rootStore";
import {searchUser} from "../../store/search-user/searchUserActions";
import {Button, Form, InputGroup} from "react-bootstrap";
import styles from "./SearchUser.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";


export interface SearchTerm {
    searchTerm: string
}

interface Props {
    search: SearchUserStore
    searchUser: (searchTerm: string) => any
    isAdmin: boolean
}

const SearchUser: React.FC<Props> = (props) => {
    const initialValues: SearchTerm = {searchTerm: ""};

    async function handleFormSubmit(values: SearchTerm, actions: FormikHelpers<SearchTerm>) {
        await props.searchUser(values.searchTerm);
        actions.setSubmitting(false);
    }

    return (
        <div id="SearchUser" className="p-1">
            <div>
                <Formik initialValues={initialValues} onSubmit={handleFormSubmit}>
                    {(formProps: FormikProps<SearchTerm>) => (
                        <Form noValidate onSubmit={formProps.handleSubmit}>
                            <h3 className={styles.mviHeading}>Projeckmanagement UI</h3>
                            <Form.Group controlId="formGroupSearch" className={styles.searchBar}>
                                <InputGroup>
                                    <Form.Control type="text" name="searchTerm" className={styles.input}
                                                  value={formProps.values.searchTerm}
                                                  placeholder={"Benutzersuche mit Email"}
                                                  onChange={formProps.handleChange}/>
                                    <InputGroup.Append>
                                        <Button variant="outline-dark"
                                                type="submit"
                                                disabled={formProps.isSubmitting || formProps.values.searchTerm.length === 0}>
                                            <FontAwesomeIcon icon={faSearch} className={styles.icon}/>
                                        </Button>
                                    </InputGroup.Append>

                                </InputGroup>
                            </Form.Group>
                        </Form>
                    )}
                </Formik>
                
            </div>
        </div>
    );
};

export default connect(
    (store: RootStore) => ({
        search: store.searchUser,
        isAdmin: store.user.userIsAdmin
    }),
    {searchUser}
)(SearchUser);
