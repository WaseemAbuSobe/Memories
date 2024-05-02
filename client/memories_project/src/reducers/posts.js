import { createSlice } from "@reduxjs/toolkit";
import { getPosts,createPost,updatePost , deletePost , likePost } from "../actions/posts";

const initState = { values:[] };
const posts = createSlice({
    name:'posts',
    initialState : initState,
    reducers:{},
    extraReducers : (builder) => {
        builder
        // getPost Function
        .addCase(getPosts.pending ,()=>{})
        .addCase(getPosts.fulfilled , (state,action) =>{ state.values = action.payload })
        .addCase(getPosts.rejected,(state,action) =>{console.log(action.payload)})

        // createPost function
        .addCase(createPost.pending ,()=>{})
        .addCase(createPost.fulfilled , (state,action) =>{  state.values.push(action.payload) })
        .addCase(createPost.rejected,(state,action) =>{console.log(action.payload)})

        // updatePost function
        .addCase(updatePost.pending,()=>{})
        .addCase(updatePost.fulfilled,(state,action)=>{ state.values.map( (val)=>{ val._id === action.payload._id ? val = action.payload : null } ) })
        .addCase(updatePost.rejected,(state,action)=>{console.log(action.payload)})

        // deletePost
        .addCase(deletePost.pending,()=>{})
        .addCase(deletePost.fulfilled,(state,action) => {
            const deletePost = state.values.filter((post) => post._id !== action.payload);
            state.values = deletePost;
        })
        .addCase(deletePost.rejected,(state,action) => {console.log(action.payload)})

        // likePost
        .addCase(likePost.pending,()=>{})
        .addCase(likePost.fulfilled,(state,action) =>{ 
            const temp = state.values.map((post) => (post._id === action.payload._id ? action.payload : post));
            state.values = temp;
        })
        .addCase(likePost.rejected,(state,action) => {console.log(action.payload)})
    }
});
export default posts.reducer;