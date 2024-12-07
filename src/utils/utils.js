export function useIslogin() {
    const token = localStorage.getItem("token");
    return token || null; 
}

export function useIsAdmin() {
    const username = localStorage.getItem("username");
    return username === "admin";
}
