import {AxiosError, AxiosResponse} from "axios";

export interface ApiError extends AxiosError {
    response: AxiosResponse<{
        message: string,
        tags: string | string[]
    }>
}

export enum ErrorTag {
    WRONG_CREDENTIALS = 'Ungültige Anmeldedaten',
    USER_ALREADY_CREATED = 'Telefonnummer bereits registriert',
    UNKNOWN_ERROR = 'Technisches Problem',
}

const ErrorMessageToTag: {[key: string] : ErrorTag} = {
    WRONG_CREDENTIALS: ErrorTag.WRONG_CREDENTIALS,
}

function removeDuplicates(tags: ErrorTag[]) : ErrorTag[] {
    return tags.filter((el,i,a)=>i === a.indexOf(el));
}

export function extractErrorTags (error: ApiError): ErrorTag[] {
    if(error && error.response && error.response.data && error.response.data.tags) {
        let tagStrings: string | string[] = error.response.data.tags;

        if(tagStrings.length < 1) {
            return [ErrorTag.UNKNOWN_ERROR]
        } else if(!Array.isArray(tagStrings)) {
            tagStrings = [tagStrings];
        }

        const tags = tagStrings.map(tag => ErrorMessageToTag[tag]||ErrorTag.UNKNOWN_ERROR);

        return removeDuplicates(tags);
    } else {
        return [ErrorTag.UNKNOWN_ERROR]
    }
}