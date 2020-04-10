// Fields = Array of query selectors
function Form(formSelector, useId = false) {

    const query = (useId ? document.getElementById : document.querySelector).bind(document);

    const queryAll = document.querySelectorAll.bind(document);

    const form = query(formSelector);

    const fields = [...queryAll(formSelector + " input")];

    form.addEventListener("submit", e => {
        e.preventDefault();
    });

    const api = {
        getValue: function () {
            fields.map(field => {
                const { name, id, value } = field;

                return {
                    name: name || id,
                    value
                }
            });
        }
    }

    return api;
}

export default Form;