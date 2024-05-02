import axios from 'axios';
import * as api from '../api/index.js';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getPosts = createAsyncThunk('posts/fetchAll', async (arg,thunkAPI) => {
    try {
        const {data} = await api.fetchPosts();
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
});

export const createPost = createAsyncThunk('posts/createPost',async (arg,thunkAPI) =>{
    try {
        const {data} = await api.createPost(arg)
        return data
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
});

export const updatePost = createAsyncThunk('posts/updatePost', async (arg,thunkAPI) => {
    try {
        const {currentId,postData} = arg
        const {data} = await api.updatePost(currentId,postData);
        return data
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
});

export const deletePost = createAsyncThunk('posts/deletePost', async (arg,thunkAPI) =>{
    try {
        await api.deletePost(arg);
        return arg;
    } catch (error) { return thunkAPI.rejectWithValue(error) }
});

export const likePost = createAsyncThunk('posts/likePost', async (arg,thunkAPI)=>{
    try {
        const { data } = await api.likePost(arg);
        return data;
    } catch (error) { return thunkAPI.rejectWithValue(error) }
})