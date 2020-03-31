const UserController = {
    Index: function (req, res) {
        const { page } = req.query;

        const limit = 10;
        const skip = (page - 1) * limit;
    },
    Get: function (req, res) {
    },
    Store: function (req, res) {
    },
    Update: function (req, res) {
    },
    Delete: function (req, res) {
    },
}

module.exports = UserController;