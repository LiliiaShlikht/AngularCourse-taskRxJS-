import { Observable, fromEvent } from "RxJS";
import { ajax } from "rxjs/internal/observable/dom/ajax";
import { switchMap, map, debounceTime } from "rxjs/internal/operators";
import { IgitHubSearch } from "./gitHub.interface";

const source$: Observable<Event> = fromEvent( document.querySelector( "input[name = Search]") as HTMLElement, "input");

source$
    .pipe(
        debounceTime(1000),
        switchMap((e) => ajax(`https://api.github.com/search/repositories?q=${(e.target as HTMLInputElement).value}&per_page=10`)),
        map((e) => e.response.items )
    )
    .subscribe((response) => {
        const ul = document.getElementById('searchLines') as HTMLElement;
        ul.innerHTML = '';
        response.forEach(function (item: IgitHubSearch ){
            const li = document.createElement('li');
            li.innerHTML = `<a href=${item.html_url}>${item.name}</a>`;
            ul.appendChild(li);
        })
})
