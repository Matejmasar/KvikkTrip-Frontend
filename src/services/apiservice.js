import TravelLocation from "../components/TravelLocation.js";

export const getRecommendations = async (filters) => {
    const picture = '/ny 1.png';

    let results = [];
    if (filters.length > 0) {
        const searchUrl = 'https://bold-amandi-kvikktrip.koyeb.app/locations/search';
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
    const apiUrl = `https://bold-amandi-kvikktrip.koyeb.app/tags`;

    try {
        const response = await fetch(apiUrl, {mode: "cors"});

        if (response.status === 200) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.log(error);
    }
}

export const getLocations = async () => {
    const apiUrl = `https://bold-amandi-kvikktrip.koyeb.app/locations`;

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

export const getUser = async (userId) => {
    const apiUrl = `https://bold-amandi-kvikktrip.koyeb.app/user/${userId}`;

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
    const apiUrl = `https://bold-amandi-kvikktrip.koyeb.app/user/${userId}`;
    return fetch(apiUrl, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
    }).then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Network response was not ok.');
    });
};


export const getPreferences = async (userId) => {
    const apiUrl = `https://bold-amandi-kvikktrip.koyeb.app/user/preference/${userId}`;

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

export const updatePreferences = async (userId, data) => {
    const apiUrl = `https://bold-amandi-kvikktrip.koyeb.app/user/preference/${userId}`;
    return fetch(apiUrl, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }).then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Network response was not ok.');
    });
}

export const getHistory = async (userId) => {
    const apiUrl = `https://bold-amandi-kvikktrip.koyeb.app/history/${userId}`;

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

export const AIHelp = async (question) => {
    const apiUrl = `https://bold-amandi-kvikktrip.koyeb.app/chatbot`;
    const params = new URLSearchParams();
    params.append('query', question);

    const requestOpt = {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: params
    }

    try {
        const response = await fetch(apiUrl, requestOpt);

        if (response.status === 200) {
            const data = response.json();
            console.log(data);
            return data;
        }
    } catch (error) {
        console.log(error)
    }
}