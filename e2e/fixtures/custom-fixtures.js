
module.exports = {
    valid: {
        ValidCity: /^[A-Za-z\s]+$/,
        ValidState: /^[A-Za-z\s]+$/,
        ValidZip: /^\d{5}(-\d{4})?$/,
        ValidPhone: /^(\d{1,3}[ .-])?\(?\d{3}\)?[ .-]?\d{3}[ .-]?\d{4}( x\d+)?$/
    },

    invalid: {

        InvalidCity: /\d/,       // Invalid if contains a digit
        InvalidState: /\d/,      // Invalid if contains a digit
        InvalidZip: /[^0-9]/,    // Invalid if contains anything but numbers
        InvalidPhone: /[a-zA-Z]/

    }
}