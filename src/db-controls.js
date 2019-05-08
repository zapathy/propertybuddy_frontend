createDbControlEventListeners = () => {
    document.getElementById('dbtestfill').onclick = () => {
        const url = 'http://localhost:8080/testdata/createall';

        fetch(url, {
            method: "POST",
            })
            .then(res => {
                console.log(res);
                return res.json();
            })
            .then(json => {
                console.log(json);
            })
    };

    document.getElementById('dbgetall').onclick = () => {
        const url = 'http://localhost:8080/properties';

        fetch(url, {
            method: "GET",
        })
            .then(res => {
                console.log(res);
                return res.json();
            })
            .then(json => {
                console.log(json);
            })
    };
};
