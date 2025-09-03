
module.exports = {
    valid: {
        ValidCity: /^[A-Za-z\s]+$/,
        ValidState: /^[A-Za-z\s]+$/,
        ValidZip: /^\d{5}(-\d{4})?$/,
        ValidPhone: /^(\d{1,3}[ .-])?\(?\d{3}\)?[ .-]?\d{3}[ .-]?\d{4}( x\d+)?$/
    },

    invalid: {
        InvalidCity: /[a-zA-Z]/,
        InvalidState: /[a-zA-Z]/,
        InvalidZip: /[a-zA-Z]/,
        InvalidPhone: /[a-zA-Z]/
    }
}