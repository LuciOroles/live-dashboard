import getParameter, { Input } from './getParameter';


export default function* paramGenerator() {

    let response: Input = {
        second: 1,
    };

    while (true) {
        console.log(response, ' response');
        response = yield getParameter(response);
    }
}


