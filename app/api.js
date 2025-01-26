import fetch from 'node-fetch';
import { headers } from './constants.js';

export async function login(user, password) {
    try {
        const body = new FormData();
        body.set("log", user);
        body.set("pwd", password);

        return await fetch('https://dyndns.it/login/', {
            method: 'POST',
            redirect: 'manual',
            headers,
            body
        });
    } catch (err) {
        throw new Error(`Cannot fetch https://dyndns.it/login/`);
    }
}

export async function getManagementPage(cookies) {
    try {
        const res = await fetch('https://dyndns.it/host-management/', {
            headers: { ...headers, ...{ 'Cookie': cookies } }
        })

        return await res.text();
    } catch (err) {
        throw new Error(`Cannot fetch https://dyndns.it/host-management/`);
    }
}

export async function postConfirmation(cookies, confirmationDto) {
    try {
        const body = new FormData();
        body.set("a", confirmationDto.a);
        body.set("id", confirmationDto.id);

        await fetch('https://dyndns.it/confirm-host/', {
            method: 'POST',
            redirect: 'manual',
            headers: { ...headers, ...{ 'Cookie': cookies } },
            body
        })
    } catch (err) {
        throw new Error(`Cannot fetch https://dyndns.it/confirm-host/`);
    }
}