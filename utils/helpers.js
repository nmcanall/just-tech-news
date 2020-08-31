module.exports = {

    // Puts dates in a friendly format
    format_date: date => {
        return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`;
    },

    // Ensures plurality is correct
    format_plural: (word, number) => {
        if(number !== 1) {
            word += "s";
        }
        return word;
    },

    // Shortens URL to easy to view format
    format_url: url => {
        return url
            .replace("http://", "")
            .replace("https://", "")
            .replace("www.", "")
            .split("/")[0]
            .split("?")[0];
    }
}