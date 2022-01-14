require("dotenv").config();
const mix = require("laravel-mix");
const tailwindcss = require("tailwindcss");
require("laravel-mix-versionhash");

mix.disableSuccessNotifications();

mix.js("resources/js/app.js", "web/assets/js/app.js")
    .setPublicPath("web")
    .js("resources/js/cookie-consent.js", "web/assets/js/cookie-consent.js")
    .sourceMaps();

mix
    .sass("resources/sass/app.scss", "assets/css/app.css")
    .setPublicPath("web")
    .options({
        processCssUrls: false,
        postCss: [tailwindcss("./tailwind.config.js")]
    });

// Run BrowserSync Locally, off by default
if (!mix.inProduction()) {
	mix.browserSync({
		// Set this to a variable in your .env file containing your local development URL:
		proxy: process.env.PRIMARY_SITE_URL,
		// Watch for any changes in assets/ and templates/ directories:
		files: ['assets/**/*', 'templates/**/*'],
	});
}

// Only run in Production
if (mix.inProduction()) {
    mix.versionHash();
}

// Disable success notifications
mix.disableSuccessNotifications();