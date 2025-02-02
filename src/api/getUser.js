const AUTH_PARCEL_URL = import.meta.env.VITE_AUTH_PARCEL_URL;

let id = null;

try {
    if (!AUTH_PARCEL_URL) {
        throw new Error("AUTH_PARCEL_URL is not defined");
    }

    // 동적 모듈
    const { getUser } = await import(/* @vite-ignore */ AUTH_PARCEL_URL);

    // getTokens 호출 및 토큰 추출
    id = (await getUser()).id;
} catch (error) {
    console.error("Failed to retrieve tokens:", error);
}

export { id };
