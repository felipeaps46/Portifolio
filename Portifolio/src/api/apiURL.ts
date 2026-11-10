let API_URL = "";
if(window.location.hostname === "localhost"){
  API_URL = "http://localhost:8000";
}else{
  API_URL = "https://portifolio-lab-qbwp.onrender.com";
}


export default API_URL;