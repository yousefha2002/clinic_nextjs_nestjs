export default function formatDate(date:string)
{
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
        weekday: 'short', // Example: "Mon"
        year: 'numeric',
        month: 'short', // Example: "Mar"
        day: '2-digit', // Example: "11"
    });
    return formattedDate
}