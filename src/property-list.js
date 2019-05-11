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
        let streetnamestring = romanize(property['district']) + ' .ker ';
        if (property['streetname'] != null) {
            streetnamestring += property['streetname'] + ' ' + property['streetsuffix'];
        } else {
            streetnamestring+= property['name'];
        }
        optionElement.value = property['id'];
        optionElement.text = streetnamestring;
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
    document.getElementById('propertyid').value = selectedProperty['id'];
    let streetnamestring = romanize(selectedProperty['district']) + ' .ker ';
    if (selectedProperty['streetname'] != null) {
        streetnamestring += selectedProperty['streetname'] + ' ' + selectedProperty['streetsuffix'];
    } else {
        streetnamestring+= selectedProperty['name'];
    }
    document.getElementById('fullstreetname').value = streetnamestring;
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


