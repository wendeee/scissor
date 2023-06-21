import { URL } from 'url';

// export async function validateURL(url: string): Promise<boolean> {
//   const module = await import('url');
//   const { URL } = module.default

//   try {
//     new URL(url);
//     return true;
//   } catch (error) {
//     return false;
//   }
// }

export  async function validateURL(url: string):Promise<boolean>{
    return (
        (() => {
          try {
           new URL(url);
            return true;
          } catch (error) {
            return false;
          }
        })()
      );
}

export async function generateUniqueId(): Promise<string>{
  const module = await import('nanoid');
  const { nanoid } = module.default;
  return nanoid(3)
}

export async function generateRandomString(): Promise<string> {
  const module = await import('nanoid');
  const { customAlphabet } = module;
  const generateId = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 3);
  return generateId();
}