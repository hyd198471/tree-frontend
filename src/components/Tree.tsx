import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {useDispatch, useSelector} from "react-redux";
import {RootStore} from "../store/rootStore";
import {getRootNode} from "../store/tree/TreeAction";
import {TreeNode} from "../store/tree/TreeReducer";
import {TreeView} from "@material-ui/lab";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from "@material-ui/lab/TreeItem";

const useStyles = makeStyles({
    root: {
        height: 216,
        flexGrow: 1,
        maxWidth: 400,
    },
});

const TreeRender = (treeNode: TreeNode) => {
    const isChildren = treeNode.children !== null && treeNode.children.length !== 0;
    if (isChildren) {
        return (
            <TreeItem key={treeNode.data} nodeId={treeNode.nodeId.toString()} label={treeNode.data}>
                {treeNode.children.map((node, idx) => TreeRender(node))}
            </TreeItem>
        );
    }
    return <TreeItem key={treeNode.data} nodeId={treeNode.nodeId.toString()} label={treeNode.data} />;
};


const Tree: React.FC = () => {
    const classes = useStyles();

    const [expanded, setExpanded] = useState<string[]>([]);

    const handleChange= (event: React.ChangeEvent<{}>, nodes: string[]) => {
        setExpanded(nodes);
    }
    const tree= useSelector((state : RootStore) => state.tree.treeNode);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getRootNode())
    },[dispatch]);

    return (
        <TreeView
            className={classes.root}
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            expanded={expanded}
            onNodeToggle={handleChange}
        >
            {tree && TreeRender(tree)}
        </TreeView>
    );
};

export default Tree