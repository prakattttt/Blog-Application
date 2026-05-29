import api from "./axios";

export const getAllPosts = async () => {
    const response = await api.get("/posts");

    if(response.data.success) {
        return response.data.posts;
    }
}

export const getAuthorPosts = async (id: string) => {
    const response = await api.get(`/posts/me/${id}`);

    if(response.data.success) {
        return response.data.posts;
    }
}

export const getSinglePost = async (id: string) => {
    const response = await api.get(`/posts/${id}`);

    if(response.data.success) {
        return response.data.posts;
    }
}

export const createPost = async (body: FormData, id: string) => {
    const response = await api.post(`/posts/${id}`, body);

    if(response.data.success) {
        return response.data.message;
    } 
}

export const deletePost = async ( id: string) => {
    const response = await api.delete(`/posts/${id}`);

    if(response.data.success) {
        return response.data.message;
    } 
}