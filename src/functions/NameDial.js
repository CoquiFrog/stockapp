export const NameDial = (numberValue) => {
    function NameDial (numberValue) {
        var name;
        var nameList = {
            1: function () {
                name = 'Save';
            },
            2: function () {
                name = 'Date & Price';
            },
            3: function () {
                name = 'High & Low';
            },
            4: function () {
                name = 'High Low W/ Numbers';
            },
            5: function () {
                name = 'Fifth Function';
            },
            6: function () {
                name = 'Sixth Function';
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