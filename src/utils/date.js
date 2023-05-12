export const formatDateMMDDYYYY = (date) => {
    const newDate = new Date(date);
    const options = { 
     year: 'numeric',
     month: '2-digit',
     day: '2-digit' 
    };
    return newDate.toLocaleDateString('en-US', options);
}