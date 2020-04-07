import backend from "../services/backend";

const Auth = {
    isAuth: null,
    accessToken: {
        get: () => `Bearer ${localStorage.getItem("skuld__app__access__token")}`,
        set: token => localStorage.setItem("skuld__app__access__token", token),
        isValid: async function () {
            const response = await backend.get("/users", {
                headers: {
                    authorization: this.get()
                }
            });
            console.log(response);
        }
    }
}

export default Auth;