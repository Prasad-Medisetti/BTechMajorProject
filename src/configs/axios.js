import axios from "axios";

//local, dev, sit, uat
const instance = axios.create({
	baseURL: "http://210.212.210.86/reactcurd",
});

export default instance;
