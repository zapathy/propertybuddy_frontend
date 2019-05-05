window.onload = () => {
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
};

