"use server";

// Utility functions to convert between binary and Base64
function base64ToUint8Array(base64: string): Uint8Array {
  return Uint8Array.from(Buffer.from(base64, "base64"));
}

function uint8ArrayToBase64(uint8Array: Uint8Array): string {
  return Buffer.from(uint8Array).toString("base64");
}

export const encryptData = async (data: string) => {
  const key = await getKey();
  const iv = getIV();
  return encrypt(data, key, iv);
};

export const decryptData = async (encryptedData: string) => {
  const key = await getKey();
  const iv = getIV();
  return decrypt(encryptedData, key, iv);
};

const getKey = async () => {
  if (process.env.KEY) {
    const keyBuffer = base64ToUint8Array(process.env.KEY);
    return crypto.subtle.importKey(
      "raw",
      keyBuffer,
      { name: "AES-GCM" },
      true,
      ["encrypt", "decrypt"]
    );
  }
  throw new Error("No key found in env");
};

const getIV = () => {
  if (process.env.IV) {
    const iv = base64ToUint8Array(process.env.IV);
    return iv;
  }
  throw new Error("No IV found in env");
};

async function encrypt(
  data: string,
  key: CryptoKey,
  iv: Uint8Array
): Promise<{ iv: string; encryptedData: string }> {
  const encoder = new TextEncoder();

  const encodedData = encoder.encode(data);

  const encrypted = await crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: iv,
    },
    key,
    encodedData
  );

  return {
    iv: uint8ArrayToBase64(iv),
    encryptedData: uint8ArrayToBase64(new Uint8Array(encrypted)),
  };
}

async function decrypt(
  encryptedData: string,
  key: CryptoKey,
  iv: Uint8Array
): Promise<string> {
  const decoder = new TextDecoder();
  const encryptedArray = base64ToUint8Array(encryptedData);

  const decrypted = await crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: iv,
    },
    key,
    encryptedArray
  );

  return decoder.decode(decrypted);
}
