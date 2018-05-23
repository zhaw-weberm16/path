import {Injectable} from "@angular/core";

@Injectable()
export class TranslationService {

    private translationMap:Map<string, string> = this.createTranslationMap(this.getTranslations());

    public getText(key: string, ...parameters: string[]): string {
        if (this.getTranslation(key) == null) {
            return "{" + key + "}";
        }
        let result: string = this.getTranslation(key);
        let k: number = 0;
        for (let parameter of parameters) {
            result = result.replace("{" + k + "}", parameter);
            k++;
        }
        return result;
    }

    protected getTranslation(key:string) : string {
        return this.translationMap.get(key);
    }

    protected createTranslationMap(data:any) : Map<string, string> {
        let result:Map<string,string> = new Map<string, string>();
        for (var item in data) {
            result.set(item, data[item]);
        }
        return result;
    }

    protected getUserLanguage() : string {
        let languageCode: string = sessionStorage.getItem("languageCode");
        return languageCode;
    }

    public getSupportedLanguageCodes() : string[] {
        return ["de", "en"];
    }

    private getTranslations() {
        let languageCode: string = this.getUserLanguage();

        if (languageCode == "de") {
            return {
                "Back": "Zurück",
                "Cancel": "Abbrechen",
                "Delete": "Löschen",
                "DeleteWarningQuestion": "Wollen Sie diesen Datensatz löschen?",
                "Detail": "Detail",
                "Logout": "Abmelden",
                "MainMenu": "Hauptmenü",
                "New": "Neu",
                "NotSignedIn": "Nicht angemeldet",
                "Ok": "OK",
                "Search": "Suche",
                "SearchInputLabel": "Suchbegriff",
                "SignedInAs": "Angemeldet als",
                "Translation": "Übersetzung",
                "Translations": "Übersetzungen",
                "de": "Deutsch",
                "en": "Englisch",
            }
        } else {
            return {
                "Back": "Back",
                "Cancel": "Cancel",
                "Delete": "Delete",
                "DeleteWarningQuestion": "Do you want to delete this item?",
                "Detail": "Detail",
                "Logout": "Logout",
                "MainMenu": "Main Menu",
                "New": "New",
                "NotSignedIn": "Not signed in",
                "Ok": "Ok",
                "Search": "Search",
                "SearchInputLabel": "Enter search text",
                "SignedInAs": "Signed in as",
                "Translation": "Translation",
                "Translations": "Translations",
                "de": "German",
                "en": "English",
                "Recipes": "Recipes",
                "Ingredients": "Ingredients",
                "Regions": "Regions",
                "NewRecipe": "New Recipe",
                "RecipeName": "Recipe name",
                "PreparationtimeInMinutes": "Preparationtime (min)",
                "Region": "Region",
                "Recipe": "Recipe",
                "NewIngredient": "New Ingredient",
                "Ingredient": "Ingredient",
                "IngredientName": "Ingredient name",
                "Season": "Season",
                "CaloriesPer100g": "Calories per 100g",
            };
        }
    }
}