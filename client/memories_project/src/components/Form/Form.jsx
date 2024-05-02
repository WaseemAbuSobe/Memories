import useStyles from './styles';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useState , useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPost , updatePost } from '../../actions/posts.js';

const Form = ({currentId,setCurrentId}) => {
    const [postData,setPostData] = useState( { creator:'' , title : '' , message : '' , tags : '' , selectedFile : '' } );
    const post = useSelector((state) => (currentId ? state.posts.values.find((message) => message._id === currentId) : null));
    
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(()=>{
        if (post) setPostData(post)
    },[post])

    const handleSubmit = (e) =>{
        e.preventDefault();
        if(currentId === 0){dispatch(createPost(postData));
        } else { dispatch(updatePost({currentId,postData})) }
        clear(); 
    };

    const clear = () =>{
        setCurrentId(0);
        setPostData({ creator:'' , title : '' , message : '' , tags : '' , selectedFile : '' })
    }

    return(
        <Paper className={classes.paper}>
        { currentId === 0 ? <h2>Add Memory</h2> : <h2>Edite Memory</h2> }
        <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit} >
          <Typography variant="h6"></Typography>
          <TextField name="creator" variant="outlined" label="Creator" fullWidth value={postData.creator} onChange={(e) => setPostData({...postData, creator : e.target.value })} />
          <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({...postData, title: e.target.value })} />
          <TextField name="message" variant="outlined" label="Message" fullWidth value={postData.message} onChange={(e) => setPostData({...postData, message: e.target.value })} />
          <TextField name="tags" variant="outlined" label="Tags (coma separated)" fullWidth value={postData.tags} onChange={(e) => setPostData({...postData, tags: e.target.value })} />
          <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={ ({base64}) => setPostData({...postData ,selectedFile:base64}) } /></div>
          <Button className={classes.buttonSubmit} variant="contained" color="primary" size="small" type="submit" fullWidth >Submit</Button>
          <Button variant="contained" color="secondary" size="small" fullWidth onClick={clear} >Clear</Button>
        </form>
      </Paper>
    )
}

export default Form