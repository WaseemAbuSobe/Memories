import Post from "./Post/Post";
import {Grid , CircularProgress} from '@material-ui/core';
import {  useSelector } from "react-redux";
import useStyles from './styles.js';
const Posts = ({setCurrentId}) => {
    const posts = useSelector((state) => state.posts.values)
    const classes = useStyles()
    return(
        !posts ? <CircularProgress/> : (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                { posts.map((post) => {
                    return(
                        <Grid key={post.id} item xs={12} sm={6}>
                            <Post post={post} setCurrentId={setCurrentId} />
                        </Grid>
                    )
                })}
            </Grid>
        )
    )
}
export default Posts