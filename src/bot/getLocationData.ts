import axios from 'axios';

const GEO_CODE_API_URL = 'geocode.xyz';
const GeoLocationApi = axios.create({
    url: GEO_CODE_API_URL
});

type LocationData = {

};

export const getLocationData = async (
    latitude: number,
    longitude: number
): Promise<LocationData> => {
    const path = `${latitude},${longitude}`;
    const data = await GeoLocationApi.get(path, {
        params: {
            geoit: 'json'
        }
    }) as LocationData;

    console.log(data);

    return data;
};
