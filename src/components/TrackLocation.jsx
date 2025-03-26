import React, { useEffect, useState } from 'react';
import axios from "axios";
import { API_KEY } from './constant';

const TrackLocation = () => {
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [address, setAddress] = useState("");

    const geo = navigator.geolocation;

    const getUserCoords = () => {
        if (!geo) {
            alert("Geolocation is not supported by your browser.");
            return;
        }

        geo.getCurrentPosition(
            (position) => {
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
            },
            (error) => {
                console.error("Error getting location:", error);
                alert("Failed to retrieve location.");
            }
        );
    };

    const getAddress = async () => {
        if (!latitude || !longitude) {
            alert("Please fetch your location first!");
            return;
        }
        try {
            const response = await axios.get(
                `https://api.opencagedata.com/geocode/v1/json?key=${API_KEY}&q=${latitude}%2C+${longitude}&pretty=1&no_annotations=1`
            );
            const locationData = response.data.results[0]?.formatted || "Address not found";
            setAddress(locationData);
        } catch (err) {
            console.log("Error fetching address:", err);
        }
    };

    const handleAddress = async () => {
        await getAddress();
    };

    const shareLocation = () => {
        if (!latitude || !longitude) {
            alert("Please fetch location first!");
            return;
        }

        const zoomLevel = 18; // High zoom-in level for accuracy
        const mapsLink = `https://www.google.com/maps/place/${latitude},${longitude}/@${latitude},${longitude},${zoomLevel}z`;

        const locationText = `My Location:
📍   Latitude: ${latitude}
📍   Longitude: ${longitude}
📍   Address: ${address || "Not Available"}
🌍  Google Maps: ${mapsLink}`;

        if (navigator.share) {
            navigator.share({
                title: "My Location",
                text: locationText,
                url: mapsLink,
            })
                .then(() => console.log("Location Shared"))
                .catch((err) => console.error("Error sharing:", err));
        } else {
            window.location.href = `mailto:?subject=My Location&body=${encodeURIComponent(locationText)}`;
        }
    };

    useEffect(() => {
        getUserCoords();
    }, []);

    return (
        <div className="bg-black text-white flex justify-center items-center h-screen">
            <div className="flex flex-col justify-center items-center gap-5 w-[50%]">
                <div className="flex gap-3 w-full">
                    <button
                        onClick={handleAddress}
                        className="bg-blue-400 p-3 rounded-md font-bold hover:bg-blue-600 transition duration-300 flex-1"
                    >
                        My Location
                    </button>
                    <div className="bg-yellow-400 p-3 rounded-md font-bold text-center flex-1 min-w-[200px] max-w-full break-words">
                        <h1 className="text-xl">Show location:</h1>
                        Latitude: {latitude || "Fetching..."} <br />
                        Longitude: {longitude || "Fetching..."} <br />
                        Address: {address || "Fetching..."}
                    </div>
                </div>
                <button
                    onClick={shareLocation}
                    className="bg-green-400 p-3 rounded-md font-bold text-center w-full hover:bg-green-600 transition duration-300"
                >
                    Share my location
                </button>
            </div>
        </div>
    );
};

export default TrackLocation;


//https://opencagedata.com/dashboard#geocoding