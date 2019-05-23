createFilteringEventListeners = () => {
    let multipleprices = document.getElementById("filter-multipleprices-checkbox");
    multipleprices.onclick = () => {
        if (multipleprices.checked === true) {
            filteredProperties = [];
            propertyData.forEach(p => {
                if (p['pricehistory'].length > 1) {
                    filteredProperties.push(p);
                }
            });
        }
        if (multipleprices.checked === false) {
            filteredProperties = propertyData;
        }
        populatePropertyList();
    }
};
