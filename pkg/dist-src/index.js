import path from "path";
import { readdirSync, lstat, exists, readFileSync, writeFile } from "fs";
import { minify } from "terser";
function shouldPrintComment(contents, predicate) {
    switch (typeof predicate) {
        case "function":
            return predicate(contents);
        case "object":
            return predicate.test(contents);
        default:
            return !!predicate;
    }
}
const minifyOptions = {
    sourceMap: {
        filename: "index.min.js",
        url: "index.min.js.map"
    }
};
export async function build({ cwd, out, options, reporter }) {
    const terserOptions = Object.assign({}, minifyOptions, (options.terserOptions || {}));
    await Promise.all(readdirSync(out).map(dir => new Promise(resolve => {
        lstat(path.join(out, dir), (err, stats) => {
            if (err)
                throw err;
            if (stats.isDirectory()) {
                const indexPath = path.join(path.join(out, dir, "index.js"));
                const code = readFileSync(indexPath, "utf-8");
                exists(indexPath, async (exists) => {
                    if (exists) {
                        var result = minify(code, terserOptions);
                        if (result.error)
                            throw result.error;
                        await Promise.all([
                            new Promise(resolve => writeFile(path.join(out, dir, terserOptions.sourceMap.filename), result.code, resolve)),
                            new Promise(resolve => writeFile(path.join(out, dir, terserOptions.sourceMap.url), result.map, resolve))
                        ]);
                        resolve();
                    }
                    else {
                        resolve();
                    }
                });
            }
            else {
                resolve();
            }
        });
    })));
}
