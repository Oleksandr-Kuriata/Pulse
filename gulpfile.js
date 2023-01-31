const gulp = require('gulp'),
      browserSync = require('browser-sync').create(),
      autoprefixer = require('gulp-autoprefixer'),
      cleanCss = require('gulp-clean-css'),
      fonter = require('gulp-fonter'),
      htmlmin = require('gulp-htmlmin'),
      imagemin = require('gulp-imagemin'),
      rename = require('gulp-rename'),
      sass = require('gulp-sass')(require('sass')),
      sourcemaps = require('gulp-sourcemaps'),
      ttf2woff = require('gulp-ttf2woff'),
      ttf2woff2 = require('gulp-ttf2woff2');

gulp.task('styles', function() {
    return gulp.src('src/sass/**/*.+(scss|sass)')
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write())
        .pipe(sass({outputStyle: "compressed"}).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(cleanCss({compatibility: "ie8"}))
        .pipe(rename({
            prefix: "",
            suffix: ".min"
        }))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
});

gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "dist"
        },
        notify: false,
        port: 3000
    });

    gulp.watch('src/*.html').on('change', browserSync.reload);
});

gulp.task('watch', function() {
    gulp.watch('src/*.html').on('change', gulp.parallel('html'));
    gulp.watch('src/sass/**/*.+(scss|sass|css)').on('change', gulp.parallel('styles'));
    gulp.watch('src/js/**/*.js').on('change', gulp.parallel('scripts'));
    gulp.watch('src/img/**/*').on('all', gulp.parallel('images'));
    gulp.watch('src/icons/**/*').on('all', gulp.parallel('icons'));
    gulp.watch('src/fonts/**/*').on('all', gulp.parallel('fonts'));
    gulp.watch('src/mailer/**/*').on('all', gulp.parallel('mailer'));
});

gulp.task('scripts', function() {
    return gulp.src('src/js/**/*.js')
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.stream());
});

gulp.task('images', function() {
    return gulp.src('src/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'))
        .pipe(browserSync.stream());
});

gulp.task('html', function() {
    return gulp.src('src/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist/'))
        .pipe(browserSync.stream());
});

gulp.task('icons', function() {
    return gulp.src('src/icons/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/icons'))
        .pipe(browserSync.stream());
});

gulp.task('fonts', function() {
    return gulp.src('src/fonts/**/*')
        .pipe(ttf2woff())
        .pipe(gulp.src('src/fonts/**/*'))
        .pipe(ttf2woff2())
        .pipe(gulp.dest('dist/fonts'))
        .pipe(browserSync.stream());
});

gulp.task('mailer', function() {
    return gulp.src('src/mailer/**/*')
        .pipe(gulp.dest('dist/mailer'))
        .pipe(browserSync.stream());
});

gulp.task('otf2ttf', function() {
    return gulp.src('src/fonts/**/*.otf')
        .pipe(fonter({
            formats: ['ttf']
        }))
        .pipe(gulp.dest('src/fonts'));
});

gulp.task('default', gulp.parallel('styles', 'server', 'watch', 'scripts', 'images', 'icons', 'fonts', 'mailer', 'html'));