import getParameter, { Input } from './getParameter';


export default function* paramGenerator() {

    let response: Input = {
        second: 1,
    };

    while (true) {
        response = yield getParameter(response);
    }

}


