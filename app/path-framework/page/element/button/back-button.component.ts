import {Button} from './button.component';
import {IPathApp} from "../../../pathinterface";
import {TranslationService} from "../../../service/translation.service";
import {PathService} from "../../../service/path.service";
import {Component, Input, Output} from "@angular/core";

@Component({
    selector: 'path-back-button',
    templateUrl: 'back-button.component.html'
})
export class BackButtonComponent {
    @Input('button')
    @Output('button')
    button:BackButton;
}

export class BackButton extends Button {

    constructor(app:IPathApp, pathService:PathService, translationService:TranslationService) {
        super(app, pathService,translationService);
        this.name = translationService.getText("Back");
    }

    public onClick() {
        this.app.navigateBack();
    }

    public fromJson(modelElement) {
        super.fromJson(modelElement);
        this.type = "backButton";
    }
}