import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import {connect} from "react-redux";
import {RootStore} from "../store/rootStore";
import {getRootNode} from "../store/tree/TreeAction";
import {TreeStore} from "../store/tree/TreeReducer";

const useStyles = makeStyles({
    root: {
        height: 216,
        flexGrow: 1,
        maxWidth: 400,
    },
});

interface Props {
    tree: TreeStore
    getRootNode: () => any

}
const Tree: React.FC<Props> = (props) => {
    const classes = useStyles();

    return (
        <TreeView
            className={classes.root}
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
        >
            <TreeItem nodeId="1" label="Applications">
                <TreeItem nodeId="2" label="Calendar" />
                <TreeItem nodeId="3" label="Chrome" />
                <TreeItem nodeId="4" label="Webstorm" />
            </TreeItem>
            <TreeItem nodeId="5" label="Documents">
                <TreeItem nodeId="6" label="Material-UI">
                    <TreeItem nodeId="7" label="src">
                        <TreeItem nodeId="8" label="index.js" />
                        <TreeItem nodeId="9" label="tree-view.js" />
                    </TreeItem>
                </TreeItem>
            </TreeItem>
        </TreeView>
    );
};

export default connect(
    (store: RootStore) => ({
        tree: store.tree
    }),{getRootNode}
)(Tree);
