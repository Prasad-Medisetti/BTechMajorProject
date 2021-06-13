import axios from "axios";

//local, dev, sit, uat
const instance = axios.create({
	baseURL: "https://academic-bulletin-board.herokuapp.com/",
  	headers: {
    		'Access-Control-Allow-Origin' : '*',
    		'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    	}
});

export default instance;
