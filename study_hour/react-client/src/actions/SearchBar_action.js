import history from "../history";


export function search(location) {
    return (dispatch) => {
        console.log(location.id);
        history.push('/Location/' + location.id);
    }
}