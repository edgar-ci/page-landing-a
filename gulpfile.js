var gulp = require("gulp"),
  sass = require("gulp-sass"),
  connect = require("gulp-connect"),
  pug = require("gulp-pug"),
  plumber = require("gulp-plumber"),
  rename = require("gulp-rename"),
  uglify = require("gulp-uglify-es").default,
  autoprefixer = require("gulp-autoprefixer"),
  sitemap = require("gulp-sitemap");

function reload(done) {
  connect.server({
    livereload: true,
    port: 8080,
    host: "0.0.0.0",
    root: "public",
  });
  done();
}

function styles() {
  return gulp
    .src("src/sass/styles.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 3 versions"],
        cascade: false,
      })
    )
    .pipe(
      sass({
        outputStyle: "expanded",
      })
    )
    .pipe(gulp.dest("public/assets/css"))
    .pipe(
      sass({
        outputStyle: "compressed",
      })
    )
    .pipe(rename("styles.min.css"))
    .pipe(gulp.dest("public/assets/css"))
    .pipe(connect.reload());
}

function scripts() {
  return gulp
    .src(["src/js/*.js", "node_modules/jquery/dist/jquery.min.js"])
    .pipe(plumber())
    .pipe(uglify())
    .pipe(gulp.dest("public/assets/js/"))
    .pipe(connect.reload());
}

function html() {
  return gulp.src("public/*.html").pipe(plumber()).pipe(connect.reload());
}

function views() {
  return gulp
    .src("src/pug/pages/*.pug")
    .pipe(plumber())
    .pipe(
      pug({
        pretty: true,
      })
    )
    .pipe(gulp.dest("./public"))
    .pipe(connect.reload());
}

function assets() {
  return gulp.src(["./assets/**/*"]).pipe(gulp.dest("./public/assets/"));
}

function copyRobots() {
  return gulp.src("./robots.txt").pipe(gulp.dest("./public/"));
}

function siteMap() {
  return gulp
    .src("./public/**/*.html", {
      read: false,
    })
    .pipe(
      sitemap({
        siteUrl: "https://inversiones.suramexico.com/campana-sura-inversiones/",
      })
    )
    .pipe(gulp.dest("./public"));
}

function watchTask(done) {
  gulp.watch("public/*.html", html);
  gulp.watch("src/sass/**/*.scss", styles);
  gulp.watch("src/js/scripts.js", scripts);
  gulp.watch("src/pug/**/*.pug", views);
  done();
}

const watch = gulp.parallel(watchTask, reload);
const build = gulp.series(
  gulp.parallel(copyRobots, assets, siteMap, scripts, styles, html, views)
);

exports.reload = reload;
exports.styles = styles;
exports.scripts = scripts;
exports.html = html;
exports.views = views;
exports.copyRobots = copyRobots;
exports.siteMap = siteMap;
exports.watch = watch;
exports.build = build;
exports.assets = assets;
exports.default = watch;
