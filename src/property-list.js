var propertyData;
var selectedProperty;

handlePropertyList = () => {
    getPropertyData();
};

getPropertyData = () => {
    const url = 'http://localhost:8080/properties';

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
        optionElement.text = property['district'] + ' .ker ' + property['street'];
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
        selectedProperty['district'] + ' .ker ' + selectedProperty['street'];
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


