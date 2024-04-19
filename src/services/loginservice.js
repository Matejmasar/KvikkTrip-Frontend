export const registerUser = async (userData) => {
    const apiUrl = `https://bold-amandi-kvikktrip.koyeb.app/signup`;
    const requestOpts = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
        credentials: 'include'
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

export const loginUser = async (username, password) => {
    const apiUrl = 'https://bold-amandi-kvikktrip.koyeb.app/login';
    const params = new URLSearchParams();
    params.append('emailorusername', username);
    params.append('password', password);

    const requestOpts = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: params,
        credentials: 'include'
    }

    try {
        const response = await fetch(apiUrl, requestOpts);

        if (response.status === 200) {
            const data = await response.json();
            localStorage.setItem('userId', data);
            return true
        } else if (response.status === 401) {
            return false
        }
    } catch (error) {
        console.log(error);
    }
}

export const logoutUser = async () => {
    console.log('logging out');
}