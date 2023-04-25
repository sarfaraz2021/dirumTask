import React from "react";
import axios from "axios";

const ApiFetch = axios.create({
  baseURL: "https://online-movie-database.p.rapidapi.com", // set the base URL
  headers: {
    "Content-Type": "application/json", // set the content type header
    "X-RapidAPI-Key": "053a68d0efmsh802e8a31fefc265p1e4e46jsn18503036989c",
    "X-RapidAPI-Host": "online-movie-database.p.rapidapi.com"
    // Add any other headers you need
  },
  params: {
    // Add any default search query parameters you need
    q: "", // empty search query parameter
    tconst: "" // example limit parameter
  }
});

export default ApiFetch;
