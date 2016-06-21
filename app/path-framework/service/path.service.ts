import {Injectable, Inject} from "@angular/core";
import {Response, Http} from "@angular/http";

@Injectable()
export class PathService {

    constructor(@Inject(Http) private http:Http) {
    }

    serverRequest(server:string, url:string, processor:(data:any) => any) {
        if (url != null) {
            // fetch json data from url
            this.http.get(server + url)
                .map((res:Response) => res.json())
                .subscribe(
                    data => {
                        processor(data);
                    },
                    err => {
                        alert(err.status);
                        console.error(err)
                    },
                    () => console.log('server request to ' + server + url + ' finished')
                );
        } else {
            // no url provided, therefore call processor without data
            processor(null);
        }

    }

    serverPost(server:string, url:string, data:any, processor:() => any) {
        if (url != null) {
            this.http.post(server + url, data, null)
                .map(
                    (value:Response,index:number) => {})
                .subscribe(
                data => {
                    console.log("data");
                    processor();
                },
                err => {
                    alert(err.status);
                    console.error(err)
                },
                () => console.log('server request to ' + server + url + ' finished')
            );
        } else {
            // no url provided, therefore call processor without data
            processor();
        }

    }

}