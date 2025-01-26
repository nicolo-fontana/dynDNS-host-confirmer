import cron from 'node-cron';
import { getManagementPage, login, postConfirmation } from './api.js';
import { getCookiesFromHeader, getRemeaningDaysFromHtml, getConfirmDataFromHtml } from './htmlParser.js';
import { user, password, scheduleTime } from './constants.js';


async function confirm() {
    try {
        const loginRes = await login(user, password);
        const coockies = getCookiesFromHeader(loginRes.headers);
        console.log("Logged in succesfully");
        console.log(`Cookies: ${coockies}`);
        const managementPage = await getManagementPage(coockies);
        const remeaningDays = getRemeaningDaysFromHtml(managementPage);
        console.log(`Remeaning days: ${remeaningDays}`);
        if (remeaningDays > 1) {
            console.log("Confirmation rescheduled");
            return;
        }
        console.log("Try to confirm host")
        const confirmationDto = getConfirmDataFromHtml(managementPage);
        console.log(`Confirmation DTO: ${confirmationDto}`);
        postConfirmation(coockies, confirmationDto);
        console.log(`Confirmation success`);
    } catch (err) {
        console.log(err);
    }
}

cron.schedule(scheduleTime, () => {
    confirm();
});
console.log("Application started");
confirm();