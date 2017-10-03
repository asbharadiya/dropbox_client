const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3001'

const headers = {
    'Accept': 'application/json'
};

export const getDashboardData = () =>
	fetch('/assets/data/dashboard.json', {
	    method: 'GET'
	}).then(res => {
	    return res.json();
	}).catch(error => {
        return error;
    });


export const login = (payload) =>
	fetch(api+'/api/login', {
	    method: 'POST',
	    headers: {
	    	...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
	}).then(res => {
		return res.json();
	}).catch(error => {
        return error;
    });    
