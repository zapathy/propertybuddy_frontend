var propertyData;
var selectedProperty;

handlePropertyList = () => {
    getPropertyData();
};

getPropertyData = () => {
    const url = 'https://propertybuddy-database.herokuapp.com/properties/all';

    fetch(url, {
        method: "GET",
    })
        .then(res => {
            return res.json();
        })
        .then(json => {
            propertyData = json;
            populatePropertyList();
        })
};

populatePropertyList = () => {
    let propertyListElement = document.getElementById('propertylist');
    propertyData.forEach(property => {
        let optionElement = document.createElement('option');
        optionElement.text = property['district'] + ' .ker ' +
            property['streetname'] + property['streetsuffix'];
        optionElement.value = property['id'];
        propertyListElement.appendChild(optionElement);
    });
};

selectPropertyFromList = () => {
    selectedProperty = null;
    let selectedPropertyFromInput = document.getElementById('propertylistvalue').value;
    propertyData.forEach(property => {
        if (property['id'] == selectedPropertyFromInput) {
            selectedProperty = property;
        }
    });
    showPropertyInfo();
};

showPropertyInfo = () => {
    console.log(selectedProperty);
    document.getElementById('propertyid').value = selectedProperty['id'];
    document.getElementById('fullstreetname').value =
        romanize(selectedProperty['district']) + ' .ker ' + selectedProperty['streetname'] +
        selectedProperty['streetsuffix'];
    let address = 'Budapest ' + document.getElementById('fullstreetname').value;
    codeAddress(address);
};

document.getElementById('propertylistvalue').addEventListener("keyup", function (event) {
    if (event.code === 'Enter') {
        event.preventDefault();
        selectPropertyFromList();
    }
});

document.getElementById('showpropertyinfo').onclick = () => {
    selectPropertyFromList();
};


