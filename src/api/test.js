
export const getDashboardData = () =>
	fetch('/assets/data/dashboard.json', {
	    method: 'GET'
	}).then(res => {
	    return res.json();
	}).catch(error => {
        return error;
    });
