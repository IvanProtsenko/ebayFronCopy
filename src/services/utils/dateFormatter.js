export default function formatDate(dateToFormat) {
    const formattedDateYYYY_MM_DD = dateToFormat.slice(0, dateToFormat.indexOf('T'))
    const formattedDateHH_MM = dateToFormat.slice(dateToFormat.indexOf('T')+1, dateToFormat.indexOf('T')+6)
    return formattedDateYYYY_MM_DD + ' - ' + formattedDateHH_MM
}