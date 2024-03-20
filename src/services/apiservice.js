import TravelLocation from "../components/TravelLocation.js";

export const getRecommendations = async () => {
    const picture = '/ny 1.png';
    const myLocation = new TravelLocation("Bergen", picture,"Norway", "Rain", '$$');

    return [myLocation, myLocation, myLocation, myLocation, myLocation, myLocation];
}

export const getTags = async () => {
    const apiUrl = `/api/tags`;

    try {
        const response = await fetch(apiUrl);

        if (response.status === 200) {
            let data = await response.json();
            data = data.map(function(item) {
                return {
                    value: item.label,
                    label: item.label,
                };
            });
            console.log(data);
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
            let data = await response.json();
            console.log(data);
            data = data.map(function(item) {
                return {
                    value: item.name,
                    label: item.name,
                };
            });
            return data;
        }
    } catch (error) {
        console.log(error);
    }
}