const errorHandler = (message) => {
    window.alert(message);
}

export const get = async (url) => {
    const response = await fetch(url);
    console.log(response);
    if (!response.ok) {
        errorHandler('Error');
        return;
    }
    return await response.json();
}

export const post = async (url, body) => {
    const response = await fetch(url, { method: 'POST', body: JSON.stringify(body) });
    console.log(response);
    if (!response.ok) {
        errorHandler('Error');
        return;
    }
    return await response.json();
}
