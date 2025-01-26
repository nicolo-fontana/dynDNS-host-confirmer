import * as cheerio from 'cheerio';
import { expirationDays } from "./constants.js";

export function getCookiesFromHeader(headers) {
    if (!headers) return;

    const isToCollect = (cookie) =>
        cookie.includes('D23SESSID') ||
        cookie.includes('SERVER') ||
        cookie.includes('wordpress_logged_in')

    const cookies = headers.get('set-cookie');
    if (!cookies) return;

    const findedCookies = cookies.split(',')
        .filter(isToCollect)
        .map(cookie => cookie.split(';').filter(isToCollect))
        .join(';');

    if (!findedCookies.includes("wordpress_logged_in"))
        throw new Error(`Cannot get token`);

    return findedCookies;
}

export function getRemeaningDaysFromHtml(managementPage) {
    const $ = cheerio.load(managementPage);
    const lastRenewDate = $('#lastConfirm').html();
    const formattedDate = `${lastRenewDate.split(' ')[0]
        .split('-')
        .reverse()
        .join('-')}T${lastRenewDate.split(' ')[1]}`;

    const renewDate = new Date(formattedDate);
    const passedDays = Math.round((Date.now() - renewDate.getTime()) / 1000 / 60 / 60 / 24);
    return expirationDays - passedDays;
}

export function getConfirmDataFromHtml(managementPage) {
    const $ = cheerio.load(managementPage);
    const a = $('#confirmHostForm button').attr('value');
    const id = $('#confirmHostForm input').attr('value');

    if (!a || !id) {
        throw new Error("Cannot get confirmation data");
    }

    return { a, id };
}