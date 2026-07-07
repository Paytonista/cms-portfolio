export function formatDate(date: Date){
    if(!date) return "N/A";
    const formattedDate = new Date(date);
    return isNaN(formattedDate.getTime()) ? "Invalid Date" : formattedDate.toLocaleDateString();

}