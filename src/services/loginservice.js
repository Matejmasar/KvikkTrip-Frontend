export const registerUser = async (userData) => {
    const apiUrl = `/api/signup`;
    const requestOpts = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
        credentials: 'include',
    }

    try {
        const response = await fetch(apiUrl, requestOpts);

        if (response.status === 200) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.log(error)
    }
}

export const loginUser = async () => {

}