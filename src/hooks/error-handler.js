function FirstErrorBag() {
    this.items = [];
    this.fetch = (fieldBag) => this.items.map((item) => {
        const key = Object.keys(item)[0];
        const error = {
            value: fieldBag[key],
            errors: [new Error(item[key])],
        };
        const field = {};
        field[key] = error;
        return field;
    });
}


export default function createHandler(payload) {
    let statusText;
    const errors = new FirstErrorBag();

    function fetchFirstErrors(fErrors) {
        const nErrors = {};
        Object.keys(fErrors)
            .forEach((key) => {
                [nErrors[key]] = fErrors[key];
            });
        return nErrors;
    }

    if (payload && payload.data) {
        if (payload.status === 401) {
            statusText = payload.data.token;
            if (statusText === 'Unauthorized') {
                errors.items.push({session_expired: 'Your login session expired.'});
            }
        } else if (payload.status === 422) {
            errors.items.push(payload.data.errors)
        } else if (payload.status === 429) {
            statusText = payload.data;
            if (statusText === 'tooManyAttempts') {
                errors.items.push({too_many_requested: 'Our system received a lot of requests. Please wait a moment.'});
            } else if (payload.data.errors) {
                errors.items.push(fetchFirstErrors(payload.data.errors));
            }
        } else if (payload.status === 404) {
            errors.items.push({not_found: 'Sorry, the page you are looking for could not be found.'});
        } else if (payload.status === 403) {
            errors.items.push({error: 'Sorry!, Your request was rejected.'});
        } else if (payload.data.errors) {
            errors.items.push(fetchFirstErrors(payload.data.errors));
        } else {
            errors.items.push({error: 'Sorry!, Something went wrong.'});
        }
    } else {
        errors.items.push({error: 'Sorry!, Something went wrong.'});
    }
    return errors;
}
