export const helper= {
    FormatDate,
    IsBlank
};


function FormatDate(date) {
    date = new Date(date);
    var dd = date.getDate();
    if (dd < 10) dd = '0' + dd;

    var mm = date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;

    var yyyy = date.getFullYear();

    return yyyy + '-' + mm + '-' + dd;
};


function IsBlank(str) {
    return (!str || /^\s*$/.test(str));
};