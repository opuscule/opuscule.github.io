const { DateTime } = require("luxon");
module.exports = function(eleventyConfig) {
	
	eleventyConfig.addPassthroughCopy('./src/fonts');
	eleventyConfig.addPassthroughCopy('./src/images');
	eleventyConfig.addPassthroughCopy('./src/styles');
	eleventyConfig.addPassthroughCopy('./src/scripts');
	eleventyConfig.addPassthroughCopy('./src/admin');
	eleventyConfig.addFilter("postDate", (dateObj) => {
		return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
	})
	
	return {
		dir: {
			input: "src",
			output: "public"
		}
	};	
}