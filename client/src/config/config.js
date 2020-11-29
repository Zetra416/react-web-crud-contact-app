require('dotenv').config()

const config = process.env.NODE_ENV
console.log(config, 'config')

let baseUrl;
switch (config) {
	case 'production':
		baseUrl = process.env.REACT_APP_BASE_URL_PROD;
		break;
	case 'development':
		baseUrl = process.env.REACT_APP_BASE_URL_DEV;
    console.log(baseUrl, 'apa');
		break;
	case 'test':
		baseUrl = process.env.REACT_APP_BASE_URL_DEV;
		break;
	case 'stagging':
		baseUrl = process.env.REACT_APP_BASE_URL_DEV;
		break;
	default:
		baseUrl = process.env.REACT_APP_BASE_URL_DEV;
		break;
}

export default baseUrl;
