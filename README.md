# Track Location React Component

This React component, `TrackLocation`, allows users to fetch their current geographic coordinates (latitude and longitude), retrieve the corresponding address, and share their location via the browser's share API or email.

## Features

-   **Get User Coordinates:** Fetches the user's latitude and longitude using the browser's Geolocation API.
-   **Retrieve Address:** Converts the coordinates into a human-readable address using the OpenCage Geocoding API.
-   **Share Location:** Shares the location information (coordinates, address, and Google Maps link) via the browser's share API or email.

## Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd <repository_directory>
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```
3.  **Add your OpenCage API Key:**
    -   Create a file named `constant.js` in the same directory as `TrackLocation.js`.
    -   Add your OpenCage API key to `constant.js`:

    ```javascript
    // constant.js
    export const API_KEY = 'YOUR_OPENCAGE_API_KEY';
    ```
    -   Replace `YOUR_OPENCAGE_API_KEY` with your actual API key. You can get an API key from [OpenCage Geocoding](https://opencagedata.com/).

4.  **Run the application:**
    ```bash
    npm start
    # or
    yarn start
    ```

## Usage

1.  **Fetch Location:** Click the "My Location" button to retrieve your current location and address.
2.  **Share Location:** Click the "Share my location" button to share your location. If the browser supports the share API, it will use that; otherwise, it will open an email client with the location details.

## Code Explanation

-   **State Variables:**
    -   `latitude`: Stores the user's latitude.
    -   `longitude`: Stores the user's longitude.
    -   `address`: Stores the user's address.
-   **`getUserCoords()`:**
    -   Checks if the browser supports geolocation.
    -   Uses `navigator.geolocation.getCurrentPosition()` to get the user's coordinates.
    -   Handles errors if geolocation fails.
-   **`getAddress()`:**
    -   Fetches the address from the OpenCage Geocoding API using the latitude and longitude.
    -   Updates the `address` state with the retrieved address.
-   **`handleAddress()`:**
    -   Calls `getAddress()` to fetch and display the address.
-   **`shareLocation()`:**
    -   Creates a location text string with coordinates, address, and a Google Maps link.
    -   Uses `navigator.share()` if available; otherwise, opens an email client.
-   **`useEffect()`:**
    -   Calls `getUserCoords()` when the component mounts to fetch the initial location.

## Dependencies

-   `react`: Core React library.
-   `axios`: For making HTTP requests to the OpenCage Geocoding API.

## Notes

-   Ensure that the browser allows location access when prompted.
-   The OpenCage Geocoding API requires an API key.
-   The Google Maps link uses a high zoom level for better accuracy.
-   The share functionality may vary depending on the browser and device.
-   The styling is done using tailwind css.
