import { Observable } from 'rxjs';
import { load, loadWithFetch } from './loader';

// let source = Observable.create(observer => {
//
//     let index = 0;
//     let produceValue = () => {
//         observer.next(numbers[index++]);
//         if (index < numbers.length) {
//             setTimeout(produceValue, 250);
//         } else {
//             observer.complete();
//         }
//     };
//
//     produceValue();
//
// }).map(n => n * 2)
//   .filter(n => n > 4);


let output = document.getElementById('output');
let button = document.getElementById('button');
let click = Observable.fromEvent(button, 'click');

function renderMovies(movies) {
    movies.forEach(m => {
        let div = document.createElement("div");
        div.innerText = m.title;
        output.appendChild(div);
    })
}

let subscription =
    load("moviesss.json")
    .subscribe(
        renderMovies,
        e => console.log(e),
        () => console.log('complete')
    );
console.log(subscription);
//subscription.unsubscribe();


// click.flatMap(e => load("movies.json"))
//     .subscribe(o => console.log(o));


click.flatMap(e => loadWithFetch("movies.json"))
    .subscribe(
        renderMovies,
        error => console.log(`error: ${error}`),
        () => console.log('complete')
    );


// let source = Observable.merge(
//     Observable.of(1),
//     Observable.from([2,3,4]),
//     Observable.throw(new Error("Stop!")),
//     Observable.of(5)
// ).catch(e => {
//     console.log(`caught: ${e}`);
//     return Observable.of(10);
// });
//
// source.subscribe(
//     value => console.log(value),
//     error => console.log(error),
//     () => console.log('complete')
// );