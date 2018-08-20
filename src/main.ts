// import * as git from 'git'
import { exec } from 'child_process';
import { GitWatcher, RepoResult, RepoWatchConfig } from 'git-repo-watch';
import { config } from './config';

exec(`mkdir ${config.path}`)
exec(`git clone ${config.path} ${config.path}`);

const gw = new GitWatcher();

// tslint:disable-next-line:no-console
console.log(config.path);

// Use Sync Fork to check for changes in the upstream an update.
gw.watch({
	path: config.path,
	remote:  config.path,
	branch: 'master',
	poll: 5,
	strict: true,
	sync: {
		remote:  config.path,
		branch: 'master',
	}
});

gw.check$.subscribe((info: RepoWatchConfig) => {

	// tslint:disable-next-line:no-console
	console.log(info);

	// will fire every check.
});

gw.result$.subscribe((result: RepoResult) => {

	try {
		// tslint:disable-next-line:no-console
		console.log(result.changed);

		if (result.error) {
			gw.unwatch(result.config);
		} else {
			if (result.changed === true) {
				exec(`git clone ${config.path} ${config.path}`);
				
			}
		}
	}
	catch{
		// tslint:disable-next-line:no-console
		console.log(result);
	}


});



// import moment from 'moment';


// /**
//  * Some predefined delays (in milliseconds).
//  */
// export enum Delays {



//   Short = 500,
//   Medium = 2000,
//   Long = 5000,
// }

// /**
//  * Returns a Promise<string> that resolves after given time.
//  *
//  * @param {string} name - A name.
//  * @param {number=} [delay=Delays.Medium] - Number of milliseconds to delay resolution of the Promise.
//  * @returns {Promise<string>}
//  */
// function delayedHello(
//   name: string,
//   delay: number = Delays.Medium,
// ): Promise<string> {
//   return new Promise((resolve: (value?: string) => void) =>
//     setTimeout(() => resolve(`Hello, ${name}`), delay),
//   );
// }

// // Below are examples of using TSLint errors suppression
// // Here it is suppressing missing type definitions for greeter function

// // tslint:disable-next-line typedef
// export async function greeter(name) {

//   // tslint:disable-next-line:no-console
//   console.log(moment(new Date()).toString())


//   // tslint:disable-next-line no-unsafe-any no-return-await
//   return await delayedHello(name, Delays.Long);
// }
