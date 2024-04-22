# ninja_game_pygame-ce
Simple twitter clone with limited pages and functionalities.

I have a demo video of this project in this [link](https://youtu.be/XyAFo38ckJ8)

# Technologies Used
* **Sveltekit**
* **TailwindCSS**
* **Firebase**
* **Shadcn-svelte**
* **Typescript**

# Environment Variables
If you want to test out this project you need to create a new firebase project, generate a new private key. Once you created a key, a json file will be downloaded, open the file, look for these keys and copy their values:

**FIREBASE_PROJECT_ID** -> look for 'project_id' in the json file.  
**FIREBASE_CLIENT_EMAIL** -> look for 'client_email' in the json file.  
**FIREBASE_PRIVATE_KEY** -> look for 'private_key' in the json file.

## Firebase Config
Create a file in 'src/lib/scripts/' directory and name it 'firebaseconf.ts'. Next, go to your project, click the cog next to the 'Project Overview' label and click the 'project settings'. Then, go bottom and look for 'your apps' section, look for your app and look for a code snippet with 'firebaseConfig' variable, copy the whole snippet and paste it to 'firebaseconf.ts' file.

## Notes
Due to the length of firebase's private key, you may encounter this error: 'FirebaseAppError: failed to parse private key: error: invalid pem formatted message'. To fix this, try to wrap your 'FIREBASE_PRIVATE_KEY' in single qoutes. If it doesn't work, make the key as an object. For example: `'{"key": -----BEGIN PRIVATE KEY-----\...}'`

And then, if you want to access your private key, use `JSON.parse()`. Example:  
`JSON.parse(FIREBASE_PRIVATE_KEY).key`