var propertyData;
var selectedProperty;
var filteredProperties;

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
            filteredProperties = propertyData;
            populatePropertyList();
        })
};

populatePropertyList = () => {
    let propertyListElement = document.getElementById('propertylist');
    propertyListElement.innerHTML='';
    filteredProperties.forEach(property => {
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
    let streetnamestring = romanize(selectedProperty['district']) + ' .ker ';
    if (selectedProperty['streetname'] != null) {
        streetnamestring += selectedProperty['streetname'] + ' ' + selectedProperty['streetsuffix'];
    } else {
        streetnamestring+= selectedProperty['name'];
    }
    let pricelist = document.getElementById('pricelist');
    pricelist.innerHTML = '';
    document.getElementById('fullstreetname').value = streetnamestring;
    for (let price of selectedProperty['pricehistory']) {
        let optionElement = document.createElement('option');
        let dt = (price['datetime'])+'';
        dt = dt.split(',');
        let datetimeString = dt[0]+"-"+dt[1]+"-"+dt[2]+" "+dt[3]+":"+dt[4];
        let pricestring = price['pricehuf'] / 1000000;
        pricestring = pricestring + '' + "M Ft";
        optionElement.text = datetimeString + ' -> ' + pricestring;
        pricelist.appendChild(optionElement);
    }
    let address = 'Budapest ' + document.getElementById('fullstreetname').value;
    codeAddress(address);
};

document.getElementById('propertylistvalue').addEventListener("keyup", function (event) {
    if (event.code === 'Enter') {
        event.preventDefault();
        selectPropertyFromList();
    }
});

document.getElementById('propertylistvalue').onclick = () => {
    console.log("asdfasdfasdfsad");
    document.getElementById('propertylistvalue').value = '';
};


document.getElementById('showpropertyinfo').onclick = () => {
    selectPropertyFromList();
};
