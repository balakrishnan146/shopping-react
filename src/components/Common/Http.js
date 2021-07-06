import { toast } from 'react-toastify';

const errorHandler = (message) => {
    toast.error(message, {autoClose: 3000});
}

export const get = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
        errorHandler('Error occurred while getting data.');
        return;
    }
    return response.json();
}

export const post = async (url, body) => {
    const response = await fetch(url, { method: 'POST', body: JSON.stringify(body) });
    if (!response.ok) {
        errorHandler('Error occurred while saving data.');
        return;
    }
    return response.json();
}

export const del = async (url) => {
    const response = await fetch(url, { method: 'DELETE' });
    if (!response.ok) {
        errorHandler('Error occurred while deleting data.');
        return;
    }
    return response.json();
}
