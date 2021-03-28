/* Global Variables */
const generate = document.getElementById("generate");
const date = document.getElementById("date");
const temp = document.getElementById("temp");
const content = document.getElementById("content");

// Cerate GET request with fetch
const getData = async (url) => {
    const response = await fetch(url);

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("error:", error);
    }
};

// Cerate Post request with fetch
const postData = async (url, data) => {
    const response = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("error", error);
    }
};

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

// Create The Envet listener that treger the request
generate.addEventListener("click", () => {
    // Get the user response
    const userResponse = document.getElementById("feelings").value;
    // Important Variables for requests
    const zipCode = document.getElementById("zip").value;
    const apiKey = "27e4de5de217b7ba548ddaaa223561af";
    const baseURL = `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}`;

    // Make a get request to get the data from the Weather API
    getData(baseURL)
        .then((data) => {
            // console.log(data);
            postData("/PostData", {
                temperature: data.main.temp,
                date: newDate,
                userResponse: userResponse,
            });
        })
        // Make a get request to get the data from locak host and update the UI
        .then((data) => {
            getData("/GetData").then((data) => {
                // console.log(data);
                date.innerHTML = "The Date: " + data.date;
                temp.innerHTML = "The Tempperature: " + data.temperature;
                content.innerHTML = "The Content: " + data.userResponse;
            });
        });
});
