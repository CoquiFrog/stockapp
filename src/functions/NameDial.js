export const NameDial = (numberValue) => {
    function NameDial (numberValue) {
        var name;
        var nameList = {
            1: function () {
                name = 'Save';
            },
            2: function () {
                name = 'Date Price';
            },
            3: function () {
                name = 'High Low';
            },
            4: function () {
                name = 'High Low Numbers';
            },
            5: function () {
                name = 'High Low Hidden';
            },
            6: function () {
                name = 'Flip Array';
            },
            7: function () {
                name = 'Seventh Function';
            },
            8: function () {
                name = 'Eighth Function';
            },
            'default': function () {
                name = 'Default Name';
            }
        };

        (nameList[numberValue] || nameList['default'])();
    
        return name;
    }

    var name = NameDial(numberValue);
    
    return name;
}

export default NameDial;