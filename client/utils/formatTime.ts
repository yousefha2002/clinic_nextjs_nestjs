export default function formatTime(date:string)
{
    const formattedTime = new Date(date).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true, // Ensures AM/PM format
    });
    return formattedTime
}