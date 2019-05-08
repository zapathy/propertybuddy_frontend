handleDistricts = () => {
    populateDisctricts()
};

populateDisctricts = () => {
    let districtList = document.getElementById('district-list');
    let i;
    for (i=1; i <= 23; i++) {
        let roman = romanize(i);
        let newDistrictElement = document.createElement('button');
        newDistrictElement.innerHTML = roman;
        newDistrictElement.onclick = () => {
            createEmbeddedMapElement('Budapest, District ' + roman);
        };
        districtList.appendChild(newDistrictElement);
    }
};
