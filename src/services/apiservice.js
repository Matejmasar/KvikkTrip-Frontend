import TravelLocation from "../components/TravelLocation.js";

export const getRecommendations = async (filters) => {
    const picture = '/ny 1.png';

    let results = [];
    if (filters.length > 0) {
        //filter the locations returned using the filters
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