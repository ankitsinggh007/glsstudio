export const formateProfileName=(name)=>{
    const words = name.split(' ');

    // Initialize an empty string for the short form
    let shortForm = '';
  
    // Iterate through the words and extract the first letter of each word
    for (const word of words) {
      if (word.length > 0) {
        shortForm += word[0].toUpperCase();
      }
    }
  
    return shortForm;
}
