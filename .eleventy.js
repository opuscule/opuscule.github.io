module.exports = function(eleventyConfig) {
	
	eleventyConfig.addPassthroughCopy('./src/fonts');
	eleventyConfig.addPassthroughCopy('./src/images');
	eleventyConfig.addPassthroughCopy('./src/styles');
	eleventyConfig.addPassthroughCopy('./src/scripts');
	eleventyConfig.addPassthroughCopy('./src/admin');
	
	return {
		dir: {
			input: "src",
			output: "public"
		}
	};	
}