import {isMultiDomainEnabled} from "../constants";

export const getMultiDomainUrl = (): string => {
    return '?domain=' + (isMultiDomainEnabled ? window.location.toString() : 'none');
}

export const getMultiDomainPath = (): string => {
    return (isMultiDomainEnabled ? window.location.toString() : 'none').toString();
}