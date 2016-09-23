import { Context } from 'clime';
import * as globby from 'globby';

export class Matches extends Array<string> {
    private constructor(...args: any[]) {
        super(...args);
    }

    static async cast(globsStr: string, context: Context): Promise<Matches> {
        let globs = globsStr
            .split(',')
            .map(glob => glob.trim())
            .filter(glob => !!glob);

        let paths = await globby(globs, {
            cwd: context.cwd
        });

        return new this(paths);
    }
}
