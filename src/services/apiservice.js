import TravelLocation from "../components/TravelLocation.js";

export const getRecommendations = async (filters) => {
    const picture = '/ny 1.png';

    let results = [];
    if (filters.length > 0) {
        const searchUrl = '/api/locations/search';
        const requestOpts = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:  JSON.stringify({'tags': filters})
        }
        console.log(requestOpts);
        try {
            const response = await fetch(searchUrl, requestOpts);
            if (response.status === 200) {
                const data = await response.json();
                results = data;
            }
        } catch (error) {
            console.log(error);
        }
    } else {
        results = await getLocations();
    }
    results = results.map(result => new TravelLocation(result.name, picture, result.country, "Sun", "$$"));

    return results;
}

export const getTags = async () => {
    const apiUrl = `/api/tags`;

    try {
        const response = await fetch(apiUrl);

        if (response.status === 200) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.log(error);
    }
}

export const getLocations = async () => {
    const apiUrl = `/api/locations`;

    try {
        const response = await fetch(apiUrl);

        if (response.status === 200) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.log(error);
    }
}

export const getUser = async (id) => {
    const apiUrl = `/api/user/${id}`;

    try {
        const response = await fetch(apiUrl);

        if (response.status === 200) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.log(error);
    }
}

export const updateUser = async (userId, userData) => {
    const apiUrl = `/api/user/${userId}`;
    return fetch(apiUrl, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    }).then(response => response.json());
};

export const getPreferences = async (id) => {
    const apiUrl = `/api/user/preferences/${id}`;

    try {
        const response = await fetch(apiUrl);

        if (response.status === 200) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.log(error);
    }
}