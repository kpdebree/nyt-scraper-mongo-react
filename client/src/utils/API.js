import axios from "axios";

const API_key = "675662408b694bb78f0828e678710d57";
const queryUrlBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=";

export default {
  nytSearch: function(topic, startYear, endYear) {
    const queryURL = queryUrlBase + API_key + "&q=" + topic + "&begin_date" + startYear + "0101&end_date=" + endYear + "0101"; 
    return axios.get(queryURL);
  },
  // Gets all articles
  getArticles: function() {
    return axios.get("/api/articles");
  },
  // Gets the article with the given id
  getArticle: function(id) {
    return axios.get("/api/articles/" + id);
  },
  // Deletes the article with the given id
  deleteArticles: function(id) {
    return axios.delete("/api/articles/" + id);
  },
  // Saves a article to the database
  saveArticles: function(articleData) {
    return axios.post("/api/articles", articleData);
  }
};
