import { query, queryAll, getById } from "../utils";

const defaulConfig = {
    useId: false,
    onSubmit: e => e.preventDefault()
}

function Form({ config: userConfig }) {

    const { useId, onSubmit, selector } = Object.assign({}, defaulConfig, userConfig);

    const form = useId ? getById(selector) : query(selector);

    const fields = [...queryAll((useId ? "#" + selector : selector) + " input")];

    const api = {
        getValue: function () {
            return fields.map(field => {
                const { name, id, value } = field;

                return {
                    name: name || id,
                    value
                }
            });
        },
        init: function () {
            form.addEventListener("submit", submit);
        },
        remove: function () {
            form.removeEventListener("submit", submit);
        }
    }

    var submit = function (e) {
        e.preventDefault();

        const data = {};

        this.getValue().forEach(field => {
            data[field.name] = field.value
        });

        onSubmit(data);
    }.bind(api);

    api.init();

    return api;
}

export default Form;